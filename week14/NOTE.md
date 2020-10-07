学习笔记

    # 第一节课：
    ## 触摸事件touchEvent.changedTouches，返回一个对象： 
         这个 TouchList 对象列出了和这个触摸事件对应的 Touch 对象。
         对于 touchstart 事件, 这个 TouchList 对象列出在此次事件中新增加的触点。
         对于 touchmove 事件，列出和上一次事件相比较，发生了变化的触点。
         对于touchend事件，changedTouches 是已经从触摸面的离开的触点的集合（也就是说，手指已经离开了屏幕/触摸面）。
    
    # 第二节课：
    ## 手势事件演化流程：
            * start
                * (end) -> tap

            * (10px) -> panStart 
                * (move) -> pan -> (move) -> pan -> ...
                    * (end) -> panEnd
                    * (end &&  v > ?)  -> filck

            * (0.5s) -> pressStart
                * (end) -> pressEnd
            * (10px) -> pan
                * (move) -> pan -> (move) -> pan -> ...
                    * (end) -> panEnd
                    * (end &&  v > ?)  -> filck

    # 第三节课：
    ## 

    # 细节基础知识补充
        * setTimeout(), 定时器到时后才执行代码，而不是执行代码后暂停一段时间
        * clearTimeout(handler)，为与之对应的清除计时器函数，handler为setTimeout()的返回值
        * 用函数返回值给变量赋值的同时，该函数也执行了；而把函数赋值给变量时，是把该变量定义为该函数，这个时候函数不执行


    
