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
    ## 手势事件的逻辑：

        start事件：
            1.在开始点击时记录下点击的位置：startX，startY
            2.将状态标志isTap = true，isPan = false，isPress = false初始化
            3.使用setTimeout()函数，在点击时长超过0.5s的时候触发回调，并在回调时将将状态置为press，并将handler变量置为null
            4.用handler变量记录setTimeout()的返回值，用来在move()，end()，cancel()中clearTimeout(handler)
            5.将当前坐标clientX，clientY存入数组，以在move中计算move移动的速度
            【可以选择在start中分配type为pressStart的Event】

        move事件：
            1.计算dx，dy来判断是否开始pan，当（dx ** 2 + dy **2 >= 100 && !isPan 时，pan）开始，并clearTimeout(headler)，设置状态标志变换
            新增状态标志isVertical,来判断是否垂直滑动，可以分配panstart的Event
            2.将存点数组过滤，只留下近0.5s的points
            3.在move中存入points

        end事件:
            1.判断各种状态结束，设置状态标志位并分配Event
            2.tap和press事件判断后只需要设置状态标志位并分配Event
            3.用points数组计算move的速度来判断是否位flick事件
            4.在事件中设置isFlick状态标志位，分配Event
            5.在flick事件判断后进行pan的判断，并设置状态标志位，在分配Event时返回各个属性

    # 第四节课
    ## 整合手势与鼠标的状态标志位

        手势标志位整合：
            * 定义全局对象contexts = new Map(),往里存入key: Touch.identifier valueL: context对象
            context对象中可存入 context.startX, context.startY, context.clientX, context.clientY,
            context.isTap, context.isPress, context.isPan, context.isVertical, context.isFlick, 
            context.points = []
            * 在end时删除contexts对应元素
        
        鼠标状态标志位整合：
            * 每一次mousedown时，往context里传入key："mouse" + (1 + << event.button) value: context
            * 每一次mousemove时，循环遍历每一个button，检查其是否被按下(用循环检查event.buttons)，若被按下，则进行move()操作
            * mouseup时删除contexts对应元素
        
    # 第五节课
    ## 派发事件

        定义dispatch函数，创建新的Event对象，传入参数，并用element.dispatchEvent()进行派发，之后可以用element.addEventListener()监听到

    # 第七节课
    ## 封装

        用class定义Listener，Recognizer，Dispatcher对象，通过嵌套传递对象和参数进行事件监听识别和事件派发
        最后通过一个函数对上述对象进行嵌套调用







    # 细节基础知识补充
        * setTimeout(), 定时器到时后才执行代码，而不是执行代码后暂停一段时间
        * clearTimeout(handler)，为与之对应的清除计时器函数，handler为setTimeout()的返回值
        * 用函数返回值给变量赋值的同时，该函数也执行了；而把函数赋值给变量时，是把该变量定义为该函数，这个时候函数不执行
        * touch类的事件都有Event.changedTouches属性，该属性会返回TouchList对象，TouchList对象中又包含Touch对象，Touch对象中包含各touch的各种数据
        Touch.identifier为该touch的识别码，在按下后只要不放开就不会改变
        * mouse类事件有Event.button属性，返回一个数值以表示某个鼠标键被按下，0为左键，1为中键，2为右键，3为后退键，4为前进键
        * mouse类事件有Event.buttons属性，返回一个二进制数字，表示哪些键被按下，0b00001(1)表示左键, 0b00010(2)表示右键, 0b00100(4)表示中键, 0b01000(8)表示后退键, 0b10000(16)表示前进键，有多个按键按下时则数值相加，没有按键按下时返回数值为0


    
