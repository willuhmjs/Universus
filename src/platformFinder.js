const platforms = require('./downloader.js');

module.exports = function(url) {
  let objects = Object.values(platforms);
  let final = false;
  objects.forEach(obj => {
    let instance = new obj(url);
    if (instance.validateURL()) {
      final = obj.name.toLowerCase();
    }
  })
  return final;
}