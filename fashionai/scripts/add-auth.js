const fs = require('fs');
function addAuth(file) {
  let c = fs.readFileSync(file, 'utf8');
  c = c.replace(/import { NextResponse/g, 'import { checkAuthAPI } from "@/lib/auth";\nimport { NextResponse');
  c = c.replace(/export async function (GET|POST)\((.*)\) {/g, 'export async function $1($2) {\n  const authError = await checkAuthAPI($2 ? $2 : undefined);\n  if (authError) return authError;\n');
  fs.writeFileSync(file, c, 'utf8');
}
addAuth('src/app/api/shoots/route.ts');
addAuth('src/app/api/admin/test-pipeline/route.ts');
