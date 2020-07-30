# 1. JavaScript简介

[TOC]

## 1 JavaScript简介

### 1.1 JavaScript的诞生

​		从JavaScript高级程序设计一书中我们可以了解到JavaScript的诞生：

>JavaScript诞生于1995年，由布兰登-艾奇创造，起初的主要用途是处理以前由服务器端语言负责的一些输入验证操作，解决了人们在操作页面时，漫长的服务器端校验回传所浪费的时间，如今，JavaScript的用途早已不再局限于简单的数据验证，而是具备了与浏览器窗口以及其内容等几乎所有方面交互的能力。

### 1.2 JS与ES

​		由于 JavaScript 1.0 很受欢迎，Netscape 在 Netscape Navigator 3 中又发布了 JavaScript 1.1 版本。不久，微软在 Internet Explorer 3 中也加入了脚本编程功能。为了避免与 Netscape 的 JavaScript 产生纠纷，微软特意将其命名为 JScript。1997 年，欧洲计算机制造商协会（ECMA）以 JavaScript 1.1 为基础制订了脚本语言标准——ECMA-262，并命名为 ECMAScript。1998 年，国际标准化组织和国际电工委员会（ISO/IEC）采用了 ECMAScript 标准（即 ISO/IEC-16262）。自此，浏览器厂商就以 ECMAScript 作为各自 JavaScript 实现的规范标准。简单概括，ECMAScript 是 JavaScript 语言的规范标准，JavaScript 是 ECMAScript 的一种实现。

​		Web 浏览器只是 ECMAScript 实现的宿主环境之一。宿主环境不仅提供基本的 ECMAScript 实现，同时也会提供各种扩展功能。ECMAScript 是 JavaScript 的标准，但它并不等同于 JavaScript，也不是唯一被标准化的规范。

### 1.3 JavaScript如今的含义

​		实际上，一个完整的 JavaScript 实现由以下 3 个不同部分组成：

- 核心（ECMAScript）：语言核心部分。
- 文档对象模型（Document Object Model，DOM）：网页文档操作标准。
- 浏览器对象模型（BOM）：客户端和浏览器窗口操作基础。

> **注意事项**

> - 文档对象模型是 HTML 的应用程序编程接口（API）。DOM 把整个文档映射为一个树形节点结构，以方便 JavaScript 脚本快速访问和操作;
> - IE3.0 和 Netscape Navigator 3.0 提供了一种新特性，即 BOM（浏览器对象模型）。使用 BOM 可以对浏览器窗口进行访问和操作，如移动窗口、访问历史记录、动态导航等。与 DOM 不同，BOM 只是 JavaScript 的一个部分，并没有形成规范性标准，但是所有浏览器都默认支持。

### 1.4 引入js代码

​		JavaScript程序不能够独立运行，只能在宿主环境中执行。一般情况下可以把 JavaScript 代码放在网页中，借助浏览器环境来运行（这是因为浏览器中包含js的解释器等）

​		通过HTML标签中的`<script>`标签可以引入js代码(包含两种方式):

​		**1. 内嵌js代码：**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript">
        alert("hello js!")
    </script>
</head>
<body>
    hello
</body>
</html>
```

​		**2. 从外部引入js代码：**

```javascript
// hello.js
alert("hello js")
```

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="./hello.js"></script>
</head>
<body>
    hello
</body>
</html>
```

> **注意事项**

> - 不能在引用JavaScript文件的同时内嵌JavaScript代码，即script标签在使用src属性后，不能在标签中包含js代码，因为浏览器不会再去解析其中的代码；
> - `<script>`标签可以存放在`<body>`或者`<head>`中，最好是存放在`<body>`中的结尾处，这样不影响用户加载网页内容，否则可能会导致浏览器在下载js代码时，造成页面显示的延迟；
> - type属性以及其值text/javascript，不是必须设置的，现代浏览器默认 `<script>` 标签的脚本类型为 JavaScript，因此可以省略 type 属性；如果考虑到兼容早期版本浏览器，则需要设置 type 属性；
> - html文档中，script标签不能在开始标签中闭合，引入的外部文件的后缀名不是必须的，为其他语言动态生成js代码提供了可能性，不过省略的前提是保证服务器能正确的返回MIME类型；

### 1.5 ES中一些注意事项

1. **大括号与分号**

   ​		与python通过缩进和冒号来识别代码块不同，ES中采用`{}`和`;`来区分代码块和语句，虽然实际操作中`;`不是必须的，但是最佳的实践是加上他，这样可以在文件中去除多余的空格来减少ES的体积，以及减少解释器智能添加`;`的性能损耗，增加代码性能。

2. **代码块**

   ​		从语法上说，代码块是放在花括号内的一组语句，可以只包含一条语句，也可以包含任意数量的语句。代码块中的所有语句被视为一个整体，要么都执行，要么都不执行

3. **注释**

```javascript
// 单行注释

/*
 *	块注释（第一行和尾行的写法是必须的，中间的行首以星号开始不是必须的，这样写主要是提高可读性）
 *  与python等语言一样，解释器不会执行注释中的内容
 */
```

## 2 变量

### 2.1 标识符

​		标识符是用来对函数，变量已经其他的一些需要命令的语法结构进行命名的规范，ES中命名规范如下所示：

- ECMAScript的标识符区分大小写不能使用关键字为标识符命名；
- 不能以数字开头，字符由字母，数字，下划线，美元符组成（最好不要使用$开头，他被jQuery占用，防止冲突）;
- 标识符最好采用驼峰大小写的方式进行命名，如`sayHello`,当然也可以使用下划线的方式命名（Unix风格）；
- 不使用任何内置关键字和保留字；

### 2.2 定义变量

​		在ES中定义一个变量如下所示

```javascript
// 先声明在赋值
var name;
name = "achui"

// 声明和赋值同时进行
var age = 18
```

> **注意事项**

> - 在函数外使用var声明的变量，都是全局变量，只有浏览器关闭页面时才会消逝；
> - 在函数内使用var声明的变量，都是局部变量，函数调用完成后消逝，而且该变量只能在函数中使用；
> - 使用未声明的变量时，它将自动被视为全局变量，即便你在函数中首次使用它亦如此；
> - 如果在函数内和函数外出现了相同命名的变量，一个为局部变量一个为全局变量，在函数内使用的时候，采取就近原则；

> **定义变量的规范**

> - 在开头声明全局变量
>
> - 在函数开头声明全局变量

## 4 函数

​		ES中的函数结构如下所示：

```javascript
// 1. 使用function关键字声明函数
// 2. 形参支持传递表达式，按值传递实参，即在函数中使用参数，不会影响函数外的变量值
// 3. 没有return语句的函数返回undefined
// 4. 不在乎函数是在使用前还是使用后声明的,shell中函数需要在使用前定义, 这是因为浏览器分两遍读取网页：第一遍读取所有的函数定义，第二遍开始执行代码，所以可以将函数放在文件的任何地方。
function sayHello(name) {
    console.log("hello " + name)
    return "successful"
}
```

