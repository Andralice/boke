<template>
  <div class="addstore-body">
    <h1>新增库存</h1>

    <!-- 新增仓库输入框模块 -->
    <div class="new-stash-container">
      <h2>新增库存信息</h2>
      <div class="stash-input-row">
        <div class="stash-input-group">
          <label for="productName">商品名称</label>
          <input type="text" id="productName" placeholder="请输入商品名称" v-model="formData.productName">
        </div>
        <div class="stash-input-group">
          <label for="stashName">仓库名称</label>
          <input type="text" id="stashName" placeholder="请输入仓库名称" v-model="formData.stashName">
        </div>
        <div class="stash-input-group">
          <label for="supplierName">供货商名称</label>
          <input type="text" id="supplierName" placeholder="请输入供货商名称" v-model="formData.supplierName">
        </div>
      </div>
      <div class="stash-input-row">
        <div class="stash-input-group">
          <label for="type">修改方式</label>
          <select id="type" v-model="formData.type">
            <option value="">请选择修改方式</option>
            <option value="add">添加</option>
            <option value="sub">减少</option>
          </select>
        </div>
        <div class="stash-input-group">
          <label for="quantity">修改数量</label>
          <input type="number" id="quantity" placeholder="请输入修改数量" v-model.number="formData.quantity">
        </div>
      </div>
      <div class="preview-container">
        <div v-for="(preview, index) in previews" :key="index" class="preview-item">
          <img :src="preview" alt="Preview" class="preview-image">
        </div>
      </div>
    </div>

    <!-- 备注 -->
    <div class="note-container">
      <div class="header">
        <h2>添加备注</h2>
        <button class="note-button" @click="clearNote()">清除备注</button>
      </div>
      <textarea id="note-input" placeholder="在这里输入您的备注..." v-model="formData.remark"></textarea>
    </div>

    <!-- 提交按钮 -->
    <div class="addstore-button">
      <button @click="submitForm">提交</button>
    </div>
  </div>
</template>


<script lang="ts" setup name='createProduct'>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { createProduct } from '@/api/product/product';
import { useRouter } from 'vue-router'; // 新增路由依赖
// 假设不需要arrayBufferToBase64和compressImage函数，如果需要请保留导入

interface FormData {
  productName: string;
  category: string;
  stashName: string;
  storageTemperature: string;
  supplierName: string;
  remark: string;
  imageUrl: string | null; // 允许为空
  shelfLife: number;
  productTime: string;
}

const formRef = ref();
const formData = reactive<FormData>({
  productName: '',
  category: '',
  stashName: '',
  storageTemperature: '',
  supplierName: '',
  remark: '',
  imageUrl: null,
  shelfLife: 0,
  productTime: '',
});

const router = useRouter();
const previews = ref<string[]>([]);
const uploadRef = ref(); // 引用el-upload组件
const rules = {
  productName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  category: [{ required: true, message: '请输入商品类别', trigger: 'blur' }],
  stashName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
  storageTemperature: [{ required: true, message: '请选择存储方式', trigger: 'change' }],
  supplierName: [{ required: true, message: '请输入供货商', trigger: 'blur' }],
  shelfLife: [{ required: true, message: '请输入保质期', trigger: 'blur' }],
  productTime: [{ required: true, message: '请选择生产日期', trigger: 'change' }],
};

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
          // 更新formData中的imageUrl为第一个文件的base64字符串
          if (i === 0) {
            formData.imageUrl = e.target.result as string;
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }
}

async function submitForm() {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return;

    try {
      // 提交表单数据
      await createProduct(formData);
      router.push('/showALLProduct');
      ElMessage.success('商品新增成功！');
    } catch (error) {
      console.error('Error:', error);
      ElMessage.error('提交失败，请检查网络或联系管理员');
    }
  });
}

</script>

<style scoped>
.addstore-body {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  padding: 40px; /* 增加内边距 */
  max-width: 900px; /* 增加最大宽度 */
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.new-stash-container {
  background-color: #fff;
  padding: 30px; /* 增加内边距 */
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

h2 {
  color: #555;
  margin-bottom: 15px;
}

.stash-input-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* 增加间距 */
  margin-bottom: 20px;
}

.stash-input-group {
  flex: 1 1 calc(33.333% - 30px); /* 调整宽度 */
  background-color: #f1f1f1;
  padding: 12px; /* 增加内边距 */
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box; /* 确保内边距不会超出背景色 */
}

.stash-input-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.stash-input-group input,
.stash-input-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box; /* 确保内边距不会超出背景色 */
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* 增加间距 */
  margin-top: 15px;
}

.preview-item {
  flex: 1 1 calc(33.333% - 30px); /* 调整宽度 */
  background-color: #f1f1f1;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  text-align: center;
  box-sizing: border-box; /* 确保内边距不会超出背景色 */
}

.preview-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.note-container {
  background-color: #fff;
  padding: 30px; /* 增加内边距 */
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.note-container .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.note-container h2 {
  color: #555;
}

.note-button {
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 10px 15px; /* 增加内边距 */
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.note-button:hover {
  background-color: #ff4c4c;
}

textarea {
  width: 100%;
  padding: 12px; /* 增加内边距 */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: none;
  box-sizing: border-box; /* 确保内边距不会超出背景色 */
}

.addstore-button {
  text-align: center;
}

.addstore-button button {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 12px 25px; /* 增加内边距 */
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.addstore-button button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .stash-input-group,
  .preview-item {
    flex: 1 1 100%; /* 在小屏幕上占满宽度 */
  }

  .stash-input-row,
  .preview-container {
    gap: 10px; /* 减少间距 */
  }

  .new-stash-container,
  .note-container {
    padding: 20px; /* 减少内边距 */
  }

  h1 {
    margin-bottom: 20px;
  }

  h2 {
    margin-bottom: 10px;
  }

  .note-button,
  .addstore-button button {
    padding: 10px 20px; /* 减少内边距 */
  }
}
</style>
