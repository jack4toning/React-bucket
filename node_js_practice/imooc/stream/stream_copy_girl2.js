const fs = require('fs');

let readStream = fs.createReadStream('2.mp4');
let writeStream = fs.createWriteStream('1-stream.mp4');

readStream
    .on('data', function (chunk) {
    if(writeStream.write(chunk)===false){
            console.log('still cached');
            readStream.pause();
        }
})
    .on('end', function () {
        console.log('Finished');
        writeStream.end();
    });

writeStream.on('drain', function () {
    console.log('data drains');
    readStream.resume();
});