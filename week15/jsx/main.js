import {createElement} from "./framework.js";
import {Carousel} from "./carousel.js";
import {Timeline, Animation} from "./animation.js"


let d = [
            {   
                img: "./src/p1.jpeg",
                src: "https://www.cctv.com/"    
            },
            {   
                img: "./src/p2.jpeg",
                src: "https://www.cctv.com/"    
            },
            {   
                img: "./src/p3.jpg",
                src: "https://www.cctv.com/"    
            }
        ]

let a = <Carousel src={d} 
        onChange={event => console.log(event.detail.currentIndex)} 
        onClick={event => window.location.href = event.detail.data.src  }/>

//document.body.appendChild(a);
a.mountTo(document.body);



let tl = new Timeline();

// window.tl = tl;
// window.animation = new Animation({ set a(v) {console.log(v)}}, "a", 0, 100, 1000, null);
 //tl.add(new Animation({ set a(v) {console.log(v)}}, "a", 0, 100, 1000, null));

 //tl.start();




