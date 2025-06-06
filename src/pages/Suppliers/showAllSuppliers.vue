<template>
  <div class="showStore-body">
    <h1>供应商概览</h1>
    <!-- 筛选表单 -->
    <div class="filters">
      <div class="filter-row">
        <div class="filter-group">
          <label>供应商名称</label>
          <input type="text" v-model="formData.supplierName" placeholder="请输入供应商名称">
        </div>
        <div class="filter-group">
          <label>联系人名称</label>
          <input type="text" v-model="formData.contactName" placeholder="请输入联系人名称">
        </div>
        <div class="filter-group">
          <label>联系人电话</label>
          <input type="text" v-model="formData.contactPhone" placeholder="请输入联系人电话">
        </div>
        <div class="filter-group">
          <label>供应商状态</label>
          <select v-model="formData.cooperationStatus">
            <option value="">全部</option>
            <option value="1">启用</option>
            <option value="0">禁用</option>
          </select>
        </div>
      </div>
      <div class="filter-row">
        <button class="search-btn" @click="loadData">搜索</button>
        <button class="add-btn" @click="navigateToAddPage">新增供应商</button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th class="one">序号</th>
            <th>供应商名称</th>
            <th>联系人名称</th>
            <th>联系人电话</th>
            <th>供应商地址</th>
            <th>银行卡号</th>
            <th>供应商状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="item.supplierId">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ item.supplierName }}</td>
            <td>{{ item.contactName }}</td>
            <td>{{ item.contactPhone }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.bankAccount }}</td>
            <td>{{ item.cooperationStatus ? '启用' : '禁用' }}</td>
            <td class="action-buttons">
              <button @click="checkItem(item)" class="check-btn">查看</button>
              <button @click="editItem(item)" class="edit-btn">编辑</button>
              <button @click="deleteItem(item)" class="delete-btn">删除</button>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td colspan="8" class="no-data">暂无数据</td>
          </tr>
        </tbody>
      </table>

      <!-- 分页控件 -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </div>

    <!-- 到期商品弹窗 -->
    <div v-if="checkProduct" class="modal-overlay" @click="checkProduct = false">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="checkProduct = false">&times;</span>
        <h4>供应商品列表</h4>
        <table>
          <thead>
            <tr>
              <th>商品名称</th>
              <th>仓库</th>
              <th>供应商</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in paginatedpageList" :key="index">
              <td>{{ product.productName }}</td>
              <td>{{ product.stashName }}</td>
              <td>{{ product.supplierName }}</td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="prevNoTimePage" :disabled="currentCheckPage === 1">上一页</button>
          <span>第 {{ currentCheckPage }} 页 / 共 {{ noTimeTotalPages }} 页</span>
          <button @click="nextNoTimePage" :disabled="currentCheckPage === noTimeTotalPages">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="showAllSuppliers">
import { ref, computed, onMounted } from 'vue';
import { selectAllSuppliers, deleteSuppliersById } from '@/api/suppliers/suppliers';
import { selectAllProduct } from '@/api/product/product';
import { useRouter } from 'vue-router';

interface FormData {
  supplierId?: number;
  supplierName: string;
  contactName: string;
  contactPhone: string;
  address: string;
  bankAccount: string;
  cooperationStatus: number;
  remark: string;
}

interface Product {
  productName: string;
  stashName: string;
  supplierName: string;
  daysLeft: number;
}

const router = useRouter();

const checkProduct = ref(false);

// 查看商品分页
const currentCheckPage = ref(1);
const CheckPageSize = ref(5);
const pageList = ref<Product[]>([]);
const noTimeTotalPages = computed(() => Math.ceil(pageList.value.length / CheckPageSize.value));
const paginatedpageList = computed(() =>
  pageList.value.slice((currentCheckPage.value - 1) * CheckPageSize.value, currentCheckPage.value * CheckPageSize.value)
);

// 表单数据
const formData = ref({
  supplierName: '',
  contactName: '',
  contactPhone: '',
  cooperationStatus: ""
});

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0); // 初始化为0
const suppliersList = ref<FormData[]>([]);

// 计算属性
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
const paginatedData = computed(() => suppliersList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value));

// 初始化加载数据
onMounted(() => {
  loadData();
});

// 加载数据方法
const loadData = async () => {
  try {
    // 过滤掉空值字段
    const params = Object.fromEntries(
      Object.entries(formData.value).filter(([key, value]) => value !== '' && value !== null)
    );
    const response = await selectAllSuppliers(params);

    if (response.result && Array.isArray(response.result)) {
      suppliersList.value = response.result;
      totalItems.value = response.total || response.result.length; // 确保总条目数至少为0
    } else {
      console.error('无效的数据格式:', response);
      suppliersList.value = [];
      totalItems.value = 0;
    }
  } catch (error) {
    console.error('加载数据失败:', error);
    suppliersList.value = [];
    totalItems.value = 0;
  }
};

// 分页操作
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

// 页面跳转
const navigateToAddPage = () => {
  router.push('/createSuppliers');
};

const editItem = (item: FormData) => {
  router.push(`/updateSuppliers/${item.supplierId}`);
};

const deleteItem = async (item: FormData) => {
  if (item.supplierId !== undefined) {
    try {
      const response = await deleteSuppliersById(item.supplierId); // 调用删除接口
      console.log('删除成功！', response);
      loadData(); // 刷新列表
    } catch (error) {
      console.error('Error deleting supplierId', error);
      alert('删除失败，请检查网络或联系管理员');
    }
  } else {
    alert('未找到供应商ID');
  }
};

const checkItem = async (item: FormData) => {
  const params = {
    supplierName: item.supplierName
  };
  try {
    const response = await selectAllProduct(params);
    pageList.value = response.result;
    totalItems.value = response.total || pageList.value.length;
    checkProduct.value = true;
  } catch (error) {
    console.log(error);
  }
};

const prevNoTimePage = () => {
  if (currentCheckPage.value > 1) {
    currentCheckPage.value--;
  }
};

const nextNoTimePage = () => {
  if (currentCheckPage.value < noTimeTotalPages.value) {
    currentCheckPage.value++;
  }
};
</script>








<style scoped>
.showStore-body {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  background-color: #f9fafb;
  /* 浅色背景 */
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.filters {
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
  }
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  /* 减少标签和输入框之间的间距 */
  flex-basis: calc(33.33% - 16px);
}

.filter-group label {
  min-width: 100px;
  color: #555;
  font-weight: 500;
}

select,
input {
  padding: 10px 16px;
  /* 缩小输入框的内边距 */
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  width: 100%;
  transition: border-color 0.3s ease;
  font-size: 14px;
  color: #333;
}

select:focus,
input:focus {
  border-color: #409eff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.3);
}

.search-btn,
.add-btn {
  padding: 10px 20px;
  /* 缩小按钮的内边距 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 14px;
  color: white;
}

.search-btn {
  background: #409eff;
}

.search-btn:hover {
  background: #357ae8;
  transform: translateY(-2px);
}

.add-btn {
  background: #67c23a;
  margin-left: auto;
}

.add-btn:hover {
  background: #5daf34;
  transform: translateY(-2px);
}

.data-table {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 16px;
  /* 缩小单元格的内边距 */
  ;
  text-align: left;
  border-bottom: 1px solid #ebebeb;
  font-size: 14px;
  color: #333;
}

th {
  min-width: 80px;
  background: #f5f7fa;
  /* 标识栏背景色与展示框一致 */
  font-weight: 600;
  color: #333;
}

tr:nth-child(even) {
  background: #fcfcfd;
}

tr:hover {
  background: #f5f7fa;
}

.action-buttons {
  display: flex;

  gap: 8px;
}

.edit-btn,
.delete-btn,
.check-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 14px;
  color: white;
}

.edit-btn {
  background: #409eff;
}

.edit-btn:hover {
  background: #357ae8;
  transform: translateY(-2px);
}

.delete-btn {
  background: #ff4d4f;
}

.delete-btn:hover {
  background: #ff4544;
  transform: translateY(-2px);
}

.check-btn {
  background: #67c23a
}

.check-btn:hover {
  background: #67c23a;
  transform: translateY(-2px);
}


.pagination {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.pagination button {
  padding: 10px 20px;
  /* 缩小分页按钮的内边距 */
  border: 1px solid #ddd;
  background: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  font-size: 14px;
  color: #333;
}

.pagination button:hover {
  background: #f5f5f5;
  border-color: #aaa;
  transform: translateY(-2px);
}

.pagination button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 24px;
  font-size: 14px;
}

.modal-content h4 {
  font-family: 'Merriweather', serif;
  /* 使用Merriweather字体作为标题 */
  font-weight: 700;
  /* 字体粗细为700，相当于bold */
  margin-top:0;
  /* 标题顶部外边距为0 */
  text-align: center;
  /* 标题居中 */
  font-size: 1.5em;
  /* 添加这一行来设置字体大小 */
}

/* 背景遮罩层 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(33, 37, 41, 0.6);
  /* 更深的半透明背景色 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 关闭按钮 */
.close-button {
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  background: none;
  border: none;
}

/* 弹窗内容 */
.modal-content {
  background-color: #ffffff;
  border-radius: 12px;
  /* 增大圆角 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  /* 加强阴影效果 */
  padding: 30px;
  max-width: 800px;
  width: 100%;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  /* 确保子元素垂直排列 */
  align-items: center;
  /* 子元素水平居中 */
}

/* 表格样式 */
.modal-content table {
  width: 100%;
  /* 确保表格宽度充满其容器 */
  margin-top: 20px;
  border-collapse: collapse;
  text-align: center;
  /* 表格内容居中 */
}

.modal-content th,
.modal-content td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.modal-content th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.modal-content tr:hover {
  background-color: #f1f1f1;
}

/* 过期商品特殊样式 */
.modal-content .expired {
  color: red;
  font-weight: bold;
}

/* 分页按钮 */
.modal-content .pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin-top: 20px;
}

.modal-content .pagination button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Roboto', sans-serif;
  /* 确保按钮文字也使用相同的字体 */
}

.modal-content .pagination button[disabled] {
  background-color: #cccccc;
  cursor: not-allowed;
}

.modal-content .pagination button:hover {
  background-color: #0056b3;
}
</style>
