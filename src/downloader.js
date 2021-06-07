class Downloader {
  constructor(link) {
    this._link = link;
  }

  get link() {
    return this._link;
  }

  set link(link) {
    return this._link = link;
  }
}

class Youtube extends Downloader {
  constructor(link) {
    super(link)
    this.youtube = require('ytdl-core');
  }

  validateURL() {
    try {
      if (!this.youtube.validateURL(this._link)) return false;
      return true;
    } catch(e) {
      return false;
    }
  }

  async getMeta() {
    let data = await this.youtube.getBasicInfo(this._link);
    return { thumbnail: data.videoDetails.thumbnails[0],title: data.videoDetails.title, link: this._link, author: data.videoDetails.author.name }
  }

  download(format) {
    return this.youtube(this._link, {format: format});
    // Pipe me to res
  }
}

module.exports = { Youtube }