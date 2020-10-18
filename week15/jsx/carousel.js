import {Component, STATE, PROPERTY, ATTRIBUTE} from "./framework.js";
import {Timeline, Animation} from "./animation.js";
import {ease} from "./ease.js";
import {enableGesture} from "./gesture.js"

export {STATE, PROPERTY, ATTRIBUTE} from "./framework.js";

export class Carousel extends Component{
    constructor() {
        super();
    }

    setAttribute(name, val) {
        this[ATTRIBUTE][name] = val;
    }
    render() {
        this.root = document.createElement("div");
        this.root.classList.add("Carousel");
        for(let src of this[ATTRIBUTE].src) {
            let img = document.createElement("div");
            img.style.backgroundImage = `url(${src.img})`;
            this.root.appendChild(img);
        }

        enableGesture(this.root);
        let timeline = new Timeline;
        timeline.start();

        let handler = null;
        let t = 0;      //记录timeline暂停的时间
        let ax = 0;     //记录暂停后图片已经移动的距离

        this[STATE].currentIndex = 0; 
        this.trrigerEvent("change",{currentIndex: this[STATE].currentIndex});
        let children = this.root.children;

        //let current = this[STATE].currentIndex;


        this.root.addEventListener("start", event => {
            timeline.pause();
            clearInterval(handler);
            let progress = (Date.now() - t) / 1500;
            ax = 500 - ease(progress) * 500;        //记录暂停后图片已经移动的距离
        });
        this.root.addEventListener("tap", event => {
            this.trrigerEvent("click", {
                data: this[ATTRIBUTE].src[this[STATE].currentIndex],
                currentIndex: this[STATE].currentIndex
            })
        });
        this.root.addEventListener("Pan", event => {
            let panX = event.clientX - event.startX + ax;

            let current = this[STATE].currentIndex - (panX - panX % 500) / 500;      //算出出现在显示屏幕的区域，(panX - panX % 500) / 500为移动的多少"块"

            for(let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;      //将pos取整，使之能对应children的下标
                children[pos].style.transition = 'none';
                children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + panX % 500}px)`;
            // - pos * 500 使图片移动到显示区域，offset * 500 使图片按照offset偏移相应的块数，panX % 500 表示鼠标不包括块数的偏移值（包含块数的偏移值已经被算入current中）
            }
        });
        this.root.addEventListener("end", event => {
            let panX = event.clientX - event.startX + ax;

            timeline.reset();
            timeline.start();

            let current = this[STATE].currentIndex - (panX - panX % 500) / 500;      //算出出现在显示屏幕的区域，(panX - panX % 500) / 500为移动的多少"块"
            let direction = Math.round((panX % 500) / 500);
            if(event.isFlick) {
                // direction = (event.velocity > 0 ? 1 : -1);
                if(event.velocity < 0) {
                    direction = Math.ceil((panX % 500) / 500);
                } else {
                    direction = Math.floor((panX % 500) / 500);
                }
            }
            for(let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;      //将pos取整，使之能对应children的下标
                // children[pos].style.transition = 'none';
                // children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + panX % 500}px)`;
                timeline.add(new Animation(children[pos].style, "transform", 
                                            - pos * 500 + offset * 500 + panX % 500, 
                                            - pos * 500 + offset * 500 + direction * 500 ,
                                            1500, 0, ease, v => `translateX(${v}px)`));
            }

            //direction 大于0时（鼠标右移时） currentIndex 即当前显示的图片应该为已显示图片的左边图片，即“-1”,

            // if(direction > 0) 
            //     this[STATE].currentIndex = current - 1;
            // else if(direction < 0 )
            //     this[STATE].currentIndex = current + 1;
            // else 
            //     this[STATE].currentIndex = current;

            this[STATE].currentIndex = current - direction;
            
            this[STATE].currentIndex = (this[STATE].currentIndex % children.length + children.length) % children.length;

            this.trrigerEvent("Change",{currentIndex: this[STATE].currentIndex});
            handler = setInterval(interval, 3000);

        });

        let interval = () => {

            let nextIndex = (this[STATE].currentIndex + 1) % children.length;       //算出下一个将要出现的图片序号
            let current = children[this[STATE].currentIndex], next = children[nextIndex];

            t = Date.now();
            // - this[STATE].currentIndex * 500，使当前项出现在显示区域；- 500 - this[STATE].currentIndex * 500，使当前项从显示区域左移500px
            timeline.add(new Animation(current.style, "transform", - this[STATE].currentIndex * 500, - 500 - this[STATE].currentIndex * 500 , 1500, 0, ease, v => `translateX(${v}px)`));
            // 500 - nextIndex * 500，使下一项出现在显示区域左侧；- nextIndex * 500，使下一项出现在显示区域
            timeline.add(new Animation(next.style, "transform", 500 - nextIndex * 500, - nextIndex * 500, 1500, 0, ease, v => `translateX(${v}px)`));

            this[STATE].currentIndex = nextIndex;
            this.trrigerEvent("Change",{currentIndex: this[STATE].currentIndex});
        };
        handler = setInterval(interval, 3000);


    {
        // this.root.addEventListener("mousedown" , event => {
        //     let startX = event.clientX;         //初始点
        //     let children = this.root.children;

        //     let move = event => {
        //         let x = event.clientX - startX;         //相初始点偏移值，向左为负，向右为正
        //         /*for(let child of children) {
        //             child.style.transition = "none";
        //             child.style.transform = `translateX(${position * 500 + x}px)`;
        //         }*/

        //         current = position + (x - x % 500) / 500;       //移动之后当前在显示区域上的图片偏移块数

        //         for(let offset of [0, 1, -1]) {
        //             let pos = current + offset;     //移动之后可能出现在显示区域的图片偏移值
        //             pos = (pos + children.length * 100) % children.length;      //移动之后可能出现在显示区域的图片对应children的数组标号

        //             children[pos].style.transition = "none";
        //             children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`;
        //         }       // "- pos * 500",使该元素回到显示区域；“+ offset * 500”使该元素偏移；“+ x % 500”使该元素进行相对鼠标的移动
        //     };



        //     let up = event => {
        //         let x = event.clientX - startX;         //相初始点偏移值，向左为负，向右为正
        //         position = position - Math.round(x / 500);      //计算出移动后的整体偏移值

        //         for(let offset of [0, - Math.sign( Math.round(x / 500) - x + 250 * Math.sign(x))]) {
        //             let pos = position + offset;      //移动之后可能出现在显示区域的图片偏移值
        //             pos = (pos + children.length * 100) % children.length;      //移动之后可能出现在显示区域的图片对应children的数组标号

        //             children[pos].style.transition = "";
        //             children[pos].style.transform = `translateX(${ - pos * 500 + offset * 500 }px)`;
        //         }


        //         /*for(let child of children) {
        //             child.style.transition = "";
        //             child.style.transform = `translateX(${position * 500}px)`;
        //         }*/

        //         document.removeEventListener("mousemove", move);
        //         document.removeEventListener("mouseup", up);
        //     };

        //     document.addEventListener("mousemove", move);
        //     document.addEventListener("mouseup", up);
        // });

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
    }

        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}