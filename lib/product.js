"use strict";
const sprintf = require("sprintf-js").sprintf;

class Product {

  constructor(jsonString) {
    this._json = JSON.parse(jsonString);

    let matches = this.url.match(/wanelo\.com\/p\/([a-zA-Z0-9]+)/);
    if (matches && matches[1]) {
      this._productId = matches[1];
      this._canonicalUrl = `https://wanelo.com/p/${encodeURIComponent(this._productId)}`;
    }
  }

  name(maxChars) {
    if (maxChars == undefined) maxChars = 80;
    var n = this._json.name;
    if (n.length > maxChars) {
      n = n.substring(0, maxChars) + '&hellip;'
    }
    return n;
  }

  get saversUrl() {
    return `${this._canonicalUrl}/savers`;
  }

  get url() {
    return this._json.object_url;
  }

  get savesCount() {
    return this._json.saves_count;
  }

  get store() {
    return this._json.store.name;
  }

  get storeUrl() {
    return this._json.store.object_url;
  }

  get price() {
    return this._json.price_cents / 100;
  }

  get priceFormatted() {
    return sprintf("%s%.2f", this.currency, this.price);
  }

  get image() {
    return this._json.images.x200;
  }

  get currency() {
    if (this._currencies == undefined) {
      this._currencies = {
        "USD": "$",
        "GBP": "£",
        "YEN": "¥",
        "EUR": "€"
      };
    }
    return this._currencies[this._json.currency] || '$';
  }

}


module.exports = Product;
