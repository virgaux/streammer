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
    }).then(data=> JSON.parse(data)).catch(data=>data=undefined)
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

  exports.writeFile = async (file, data, callback)=>{
    return fs.writeFile(file, data, callback)
  }
  exports.pathExists = async (file, callback)=>{
    return fs.pathExists(file, callback)
  }
  exports.ensureFile = async (file, callback)=>{
    return fs.ensureFile(file, callback)
  }
  exports.readFile = async (file, encoding, callback)=>{
    return fs.readFile(file, encoding, callback)
  }
  exports.readJson = async (file, option, callback)=>{
    return fs.readJson(file, option, callback)
  }
  exports.writeJson = async (file, object, options)=>{
    return fs.writeJson(file, object, options)
  }