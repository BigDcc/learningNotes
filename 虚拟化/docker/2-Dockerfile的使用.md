# 2-Dockerfile的使用方法

[TOC]

## 1 Dockerfile的简介

### 1.1 Dockerfile的作用和注意事项

1. Dockerfile是一个文本格式的配置文件，用户可以使用Dockerfile来快速创建自定义的镜像，这是创建镜像最常用的手段之一；

2. 使用 Dockerfile 可以允许用户创建自定义的镜像，Dockerfile的每一行都代表一个用于构建镜像的指令；

### 1.2 Dockerfile文件的结构

1. 基础镜像信息
2. 维护者信息
3. 镜像操作指令
4. 容器启动时执行命令

> Dockerfile由一行行命令语句组成，并支持以#开头的注释行；



### 1.3 简单的Dockerfile示例

```dockerfile
FROM ubuntu:18.04
MAINTAINER achui 306789974@qq.com
RUN apt intall 
```





> 开始必须指明所依据的多个名称，然后推荐说明维护者信息。后面则是对齐操作指令，例如RUN指令，RUN指令将对并执行后续的命令。每运行一条RUN指令，就会添加新的一层，并提交。最后是CMD指令，来指定运行容器时的操作命令。

Dockerfile 基本的语法是

使用#来注释
FROM 指令告诉 Docker 使用哪个镜像作为基础
接着是维护者的信息
RUN开头的指令会在创建中运行，比如安装一个软件包，在这里使用 apt-get 来安装了一些软件
编写完成 Dockerfile 后可以使用 docker build 来生成镜像。

相反，推荐使用被称为Dockerfile 的定义文件和 docker build 命令来构建镜像

$ cd static_web
$ touch Dockerfile
我们创建了一个名为static_web的目录用来保存Dockerfile，这个目录就是我们的构建环境（build environment），Docker 则称此环境为上下文（context）或者构建上下文（build context）。Docker 会在构建镜像时将构建上下文和该上下文中的文件和目录上传到 Docker守护进程。这样 Docker 守护进程就能直接访问你想在镜像中存储的任何代码、文件或者其他数据。

该Dockerfile由一系列指令和参数组成。每条指令，如FROM，都必须为大写字母，且后面要跟随一个参数：FROM ubuntu：14.04。Dockerfile 中的指令会按顺序从上到下执行，所以应该根据需要合理安排指令的顺序。

Docker从基础镜像运行一个容器。
● 执行一条指令，对容器做出修改。
● 执行类似docker commit 的操作，提交一个新的镜像层。
● Docker再基于刚提交的镜像运行一个新容器。
● 执行Dockerfile 中的下一条指令，直到所有指令都执行完毕。

Dockerfile也支持注释。以#开头的行都会被认为是注释，代

每个Dockerfile的第一条指令都应该是FROM。FROM指令指定一个已经存在的镜像，后续指令都将基于该镜像进行，这个镜像被称为基础镜像（base iamge）。

接着指定了MAINTAINER指令，这条指令会告诉Docker该镜像的作者是谁，以及作者的电子邮件地址。这有助于标识镜像的所有者和联系方式

RUN 指令会在当前镜像中运行指定的命令。

RUN 指令会在shell 里使用命令包装器/bin/sh -c 来执行。如果是在一个不支持shell的平台上运行或者不希望在shell中运行（比如避免shell字符串篡改），也可以使用exec格式的RUN指令

RUN [ "apt-get", " install", "-y", "nginx" ]

在这种方式中，我们使用一个数组来指定要运行的命令和传递给该命令的每个参数

接着设置了EXPOSE指令，这条指令告诉Docker该容器内的应用程序将会使用容器的指定端口

出于安全的原因，Docker并不会自动打开该端口，而是需要你在使用docker run 运行容器时来指定需要打开哪些端口。一会儿我们将会看到如何从这一镜像创建一个新容器。
可以指定多个EXPOSE指令来向外部公开多个端口

Docker也使用EXPOSE指令来帮助将多个容器链接

执行docker build 命令时，Dockerfile 中的所有指令都会被执行并且提交，并且在该命令成功结束后返回一个新镜像

$ sudo docker build -t="jamtur01/static_web" .

我们使用了docker build 命令来构建新镜像。我们通过指定-t 选项为新镜像设置了仓库和名称

也可以在构建镜像的过程中为镜像设置一个标签，其使用方法为“镜像名：标签”，

如果没有制定任何标签，Docker将会自动为镜像设置一个latest标签。

上面命令中最后的.告诉 Docker 到本地目录中去找 Dockerfile 文件。也可以指定一个Git仓库的源地址来指定Dockerfile的位置，如代码清单4-26所示。
代码清单4-26 从Git仓库构建Docker镜像
$ sudo docker build -t="jamtur01/static_web：v1" \
[git@github.com](mailto:git@github.com)：jamtur01/docker-static_web

这里Docker假设在这个Git仓库的根目录下存在Dockerfile文件。

如果在构建上下文的根目录下存在以.dockerignore命名的文件的话，那么该文件内容会被按行进行分割，每一行都是一条文件过滤匹配模式。这非常像.gitignore文件，该文件用来设置哪些文件不会被上传到构建上下文中去。该文件中模式的匹配规则采用了Go语言中的filepath￼。

由于每一步的构建过程都会将结果提交为镜像，所以 Docker 的构建镜像过程就显得非常聪明。它会将之前的镜像层看做缓存

实际上，当再次进行构建时，Docker 会直接从第 4 步开始。当之前的构建步骤没有变化时，这会节省大量的时间

这时你可能需要取得每个包的最新版本。要想略过缓存功能，可以使用docker build 的——no-cache 标志

$ sudo docker build ——no-cache -t="jamtur01/static_web" .

之后我又使用了一条新出现的指令 ENV 来在镜像中设置环境变量

有了这个模板，如果想刷新一个构建，只需修改ENV指令中的日期。这使Docker在命中 ENV 指令时开始重置这个缓存，并运行后续指令而无须依赖该缓存。也就是说，RUN apt-get update 这条指令将会被再次执行，包缓存也将会被刷新为最新内容。可以扩展此模板，比如适配到不同的平台或者添加额外的需求

如果想深入探求镜像是如何构建出来的，可以使用docker history 命

我们这里也使用了一个新的-p标志，该标志用来控制Docker在运行时应该公开哪些网络端口给外部（宿主机

运行一个容器时，Docker可以通过两种方法来在宿主机上分配端口。

号来映射到容器中的80端口上。
● 可以在Docker宿主机中指定一个具体的端口号来映射到容器中的80 端口上。

可以看到，容器中的80端口被映射到了宿主机的49154上。我们也可以通过docker port来查看容器的端口映射情况，如代码清单4-37所示。
代码清单4-37 docker port 命令
$ sudo docker port 6751b94bb5c0 80
0.0.0.0：49154

在上面的命令中我们指定了想要查看映射情况的容器的ID和容器的端口号，这里是80。该命令返回了宿主机中映射的端口，即49154。

-p 选项还让我们可以灵活地管理容器和宿主机之间的端口映射关系。比如，可以指定将容器中的端口映射到Docker宿主机的某一特定端口上，如代码清单4-38所示

代码清单4-38 通过-p选项映射到特定端口
$ sudo docker run -d -p 80：80 ——name static_web jamtur01/static_web \

上面的命令会将容器内的80端口绑定到本地宿主机的80端口上

很明显，我们必须非常小心地使用这种直接绑定的做法：如果要运行多个容器，只有一个容器能成功地将端口绑定到本地宿主机上。这将会限制Docker的灵活性

我们也可以将端口绑定限制在特定的网络接口（即IP地址）上，如代码清单4-40所示。
代码清单4-40 绑定到特定的网络接口
$ sudo docker run -d -p 127.0.0.1：80：80 ——name static_web jamtur01/sta

这里，我们将容器内的80端口绑定到了本地宿主机的127.0.0.1这个IP的80端口上。我们也可以使用类似的方式将容器内的80端口绑定到一个宿主机的随机端口

Docker 还提供了一个更简单的方式，即-P 参数，该参数可以用来对外公开在Dockerfile中的EXPOSE指令中设置的所有端口

该命令会将容器内的 80 端口对本地宿主机公开，并且绑定到宿主机的一个随机端口上。该命令会将用来构建该镜像的 Dockerfile 文件中 EXPOSE 指令指定的其他端口也一并公开

有了这个端口号，我们就可以使用本地宿主机的IP地址或者127.0.0.1的localhost连接到运行中的容器，查看Web服务器内容了。





## 2 Dockerfile中涉及到的指令

​		可以将Dockerfile中涉及到的指令分为两大类：**配置指令**（配置镜像信息）**和操作指令**（具体执行操作），操作指令主要包括`RUN` ,`CMD`,`ADD`,`COPY`，其余为配置指令。以下将介绍常用的指令的相关信息。

### 2.1 FROM

​		FROM：指定创建镜像的基础镜像，任何Dockerfile中FROM指令必须位于操作指令之前，如果在一个Dockerfile文件中创建多个镜像时，可指定多个FROM指令。基础格式`FROM <image>:<tag>`

​		在定义创建镜像的过程中可能需要用到一些变量，这些变量不需要在镜像中使用，而只是在构建镜像的过程中使用，可以通过`ARG` 指令指定

```dockerfile
ARG VERSION=18.04
FROM ubuntu:${VERSION}
```

### 2.2 LABEL

​		LABEL：可以为生成的镜像添加元数据标签信息，这些信息可以用来辅助过滤出特定的镜像，它的参数通常是键值对

```dockerfile
ARG VERSION=18.04
FROM ubuntu:${VERSION}
LABEL author="achui" data="2020-6-10"
```

### 2.3 EXPOSE

​		EXPOSE：声明镜像内服务监听的端口，该指令只起到声明作用，并不会自动完成端口的映射，使用该指令可以声明多个端口，在运行容器的时候使用-P参数完成宿主机到容器的端口随即映射，或者使用-p参数显式的指定宿主机和容器的端口映射。

```dockerfile
EXPOSE 80 443
```

### 2.4 ENV

​		ENV指定环境变量，指定的环境变量可以在镜像构建阶段被其他指令调用，也可以在容器中使用，他的语法格式和`ARG`相同，作用范围不同。

```dockfile
ENV PATH=${PATH}:/usr/loacl/bin
```

### 2.5 ENTRYPOINT

ENTRYPOINT指令与CMD指令非常类似，也很容易和CMD指令弄混

而ENTRYPOINT指令提供的命令则不容易在启动容器时被覆盖。实际上，docker run命令行中指定的任何参数都会被当做参数再次传递给ENTRYPOINT指令中指定的命令

ENTRYPOINT ["/usr/sbin/nginx"]
CMD ["-h"]

如果确实需要，你也可以在运行时通过docker run的——entrypoint标志覆盖ENTRYPOINT指令



### 2.6 CMD

CMD指令用于指定一个容器启动时要运行的命令。这有点儿类似于RUN指令，只是RUN指令是指定镜像被构建时要运行的命令，而 CMD 是指定容器被启动时要运行的命令。这和使用docker run 命令启动容器时指定要运行的命令非常类似

需要注意的是，要运行的命令是存放在一个数组结构中的。这将告诉Docker按指定的原样来运行该命令。当然也可以不使用数组儿时指定CMD指令，这时候Docker会在指定的命令前加上/bin/sh -c。这在执行该命令的时候可能会导致意料之外的行为，所以Docker推荐一直使用以数组语法来设置要执行的命令。

最后，还需牢记，使用docker run 命令可以覆盖CMD 指令

在Dockerfile中只能指定一条CMD指令。如果指定了多条CMD指令，也只有最后一条CMD指令会被使用



WORKDIR 指令用来在从镜像创建一个新容器时，在容器内部设置一个工作目录，ENTRYPOINT和/或CMD指定的程序会在这个目录下执行。

我们可以使用该指令为Dockerfile中后续的一系列指令设置工作目录，也可以为最终的容器设置工作目录。比如，我们可以如代码清单 4-55 所示这样为特定的指令设置不同的工作目录。
代码清单4-55 使用WORKDIR 指令
WORKDIR /opt/webapp/db
RUN bundle install
WORKDIR /opt/webapp

可以通过-w标志在运行时覆盖工作目录

．ENV

ENV指令用来在镜像构建过程中设置环境变量

ENV RVM_PATH /home/rvm/

这个新的环境变量可以在后续的任何 RUN 指令中使用，这就如同在命令前面指定了环境变量前缀一样

ENV TARGET_DIR /opt/app
WORKDIR $TARGET_DIR

也可以使用docker run命令行的-e 标志来传递环境变量。这些变量将只会在运行时有效

USER指令用来指定该镜像会以什么样的用户去运行

基于该镜像启动的容器会以nginx用户的身份来运行。我们可以指定用户名或UID以及组或GID，甚至是两者的组合

也可以在docker run 命令中通过-u 选项来覆盖该指令指定的值。

如果不通过USER指令指定用户，默认用户为root。

一个卷是可以存在于一个或者多个容器内的特定的目录，这个目录可以绕过联合文件系统，并提供如下共享数据或者对数据进行持久化的功能。

VOLUME ["/opt/project"]
这条指令将会为基于此镜像创建的任何容器创建一个名为/opt/project的挂载点

VOLUME ["/opt/project", "/data" ]

ADD指令用来将构建环境下的文件和目录复制到镜像中。比如，在安装一个应用程序时。ADD指令需要源文件位置和目的文件位置两个参数，如代码清单4-67所示。
代码清单4-67 使用ADD指令
ADD software.lic /opt/application/software.lic

不能对构建目录或者上下文之外的文件进行ADD操作。

在ADD文件时，Docker通过目的地址参数末尾的字符来判断文件源是目录还是文件。如果目标地址以/结尾，那么 Docker 就认为源位置指向的是一个目录。如果目的地址以/结尾，那么Docker就认为源位置指向的是目录。如果目的地址不是以/结尾，那么Docker就认为源位置指向的是文件。

最后值得一提的是，ADD 在处理本地归档文件（tar archive）时还有一些小魔法。如果将一个归档文件（合法的归档文件包括 gzip、bzip2、xz）指定为源文件，Docker 会自动将归档文件解开（unpack）

ADD latest.tar.gz /var/www/wordpress/

条命令会将归档文件 latest.tar.gz 解开到/var/www/wordpress/目录下。Docker解开归档文件的行为和使用带-x选项的tar命令一样：该指令执行后的输

ADD指令会使得构建缓存变得无效，这一点也非常重要。如果通过ADD指令向镜像添加一个文件或者目录，那么这将使Dockerfile中的后续指令都不能继续使用之前的构建缓存。

COPY指令非常类似于ADD，它们根本的不同是COPY只关心在构建上下文中复制本地文件，而不会去做文件提取（extraction）和解压（decompression）的工作

COPY conf.d/ /etc/apache2/
这条指令将会把本地conf.d目录中的文件复制到/etc/apache2/目录中。

文件源路径必须是一个与当前构建环境相对的文件或者目录，本地文件都放到和Dockerfile 同一个目录下。

能复制该目录之外的任何文件，因为构建环境将会上传到Docker守护进程，而复制是在Docker守护进程中进行的。任何位于构建环境之外的东西都是不可用的。COPY指令的目的位置则必须是容器内部的一个绝对路径。

ONBUILD指令能为镜像添加触发器（trigger）。当一个镜像被用做其他镜像的基础镜像时（比如你的镜像需要从某未准备好的位置添加源代码，或者你需要执行特定于构建镜像的环境的构建脚本），该镜像中的触发器将会被执行。

触发器会在构建过程中插入新指令，我们可以认为这些指令是紧跟在FROM之后指定的。触发器可以是任何构建指令，比如代码清单4-71所示。
代码清单4-71 添加ONBUILD 指令
ONBUILD ADD ．/app/src
ONBUILD RUN cd /app/src && make

上面的代码将会在创建的镜像中加入ONBUILD触发器，ONBUILD指令可以在镜像上运行docker inspect 命令来查看，

这里有好几条指令是不能用在ONBUILD指令中的，包括FROM、MAINTAINER和ONBUILD本身。之所以这么规定是为了防止在 Dockerfile构建过程中产生递归调用的问题。

​		