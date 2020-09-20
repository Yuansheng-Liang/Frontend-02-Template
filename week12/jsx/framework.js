export function createElement(type, attributes, ...children) {
    
    let element; 
    if(typeof type === "string") {
        element = new ElementWrapper(type);
    } else {
        element = new type;
    }
    
    for(let attribute in attributes) {                      //attributes 以对象的形式传进来， children以数组的形式传进来
        element.setAttribute(attribute, attributes[attribute]);
    }
    for(let child of children) {
        if(typeof child === "string" ) {
            child = new TextNode(child);
        }
        element.appendChild(child);
    }
    return element;
}

export class Component {
    constructor() {
    }
    setAttribute(name, value){
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class ElementWrapper extends Component{
    constructor(type) {
        this.root = document.createElement(type);
    }
}

class TextNode extends Component{
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}