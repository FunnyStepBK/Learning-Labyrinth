const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
console.log('DATABASE URI:', process.env.DATABASE_URI);
console.log('API URI:', process.env.API_URI);
