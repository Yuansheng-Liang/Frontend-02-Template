const images = require('images');

function render(viewport, element){
    if(element.style){
        var img = images(element.style.width, element.style.height);

      if(element.style['background-color']) {
          let color = element.style['background-color'] || 'rbg(0,0,0)';
          color.match(/rgb\((\d+),(\d+),(\d+)\)/);
////        img.fill(number(RegExp.$1),number(RegExp.$2),number(RegExp.$3),number(RegExp.$4));
            img.fill(Number(RegExp.$1),Number(RegExp.$2),Number(RegExp.$3));
          viewport.draw(img, element.style.left || 0, element.style.top || 0);
       }
    }
    if(element.children) {
        for(var child of element.children) {
            render(viewport, child);
        }
    }
}

module.exports = render;