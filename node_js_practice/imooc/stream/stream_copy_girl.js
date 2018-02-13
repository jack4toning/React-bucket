const fs = require('fs');
const source = fs.readFileSync('../Buffer/girl.png');

fs.writeFileSync('stream_copy_girl.png',source);