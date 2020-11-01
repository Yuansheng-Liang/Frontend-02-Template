var assert = require("assert");
// var add = require("../add.js").add;
// var mul = require("../add.js").mul;

  import {add, mul} from "../add.js";


describe("add", function() {
    it("123 + 465 is 588", function() {
        assert.equal(add(123, 465), 588);
    });
    it("159 + 465 is 624", function() {
        assert.equal(add(159, 465), 624);
    })
})

describe("mul", function() {
    it("1 * 8 is 8", function() {
        assert.equal(mul(1, 8), 8);
    });
    it("3 * 8 is 24", function() {
        assert.equal(mul(3, 8), 24);
    });

})
