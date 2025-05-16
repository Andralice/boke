<template>
  <div class="showStore-body">
     <h1 class="inventory-audit-title">库存列表</h1>
    <!-- 筛选表单 -->
    <el-form :model="formData" label-width="100px" size="medium" inline>
      <el-form-item label="商品名称">
        <el-input v-model="formData.productName" placeholder="请输入商品名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="仓库名称">
        <el-input v-model="formData.stashName" placeholder="请输入仓库名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">搜索</el-button>
        <el-button type="success" @click="navigateToAddPage">新增库存</el-button>
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
      <el-table-column prop="quantity" label="数量" width="120" align="right"></el-table-column>
      <el-table-column prop="lastStockTime" label="更新时间" width="150" align="center">
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

<script lang="ts" setup name="showAllProduct">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { selectAllInventory } from '@/api/inventory/inventory';

interface FormData {
  inventoryId?: number;
  productName: string;
  stashName: string;
  supplierName: string;
  quantity?: number;
  remark: string;
  lastStockTime: string;
}

const formData = ref<FormData>({
  productName: '',
  stashName: '',
  supplierName: '',
  remark: '',
  quantity: undefined,
  lastStockTime: ''
});
const router = useRouter();

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const pageList = ref<FormData[]>([]);

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
    // 过滤掉空值字段
    const params = Object.fromEntries(
      Object.entries(formData.value).filter(([key, value]) => value !== '' && value !== null)
    );

    // 加入分页参数
    params.page = currentPage.value;
    params.pageSize = pageSize.value;

    // 向后端请求数据，确保传递分页参数
    const response = await selectAllInventory(params);

    pageList.value = response.result;  // 返回当前页数据
    totalItems.value = response.total || response.result.length; // 确保总条目数至少为0
  } catch (error) {
    console.error('加载数据失败:', error);
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

// 页面跳转
const navigateToAddPage = () => {
  router.push('/createInventory');
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
.inventory-audit-title {
    font-family: '微软雅黑 Light', 'Helvetica Neue', Arial, sans-serif;
    font-size: 28px; /* 或者更大一些如28px */
    color: #050505; /* 深灰色调 */
    font-weight: 500; /* 中等粗细 */
    letter-spacing: 1.5px; /* 字间距 */
    text-align: center; /* 文本居中 */
    margin-bottom: 20px; /* 下方留白 */
}
</style>



