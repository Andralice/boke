<template>
  <div class="showStore-body">
    <h1>仓库概览</h1>
    <!-- 筛选表单 -->
    <el-form :model="formData" label-width="100px" size="medium" inline>
      <el-form-item label="仓库名称">
        <el-input v-model="formData.stashName" placeholder="请输入仓库名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="仓库管理员">
        <el-input v-model="formData.adminName" placeholder="请输入管理员名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="存储温度">
        <el-select v-model="formData.storageTemperature" clearable placeholder="请选择存储温度" style="width: 200px;">
          <el-option label="冷藏" value="冷藏"></el-option>
          <el-option label="常温" value="常温"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">搜索</el-button>
        <el-button type="success" @click="navigateToAddPage">新增仓库</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table :data="paginatedData" style="width: 100%" border stripe>
      <el-table-column prop="index" label="序号" width="60" align="center">
        <template #default="{ $index }">
          {{ (currentPage - 1) * pageSize + $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="stashName" label="仓库名称" min-width="150"></el-table-column>
      <el-table-column prop="stashAddress" label="仓库地址" min-width="200"></el-table-column>
      <el-table-column prop="storageTemperature" label="存储温度" width="120" align="center"></el-table-column>
      <el-table-column prop="stashArea" label="仓库面积(m²)" width="120" align="right"></el-table-column>
      <el-table-column prop="adminName" label="管理员" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150" align="center">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template #default="{ row }">
          <el-button size="mini" type="text" @click="editItem(row)">编辑</el-button>
          <el-button size="mini" type="text" @click="deleteItem(row)">删除</el-button>
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

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { selectAllStash, deleteStash } from '@/api/stash/stash';

interface StashItem {
  stashId: number;
  stashName: string;
  stashAddress: string;
  storageTemperature: string;
  stashArea: number;
  adminName: string;
  createTime: string;
  updateTime: string;
}

const router = useRouter();

// 表单数据
const formData = ref({
  stashName: '',
  adminName: '',
  storageTemperature: ''
});

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0); // 初始化为0
const stashList = ref<StashItem[]>([]);

// 计算属性
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
const paginatedData = computed(() =>
  stashList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
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

    const response = await selectAllStash(params);

    if (response.result && Array.isArray(response.result)) {
      stashList.value = response.result;
      totalItems.value = response.total || response.result.length; // 确保总条目数至少为0
    } else {
      console.error('无效的数据格式:', response);
      stashList.value = [];
      totalItems.value = 0;
    }
  } catch (error) {
    console.error('加载数据失败:', error);
    stashList.value = [];
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

// 页面跳转
const navigateToAddPage = () => {
  router.push('/createStash');
};

const editItem = (item: StashItem) => {
  router.push(`/updateStash/${item.stashId}`);
};

const deleteItem = async (item: StashItem) => {
  if (item.stashId !== undefined) {
    try {
      const response = await deleteStash(item.stashId); // 调用删除接口
      console.log('删除成功！', response);
      loadData(); // 刷新列表
    } catch (error) {
      console.error('Error deleting stash', error);
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



