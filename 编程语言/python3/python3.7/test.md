# test





。

try except 是 Python 实现异常处理机制的核心结构



try except 语句的执行流程如下：
首先执行 try 中的代码块，如果执行过程中出现异常，系统会自动生成一个异常类型，并将该异常提交给 Python 解释器，此过程称为捕获异常。
当 Python 解释器收到异常对象时，会寻找能处理该异常对象的 except 块，如果找到合适的 except 块，则把该异常对象交给该 except 块处理，这个过程被称为处理异常。如果 Python 解释器找不到处理异常的 except 块，则程序运行终止，Python 解释器也将退出。

事实上，不管程序代码块是否处于 try 块中，甚至包括 except 块中的代码，只要执行该代码块时出现了异常，系统都会自动生成对应类型的异常。但是，如果此段程序没有用 try 包裹，又或者没有为该异常配置处理它的 except 块，则 Python 解释器将无法处理，程序就会停止运行；反之，如果程序发生的异常经 try 捕获并由 except 处理完成，则程序可以继续执行。

第 8 行代码只有 except 关键字，并未指定具体要捕获的异常类型，这种省略异常类的 except 语句也是合法的，它表示可捕获所有类型的异常，一般会作为异常捕获的最后一个 except 块。

注意，对于可以接收任何异常的 except 来说，其后可以跟 Exception，也可以不跟任何参数，但表示的含义都是一样的。

其实，每种异常类型都提供了如下几个属性和方法，通过调用它们，就可以获取当前处理异常类型的相关信息：
args：返回异常的错误编号和描述字符串；
str(e)：返回异常信息，但不包括异常信息的类型；
repr(e)：返回较全的异常信息，包括异常信息的类型。


注意，和 else 语句不同，finally 只要求和 try 搭配使用，而至于该结构中是否包含 except 以及 else，对于 finally 不是必须的（else 必须和 try except 搭配使用）。

finally 语句的功能是：无论 try 块是否发生异常，最终都要进入 finally 语句，并执行其中的代码块。

另外在通常情况下，不要在 finally 块中使用如 return 或 raise 等导致方法中止的语句（raise 语句将在后面介绍），一旦在 finally 块中使用了 return 或 raise 语句，将会导致 try 块、except 块中的 return、raise 语句失效。

如果 Python 程序在执行 try 块、except 块包含有 return 或 raise 语句，则 Python 解释器执行到该语句时，会先去查找 finally 块，如果没有 finally 块，程序才会立即执行 return 或 raise 语句；反之，如果找到 finally 块，系统立即开始执行 finally 块，只有当 finally 块执行完成后，系统才会再次跳回来执行 try 块、except 块里的 return 或 raise 语句。


同样，如果 Python 程序在执行 try 块、except 块包含有 return 或 raise 语句，则 Python 解释器执行到该语句时，会先去查找 finally 块，如果没有 finally 块，程序才会立即执行 return 或 raise 语句；反之，如果找到 finally 块，系统立即开始执行 finally 块，只有当 finally 块执行完成后，系统才会再次跳回来执行 try 块、except 块里的 return 或 raise 语句。

但是，如果在 finally 块里也使用了 return 或 raise 等导致方法中止的语句，finally 块己经中止了方法，系统将不会跳回去执行 try 块、except 块里的任何代码。
```python
def test():
    try:
        # 因为finally块中包含了return语句
        # 所以下面的return语句失去作用
        return True
    finally:
        return False
print(test())
```

raise [exceptionName [(reason)]]

也就是说，raise 语句有如下三种常用的用法：
raise：单独一个 raise。该语句引发当前上下文中捕获的异常（比如在 except 块中），或默认引发 RuntimeError 异常。
raise 异常类名称：raise 后带一个异常类名称，表示引发执行类型的异常。
raise 异常类名称(描述信息)：在引发指定类型的异常的同时，附带异常的描述信息。