const https = require('https');
const fs = require('fs');
const path = require('path');

const OPENAPI_URL = 'https://api.swipeflow.io/v1/openapi.json';
const OUTPUT_FILE = path.join(__dirname, '..', 'openapi.json');

console.log(`📥 Fetching OpenAPI spec from: ${OPENAPI_URL}`);

https.get(OPENAPI_URL, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      // Validate JSON
      const spec = JSON.parse(data);
      
      // Write to file
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(spec, null, 2));
      
      console.log('✅ OpenAPI spec fetched successfully from SwipeFlow API');
    } catch (error) {
      console.error('❌ Error parsing OpenAPI spec:', error.message);
      process.exit(1);
    }
  });
}).on('error', (error) => {
  console.error('❌ Error fetching OpenAPI spec:', error.message);
  process.exit(1);
});
