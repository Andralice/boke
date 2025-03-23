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
      <h2>食品仓库管理系统</h2>
      <ul class="nav-list">
        <li v-for="(item, index) in menuItems" :key="index" class="nav-item" @click="toggleDropdown(index)">
          <a href="#" @click.prevent>{{ item.label }}</a>
          <transition name="slide">
            <ul v-if="activeDropdowns.includes(index)" class="dropdown-menu">
              <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
                <router-link :to="subItem.route" custom v-slot="{ navigate }">
                  <a @click="navigate">{{ subItem.label }}</a>
                </router-link>
              </li>
            </ul>
          </transition>
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

const store = useStore();
const router = useRouter();
const route = useRoute();
// 响应式引用
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const isDropdownVisible = ref(false);
const isInventoryDropdownVisible = ref(false);
const inventoryDropdown = ref<HTMLElement | null>(null);
const inventoryDropdownHeight = ref(0);
const isCollapsed = ref(false);
const activeDropdowns = ref([]);
const menuItems = ref([]); // 初始化为空数组

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


const toggleDropdown = (index) => {
  if (activeDropdowns.value.includes(index)) {
    activeDropdowns.value = activeDropdowns.value.filter(i => i !== index);
  } else {
    activeDropdowns.value.push(index);
  }
};

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


onMounted(async () => {
    console.log("Entering onMounted hook");

    const userName = localStorage.getItem('userName');
    const user = {
        "username": userName
    }
    if (!userName) {
        console.error('User name not found in localStorage');
        return;
    }

    try {
        console.log(`Fetching user info for username: ${userName}`);
        const response = await findUser(user); // 调用更新后的接口
        console.log('Response received:', response.result.role);
        menuItems.value = getMenuData(response.result.role);
    } catch (error) {
        console.error('Failed to fetch user info:', error);
    }

    window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    if (hideTimeout.value !== null) {
        clearTimeout(hideTimeout.value);
    }
    window.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
}

.sidebar {
    width: 250px;
    height: 100vh;
    background: url('@/assets/images/homePageSider.png') no-repeat 0px 0px;
    position: fixed;
    left: 0;
    top: 0;
    transition: transform 0.3s ease-in-out;
}

.sidebar.collapsed {
    transform: translateX(-100%);
}

.nav-list {
    list-style-type: none;
    padding: 20px 0;
}

.nav-item {
    padding: 15px;
    border-bottom: 1px solid #AA1010;
    position: relative;
}

.nav-item a {
    text-decoration: none;
    color: #333;
    display: block;
}

.dropdown-menu {
    list-style-type: none;
    padding: 0;
    margin: 0;
    background-color: #93b9c3;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    width: 200px;
    overflow: hidden;
}

.dropdown-menu li {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
}

.dropdown-menu li:last-child {
    border-bottom: none;
}

.dropdown-menu li a {
    text-decoration: none;
    color: #333;
    display: block;
}

.slide-enter-active,
.slide-leave-active {
    transition: max-height 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
    max-height: 200px;
    /* Adjust this value based on your dropdown content */
}

.content {
    margin-left: 270px;
    padding: 20px;
    width: calc(100% - 270px);
}
.user-item-img {
  width: 100%;
  display: flex;
  /* margin-left: 20px; */
  padding: 20px 0;
  border-bottom: 1px solid #4a69bd;
}

.user-item {
  position: relative;
  display: flex;
  align-items: center;
}

.user-img {
  width: 40px;
  height: 40px;
    margin-left: 20px;
  border-radius: 50%;
  cursor: pointer;
}

.user-dropdown-menu {
  display: none;
  position: absolute;
  background-color: #34495e;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 150px;
  z-index: 1001;
  right: 10;
  left: 70px;

}

.user-dropdown-menu.show {
  display: flex;
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
  transition: background-color 0.3s;
}

.user-dropdown-menu a:hover {
  background-color: #2980b9;
}
</style>
