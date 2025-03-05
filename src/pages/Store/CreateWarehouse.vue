<template>
    <div class="addstore-body">
      <h1>新增仓库</h1>
  
      <!-- 第一组输入 -->
      <div class="addsotre_container">
        <div class="addsotre-group">
          <label for="仓库名称">仓库名称</label>
          <input type="text" id="仓库名称" placeholder="请输入仓库名称" v-model="formData.仓库名称">
        </div>
        <div class="addsotre-group">
          <label for="仓库地址">仓库地址</label>
          <input type="text" id="仓库地址" placeholder="请输入仓库地址" v-model="formData.仓库地址">
        </div>
        <div class="addsotre-group">
          <label for="开放时间">开放时间</label>
          <div class="time-input-container">
            <input type="text" id="开放时间" placeholder="请输入开放时间" v-model="formData.开放时间">
            <button @click="setCurrentTime">现在</button>
          </div>
        </div>
        <div class="addsotre-group">
          <label for="仓库联系人">仓库联系人</label>
          <input type="text" id="仓库联系人" placeholder="请输入仓库联系人" v-model="formData.仓库联系人">
        </div>
      </div>
  
      <!-- 第二组输入 -->
      <div class="addsotre_container">
        <div class="addsotre-group">
          <label for="存储温度">存储温度</label>
          <select id="存储温度" v-model="formData.存储温度">
            <option value="">请选择存储温度</option>
            <option value="-20°~0°">冷藏：-20°~0°</option>
            <option value="0°~20°">阴凉： 0°~20°</option>
            <option value="20°~40°">常温： 20°~40°</option>
          </select>
        </div>
        <div class="addsotre-group">
          <label for="仓库面积">仓库面积</label>
          <input type="text" id="仓库面积" placeholder="请输入仓库面积" v-model="formData.仓库面积">
        </div>
        <div class="addsotre-group">
          <label for="货架数量">货架数量</label>
          <input type="text" id="货架数量" placeholder="请输入货架数量" v-model="formData.货架数量">
        </div>
      </div>
  
      <!-- 图片上传 -->
      <div class="addsotre_container">
        <div class="addsotre-group">
          <label for="imageInput">上传仓库图片</label>
          <input type="file" id="imageInput" accept="image/*" multiple @change="handleFileChange">
          <br>
          <div class="preview-container">
            <div v-for="(preview, index) in previews" :key="index" class="preview-item">
              <img :src="preview" alt="Preview" class="preview-image">
            </div>
          </div>
        </div>
      </div>
  
      <!-- 备注 -->
      <div class="note-container">
        <div class="header">
          <h2>添加备注</h2>
          <button class="note-button" @click="clearNote()">清除备注</button>
        </div>
        <textarea id="note-input" placeholder="在这里输入您的备注..." v-model="formData.备注"></textarea>
      </div>
  
      <!-- 提交按钮 -->
      <div class="addstore-button">
        <button @click="submitForm">提交</button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup name='CreateWarehouse'>
  import { ref, } from 'vue';
  
  interface FormData {
    仓库名称: string;
    仓库地址: string;
    仓库联系人: string;
    开放时间: string;
    仓库面积: string;
    货架数量: string;
    存储温度: string;
    备注: string;
  }
  
  const formData = ref<FormData>({
    仓库名称: '',
    仓库地址: '',
    仓库联系人: '',
    开放时间: '',
    仓库面积: '',
    货架数量: '',
    存储温度: '',
    备注: ''
  });
  
  const previews = ref<string[]>([]);
  
  function setCurrentTime() {
    const now = new Date();
    const formattedTime = now.toLocaleString(); // 获取当前时间并格式化
    formData.value.开放时间 = formattedTime;
  }
  
  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      previews.value = [];
      for (let i = 0; i < target.files.length; i++) {
        const file = target.files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
          if (e.target?.result) {
            previews.value.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
  
  function clearNote() {
    formData.value.备注 = '';
  }
  
  function submitForm() {
    console.log('Form submitted:', formData.value);
    // 在这里可以进行表单验证和提交逻辑
  }
  </script>
  
  <style scoped>
  .addstore-body {
    width: 100%;
    height: 95%;
    background-color: white;
    padding: 20px;
    box-sizing: border-box;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .addsotre_container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 40px;
    flex-wrap: wrap;
  }
  
  .addsotre-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    min-width: 250px;
  }
  
  label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  select, input {
    cursor: pointer;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s ease;
  }
  
  select:focus, input:focus {
    border-color: #007bff;
  }
  
  .time-input-container {
    display: flex;
    align-items: center;
  }
  
  .time-input-container input {
    flex-grow: 1;
    margin-right: 5px;
  }
  
  .time-input-container button {
    width: 80px;
    padding: 8px;
    background-color: #007bff;
    border: none;
    color: white;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .time-input-container button:hover {
    background-color: #0056b3;
  }
  
  .addstore-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .addstore-button button {
    width: 250px;
    height: 50px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .addstore-button button:hover {
    background-color: #0056b3;
  }
  
  .preview-container {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* 图片之间的间距 */
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
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  textarea {
    width: 100%;
    height: 140px;
    resize: vertical;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s ease;
  }
  
  textarea:focus {
    border-color: #007bff;
  }
  
  .note-button {
    margin-left: 10px;
    height: 40px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 2px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .note-button:hover {
    background-color: #0056b3;
  }
  </style>