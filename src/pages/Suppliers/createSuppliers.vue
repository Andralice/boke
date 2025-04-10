<template>
  <div class="addstore-body">
    <el-card shadow="hover" class="main-container">
      <el-tabs v-model="activeTab" type="card">
        <!-- 新增供应商表单 -->
        <el-tab-pane label="新增供应商" name="addSupplier">
          <el-form :model="formData" label-width="120px" :rules="rules" ref="formRef" class="custom-form">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="供应商名称*" prop="supplierName">
                  <el-input v-model="formData.supplierName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人*" prop="contactName">
                  <el-input v-model="formData.contactName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="联系电话*" prop="contactPhone">
                  <el-input v-model="formData.contactPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址*" prop="address">
                  <el-input v-model="formData.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="银行卡号*" prop="bankAccount">
                  <el-input v-model="formData.bankAccount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态*" prop="cooperationStatus">
                  <el-select v-model="formData.cooperationStatus" placeholder="请选择状态">
                    <el-option value="启用">启用</el-option>
                    <el-option value="禁用">禁用</el-option>
                  </el-select>
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

<script lang="ts" setup name='createSuppliers'>
import { ref } from 'vue';
import { createSuppliers } from '@/api/suppliers/suppliers';
import { useRouter } from 'vue-router';

interface FormData {
  supplierName: string; // stashName
  contactName: string; //stashAddress
  contactPhone: string; // managerName
  address: string; // stashArea
  bankAccount: string; // storageTemperature
  cooperationStatus: string;
  remark: string; // remark
}
const activeTab = ref('addSupplier');
const formData = ref<FormData>({
  supplierName: '',
  contactName: '',
  contactPhone: '',
  address: '',
  bankAccount: '',
  cooperationStatus: '',
  remark: ''
});

// console.log('66666666FormData:', formData.value);
const router = useRouter();
const submitForm = async () => {
  try {
    // 根据选择的状态设置 cooperationStatus
    // 创建一个新的对象来发送请求，将 cooperationStatus 转换为 boolean
    const requestData = {
      ...formData.value,
      cooperationStatus: formData.value.cooperationStatus === '启用' ? 1 : 0
    };
    // 发送请求
    const response = await createSuppliers(requestData);
    router.push('/showALLSuppliers'); // 创建成功返回列表页
    alert('提交成功');
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
