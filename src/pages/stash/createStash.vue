<template>
  <div class="addstore-body">
    <el-card shadow="hover" class="main-container grid-layout">
      <el-tabs v-model="activeTab" type="card">
        <!-- 新增仓库表单 -->
        <el-tab-pane label="新增仓库" name="addStash">
          <el-form :model="formData" label-width="120px" :rules="rules" ref="formRef" class="custom-form">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="仓库名称*" prop="stashName">
                  <el-input v-model="formData.stashName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="仓库地址*" prop="stashAddress">
                  <el-input v-model="formData.stashAddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="联系人*" prop="adminName">
                  <el-input v-model="formData.adminName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="存储温度*" prop="storageTemperature">
                  <el-select v-model="formData.storageTemperature" placeholder="请选择存储温度">
                    <el-option value="-20°~0°">冷藏：-20°~0°</el-option>
                    <el-option value="0°~20°">阴凉： 0°~20°</el-option>
                    <el-option value="20°~40°">常温： 20°~40°</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="仓库面积*" prop="stashArea">
                  <el-input v-model="formData.stashArea"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上传图片">
                  <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change="handleFileChange">
                    <i slot="default" class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="添加备注">
                  <el-input type="textarea" v-model="formData.remark" :rows="2" placeholder="在这里输入您的备注..."></el-input>
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
import { createStash } from '@/api/stash/stash';
import { useRouter, useRoute } from 'vue-router'; // 新增路由依赖
const activeTab = ref('addStash');
interface FormData {
  stashName: string; // stashName
  stashAddress: string; //stashAddress
  adminName: string; // adminName
  stashArea: string; // stashArea
  storageTemperature: string; // storageTemperature
  remark: string; // remark
}

const formData = ref<FormData>({
  stashName: '',
  stashAddress: '',
  adminName: '',
  stashArea: '',
  storageTemperature: '',
  remark: ''
});

// console.log('66666666FormData:', formData.value);

const router = useRouter();
const submitForm = async () => {
  try {
    // 发送请求
    const response = await createStash(formData.value);
    router.push('/showALLStash');
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
