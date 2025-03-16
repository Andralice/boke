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
            <label for="供货商">供货商</label>
            <input type="text" id="供货商" placeholder="请输入供货商" v-model="formData.supplierName">
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
  
  <script lang="ts" setup name='updateProduct'>
  import { ref,onMounted } from 'vue';
  import { selectProductById,updateProduct } from '@/api/product/product';
  import { useRouter, useRoute } from 'vue-router'; // 新增路由依赖
  
  interface FormData {
    productId?: number;
    productName : string; 
    category: string; 
    stashName: string; 
    storageTemperature: string; 
    supplierName: string;
    imageUrl:string; 
    remark: string; 
  }
  
  const formData = ref<FormData>({
    productName: '',
    category: '',
    stashName: '',
    storageTemperature: '',
    supplierName: '',
    imageUrl: '',
    remark: ''
  });
  
  // 新增路由参数获取
  const router = useRouter();
  const route = useRoute();

// const stashId = ref<number>(() => parseInt(route.params.id as string)); // 从URL参数获取仓库ID
  const productId = ref<number>(parseInt(route.params.id as string) || 0); // 从URL参数获取仓库ID

// 新增：加载现有供应商数据（编辑页面需要预加载数据）
onMounted(async () => {
  if (productId.value) {
    try {
      const response = await selectProductById(productId.value); // 调用更新后的接口
      formData.value = response.result;
    } catch (error) {
      console.error('Failed to load stash data', error);
      alert('无法加载仓库信息，请检查网络或联系管理员');
    }
  }
});

const submitForm = async () => {
  formData.value.productId = productId.value;
  try {
    const response = await updateProduct(formData.value); // 调用更新接口
    router.push('/showALLProduct');
  } catch (error) {
    console.error('Error updating Suppliers', error);
    alert('更新失败，请检查网络或联系管理员');
  }
};
  
  const previews = ref<string[]>([]);
  
  
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

// 辅助函数：将 ArrayBuffer 转换为 Base64 编码的字符串
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// 压缩图片并返回 Base64 编码的字符串
function compressImage(img: HTMLImageElement, maxSizeInBytes: number): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  let width = img.width;
  let height = img.height;

  // 计算缩放比例
  let ratio = Math.sqrt(maxSizeInBytes / (img.width * img.height * 4));
  width = Math.floor(width * ratio);
  height = Math.floor(height * ratio);

  canvas.width = width;
  canvas.height = height;

  // 绘制缩小后的图像
  ctx?.drawImage(img, 0, 0, width, height);

  // 获取压缩后的 Base64 编码字符串
  const mimeType = 'image/jpeg'; // 可以根据需要选择其他格式
  const quality = 0.92; // 图片质量，可以根据需要调整
  const compressedBase64 = canvas.toDataURL(mimeType, quality);

  return compressedBase64;
}
  
  function clearNote() {
    formData.value.remark = '';
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