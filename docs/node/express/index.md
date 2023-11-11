
# Express

## 第三方模块

## 目标

- [ ] 能够使用 express .static 快速托管静态资源

- [ ] 能够使用 express 路由精简项目结构

- [ ] 能够使用常用的 express 中间件

- [ ] 能够使用 express 创建 API 接口

- [ ] 能够在 express 中启用 cors 跨域资源共享

## express is what?

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

## 监听请求

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

## 托管静态资源

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

## nodemon

> 监听项目文件的变动，nodemon 会自动重启项目

> 安装

```js
npm i -g nodemon
```

> 启动 nodemon

```js
nodemon app.js
```

## express 路由

> app.请求方式( '请求路径', (请求对象，响应对象) => { '回调函数' } )

> 请求类型和请求的 URL 同时匹配成功，才会调用对应的处理函数

## 模块化路由

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

# express 中间件

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
