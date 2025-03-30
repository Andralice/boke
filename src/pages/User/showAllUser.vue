<template>
    <div class="showStore-body">
      <h1>用户概览</h1>
      <!-- 筛选表单 -->
      <div class="filters">
        <div class="filter-row">
          <div class="filter-group">
            <label>用户ID</label>
            <input type="text" v-model="formData.userId">
          </div>
          <div class="filter-group">
            <label>用户名称</label>
            <input type="text" v-model="formData.username">
          </div>
          <div class="filter-group">
            <label>职位</label>
            <input type="text" v-model="formData.position">
          </div>
          <div class="filter-group">
            <label>权限</label>
            <select v-model="formData.role">
              <option value="">全部</option>
              <option value="Admin">管理员</option>
              <option value="User">员工</option>
            </select>
          </div>
        </div>
        <div class="filter-row">
          <button class="search-btn" @click="loadData">搜索</button>
          <button class="add-btn" @click="navigateToAddPage">新增用户</button>
        </div>
      </div>
  
      <!-- 数据表格 -->
      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th>用户ID</th>
              <th>用户名称</th>
              <th>职位</th>
              <th>手机号</th>
              <th>工作地点</th>
              <th>权限</th>
              <th>备注</th>
              <th>创建时间</th>
              <th>更新时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedData" :key="item.userId">
              <!-- <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td> -->
              <td>{{ item.userId }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.position }}</td>
              <td>{{ item.telephone }}</td>
              <td>{{ item.workPlace }}</td>
              <td>{{ item.role }}</td>
              <td>{{ item.remark }}</td>
              <td>{{ formatDate(item.createTime) }}</td>
              <td>{{ formatDate(item.updateTime) }}</td>
              <td>
                <button @click="editItem(item)">编辑</button>
              </td>
              <td>
                <button @click="deleteItem(item)">删除</button>
              </td>
            </tr>
            <tr v-if="paginatedData.length === 0">
              <td colspan="10" class="no-data">暂无数据</td>
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
  
  <script lang="ts" setup name="showAllProduct">
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { selectAllUser,deleteUserById } from '@/api/user/user';
  
  interface FormData {
    userId?: number;
    username: string;
    adminName?: string;
    password: string;
    position: string;
    telephone: string;
    workPlace: string;
    role: string;
    remark: string;
    createTime: string; 
    updateTime: string; 
  }
  
  // 表单数据
  const formData = ref<FormData>({
    userId: undefined,
    username: "",
    adminName: "",
    password: "",
    position: "",
    telephone: "",
    workPlace: "",
    role: "",
    remark: "",
    createTime: "",
    updateTime: "", 
  });
  
  const router = useRouter();
  
  // 分页相关
  const currentPage = ref(1);
  const pageSize = ref(10);
  const totalItems = ref(0);
  const pageList = ref<FormData[]>([]);
  
  // 计算属性
  const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
  // const paginatedData = computed(() =>
  //   pageList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
  // );
  const paginatedData = computed(() => {
    console.log('Page List:', pageList.value);
    console.log('Current Page:', currentPage.value);
    console.log('Page Size:', pageSize.value);
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = currentPage.value * pageSize.value;
    console.log('Start Index:', startIndex);
    console.log('End Index:', endIndex);
    return pageList.value.slice(startIndex, endIndex);
  });
  
  
  
  // 初始化加载数据
  onMounted(() => {
    loadData();
  });
  
  // 加载数据方法
  const loadData = async () => {
    try {
      const params = {
        page: currentPage.value,
        size: pageSize.value
      };
  
      const response = await selectAllUser(params);
      console.log('Response:', response);
      pageList.value = response.result;
      totalItems.value = response.total || pageList.value.length;
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
  
  // 工具方法
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  // 页面跳转
  const navigateToAddPage = () => {
    router.push('/createUser');
  };
  
  const editItem = (item: FormData) => {
    router.push(`/UpdateUser/${item.userId}`);
  };
  
  const deleteItem = async (item: FormData) => {
    if (item.userId !== undefined) {
      try {
        const response = await deleteUserById(item.userId); // 调用删除接口
        // 可以选择重定向到其他页面或刷新列表
        loadData(); // 刷新列表
      } catch (error) {
        console.error('Error deleting stash', error);
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
  
  .filters {
    background: #f5f7fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  /* 修改 .filter-row 以使用 flex 布局并允许换行 */
  .filter-row {
    display: flex;
    flex-wrap: wrap; /* 允许子元素换行 */
    gap: 20px; /* 子元素之间的间距 */
    margin-bottom: 15px;
  }
  
  .filter-group {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1 1 calc(33.333% - 40px); /* 每个过滤组占据三分之一宽度，减去间距 */
    min-width: 200px; /* 设置最小宽度，防止过窄 */
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
  