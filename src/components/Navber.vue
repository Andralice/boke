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

        <li class="navbar-item user-item">
          <router-link to="/login" @click.native="hideNavbarOnLogin">
            <img class="user-img" src="@/assets/images/avtar.png" alt="">
          </router-link>

        </li>
      </ul>
    </nav>
  </div>
</template>
 
<script lang="ts" setup name='Navbar'>
import { RouterLink,useRouter,useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
const showNavbar = ref(false);
const route = useRoute();
const router = useRouter();
 
// 判断当前路由是否不是登录页面，并设置 showNavbar 的值
function updateNavbarVisibility() {
  showNavbar.value = route.path !== '/login';
}
 
// 在组件挂载时更新导航栏的可见性
onMounted(() => {
  updateNavbarVisibility();
});
 
// 监听路由变化以更新导航栏的可见性
router.afterEach(() => {
  updateNavbarVisibility();
});
 
// 在点击登录链接时隐藏导航栏（其实现在不需要了，因为上面的逻辑已经处理）
function hideNavbarOnLogin() {
  // 这里可以不做任何事情，因为路由变化时会自动调用 updateNavbarVisibility
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
  height: 30px;
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
/* 为包含用户图片的 li 元素添加样式 */
.user-item {
  margin-left: auto; /* 将这个元素推到右边 */
}
 
.user-img {
  /* ... 其他样式 ... */
  width: 40%;
    /* 确保图片是内联元素，以便它不会占据整行 */
    display: inline-block;
  /* 如果需要，可以添加垂直对齐方式 */
  vertical-align: middle;
}

</style>