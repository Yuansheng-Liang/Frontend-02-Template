import {createElement} from "./framework.js";
import {Carousel} from "./carousel.js";
import {Timeline, Animation} from "./animation.js"


let d = ["./src/0dc4f43d173945afa3054e23bc499efb.jpeg",
         "./src/f8e5cac2bb2cb181.jpeg",
         "./src/katongshangyeyuyi_116863_12.jpg"]



let a = <Carousel src={d} />

//document.body.appendChild(a);
a.mountTo(document.body);



let tl = new Timeline();

window.tl = tl;
window.animation = new Animation({ set a(v) {console.log(v)}}, "a", 0, 100, 1000, null);

//tl.add(new Animation({ set a(v) {console.log(v)}}, "a", 0, 100, 1000, null));

tl.start();




