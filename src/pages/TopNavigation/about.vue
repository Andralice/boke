<template>
</template>
<script lang="ts" setup name='about'>
</script>
<style>
.dropdown-menu {
    display: none; /* 默认隐藏下拉菜单 */
    position: absolute;
    top: 100%; /* 下拉菜单位于主导航项下方 */
    left: 0; /* 左对齐 */
    background-color: #333;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    min-width: 160px; /* 设置最小宽度 */
    z-index: 1001; /* 确保下拉菜单在导航栏上方 */
  }
  
  .dropdown-menu.show {
    display: block; /* 显示下拉菜单 */
  }
  
  .dropdown-menu li {
    list-style: none;
  }
  
  .dropdown-menu a {
    color: #fff;
    text-decoration: none;
    display: block;
    padding: 0.5rem 1rem;
  }
  
  .dropdown-menu a:hover {
    background-color: #555; /* 悬停时背景颜色变化 */
  }
  
  .user-item {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
  }
  
  .user-img {
    width: 40px; /* 固定宽度 */
    height: 40px; /* 固定高度 */
    border-radius: 50%; /* 圆形头像 */
    display: inline-block;
    vertical-align: middle;
  }</style>