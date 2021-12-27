const fs = require('fs-extra');
const Promise = require('bluebird');
const { Readable } = require("stream");

exports.read =  async function (filename,option) {
  option = !option?'utf-8':option; 
  const streamtoRead=fs.createReadStream(filename,option)
    const chunks = [];
    return await new Promise((resolve, reject) => {
      streamtoRead.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      streamtoRead.on('error', (err) => reject(err));
      streamtoRead.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).then(data=> JSON.parse(data)).catch(data=>data='error')
  }

exports.write = async function (fileName,data,option) {
  option = !option?'utf-8':option;  
  await new Promise((resolve, reject) => {
      const readable = Readable.from(JSON.stringify(data))
      const writemyStream = fs.createWriteStream(fileName,option); 
      readable.on("data", (chunk) => writemyStream.write(chunk))
      readable.on("end", () => {
      writemyStream.on('finish', () => resolve()).on('error', reject);
      writemyStream.end();
      })
    }); 
  }
