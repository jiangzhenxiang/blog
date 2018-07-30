# bower安装失败问题

## 错误信息

```
[root@b7efc0b987aa Oplatform]# bower install
bower angular#^1.7.2        not-cached https://github.com/angular/bower-angular.git#^1.7.2
bower angular#^1.7.2           resolve https://github.com/angular/bower-angular.git#^1.7.2
bower angular#^1.7.2                            ECMDERR Failed to execute "git ls-remote --tags --heads https://github.com/angular/bower-angular.git", exit code of #128 fatal: unable to access 'https://github.com/angular/bower-angular.git/': SSL connect error
```

## 解决方法

### 升级git

之前centos的git版本为1.7版本，太老。

第一步：Install WANDisco repo package:
```
yum install http://opensource.wandisco.com/centos/6/git/x86_64/wandisco-git-release-6-1.noarch.rpm
- or -
yum install http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-1.noarch.rpm
- or -
yum install http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
```
第二步；Install the latest version of Git 2.x:
`yum install git`
第三步：Verify the version of Git that was installed:
`git --version`


### git config 配置
第一次尝试:`git config --global url."https://".insteadOf git://` ,还是报错

第二次尝试`git config --global url.git://github.com/.insteadOf https://github.com/`

在bower install安装成功

查看刚才添加的配置：
`cat ~/.gitconfig`

```
[url "https://"]
	insteadOf = git://
[url "git://github.com/"]
	insteadOf = https://github.com/
```