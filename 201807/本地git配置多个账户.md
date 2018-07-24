# 如何在同一台电脑配置多个git或者github账号

当有多个git账号的时候，比如一个github，用于自己进行一些开发活动，再来一个gitlab，一般是公司内部的git。这两者你的邮箱如果不同的话，就会涉及到一个问题，生成第二个git的key的时候会覆盖第一个的key，导致必然有一个用不了。

## 先删除全局的配置

```bash
$ git config --global --unset user.name "你的名字"
$ git config --global --unset user.email "你的邮箱"
```

## 生成新的 SSH keys

github的
```
cd ~/.ssh

ssh-keygen -t rsa -C "yourmail@github.com"

```

然后会生成两个id_rsa文件，将id_rsa.pub里面的公钥复制到github上

公司的gitlab的
```
cd ~/.ssh

ssh-keygen -t rsa  -f ~/.ssh/id_rsa_gitLab -C "youremail@gitLab.com"

```

然后会生成两个iid_rsa_gitLab文件，将id_rsa_gitLab.pub里面的公钥复制到gitlab上

## 创建并配置config文件

`touch config`

空白的文件中添加内容

```
# GitHub
Host github.com
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa  

# gitlab
Host git.jdb-dev.com
HostName git.jdb-dev.com
User git
IdentityFile ~/.ssh/id_rsa_gitlab
```

## 测试是否连接成功

```
# 测试github
ssh -T git@github.com
 
# 测试gitlab
ssh -T git@git.jdb-dev.com
```