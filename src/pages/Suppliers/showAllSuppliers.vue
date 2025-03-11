<template>
  <div class="showStore-body">
    <h1>库存概览</h1>
    <!-- 筛选表单 -->
    <div class="filters">
      <div class="filter-row">
        <div class="filter-group">
          <label>供应商名称</label>
          <input type="text" v-model="formData.supplierName">
        </div>
        <div class="filter-group">
          <label>联系人名称</label>
          <input type="text" v-model="formData.contactName">
        </div>
        <div class="filter-group">
          <label>联系人电话</label>
          <input type="text" v-model="formData.contactPhone">
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
            <th>序号</th>
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
            <td>
              <button @click="editItem(item)">编辑</button>
            </td>
            <td>
              <button @click="deleteItem(item)">删除</button>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td colspan="9" class="no-data">暂无数据</td>
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
  </div>
</template>

<script lang="ts" setup name="showAllSuppliers">
import { ref, computed, onMounted } from 'vue';
import { selectAllSuppliers, deleteSuppliersById } from '@/api/suppliers/suppliers';
import { useRouter } from 'vue-router';

interface FormData {
  supplierId?: number;
  supplierName: string;
  contactName: string;
  contactPhone: string;
  address: string;
  bankAccount: string;
  cooperationStatus: boolean;
  remark: string;
}

const router = useRouter();

// 表单数据
const formData = ref({
  supplierName: '',
  contactName: '',
  contactPhone: ''
});

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const pageList = ref<FormData[]>([]);

// 计算属性
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
const paginatedData = computed(() => pageList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value));

// 初始化加载数据
onMounted(() => {
  loadData();
});

// 加载数据方法
const loadData = async () => {
  try {
    const params = {
      page: currentPage.value,
      size: pageSize.value,
      ...formData.value
    };

    const response = await selectAllSuppliers(params);

    pageList.value = response.result;
    totalItems.value = response.total; // 假设 response 包含 total 字段
  } catch (error) {
    console.error('加载数据失败:', error);
  }
};

// 分页操作
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadData();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadData();
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
      alert('删除成功！');
      loadData(); // 刷新列表
    } catch (error) {
      console.error('Error deleting supplierId', error);
      alert('删除失败，请检查网络或联系管理员');
    }
  } else {
    alert('未找到仓库ID');
  }
};
</script>

<style scoped>
.showStore-body {
padding: 20px;
max-width: 1200px;
margin: 0 auto;
}

.filters {
background: #f5f7fa;
padding: 20px;
border-radius: 8px;
margin-bottom: 20px;
}

.filter-row {
display: flex;
gap: 20px;
margin-bottom: 15px;
}

.filter-group {
display: flex;
align-items: center;
gap: 10px;
}

.filter-group label {
min-width: 80px;
}

select, input {
padding: 8px 12px;
border: 1px solid #dcdfe6;
border-radius: 4px;
width: 200px;
}

.search-btn, .add-btn {
padding: 10px 20px;
border: none;
border-radius: 4px;
cursor: pointer;
}

.search-btn {
background: #409eff;
color: white;
}

.add-btn {
background: #67c23a;
color: white;
margin-left: auto;
}

.data-table {
background: white;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

table {
width: 100%;
border-collapse: collapse;
}

th, td {
padding: 12px 15px;
text-align: left;
border-bottom: 1px solid #ebeef5;
}

th {
background: #fafafa;
font-weight: 600;
}

tr:hover {
background: #f5f7fa;
}

.pagination {
padding: 15px;
display: flex;
align-items: center;
justify-content: center;
gap: 15px;
}

.pagination button {
padding: 8px 16px;
border: 1px solid #ddd;
background: white;
cursor: pointer;
}

.pagination button:disabled {
opacity: 0.6;
cursor: not-allowed;
}

.no-data {
text-align: center;
color: #909399;
padding: 20px;
}
</style>
