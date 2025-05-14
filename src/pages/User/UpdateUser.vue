<template>
  <div class="addstore-body">
    <el-card shadow="hover" class="main-container grid-layout">
      <el-tabs v-model="activeTab" type="card">
        <!-- 更新用户表单 -->
        <el-tab-pane label="更新用户" name="updateUser">
          <el-form :model="formData" label-width="100px" :rules="rules" ref="formRef" class="custom-form">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="用户名称*" prop="username">
                  <el-input v-model="formData.username"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="管理员名称" prop="adminName">
                  <el-input v-model="formData.adminName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="设置密码*" prop="password">
                  <el-input v-model="formData.password" show-password></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设置职位" prop="position">
                  <el-input v-model="formData.position"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="设置电话号码" prop="telephone">
                  <el-input v-model="formData.telephone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="权限" prop="role">
                  <el-select v-model="formData.role" placeholder="请选择权限" style="width: 100%;">
                    <el-option value="" label="全部"></el-option>
                    <el-option value="Admin" label="管理员"></el-option>
                    <el-option value="User" label="用户"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="设置工作地点" prop="workPlace">
                  <el-input v-model="formData.workPlace"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="添加备注">
                  <el-input type="textarea" v-model="formData.remark" :rows="5" placeholder="在这里输入您的备注..."></el-input>
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

<script lang="ts" setup name='updateUser'>
import { ref, onMounted } from 'vue';
import { selectUserById, updateUser } from '@/api/user/user';
import { useRouter, useRoute } from 'vue-router'; // 新增路由依赖

interface FormData {
  userId?: number;
  username: string;  // 用户名称
  adminName?: string; // 管理员名称
  password: string; // 密码
  position?: string; // 职位
  telephone?: string; // 电话号码
  workPlace?: string; // 工作地点
  role?: string; // 权限
  remark?: string; // 备注
}

const formData = ref<FormData>({
  username: '',
  adminName: '',
  password: '',
  position: '',
  telephone: '',
  workPlace: '',
  role: '',
  remark: '',
});

// 新增路由参数获取
const router = useRouter();
const route = useRoute();

const userId = ref<number>(parseInt(route.params.id as string) || 0); // 从URL参数获取用户ID

// 新增：加载现有用户数据（编辑页面需要预加载数据）
onMounted(async () => {
  if (userId.value) {
    try {
      const response = await selectUserById(userId.value); // 调用接口获取用户数据
      formData.value = response.result;
    } catch (error) {
      console.error('Failed to load user data', error);
      alert('无法加载用户信息，请检查网络或联系管理员');
    }
  }
});

const activeTab = ref('updateUser');

const rules = ref({
  username: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
  password: [{ required: true, message: '请设置密码', trigger: 'blur' }],
  telephone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择权限', trigger: 'change' }],
});

function clearNote() {
  formData.value.remark = '';
}

async function submitForm() {
  formData.value.userId = userId.value;
  try {
    const response = await updateUser(formData.value); // 调用更新接口
    router.push('/showALLUser');
  } catch (error) {
    console.error('Error updating User', error);
    alert('更新失败，请检查网络或联系管理员');
  }
}
</script>

<style scoped>
.addstore-body {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.el-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}

.main-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.custom-form {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  background-color: white;
}

.custom-form:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
  font-weight: 600;
}

.el-form-item__label {
  font-size: 16px;
  color: #555;
}

.el-form-item .el-input,
.el-form-item .el-input-number,
.el-form-item .el-date-picker,
.el-form-item .el-select {
  width: 100%;
}

.el-button[type="success"] {
  width: 100%;
  margin-top: 20px;
}
</style>



