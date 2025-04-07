<template>
  <div class="container">
    <!-- 主容器 -->
    <div class="sidebar" :class="{ 'collapsed': isCollapsed }">
      <!-- 用户头像和下拉菜单 -->
      <div class="user-item-img">
        <div class="user-item" @mouseover="showDropdown" @mouseleave="hideDropdown">
          <router-link to="/PersonCenter">
            <img class="user-img" src="@/assets/images/avatar.jpg" alt="User Avatar">
          </router-link>
          <div :class="['user-dropdown-menu', { 'show': isDropdownVisible }]" ref="dropdownMenu">
            <ul>
              <li>
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
      <!-- 系统标题 -->
      <h2>食品仓库管理系统</h2>
      <!-- 导航列表 -->
      <ul class="nav-list">
        <li v-for="(item, index) in menuItems" :key="index"
            class="nav-item"
            :class="{ 'active': isActive(item.route) }">
          <template v-if="item.subItems && item.subItems.length > 0">
            <a href="#" @click.prevent="toggleDropdown(index)">
              <el-icon><component :is="item.icon"></component></el-icon>
              {{ item.label }}
            </a>
            <transition name="slide">
              <ul v-if="activeDropdowns.includes(index)" class="dropdown-menu">
                <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex"
                    :class="{ 'active': isActive(subItem.route) }">
                  <router-link :to="subItem.route">{{ subItem.label }}</router-link>
                </li>
              </ul>
            </transition>
          </template>
          <template v-else>
            <router-link :to="item.route">
              <el-icon><component :is="item.icon"></component></el-icon>
              {{ item.label }}
            </router-link>
          </template>
        </li>
      </ul>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup name="homePage">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getMenuData } from './menuItems'; // 导入数据函数
import { findUser } from '@/api/user/user';
import {
  HomeFilled,
  Box,
  Plus,
  Document,
  Histogram
} from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';

// Vuex store 实例
const store = useStore();
// Vue Router 实例
const router = useRouter();
// 当前路由实例
const route = useRoute();

// 计算属性，判断用户是否已登录
const isLoggedIn = computed(() => store.getters.isLoggedIn);
// 控制用户下拉菜单显示状态
const isDropdownVisible = ref(false);
// 存储当前展开的子导航索引
const activeDropdowns = ref([]);
// 存储菜单项数据
const menuItems = ref([]);

let hideTimeout: ReturnType<typeof setTimeout> | null = null;

// 登出操作
const logout = () => {
  store.dispatch('logout');
  router.push('/login');
};

// 显示用户下拉菜单
const showDropdown = () => {
  isDropdownVisible.value = true;
  if (hideTimeout !== null) {
    clearTimeout(hideTimeout);
  }
};

// 隐藏用户下拉菜单
const hideDropdown = () => {
  if (hideTimeout !== null) {
    clearTimeout(hideTimeout);
  }
  hideTimeout = setTimeout(() => {
    isDropdownVisible.value = false;
  }, 300);
};

// 切换子导航显示状态
const toggleDropdown = (index) => {
  if (activeDropdowns.value.includes(index)) {
    activeDropdowns.value = activeDropdowns.value.filter(i => i !== index);
  } else {
    activeDropdowns.value.push(index);
  }
};

// 点击页面其他地方隐藏下拉菜单和子导航
const handleClickOutside = (event) => {
  const dropdownMenu = document.querySelector('.user-dropdown-menu.show');
  if (dropdownMenu && !dropdownMenu.contains(event.target)) {
    isDropdownVisible.value = false;
  }

  const navList = document.querySelector('.nav-list');
  if (navList && !navList.contains(event.target)) {
    activeDropdowns.value = [];
  }
};

// 检查当前路由是否匹配给定路径
const isActive = (path: string): boolean => {
  return route.path === path;
};

// 组件挂载后获取用户信息和菜单数据
onMounted(async () => {
  const userName = localStorage.getItem('userName');
  if (!userName) {
    console.error('User name not found in localStorage');
    return;
  }

  try {
    const response = await findUser({ username: userName });
    menuItems.value = getMenuData(response.result.role);
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }

  window.addEventListener('click', handleClickOutside);
});

// 组件卸载时清除定时器和事件监听器
onUnmounted(() => {
  if (hideTimeout !== null) {
    clearTimeout(hideTimeout);
  }
  window.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* 全局样式 */
body {
  font-family: Arial, sans-serif; /* 设置字体 */
  margin: 0; /* 移除默认外边距 */
  padding: 0; /* 移除外边距 */
  /* display: flex; */ /* 使用 Flexbox 布局 */
}

/* 侧边栏样式 */
.sidebar {
  width: 223px; /* 固定宽度 */
  height: 100vh; /* 占据整个视口高度 */
  background-color: #2c3e50; /* 背景颜色 */
  color: #ecf0f1; /* 文字颜色 */
  position: fixed; /* 固定位置 */
  left: 0; /* 左对齐 */
  top: 0; /* 上对齐 */
  transition: transform 0.3s ease-in-out; /* 平滑过渡效果 */
  overflow-y: auto; /* 启用垂直滚动条 */
  max-height: 100vh; /* 最大高度为视口高度 */
}
.sidebar li::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 50%;
  background-color: transparent;
  transition: background-color 0.3s;
}
.sidebar li.active::after {
  background-color: green;
}

/* 折叠状态下的侧边栏 */
.sidebar.collapsed {
  transform: translateX(-100%); /* 向左移动自身宽度 */
}

/* 导航列表样式 */
.nav-list {
  list-style-type: none; /* 移除默认列表样式 */
  padding: 22px 0; /* 内边距 */
}

/* 导航项样式 */
.nav-item {
  padding: 10px; /* 内边距 */
  border-bottom: 1px solid #5a6f84; /* 底部边框 */
  position: relative; /* 相对定位 */
}

/* 导航项链接样式 */
.nav-item a {
  text-decoration: none; /* 移除下划线 */
  color: inherit; /* 继承父元素颜色 */
  display: flex; /* 使用 Flexbox 布局 */
  align-items: flex-start; /* 垂直居中 */
  gap: 0px; /* 间距 */
}

/* 下拉菜单样式 */
.dropdown-menu {
  list-style-type: none; /* 移除默认列表样式 */
  padding: 0; /* 移除内边距 */
  margin:0; /* 移除外边距 */
  background-color: #2c3e50; /* 背景颜色 */

  z-index: 1; /* 层级 */
  width: 250px; /* 宽度 */
  overflow: hidden; /* 隐藏溢出内容 */
}

/* 下拉菜单项样式 ,第一个*/
.dropdown-menu li:first-child {
  padding-top: 18px; /* 第一个元素的上内边距 */
  padding-bottom: 5px; /* 第一个元素的下内边距 */
  padding-left: 15px; /* 第一个元素的左内边距 */
  padding-right: 15px; /* 第一个元素的右内边距 */

}
.dropdown-menu li:not(first-child) {
  padding-top: 10px; /* 其他元素的上内边距 */
  padding-bottom: 5px; /* 其他元素的下内边距 */
  padding-left: 15px; /* 其他元素的左内边距 */
  padding-right: 15px; /* 其他元素的右内边距 */

}

/* 下拉菜单最后一项样式 */
.dropdown-menu li:last-child {
  padding-bottom: 0px;
  border-bottom: none; /* 移除底部边框 */
}

/* 下拉菜单链接样式 */
.dropdown-menu li a {
  text-decoration: none; /* 移除下划线 */
  color: inherit; /* 继承父元素颜色 */
  display: block; /* 块级元素 */
}

/* 过渡效果：进入和离开 */
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease; /* 平滑过渡效果 */
}

/* 过渡效果：进入开始 */
.slide-enter-from,
.slide-leave-to {
  max-height: 0; /* 最大高度为0 */
}

/* 过渡效果：进入结束 */
.slide-enter-to,
.slide-leave-from {
  max-height: 200px; /* 最大高度为200px */
}

/* 内容区域样式 */
.content {
  margin-left: 250px;
  width: calc(100% - 270px);
}

/* 用户头像图片样式 */
.user-item-img {
  width: 100%; /* 宽度占满 */
  display: flex; /* 使用 Flexbox 布局 */
  padding: 20px 0; /* 内边距 */
  border-bottom: 1px solid #4a69bd; /* 底部边框 */
}

/* 用户项样式 */
.user-item {
  position: relative; /* 相对定位 */
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
}

/* 用户头像样式 */
.user-img {
  width: 40px; /* 宽度 */
  height: 40px; /* 高度 */
  margin-left: 20px; /* 左外边距 */
  border-radius: 50%; /* 圆角 */
  cursor: pointer; /* 指针光标 */
}

/* 用户下拉菜单样式 */
.user-dropdown-menu {
  display: none; /* 默认隐藏 */
  position: absolute; /* 绝对定位 */
  background-color: #34495e; /* 背景颜色 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* 阴影效果 */
  width: 150px; /* 宽度 */
  z-index: 1001; /* 层级 */
  right: 10; /* 右偏移 */
  left: 70px; /* 左偏移 */
}

/* 显示状态下的用户下拉菜单 */
.user-dropdown-menu.show {
  display: flex; /* 显示 */
}

/* 用户下拉菜单项样式 */
.user-dropdown-menu li {
  list-style: none; /* 移除默认列表样式 */
  padding: 0; /* 移除内边距 */
  margin: 0; /* 移除外边距 */
  background-color: transparent; /* 背景透明 */
  height: 40px; /* 高度 */
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

/* 用户下拉菜单链接样式 */
.user-dropdown-menu a {
  color: #ecf0f1; /* 文字颜色 */
  text-decoration: none; /* 移除下划线 */
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  width: 100%; /* 宽度占满 */
  height: 100%; /* 高度占满 */
  transition: background-color 0.3s; /* 平滑过渡效果 */
}

/* 用户下拉菜单链接悬停效果 */
.user-dropdown-menu a:hover {
  background-color: #2980b9; /* 背景颜色变化 */
}

/* 标题样式 */
h2 {
  text-align: center; /* 水平居中 */
  margin-top: 20px; /* 上外边距 */
  color: #ecf0f1; /* 文字颜色 */
}

/* 自定义滚动条样式 */
.sidebar::-webkit-scrollbar {
  width: 8px; /* 滚动条宽度 */
}

.sidebar::-webkit-scrollbar-track {
  background: transparent; /* 轨道背景颜色 */
}

.sidebar::-webkit-scrollbar-thumb {
  background: transparent; /* 滚动条颜色 */
  border-radius: 4px; /* 圆角 */
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: transparent; /* 滚动条悬停时的颜色 */
}
</style>



