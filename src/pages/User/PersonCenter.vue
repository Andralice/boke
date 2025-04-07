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
  height: 920px;
  background-color: #f4f4f9;
}

.profile-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-header h1 {
  font-size: 2em;
  margin: 0;
  color: #333;
}

.profile-section {
  width: 600px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  max-width: 100%;
}

.profile-section h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 1;
}

.profile-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.profile-item strong {
  font-weight: bold;
  color: #333;
  margin-right: 10px;
  width: 120px; /* 固定宽度以对齐文案 */
}

.profile-item span {
  color: #757575;
  flex-grow: 1;
}
</style>



