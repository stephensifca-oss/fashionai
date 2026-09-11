const fs = require('fs');

function removeAuth(file) {
  let c = fs.readFileSync(file, 'utf8');
  c = c.replace(/import\s*{\s*checkAuthAPI\s*}\s*from\s*['"]@\/lib\/auth['"];\n?/g, '');
  c = c.replace(/const\s+authError\s*=\s*await\s*checkAuthAPI\(\);\n?\s*if\s*\(authError\)\s*return\s*authError;\n?/g, '');
  fs.writeFileSync(file, c, 'utf8');
}

removeAuth('src/app/api/shoots/route.ts');
removeAuth('src/app/api/admin/test-pipeline/route.ts');
