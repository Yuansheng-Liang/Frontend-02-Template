const images = require('images');

function render(viewport, element){
    var img = images(element.style.width, element.style.height);

    if(element.style['background-color']) {
        let color = elemnet.style['background-color'] || 'rbg(0,0,0)';
        color.match(/rgb\((\d+),(\d+),(\d+)\)/);
        img.fill(number(RegExp.$1),number(RegExp.$2),number(RegExp.$3),number(RegExp.$4));
        viewport.draw(img, element.style.left || 0, element.style.top || 0);
    }

    if(element.children) {
        for(var child of element.children) {
            render(viewport, child);
        }
    }
}

module.exports = render;