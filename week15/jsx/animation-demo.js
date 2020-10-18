import {Animation, Timeline} from "./animation.js"
import { ease, easeIn, easeOut, easeInOut, liner } from "./ease.js";

let btn_pause = document.querySelector("#pause");
let btn_resume = document.querySelector("#resume");

let div = document.querySelector("#el");
let div2 = document.querySelector("#el2");
let tl = new Timeline();
let animation = new Animation(div.style, 'transform', 0 , 500 , 2000, 0, liner, (v) => {return `translateX(${v}px)`});

div2.style.transition = `2s liner`;
div2.style.transform = `translateX(${500}px)`;


btn_pause.addEventListener("click", () => {
    tl.pause();
})
btn_resume.addEventListener("click", () => {
    tl.resume();
})

tl.add(animation);
tl.start();