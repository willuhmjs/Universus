let downloaderRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

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
    this.youtube = require("ytdl-core");
  }

  validateURL() {
    if (!this.youtube.validateURL(this._link)) return false;
    return true;
  }
}

class Spotify extends Downloader {
  constructor(link) {
    super(link)
    this.spotify = require("spdl-core");
  }

  validateURL() {
    if (!this.spotify.validateURL(this._link)) return false;
    return true;
  }
}

class Facebook extends Downloader {
  constructor(link) {
    super(link)
    this.facebook = require("fbdl-core");
  }

  validateURL() {
    if (!this.facebook.validateURL(this._link)) return false;
    return true;
  }
}

class Instagram extends Downloader {
  constructor(link) {
    super(link)
    this.instagram = require("instagram-url-direct");
    this.instagram.validateURL = (url) => {
      // todo This is crude, but it'll work for most cases
      if (link.includes("instagram")) return true;
      return false;
    }
  }

  validateURL() {
    if (!this.instagram.validateURL(this._link)) return false;
    return true;
  }
}

class Twitter extends Downloader {
  constructor(link) {
    super(link)
    this.twitter = require("twitter-url-direct");
    this.twitter.validateURL = (url) => {
      // todo This is crude, but it'll work for most cases
      if (link.includes("twitter")) return true;
      return false;
    }
  }

  validateURL() {
    if (!this.twitter.validateURL(this._link)) return false;
    return true;
  }
}

module.exports = {
  Youtube, Spotify, Facebook, Instagram, Twitter
}