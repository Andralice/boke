<template>
  <div class="addstore-body">
    <el-card shadow="hover" class="main-container">
      <el-tabs v-model="activeTab" type="card">
        <!-- 新增任务表单 -->
        <el-tab-pane label="新增任务" name="addTask">
          <el-form :model="formData" label-width="120px" :rules="rules" ref="formRef" class="custom-form">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="任务名称*" prop="taskName">
                  <el-input v-model="formData.taskName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="管理员名称*" prop="taskAdminName">
                  <el-input v-model="formData.taskAdminName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="执行人员*" prop="taskUserNames">
                  <el-input v-model="formData.taskUserNames"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务类型*" prop="taskType">
                  <el-select v-model="formData.taskType" placeholder="请选择任务类型">
                    <el-option value="">请选择任务类型</el-option>
                    <el-option value="入库搬运">入库搬运</el-option>
                    <el-option value="入库统计">入库统计</el-option>
                    <el-option value="出库搬运">出库搬运</el-option>
                    <el-option value="出库统计">出库统计</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="任务描述">
                  <el-input type="textarea" v-model="formData.taskDescription" :rows="2" placeholder="在这里输入您的任务描述..."></el-input>
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

<script lang="ts" setup name='createTask'>
import { ref } from 'vue';
import { createTask } from '@/api/Task/task';
import { useRouter } from 'vue-router'; // 新增路由依赖
const activeTab = ref('addTask');
interface FormData {
    taskName: string;
    taskDescription: string;
    taskStatus: string;
    taskType: string;
    taskAdminName: string;
    taskUserNames: string;
}

const formData = ref<FormData>({
    taskName: "",
    taskDescription: "",
    taskStatus: "",
    taskType: "",
    taskAdminName: "",
    taskUserNames: ""
});

const router = useRouter();
const previews = ref<string[]>([]);
const isSubmitting = ref(false);


function clearNote() {
    formData.value.taskDescription = '';
}

async function submitForm() {
    isSubmitting.value = true;
    try {
        // 发送请求
        const response = await createTask(formData.value);
        router.push('/showALLTask');
    } catch (error) {
        console.error('Error:', error);
        alert('提交失败，请检查网络或联系管理员');
    } finally {
        isSubmitting.value = false;
    }
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
