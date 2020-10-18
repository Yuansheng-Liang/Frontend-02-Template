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

export const PROPERTY = Symbol("property");
export const STATE = Symbol("state");
export const ATTRIBUTE = Symbol("attribute");

export class Component {
    constructor() {
        this[STATE] = Object.create(null);
        this[ATTRIBUTE] = Object.create(null);
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
    trrigerEvent(type, args) {
        this[ATTRIBUTE]["on" + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, {detail: args}))
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




