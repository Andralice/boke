<template>
  <div v-if="showNavbar" class="navbar">
    <nav>
      <ul class="navbar-list">
        <li class="navbar-item">
          <router-link to="/index">仓库信息概览</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/products">仓库管理</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/about">辅助管理</router-link>
        </li>

        <li class="navbar-item user-item" @mouseover="showDropdown" @mouseleave="hideDropdown">
          <router-link to="/login" @click.prevent="hideNavbarOnLogin">
            <img class="user-img" src="@/assets/images/avtar.png" alt="">
          </router-link>
          <ul class="dropdown-menu" :class="{ 'show': isDropdownVisible }">
            <li class="navbar-item" v-if="isLoggedIn">
              <router-link to="/PersonCenter">个人资料</router-link>
            </li>
            <li class="navbar-item" v-if="!isLoggedIn">
              <router-link to="/login">登录</router-link>
            </li>
            <li class="navbar-item" v-if="isLoggedIn">
              <a href="#" @click.prevent="logout">退出</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
  <router-view></router-view>
</template>

<script lang="ts" setup name='App'>
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const showNavbar = ref(false);
const route = useRoute();
const router = useRouter();

const logout = () => {
  store.dispatch('logout');
  router.push('/login');
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

// 控制下拉菜单的显示和隐藏
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

<style scoped>
.navbar {
  background-color: #f9fcfc;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* 调整高度以便内容完全显示 */
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
  height: 100%; /* 确保列表占满整个导航栏高度 */
  align-items: center; /* 垂直居中对齐 */
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
  top: 100%; /* 下拉菜单位于主导航项下方 */
  right: 0; /* 距离右侧边框0px */
  background-color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  min-width: max-content; /* 根据内容自动调整宽度 */
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



