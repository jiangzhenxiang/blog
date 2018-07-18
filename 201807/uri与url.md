# URL 和 URI 有什么不同?

## URI = Universal Resource Identifier ,是统一资源标示符，可以唯一标识一个资源。

统一资源标志符URI就是在某一规则下能把一个资源独一无二地标识出来。

拿人做例子，假设这个世界上所有人的名字都不能重复，那么名字就是URI的一个实例，通过名字这个字符串就可以标识出唯一的一个人。

现实当中名字当然是会重复的，所以身份证号才是URI，通过身份证号能让我们能且仅能确定一个人。

## URL—Uniform Resource Location统一资源定位符

URL是URI的子集

也拿人做例子然后跟HTTP的URL做类比，就可以有：

动物住址协议://地球/中国/浙江省/杭州市/西湖区/某大学/14号宿舍楼/525号寝/张三.人

可以看到，这个字符串同样标识出了唯一的一个人，起到了URI的作用，所以URL是URI的子集。URL是以描述人的位置来唯一确定一个人的。
所以不论是用定位的方式还是用编号的方式，我们都可以唯一确定一个人，都是URl的一种实现，而URL就是用定位的方式实现的URI。

### JavaScript encodeURI() 函数

encodeURI() 函数可把字符串作为 URI 进行编码。

语法：encodeURI(URIstring)

提示：如果 URI 组件中含有分隔符，比如 ? 和 #，则应当使用 **encodeURIComponent()** 方法分别对各组件进行编码。

```js
encodeURI('http://www.w3school.com.cn')
"http://www.w3school.com.cn"
encodeURIComponent('http://www.w3school.com.cn')
"http%3A%2F%2Fwww.w3school.com.cn"
```

### JavaScript decodeURI() 函数

decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。

encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
