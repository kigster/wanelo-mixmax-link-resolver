"use strict";

const resolver = require('../../api/resolver');
const assert = require('assert');
const helper = new (require('../spec_helper'));
const expect = require("chai").expect;

const describe = require("mocha/lib/mocha").describe;
const it = require("mocha/lib/mocha.js").it;

const Product = require("../../lib/product");
var before = require("mocha/lib/mocha").before;

describe('Product', function() {
  var fixture;
  var product;

  before(function() {
    fixture = helper.loadFixture('./test/fixtures/wanelo_product.json');
    product = new Product(fixture);
  });

  it('should return a string from #loadFixtures', function() {
    expect(fixture).to.be.a('string');
    expect(fixture.length).to.eql(6220);
  });

  describe('product JSON', function() {

    it('should extract product name', function() {
      expect(product.name()).to.eql('Saucony Shadow 6000 Suede "Irish Coffee Pack" - Black Coffee');
    });
    it('should shorten long product name', function() {
      expect(product.name(30)).to.eql('Saucony Shadow 6000 Suede "Iri&hellip;');
    });
    it('should extract product image', function() {
      expect(product.image).to.eql('https://cdn-img-3.wanelo.com/p/7c4/222/ba8/6599e4086a01b2285716b41/x200-q90.jpg');
    });
    it('should extract store name', function() {
      expect(product.store).to.eql('jiberish.com');
    });
    it('should extract product price', function() {
      expect(product.price).to.eql(120.00);
    });
    it('should format product price', function() {
      expect(product.priceFormatted).to.eql("$120.00");
    });
    it('should extract product currency', function() {
      expect(product.currency).to.eql('$');
    });
  });


});
