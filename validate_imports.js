const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = execSync('find src -name "*.tsx" -o -name "*.ts"').toString().split('\n').filter(Boolean);

const exportMap = new Map(); // key: normalized path without extension

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const hasDefaultExport = /export\s+default\s+/.test(content);
  
  const namedExports = new Set();
  const namedRegex1 = /export\s+(const|function|class|let|var)\s+([a-zA-Z0-9_]+)/g;
  let match;
  while ((match = namedRegex1.exec(content)) !== null) {
    namedExports.add(match[2]);
  }
  
  const namedRegex2 = /export\s+\{\s*([^}]+)\s*\}/g;
  while ((match = namedRegex2.exec(content)) !== null) {
    const exportsList = match[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0]).filter(Boolean);
    exportsList.forEach(e => namedExports.add(e));
  }
  
  const normalizedPath = file.replace(/\.(tsx|ts)$/, '');
  exportMap.set(normalizedPath, { hasDefault: hasDefaultExport, named: namedExports, originalPath: file });
});

let errorsFound = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const fileDir = path.dirname(file);

  const resolveImportPath = (importPath) => {
    let resolved;
    if (importPath.startsWith('@/')) {
      resolved = path.join('src', importPath.substring(2));
    } else if (importPath.startsWith('.')) {
      resolved = path.join(fileDir, importPath);
    } else {
      return null;
    }
    
    // Normalize path to match map keys
    // It could be a file without extension, or a directory with index.ts
    const possiblePaths = [
      resolved,
      resolved + '/index'
    ];
    
    for (const p of possiblePaths) {
      if (exportMap.has(p)) return p;
    }
    return null;
  };

  const checkImport = (importPath, type, name) => {
    // Ignore css/scss
    if (importPath.endsWith('.scss') || importPath.endsWith('.css')) return;
    
    const targetKey = resolveImportPath(importPath);
    if (!targetKey) {
        // console.log(`Warning: Cannot resolve import ${importPath} in ${file}`);
        return;
    }

    const exportedInfo = exportMap.get(targetKey);
    
    if (type === 'default' && !exportedInfo.hasDefault) {
      console.log(`❌ ERROR: Default import '${name}' from '${importPath}' in ${file} but NO default export found in ${exportedInfo.originalPath}`);
      errorsFound++;
    }
    
    if (type === 'named') {
      if (!exportedInfo.named.has(name)) {
        // check if it's maybe just a re-export we missed, but worth reporting
        console.log(`❌ ERROR: Named import '${name}' from '${importPath}' in ${file} but NO such named export found in ${exportedInfo.originalPath}`);
        errorsFound++;
      }
    }
  };

  const namedImportRegex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = namedImportRegex.exec(content)) !== null) {
    const importStr = match[1];
    const importPath = match[2];
    if (importPath.startsWith('.') || importPath.startsWith('@/')) {
        const items = importStr.split(',').map(s => {
          // Handle 'import { a as b } from ...'
          const parts = s.trim().split(/\s+as\s+/);
          return parts[0].trim();
        }).filter(Boolean);
        
        items.forEach(item => {
          // exclude types
          if (!item.startsWith('type ') && item !== 'type') {
            checkImport(importPath, 'named', item.replace(/^type\s+/, ''));
          }
        });
    }
  }

  const defaultImportRegex = /import\s+(?!\{|\*|type)([a-zA-Z0-9_]+)\s*(?:,\s*\{[^}]+\})?\s+from\s+['"]([^'"]+)['"]/g;
  while ((match = defaultImportRegex.exec(content)) !== null) {
    const name = match[1];
    const importPath = match[2];
    if (importPath.startsWith('.') || importPath.startsWith('@/')) {
        checkImport(importPath, 'default', name);
    }
  }
});

if (errorsFound === 0) {
  console.log("✅ No import/export mismatches found.");
}
