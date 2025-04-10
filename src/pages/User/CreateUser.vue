<template>
  <div class="addstore-body">
    <el-card shadow="hover" class="main-container">
      <el-tabs v-model="activeTab" type="card">
        <!-- 新增任务表单 -->
        <el-tab-pane label="新增用户" name="addUser">
      <!-- 表单 -->
      <el-form :model="formData" label-width="120px" class="custom-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名称*" prop="username">
              <el-input v-model="formData.username" placeholder="请输入用户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理员名称*" prop="adminName">
              <el-input v-model="formData.adminName" placeholder="请输入管理员名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设置密码*" prop="password">
              <el-input type="password" v-model="formData.password" placeholder="请设置密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设置职位*" prop="position">
              <el-input v-model="formData.position" placeholder="设置职位"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设置电话号码*" prop="telephone">
              <el-input v-model="formData.telephone" placeholder="设置电话号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限*" prop="role">
              <el-select v-model="formData.role" placeholder="请选择权限">
                <el-option value="">请选择权限</el-option>
                <el-option value="Admin">管理员</el-option>
                <el-option value="User">用户</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设置工作地点*" prop="workPlace">
              <el-input v-model="formData.workPlace" placeholder="设置工作地点"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="添加备注">
              <el-input type="textarea" :rows="2" placeholder="在这里输入您的备注..." v-model="formData.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="success" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
      </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

  <script lang="ts" setup name='createStash'>
  import { ref } from 'vue';
  import { createUser } from '@/api/user/user';
  import { useRouter, useRoute } from 'vue-router'; // 新增路由依赖
  const activeTab = ref('addUser');
  interface FormData {
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

  // 表单数据
  const formData = ref<FormData>({
    username: "",
    adminName: "",
    password: "",
    position: "",
    telephone: "",
    workPlace: "",
    role: "",
    remark: ""
  });


  // console.log('66666666FormData:', formData.value);

  const router = useRouter();
  const submitForm = async () => {
    try {
      // 发送请求
      const response = await createUser(formData.value);
      router.push('/showALLUser');
    } catch (error) {
      console.error('Error:', error);
      alert('提交失败，请检查网络或联系管理员');
    }
  };

  const previews = ref<string[]>([]);


  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      previews.value = [];
      for (let i = 0; i < target.files.length; i++) {
        const file = target.files[i];
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target?.result) {
            previews.value.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  function clearNote() {
    formData.value.remark = '';
  }

  </script>

  <style scoped>
  .inventory-management {
    padding: 20px;
  }

  .el-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
  }

  .el-form-item {
    display: flex;
    align-items: center;
  }

  .el-form-item .el-input,
  .el-form-item .el-input-number,
  .el-form-item .el-date-picker {
    width: 100%;
  }
  </style>
