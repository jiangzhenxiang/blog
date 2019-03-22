# 开发环境搭建

## 安装nodeJs

卸载旧版本

```bash
    sudo rm -rf ~/.npm
    sudo rm -rf ~/node_modules
    sudo rm -rf ~/.node-gyp
    sudo rm /usr/local/bin/node
    sudo rm /usr/local/bin/npm
    sudo rm /usr/local/lib/dtrace/node.d
```

安装:使用nvp管理node版本

```js
    # 使用brew安装nvm
    brew install nvm
    # 使用nvm安装node.js
    nvm install 8.11.0
    # 切换版本
    nvm use 10.0.0
```

配置npm下载源

1.使用npm自带配置
`npm config set registry http://ip:4873/`
2.使用nrm管理npm(推荐）

```bash
npm install -g nrm
nrm add sinopia http://ip:4873/
nrm use sinopia
```

配置完成后使用 npm install 将自动通过 sinopia 私有 npm 服务下载依赖的 npm 包，公有包将通过 taobao 源进行下载，有缓存机制。

## 安装zsh、 oh-my-zsh、zsh自动补全等插件

[参考链接](https://zhuanlan.zhihu.com/p/19556676)

## 编辑器

webstorm、vscode

## 常用工具

charles抓包工具、xcode、postman、ps
