学习笔记

# 第一节课：整合gesture，animation，carousel

* 用timeline来代替，原本的setTimeout()有好处：
    * 这样使代码变得简洁，还变得更简单
    * 每次在setInterval()内循环的时候，timeline都会被从新添加animation，因为timeline的animation是个集合，所以新添加的animation会将原来的覆盖
    * 这样每次执行interval的时候，只需要将两个图片从原来的位置移动到当前的位置就行，不必考虑图片移动形成新的顺序之后如何进行下一次移动，省去了很大的代码量

* 只要是同一次连续进行的mouse或touch事件，则事件的context之间可以传递信息


# 遇到的问题：

* 遇到一个小问题：调用webpackserver的时候提示错误：“ERROR in Entry module not found: Error: Can't resolve './src' in XXX”
    上网查询以后无一例外都是在说：你的文件存放路径存在问题。然而事实上，的确是路径存在问题，但不是文件的存放路径，而是命令行执行的路径存在问题。
    执行命令的时候要在含有"package.json"的文件目录下执行命令，不然也会报错。
    * 这个问题其实也可以通过仔细阅读报错提示来解决，但我却没有认真阅读，所以自己瞎捣鼓了一个晚上。所以认真有耐心的阅读提示真的很有必要。
* 对组件化的children掌握的不是很透彻，需要再复习