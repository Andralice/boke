<template>
    <div class="addstore-body">
        <h1>编辑库存</h1>
        <div class="addsotre_container">
            <div class="addsotre-group">
                <label for="仓库名称">仓库名称</label>
                <select id="仓库名称" v-model="formData.仓库名称">
                    <option value="">请选择仓库名称</option>
                    <option value="仓库A">仓库A</option>
                    <option value="仓库B">仓库B</option>
                    <option value="仓库C">仓库C</option>
                </select>
            </div>
            <div class="addsotre-group">
                <label for="仓库地址">仓库地址</label>
                <select id="仓库地址" v-model="formData.仓库地址">
                    <option value="">请选择仓库地址</option>
                    <option value="地址A">地址A</option>
                    <option value="地址B">地址B</option>
                    <option value="地址C">地址C</option>
                </select>
            </div>
            <div class="addsotre-group">
                <label for="仓库联系人">仓库联系人</label>
                <select id="仓库联系人" v-model="formData.仓库联系人">
                    <option value="">请选择仓库联系人</option>
                    <option value="联系人A">联系人A</option>
                    <option value="联系人B">联系人B</option>
                    <option value="联系人C">联系人C</option>
                </select>
            </div>
        </div>
        <div class="addsotre_container">
            <div class="addsotre-group">
                <label for="货物名称">货物名称</label>
                <input type="text" id="货物名称" placeholder="请输入货物名称" v-model="formData.货物名称">
            </div>
            <div class="addsotre-group">
                <label for="货物数量">货物数量</label>
                <input type="text" id="货物数量" placeholder="请输入货物数量" v-model="formData.货物数量">
            </div>
            <div class="addsotre-group">
                <label for="入库时间">入库时间</label>
                <div class="time-input-container">
                    <input type="text" id="入库时间" placeholder="请输入入库时间" v-model="formData.入库时间">
                    <button @click="setCurrentTime">现在</button>
                </div>
            </div>
            <div class="addsotre-group">
                <label for="供货商">供货商</label>
                <select id="供货商" v-model="formData.供货商">
                    <option value="">请选择供货商</option>
                    <option value="供货商A">供货商A</option>
                    <option value="供货商B">供货商B</option>
                    <option value="供货商C">供货商C</option>
                </select>
            </div>
        </div>
        <div class="addsotre_container">
            <div class="addsotre-group">
                <label for="存储时间">存储时间</label>
                <input type="text" id="存储时间" placeholder="请输入存储时间" v-model="formData.存储时间">
            </div>
            <div class="addsotre-group">
                <label for="存储温度">存储温度</label>
                <select id="存储温度" v-model="formData.存储温度">
                    <option value="">请选择存储温度</option>
                    <option value="-20°~0°">-20°~0°</option>
                    <option value="0°~20°"> 0°~20°</option>
                    <option value="20°~40°">20°~40°</option>
                    <option value="20°~40°">40°+</option>
                </select>
            </div>
        </div>
        <div class="addsotre_container">
            <div class="addsotre-group">
                <label for="imageInput">上传货物图片</label>
                <input type="file" id="imageInput" accept="image/*" multiple @change="handleFileChange">
                <br>
                <div class="preview-container">
                    <div v-for="(preview, index) in previews" :key="index" class="preview-item">
                        <img :src="preview" alt="Preview" class="preview-image">
                    </div>
                </div>
            </div>
        </div>
        <div class="note-container">
            <div class="header">
                <h2>添加备注</h2>
                <button class="note-button" onclick="clearNote()">清除备注</button>
            </div>
            <textarea id="note-input" placeholder="在这里输入您的备注..."></textarea>
        </div>
    </div>
    <div class="addstore-button">
        <button>提交</button>
    </div>
</template>

<script lang="ts" setup name='editStore'>
import { ref, onMounted } from 'vue';
import dataJson from '@/pages/Store/EditStore/editStore.json';

interface FormData {
    仓库名称: string;
    仓库地址: string;
    仓库联系人: string;
    货物名称: string;
    货物数量: string;
    入库时间: string;
    供货商: string;
    存储时间: string;
    存储温度: string;
}

const formData = ref<FormData>({
    仓库名称: '',
    仓库地址: '',
    仓库联系人: '',
    货物名称: '',
    货物数量: '',
    入库时间: '',
    供货商: '',
    存储时间: '',
    存储温度: ''
});

interface Item {
    goodsImage: string;
    goodsName: string;
    goodsQuantity: number;
    storageTemperature: string;
    inboundTime: string;
    storageTime: string;
    remainingTime: string;
    warehouseName:string;
    warehouseAddress: string;
    contactPerson: string;
    contactPhone: string;
    supplier:string;
}

const previews = ref<string[]>([]);

const editData = ref<Item>();
console.log('111111');
console.log(dataJson.data);
const fetchData = () => {
    editData.value = dataJson.data;
};

function setCurrentTime() {
    const now = new Date();
    const formattedTime = now.toLocaleString(); // 获取当前时间并格式化
    formData.value.入库时间 = formattedTime;
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

onMounted(() => {
    // 填充表单数据
    fetchData();
    console.log('editData after fetchData:', editData.value); // 添加日志
    if (editData.value) {
        formData.value.仓库名称 = editData.value.warehouseName;
        formData.value.仓库地址 = editData.value.warehouseAddress;
        formData.value.仓库联系人 = editData.value.contactPerson;
        formData.value.货物名称 = editData.value.goodsName;
        formData.value.货物数量 = editData.value.goodsQuantity.toString();
        formData.value.入库时间 = editData.value.inboundTime;
        formData.value.供货商 = editData.value.supplier; 
        formData.value.存储时间 = editData.value.storageTime;
        formData.value.存储温度 = editData.value.storageTemperature;
        console.log('formData after binding:', formData.value); // 添加日志
    } else {
        console.error('editData is undefined');
    }
});
</script>

<style scoped>
.addstore-body {
    width: 100%;
    height: 95%;
    background-color: white;
}

.h1 {
    margin: 40px;
}

.addsotre_container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    flex-direction: row;
    gap: 20px;
    padding-bottom: 40px;
}

.addsotre-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

label {
    margin-bottom: 5px;
}

select, input {
    cursor: pointer;
    width: 200px;
    padding: 5px;
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
    padding: 3px;
    background-color: black;
    border-color: black;
    color: white;
}

.time-input-container button:hover {
    cursor: pointer;
    background-color: blue;
    border-color: blue;
}

.addstore-button {
    align-items: flex-end;
    display: flex;
    justify-content: flex-end;
}

.addstore-button button {
    width: 250px;
    height: 50px;
    position: absolute;
    right: 40px;
    bottom: 40px;
    color: white;
    background-color: black;
    border-color: white;
    border-radius: 5px;
}

.addstore-button button:hover {
    cursor: pointer;
    background-color: blue;
    border-color: blue;
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
}
.note-container {
    height: 100px;
    width: 80%;
    border-radius: 8px;
}
.header {
    display: flex;
    justify-content: flex-start;    
}
textarea {
    width: 100%;
    height: 140px;
    resize: vertical;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 14px;
}
.note-button {
    /* width: 100px ; */
    margin-left: 10px;
    margin-top: 18px;
    height: 40px;
    align-items: center;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 2px;
    font-size: 12px;
}
button:hover {
    cursor: pointer;
    background-color: #0056b3;
}
</style>



