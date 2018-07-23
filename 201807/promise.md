
### markdown


# 简谈Promise



> 写在前面:  

在Promise之前，实现异步可使用回调，也可以自己实现类似Promise的结构，比如jQuery的ajax  

回调是很好的异步解决方案，不过"嵌套多了"就惹得人心烦，且代码难以阅读  

Promises并非解决具体问题的算法，而已代码组织更好的模式



### 一个Promise列子




```javascript

// 注意：

// 为什么要用函数把"new Promise"包起来，因为new Promise时，也会执行函数内部代码

// 所以通常用一个函数把"new Promise"包起来，在函数内部return Promise的实例




// 用Promise实现图片异步加载

function imageLoad(_url) {

    return new Promise(function(resolve, reject) {

        var _image = new Image(); // 新建Image对象

        _image.onload = function() { // 定义Image对象的加载事件

            resolve('加载成功'); // 如果图片加载成功调用resolve方法

        };

        _image.onerror = function() {

            reject(new Error('加载失败'));

        };

        _image.src = _url;

    });

}




imageLoad('这是图片地址') // 执行imageLoad方法，会返回一个Promise实例

    .then( // 注册Promise的状态改变时的回调事件

        _success => console.log(_success), // 加载成功调用的方法

        _error => console.log(_error) // 加载失败时调用的方法（比如当图片地址不存在的时候）

    );




// 仔细观察上面的代码，开发者会发现

// 创建Promise实例时传入函数的第一个参数指向的就是"Promise实例的then方法的第一个参数"

// 同理，

// 创建Promise实例时传入函数的第二个参数指向的就是"Promise实例的then方法的第二个参数"

// 所以，

// resolve函数执行时等同执行then方法第一个函数参数；reject函数执行时等同执行then方法第二个函数参数

```




认真看了上面的典型的简单的Promise例子，开发者应该对Promise不陌生了，至少对then方法不陌生^_^  

下面，进一步揭开Promise的面纱




### Promise实例的状态




每个Promise实例都有一个状态，初始为`Pending`  

resolve方法可以将Pending改为`Resolved`  

reject方法可以将Pending改为`Rejected`  

注意：没有其他方式可以修改Promise实例的状态，且状态不可逆




### Promise原型链方法




> 原型链方法又称`实例方法`




**Promise.prototype.then()**




then方法接受2个函数参数，第一个函数参数将状态变为`Resolved`，调用第二个函数参数将状态变为`Rejected`  




then方法内部return详解：  

如果then方法内部return的不是一个`Promise`对象  

那么return的值将作为下一个then的形参  

如果没有return语句，等同于return undefined  

如果then方法内部return是一个`Promise`对象，那么下一个then的形参就是这个Promise对象执行方法的实参  

文字有点绕，不是很好理解，请看看如下代码




```javascript

function newPromise() {

    return new Promise(resolve => resolve('I was resolved'));

}




new Promise(resolve => {

        resolve();

    })

    .then(() => {

        // return一个字符串

        return '我只是一个字符串';

    })

    .then(_data => {

        console.log(_data); // 打印：'我只是一个字符串'

        // 没有显式的return语句

    })

    .then(_data => {

        console.log(_data); // 打印：undefined

        // return一个Promise实例

        return newPromise();

    })

    .then(_data => {

        console.log(_data); // 打印：I was resolved

    });




// 观察上面的代码

// 发现，then内部无论返回什么都可以链式调用

// 证明，then执行的结果依旧是Promise对象

// 还发现，then内部的return是下一个then的形参

```




**Promise.prototype.catch()**




catch与then一样，返回值是**新的Promise 对象**

我们知道，then的第二个函数参数，可以看做捕获错误的方法  

我们还知道then可以链式调用  

试想一下，当链式调用多个then方法时，难道要写多个错误处理方法，不会显得臃肿么  

那么，catch方法就是为此而生  

所以，catch方法可以充当then方法的第二个函数参数，并且建议使用catch方法  

请看下面的详细分析




```javascript

new Promise(resolve => {

        resolve(msg); // 抛出错误：msg is not defined

    })

    .then(_data => console.log(_data)) // 不会执行，因为then之前的错误没有捕获

    .catch(_error => console.log(_error)); // 捕获错误： msg is not defined




// 上面的then方法未执行，是因为错误没有被捕获，如果把catch放在then之前（如下代码）




new Promise(resolve => {

        resolve(msg); // 抛出错误：msg is not defined

    })

    .catch(_error => console.log(_error)) // 捕获错误： msg is not defined。如果没有错误，直接跳过catch方法

    .then(_data => console.log(_data)); // 执行，打印：undefined







// catch可以还可以捕获then方法中的错误（如下代码）




new Promise(resolve => {

        resolve('OK');

    })

    .then(_data => {

        var test = unnamed; // 抛出错误：unnamed is not defined

    })

    .catch(_error => console.log(_error)); // 捕获错误： unnamed is not defined




// catch内部依旧可以抛出错误，但是需要另外一个catch来监听了（如下代码）




new Promise(resolve => {

        resolve('OK');

    })

    .then(_data => {

        console.log(_data); // 执行，打印：Ok

        var test = unnamed_one; // 抛出错误：unnamed_one is not defined

    })

    .catch(_error => {

        console.log(_error); // 捕获错误：unnamed_one is not defined

        var test = unnamed_two; // 抛出错误：unnamed is not defined

    })

    .catch(_error => console.log(_error)); // 捕获错误：unnamed is not defined

```




看过上面的代码分析后，至少可以总结出：  

Promise错误具有冒泡性质，错误会不断的向后传递，直到 .catch() 捕获  

如果then方法遇到没有捕获的储物，就不会执行  




还有：catch方法是`then(null, rejection)`的别名（如下代码）




```javascript

Promise.resolve()

    .then(_success => console.log(_success))

    .catch(_error => console.log(_error));

// 等同于

Promise.resolve()

    .then(_success => console.log(_success))

    .then(null, _error => console.log(_error));




// 建议第一种方式，实现更简洁，代码更具语义性

```




注意：catch不能捕获`异步错误`，请看如下代码：




```javascript

let _promise1 = () => new Promise(() => {

        throw new TypeError('I am a error'); // 抛出错误

    }),

    _promise2 = () => new Promise(() => {

        setTimeout(() => {

            throw new TypeError('I am a error'); // 抛出错误

        }, 0);

    }),

    _promise3 = () => new Promise((resolve, reject) => {

        setTimeout(() => {

            reject('I am a error'); // 主动执行错误情况

        }, 0);

    });




// 普通错误抛出情况

_promise1()

    .catch(_error => console.log(_error)); // 捕获错误，打印：I am a error




// 异步错误抛出情况

_promise2()

    .catch(_error => console.log(_error)); // 未捕获错误，执行环境报错




// 异步reject情况

_promise3()

    .catch(_error => console.log(_error)); // 执行错误，打印：I am a error




// 所以：在Promise中，你不明确throw的正确方法，那么请使用reject

//      注意你的代码，不要出现意料之外的错误抛出，所有可能的错误都请用reject拒绝

```




### Promise的静态方法




**Promise.resolve(_param)**




```javascript

// 1，如果_param为空，直接返回状态为'Resolved'的Promise实例




// 2，如果_param为Promise实例，直接原封不动的返回。即使原来的实例是"rejected"状态，也是原封不动的返回




// 3，如果_param为"thenable"对象，线将"thenable"对象转为Promise对象，然后就立即执行"thenable"对象的then方法

// "thenable"对象指的是具有then方法的对象，比如：

let thenable = {

    then: function(resolve, reject) {

        resolve('I was resolved');

    }

};

var _promise = Promise.resolve(thenable);

_promise.then(_data => console.log(_data)); // 打印：I was resolved




// 4，_param不是"thenable"对象，或根本就不是对象

var _promise = Promise.resolve('I am promise');

_promise.then(_data => console.log(_data)); // 打印：I am promise

```




**Promise.reject()**




和`Promise.resolve()`一样，只是返回的Promise实例的状态为`rejected`  

即使传入的参数是状态为resolved的Promise实例，返回的实例状态依旧是`rejected`




```javascript

var _promise = Promise.reject('error');

// 等同于

// var _promise = new Promise((resolve, reject) => reject('I am error'));




_promise.catch(_errpr => console.log('I am error')); // 打印：I am error

```




**Promise.all()**




`all`方法可以接受一个具有Iterator接口的对象（一般为数组），且返回的每个成员都是Promise实例  

`all`方法依旧返回一个新的Promise实例  

当参数的所有Promise实例都为`resolved`时，all方法才返回`resolved`，反之则然




```javascript

// 定义一个获取Promise实例的方法，根据传入参数确定返回实例的状态

let _promise = _value => new Promise((resolve, reject) => {

    setTimeout(_value => {

        // 如果传入的参数以"resolve"开头，这返回状态为resolve的实例，反之则然

        if (/^resolve/.test(_value)) {

            resolve(_value);

            return;

        }

        reject(_value);

    }, 1000, _value);

});




// all参数成员状态都为resolve，返回实例状态也为resolve

// 且返回实例的回调参数是一个数组，数组元素是每一个参数实例的回调参数

Promise

    .all([_promise('resolveOne'), _promise('resolveTwo')])

    .then(_success => console.log(_success)) // 因为成员状态都为resolve，打印：["resolveOne", "resolveTwo"]

    .catch(_error => console.log(_error)); // 因为成员状态都为resolve，所以不执行




// all参数成员状态至少有一个reject

// 且返回实例的回调参数是第一个状态为reject的参数实例的回调参数

Promise

    .all([_promise('resolveOne'), _promise('rejectOne')])

    .then(_success => console.log(_success)) // 因为成员状态有一个reject，所以不执行

    .catch(_error => console.log(_error)); // 因为成员状态有一个reject，打印：rejectOne

```




**Promise.race()**




race方法和all方法用法一模一样，只是返回值有点差别  

从字面理解就能看出来，race是比赛的意思  

说明参数实例谁先状态发送改变就调用谁




```javascript

// 定义一个获取Promise实例的方法，根据传入的第一个参数确定改变状态的快慢

let _promise = (_time, _value) => new Promise((resolve, reject) => {

    setTimeout(() => resolve(_value), _time);

});




// race参数成员状态都为resolve，返回实例状态也为resolve

// 且返回实例的回调参数是一个数组，数组元素是每一个参数实例的回调参数

Promise

    .race([_promise(2000, 'resolveSlow'), _promise(1000, 'resolveFast')])

    .then(_success => console.log(_success)); // 第二个参数实例更快改变状态，打印：resolveFast




// 可以看出，第二个参数实例用时更快，先自行它的回调方法，且另一个参数实例回调方法不再执行

```




### Promise总结




Promise可以看做是回调函数的改进方案，解决了callback的回调深渊  

使用then可以让异步操作更加清晰明了  

不过原来的异步任务被Promise包装后，不管什么操作，放眼望去都是then，这导致原来的语义变得不那么清楚









