# ss教程

推荐两个vps提供商：[搬瓦工](https://bwh1.net/index.php) 、 [vultr](http://www.vultr.com)

搬瓦工是按年收费的，最便宜的是1年19.9美元的vps，
vultr是折算成按时间收费的， 最便宜的是2.5美元每月，不过经常没货

[附一个教程](https://github.com/Alvin9999/new-pac/wiki/%E8%87%AA%E5%BB%BAss%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%95%99%E7%A8%8B)

购买完服务器后，会有一个ip地址(如100.90.10.900) 和密码 和用户名（ 用户名一般为root）
mac可以使用iterm连接服务器,输入`ssh root@100.90.10.900`回车，然后输入密码，密码在命令行中看不见，直接输完回车就行。
登录成功后输入下面的全部命令执行一键脚本 安装ssr

```bash
yum -y install wget

wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh

备用脚本：

yum -y install wget

wget -N --no-check-certificate https://softs.fun/Bash/ssr.sh && chmod +x ssr.sh && bash ssr.sh

```

然后根据提示进行安装即可。