<template>
  <div class="profile-container">
    <div class="profile-content">
      <div class="profile-header">
        <h1 v-if="user.username">你好 {{ user.username }}</h1>
        <h1 v-else>加载中...</h1>
      </div>
      <div class="profile-section basic-info" v-if="user.username">
        <h2>基本信息</h2>
        <div class="profile-item">
          <strong>姓名:</strong>
          <span>{{ user.adminName }}</span>
        </div>
        <div class="profile-item">
          <strong>职位:</strong>
          <span>{{ user.position }}</span>
        </div>
        <div class="profile-item">
          <strong>联系方式:</strong>
          <span>{{ user.telephone }}</span>
        </div>
        <div class="profile-item">
          <strong>工作地点:</strong>
          <span>{{ user.workPlace }}</span>
        </div>
        <div class="profile-item">
          <strong>入职时间:</strong>
          <span>{{ user.createTime }}</span>
        </div>
      </div>
      <div class="profile-section account-info" v-if="user.username">
        <h2>账户信息</h2>
        <div class="profile-item">
          <strong>身份:</strong>
          <span>{{ user.role }}</span>
        </div>
        <div class="profile-item">
          <strong>备注:</strong>
          <span>{{ user.remark }}</span>
        </div>
      </div>
      <div v-else>
        <p>无法加载用户信息，请稍后再试。</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name='PersonCenter'>
import { ref, onMounted } from 'vue';
import { findUser } from '@/api/user/user'; // 假设findUser函数位于此路径

interface User {
  userId?: number;
  username: string;
  adminName?: string;
  password: string;
  position?: string;
  telephone?: string;
  workPlace?: string;
  role?: string;
  remark?: string;
  createTime?: string;
  updateTime?: string;
}

const user = ref<User>({
  username: ''
});

onMounted(async () => {
  const userName = localStorage.getItem('userName');
  if (!userName) {
    console.error('User name not found in localStorage');
    return;
  }

  try {
    const parms = {
      username: userName
    };
    const response = await findUser(parms);
    if (response && response.result) {
      user.value = response.result as User;
    } else {
      console.error('No data returned from API');
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }
});
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center; /* 居中对齐 */
  align-items: center; /* 垂直居中 */
  min-height: 90vh; /* 视窗高度的90% */
  background-color: #f4f4f9;
  padding: 20px;
}

.profile-content {
  width: 100%;
  max-width: 800px; /* 增加最大宽度 */
  background-color: #ffffff;
  border-radius: 15px; /* 增大圆角半径 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* 更深的阴影效果 */
  padding: 40px;
  padding-left: 60px; /* 在左侧添加一段距离 */
  text-align: left;
}

.profile-header {
  margin-bottom: 30px; /* 增加底部外边距 */
}

.profile-header h1 {
  font-size: 2.2em; /* 增大字体大小 */
  margin: 0;
  color: #333;
  text-align: center;
}

.profile-section {
  width: 100%; /* 使用全宽 */
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px; /* 增加底部外边距 */
}

.profile-section h2 {
  font-size: 1.6em; /* 增大字体大小 */
  margin-bottom: 15px;
  color: #333;
  position: relative;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0; /* 添加下划线 */
}

.profile-item {
  margin-bottom: 15px; /* 增加底部外边距 */
  display: flex;
  align-items: center;
}

.profile-item strong {
  font-weight: bold;
  color: #333;
  margin-right: 20px; /* 增加右边距以更好对齐 */
  width: 150px; /* 增加固定宽度 */
}

.profile-item span {
  color: #757575;
  flex-grow: 1;
}

/* 增加一些额外的样式来提升视觉效果 */
.profile-section:last-child {
  margin-bottom: 0;
}

.profile-item:nth-child(even) {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
}
</style>





