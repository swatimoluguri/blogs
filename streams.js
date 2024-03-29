const fn=require('fs');
const readStream=fn.createReadStream('./docs/file1.txt');
const writeStream=fn.createWriteStream('./docs/file2.txt');
readStream.on('data',(chunk)=>{
    console.log('-------------New-----------');
    console.log(chunk.toString());
    writeStream.write('\n---------------New---------------\n');
    writeStream.write(chunk.toString());

})
//piping
readStream.pipe(writeStream);