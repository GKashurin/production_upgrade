const fs = require('fs'); // удаляет cache после каждого install
const path = require('path');
const dir = path.resolve(__dirname, '..', 'node_modules/.cache')
fs.rmSync(dir, { recursive: true, force: true });
