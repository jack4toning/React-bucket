const fs = require('fs');

fs.createReadStream('2.mp4').pipe(fs.createWriteStream('1-pipe.mp4'));