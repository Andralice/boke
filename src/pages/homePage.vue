<template>
  <div class="container">
    <div class="sidebar">
      <div class="user-item-img">
        <div class="user-item" @mouseover="showDropdown" @mouseleave="hideDropdown">
          <router-link to="/login" @click.prevent="hideNavbarOnLogin">
            <img class="user-img" src="@/assets/images/avatar.jpg" alt="">
          </router-link>
          <div :class="['user-dropdown-menu', { 'show': isDropdownVisible }]" ref="dropdownMenu">
            <ul>
              <li >
                <router-link to="/PersonCenter">个人资料</router-link>
              </li>
              <li v-if="!isLoggedIn">
                <router-link to="/login">登录</router-link>
              </li>
              <li v-if="isLoggedIn">
                <a href="#" @click.prevent="logout">退出</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h2>食品仓库管理系统</h2>
      <ul class="nav-links">
        <li>
          <router-link to="/home_index">
            <el-icon class="icon">
              <HomeFilled />
            </el-icon> 概览
          </router-link>
        </li>
        <li :style="isInventoryDropdownVisible ? { marginTop: inventoryDropdownHeight + 'px' } : {}">
          <router-link to="/outStash">
            <el-icon class="icon">
              <Box />
            </el-icon> 转移申请
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <el-icon class="icon">
              <Histogram />
            </el-icon> 报表分析
          </router-link>
        </li>

        <li>
          <router-link to="/createStash">
            <el-icon class="icon">
              <Plus />
            </el-icon> 添加仓库
          </router-link>
        </li>
        <li>
          <router-link to="/showAllStash">
            <el-icon class="icon">
              <Plus />
            </el-icon> 仓库概览
          </router-link>
        </li>

        <li>
          <router-link to="/createSuppliers">
            <el-icon class="icon">
              <Plus />
            </el-icon> 添加供应商
          </router-link>
        </li>
        <li>
          <router-link to="/showALLSuppliers">
            <el-icon class="icon">
              <Plus />
            </el-icon> 供应商概览
          </router-link>
        </li>

        <li>
          <router-link to="/createProduct">
            <el-icon class="icon">
              <Plus />
            </el-icon> 添加商品
          </router-link>
        </li>
        <li>
          <router-link to="/showAllProduct">
            <el-icon class="icon">
              <Plus />
            </el-icon> 商品列表
          </router-link>
        </li>

        <li>
          <router-link to="/createInventory">
            <el-icon class="icon">
              <Plus />
            </el-icon> 添加库存
          </router-link>
        </li>
        <li>
          <router-link to="/showAllInventory">
            <el-icon class="icon">
              <Plus />
            </el-icon> 库存列表
          </router-link>
        </li>




      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup name="homePage">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute, RouterView } from 'vue-router';
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';
import {
  HomeFilled,
  Box,
  Plus,
  Document,
  Histogram
} from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';

const store = useStore();
const router = useRouter();
const route = useRoute();
// 响应式引用
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const isDropdownVisible = ref(false);
const isInventoryDropdownVisible = ref(false);
const inventoryDropdown = ref<HTMLElement | null>(null);
const inventoryDropdownHeight = ref(0);

// 定时器变量
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

// 导航方法
// const navigateTo = (path: string) => {
//   router.push(path);
// };

// 登出方法
const logout = () => {
  store.dispatch('logout');
  router.push('/login');
};

// 显示下拉菜单
const showDropdown = () => {
  isDropdownVisible.value = true;
  if (hideTimeout !== null) {
    clearTimeout(hideTimeout);
  }
};

// 隐藏下拉菜单
const hideDropdown = () => {
  if (hideTimeout !== null) {
    clearTimeout(hideTimeout);
  }
  hideTimeout = setTimeout(() => {
    isDropdownVisible.value = false;
  }, 300); // 延迟 300 毫秒后隐藏下拉菜单
};

// 切换库存下拉菜单
const toggleInventoryDropdown = () => {
  isInventoryDropdownVisible.value = !isInventoryDropdownVisible.value;

  nextTick(() => {
    if (isInventoryDropdownVisible.value && inventoryDropdown.value) {
      inventoryDropdownHeight.value = inventoryDropdown.value.offsetHeight;
    } else {
      inventoryDropdownHeight.value = 0;
    }
  });
};

// 隐藏导航栏（登录时）
const hideNavbarOnLogin = () => {
  console.log('Hide navbar on login');
  // 这里可以添加更多的逻辑来隐藏导航栏
};

// 生命周期钩子
onMounted(() => {
  // 初始化逻辑（如果需要）
});

onUnmounted(() => {
  if (hideTimeout !== null) {
    clearTimeout(hideTimeout);
  }
});
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  /* height: 100vh; */
}

.sidebar {
  width: 222px;
  background-color: #344058;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  color: #ecf0f1;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column; /* 使用 Flexbox 布局 */
}

.sidebar h2 {
  margin-top: 20px;
  font-size: 1.2em;
  color: #ecf0f1;
  text-align: left;
  padding: 10px 20px;
  background-color: #344058;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px; /* 使用 gap 属性设置间距 */
}

.sidebar li {
  height: 40px;
  background-color: #344058;
  display: flex;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative; /* 确保伪元素正确位置 */
}

.sidebar li:before {
  content: "";
  width: 4px;
  height: 100%;
  background-color: transparent;
  position: absolute;
  left: 0;
  top: 0;
  transition: background-color 0.3s ease;
}

/* 鼠标悬停时改变背景色并放大字体 */
.sidebar li:hover > a {
  transform: scale(1.2); /* 字体放大 */
  color: #fff; /* 可选：更改颜色 */
}
.sidebar span:hover {
  transform: scale(1.2);
  /* 字体放大 */
  color: #fff;
  /* 可选：更改颜色 */
}
.sidebar span {
  padding-right: 50px;
  transition: transform 0.3s ease, color 0.3s ease;
  /* 添加变换过渡 */
  transform-origin: left center;
  /* 控制缩放中心 */
}

.sidebar li:hover:before {
  background-color: #2980b9; /* 改变标识颜色 */
}

.sidebar a {
  text-decoration: none;
  color: #ecf0f1;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease, color 0.3s ease; /* 添加变换过渡 */
  transform-origin: left center; /* 控制缩放中心 */
}

.sidebar i {
  margin-right: 10px;
  font-size: 1.2em;
}

.sidebar .active {
  background-color: #2a1614;
}

.sidebar .active a {
  color: #fff;
}

.dropdown-menu {
  display: none;
  position: absolute; /* 绝对定位 */
  background-color: #22303d;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 222px; /* 与侧边栏宽度一致 */
  z-index: 1001;
  margin: 0;
  padding: 0.5rem 0;
  left: 0; /* 从父元素的左侧开始 */
  top: 100%; /* 从父元素的底部开始 */
  gap: 5px; /* 设置子导航菜单项之间的间距 */
}

.dropdown-menu.show {
  display: block;
}

.dropdown-menu li {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative; /* 确保伪元素正确位置 */
}

.dropdown-menu li:before {
  content: "";
  width: 4px;
  height: 100%;
  background-color: transparent;
  position: absolute;
  left: 0;
  top: 0;
  transition: background-color 0.3s ease;
}

.dropdown-menu a {
  color: #ecf0f1;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  padding-left: 1.5rem;
  transition: transform 0.3s ease, color 0.3s ease; /* 添加变换过渡 */
  transform-origin: left center; /* 控制缩放中心 */
}

/* 悬停时分别对每个子导航项进行缩放和标识变化 */
.dropdown-menu li:hover > a {
  transform: scale(1.2); /* 字体放大 */
  color: #fff; /* 可选：更改颜色 */
}

.dropdown-menu li:hover:before {
  background-color: #2980b9; /* 改变标识颜色 */
}

.content {
  width: 95%;
  padding-left: 250px;
  background-color: #fff;
  box-sizing: border-box;
}

.inventory-dropdown-menu {
  position: static;
  width: 100%;
  background-color: #f4f4f4;
  box-shadow: none;
  margin-top: 10px;
  gap: 5px; /* 设置库存管理子导航菜单项之间的间距 */
}

.inventory-dropdown-menu li {
  margin: 0; /* 移除默认的外边距 */
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inventory-dropdown-menu a {
  color: #333;
}

.user-item-img {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #4a69bd;
}

.user-item {
  position: relative;
  display: flex;
  align-items: center;
}

.user-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.user-dropdown-menu {
  display: none;
  position: absolute;
  background-color: #34495e;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 100px;
  z-index: 1001;
  padding: 0.5rem 0;
  right: 10;
  top: 50px;
  gap: 5px; /* 设置用户下拉菜单项之间的间距 */
}

.user-dropdown-menu.show {
  display: block;
}

.user-dropdown-menu li {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-dropdown-menu a {
  color: #ecf0f1;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  transition: background-color 0.3s;
}

.user-dropdown-menu a:hover {
  background-color: #2980b9;
}
</style>
