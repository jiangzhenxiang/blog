# webpack devserver

文档：https://www.webpackjs.com/configuration/dev-server/#devserver-proxy

## 可以用来做什么？

可以用来实现本地开发环境mock数据。

将请求中含有`rmc`字符的，代理到本地对应的json文件。

```js

var fs = require("fs");
var path = require("path");

var cwd = process.cwd();
var basePath = path.join(cwd, "src");

module.exports = {
  devServer: {
    bypass: function(req, res) {
      let url = req.url;
      if (url.indexOf("rmc") !== -1) {
        let filePath = req.url + ".json";
        res.json(JSON.parse(fs.readFileSync(path.join(basePath, filePath), "utf8")));
        res.end();
      }
    },
  },
};

```
