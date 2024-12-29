<template>
  <div class="container">
    <div class="sidebar">
      <h2>导航菜单</h2>
      <ul class="nav-links">
        <li><router-link to="/home_index">概览</router-link></li>
        <li><router-link to="/inventory">库存管理</router-link></li>
        <li><router-link to="/orders">转移申请</router-link></li>
        <li><router-link to="/suppliers">供应商管理</router-link></li>
        <li><router-link to="/reports">报表分析</router-link></li>
        <div class="user-item" @mouseover="showDropdown" @mouseleave="hideDropdown">
          <router-link to="/login" @click.prevent="hideNavbarOnLogin">
            <img class="user-img" src="@/assets/images/avatar.jpg" alt="">
          </router-link>
          <ul class="dropdown-menu" :class="{ 'show': isDropdownVisible }">
            <li v-if="isLoggedIn">
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
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const isDropdownVisible = ref(false);

const router = useRouter();
const route = useRoute();

const logout = () => {
  store.dispatch('logout');
  router.push('/login');
};

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
  console.log('Hide navbar on login');
};
</script>

<style scoped>
.container {
  display: flex;
  height: 920px; /* 使用视口高度 */
}

.sidebar {
  width: 20%; /* 固定宽度为20% */
  background-color: #f4f4f4;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar h2 {
  margin-top: 20px;
  font-size: 1.5em;
  color: #333;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  flex-grow: 1;
}

.sidebar li {
  margin: 10px 0;
  height: 50px;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar li:last-child {
  background-color: transparent;
}

.sidebar li:hover {
  background-color: blue;
}

.sidebar a {
  text-decoration: none;
  color: #333;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar a:hover {
  color: #007bff;
}

.user-item {
  display: flex;
  margin-top: 500px;
  margin-left: 40px;
  align-items: flex-end; /* 将子元素对齐到末尾 */
  position: relative;
  justify-content: flex-start; /* 将子元素对齐到开始 */
}

.user-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute; /* 使用绝对定位 */
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  min-width: max-content;
  width: 150px;
  z-index: 1001;
  padding: 0.5rem 0;
  left: 40px;
  top: -80px;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-menu li {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.dropdown-menu li:hover {
  background-color: transparent;
}

.dropdown-menu a {
  color: #fff;
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
}

.dropdown-menu a:hover {
  background-color: #555;
}

.content {
  width: 80%; /* 固定宽度为80% */
  padding-left: 20px;
  background-color: #fff;
  box-sizing: border-box;
}

h2 {
  margin-top: 0;
}
</style>