为什么VS Code说我的安装不受支持？
VS Code检测到某些安装文件已被修改，可能是通过扩展名进行的。重新安装VS Code将替换受影响的文件。

以上就是我心目中值得推荐的插件了，虽不算多，但是每个都帮助到我的日常工作。如果你觉得这些插件还不能满足你的日常工作，那你可以试着在插件市场进行找寻。不过，找寻的时候，记得要根据我们学习的知识进行分类搜索：

如果你想搜索某个语言的支持，可以查询语言分类；
如果你想为自己的代码添加代码审查，可以查看Linters；

如果你想使用其他人分享的代码片段，则可以查看Snippets；

如果你想安装其他人分享的主题，可以查看Themes。

当你找到了自己心仪的插件后，并且想分享给你的同事，除了把名字告诉他们外，还有什么别的办法没有？
当然有！你可以通过在项目的 .vscode 文件夹下，创建一个文件 extensions.json。你很熟悉了，这又是一个 JSON 文件，在这个 JSON 文件里，你只需提供一个键（key） recommendations，然后将你想要推荐给这个项目的其他工程师的插件的 ID 们，全部放入到这个数组中。当他们打开这个项目，而且并没有安装这些插件时，VS Code就会给他们提示了。

VSCode 经典插件推荐
除了在 .vscode/extensions.json 文件推荐插件，如果你在使用多文件夹工作区（multi-root workspace），也可以在多文件夹工作区的配置文件里添加如下的设置：

{
    "folders": [
        {
            "path": "vscode"
        },
        {
            "path": "vscode-docs"
        }
    ],
    "extensions": {
        "recommendations": [
            "eg2.tslint",
            "dbaeumer.vscode-eslint",
            "msjsdiag.debugger-for-chrome"
        ]
    }
}