<template>
    <div class="addstore-body">
      <h1>新增库存</h1>
  
      <!-- 新增仓库输入框模块 -->
      <div class="new-stash-container">
        <h2>新增库存信息</h2>
        <div class="stash-input-row">
          <div class="stash-input-group">
            <label for="商品名称">商品名称</label>
            <input type="text" id="商品名称" placeholder="请输入商品名称" v-model="formData.productName">
          </div>
          <div class="stash-input-group">
            <label for="仓库名称">仓库名称</label>
            <input type="text" id="仓库名称" placeholder="请输入仓库名称" v-model="formData.stashName">
          </div>
          <div class="stash-input-group">
            <label for="供货商名称">供货商名称</label>
            <input type="text" id="供货商名称" placeholder="请输入供货商名称" v-model="formData.supplierName">
          </div>
        </div>
        <div class="stash-input-row">
          <div class="stash-input-group">
            <label for="修改方式">修改方式</label>
            <select id="修改方式" v-model="formData.type">
              <option value="">请选择修改方式</option>
              <option value="add">添加</option>
              <option value="sub">减少</option>
            </select>
          </div>
          <div class="stash-input-group">
            <label for="修改数量">修改数量</label>
            <input type="text" id="修改数量" placeholder="请输入修改数量" v-model="formData.quantity">
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
  
  <script lang="ts" setup name='createInventory'>
  import { ref } from 'vue';
  import { createInventory } from '@/api/inventory/inventory';
  import { useRouter, useRoute } from 'vue-router'; // 新增路由依赖
  
  interface FormData {
    productName : string; 
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