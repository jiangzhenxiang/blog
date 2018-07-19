# lodash常用方法

[lodash](https://lodash.com/)
[lodash中文](http://www.css88.com/doc/lodash/)

## 对象扩展：_.assign

`_.assign(object, [sources])`
分配来源对象的可枚举属性到目标对象上。 来源对象的应用规则是从左到右，随后的下一个对象的属性会覆盖上一个对象的属性。 

注意: 这方法会改变 object，参考自 Object.assign.

添加版本
0.10.0

参数
object (Object): 目标对象。
[sources] (...Object): 来源对象。
返回
(Object): 返回 object.

例子:

```js
var foo = {a: 'a property'};
var bar = {b: 4, c: 'an other property'};

var result = _.assign({a: 'an old property', foo,bar})

// result => {a: 'an old property',b: 4, c: 'an other property'}
```

## 防抖函数 _.debounce

`_.debounce(func, [wait=0], [options={}])`

创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。 debounced（防抖动）函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options（选项） 对象决定如何调用 func 方法，options.leading 与|或 options.trailing 决定延迟前后如何触发（愚人码头注：是 先调用后等待 还是 先等待后调用）。 func 调用时会传入最后一次提供给 debounced（防抖动）函数 的参数。 后续调用的 debounced（防抖动）函数返回是最后一次 func 调用的结果。 

注意: 如果 leading 和 trailing 选项为 true, 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用防抖方法。 

场景示例：有一个搜索输入框，使用keyup事件触发搜索，这样没按一个键都会搜一次，使用debounce设置200ms防抖，则是当发生keyup200ms后在触发搜索，200ms内有多次keyup并不进行搜索，当最后一个keyup结束200ms后才进行搜索。

参数:

```js
func (Function): 要防抖动的函数。
[wait=0] (number): 需要延迟的毫秒数。
[options={}] (Object): 选项对象。
[options.leading=false] (boolean): 指定在延迟开始前调用。
[options.maxWait] (number): 设置 func 允许被延迟的最大值。
[options.trailing=true] (boolean): 指定在延迟结束后调用。
```

返回:
`(Function): 返回新的 debounced（防抖动）函数。`

例子：

```js
// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on('resize', _.debounce(calculateLayout, 150));

// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));

// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);

// 取消一个 trailing 的防抖动调用
jQuery(window).on('popstate', debounced.cancel);
```

## 节流函数 _.throttle

`_.throttle(func, [wait=0], [options={}])`

创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。 该函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options 对象决定如何调用 func 方法， options.leading 与|或 options.trailing 决定 wait 前后如何触发。 func 会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次 func 调用的结果。 

注意: 如果 leading 和 trailing 都设定为 true 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用。 

如果 wait 为 0 并且 leading 为 false, func调用将被推迟到下一个点，类似setTimeout为0的超时。 

查看 [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/) 了解 _.throttle 与 _.debounce 的区别。

参数:

```js
func (Function): 要节流的函数。
[wait=0] (number): 需要节流的毫秒。
[options={}] (Object): 选项对象。
[options.leading=true] (boolean): 指定调用在节流开始前。
[options.trailing=true] (boolean): 指定调用在节流结束后。
```

返回：
`(Function): 返回节流的函数。`

例子：

```js
// 避免在滚动时过分的更新定位
jQuery(window).on('scroll', _.throttle(updatePosition, 100));

// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);

// 取消一个 trailing 的节流调用。
jQuery(window).on('popstate', throttled.cancel);
```

## 浅拷贝.clone()

`_.clone(value)`

创建一个 value 的浅拷贝。

注意: 这个方法参考自 structured clone algorithm 以及支持 arrays、array buffers、 booleans、 date objects、maps、 numbers， Object 对象, regexes, sets, strings, symbols, 以及 typed arrays。 arguments对象的可枚举属性会拷贝为普通对象。 一些不可拷贝的对象，例如error objects、functions, DOM nodes, 以及 WeakMaps 会返回空对象。

```js
var objects = [{ 'a': 1 }, { 'b': 2 }];

var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);
// => true
```

## 深拷贝.cloneDeep()

`_.cloneDeep(value)`

```js
var objects = [{ 'a': 1 }, { 'b': 2 }];

var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
```

## 数组去重 _.uniq(array)

创建一个去重后的array数组副本。使用了 SameValueZero 做等值比较。只有第一次出现的元素才会被保留。

```js
_.uniq([2, 1, 2]);
// => [2, 1]
```