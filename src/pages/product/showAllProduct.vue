<template>
  <div class="showStore-body">
    <h1>商品概览</h1>
    <!-- 筛选表单 -->
    <div class="filters">
      <div class="filter-row">
        <div class="filter-group">
          <label>商品ID</label>
          <input type="text" v-model="formData.productId">
        </div>
        <div class="filter-group">
          <label>商品名称</label>
          <input type="text" v-model="formData.productName">
        </div>
        <div class="filter-group">
          <label>商品类别</label>
          <input type="text" v-model="formData.category">
        </div>
        <div class="filter-group">
          <label>存储方式</label>
          <select v-model="formData.storageTemperature">
            <option value="">全部</option>
            <option value="冷藏">冷藏</option>
            <option value="阴凉">阴凉</option>
            <option value="常温">常温</option>
          </select>
        </div>
      </div>
      <div class="filter-row">
        <button class="search-btn" @click="loadData">搜索</button>
        <button class="add-btn" @click="navigateToAddPage">新增商品</button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>商品图片</th>
            <th>商品名称</th>
            <th>商品类别</th>
            <th>仓库名称</th>
            <th>存储方式</th>
            <th>供应商名称</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th>操作</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="item.productId">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td><img :src="getImageUrl(item.imageUrl)" alt="商品图片" style="max-width: 50px;"></td>
            <td>{{ item.productName }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.stashName }}</td>
            <td>{{ item.storageTemperature }}</td>
            <td>{{ item.supplierName }}</td>
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
import { selectAllProduct, deleteProductById } from '@/api/product/product';
import { arrayBufferToBase64, compressImage } from '@/util/imageUtils';

interface FormData {
  productId?: number;
  productName: string;
  category: string;
  stashName: string;
  storageTemperature: string;
  supplierName: string;
  remark: string;
  createTime: string;
  updateTime: string;
  imageUrl: string; // 图片 Base64 编码字符串
  shelfLife: number; // 保质期
  productTime: string; // 生产日期
}

// 表单数据
const formData = ref({
  productId: undefined,
  storageTemperature: '',
  productName: '',
  category: '',
  stashName: ''
});

const router = useRouter();

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(1);
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
    // 过滤掉空值字段
    const params = Object.fromEntries(
      Object.entries(formData.value).filter(([key, value]) => value !== '' && value !== null)
    );

    const response = await selectAllProduct(params);
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
  router.push('/createProduct');
};

const editItem = (item: FormData) => {
  router.push(`/updateProduct/${item.productId}`);
};

const deleteItem = async (item: FormData) => {
  if (item.productId !== undefined) {
    try {
      const response = await deleteProductById(item.productId); // 调用删除接口
      alert('删除成功！');
      // 可以选择重定向到其他页面或刷新列表
      loadData(); // 刷新列表
    } catch (error) {
      console.error('Error deleting stash', error);
      alert('删除失败，请检查网络或联系管理员');
    }
  } else {
    alert('商品数据错误');
  }
};

// 解码 Base64 并生成图片 URL
const getImageUrl = (base64String: string): string => {
  if (!base64String.startsWith('data:image')) {
    base64String = `data:image/jpeg;base64,${base64String}`;
  }
  return base64String;
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
