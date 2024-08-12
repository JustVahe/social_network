const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

function renameFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      renameFiles(fullPath);
    } else if (path.extname(fullPath) === '.js') {
      const newFilePath = fullPath.replace(/\.js$/, '.cjs');
      fs.renameSync(fullPath, newFilePath);
    }
  });
}

renameFiles(distDir);