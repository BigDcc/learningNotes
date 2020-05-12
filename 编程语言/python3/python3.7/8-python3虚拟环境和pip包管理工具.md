# ***\*8 虚拟环境和pip包管理工具\****

## ***\*8.1 使用虚拟环境进行环境隔离\****

在python中为了防止python以及各种库文件的版本冲突导致的环境问题，我们可以进行环境隔离策略。在python中提供环境隔离的几种工具分别为virtualenv，venv(python3.3之后使用的最新虚拟环境包)，buildout。

这里我们主要介绍内置模块venv的使用。

1）***\*创建命令：\****

python -m venv test_virtual

python：特定版本的python的执行路径，这里我在环境变量中添加了3.6的路径所以虚拟环境默认依赖3.6，当你电脑中存在多个python版本时可以通过绝对路径方式指定虚拟环境依赖的具体版本。

test_virtual：虚拟空间名称，在创建的时候，不存在该路径，则自动创建，有时候，我们会看到python -m venv . 这样的创建方式，其实是在当前目录下创建虚拟环境。

2）***\*激活和关闭虚拟空间命令：\****

激活命令（激活虚拟空间以后，才能对虚拟空间进行操作）

2-1）windows下：

test_virtual\Scripts\activate

2-2）unix或macos下：

source tutorial-env/bin/activate

2-3) 退出虚拟环境命令

deactivate

## ***\*8.2 pip包管理工具\****

### ***\*8.2.1 pip搜索功能的简单介绍\****

你可以使用一个名为pip的程序来安装、升级和移除软件包。默认情况下pip将从 Python Package Index <[https://pypi.org](https://pypi.org/)> 安装软件包。你可以在浏览器中访问 Python Package Index 或是使用 pip 受限的搜索功能(如下图所示，通过模糊查询，匹配库文件的描述，从而将符合条件的库文件和相关描述都列举出来):

![img](file:////tmp/wps-achui/ksohtml/wps1UM8Zx.jpg) 

### ***\*8.2.2 通过pip安装包和升级包，删除包\****

1）可以通过指定包的名称来安装最新版本的包：

pip install mysql-connector(安装mysql官方提供的python链接数据库的最新包)

2）还可以通过提供包名称后跟 == 和版本号来安装特定版本的包：

pip install requests==2.6.0（安装requests包的特定版本）

3）升级相关的软件包：

pip install --upgrade requests（将requests包直接升级到最新版）

4）卸载相关的软件

pip uninstall pygame（卸载pygame游戏引擎）

### ***\*8.2.3 wheel方式安装软件\****

wheel是python的一种安装包，其后缀为.whl，在网速较差的情况下可以选择下载wheel文件再安装，安装时直接通过pip加文件名安装即可。在通过wheel结合pip安装软件时，首先需要安装wheel。

pip install wheel

在对应网站下载好wheel文件后，进入文件存放目录，使用pip install *.whl即可完成对应库的安装。

### ***\*8\*******\*.2.\*******\*4\**** ***\*requirements.txt文件简单用法\****

#### ***\*8\*******\*.2.\*******\*4\*******\*.1\**** ***\*该文件的作用\****

1）批量导出当前开发环境的包信息

2）批量安装依赖环境

3）一般用pip安装工具安装单个包，多个包的安装可以手写requirements文件，进行多包安装

#### ***\*8\*******\*.2.\*******\*4\*******\*.2\**** ***\*生成该文件\****

pip freeze > requirements.txt

#### ***\*8\*******\*.2.\*******\*4\*******\*.\*******\*3\**** ***\*使用该文件配置当前环境\****

pip install -r requirements.txt