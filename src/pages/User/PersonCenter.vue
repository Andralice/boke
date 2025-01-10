<template>
    <div class="profile-container">
      <div class="profile-content">
        <div class="profile-header">
          <h1>你好{{ name }}</h1>
        </div>
        <div class="profile-section basic-info">
          <h2>基本信息</h2>
          <div class="profile-item">
            <strong>姓名:</strong>
            <span>{{ name }}</span>
          </div>
          <div class="profile-item">
            <strong>性别:</strong>
            <span>{{ gender }}</span>
          </div>
          <div class="profile-item">
            <strong>联系方式:</strong>
            <span>{{ contactInfo }}</span>
          </div>
          <div class="profile-item">
            <strong>入职时间:</strong>
            <span>{{ hireDate }}</span>
          </div>
        </div>
        <div class="profile-section account-info">
          <h2>账户信息</h2>
          <div class="profile-item">
            <strong>绑定邮箱:</strong>
            <span>{{ email }}</span>
            <button class="edit-button" @click="editEmail">编辑</button>
          </div>
          <div class="profile-item">
            <strong>密码:</strong>
            <span>********</span>
            <button class="edit-button" @click="editPassword">编辑</button>
          </div>
          <div class="profile-item">
            <strong>身份:</strong>
            <span>{{ role }}</span>
          </div>
          <div class="profile-item">
            <strong>负责仓库:</strong>
            <span>{{ warehouse }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup name='PersonCenter'>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const name = ref('仓库管理源');
  const gender = ref('男');
  const contactInfo = ref('13800138000');
  const hireDate = ref('2020-06-01');
  const email = ref('1234567890@example.com');
  const role = ref('小商品仓库管理');
  const warehouse = ref('郑州仓库');
  
  const editProfile = () => {
    alert('编辑功能尚未实现');
  };
  
  const navigateTo = (section: string) => {
    switch (section) {
      case 'edit':
        // 这里可以导航到编辑资料的路由
        console.log('Navigate to Edit Profile');
        break;
      case 'permissions':
        // 这里可以导航到查看权限的路由
        console.log('Navigate to Permissions');
        break;
      case 'favorites':
        // 这里可以导航到收藏数据的路由
        console.log('Navigate to Favorites');
        break;
      default:
        console.log('Unknown section');
    }
  };
  
  const editEmail = () => {
    alert('编辑邮箱功能尚未实现');
  };
  
  const editPassword = () => {
    alert('编辑密码功能尚未实现');
  };
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
  
  .edit-button {
    background-color: #6200ea;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 10px;
  }
  
  .edit-button:hover {
    background-color: #3700b3;
  }
  </style>
  
  
  
  