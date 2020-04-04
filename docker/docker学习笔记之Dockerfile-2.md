Dockerfile的每一行都代表一个用于构建镜像的指令


Dockerfile 基本的语法是

使用#来注释
FROM 指令告诉 Docker 使用哪个镜像作为基础
接着是维护者的信息
RUN开头的指令会在创建中运行，比如安装一个软件包，在这里使用 apt-get 来安装了一些软件
编写完成 Dockerfile 后可以使用 docker build 来生成镜像。