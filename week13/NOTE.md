学习笔记

第一节，疑问：
    1.在TimeLine的this[TICK]中，这样的函数设置，如果duration一直大于t的话，会不会导致同一个Animation被反复调用？
        答：不会，因为t会随着Timeline的推进而增加，最终会大于duration。

第二节，学到了：
    在Timeline里设置this[START_TIME], 用来存储animation加入时的时间，在Start中设置中途插入animation的动画播放。
    arguments.length,表示函数中实际传入参数的个数

第三节，学到了：
    设置pause和resume，
    1.了解到了cancelAnimationFrame()的参数是requestAnimationFrame()的返回值
    2.用webpack打包多个页面要修改entry
    
第四节，学到了：
    加深了对timingFuction和template功能的理解

