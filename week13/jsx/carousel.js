import {Component} from "./framework.js";

export class Carousel extends Component{
    constructor() {
        //this.root = document.createElement("div");
        //this.root = render();
        super();
        this.attributes = Object.create(null);
    }

    setAttribute(name, val) {
        this.attributes[name] = val;
    }
    render() {
        this.root = document.createElement("div");
        this.root.classList.add("Carousel");
        for(let src of this.attributes.src) {
            let img = document.createElement("div");
            img.style.backgroundImage = `url(${src})`;
            this.root.appendChild(img);
        }

        let position = 0;       //序列的偏移值，向左为负，向右为正
        let current = position;
        this.root.addEventListener("mousedown" , event => {
            let startX = event.clientX;         //初始点
            let children = this.root.children;

            let move = event => {
                let x = event.clientX - startX;         //相初始点偏移值，向左为负，向右为正
                /*for(let child of children) {
                    child.style.transition = "none";
                    child.style.transform = `translateX(${position * 500 + x}px)`;
                }*/

                current = position + (x - x % 500) / 500;       //移动之后当前在显示区域上的图片偏移块数

                for(let offset of [0, 1, -1]) {
                    let pos = current + offset;     //移动之后可能出现在显示区域的图片偏移值
                    pos = (pos + children.length * 100) % children.length;      //移动之后可能出现在显示区域的图片对应children的数组标号
                    
                    children[pos].style.transition = "none";
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`;
                }       // "- pos * 500",使该元素回到显示区域；“+ offset * 500”使该元素偏移；“+ x % 500”使该元素进行相对鼠标的移动
            };

            let up = event => {
                let x = event.clientX - startX;         //相初始点偏移值，向左为负，向右为正
                position = position - Math.round(x / 500);      //计算出移动后的整体偏移值

                for(let offset of [0, - Math.sign( Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                    let pos = position + offset;      //移动之后可能出现在显示区域的图片偏移值
                    pos = (pos + children.length * 100) % children.length;      //移动之后可能出现在显示区域的图片对应children的数组标号

                    children[pos].style.transition = "";
                    children[pos].style.transform = `translateX(${ - pos * 500 + offset * 500 }px)`;
                }


                /*for(let child of children) {
                    child.style.transition = "";
                    child.style.transform = `translateX(${position * 500}px)`;
                }*/

                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        });

        /*let currentIndex = 0;
        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;

            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = "none";
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

            setTimeout(() => {
                next.style.transition = '';
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
                next.style.transform = `translateX(${- nextIndex * 100}%)`;
                currentIndex = nextIndex;
            },16)

            
        },3000);*/


        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}