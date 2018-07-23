
##前言
Koa是由Express原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。他们的目的是在Express之后，推出基于Nodejs平台的下一代WEB开发框架。其优点就是轻量且代码优雅，实现最基本功能，复杂功能交由middleWare来进行实现和覆盖（同express）；以及能够提升Node环境中错误处理能力。使得编写 Web 应用更加得心应手。
从Koa1发布，再到最近Koa2（16年）的推出。现在koa已经步入了一个较为成熟的版本，在基于自己的项目实践后，已经可以考虑作为中小型node项目框架使用。
本文主要分为两个部分：第一部分本文主要是koa2的简单介绍，让读者对koa2有一个较为简单直接的理解；第二部分主要是基于koa的核心类库`co（ES6 Generator）`的实现讲解。
##Koa2的安装和使用
Koa2和Koa1的使用和安装类似，但是值得注意的是，Koa2需要依赖Node.js 4.0.0版本以上，但是部分特性需要ES2015（官网中有注明：Koa requires node v4.0.0 or higher for (partial) ES2015 support.），所以在使用的时候，需要大家注意ES6在node不同版本中的支持特性。这也是我在开发中遇到过的问题之一。
关于安装我不做累描，我们先来写一个Hello World：

```
const Koa = require('koa');
const app = new Koa();
// add some middlewares or something
app.use(ctx => {
 ctx.body = 'Hello Koa';
});
app.listen(3000);
```

这样就可以启动一个端口号是3000的Koa服务了。koa2基本服务非常简单，没什么可说的，但是Koa是一个middleware framework，其核心内容依旧继承Express的思想，需要依赖中间件（middlewares）来控制和处理请求和各种逻辑。而koa2和koa1不同，koa2提供了3种middleware添加方式：
* common function
* generator function（koa1中常用方式）
* async function（koa2新增）
### Generator Function
Generator：Generator（function* and yield）是ES6（node.js 4.0.0以后）中新增的一个处理异步函数的重要语法，其避免了回调函数对代码的破坏（callback hell）。
在Generator的方式添加中间件时，koa使用核心库co（后面会做详细介绍）充当"执行器"，用generator和promise包裹middlewares，实现流程控制。
我们上面代码中，我们来添加一下middleware的代码：
        
```
const Koa = require('koa');
const app = new Koa();
const co = require('co');
app.use(co.wrap(function *(ctx, next) {
  const start = new Date();
  yield next();
  const ms = new Date() - start;
  console.log('ms:' + ms);
}));
// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});
app.listen(3000);
```
 
可以看出和koa1中的写法并无太大区别。Generator Function的方式在当前的原生Node SDK支持下，这是一个不错的实现方式，同时这一方式一直作为koa的核心存在。
### Async Function
Async：async/await毫无疑问是一个更好的异步流程控制解决方案，也是很多Node玩家所推崇的写法。但是现在原生Node SDK并不支持这个语法，所以项目中必须要引入`babel`，依赖其进行编译才能使用。
其写法和Generator的方式差异并不很大，如下：
 
```
const Koa = require('koa');
const app = new Koa();
const co = require('co');
app.use(async(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log('ms:' + ms);
});
// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});
app.listen(3000);
```
 
Async方法是在Koa2中新增支持的，从代码中可以看出少了"co.wrap"在其中的包裹，其他并无二异。
### 使用middleware的几点注意
####1、添加middleware的顺序：
在添加middleware的时候，其实app.use是用顺序的，不管是那种方式引入middleware，都会像堆栈一样，进行入栈（代码中形参传入的`next`就是下一个middleware的引用，在yield或者await后进行调用），每一个request请求将会顺序的走一遍所有middleware。在不熟悉这个过程的时候，很容易被坑，这也是我在koa1时前期经常遇到的问题。
来看一个官方例子：
 
```
var koa = require('koa');
var app = koa();
// x-response-time
app.use(co.wrap(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
}));
// logger
app.use(co.wrap(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
}));
// response
app.use(function *(){
  this.body = 'Hello World';
});
app.listen(3000);
```
 
当请求开始时，请求先经过 `x-response-time` 和 `logging` 中间件，并记录中间件执行起始时间。 然后将控制权交给 `reponse` 中间件。当中间件运行到 `yield next` 时，函数挂起并将控制前交给下一个中间件。当没有中间件执行 `yield next` 时，程序栈会逆序唤起被挂起的中间件来执行接下来的代码。
####2、不能直接使用原生Generator对中间件进行添加
在使用中间件时，不能直接使用原生Generator对中间件进行直接包裹添加。这种写法并不规范，在koa1以及koa2早期版本中支持这一写法，在koa2 v3版本后不再识别这种添加方式，需要通过`co.wrap`或者使用`koa-convert`模块来添加中间件。类似于下面的写法，将不再被支持：
 
```
app.use( function* ( next ){
	try{
		yield next;
	} catch( err ) {
		...
	}
} );
```
 
####3、建议使用Generator Function的方式引入中间件
对于这个建议比较软性，因为这是一个仁者见仁的事情。个人更倾向于使用原生SDK而不是依赖babel进行开发。babel发展太快不一定是一件好事，但是Koa的核心co库不会改变，所以使用co来进行引入中间件一定不会有兼容的问题。
## Koa核心库 —— co
co是Koa核心作者TJ大神的开源库，其只有200多行代码，更新至v4版本。与其说co是Koa的"执行器"，更贴切的说，其实co更像是`Generator`的苹果壳。它实现的功能，大致如下：
* 自动执行生成器函数 获取迭代器
* 通过回调函数，等待异步函数执行完成后调用next()
* 通过next函数的参数，将异步结果返回
我们来看一个异步readFile，使用co实现同步的例子：
 
```
// 读取文件方法( thunkable )
function readFile(filename) {
    return function(callback) {
        require('fs').readFile(filename, 'utf8', callback);
    };
}
// co调用
co(function*  () {
    var file1 = yield readFile('./file/a.txt');
    var file2 = yield readFile('./file/b.txt');
    console.log(file1); // a.txt content
    console.log(file2); // b.txt content
    return 'done';
})(function(err, result) {
    console.log(result)
});
```
 
可以看到在基于`Generator`的基础上，`co`自动实现了等待异步结果，调用next的操作，并将结果返回至next函数中。这个苹果壳使用yield达到了`async/await`的效果，这在原生Node SDK无法支持`async/await`语法的情况下确实是令人兴奋的。而且co的目标函数不只是`Generator`，它还支持`Promise`和更多yieldables（可以被co处理的）对象：
yieldables:
* promises
* thunks (functions)
* array (parallel execution)
* objects (parallel execution)
* generators (delegation)
* generator functions (delegation)
我们一起来看一个co的简单实现：
 
```
function co(generatorFun) {
	return function(fn) {
	    var gen = generatorFun();
	    function next(err, result) {
	        if(err){
	            return fn(err);
	        }
	        var step = gen.next(result);
	        if (!step.done) {
	            step.value(next);
	        } else {
	            fn(null, step.value);
	        }
	    }
	    next();
	}
}
```
 
从代码中可以看出，传入的`generatorFun`在co中会被`yield`关键字分割为多段异步函数代码，在异步操作没有执行完成之前co会吧result带入generatorFun的next方法中（注意是generatorFun的next方法，而不是声明的next），而在每一段异步函数返回后（step.done）co内部将会把执行的结果带入fn中，返回到`yield`关键字切割的地方(Generator的特性)。
在co的帮助下，koa可以通过app.use方法将middleware放入一个堆栈中，然后在通过co包裹执行，来达到顺序执行middleware并且代码同步书写异步请求的效果，使代码保持条理清晰，清爽且幽雅。
## 总结
从`co`中其实就可以看出，`Koa`的优势在于轻量和简洁，同时在流程控制和处理错误的机制上表现优异。也许从头搭建一个完善大型的项目可能稍显麻烦，但是可以通过各种中间件来控制每一个流程，非常灵活。现在第三方的Koa中间件算是比较充实，基本上项目中常用的中间件都可以在github和npm上下载到。
Koa2已经进入了一个比较稳定的版本。在中小型Node项目中，可以尝试进行使用。
