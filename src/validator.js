let youtube = require("ytdl-core"),
spotify = require("spdl-core").default,
instagram = require("instagram-url-direct"),
twitter = require("twitter-url-direct"),
facebook = require("fbdl-core");


// Yes this is crude, but it's fast and it works
instagram.validateURL = (link) => {
  if (link.includes("instagram")) return true;
  return false;
}

twitter.validateURL = (link) => {
  if (link.includes("twitter")) return true;
  return false;
}

module.exports = class Validate {
  constructor(url) {
    this.url = url;

  }

  getPlatform() {
    if (this.youtube(this.url)) {
      return "youtube";
    } else if (this.spotify(this.url)) {
      return "spotify";
    } else if (this.instagram(this.url)) {
      return "instagram";
    } else if (this.twitter(this.url)) {
      return "twitter";
    } else if (this.facebook(this.url)) {
      return "facebook";
    } else {
      return false;
    }
  }

  // Validate a *specific* platform
  youtube() {
    return youtube.validateURL(this.url);
  }

  spotify() {
    return spotify.validateURL(this.url);
  }

  instagram() {
    return instagram.validateURL(this.url);
  }

  twitter() {
    return twitter.validateURL(this.url);
  }

  facebook() {
    return facebook.validateURL(this.url);
  }
}