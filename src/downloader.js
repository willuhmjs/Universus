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
    if (!this.youtube.validateURL(this._link)) return false;
    return true;
  }

  async getMeta() {
    let data = await this.youtube.getBasicInfo(this._link);
    return { thumbnail: data.videoDetails.thumbnails[0],title: data.videoDetails.title, link: this._link, platform: 'YouTube' }
  }

  download(format) {
    return this.youtube(this._link, {format: format});
    // Pipe me to res
  }
}

class Spotify extends Downloader {
  constructor(link) {
    super(link)
    this.spotify = require('spdl-core');
  }

  validateURL() {
    if (!this.spotify.validateURL(this._link)) return false;
    return true;
  }
}

class Twitter extends Downloader {
  constructor(link) {
    super(link)
    this.twitter = require('twitter-url-direct');
    this.twitter.validateURL = (url) => {
      // todo This is crude, but it'll work for most cases
      if (link.includes('twitter')) return true;
      return false;
    }
  }

  validateURL() {
    if (!this.twitter.validateURL(this._link)) return false;
    return true;
  }
}

module.exports = {
  Youtube, Spotify, Twitter
}