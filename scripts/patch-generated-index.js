const fs = require('fs');
const path = require('path');

/**
 * Patch the generated index.ts to include ApiRequestOptions export
 * This script runs after API generation to ensure the export persists
 */
function patchGeneratedIndex() {
  const indexPath = path.join(__dirname, '../src/generated/index.ts');
  
  if (!fs.existsSync(indexPath)) {
    console.log('❌ Generated index.ts not found');
    return;
  }
  
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Check if ApiRequestOptions export already exists
  if (content.includes("export type { ApiRequestOptions }")) {
    console.log('✅ ApiRequestOptions export already exists');
    return;
  }
  
  // Add the export after ApiError export
  content = content.replace(
    "export { ApiError } from './core/ApiError';",
    "export { ApiError } from './core/ApiError';\nexport type { ApiRequestOptions } from './core/ApiRequestOptions';"
  );
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ Added ApiRequestOptions export to generated index.ts');
}

patchGeneratedIndex();
