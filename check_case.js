const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all TS/TSX files
const files = execSync('find src -name "*.tsx" -o -name "*.ts"').toString().split('\\n').filter(Boolean);

let mismatchFound = false;

// We need to check every import and see if the path exactly matches the file system's case
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const importRegex = /import\s+(?:[^"']+from\s+)?['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.') || importPath.startsWith('@/')) {
        let resolvedPath;
        if (importPath.startsWith('@/')) {
            resolvedPath = path.join('src', importPath.substring(2));
        } else {
            resolvedPath = path.join(path.dirname(file), importPath);
        }
        
        const parts = resolvedPath.split(path.sep);
        let currentPath = '.';
        
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part === '.' || part === '..') {
               currentPath = path.join(currentPath, part);
               continue;
            }
            if (fs.existsSync(currentPath)) {
                const dirContent = fs.readdirSync(currentPath);
                
                if (i === parts.length - 1) {
                    const exactMatch = dirContent.find(p => p === part || p.startsWith(part + '.'));
                    if (!exactMatch) {
                        const caseInsensitiveMatch = dirContent.find(p => p.toLowerCase() === part.toLowerCase() || p.toLowerCase().startsWith(part.toLowerCase() + '.'));
                        if (caseInsensitiveMatch) {
                            console.log(`❌ CASE MISMATCH in ${file}: Imports '${importPath}', actual file/folder is '${caseInsensitiveMatch}'.`);
                            mismatchFound = true;
                        }
                    }
                } else {
                    const exactMatch = dirContent.find(p => p === part);
                    if (!exactMatch) {
                        const caseInsensitiveMatch = dirContent.find(p => p.toLowerCase() === part.toLowerCase());
                        if (caseInsensitiveMatch) {
                            console.log(`❌ CASE MISMATCH in ${file}: Imports '${importPath}', actual directory in path is '${caseInsensitiveMatch}' (expected '${part}').`);
                            mismatchFound = true;
                            break;
                        } else {
                            break;
                        }
                    } else {
                        currentPath = path.join(currentPath, part);
                    }
                }
            } else {
                break;
            }
        }
    }
  }
});

if (!mismatchFound) console.log("✅ No case mismatches found.");
