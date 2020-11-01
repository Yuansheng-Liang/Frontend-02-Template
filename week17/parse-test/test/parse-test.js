var assert = require("assert");
import {parseHTML} from "../src/parser.js";

describe("parseHTML: ", function() {
    it("<a>asd</a>", function() {
        let tree = parseHTML('<a>asd</a>');

        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "element");
        assert.equal(tree.children[0].attributes.length, 0);

        assert.equal(tree.children[0].children.length, 1);
    });

    it("<div/>", function(){
        let tree = parseHTML("<div/>");
        assert.equal(tree.children.length, 1);
    })

    
    it("<div id=\"giao\">asd</div>", function() {
        let tree = parseHTML('<div id="giao">asd</div>');

        console.log(tree.children[0].attributes.length);
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "element");
        assert.equal(tree.children[0].attributes.length, 1);

        assert.equal(tree.children[0].children.length, 1);
    });

    it("<div id=\"giao\" class=\"diu\">asd</div>", function() {
        let tree = parseHTML('<div id="giao" class="diu">asd</div>');

        console.log(tree.children[0].attributes.length);
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "element");
        assert.equal(tree.children[0].attributes.length, 2);

        assert.equal(tree.children[0].children.length, 1);
    });

    it("<div id=\"giao\" class=\"diu\" dd=dd />", function() {
        let tree = parseHTML('<div id="giao"  class="diu" dd=dd />');

        console.log(tree.children[0].attributes.length);
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "element");
        assert.equal(tree.children[0].attributes.length, 3);

        assert.equal(tree.children[0].children.length, 0);
    });

    it("<div id=\"giao\" class =\"diu\" dd=dd />", function() {
        let tree = parseHTML('<div id="giao"  class ="diu" dd=dd />');

        console.log(tree.children[0].attributes.length);
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "element");
        assert.equal(tree.children[0].attributes.length, 3);

        assert.equal(tree.children[0].children.length, 0);
    });

    // it("<div id=\"giao\" class =\"diu\"", function() {
    //     let tree = parseHTML('<div id="giao"  class ="diu"');
    // });
    
    // it("</div id=\"giao\" class =\"diu\"", function() {
    //     let tree = parseHTML('</div id="giao"  class ="diu"');
    // });

    it("<div id=\'giao\' class =\'diu\' dd=dd/>", function() {
        let tree = parseHTML("<div id='giao'  class ='diu' dd=dd/>");

        console.log(tree.children[0].attributes.length);
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "element");
        assert.equal(tree.children[0].attributes.length, 3);

        assert.equal(tree.children[0].children.length, 0);
    });

    it("<div id= \'giao\' class =\'diu\' dd=dd/>", function() {
        let tree = parseHTML("<div id= 'giao'  class ='diu' dd=dd/>");

        console.log(tree.children[0].attributes.length);
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "element");
        assert.equal(tree.children[0].attributes.length, 3);

        assert.equal(tree.children[0].children.length, 0);
    });


    it("<div id=\"giao\" class=\"diu\" dd=dd/>", function() {
        let tree = parseHTML('<div id="giao"  class="diu" dd=dd/>');

        console.log(tree.children[0].attributes.length);
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "element");
        assert.equal(tree.children[0].attributes.length, 3);

        assert.equal(tree.children[0].children.length, 0);
    });

    it("<div id=\"giao\" class=\"diu\" dd=dd></div>", function() {
        let tree = parseHTML('<div id="giao"  class="diu" dd=dd></div>');

        console.log(tree.children[0].attributes.length);
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "element");
        assert.equal(tree.children[0].attributes.length, 3);

        assert.equal(tree.children[0].children.length, 0);
    });

})

