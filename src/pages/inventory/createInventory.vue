<template>
  <div class="inventory-management">
    <el-card shadow="hover" class="main-container">
      <el-tabs v-model="activeTab" type="card">
        <!-- 新增库存表单 -->
        <el-tab-pane label="新增库存" name="addInventory">
          <el-form :model="formData" label-width="120px" class="custom-form">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="商品名称">
                  <el-input id="productName" placeholder="请输入商品名称" v-model="formData.productName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="仓库名称">
                  <el-input id="stashName" placeholder="请输入仓库名称" v-model="formData.stashName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供货商名称">
                  <el-input id="supplierName" placeholder="请输入供货商名称" v-model="formData.supplierName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="修改方式">
                  <el-select id="type" v-model="formData.type">
                    <el-option value="" label="请选择修改方式"></el-option>
                    <el-option value="add" label="添加"></el-option>
                    <el-option value="sub" label="减少"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改数量">
                  <el-input-number id="quantity" placeholder="请输入修改数量" v-model.number="formData.quantity"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="preview-container">
              <div v-for="(preview, index) in previews" :key="index" class="preview-item">
                <img :src="preview" alt="Preview" class="preview-image">
              </div>
            </div>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="添加备注">
                  <el-input type="textarea" id="note-input" placeholder="在这里输入您的备注..." v-model="formData.remark"></el-input>
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

<script lang="ts" setup name='createInventory'>
import { ref } from 'vue';
import { createInventory } from '@/api/inventory/inventory';
import { useRouter } from 'vue-router'; // 新增路由依赖

interface FormData {
  productName: string;
  stashName: string;
  supplierName: string;
  type: string;
  quantity?: number;
  remark: string;
}

const formData = ref<FormData>({
  productName: '',
  stashName: '',
  supplierName: '',
  type: '',
  quantity: undefined,
  remark: ''
});

const router = useRouter();
const submitForm = async () => {
  try {
    // 发送请求
    const response = await createInventory(formData.value);
    router.push('/showAllInventory');
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
