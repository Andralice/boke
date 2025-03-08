<template>
    <div class="suppliers-page">
      <h1 class="page-title">供应商管理</h1>
  
      <!-- 搜索表单容器 -->
      <div class="search-container">
        <div class="search-form">
          <el-form :model="searchForm" ref="searchFormRef" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="供应商名称" prop="supplierName">
                  <el-input v-model="searchForm.supplierName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人姓名" prop="contactName">
                  <el-input v-model="searchForm.contactName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话" prop="contactPhone">
                  <el-input v-model="searchForm.contactPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="详细地址" prop="address">
                  <el-input v-model="searchForm.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合作状态" prop="cooperationStatus">
                    <el-input v-model="searchForm.cooperationStatus"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-button type="primary" @click="fetchSuppliers">查询</el-button>
                  <el-button @click="resetForm">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
  
      <!-- 供应商列表容器 -->
      <div class="supplier-list-container">
        <div class="supplier-list">
          <el-table :data="suppliers" style="width: 100%">
            <el-table-column prop="supplierId" label="供应商ID" width="100"></el-table-column>
            <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
            <el-table-column prop="contactName" label="联系人姓名"></el-table-column>
            <el-table-column prop="contactPhone" label="联系电话"></el-table-column>
            <el-table-column prop="address" label="详细地址"></el-table-column>
            <el-table-column prop="bankAccount" label="银行账号"></el-table-column>
            <el-table-column prop="cooperationStatus" label="合作状态">
                <template #default="{ row }">
                    <el-tag :type="row.cooperationStatus === 1 ? 'danger' : 'success'">
                      {{ row.cooperationStatus === 1 ? '停用' : '启用' }}
                    </el-tag>
                  </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          </el-table>
        </div>
  
        <!-- 分页控件 -->
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { selectSuppliersPage } from '@/api/stash/stash'; // 确认API路径正确
import { ElMessage } from 'element-plus';
// 搜索表单数据
const searchForm = reactive({
  supplierName: '',
  contactName: '',
  contactPhone: '',
  address: '',
  cooperationStatus: ''
});

// 表单引用
const searchFormRef = ref(null);

// 供应商列表数据
const suppliers = ref([]);

// 当前页码和每页显示数量
const currentPage = ref(1);
const pageSize = ref(10);

// 总记录数
const total = ref(0);

// 获取供应商数据

const fetchSuppliers = () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    ...searchForm
  };

  selectSuppliersPage(params)
    .then(response => {
      if (response.data && response.data.records !== undefined) {
        suppliers.value = response.data.records;
        total.value = response.data.current; // 如果total为0但有记录，则使用记录长度作为总数
        
        // 检查是否有记录
        if (!suppliers.value.length) {
          ElMessage({
            message: '未查询到相关供应商信息',
            type: 'warning',
          });
        }
      } else {
        console.error('Unexpected API response structure:', response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching suppliers:', error);
      // 可选：在此处添加用户友好的错误提示
    });
};

// 处理每页显示数量变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  fetchSuppliers();
};

// 处理当前页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchSuppliers();
};

// 重置搜索表单
const resetForm = () => {
  searchFormRef.value.resetFields();
  fetchSuppliers();
};

// 页面加载时获取供应商数据
onMounted(() => {
  fetchSuppliers();
});
</script>
  
<style scoped>
.suppliers-page {
  padding: 20px;
  background-color: #F5F5F5; /* 稍微暗淡的奶油色 */
}

.page-title {
  font-family: 'Arial', sans-serif;
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.search-container,
.supplier-list-container {
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease;
}

.search-container:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.supplier-list-container:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.search-form {
  padding: 20px;
}

.supplier-list {
  padding: 20px;
}

.pagination {
  text-align: center;
  padding: 20px;
}

</style>