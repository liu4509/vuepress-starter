# 1. node.js是什么

> 简单的说 Node.js 就是运行在服务端的 JavaScript。

>Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。

>Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好

# 2. node.js 内置模块

## 1. fs 模块

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

## 2. path 路径模块

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

## 3. http 模块

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

# 3. 自定义模块

## 1. 加载用户自定义模块

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

# 4. 第三方模块

## 1. Express

### 1.目标

- [ ] 能够使用 express .static 快速托管静态资源

- [ ] 能够使用 express 路由精简项目结构

- [ ] 能够使用常用的 express 中间件

- [ ] 能够使用 express 创建 API 接口

- [ ] 能够在 express 中启用 cors 跨域资源共享

### 2. express 是什么

> Express 提供了快速创建 Web 服务器的便携方法

> 最常见的两种服务器 web 网站服务器 / API 接口服务器

> 安装

```js
npm i express@4.17.1
```

> 创建基本的 web 服务器

```js
// 导入 express
const express = require('express')
// 创建 web 服务器
const app = express()
// 调用 app.listen(端口号，成功的回调函数) ， 启动服务器
app.listen(80, () => {})
```

#### 1. 监听请求

> 监听 GET 请求

```js
app.get('请求地址', (请求对象, 响应对象) => { 处理函数 })
```

> 监听 POST 请求

```js
app.post('请求地址', (请求对象, 响应对象) => { 处理函数 })
```

> 把内容响应给客户端 res.send()

> 获取 URL 中携带的查询参数 req.query()

```js
app.get('/', (req, res) => {
  res.send('请求成功')
 // 浏览器的地址是 127.0.0.1/?name=lzb&age=18
 console.log(req.query()) // { "name": "lzb", "age": "18"}
})
```

> 获取动态参数 req.params

```js
// 这里的 :id 就是一个动态参数
app.get('/user/:id', (req, res) => {
 // 浏览器的地址是 127.0.0.1/user/1
 console.log(req.params()) // { id: '1'}
})
```

#### 2. 托管静态资源

> 通过 express.static() 可以方便的创建一个静态资源服务器

> 需要提供静态资源的访问路径

> 如果有创建多个静态资源服务器，按执行顺序查找资源

```js
// public
// // index.html
// // index.css
// // index.js
app.use(express.static('public'))
// 通过 127.0.00.1/index.html 就可以访问 不需要加 public 路径
```

> 挂载路径前缀

```js
app.use('/public', express.static('public'))
// 则需要加 public 路径 通过 127.0.00.1/public/index.html 就可以访问 
```

#### 3. nodemon

> 监听项目文件的变动，nodemon 会自动重启项目

> 安装

```js
npm i -g nodemon
```

> 启动 nodemon

```js
nodemon app.js
```

#### 4. express 路由

> app.请求方式( '请求路径', (请求对象，响应对象) => { '回调函数' } )

> 请求类型和请求的 URL 同时匹配成功，才会调用对应的处理函数

##### 1. 模块化路由

> 方便对路由进行模块化的管理, 将路由抽离为单独的模块

> 创建路由模块对应的 .js 文件 

```js
+ userRouter.js
```

> 调用 express.Router() 创建路由对象

```js
const express = require('express')
const router = express.Router()
```

> 向路由对象上挂载具体的路由

```js
router.get('user/list', (req, res) => {
  res.send('Get user list')
})
router.post('user/add', (req, res) => {
  res.send('Add new user')
})
```

> 使用 module.exports 向外共享路由对象

```js
module.exports = router
```

> 使用 app.use() 注册路由模块

```js
const userRouter = require('./userRouter')
app.use(userRouter)
// 可以为路由模块添加统一前缀
app.use('/api', userRouter)
// 通过 127.0.0.1/api/user/list 
```

#### 5. express 中间件

> next 函数是实现多个中间件连续调用的关键,将流转关系转交给下一个中间件或路由

```js
app.get('/', (req, res, next) => {
  next()
})
```

> 全局中间件

```js
app.use((req, res, next) => {
  next()
})
```

> 局部中间件

```js
// 中间件
const mw = (req, res, next) => {
  next()
}
// 路由
app.get('/', mw, (req, res) => {})
// 只在当前路由生效的中间件 通过当路由的第二个参数或任意多个参数挂载
app.get('/', mw, mw1, mw2, (req, res) => {})
// 俩种方式是一样的
app.get('/', [mw, mw1, mw2], (req, res) => {})
```

> 一定要在路由之前注册中间件
> 
> 执行完中间件的业务之后，必须调用 next() 必须写在业务代码后面

> 连续调用多个中间件时，多个中间件之间是共享 req 和 res 对象的
