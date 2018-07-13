# 利用viewport缩放实现h5页面的自适应（懒人方法）；

先贴代码

```js
    <meta name="viewport" content="width=device-width, initial-scale=1">
(function() {
    var base = 750;
    (function() {
        var scale = screen.width / base;
        var meta = document.querySelector('meta[name="viewport"]');
        meta.setAttribute('content', 'width=' + base + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=0,target-densitydpi=device-dpi');
   })();
})();
```

使用这种方法的话，我们开发移动端页面时，只需要安装ui图的标注来写css样式就可以了；
[参考链接](http://jerryzou.com/posts/design-for-all-mobile-resolution/)

## 问题：

在开发过程中浏览器和微信没有问题，但在某些app中打开会出现问题，页面整体可以左右拖动

## 解决办法：

```html
经排查，visual viewport的宽度可以通过window.innerWidth获取，实际我们获取到的值是749px，比我们设定的width（width设定的是layout viewport的宽度）750px少1px，因此导致页面的实际宽度（layout viewport 宽度）大于可视区域的宽度（visual viewport的宽度），从而可以左右滑动。
有如下解决方法：
    1. 不要在<meta>标签中初始化content属性，而是直接在JS代码中写content属性；
    2. 不写<meta>标签，用JS动态生成即可；

```
