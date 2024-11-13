<template>
    <div class="Navber">
    <nav class="navber">
        <h1></h1>
        <ul class="navbar-list">
            <li class="navbar-item">
                <router-link to="/">首页</router-link>
              </li>
              <li class="navbar-item">
                <router-link to="/products">商品</router-link>
              </li>
              <li class="navbar-item">
                <router-link to="/about">关于我们</router-link>
              </li>
              <!-- <li class="navbar-item">
                <router-link to="">联系我们</router-link>
              </li> -->
        </ul>
    </nav>
</div>
</template>
<script lang="ts" setup name='Navber'>
import {RouterLink,RouterView}from 'vue-router'
</script>
<style scoped>
.navbar {
    background-color: #333;
    color: #000; /* 文字颜色设置为黑色 */
    padding: 1rem 0;
    position: fixed; /* 固定在顶部 */
    top: 0;
    left: 0;
    width: 100%; /* 宽度占满整个屏幕 */
    z-index: 1000; /* 确保导航栏在其他内容之上 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* 添加阴影 */
    border-bottom: 2px solid #ffcc00; /* 添加底部边框 */
  }
  
  .navbar-list {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center; /* 垂直居中对齐 */
    height: 100%; /* 使列表项垂直居中 */
  }
  
  .navbar-item {
    margin: 0 15px;
  }
  
  .navbar-item a {
    color: #000; /* 文字颜色设置为黑色 */
    text-decoration: none;
    font-size: 1.1em;
    transition: color 0.3s; /* 添加颜色过渡效果 */
  }
  
  .navbar-item a:hover {
    color: #ffcc00; /* 鼠标悬停时的颜色 */
  }
</style>