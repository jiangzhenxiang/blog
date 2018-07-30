# shell脚本

## 创建文件
`vim copyBuild.sh`

## 按i键，添加如下内容

```
 #i /bin/sh

cd /data/www/Oplatform
gulp build

rm -rf /data/www/dmp-wenmq/web/app.full.min.*

cp -rf /data/www/Oplatform/dest/* /data/www/dmp-wenmq/web/

echo "success"
```
按esc键，然后按冒号键，再输入wq退出

## 添加执行的权限：
`chmod +x copyBuild.sh`

## 执行
`source copyBuild.sh` 或 `sh copyBuild.sh `