<template>
    <div class="container">
      <div class="sidebar">
        <h2>导航菜单</h2>
        <ul>
          <li><a href="#overview">概览</a></li>
          <li><a href="#inventory">库存管理</a></li>
          <li><a href="#orders">转移申请</a></li>
          <li><a href="#suppliers">供应商管理</a></li>
          <li><a href="#reports">报表分析</a></li>
          <li class=" user-item" @mouseover="showDropdown" @mouseleave="hideDropdown">
            <router-link to="/login" @click.prevent="hideNavbarOnLogin">
              <img class="user-img" src="@/assets/images/avatar.jpg" alt="">
            </router-link>
            <ul class="dropdown-menu" :class="{ 'show': isDropdownVisible }">
              <li  v-if="isLoggedIn">
                <router-link to="/PersonCenter">个人资料</router-link>
              </li>
              <li  v-if="!isLoggedIn">
                <router-link to="/login">登录</router-link>
              </li>   
              <li  v-if="isLoggedIn">
                <a href="#" @click.prevent="logout">退出</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 920px;
}

.sidebar {
  width: 250px;
  padding-left: 20px; 

  background-color: #f4f4f4;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 920px;
}

.sidebar h2 {
  margin-top: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  flex-grow: 1;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  text-decoration: none;
  color: #333;
}

.content {
  display: flex;
  flex-grow: 1;
  height: 100%;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.notifications {
  width: 300px;
  background-color: #f8f9fa;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 920px;
}

.notifications h3 {
  padding: 10px;
}

.notifications ul {
  list-style-type: none;
  padding: 0;
  flex-grow: 1;
}

.notifications li {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.notification-icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.region {
  padding: 20px;
  border: 1px solid #ddd;
}

.row1 .region1 {
  flex: 0.4;
  height: 260px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
}

.row1 .region1 .header,
.row1 .region2 .header,
.row2 .region3 .header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.row1 .region1 .header .icon,
.row1 .region2 .header .icon,
.row2 .region3 .header .icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

.row1 .region1 .header h3,
.row1 .region2 .header h3,
.row2 .region3 .header h3 {
  margin: 0;
}

.row1 .region1 .data-rows {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 50px); /* 减去header的高度 */
}

.row1 .region1 .data-row {
  display: flex;
  justify-content: space-between;
}

.row1 .region1 .data-box {
  position: relative;
  flex: 0.48;
  height: 80px;
  background-color: #fff;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: flex-start; /* 左对齐 */
  padding: 10px; /* 添加内边距以便内容不贴边 */
}

.row1 .region1 .data-box .box-title,
.row1 .region1 .data-box .box-number,
.row1 .region1 .data-box .box-description {
  text-align: center;
  padding: 3px;
  font-size: 18px;
}

.row1 .region1 .data-box::before {
  content: attr(data-badge);
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 20px;
  background-color: inherit;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  line-height: 15px;
  text-align: center;
}

.row1 .region1 .data-box.blue {
  background-color: #fff;
}

.row1 .region1 .data-box.blue::before {
  background-color: blue;
}

.row1 .region1 .data-box.cyan {
  background-color: #fff;
}

.row1 .region1 .data-box.cyan::before {
  background-color: cyan;
}

.row1 .region1 .data-box.green {
  background-color: #fff;
}

.row1 .region1 .data-box.green::before {
  background-color: green;
}

.row1 .region1 .data-box.light-green {
  background-color: #fff;
}

.row1 .region1 .data-box.light-green::before {
  background-color: lightgreen;
}

.row1 .region2 {
  flex: 0.6;
  height: 260px;
  background-color: #dee2e6;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 调整为左对齐 */
}

.row1 .region2 .header {
  align-self: flex-start; /* 确保标题在左上角 */
}

.row1 .region2 .box-container {
  display: flex;
  gap: 15px; /* 设置间距为15px */
  justify-content: center; /* 水平居中 */
  margin-top: 10px;
}

.row1 .region2 .small-box {
  width: 150px;
  height: 180px;
  background-color: #fff;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.row1 .region2 .small-box .box-title {
  font-size: 24px;
  margin-bottom: 5px;
}

.row1 .region2 .small-box .box-image {
  width: 80px;
  height: 80px;
}

.row2 .region3 {
  flex: 0.6;
  height: 520px;
  flex-grow: 1;
  background-color: #ced4da;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px; /* 设置容器高度为350px */
}

.icon {
  width: 24px;
  height: 24px;
}
.user-item {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  position: relative; /* 设置相对定位以便绝对定位下拉菜单 */
}

.user-img {
  width: 40px; /* 固定宽度 */
  height: 40px; /* 固定高度 */
  border-radius: 50%; /* 圆形头像 */
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px; /* 图片和文字之间的间距 */
}

.dropdown-menu {
  display: none; /* 默认隐藏下拉菜单 */
  position: absolute;
  bottom: 100%; /* 出现在父元素上方 */
  left: 0; /* 对齐到父元素左侧 */
  background-color: #333;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3); /* 调整阴影方向 */
  min-width: max-content; /* 根据内容自动调整宽度 */
  max-width: 200px; /* 设置最大宽度以防止内容溢出 */
  z-index: 1001; /* 确保下拉菜单在导航栏上方 */
  padding: 0.5rem 0; /* 内边距 */
}

.dropdown-menu.show {
  display: block; /* 显示下拉菜单 */
}

.dropdown-menu li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu a {
  color: #fff;
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
}

.dropdown-menu a:hover {
  background-color: #555; /* 悬停时背景颜色变化 */
}
</style>