# 1. React

## 1. jsx

## 1. 组件

### 1. 目标

- [x] 能够使用函数创建组件

- [x] 能够使用 class 创建组件

- [x] 能够给 react 元素绑定事件

- [x] 能够使用 state 和 setState()

- [x] 能够处理事件中的 this 指向问题

- [x] 能够使用受控组件方式处理表单

### 2. 什么是 react 组件 ？

- 组件表示页面中的部分功能，多个组件整合在一起，实现完整的页面功能

- 组件的可复用性，独立，可组合，提高了开发效率

### 3. 如何创建 react 组件 ？

- 通过 <mark>函数</mark> 创建 (函数组件)(无状态组件)
  
  >  必须有返回值 ( return )
  
  >  组件名称必须大写字母开头

```js
function Num() {
  return (
  <div> Num 组件 </div>
  )
}
或者
const Num = () => <div> Num 组件 </div>

ReactDOM.render(<Num />, root)
```

- 使用 <mark>class</mark> 创建组件(类组件)(有状态组件)
  
  > 类名称必须以大写字母开头
  
  > 类组件应该继承 React.Component ，后使用父类提供的方法和属性
  
  > 类组件必须提供 render() 方法，render() 方法必须有返回值 

```js
class Num extends React.Component {
  render() {
    return <div> Num 组件 </div>
  }
}
ReactDom.render(<Num />, root)
```

- 还可以将组件抽离为独立的 JS 文件
  
  1. 创建 Num.js
  
  2. 在 Num.js 中导入 React 
  
  3. 创建组件
  
  4. 在 Num.js 中导出该组件
  
  5. 在 index.js 中导入 Num.js 组件
  
  6. 渲染组件
  
  ```js
  // index.js
  import Num from './Num'
  // 渲染导入的 Num 组件
  ReactDOM.render(<Num />, root)
  
  //Num.js
  import React from 'react'
  class Num extends React.Component {
    render() {
      return <div> Num.js </div>
    }
  }
  // 导出 Num 组件
  export default Num
  ```

## 2. React 事件处理

### 1. 事件绑定

- 语法 on+事件名称  onClick = { () => {} }
  
  > React 采用 <mark>驼峰命名法</mark>
  
  > 当使用类组件时，方法调用使用 this.方法名
  
  ```js
  class App extends React.Component {
    numClick() {
      console.log('单击事件触发了')
    }
    render() {
      return(
        <button onClick={ this.numClick } >点击</button>
      )
    }
  }
  ```

- > 当使用函数组件时，方法调用使用 方法名
  
  ```js
  function App() {
    function numClick() {
      console.log('单击事件触发了')
    }
    return (
      <button onClick={ numClick } >点击</button>
    )    
  }
  ```

### 2. 事件对象

- 通过事件处理程序的参数获取到事件对象

- 又称( 合成事件 )

- 合成事件：兼容所有浏览器，无需担心浏览器兼容性问题
  
  ```js
  function Num(e) {
    e.preventDefault();
  }
  <a onClick={ Num } > 点击，不会跳转 </a>
  ```

### 3. 组件中 state 和 setState

- state
  
  > 组件内部的私有数据
  
  > state 的值是对象，一个组件可以有多个数据
  
  ```js
  class App extends React.Component {
    state = {
      num: 0
    }
    render() {
      return(
        <div> num : { this.state.num } </div>
      )
    }
  }
  ```

- setState
  
  > 状态是可变的
  
  > 数据驱动视图
  
  ```js
  class App extends React.Component {
    state = {
      num: 0
    }
  // 注意通过使用 => 让 this.setState 的 this 指向组件才能有 setState 方法
    numAdd = () => {
      this.setState({
        num: this.state.num + 1
      })
    }
    render() {
      return(
        <div> num: { this.state.num } </div>
        <div onClick={ this.numAdd } > +1 </div>
      )
    }
  }
  ```

## 3. 表单处理

### 1. 受控组件

- input 双向数据绑定
  
  ```js
  class App extends React.Component() {
    state = {
      num: 0
    }
  changeNum = e => {
    this.setState({
      num: e.target.value
    )}
  }
  render() {
      return(
        <input type="text" value={ this.state.num } 
          onChange={ this.changeNum }
        ></input>
      )
    }
  }
  ```

## 4. 组件通信

### 1. 目标

- [x] 能够使用 props 接收数据

- [x] 能够实现父子组件之间的通信

- [x] 能够实现兄弟组件之间的通信

- [x] 能够给组件添加 props 效验

- [x] 能够说出生命周期常用的钩子函数

- [ ] 能够知道高阶组件的作用

### 2. 组件的 props

> props 用来接收传递给组件的数据

> 通过组件标签添加属性的方式

> 函数组件通过参数 props 接收数据

```js
<Num name="pink" age={18} />

function Num(props) {
  return (
    <div> 接收到的数据：{ props.name }</div>  // pink
  )
}
```

> 类组件通过 this.props 接收数据

```js
class Num extends React.Component {
  render() {
    return(
      <div> 接收到的数据：{ this.props.name } </div> // pink
    )
  }
}

<Num name="pink" age={18} />
```

### 3. 组件通讯方式

#### 1.父向子通讯

> 给子组件标签添加属性

> 子组件通过 props 接收父组件传递的数据

```js
// 父组件
class Parent extends React.Component {
  state = { lastName: 'pink' }
  render() {
    return(
      <div> 传递数据给子组件：<Child name={ this.state.lastName } /></div>
    )
  }
}
// 子组件
const Child = (props) => {
  return (<div> 子组件接收到数据：{ props.name } </div>) // pink
}
```

#### 2. 子向父通讯

> 利用回调函数，父提供回调，子调用，将传递的数据作为回调函数的参数

> 需要注意回调函数中 this 指向问题

```js
// 父组件
class Parent extends React.Component {
  getChildMsg = msg => {
    console.log('接收到子组件数据'，msg)
  }
  render() {
    return(
      <div> 子组件：<Child getMsg={ this.getChildMsg } </div> // child
    )
  }
}
// 子组件
class Child extends React.Component {
  state = { childMsg: 'child' }
  handleChild = () => {
    this.props.getMsg(this.state.childMsg)
  }
  render() {
    return(
      <button onClick={ this.handleChild } > 点击给父组件传值 </button>
    )
  }
}
```

#### 3. 兄弟通讯

> 通过 状态提升 将共享状态提升到最近的公共父组件中

> 公共父组件负责：

1. 提供共享状态

2. 提供操作共享状态的方法

> 需要通讯的子组件只需要通过 props 接收状态或操作改变状态的方法

```js
// 公共父组件
class Counter extends React.Component {
  // 提供共享状态
  state = { count: 0 }
  // 提供修改状态的方法
  onIncrement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return(
      <div>
        <Child1 count={ this.state.count }/>
        <Child2 onIncrement={ this.onIncrement }/>
      </div>
    )
  }
}
//子组件
const Child1 = (props) => {
  return(
    <h1> 计数器：{ props.count } </h1>
  )
}
const Child2 = (props) => {
  return(
    <button onClick={ () => props.onIncrement() } > 点击增加 </button>
  )    
}
```

#### 4. Context - 跨组件传递数据

> 如果两给组件嵌套多层可以使用 Context 实现组件通讯

> Context 提供两个组件 ：Provider 和 Consumer

> Provider 组件：用来提供数据

> Consumer 组件：用来消费数据

```js
// 创建 Context 得到两个组件
const { Provider, Consumer } = React.createContext()
// 嵌套组件通过 Provider 组件中的 value 属性进行数据传递
class App extends React.Component {
  render() {
    return(
      <Provider value="pink">
        <div> <Node /> </div>
      </Provider>
    )
  }
}
// 嵌套组件
const Node = props => {
  return(
    <div> <SubNode /> </div>
  )
}
// 嵌套组件
const SubNode = props => {
  return(
    <div> <Child /> </div>
  )
}
// 嵌套组件通过 Consumer 组件中回调函数的参数获取数据
const Child = props => {
  return(
    <div>
      <Consumer>{ data => <span>我是子节点 -- { data }</span> }</Consumer>
    </div>
  )
}
```

#### 5. props 深入

##### 1. children 属性

> 当前组件有子节点时 props 就有该

> children 的值可以是任意值 ( 文本，React元素，组件，函数...)

```js
const Num(props) {
  return(
    <div>
      组件的子节点：{ props.children }
    </div>  
  )
}
<Num> 子节点 </Num>
```

##### 2. rpops 效验

> 安装 prop-types 

```js
npm i prop-types 或 yarn add porp-types
```

> 导入

```js
import PropTypes from 'prop-types'
```

> 添加效验规则

```js
function App(props) {
  return(
    <div> { props.colors } </div>
  )
}
// 使用 组件名.propTypes = {} 给组件的 props 添加效验规则
App.propTypes = {
  // 约定 colors 属性为 array 类型
  colors: PropTypes.array
}
<App colors={['pink','red','blue']} />
```

> 约束规则

> 常见类型： array, bool, func, number, object, string

> 当有属性必须填写时使用 isRequired

```js
colors: PropTypes.array.isRequired
```

> 还可以定义 特定结构的对象 使用：shape({})

```js
colors: PropTypes.shape({
  // 定义对象中值的类型
  color: PropTypes.string,
  fontSize: PropTypes.number.isRequired
})
```

##### 3. props 的默认值

> 给 props 设置默认值，在未传入 props 时生效

> 如果有传 props 则覆盖默认值

```js
// 使用 组件名.defaultProps = {}
App.defaultProps = {
  colors: ['pink','red']
}
```

### 4. 组件的生命周期

#### 1. 生命周期是什么？

> 组件从被创建到挂载到页面中运行，到组件不用时卸载的过程

> 生命周期的每个阶段都有一些方法调用，这些方法就是生命周期的钩子函数

> 钩子函数：为开发人员在不同阶段操作组件提供了时机

> 注意！ 只有 类组件 才有生命周期

#### 2. 创建时

##### 1. 执行时机

> 组件创建时触发

##### 2. constructor()

> 创建组件时，最先执行

> 初始化 state
> 
> 为事件处理程序绑定 this

##### 3. render()

> 每次组件渲染都会触发

> 渲染 UI

##### 4. componentDidMount()

> 组件挂载 ( 完成DOM渲染 ) 后

> 发送网络请求
> 
> DOM 操作

#### 3. 更新时

##### 1. 执行时机

> setState()

> forceUpdata()
> 
> 强制更新

> 组件接收到新的 props 

> 任意一种变化，组件就会重新更新

##### 2. render()

> 每次组件渲染都会触发

> 渲染 UI

##### 3. componentDidUpdate

> 组件更新 ( 完成 DOM 渲染 ) 后

> 发送网络请求
> 
> DOM 操作

> 如果要 setState() 必须放在一个 if 条件中

```js
// prevProps 参数是更新前的 props 值用来对比 props 是否有变化
componentDidUpdate(prevProps) {
  if(prevProps.num !== this.num) {
    this.setState({})
  }
}
```

#### 4. 卸载时

##### 1. 执行时机

> 组件从页面中消失

##### 2. componentWillUnmount

> 执行清理工作 比如：清理定时器

### 



# React 进阶事件指南

## jsx

### jsx 转换器

## 组件通信

1. props 传递

2. ref 凡是、、、

## 
