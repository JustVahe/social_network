const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

function renameFilesAndFixImports(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      renameFilesAndFixImports(fullPath);
    } else if (path.extname(fullPath) === '.js') {
      const newFilePath = fullPath.replace(/\.js$/, '.cjs');

      // Read the content of the file
      let content = fs.readFileSync(fullPath, 'utf8');

      // Replace .ts and .js import paths with .cjs
      content = content.replace(/from\s+['"](.*?)(\.ts|\.js)['"]/g, 'from \'$1.cjs\'');
      content = content.replace(/require\(['"](.*?)(\.ts|\.js)['"]\)/g, 'require(\'$1.cjs\')');

      // Write the updated content back
      fs.writeFileSync(fullPath, content);

      // Rename the file to .cjs
      fs.renameSync(fullPath, newFilePath);
    }
  });
}

renameFilesAndFixImports(distDir);