/*********************************************** 定义全局变量 ******************************************************************/

// let element = document.documentElement;

// let isMouseListening = false;

// let contexts = new Map();

// let startX, startY;
// let isTap = true,
//     isPan = false,
//     isPress = false;
// let handler = null;

/******************************************** 定义基本事件类型 *******************************************************/
// let start = (point, context) => {
//     //console.log("start", point.clientX, point.clientY);
//     context.startX = point.clientX, context.startY = point.clientY;
//     context.points = [{
//         t: Date.now(),
//         x: point.clientX,
//         y: point.clientY
//     }];


//     context.isTap = true,
//     context.isPan = false,
//     context.isPress = false;

//     context.handler = setTimeout(() => {
//         context.isTap = false,
//         context.isPan = false,
//         context.isPress = true;

//         context.handler = null;
//         console.log("pressStart");
//     }, 500);
// }

// let move = (point, context) => {
//     let dx = point.clientX - context.startX,
//         dy = point.clientY - context.startY;

//     if(!context.isPan && dx ** 2 + dy **2 >= 100) {     //滑动距离超过10px后，状态变成pan
//         clearTimeout(context.handler);

//         context.isTap = false,
//         context.isPan = true,
//         context.isPress = false;

//         console.log("panStart", point.clientX, point.clientY);
//     }

//     if(context.isPan) {         //状态为pan时执行以下代码
//         console.log("Pan", dx, dy);
//     }

//     context.points = context.points.filter((point) => Date.now() - point.t <= 500);
//     context.points.push({
//         t: Date.now(),
//         x: point.clientX,
//         y: point.clientY
//     });
//     //console.log("move", point.clientX, point.clientY);
// }

// let end = (point, context) => {
//     if(context.isTap) {         //状态为tap时执行代码
//         clearTimeout(context.handler);

//         context.isTap = true,
//         context.isPan = false,
//         context.isPress = false;

//         console.log("Tap", point.clientX, point.clientY);
//         dispatch("tap", {});
//     }
//     if(context.isPan) {

//         context.isTap = false,
//         context.isPan = true,
//         context.isPress = false;

//         console.log("panEnd", point.clientX, point.clientY);
//         dispatch("pan", {});
//     }
//     if(context.isPress) {

//         context.isTap = false,
//         context.isPan = false,
//         context.isPress = true;

//         console.log("pressEnd", point.clientX, point.clientY);
//         dispatch("press", {});
//     }

//     context.points = context.points.filter((point) => Date.now() - point.t <= 500);

//     let d, v;
//     if(!context.points.length) {
//         v = 0;
//     } else {
//         d = Math.sqrt((point.clientX - context.points[0].x) ** 2 +
//         (point.clientY - context.points[0].y) ** 2);

//         v = d / (Date.now() - context.points[0].t);
//     }

//     console.log(v);
//     if(v > 1.5) {
//         console.log("flick");
//     }

//     //console.log("end", point.clientX, point.clientY);
// }

// let cancel = (point, context) => {
//     clearTimeout(context.handler);
//     console.log("cancel", point.clientX, point.clientY);
// }

// /***************************** 启用mouse事件 ***************************************************************************************/


// element.addEventListener("mousedown", event => {
//     let context = Object.create(null);
//     contexts.set("mouse" + (1 << event.button), context);
//     start(event, context);

//     let mousemove = (event, context) => {
//         let button = 1;

//         while(button <= event.buttons) {

//             //因为button和event.buttons在鼠标中键和右键按下时的值是相反的，所以要进行交换
//             let key;
//             if(button === 2)
//                 key = 4;
//             else if(button === 4)
//                 key = 2;
//             else
//                 key = button;

//             if(button & event.buttons) {
//                 context = contexts.get("mouse" + key);
//                 move(event, context);
//             }
//             button = button << 1;
//         }
//     }


//     let mouseup = event => {
//         //console.log("mouseup");
//         let context = contexts.get("mouse" + (1 << event.button));
//         end(event, context);
//         contexts.delete("mouse" + (1 << event.button));

//         if(isMouseListening) {
//             document.removeEventListener("mousemove", mousemove);
//             document.removeEventListener("mouseup", mouseup);

//             isMouseListening = false;
//         }
//     }
//     if(!isMouseListening) {
//         document.addEventListener("mousemove", mousemove);
//         document.addEventListener("mouseup", mouseup);
//         isMouseListening = true;
//     }
// })

// /***************************** 启用touch事件 **********************************************************************************/

// element.addEventListener("touchstart", point => {
//     for(let touch of point.changedTouches) {
//         let context  = Object.create(null);
//         contexts.set(touch.identifier, context);
//         start(touch, context);
//     }
// });

// element.addEventListener("touchmove", point => {
//     for(let touch of point.changedTouches) {
//         let context = contexts.get(touch.identifier);
//         move(touch, context);
//     }
// });

// element.addEventListener("touchend", point => {
//     for(let touch of point.changedTouches) {
//         let context = contexts.get(touch.identifier);
//         end(touch, context);
//         contexts.delete(touch.identifier);
//     }
// });

// element.addEventListener("touchcancel", point => {
//     for(let touch of point.changedTouches) {
//         let context = contexts.get(touch.identifier);
//         cancel(touch, context);
//         contexts.delete(touch.identifier);
//     }
// });

/*********************** 设置事件派发函数 ***********************************************/

// function dispatch(type, properties) {
//     let event = new Event(type);
//     for(let name in properties) {
//         event[name] = properties[name];
//     }
//     element.dispatchEvent(event);
// }

export class Dispatcher {
    constructor(element) {
        this.element = element;
    }
    dispatch(type, properties) {
        let event = new Event(type);
        for(let name in properties) {
            event[name] = properties[name];
        }
        this.element.dispatchEvent(event);
    }

}


export class Listener {
    constructor(element, recognizer) {

        let isMouseListening = false;
        let contexts = new Map();
        /***************************** 启用mouse事件 ***************************************************************************************/
        element.addEventListener("mousedown", event => {
            let context = Object.create(null);

            contexts.set("mouse" + (1 << event.button), context);
            start(event, context);

            let mousemove = (event, context) => {
                let button = 1;

                while(button <= event.buttons) {

                    //因为button和event.buttons在鼠标中键和右键按下时的值是相反的，所以要进行交换
                    let key;
                    if(button === 2)
                        key = 4;
                    else if(button === 4)
                        key = 2;
                    else
                        key = button;

                    if(button & event.buttons) {
                        context = contexts.get("mouse" + key);
                        move(event, context);
                    }
                    button = button << 1;
                }
            }
            let mouseup = event => {
                //console.log("mouseup");
                let context = contexts.get("mouse" + (1 << event.button));
                end(event, context);
                contexts.delete("mouse" + (1 << event.button));

                if(isMouseListening) {
                    document.removeEventListener("mousemove", mousemove);
                    document.removeEventListener("mouseup", mouseup);

                    isMouseListening = false;
                }
            }
            if(!isMouseListening) {
                document.addEventListener("mousemove", mousemove);
                document.addEventListener("mouseup", mouseup);
                isMouseListening = true;
            }
        })

        /***************************** 启用touch事件 **********************************************************************************/
        element.addEventListener("touchstart", point => {
            for(let touch of point.changedTouches) {
                let context  = Object.create(null);
                contexts.set(touch.identifier, context);
                start(touch, context);
            }
        });

        element.addEventListener("touchmove", point => {
            for(let touch of point.changedTouches) {
                let context = contexts.get(touch.identifier);
                move(touch, context);
            }
        });

        element.addEventListener("touchend", point => {
            for(let touch of point.changedTouches) {
                let context = contexts.get(touch.identifier);
                end(touch, context);
                contexts.delete(touch.identifier);
            }
        });

        element.addEventListener("touchcancel", point => {
            for(let touch of point.changedTouches) {
                let context = contexts.get(touch.identifier);
                cancel(touch, context);
                contexts.delete(touch.identifier);
            }
        });
    }
}

export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
    start(point, context) {
        //console.log("start", point.clientX, point.clientY);
        context.startX = point.clientX, context.startY = point.clientY;
        context.points = [{
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        }];
    
    
        context.isTap = true,
        context.isPan = false,
        context.isPress = false;
    
        context.handler = setTimeout(() => {
            context.isTap = false,
            context.isPan = false,
            context.isPress = true;
    
            context.handler = null;
            console.log("pressStart");
        }, 500);
    }
    move(point, context) {
        let dx = point.clientX - context.startX,
            dy = point.clientY - context.startY;
    
        if(!context.isPan && dx ** 2 + dy **2 >= 100) {     //滑动距离超过10px后，状态变成pan
            clearTimeout(context.handler);
    
            context.isTap = false,
            context.isPan = true,
            context.isPress = false;
            context.isVertical = Math.abs(dx) < Math.abs(dy);
    
            console.log("panStart", point.clientX, point.clientY);
            this.dispatcher.dispatch("panstart", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            })
        }
    
        if(context.isPan) {         //状态为pan时执行以下代码
            console.log("Pan", dx, dy);
        }
    
        context.points = context.points.filter((point) => Date.now() - point.t <= 500);
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        });
        //console.log("move", point.clientX, point.clientY);
    }
    end(point, context) {
        if(context.isTap) {         //状态为tap时执行代码
            clearTimeout(context.handler);
    
            context.isTap = true,
            context.isPan = false,
            context.isPress = false;
    
            console.log("Tap", point.clientX, point.clientY);
            dispatch("tap", {});
        }
        
        if(context.isPress) {
    
            context.isTap = false,
            context.isPan = false,
            context.isPress = true;
    
            console.log("pressEnd", point.clientX, point.clientY);
            dispatch("press", {});
        }
    
        context.points = context.points.filter((point) => Date.now() - point.t <= 500);
    
        let d, v;
        if(!context.points.length) {
            v = 0;
        } else {
            d = Math.sqrt((point.clientX - context.points[0].x) ** 2 +
            (point.clientY - context.points[0].y) ** 2);
    
            v = d / (Date.now() - context.points[0].t);
        }
    
        //console.log(v);
        if(v > 1.5) {
            console.log("flick");
            this.dispatcher.dispatch("flick", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                velocity: v
            });
            context.isFlick = true;
        } else {
            context.isFlick = false;
        }

        if(context.isPan) {
    
            context.isTap = false,
            context.isPan = true,
            context.isPress = false;
            context.isVertical = Math.abs(dx)
    
            console.log("panEnd", point.clientX, point.clientY);
            dispatch("pan", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick
            });
        }
    
        //console.log("end", point.clientX, point.clientY);
    }
    cancel(point, context) {
        clearTimeout(context.handler);
        console.log("cancel", point.clientX, point.clientY);
    }

}

export function enableGesture(element) {
    new Listener(element, new Recognizer(new Dispatcher(element)));
}

