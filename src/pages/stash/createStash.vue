<template>
  <div class="addstore-body">
    <h1>新增仓库</h1>

    <!-- 新增仓库输入框模块 -->
    <div class="new-stash-container">
      <h2>新增仓库信息</h2>
      <div class="stash-input-row">
        <div class="stash-input-group">
          <label for="仓库名称">仓库名称</label>
          <input type="text" id="仓库名称" placeholder="请输入仓库名称" v-model="formData.stashName">
        </div>
        <div class="stash-input-group">
          <label for="仓库地址">仓库地址</label>
          <input type="text" id="仓库地址" placeholder="请输入仓库地址" v-model="formData.stashAddress">
        </div>
        <div class="stash-input-group">
          <label for="仓库联系人">仓库联系人</label>
          <input type="text" id="仓库联系人" placeholder="请输入仓库联系人" v-model="formData.managerName">
        </div>
      </div>
      <div class="stash-input-row">
        <div class="stash-input-group">
          <label for="存储温度">存储温度</label>
          <select id="存储温度" v-model="formData.storageTemperature">
            <option value="">请选择存储温度</option>
            <option value="-20°~0°">冷藏：-20°~0°</option>
            <option value="0°~20°">阴凉： 0°~20°</option>
            <option value="20°~40°">常温： 20°~40°</option>
          </select>
        </div>
        <div class="stash-input-group">
          <label for="仓库面积">仓库面积</label>
          <input type="text" id="仓库面积" placeholder="请输入仓库面积" v-model="formData.stashArea">
        </div>
        <div class="stash-input-group">
          <label for="imageInput">上传仓库图片</label>
          <input type="file" id="imageInput" accept="image/*" multiple @change="handleFileChange">
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

<script lang="ts" setup name='CreateWarehouse'>
import { ref } from 'vue';
import { createStash } from '@/api/stash/stash';

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
    const response = await createStash(formData.value);
    alert("提交成功！"+response.message)
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