<template>
  <div v-if="showNavbar" class="navbar">
    <nav>
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
        <li class="navbar-item">
          <router-link to="/login" @click.native="hideNavbar">登录</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
 
<script lang="ts" setup name='Navbar'>
import { RouterLink,useRouter } from 'vue-router';
import { ref } from 'vue';
const showNavbar = ref(true);
const router = useRouter();
 
function hideNavbar() {
  showNavbar.value = false;
  // 这里不需要再调用 router.push，因为 <router-link> 已经负责导航
  // 如果你需要在导航前做一些处理，可以在这里进行
}



</script>
 
<style scoped>
.navbar {
  background-color: #333;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid #ffcc00;
}
 
.navbar-list {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}
 
.navbar-item {
  margin: 0 15px;
}
 
.navbar-item a {
  color: #fff; /* 改为白色以提高可读性 */
  text-decoration: none;
  font-size: 1.1em;
  transition: color 0.3s;
}
 
.navbar-item a:hover {
  color: #ffcc00;
}
</style>