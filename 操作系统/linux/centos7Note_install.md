# Centos7 软件安装笔记

通常在linux的发行版本CentOS中有三种安装软件的方式：

安装和升级软件通常可采用三种不同的方式，最常用的应该是yum方式在线安装升级；

- 第一种方式是直接通过源码方式进行编译安装
- 厂商编译好的二进制文件，我们直接拿来进行安装，省去了自己在本地编译的复杂性，
通常我们可以直接拿厂商的源码文件去自己的机器上进行编译安装
或者厂商在和我们相同的环境上编译好以后，我们直接使用，这种编译好的二进制文件,这种方式可以分为在线安装和下载安装包的方式进行安装
redhat上有rpm包和yum包管理方式，debian上有dpkg包和apt包管理方式

本篇主要介绍如何通过这三种方式安装软件

## 1. 常见的概念

### 1.1 可执行文件

**可执行文件**：在linux上可执行文的本质是二进制程序并且具有可执行权限

> shell脚本被划为可执行文件的原因是bash本身就是二进制程序，而其调用的外部命令其实也是二进制程序，shell中只是通过逻辑的判断去调用这些程序

**查看文件是否为可执行文件**：使用`file`命令可以查看一个文件是否为二进制文件

```shell

file /usr/bin/bash

# 通过输出的信息我们可以判断一个文件是否为可执行文件

/usr/bin/bash: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=c6651902765f4cb2f5f0b2dd9c136b4486083087, stripped, too many notes (256)
```

### 1.2 源代码生成可执行文件

**源码生成可执行文件**：以下以C语言为例

源码文件 -> 编译器编译（编译文件并链接函数库或者其他子程序，主程序）-> 二进制文件 （.c -> .o + 链接函数库 -> binary file）

hello.c文件

```c
#include <stdio.h>

int main(void) {
	printf("hello\n");
	bye();
}
```

bye.c文件

```c
#include <stdio.h>
void bye(void) {
	printf("bye\n");
}
```

通过gcc编译源文件，并链接子程序，生成二进制文件

```shell

# 编译生成目标文件
gcc -c hello.c bye.c 

# 链接子程序，生成二进制文件
gcc -o hello.o bye.o

# 运行二进制文件
./test

# 运行结果
$: hello
$: bye

# 查看二进制文件类型
file test

test: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=cf5ccb4af5a0d5a31208260a95099aa49c84c1a9, not stripped

```

通过上述的演示，发现如果我们进行软件更新只需要将更改的源码，重新编译成目标文件，重新链接成二进制文件，而不需要更改其他未更改的文件

### 1.3 函数库

#### 1.3.1 静态库和函数库

函数库就是别人写好的模块，我们直接拿来引用在我们的程序当中（避免重复造轮子），在编译的过程中编译器会链接函数库，这样生成的二进制文件在执行的时候才会调用到对应的函数库；

函数库根据是否被编译到程序内部又分为静态库和动态库；

**静态库**，通常以`.a`结尾，使用静态库的程序，在生成可执行文件后可以独立运行，大是程序体积较大，同时在升级的时候，如果函数库被更改，那么依赖该函数库的源码都需要重新编译；

**动态库**，通常以`.so`结尾，程序内部只记录了函数库的位置（通过指针），而不需要把函数库编译到程序当中去，所以生成的程序，体积小，易于升级，升级函数库的时候新旧同名（用新的覆盖旧的），即可在不编译其他源文件的情况下升级程序，这在linux中相当常用，函数库通常存储在`lib`和`lib64`这两个目录下；

 #### 1.3.2 判断程序是否包含动态库

使用`ldd`命令查看一个程序依赖了哪些动态库

 ```shell
 用法：ldd [选项]… 文件…
      --help              印出这份说明然后离开
      --version           印出版本信息然后离开
  -d, --data-relocs       进程数据重寻址
  -r, --function-relocs   进程数据和函数重寻址
  -u, --unused            印出未使用的直接依赖关系
  -v, --verbose           印出所有信息

要知道错误报告指令，请参看:
<http://www.gnu.org/software/libc/bugs.html>.
 ```

### 1.4 构建工具

#### 1.4.1 make工具

在编译简单项目的时候，可以使用编译器直接调用源码文件进行编译，但是当针对复杂项目时，可以通过构建工具如make工具，去简化生成二进制文件的复杂性（C语言常用的构建工具make,java语言常用的构建工具maven，gradle等）

make工具可以简化复杂项目的编译过程，在执行make的时候，会自动在当前的目录下面查找Makefile这个文件，该文件记录了源码如何编译的详细信息

Makefile文件通常由厂商在源码文件中提供的名为configure（或者config）检测脚本自动生成

**下载好的源码文件如何生成Makefile文件**？

检测程序生成Makefile的大致过程如下所示：

- 是否有合适的编译器编译源代码
- 是否有程序需要依赖的函数库
- 操作系统和内核是否和程序兼容
- 内核的头文件是否存在

满足上述生成条件，生成Makefile文件，否则提示失败

#### 1.4.2 Makefile的了解

由于makefile是安装软件提供的我们不做介绍，其简单结构如下所示：

```makefile
target:  文件1 文件2
# gcc之前要有一个tag占位
	gcc -o 可执行文件名称 目标文件1 目标文件2
```

一般在makefile中包含很多的target，负责不同的操作，如删除目标文件，以使程序可重新编译，这在一些特殊的环境下是必须的，如进行静态代码扫描时；

通常厂商的makefile文件里面，使用`make`代表编译，`make clean`代表删除目标文件，`make install`代表将二进制文件安装到系统中的特定位置；

### 1.5 Tarball软件

一般厂商会将源码文件采用tar打包，然后采用一种压缩工具压缩,如gzip工具，形成后的软件包方便进行传输，这种采用了压缩技术的源码提供方式，叫做Tarball软件

Tarball软件包中通常包含如下项目：

- 源码文件
- 检测程序（用来生成Makefile）
- 软件的简易说明和安装说明(INSTALL或README文件)

### 1.6 校验程序完整性工具

常用的验证程序是否一致的工具包括以下几种：

- md5sum
- sha1sum
- sha256sum

```shell
md5sum filename
```

这些工具可以校验一个程序是否和以前的一致（防止程序被更改，损坏等情况的出现）

## 2. 源码方式安装软件

### 2.1 源码方式安装软件的步骤

1. 从软件提供方的官方网站下载Tarball包
2. 将Tarball解压到特定目录
3. 采用编译器编译源码
4. 使用编译器链接函数库，生成二进制文件
5. 将生成的二进制文件和相关的配置文件安装到自己的机器上

> - 通常建议在`/usr/local/`目录下安装软件，源码文件建议放在`/usr/local/src`下；
> - 软件安装时最好在`/usr/local/`下新建一个用于软件标识的根目录，方便管理，如`/usr/local/weixin/`；
> - 使用目录的方式在local目录下隔离软件，如果需要使用man命令，则需要到`/etc/man_db.conf`中加入`MANPATH_MAP /usr/local/qq/bin /usr/local/qq/man`;

### 2.2 更新软件

更新软件通常不需要冲下下载Tarball包，直接修改源码文件，然后make就可以了，那如何知道厂商修改了哪些源文件呢？

厂商通常提供patch文件来描述升级的内容，我们可以使用`patch`命令去修改旧的源码，进而重新编译源码，完成升级

## 3. RPM方式安装软件

linux开发商在固定的平台上，将软件预先编译好，并将相关配置文件写入，打包成特殊格式的文件，然后发布这个软件，客户端通过特殊的命令格式安装该软件，检测相关依赖环境，如符合条件，即可进行安装，安装完成后
将软件信息记录到软件管理机制中，方便进行升级，和删除，这种安装的方式，在linux中分为两大类dpkg格式和rpm格式


RPM(redhat package manager)最大的特点是，要安装的软件已经预先编译过，并打包成rpm机制的文件(.rmp),打包好的软件中包含了一个默认的数据库，记录了这个软件安装的时候需要的依赖环境(一些软件或者库)，当通过特殊
命令进行安装的时候，首先会查询数据库查看本机是否拥有这些依赖，满足条件即可安装，不满足无法进行安装。安装完成后将安装信息写入rpm机制的数据库中方便管理。

RPM并非十全十美，他带来了一个问题就是软件只能安装在与打包时的机器环境相同的环境上，不能跨平台，在源码安装时，我们可以通过编译将软件安装在不同的环境上(基于语言的跨平台性)，所以衍生出了SRPM的概念，SRPM包包含
源码文件(.src.rpm),SRPM提供了configure和makefile等编译时需要的文件。安装SRPM格式的软件，需要先将软件打包成RPM格式文件，然后通过RPM机制进行安装（centos就是通过redhat的SRPM包衍生出来的）

在安装时如何确定我们下载的RPM包就是适合本机平台的包？通过文件名即可，一般通过文件的后缀区分是rpm还是srpm，文件名中一般还会提供软件名，软件版本号，适用平台等相关信息。


centos使用rpm格式，ubuntu使用dpkg

这种提供特殊格式安装文件的坏处是依赖需要自行处理，虽然省去了编译的痛苦，但是依旧很难进行管理，开发商随即提供了在线安装服务，可以自动安装软件依赖，这就是我们经常提到的yum和apt软件管理工具

### rmp应用实例

软件安装

```shell
# 安装软件通常时root用户的事情，所以使用普通用户安装软件时需要sudo
# 使用rpm安装软件的时候，支持多个软件同时安装，只需要参数传入多个软件名即可

# 常用的option
# -i 安装软件的意思
# -v 查看更详细的安装过程
# -h 显示安装进度

sudo rpm -ivh wps-office-11.1.0.9505-1.x86_64.rpm  # 安装wps在centos下
```

软件升级

```shell

# 使用U这个option可以升级软件，如果软件未安装就安装，已安装就检测升级

sudo rpm -Uvh linuxqq_2.0.0-b2-1082_x86_64.rpm  # 安装qq
```

软件删除

```shell

# 软件删除操作时经常由于软件依赖原因导致无法正常删除，建议不要使用强制参数进行删除

sudo rpm -e wsp-office  # 删除wps软件

```

重建数据库

rpm机制的本地数据库保存在/var/lib/rpm下

经常安装删除软件可能造成rpm的数据库损坏，可以通过重建命令修复rpm的数据库

```shell
sudo rpm --rebuilddb
```




## 4. YUM方式安装软件

> Yum(Yellow dog Updater, Modified)是一个在Fedora、RedHat、CentOS、SUSE中的软件包管理器。基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。yum的工作需要两部分来合作，一部分是yum服务器，还有就是client的yum工具。

yum服务器

所有要发行的rpm包都放在yum服务器上以ftp或者httpd的方式提供下载，rpm包根据kernel的版本号、cpu的版本号分别编译发布。yum服务器只要提供简单的下载就可以了。yum服务器还有一个最重要的环节就是整理出每个rpm包的基本信息，包括rpm包对应的版本号、conf文件、binary信息、依赖信息等。在yum服务器上提供了createrepo工具，用于把rpm包的基本概要信息做成一张”清单”，这张”清单”"就是描述每个rpm包的spec文件中信息。


yum client端

client每次调用yum install或者search的时候，都会去解析/etc/yum.repos.d下所有以.repo结尾的配置文件，这些配置文件指定了yum服务器的地址。YUM客户端安装软件，默认会把YUM源地址、rpm的header信息、软件包、数据库信息、缓存文件存储在/var/cache/yum(该缓存路径配置在/etc/yum.conf里)中，每次使用YUM工具，YUM优先通过cache查找相关软件包，cache中不存在，然后再访问外网yuM源。

yum的一切信息都存储在一个叫yum.reops.d目录下的配置文件中，通常位于/etc/yum.reops.d目录下。

  在这个目录下面有很多文件，都是.repo结尾的，repo文件是yum源（也就是软件仓库）的配置文件，通常一个repo文件定义了一个或者多个软件仓库的细节内容，例如我们将从哪里下载需要安装或者升级的软件包，repo文件中的设置内容将被yum读取和应用！
————————————————
版权声明：本文为CSDN博主「树上骑个猴」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/shuaigexiaobo/article/details/79875730


/etc/yum.repos.d/CentOS-Base.repo

存放了软件信息和软件依赖信息的列表清单存放的机器称为软件源，软件源中通常还记录了软件安装包存放的位置(url)方便下载该软件

yum如何安装升级一个软件呢？ 首先本机的yum软件会请求软件源更新本地软件列表清单，将最新的软件列表清单放入本地，然后通过这个列表清单和本地的RPM数据库进行比较，然后yum软件根据指令去软件源上请求下载软件（软件源记录了软件的url），下载到本地后，通过rpm机制安装软件。

yum可以自动的处理软件的依赖属性问题

软件源：软件放置在yum服务器上，以供客户端来安装和升级，使用yum功能时首先要找到对应的yum服务器，每个服务器会提供许多不同的软件功能，这就是软件源

centos默认带有一些镜像站用来

```shell
yum groupinstall "Development Tools"
```


```shell
# 常用的option

# y 如果安装时需要输入确认，自动填充确认
# 
```

```shell

usage: dnf [options] COMMAND

主要命令列表：

alias                     列出或创建命令别名
autoremove                删除所有原先因为依赖关系安装的不需要的软件包
check                     在包数据库中寻找问题
check-update              检查是否有软件包升级
clean                     删除已缓存的数据
deplist                   列出软件包的依赖关系和提供这些软件包的源
distro-sync               同步已经安装的软件包到最新可用版本
downgrade                 降级包
group                     显示或使用组信息
help                      显示一个有帮助的用法信息
history                   显示或使用事务历史
info                      显示关于软件包或软件包组的详细信息
install                   向系统中安装一个或多个软件包
list                      列出一个或一组软件包
makecache                 创建元数据缓存
mark                      在已安装的软件包中标记或者取消标记由用户安装的软件包。
module                    与模块交互。
provides                  查找提供指定内容的软件包
reinstall                 重装一个包
remove                    从系统中移除一个或多个软件包
repolist                  显示已配置的软件仓库
repoquery                 搜索匹配关键字的软件包
repository-packages       对指定仓库中的所有软件包运行命令
search                    在软件包详细信息中搜索指定字符串
shell                     运行交互式的DNF终端
swap                      运行交互式的 DNF 终端以删除或者安装 spec 描述文件
updateinfo                显示软件包的参考建议
upgrade                   升级系统中的一个或多个软件包
upgrade-minimal           升级，但只有“最新”的软件包已修复可能影响你的系统的问题

插件命令列表：

builddep                  Install build dependencies for package or spec file
changelog                 查看软件包的改变日志数据
config-manager            管理 dnf 配置选项和软件仓库
copr                      与 Copr 仓库交互
debug-dump                转储已安装的 RPM 软件包信息至文件
debug-restore             恢复调试用转储文件中的软件包记录
debuginfo-install         安装调试信息软件包
download                  下载软件包至当前目录
needs-restarting          判断所升级的二进制文件是否需要重启
playground                与 Playground 仓库交互。
repoclosure               显示仓库中未被解决的依赖关系的列表
repodiff                  列出两组仓库中的不同
repograph                 以点线图方式输出完整的软件包依赖关系图
repomanage                管理 RPM 软件包目录
reposync                  下载远程仓库中的全部软件包

可选参数:
  -c [config file], --config [config file]
                        配置文件位置
  -q, --quiet           静默执行
  -v, --verbose         详尽执行
  --version             显示 DNF 版本信息并退出
  --installroot [path]  设置目标根目录
  --nodocs              不要安装文档
  --noplugins           禁用所有插件
  --enableplugin [plugin]
                        启用指定名称的插件
  --disableplugin [plugin]
                        禁用指定名称的插件
  --releasever RELEASEVER
                        覆盖在配置文件和仓库文件中 $releasever 的值
  --setopt SETOPTS      设置任意配置和仓库选项
  --skip-broken         通过跳过软件包来解决依赖问题
  -h, --help, --help-cmd
                        显示命令帮助
  --allowerasing        允许解决依赖关系时删除已安装软件包
  -b, --best            在事务中尝试最佳软件包版本。
  --nobest              不用把事务限制在最佳选择
  -C, --cacheonly       完全从系统缓存运行，不升级缓存
  -R [minutes], --randomwait [minutes]
                        最大命令等待时间
  -d [debug level], --debuglevel [debug level]
                        调试输出级别
  --debugsolver         转储详细解决结果至文件
  --showduplicates      在 list/search 命令下，显示仓库里重复的条目
  -e ERRORLEVEL, --errorlevel ERRORLEVEL
                        错误输出级别
  --obsoletes           对 upgrade 启用 dnf 的过期处理逻辑，或对 info、list 和 repoquery
                        显示软件包过期的功能
  --rpmverbosity [debug level name]
                        rpm调试输出等级
  -y, --assumeyes       全部问题自动应答为是
  --assumeno            全部问题自动应答为否
  --enablerepo [repo]
  --disablerepo [repo]
  --repo [repo], --repoid [repo]
                        启用指定 id 或 glob 的仓库，可以指定多次
  --enable, --set-enabled
                        使用 config-manager 命令启用 repos (自动保存)
  --disable, --set-disabled
                        使用 config-manager 命令禁用 repos (自动保存)
  -x [package], --exclude [package], --excludepkgs [package]
                        用全名或通配符排除软件包
  --disableexcludes [repo], --disableexcludepkgs [repo]
                        禁用 excludepkgs
  --repofrompath [repo,path]
                        指向附加仓库的标记和路径，可以指定多次。
  --noautoremove        禁用删除不再被使用的依赖软件包
  --nogpgcheck          禁用 gpg 签名检查 (如果 RPM 策略允许)
  --color COLOR         配置是否使用颜色
  --refresh             在运行命令之前将元数据标记为过期。
  -4                    仅解析 IPv4 地址
  -6                    仅解析 IPv6 地址
  --destdir DESTDIR, --downloaddir DESTDIR
                        设置软件包要复制到的目录
  --downloadonly        仅下载软件包
  --comment COMMENT     为事务添加一个注释
  --bugfix              在更新中包括与 bug 修复有关的软件包
  --enhancement         在更新中包括与功能增强有关的软件包。
  --newpackage          在更新中包括与新软件包有关的软件包
  --security            在更新中包括与安全有关的软件包
  --advisory ADVISORY, --advisories ADVISORY
                        在更新中包括修复指定公告所必须的软件包
  --bz BUGZILLA, --bzs BUGZILLA
                        在更新中包括修复给定 BZ 所必须的软件包
  --cve CVES, --cves CVES
                        在更新中包括修复给定 CVE 所必须的软件包
  --sec-severity {Critical,Important,Moderate,Low}, --secseverity {Critical,Important,Moderate,Low}
                        在更新中包括匹配给定安全等级的安全相关的软件包
  --forcearch ARCH      强制使用一个架构

  ```
