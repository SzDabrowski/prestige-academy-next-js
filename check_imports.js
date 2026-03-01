const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all TS/TSX files
const files = execSync('find src -name "*.tsx" -o -name "*.ts"').toString().split('\n').filter(Boolean);

const exportMap = new Map();

// Parse exports
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const hasDefaultExport = /export\s+default\s+/.test(content);
  
  // Find named exports: export const/function/class Name ... or export { Name1, Name2 }
  const namedExports = [];
  let match;
  
  const namedRegex1 = /export\s+(const|function|class|let|var)\s+([a-zA-Z0-9_]+)/g;
  while ((match = namedRegex1.exec(content)) !== null) {
    namedExports.push(match[2]);
  }
  
  const namedRegex2 = /export\s+\{\s*([^}]+)\s*\}/g;
  while ((match = namedRegex2.exec(content)) !== null) {
    const exportsList = match[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0]).filter(Boolean);
    namedExports.push(...exportsList);
  }

  // Resolve file paths correctly to check later
  exportMap.set(file, { default: hasDefaultExport, named: namedExports });
});

// Check imports
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  
  // Match named imports: import { A, B } from "path"
  const namedImportRegex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = namedImportRegex.exec(content)) !== null) {
    const importStr = match[1];
    const importPath = match[2];
    if (importPath.startsWith('.') || importPath.startsWith('@/')) {
        const items = importStr.split(',').map(s => s.trim().split(/\s+as\s+/)[0]).filter(Boolean);
        console.log(`[Named] File: ${file} imports { ${items.join(', ')} } from ${importPath}`);
    }
  }

  // Match default imports: import Name from "path" (excluding import * as and import "path")
  const defaultImportRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"]([^'"]+)['"]/g;
  while ((match = defaultImportRegex.exec(content)) !== null) {
    const name = match[1];
    const importPath = match[2];
    if (importPath.startsWith('.') || importPath.startsWith('@/')) {
        console.log(`[Default] File: ${file} imports ${name} from ${importPath}`);
    }
  }
});
