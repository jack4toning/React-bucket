const Readable = require('stream').Readable;
const Writable = require('stream').Writable;

let readStream = new Readable();
let writeStream = new Writable();

readStream.push('I');
readStream.push('Love');
readStream.push('PH\n');
readStream.push(null);

writeStream._write = function (chunk,encode,cb) {
  console.log(chunk.toString());
    cb&cb();
};

readStream.pipe(writeStream);
