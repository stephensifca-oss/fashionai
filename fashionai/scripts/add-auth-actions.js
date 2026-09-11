const fs = require('fs');
let c = fs.readFileSync('src/app/actions/admin.ts', 'utf8');
c = c.replace('import { revalidatePath } from "next/cache";', 'import { revalidatePath } from "next/cache";\nimport { requireAuthPage } from "@/lib/auth";');
c = c.replace(/try {\n    const leads = await getAllLeads\(\);/g, 'try {\n    if (!(await requireAuthPage())) throw new Error("Non autorisé");\n    const leads = await getAllLeads();');
c = c.replace(/try {\n    const updated = await updateLeadStatus/g, 'try {\n    if (!(await requireAuthPage())) throw new Error("Non autorisé");\n    const updated = await updateLeadStatus');
c = c.replace(/try {\n    const success = await deleteLead/g, 'try {\n    if (!(await requireAuthPage())) throw new Error("Non autorisé");\n    const success = await deleteLead');
fs.writeFileSync('src/app/actions/admin.ts', c, 'utf8');
