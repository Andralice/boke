<template>
    <div class="showStore-body">
      <h1>库存概览</h1>
  
      <!-- 搜索容器 -->
      <div class="search-container">
        <div class="search-group">
          <label for="仓库名称">仓库名称</label>
          <select id="仓库名称" v-model="formData.仓库名称">
            <option value="">请选择仓库名称</option>
            <option value="仓库A">仓库A</option>
            <option value="仓库B">仓库B</option>
            <option value="仓库C">仓库C</option>
          </select>
        </div>
        <div class="search-group">
          <label for="仓库联系人">仓库联系人</label>
          <select id="仓库联系人" v-model="formData.仓库联系人">
            <option value="">请选择仓库联系人</option>
            <option value="联系人A">联系人A</option>
            <option value="联系人B">联系人B</option>
            <option value="联系人C">联系人C</option>
          </select>
        </div>
        <div class="search-group">
          <label for="供货商">供货商</label>
          <select id="供货商" v-model="formData.供货商">
            <option value="">请选择供货商</option>
            <option value="供货商A">供货商A</option>
            <option value="供货商B">供货商B</option>
            <option value="供货商C">供货商C</option>
          </select>
        </div>
        <div class="search-group">
          <label for="货物名称">货物名称</label>
          <input type="text" id="货物名称" placeholder="请输入货物名称" v-model="formData.货物名称">
        </div>
        <div class="search-group">
          <label for="货物编号">货物编号</label>
          <input type="text" id="货物编号" placeholder="请输入货物编号" v-model="formData.货物编号">
        </div>
        <div class="search-group">
          <label for="入库时间">入库时间</label>
          <input type="text" id="入库时间" placeholder="请输入入库时间" v-model="formData.入库时间">
        </div>
        <div class="search-group">
          <label for="存储温度">存储温度</label>
          <select id="存储温度" v-model="formData.存储温度">
            <option value="">请选择存储温度</option>
            <option value="-20°~0°">冷藏：-20°~0°</option>
            <option value="0°~20°">阴凉： 0°~20°</option>
            <option value="20°~40°">常温： 20°~40°</option>
          </select>
        </div>
        <!-- 查询和新增按钮放在同一行 -->
        <div class="search-group button-group">
          <button @click="performQuery">查询</button>
          <button @click="navigateToAddPage">新增</button>
        </div>
      </div>
  
      <!-- 内容区 -->
      <div class="nav-body">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>货物图片</th>
              <th>货物名称</th>
              <th>货物数量</th>
              <th>储存温度</th>
              <th>入库时间</th>
              <th>存储时间</th>
              <th>剩余时间</th>
              <th>仓库地址</th>
              <th>联系人</th>
              <th>联系电话</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedData" :key="index">
              <td>{{ (currentPage - 1) * rowsPerPage + index + 1 }}</td>
              <td><img :src="item.goodsImage" alt="Goods Image" style="width: 50px; height: 50px;"></td>
              <td>{{ item.goodsName }}</td>
              <td>{{ item.goodsQuantity }}</td>
              <td>{{ item.storageTemperature }}</td>
              <td>{{ item.inboundTime }}</td>
              <td>{{ item.storageTime }}</td>
              <td>{{ item.remainingTime }}</td>
              <td>{{ item.warehouseAddress }}</td>
              <td>{{ item.contactPerson }}</td>
              <td>{{ item.contactPhone }}</td>
              <td><button @click="editItem(item)">编辑</button></td>
            </tr>
            <tr v-if="paginatedData.length === 0">
              <td colspan="12" class="no-data">无数据</td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
      </div>
    </div>
  </template>
<script lang="ts" setup name='showStore'>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import dataJson from '@/pages/Store/ShowStore/showStore.json';


const router = useRouter(); // 初始化router

interface FormData {
    仓库名称: string;
    仓库地址: string;
    仓库联系人: string;
    货物名称: string;
    货物编号: string;
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
    货物编号: '',
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
    warehouseAddress: string;
    contactPerson: string;
    contactPhone: string;
}

const data = ref<Item[]>([]);
const currentPage = ref(1);
const rowsPerPage = 10;

const fetchData = async () => {
    data.value = dataJson.data as Item[];
};

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(data.value.length / rowsPerPage));

const changePage = (page: number) => {
    currentPage.value = page;
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const editItem = (item: Item) => {
    router.push('/editStore'); // 跳转到指定页面
    console.log("Edit item:", item);
};

const navigateToAddPage = () => {
    router.push('/addStore'); // 跳转到指定页面
};


onMounted(() => {
    fetchData();
});
</script>

<style scoped>
.showStore-body {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  font-weight: 600;
}

.search-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin-bottom: 20px;
}

.search-container:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.search-group {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 250px;
  max-width: calc(33% - 20px); /* 确保每行最多三个输入组 */
}

.search-group label {
  font-weight: 500;
  width: 120px;
  margin-right: 10px;
  color: #555;
}

.search-group select,
.search-group input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s ease;
  font-size: 14px;
  color: #333;
  max-width: calc(100% - 130px); /* 确保输入框不会超出容器 */
  background-color: #f9f9f9; /* 背景颜色比容器颜色略暗 */
}

.search-group button {
  padding: 10px 20px;
  background-color: #e0e0e0; /* 不鲜艳的颜色 */
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.search-group button:hover {
  background-color: #d0d0d0;
}

/* 按钮组特殊样式 */
.button-group {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  flex-basis: 100%; /* 占据整行 */
  margin-top: 10px; /* 添加间距 */
}

.nav-body {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.nav-body:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: 500;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #999;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 5px;
  padding: 8px 12px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.pagination button:hover {
  background-color: #f1f1f1;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
}
</style>