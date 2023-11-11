# JS 设计模式

## 1. 构造器模式

需要创建多个对象，可以使用 构造器模式 避免重复的代码

```js
function Employee(uname, age) {
  this.uname = uname
  this.age = age
}
let employee1 = new Employee('pink',20)
let employee2 = new Employee('pink1')
```

## 2. 原型模式

在构造器的原型对象上添加 say 方法, 所有的实例可以通过原型链找到该方法

如果之间写在构造器里面 那每 new 一个实例就有一个新的 say() 那何不放在原型上

```js
Employee.prototype.say = function () {
  console.log(`uname:${this.uname} - age:${this.age}`);
}
let employee1 = new Employee('pink',20)
employee1.say() // uname:pink - age:20
```

通过 ES6 的 class 关键字 可以合并两个模式

此时的 say() 也是挂载在原型对象上的

```js
class Employee {
  constructor(uname, age) {
    this.uname = uname
    this.age = age
  }
  say() {
    console.log(`uname:${this.uname} - age:${this.age}`);
  }
}
let employee1 = new Employee('pink',20)
employee1.say() // uname:pink - age:20
```

## 3. 简单工厂模式

通过传入正确的参数，获取到所需要的对象

简单工厂模式只能作用于创建对象数量少，对象的创建逻辑不复杂时使用

```js
class User {
  constructor(role, pages) {
    this.role = role
    this.pages = pages
  }
// 静态方法 不需要实例化 通过 类名.方法 使用
  static UserFactory(role) {
    switch (role) {
      case "superadmin":
        return new User('superadmin', 
            ['home', 'user-manage', 'right-manage', 'news-manage'])
      case "admin":
        return new User('admin', ['home', 'user-manage', 'news-manage'])
      case "editor":
        return new User('editor', ['home', 'news-manage'])
      default:
        throw new Error('参数错误')
    }
  }
}

let user = User.UserFactory('admin')
console.log(`${user.role} - [${user.pages}]`) 
// admin - [home,user-manage,news-manage]
```

## 4. 抽象工厂模式

对比于 简单工程模式 更加的解耦， 可以管理里面的每一个类，基于基类的扩展

符合设计模式的原则 对于扩展开放 对于修改关闭 

```js
class User {
  constructor(uname, role, pages) {
    this.uname = uname
    this.role = role
    this.pages
  }
  welcome() {
    console.log(`欢迎回来：${this.uname}`);
  }
  // 抽象方法
  dataShow() {
    throw new Error('抽象方法需要被实现')
  }
}

class SuperAdmin extends User {
  constructor(uname) {
    super(uname, "superadmin", [
      "home",
      "user-manage",
      "right-manage",
      "news-manage",
    ]);
  }
  // 实现抽象方法 
  dataShow() {
    console.log('superadmin-dataShow');
  }
  // 自己的业务方法 逻辑
  addRight() {
    // 添加权限
  }
  addUser() {
    // 添加用户
  }
}

class Admin extends User {
  constructor(uname) {
    super(uname, "admin", ["home", "user-manage", "news-manage"]);
  }
  // 实现抽象方法
  dataShow() {
    console.log("admin-dataShow");
  }
  // 自己的业务方法 逻辑
  addUser() {
    // 添加用户
  }
}

class Editor extends User {
  constructor(uname) {
    super(uname, "editor", ["home", "news-manage"]);
  }
  // 实现抽象方法
  dataShow() {
    console.log("editor-dataShow");
  }
  // 自己的业务方法 逻辑
}
// 根据当前角色的不同 return 出该用哪个类
function getAbstractUserFactory(role) {
  switch (role) {
    case "superadmin":
      return SuperAdmin
    case "admin":
      return Admin
    case "editor":
      return Editor
    default:
      throw new Error('参数错误')
  }
}

let UserClass = getAbstractUserFactory('superadmin')

let superadmin = new UserClass('pink')
superadmin.dataShow() // superadmin-dataShow
superadmin.welcome() // 欢迎回来：pink
```

## 5. 建造者模式

当多个类里面的方法有固定相同的流程使用，可以单独把流程统一调用

建造者模式将复杂对象的构造层与其表示层互相分离，同样的构造过程可采用不同的表示

建造者模式关心的是创建对象的整个过程，甚至于创建对象的每一个细节

```js
class Navber {
  init() {
    console.log("navber-init");
  }
  getData() {
    console.log("navber-getData");
    return new Promise((res) => {
      setTimeout(() => {
        res("navber-111");
      }, 1000);
    });
  }
  render() {
    console.log("navber-render");
  }
}

class List {
  init() {
    console.log("list-init");
  }
  getData() {
    console.log("list-getData");
    return new Promise((res) => {
      setTimeout(() => {
        res('list-111')
      },1000)
    })
  }
  render() {
    console.log("list-render");
  }
}

// 正常使用
let navber = new Navber();
navber.init();
navber.getData();
navber.render();
let list = new List();
list.init();
list.getData();
list.render()
;

// 通过类统一的调用
// 还可以统一异步调用
class Creator{
  // 传入对象
  async startBuild(builder) {
    await builder.init()
    let ls = await builder.getData();
    console.log(ls);
    await builder.render();
  }
}

const op = new Creator()
op.startBuild(new Navber());
op.startBuild(new List());
```

## 6. 单例模式

保证一个类仅有一个实例，并提供一个访问该实例的全局访问点

主要解决一个全局使用的类频繁地 创建 和 销毁 ，占用内存

> ES5 的写法 闭包

```js
// 闭包就是 一个函数将带有自身变量的函数作为返回值
var Singleton = (function () {
  // 闭包需要保存的变量 
  var instance
  function User(name, age) {
    this.name = name
    this.age = age
  }
  // 返回带有父函数变量的函数 就是闭包
  return function (name, age) {
    if (!instance) {
      // 创建实例
      instance = new User(name, age)
    }
    return instance
  }
})()
let v1 = new Singleton("pink", 20);
let v2 = new Singleton("red", 25);
// 当第一次实例化后，后面的实例化将不会改变第一次的值 就是单例模式
console.log(v1 === v2); // true
console.log(`${v1.name} -- ${v1.age}`); // pink -- 20
console.log(`${v2.name} -- ${v2.age}`); // pink -- 20
```

> ES6 的写法 类 class

```js
class Singleton {
  constructor(name, age) {
    if (!Singleton.instance) {
      this.name = name
      this.age = age
      Singleton.instance = this
    }
    return Singleton.instance
  }
}

let v1 = new Singleton('red', 25)
let v2 = new Singleton("pink", 20)
console.log(v1 === v2); // true
console.log(`${v1.name} -- ${v1.age}`); // red -- 25
console.log(`${v2.name} -- ${v2.age}`); // red -- 25
```

## 7. 装饰器模式

能够很好的对已有功能进行扩展，不会更改原有的代码对其他的业务产生影响

方便在较少的改动下对功能进行扩展

```js
Function.prototype.before = function (beforeFn) {
  let _this = this;
  return function () {
    // 先进行前置函数调用
    beforeFn.apply(this, arguments);
    // 执行原来的函数
    return _this.apply(this, arguments);
  };
}
Function.prototype.after = function (afterFn) {
  let _this = this;
  return function () {
    // 先进行原来的函数调用
    let res = _this.apply(this, arguments);
    // 执行后置的函数
    afterFn.apply(this, arguments);
    return res
  };
};
// 主业务
function test() {
  console.log('1111');
}
// 如果需要在主业务前面或者后面执行一些数据处理，直接使用 before or after
let test1 = test.before(() => {
  console.log("0000");
}).after(() => {
  console.log('2222');
})
test1()
```

## 8. 适配器模式

两个类的方法不同 但是需要同时调用方法 就需要找平 选一个类为主 另一个类去适配他里面的方法

```js
class TencentMap{
  show() {
    console.log('开始渲染腾讯地图');
  }
}
class BaiduMap{
  display() {
    console.log('开始渲染百度地图');
  }
}
// 使用 TencentMap 去找平 BaiduMap 的 display 方法
class TencentAdapater extends TencentMap{
  constructor() {
    super()
  }
  // 拥有同一个方法
  display() {
    this.show()
  }
}
function renderMap(app) {
  // 现在两个类里面都有同一个 display 方法
  app.display()
}
renderMap(new TencentAdapater) // 开始渲染腾讯地图
renderMap(new BaiduMap) // 开始渲染百度地图
```
