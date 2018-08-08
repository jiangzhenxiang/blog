# 端内分享bug

最近做了一个h5活动页，在端内打开后，有一个分享功能，分享至端外（微信、朋友圈、qq、空间等）， 原理是 使用
`window.open(url)`打开一个url，在测试环境没问题，但上线后，安卓机不能打开微信、朋友圈等。

将`window.open(url)`改为`window.location.href = url`后成功;

