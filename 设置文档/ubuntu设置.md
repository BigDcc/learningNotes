# ubuntu常用配置项

## 0. 前言

ubuntu在开发领域使用的很频繁，无论是在虚拟机还是物理机上安装ubuntu上都需要一些软件的配合使用，使其使用起来更加的得心应手。该文档将用来收集一些常用的软件配置方式。

## 1. 必要的设置项

### 1.1 更换系统默认源

1. 备份原始的源文件

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

2. 在清华源中选取适合的源

<https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/>

3. 配置源文件，将清华源内容覆盖该文件内容

```shell
sudo vim /etc/apt/sources.list
```

4. 换了新源以后，记得更新下软件管理包

```shell
sudo apt update
```

## 2. 常见的美化方案

### 2.1 安装oh my zsh

#### 2.1.1 安装必要软件

- 安装zsh

```shell
sudo apt install zsh
```

- 安装git

```shell
sudo apt install git
```

- 还可以顺手安装个vim，相当于vi的强化版

```shell
sudo apt install vim
```

> apt和apt-get是相同的包管理方式，较新的版本，建议使用apt代替apt-get

#### 2.1.2 更换默认shell

首先查看系统当前使用的shell

```shell
echo $SHELL
```

查看当前系统中包含哪些shell

```shell
cat /etc/shells
```

切换默认shell为zsh

```shell
chsh -s /bin/zsh
```

重启系统(这里一定记得重启)

```shell
reboot
```

#### 2.1.3 安装oh my zsh

安装oh-my-zsh(这是一个github上超级火爆的项目，有兴趣的可以去看看)

```shell
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```

**当然安装过程中如果出现如下错误时可参考**

> Failed to connect to raw.githubusercontent.com port 443: Connection refused
> <https://blog.csdn.net/morning_berry/article/details/105517538>

到这步基本就安装完成了，但是为了让终端更加的酷炫，可以根据老哥的链接，继续将以下的插件和主题安装上去

#### 2.1.4 安装incr自动补全插件

安装incr自动补全插件

```shell
wget http://mimosa-pudica.net/src/incr-0.2.zsh
```

移动插件到oh-my-zsh目录的插件库下

```shell
sudo mkdir ~/.oh-my-zsh/plugins/incr/
sudo mv incr-0.2.zsh ~/.oh-my-zsh/plugins/incr/incr-0.2.zsh
```

更改配置文件

```shell
sudo vim ~/.zshrc
```

将以下文件追加到文本末尾

```shell
source ~/.oh-my-zsh/plugins/incr/incr*.zsh
```

更新配置文件

```shell
source ~/.zshrc
```

#### 2.1.5 更换agnoster主题

安装字体

```shell
sudo apt install fonts-powerline
```

进入vim编辑

```shell
sudo vim ~/.zshrc
```

修改配置文件

```shell
ZSH_THEME="robbyrussell"将其中robbyrussell修改为agnoster
```

更新配置

```shell
source ~/.zshrc
```

### 2.2 桌面美化

gnome的美化教程有很多，这里参考如下博客，美化成仿mac形式：

> <https://www.cnblogs.com/WXGC-yang/p/10423301.html>

## 3. 一些常用的软件

### 3.1 安装谷歌浏览器

在通过apt方式安装软件之前，我们首先需要更新一下apt，具体操作如下(这里简单的说一下，如果你使用具有管理员权限的用户进行以下操作，如root用户，则不需要在每条命令前加sudo，来获取管理员权限，同时这里说明下，apt和apt-get，早前系统版本使用apt包资源管理工具时，通过apt-get来使用，较新的系统版本官方建议使用apt，所以根据你的系统版本来选择使用即可)

- 安装谷歌浏览器（这里使用包安装的方式）

```shell
1）通过wegt工具下载资源包：
	wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
2）通过dpkg解包安装：
	sudo dpkg -i google-chrome-stable_current_amd64.deb
3）如果在解包过程中提示缺少相关依赖可使用以下命令，补全依赖，再次执行解包操作，如没有则跳过该步：
	sudo apt install -f	
```

- 如果你想卸载自带的火狐浏览器可以通过以下命令

```shell
sudo apt remove firefox
```

### 3.1 安装vscode

vscode是微软退出的轻量级开发工具，通过插件的方式组装你自己的开发环境，非常的好用，所以在ubuntu上我们也一并安装一下它。
安装vscode的最简单方式就是下载一个deb包，并解压安装，如果你想通过其他方式进行安装，可以到官方网站上查看其他的安装方式。

```console
到官方网站上下载对应的资源包
```

解压安装deb包
```shell
dpkg -i <packageName>
```

关于vscode如何使用，具体可参考官方链接
<https://code.visualstudio.com/docs>

### 3.2 安装一个酷炫的截图软件----flameshot

该软件最好是安装0.6版本以上的版本，较低的文件不包含截图后标注文件的功能

```shell
flameshot -v  # 版本查看
flameshot --help  # 相关参数查看
```

关于该软件的详细配置和介绍可以参考以下博客
<https://blog.csdn.net/xinquanv1/article/details/87889407>

## 4. 结尾

持续更新，欢迎补充！
