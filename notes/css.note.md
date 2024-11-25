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



