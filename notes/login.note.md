# login's notes

> 本笔记为vue3+js

## 主要过程

### 1. 安装依赖

首先，确保你已经安装了 Vuex 和 Vue Router（如果你需要路由管理）。

```bash
npm install vuex@next vue-router@next
```

### 2. 创建 Vuex Store

在 `src/store/index.js` 中创建 Vuex store。

#### `src/store/index.js`

```js
import { createStore } from 'vuex';

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
  },
  actions: {
    login({ commit }, credentials) {
      // 模拟登录请求
      const token = 'your-token-here'; // 假设这是从服务器获取的 token
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('setToken', null);
    },
  },
});
```

### 3. 创建 Vue 组件

创建一个登录表单组件，用于处理用户的登录和注销操作。

#### `src/components/LoginForm.vue`

```vue
<template>
  <div>
    <h1>登录表单</h1>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="username" placeholder="用户名" required />
      <input type="password" v-model="password" placeholder="密码" required />
      <button type="submit">登录</button>
    </form>
    <p v-if="isLoggedIn">已登录</p>
    <p v-else>未登录</p>
    <button @click="logout" v-if="isLoggedIn">注销</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const username = ref('');
const password = ref('');

const isLoggedIn = computed(() => store.getters.isLoggedIn);

const handleLogin = async () => {
  try {
    await store.dispatch('login', { username: username.value, password: password.value });
    username.value = '';
    password.value = '';
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const logout = () => {
  store.dispatch('logout');
};
</script>

<style scoped>
/* 添加一些样式 */
</style>
```

### 4. 设置 Vue 应用

在 `src/main.js` 中设置 Vue 应用，并引入 Vuex store。

#### `src/main.js`

```js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

createApp(App)
  .use(store)
  .mount('#app');
```

### 5. 创建主应用组件

创建一个主应用组件 `App.vue`，用于包含登录表单组件。

#### `src/App.vue`

```vue
<template>
  <div id="app">
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from './components/LoginForm.vue';
</script>

<style>
/* 添加一些全局样式 */
</style>
```

# 详细解释

## 异步函数handleLogin

这是登录处理的主要逻辑，‘login’其实是处理逻辑的url，将后边的参数传入这个逻辑，并且在登陆成功后，清空账号密码

```js
const handleLogin = async () => {
  try {
    await store.dispatch('login', { username: username.value, password: password.value });
    username.value = '';
    password.value = '';
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### 异步函数

**异步函数**是指需要等待其他任务完成的函数，js是单线程语言，一次只能执行一个任务，为避免线程阻塞，需要使用异步函数	

**异步函数**有两种写法

```js
const handleLogin = async () =>{
    
}
```

```js
async function handleLogin(){
    
}
```

第一种使用了箭头函数，参数在括号内，当参数只有一个是，括号可以省略，而第二种不可以。

第一种只能在定义之后调动，也就是

```js
const handleLogin = async() =>{};
handleLogin ();
```

而第二种没有这种限制，可以写在前边和后边。

**箭头函数**

1，箭头函数当参数只有一个时，可以省略括号

2，箭头函数的**this绑定**是定义时的作用域，而不是调用时的作用域，这在处理**回调函数**时很有用

3，箭头函数不能作**构造函数**，不能使用new关键字来**实例化对象**。

4，没有 arguments 对象：箭头函数没有自己的 **arguments**对象，但可以通过 rest 参数 **...args** 来访问参数。

**this绑定**

传统函数

```js
const obj = {
  name: 'Alice',
  greet: function() {
    setTimeout(function() {
      console.log(`Hello, ${this.name}`);
    }, 1000);
  }
};

obj.greet(); // 输出 "Hello, undefined"（非严格模式下是 "Hello, window.name"）
```

在这个例子中，`setTimeout` 回调函数是一个传统函数，它的 `this` 绑定到全局对象（在非严格模式下），因此输出 `undefined` 或 `window.name`。

箭头函数

```js
const obj = {
  name: 'Alice',
  greet: function() {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`);
    }, 1000);
  }
};

obj.greet(); // 输出 "Hello, Alice"
```

在这个例子中，`setTimeout` 回调函数是一个箭头函数，它的 `this` 继承自外层作用域，即 `obj`，因此输出 `Alice`。

> 在我个人看来，这个知识点只有在使用**this.**时才会有用

**回调函数**

回调函数（Callback Function）是一种编程模式，其中一个函数作为参数传递给另一个函数，并在适当的时候被调用。这种方式使得异步操作和事件处理变得更加灵活和高效。回调函数在多种编程语言中都有应用，但在 JavaScript 中尤为常见。

**同步回调**

```js
function sayHello(name, callback) {
  console.log(`Hello, ${name}`);
  callback();
}

function afterGreeting() {
  console.log('How are you today?');
}

sayHello('Alice', afterGreeting);
// 输出:
// Hello, Alice
// How are you today?
```

在这个例子中，`afterGreeting` 函数被作为回调函数传递给 `sayHello` 函数，并在 `sayHello` 函数执行完毕后被调用。

**异步回调**

```js
function fetchData(url, callback) {
  setTimeout(() => {
    // 模拟异步操作，如网络请求
    const data = { id: 1, name: 'Alice' };
    callback(data);
  }, 1000);
}

function handleData(data) {
  console.log(`Received data: ${JSON.stringify(data)}`);
}

fetchData('https://api.example.com/data', handleData);
// 输出:
// (1秒后) Received data: {"id":1,"name":"Alice"}
```

在这个例子中，`handleData` 函数被作为回调函数传递给 `fetchData` 函数，并在 `fetchData` 函数的异步操作完成后被调用。

**同步和异步**

同步是不需要等待其他操作完成，异步是需要等待其他操作

## 计算属性isLoggedIn 

计算属性的值会根据依赖数据的变化而变化

`store.getters.isLoggedIn` 是从 Vuex store 中获取的一个 getter。getter 是一种从 store 中派生状态的方法。在这个例子中，`isLoggedIn` getter 用于判断用户是否已登录。