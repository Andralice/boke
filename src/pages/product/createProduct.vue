<template>
  <div class="addstore-body">
    <h1>新增商品</h1>

    <!-- 新增仓库输入框模块 -->
    <div class="new-stash-container">
      <h2>新增商品信息</h2>
      <div class="stash-input-row">
        <div class="stash-input-group">
          <label for="商品名称">商品名称</label>
          <input type="text" id="商品名称" placeholder="请输入商品名称" v-model="formData.productName">
        </div>
        <div class="stash-input-group">
          <label for="商品类别">商品类别</label>
          <input type="text" id="商品类别" placeholder="请输入商品类别" v-model="formData.category">
        </div>
        <div class="stash-input-group">
          <label for="仓库名称">仓库名称</label>
          <input type="text" id="仓库名称" placeholder="请输入仓库名称" v-model="formData.stashName">
        </div>
      </div>
      <div class="stash-input-row">
        <div class="stash-input-group">
          <label for="存储方式">存储方式</label>
          <select id="存储方式" v-model="formData.storageTemperature">
            <option value="">请选择存储方式</option>
            <option value="冷藏">冷藏</option>
            <option value="阴凉">阴凉</option>
            <option value="常温">常温</option>
          </select>
        </div>

        <div class="stash-input-group">
          <label for="生产日期">生产日期</label>
          <input type="date" id="生产日期" v-model="formData.productTime">
        </div>

        <div class="stash-input-group">
          <label for="保质期">保质期(月)</label>
          <input type="text" id="保质期" placeholder="请输入保质期" v-model="formData.shelfLife">
        </div>
      </div>

      <div class="stash-input-group">
        <label for="供货商">供货商</label>
        <input type="text" id="供货商" placeholder="请输入供货商" v-model="formData.supplierName">
      </div>
      
      <div class="stash-input-group">
        <label for="图片上传">上传图片</label>
        <input type="file" id="图片上传" @change="handleFileChange">
      </div>
      <div class="preview-container">
        <div v-if="previews.length > 0" class="preview-item">
          <img :src="previews[0]" alt="Preview" class="preview-image">
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
      <button :disabled="isSubmitting || !formData.imageUrl" @click="submitForm">提交</button>
    </div>
  </div>
</template>

<script lang="ts" setup name='createProduct'>
import { ref } from 'vue';
import { createProduct } from '@/api/product/product';
import { useRouter } from 'vue-router'; // 新增路由依赖
import { arrayBufferToBase64, compressImage } from '@/util/imageUtils';

interface FormData {
  productName: string;  // 商品名称
  category: string; // 商品类别
  stashName: string; // 仓库名称
  storageTemperature: string; // 存储方式
  supplierName: string; // 供货商
  remark: string; // 备注
  imageUrl: string; // 图片二进制数据
  shelfLife: number; // 保质期
  productTime: string; // 生产日期
}

const formData = ref<FormData>({
  productName: '',
  category: '',
  stashName: '',
  storageTemperature: '',
  supplierName: '',
  remark: '',
  imageUrl: '',
  shelfLife: 0,
  productTime: '',
});

const router = useRouter();
const previews = ref<string[]>([]);
const isSubmitting = ref(false);

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    
    // 使用 FileReader 读取文件
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        // 将 ArrayBuffer 转换为 Base64 编码的字符串
        const imgBuffer = e.target.result;
        const base64String = arrayBufferToBase64(imgBuffer);

        // 创建一个临时的 Image 对象来加载图片数据
        const img = new Image();
        img.src = `data:image/jpeg;base64,${base64String}`;
        img.onload = () => {
          // 压缩图片并获取压缩后的 Base64 编码字符串
          const compressedBase64 = compressImage(img, 200 * 1024); // 目标大小为 200KB
          
          previews.value = [URL.createObjectURL(file)]; // 更新预览数组
          formData.value.imageUrl = compressedBase64; // 更新 Base64 编码的图片数据
        };
      }
    };

    reader.readAsArrayBuffer(file);
  }
  
}
function clearNote() {
  formData.value.remark = '';
}

async function submitForm() {
  if (!formData.value.imageUrl) {
    alert('请先上传图片');
    return;
  }
  

  isSubmitting.value = true;
  try {
    // 发送请求
    const response = await createProduct(formData.value);
    router.push('/showALLProduct');
  } catch (error) {
    console.error('Error:', error);
    alert('提交失败，请检查网络或联系管理员');
  } finally {
    isSubmitting.value = false;
  }
}
</script>











  
  <style scoped>
  .addstore-body {
    width: 100%;
    height: auto;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f9f9f9;
    /* 轻微背景色 */
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    font-weight: 600;
  }
  
  .new-stash-container {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    margin-bottom: 20px;
    background-color: white;
  }
  
  .new-stash-container h2 {
    margin-bottom: 10px;
    font-size: 20px;
    color: #333;
    font-weight: 500;
  }
  
  .new-stash-container:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .stash-input-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .stash-input-group {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 250px;
    margin-bottom: 10px;
  }
  
  .stash-input-group label {
    font-weight: 500;
    width: 120px;
    /* 固定宽度以确保对齐 */
    margin-right: 10px;
    color: #555;
  }
  
  .stash-input-group input,
  .stash-input-group select {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    font-size: 14px;
    color: #333;
  }
  
  .stash-input-group input:focus,
  .stash-input-group select:focus {
    border-color: #007bff;
  }
  
  .preview-container {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .preview-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .preview-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .note-container {
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    transition: box-shadow 0.3s ease;
  }
  
  .note-container:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .header h2 {
    font-size: 18px;
    color: #333;
    font-weight: 500;
  }
  
  textarea {
    width: 98%;
    height: 140px;
    resize: vertical;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    font-size: 14px;
    color: #333;
  }
  
  textarea:focus {
    border-color: #007bff;
  }
  
  .note-button {
    margin-left: 10px;
    height: 40px;
    background-color: #555;
    /* 更柔和的颜色 */
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .note-button:hover {
    background-color: #333;
  }
  
  .addstore-button {
    position: fixed;
    right: 80px;
    bottom: 80px;
    /* 向上移动一些 */
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .addstore-button button {
    width: 200px;
    /* 减少宽度 */
    height: 40px;
    /* 减少高度 */
    color: white;
    background-color: #555;
    /* 更柔和的颜色 */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;
    font-weight: 500;
  }
  
  .addstore-button button:hover {
    background-color: #333;
  }
  </style>