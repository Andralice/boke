# css

## 导航栏css

```css
.navbar {
  background-color: #333; /* 背景颜色为深灰色 */
  padding: 1rem 0; /* 上下内边距为 1rem，左右为 0 */
  position: fixed; /* 固定定位 */
  top: 0; /* 距离顶部 0 像素 */
  left: 0; /* 距离左边 0 像素 */
  width: 100%; /* 宽度为 100% */
  height: 30px; /* 高度为 30 像素 */
  z-index: 1000; /* 层叠顺序，确保导航栏在其他内容之上 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* 底部阴影效果 */
  border-bottom: 2px solid transparent; /* 透明底边 */
}
```

```css
.navbar-list {
  list-style: none; /* 移除默认列表样式 */
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中对齐 */
  padding: 0; /* 移除默认内边距 */
  margin: 0; /* 移除默认外边距 */
}
```

```css
.navbar-item {
  margin: 0 15px; /* 左右外边距为 15px */
}
```

```css
.navbar-item a {
  color: #fff; /* 文字颜色为白色 */
  text-decoration: none; /* 移除默认下划线 */
  font-size: 1.1em; /* 字体大小为 1.1em */
  transition: color 0.3s; /* 颜色变化过渡效果 */
}
```

```css
.navbar-item a:hover {
  color: #ffcc00; /* 鼠标悬停时文字颜色变为黄色 */
}
```

```css
.user-item {
  margin-left: auto; /* 将这个元素推到右边 */
}
```

```css
.user-img {
  width: 40%; /* 图片宽度为父元素的 40% */
  display: inline-block; /* 确保图片是内联元素 */
  vertical-align: middle; /* 垂直对齐方式为中间 */
}
```
创建一个专门的 style 文件夹来存放样式是一个很好的实践，有助于保持项目的结构清晰和维护性。以下是如何在 Vue.js 项目中实现这一点的详细步骤：

1. 创建 style 文件夹
首先，在你的 Vue 项目根目录下创建一个名为 style 的文件夹。你可以在其中存放全局样式文件、组件特定样式文件等。

深色版本
your-vue-project/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── store/
│   └── ...
├── style/
│   ├── global.css
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── ...
├── package.json
└── ...
2. 全局样式文件
在 style 文件夹中创建一个 global.css 文件，用于定义全局样式。例如：

css
深色版本
/* style/global.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  width: 80%;
  margin: 0 auto;
}
3. 引入全局样式文件
在 src/main.js 或 src/main.ts 中引入这个全局样式文件，使其在整个项目中生效：

javascript
深色版本
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import './style/global.css'; // 引入全局样式

createApp(App).mount('#app');
4. 使用预处理器（可选）
如果你使用 SCSS、LESS 等预处理器，可以在 style 文件夹中创建相应的文件，并在项目中配置它们。例如，创建 _variables.scss 和 _mixins.scss 文件：

scss
深色版本
/* style/_variables.scss */
$primary-color: #3498db;
$secondary-color: #2ecc71;

/* style/_mixins.scss */
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}
然后在其他样式文件中导入这些部分：

scss
深色版本
/* style/global.scss */
@import 'variables';
@import 'mixins';

body {
  background-color: $primary-color;
  @include center;
}
在 main.js 中引入 .scss 文件：

javascript
深色版本
import './style/global.scss';
5. 组件特定样式
对于每个组件，你仍然可以在其 <style> 标签中定义局部样式。为了更好地组织代码，你可以将每个组件的样式文件单独放在 style/components/ 文件夹中，并通过 @import 引入。

例如，假设你有一个 Header 组件：

深色版本
style/
├── components/
│   └── Header.scss
在 Header.scss 中定义样式：

scss
深色版本
/* style/components/Header.scss */
.header {
  background-color: #333;
  color: white;
  padding: 10px;
}
在 Header.vue 组件中引入该样式文件：

vue
深色版本
<template>
  <header class="header">
    <!-- 组件内容 -->
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped lang="scss">
@import '../../style/components/Header.scss';
</style>
6. 配置 Webpack（如果需要）
如果你使用的是 Vue CLI，通常不需要额外配置 Webpack 来处理 CSS 和预处理器。但如果你有特殊需求或自定义配置，可以编辑 vue.config.js 文件进行相关配置。

例如，添加对 SCSS 的支持：

javascript
深色版本
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/style/_variables.scss";`
      }
    }
  }
};
总结
通过创建一个 style 文件夹并合理组织全局和局部样式文件，可以使你的 Vue 项目更加整洁和易于维护。以下是主要步骤：

创建 style 文件夹：存放全局和局部样式文件。
定义全局样式：在 style/global.css 或 style/global.scss 中定义全局样式，并在 main.js 中引入。
使用预处理器：如果有需要，可以使用 SCSS、LESS 等预处理器，并在 style 文件夹中管理变量、混合等。
组件特定样式：为每个组件创建单独的样式文件，并通过 @import 引入到组件的 <style> 标签中。
配置 Webpack（可选）：根据需要配置 Webpack 处理样式文件。
这样组织项目结构不仅提高了代码的可读性和可维护性，还能让你更方便地管理和复用样式。


