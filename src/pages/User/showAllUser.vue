<template>
  <div class="showStore-body">
    <h1>用户概览</h1>
    <!-- 筛选表单 -->
    <el-form :model="formData" label-width="100px" size="medium" inline>
      <el-form-item label="用户ID">
        <el-input v-model="formData.userId" placeholder="请输入用户ID" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="formData.username" placeholder="请输入用户名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="formData.position" placeholder="请输入职位" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="formData.role" clearable placeholder="请选择权限" style="width: 200px;">
          <el-option label="全部" value=""></el-option>
          <el-option label="管理员" value="Admin"></el-option>
          <el-option label="员工" value="User"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">搜索</el-button>
        <el-button type="success" @click="navigateToAddPage">新增用户</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table :data="paginatedData" style="width: 100%" border stripe>
      <el-table-column prop="userId" label="用户ID" width="100" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名称" min-width="150"></el-table-column>
      <el-table-column prop="position" label="职位" min-width="150"></el-table-column>
      <el-table-column prop="telephone" label="手机号" min-width="150"></el-table-column>
      <el-table-column prop="workPlace" label="工作地点" min-width="150"></el-table-column>
      <el-table-column prop="role" label="权限" width="120" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" min-width="150"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150" align="center">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="150" align="center">
        <template #default="{ row }">
          {{ formatDate(row.updateTime) }}
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

<script lang="ts" setup name="showAllUsers">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { selectAllUser, deleteUserById } from '@/api/user/user';

interface UserItem {
  userId: number;
  username: string;
  position: string;
  telephone: string;
  workPlace: string;
  role: string;
  remark: string;
  createTime: string;
  updateTime: string;
}

// 表单数据
const formData = ref({
  userId: '',
  username: '',
  position: '',
  role: ''
});

const router = useRouter();

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const userList = ref<UserItem[]>([]);

// 计算属性
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
const paginatedData = computed(() =>
  userList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
);

// 初始化加载数据
onMounted(() => {
  loadData();
});

// 加载数据方法
const loadData = async () => {
  try {
    const params = {
      ...formData.value,
      page: currentPage.value,
      size: pageSize.value
    };

    const response = await selectAllUser(params);
    console.log('Response:', response);
    userList.value = response.result;
    totalItems.value = response.total || userList.value.length;
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
  router.push('/createUser');
};

const editItem = (item: UserItem) => {
  router.push(`/UpdateUser/${item.userId}`);
};

const deleteItem = async (item: UserItem) => {
  if (item.userId !== undefined) {
    try {
      const response = await deleteUserById(item.userId); // 调用删除接口
      console.log('删除成功！', response);
      loadData(); // 刷新列表
    } catch (error) {
      console.error('Error deleting user', error);
      alert('删除失败，请检查网络或联系管理员');
    }
  } else {
    alert('用户数据错误');
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



