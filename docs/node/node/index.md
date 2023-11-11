# NodeJs

## NodeJs is what?

> 简单的说 Node.js 就是运行在服务端的 JavaScript。

>Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。

>Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好

## NodeJs 内置模块

## fs 模块

> fs 模块是用来操作文件的 

> 使用 fs 模块，首先需要导入

```js
const fs = require('fs')
```

> fs.readFile 方法 用来读取指定文件的内容

```js
// fs.readFile( 路径, [ 编码方式 ], 回调函数)
fs.readFile('./files/read.txt', 'utf-8', (err, dataStr) => {
  // err 读取成功为 null 失败的结果为 错误对象 
  // dataStr 成功的结果为 文件内容 失败的结果为 undefined
  // 通过判断 err 的值 获取是否成功
  if(err) {
    return console.log('读取失败'+ err.message)
  }
  console.log('读取成功' + dataStr)
})
```

> fs.writeFile 方法 用来将指定内容写入文件

```js
// fs.writeFile( 路径, 写入的内容，[ 编码方式 ], 回调函数)
fs.writeFile('./files/write.txt', 'write', 'utf-8', (err) => {
  // err 写入成功为 null 失败的结果为 错误对象 
  if(err) {
    return console.log('文件写入失败' + err.message)
  }
  console.log('文件写入成功')
})
```

> 需要注意的点 - 路径动态拼接的问题
> 
> 可以使用 __dirname 表示当前文件所处的目录

```js
// 通过字符串拼接动态路径
fs.readFile(__dirname + '/files/read.txt', 'utf-8', (err, datastr ) => {
  if(err) return console.log('读取文件失败' + err.message )
  console.log(dataStr)
})
```

## path 路径模块

> path 模块是用来处理路径的

> 使用 path 模块，首先需要导入

```js
const path = require('path')
```

> 记得前面的路径拼接吗？ 在这可以使用 path.join()

```js
// join 方法可以将多个路径片段拼接为完整的路径字符串
// 可以直接使用变量当路径
const pathStr = path.join(__dirname, './files/read.txt')
fs.readFile(path.join(__dirname, './files/read.txt'),(err) => {})
```

> 从路径获取文件名

```js
const fpath = '/a/b/c/d/index.html'
console.log(path.basename(fpath)) // index.html
console.log(path.basename(fpath, '.html')) // index
```

> 从路径获取文件名的扩展名

```js
const fpath = '/a/b/c/d/index.html'
console.log(path.extname(fpath)) // .html
```

## http 模块

> 用来创建 web 服务器的模块

> 使用 http 模块，首先需要导入

```js
const http = require('http')
```

> 建 web 服务器实例

```js
const server = http.createServer()
```

> 为服务器实例绑定 request 事件, 监听客户端的请求

> req 参数是 请求对象 
> 
> 可以访问与 客户端 相关的数据或属性
> 
> req.url 是客户端的 URL 地址
> 
> req.method 是客户端的 method 请求类型

> res 参数是 响应对象
> 
> 可以访问与 服务端 相关的数据或属性
> 
> res.setHeader 可以设置响应头
> 
> 通过 Conrent-Type 设置内容的编码方式 防止中文显示乱码的问题
> 
> res.end 可以向客户端发送指定内容，并结束这次请求的处理过程

```js
server.on('request', (req, res) => {
  const str = `你的请求地址是 ${req.url}, 请求方式是 ${req.method}`
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(str)
})
```

> 启动服务器

```js
// 80 是端口号
server.listen(8080, () => {
  console.log('server running at http://127.0.0.1:8080')
})
```

## 自定义模块

## 加载用户自定义模块

> 通过路径加载

```js
const custom = require('./custom.js') // 可以省略 .js 直接写 ./custom
```

> 模块作用域可以防止全局变量污染

> 要想引入自定义模块的方法 通过 module.exports 导出属性或方法

```js
// module.js
// 可以在 module.exports 上挂载属性
module.exports.userName = ‘lzb’
// 还可以重新指向一个全新的对象
module.exports = {
  userName: 'lzb'
}
// index.js
const module = require('./module')
console.log(module) // { userName: 'lzb32' }
```
