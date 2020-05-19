# 8 虚拟环境和pip包管理工具		

利用python工作不可避免需要使用第三方包，目前安装第三方包的方法有以下三种：

- 通过python社区开发的pip, easy_install等工具
- 使用系统本身自带的包管理其（apt, yum）
- 通过源码安装

pip是一个用来安装和管理python包的工具，它是easy_install的替代品，PyPA（Python Packaging Authority，Python 包官方小组）推荐始终采用 pip 来获取最新版本的 Python 包。

3

的Python包，但每一个新版本都会默认安装pip。

pip install

pip install package-name==version

pip show pip

pip install --upgrade pip

在某些情况下，可能默认pip不可用。从Python 3.4版和2.7.9版开始，总是可以使用ensurepip模块来引导启动pip，具体如下：

## 8.1 使用虚拟环境进行环境隔离

​		Python应用程序通常会使用不在标准库内的软件包和模块。应用程序有时需要特定版本的库。这意味着一个特定的Python版本可能无法满足每个应用程序的要求，带来以下两点问题：

- 如果应用程序A需要特定模块的1.0版本但应用程序B需要2.0版本，则需求存在冲突，安装版本1.0或2.0将导致某一个应用程序无法运行。
- 一个应用程序需要在python的 A版本上运行，而另一个应用程序需要在python的B版本上运行，可以通过解释器别名的方式解决这一问题，但是当多个应用依赖于同一个版本的python时，却依赖于不同的库时，问题又回到了上一个问题。

​		Python中解决上述问题的方式就是使用虚拟环境进行隔离，每个独立的虚拟环境中安装有特定Python版本，以及许多其他包。

​		在Python中提供环境隔离的几种工具分别为virtualenv，venv(python3.3之后使用的最新虚拟环境包)，buildout。

​		这里我们主要介绍内置模块venv的使用。



sudo apt install the python3-venv

1）创建命令：

python -m venv test_virtual

python：特定版本的python的执行路径，这里我在环境变量中添加了3.6的路径所以虚拟环境默认依赖3.6，当你电脑中存在多个python版本时可以通过绝对路径方式指定虚拟环境依赖的具体版本。

test_virtual：虚拟空间名称，在创建的时候，不存在该路径，则自动创建，有时候，我们会看到python -m venv . 这样的创建方式，其实是在当前目录下创建虚拟环境。

2）激活和关闭虚拟空间命令：

激活命令（激活虚拟空间以后，才能对虚拟空间进行操作）

2-1）windows下：

test_virtual\Scripts\activate

2-2）unix或macos下：

source tutorial-env/bin/activate

2-3) 退出虚拟环境命令

deactivate

## 8.2 pip包管理工具

### 8.2.1 pip搜索功能的简单介绍

你可以使用一个名为pip的程序来安装、升级和移除软件包。默认情况下pip将从 Python Package Index <[https://pypi.org](https://pypi.org/)> 安装软件包。你可以在浏览器中访问 Python Package Index 或是使用 pip 受限的搜索功能(如下图所示，通过模糊查询，匹配库文件的描述，从而将符合条件的库文件和相关描述都列举出来):

![img](file:////tmp/wps-achui/ksohtml/wps1UM8Zx.jpg) 

### 8.2.2 通过pip安装包和升级包，删除包

1）可以通过指定包的名称来安装最新版本的包：

pip install mysql-connector(安装mysql官方提供的python链接数据库的最新包)

2）还可以通过提供包名称后跟 == 和版本号来安装特定版本的包：

pip install requests==2.6.0（安装requests包的特定版本）

3）升级相关的软件包：

pip install --upgrade requests（将requests包直接升级到最新版）

4）卸载相关的软件

pip uninstall pygame（卸载pygame游戏引擎）

### 8.2.3 wheel方式安装软件

wheel是python的一种安装包，其后缀为.whl，在网速较差的情况下可以选择下载wheel文件再安装，安装时直接通过pip加文件名安装即可。在通过wheel结合pip安装软件时，首先需要安装wheel。

pip install wheel

在对应网站下载好wheel文件后，进入文件存放目录，使用pip install *.whl即可完成对应库的安装。

### requirements.txt文件简单用法

#### 8.2.4.1 该文件的作用

1）批量导出当前开发环境的包信息

2）批量安装依赖环境

3）一般用pip安装工具安装单个包，多个包的安装可以手写requirements文件，进行多包安装

#### 8.2.4.2 生成该文件

pip freeze > requirements.txt

#### 8.2.44\*******\*.\*******\*3\**** ***\*使用该文件配置当前环境\****

pip install -r requirements.txt