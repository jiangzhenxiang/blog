#post 请求是几种 body 格式

## application/x-www-form-urlencoded

body 参数格式：

```js
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

parameter=value&also=another
```

#### 示例

```js
getList(commonData) {
    // json对象转URL query parameters
    let newCommonData = "";
    for (let key in commonData) {
      if (newCommonData != "") {
        newCommonData += "&";
      }
      newCommonData += key + "=" + encodeURIComponent(commonData[key]);
    }

    axios.post('/mybankv21/phppayui/payui/pay/largeRechargeBankList', newCommonData).then((response) => {
      if (response.data.error.returnCode === 0) {
        this.setState({bankList: response.data.data.bankList});
      } else {
        alert(response.data.error.returnUserMessage)
      }
    }).catch((error) => {
      alert('获取数据失败，请重试！')
    });
  };

```

## multipart/form-data

```js
POST http://www.example.com HTTP/1.1
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="file"; filename="chrome.png"
Content-Type: image/png

PNG ... content of chrome.png ...
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--
```

## application/json

示例：

```js
var data = {'title':'test', 'sub' : [1,2,3]};
$http.post(url, data).success(function(result) {
    ...
});
```

最终发送的请求是：

```js
POST http://www.example.com HTTP/1.1
Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]}
```

## text/xml 很少用

## 获取 url params

```js
  getUrlParam() {
    let aQuery = [];
    if (window.location.hash != "") {
      aQuery = window.location.hash.split('?');
    } else if (window.location.search != "") {
      aQuery = window.location.search.split('?');
    }

    if (aQuery.length > 1) {
      commonData = aQuery[1];
    }

    if(!commonData) {
    }
  }
```
