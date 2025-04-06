<template>
  <div class="showStore-body">
    <h1>库存记录</h1>
    <!-- 筛选表单 -->
    <div class="filters">
      <div class="filter-row">
        <div class="filter-group">
          <label>商品名称</label>
          <input type="text" v-model="formData.productName">
        </div>
        <div class="filter-group">
          <label>仓库名称</label>
          <input type="text" v-model="formData.stashName">
        </div>
        <div class="filter-group">
          <label>修改方式</label>
          <select v-model="formData.type">
            <option value="">全部</option>
            <option value="add">入库</option>
            <option value="sub">出库</option>
          </select>
        </div>


      </div>
      <div class="filter-row">
        <button class="search-btn" @click="loadData">搜索</button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>商品名称</th>
            <th>仓库名称</th>
            <th>供应商名称</th>
            <th>修改方式</th>
            <th>修改数量</th>
            <th>创建时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="item.inventoryId">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.stashName }}</td>
            <td>{{ item.supplierName }}</td>
            <td>{{ item.type === "add" ? '入库' : '出库' }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ formatDate(item.lastStockTime) }}</td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td colspan="7" class="no-data">暂无数据</td>
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

<script lang="ts" setup name="showAllInventoryLog">
import { ref, computed, onMounted } from 'vue';
import { selectAllInventoryLog } from '@/api/inventory/inventory';

interface InventoryItem {
  inventoryId: number;
  productName: string;
  stashName: string;
  supplierName: string;
  type: string;
  quantity: number;
  remark: string;
  lastStockTime: string;
}

const formData = ref({
  productName: '',
  stashName: '',
  type: ''
});

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const pageList = ref<InventoryItem[]>([]);

// 计算属性
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
const paginatedData = computed(() =>
  pageList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
);

// 初始化加载数据
onMounted(() => {
  loadData();
});

// 加载数据方法
const loadData = async () => {
  try {
    const params = {
      ...formData.value
    };

    const response = await selectAllInventoryLog(params);

    if (response.result && Array.isArray(response.result)) {
      pageList.value = response.result;
      totalItems.value = response.total || response.result.length; // 确保总条目数至少为0
    } else {
      console.error('无效的数据格式:', response);
      pageList.value = [];
      totalItems.value = 0;
    }
  } catch (error) {
    console.error('加载数据失败:', error);
    pageList.value = [];
    totalItems.value = 0;
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

// 工具方法
const formatDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString();
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

select,
input {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 200px;
}

.search-btn,
.add-btn {
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
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
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