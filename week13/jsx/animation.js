const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations"); 
const START_TIME = Symbol("start-time");
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");


export class Timeline {
    constructor() {
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
        this.state = 'Inited';      //设置状态控制执行
    }

    start() {
        if(this.state !== "Inited")
            return;
        this.state = "Started";
        let startTime = Date.now();
        this[PAUSE_TIME] = 0;
        this[TICK] = () => {
            let now = Date.now();
            for(let animation of this[ANIMATIONS]) {        //可以控制多个animation同时进行
                let t;

                if(this[START_TIME].get(animation) < startTime)     //this.add()传入的时间早于Timeline的startTime
                    t = now - startTime - this[PAUSE_TIME];         //因为Date.now()在不断变化，所以要减去暂停所用到的时间this[PAUSE_TIME]
                else                                                //this.add()传入的时间晚于Timeline的startTime
                    t = now - this[START_TIME].get(animation) - this[PAUSE_TIME];

                if(animation.duration < t) {
                    this[ANIMATIONS].delete(animation);
                    t = animation.duration;
                }
                animation.receive(t);
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);     //this[TICK_HANDLER]收集requestAnimationFrame(this[TICK])的返回值       
        }                                                               //用于pause()中的cancelAnimationFrame(this[TICK_HANDLER])
        this[TICK]();
    };
    reset() {       //将所有状态和参数初始化
        this.state = "Inited";
        this.pause();
        let startTime = Date.now();
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
        this[PAUSE_TIME] = 0;
        this[PAUSE_START] = 0;
        this[TICK_HANDLER] = null;
    }

    pause() {
        if(this.state !== "Started")
            return;
        this.state = "Paused";
        this[PAUSE_START] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER]);       //取消动画播放，这个函数的参数为"requestAnimationFrame()"的返回值
    };


    resume() {
        if(this.state !== "Paused")
            return;
        this.state = "Started";
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];     //计算出每次暂停的时间间隔，并累加
        this[TICK]();

    };
    add(animation, startTime) {
        if(arguments.length < 2) {
            startTime = Date.now();
        }
        this[ANIMATIONS].add(animation);
        this[START_TIME].set(animation, startTime + animation.delay);       //传入animation和它实际开始的时间
    };
}

export class Animation {
    constructor(object, property, stratValue, endValue, duration, delay, timingFunction, template) {
        this.object  = object;
        this.property  = property;
        this.stratValue  = stratValue;
        this.endValue  = endValue;
        this.duration  = duration;
        this.timingFunction  = timingFunction;      //控制进程参数的变化方式，以callback形式传入
        this.delay = delay;
        this.template = template;       //控制参数对this.object[this.property]的改变方式，以callback形式传入
    }

    receive(time) {     //接受Timeline控制的时间，并根据timingFunction和template来改变this.object[this.property]
        //console.log(time);
        let progress = this.timingFunction(time / this.duration);
        let range = this.endValue - this.stratValue;
        this.object[this.property] = this.template(this.stratValue + range * progress);
    };
}



