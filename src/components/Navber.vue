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

        <li class="navbar-item user-item" @mouseover="showDropdown" @mouseleave="hideDropdown">
          <router-link to="/login" @click="hideNavbarOnLogin">
            <img class="user-img" src="@/assets/images/avtar.png" alt="">
          </router-link>
          <ul class="dropdown-menu" :class="{ 'show': isDropdownVisible }">
            <li class="navbar-item" v-if="isLoggedIn">
              <RouterLink to="/profile">个人资料</RouterLink>
            </li>
            <li class="navbar-item" v-if="!isLoggedIn">
              <RouterLink to="/login">登录</RouterLink>
            </li>
            <li class="navbar-item" v-if="isLoggedIn">
              <a href="#" @click.prevent="logout">退出</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>
 
<script lang="ts" setup name='Navbar'>
import { RouterLink,useRouter,useRoute } from 'vue-router';
import { ref, onMounted ,computed} from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const showNavbar = ref(false);
const route = useRoute();
const router = useRouter();
const logout = () => {
    store.dispatch('logout');
    router.push('/login')
};
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
const isDropdownVisible = ref(false);
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

const showDropdown = () => {
  isDropdownVisible.value = true;
  if (hideTimeout !== null) {
    clearTimeout(hideTimeout);
  }
};

const hideDropdown = () => {
  if (hideTimeout !== null) {
    clearTimeout(hideTimeout);
  }
  hideTimeout = setTimeout(() => {
    isDropdownVisible.value = false;
  }, 300); // 延迟 300 毫秒后隐藏下拉菜单
};

const hideNavbarOnLogin = () => {
  // 这里可以添加隐藏导航栏的逻辑
  console.log('Hide navbar on login');
};
</script>
 
<style>
.navbar {
  background-color: #f9fcfc;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* 底部阴影效果 */
  border-bottom: 2px solid transparent; /* 透明底边 */
}

.navbar-list {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.navbar-item {
  display: flex;
  margin: 0 15px;
  align-items: center;
}

.navbar-item a {
  color: #010906; /* 改为白色以提高可读性 */
  text-decoration: none;
  font-size: 1.0em;
  transition: color 0.3s;
}

.navbar-item a:hover {
  color: #ffcc00;
}

/* 为包含用户图片的 li 元素添加样式 */
.user-item {
  margin-left: auto; /* 将这个元素推到右边 */
  display: flex;
  align-items: center; /* 垂直居中对齐 */
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
  top: 100%; /* 下拉菜单位于主导航项下方 */
  right: 0;
  background-color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  min-width: 160px; /* 设置最小宽度 */
  z-index: 1001; /* 确保下拉菜单在导航栏上方 */
  padding: 0.5rem 0; /* 内边距 */
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

.navbar-item:hover .dropdown-menu {
  display: block; /* 鼠标悬停时显示下拉菜单 */
}

/* 下拉菜单内容块状排列 */
.dropdown-column {
  display: block; /* 块级元素 */
  margin: 0 1rem; /* 左右边距 */
}

.dropdown-column h3 {
  color: #ffcc00;
  margin-bottom: 0.5rem;
}

.dropdown-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-column li {
  margin-bottom: 0.5rem;
}

.dropdown-column a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.dropdown-column a:hover {
  color: #ffcc00;
}

</style>