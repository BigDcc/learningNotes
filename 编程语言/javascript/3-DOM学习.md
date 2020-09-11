# DOM&BOM

## 1 DOM

### 1.1 什么是DOM

​		文档对象模型（DOM，Document Object Model）是针对XML但经过扩展用于HEML的应用程序编程接口（API，Application Programming Interface）。DOM把整个页面映射为一个多层节点结构。HTML或XML页面中的每个组成部分都是某种类型的节点，这些节点又包含着不同类型的数据。

​		通过DOM提供的API，开发人员可以轻松自如地删除，添加，替换或修改任何节点，而且通过DOM对页面内容进行刷新，不需要在浏览器中刷新页面（即重新加载页面）。

​		“W3C 文档对象模型 （DOM） 是中立于平台和语言的接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。” W3C DOM 标准被分为 3 个不同的部分：

- 核心 DOM - 针对任何结构化文档的标准模型

- XML DOM - 针对 XML 文档的标准模型

- HTML DOM - 针对 HTML 文档的标准模型

DOM代表着加载到浏览器窗口的当前网页;





DOM1级（W3C的推荐标准）由两个模块组成

- DOM Core : 如何映射基于XML的文档结构；
- DOM HTML :在DOM核心上增加了针对HTML的对象和方法；

DOM2级

- 新增DOM事件
- 

### 1.2 HTML DOM

HTML DOM 定义了所有 HTML 元素的对象和属性，以及访问它们的方法。

换言之，HTML DOM 是关于如何获取、修改、添加或删除 HTML 元素的标准



parentNode 属性可返回某节点的父节点。 node.parentNode; 注意：如果指定的节点没有父节点则返回 NULL。

## 1 HTML DOM

​		通过 HTML DOM，可访问 JavaScript HTML 文档的所有元素，当网页被加载时，浏览器会创建页面的文档对象模型（Document Object Model）。

- JavaScript 能够改变页面中的所有 HTML 元素
- JavaScript 能够改变页面中的所有 HTML 属性
- JavaScript 能够改变页面中的所有 CSS 样式
- JavaScript 能够对页面中的所有事件做出反应

```html
<!DOCTYPE html>
<html>
<head>
    <title>My title</title>
</head>
<body>
    <h1>My header</h1>
    <a href="">My link</a>
</body>
</html>
```





![DOM树型结构](./res/051.png)

- 元素节点（标签的名字就是元素的名字）
- 文本节点（文本节点总是被包含在元素节点内）
- 属性节点（属性节点总是被包含在元素节点内）

### 1.1 获取元素节点的三种方法

​		当未找到对应元素节点的时候，返回值为`null`;

- 通过 id 找到 HTML 元素

```js
document.getElementById("idName");  // 通过 id 查找 HTML 元素， 返回的是一个对象
```

- 通过类名找到 HTML 元素

```js
document.getElementsByClassName("className");  // 通过类名找到 HTML 元素， 返回的是一个对象的数组

// 该方法支持查找带有多个类名的元素,使用空格隔开多个类名，类名的顺序不影响搜索
document.getElementsByClassName("className1 className2");
```

- 通过标签找到 HTML 元素

```js
document.getElementsByTagName("tagName");  // 通过标签名查找HTML元素， 返回的是一个对象的数组

// getElementsByTagName方法支持传入一个通配符作为参数，*号一定要放入引号当中作为和乘法的区分
// 使用通配符的该方法返回的数组将会包含整个文档的全部元素节点
document.getElementsByTagName("*");
```

```js
// 改变 HTML 内容
document.getElementById(id).innerHTML=新的 HTML //改变 HTML 元素的内容
// 改变 HTML 属性
document.getElementById(id).attribute=新属性值
// 改变 HTML 样式
document.getElementById(id).style.property=新样式
```

### 1.2 获取和设置属性节点的值

```js
// 以下两种方法不属于document的方法
object.getAttribute(attribute) // 获取属性的值
object.setAttribute(attribute, value)  // 设置属性的值
```





innerHTML是个重要的属性，使用它可以读取或替换元素的内容

在浏览器内部，使用元素对象来表示你在HTML文件中输入的内容，如<p>some text</p>。加载并分析HTML文件时，浏览器为网页中的每个元素创建一个元素对象，并将它们加入到DOM中。因此，DOM其实就是一棵由元素对象组成的大树。

处理DOM时，应该确保网页已经完全加载完毕，这样才可以保证DOM对象已生成，让我们方便操作

如何保证网页已经完整的加载完成，一种是将js代码放在<body>的尾部，另一种是将js代码封装在函数中，将函数名赋值到windows.onload对象

回调函数

假设有重大的事件(如网页加载完毕)即将发生，而你必须在其发生后第一时间获悉。对于这种情形，一种常见的处理方式是使用回调函数[callback，也叫事件处理程序(event handler)]。
回调函数的工作原理如下：给了解事件的对象提供一个函数；事件发生后，这个对象将通过调用这个函数来通知你。在JavaScript中，对很多事件都采用了这种处理模式。

## 2 HTML DOM 事件

