<template>
  <div class="showStore-body">
    <h1>库存记录</h1>
    <!-- 筛选表单 -->
    <el-form :model="formData" label-width="100px" size="medium" inline>
      <el-form-item label="商品名称">
        <el-input v-model="formData.productName" placeholder="请输入商品名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="仓库名称">
        <el-input v-model="formData.stashName" placeholder="请输入仓库名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="修改方式">
        <el-select v-model="formData.type" clearable placeholder="请选择修改方式" style="width: 200px;">
          <el-option label="全部" value=""></el-option>
          <el-option label="入库" value="add"></el-option>
          <el-option label="出库" value="sub"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">搜索</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table :data="paginatedData" style="width: 100%" border stripe>
      <el-table-column prop="index" label="序号" width="60" align="center">
        <template #default="{ $index }">
          {{ (currentPage - 1) * pageSize + $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="商品名称" min-width="150"></el-table-column>
      <el-table-column prop="stashName" label="仓库名称" min-width="150"></el-table-column>
      <el-table-column prop="supplierName" label="供应商名称" min-width="150"></el-table-column>
      <el-table-column prop="type" label="修改方式" width="120" align="center">
        <template #default="{ row }">
          {{ row.type === "add" ? '入库' : '出库' }}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="修改数量" width="120" align="right"></el-table-column>
      <el-table-column prop="lastStockTime" label="创建时间" width="150" align="center">
        <template #default="{ row }">
          {{ formatDate(row.lastStockTime) }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页控件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalItems"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; display: flex; justify-content: center;"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup name="showAllInventoryLog">
import { ref, computed, onMounted } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElTable, ElTableColumn, ElPagination } from 'element-plus';
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
const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  loadData();
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
.el-form-item {
  margin-right: 20px;
}
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
</style>



