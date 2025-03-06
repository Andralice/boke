<template>
    <div class="addstore-body">
      <h1>新增仓库</h1>
  
      <!-- 第一组输入 -->
      <div class="addsotre_container">
        <div class="addsotre-group">
          <label for="仓库名称">仓库名称</label>
          <input type="text" id="仓库名称" placeholder="请输入仓库名称" v-model="formData.stashName">
        </div>
        <div class="addsotre-group">
          <label for="仓库地址">仓库地址</label>
          <input type="text" id="仓库地址" placeholder="请输入仓库地址" v-model="formData.stashAddress">
        </div>
        <div class="addsotre-group">
          <label for="仓库联系人">仓库联系人</label>
          <input type="text" id="仓库联系人" placeholder="请输入仓库联系人" v-model="formData.managerName">
        </div>
      </div>
  
      <!-- 第二组输入 -->
      <div class="addsotre_container">
        <div class="addsotre-group">
          <label for="存储温度">存储温度</label>
          <select id="存储温度" v-model="formData.storageTemperature">
            <option value="">请选择存储温度</option>
            <option value="-20°~0°">冷藏：-20°~0°</option>
            <option value="0°~20°">阴凉： 0°~20°</option>
            <option value="20°~40°">常温： 20°~40°</option>
          </select>
        </div>
        <div class="addsotre-group">
          <label for="仓库面积">仓库面积</label>
          <input type="text" id="仓库面积" placeholder="请输入仓库面积" v-model="formData.stashArea">
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
        <textarea id="note-input" placeholder="在这里输入您的备注..." v-model="formData.remark"></textarea>
      </div>
    </div>
          <!-- 提交按钮 -->
          <div class="addstore-button">
        <button @click="submitForm">提交</button>
      </div>
  </template>
  
  <script lang="ts" setup name='CreateWarehouse'>
  import { ref } from 'vue';
  import {createStash} from '@/api/stash/stash';
  
  interface FormData {
    stashName: string; // stashName
    stashAddress: string; //stashAddress
    managerName: string; // managerName
    stashArea: string; // stashArea
    storageTemperature: string; // storageTemperature
    remark: string; // remark
  }
  
  const formData = ref<FormData>({
    stashName: '',
    stashAddress: '',
    managerName: '',
    stashArea: '',
    storageTemperature: '',
    remark: ''
  });
  
  // console.log('66666666FormData:', formData.value);
  
  const submitForm = async () => {
    try {
      // 发送请求
      const response = await createStash( formData.value);

      // alert(`创建成功！仓库ID: ${response.data.id}`);
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
    formData.value.remark  = '';
  }
  
  </script>
  
  <style scoped>
  .addstore-body {
    width: 100%;
    height: 80%;
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
    position: fixed; /* 作为定位基准 */
    right: 80px;
    bottom: 20px;
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