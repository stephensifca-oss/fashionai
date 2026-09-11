const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const workerDir = path.join(__dirname, '..', '.vercel', 'output', 'static', '_worker.js');
if (fs.existsSync(workerDir)) {
  walkDir(workerDir, (filePath) => {
    if (filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('"async_hooks"')) {
        content = content.replaceAll('"async_hooks"', '"node:async_hooks"');
        content = content.replaceAll("'async_hooks'", "'node:async_hooks'");
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Patched async_hooks in', filePath);
      }
    }
  });
}
