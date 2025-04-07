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
      </div>
      <div class="filter-row">
        <div class="filter-group">
          <label>存储方式</label>
          <select v-model="formData.storageTemperature">
            <option value="">全部</option>
            <option value="冷藏">冷藏</option>
            <option value="冷冻">冷冻</option>
            <option value="常温">常温</option>
          </select>
        </div>
        <div class="filter-group"></div> <!-- 占位符 -->
        <div class="filter-group"></div> <!-- 占位符 -->
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
            <th>可用库存</th>
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
            <td>{{ item.quantity}}</td>
            <td>{{ formatDate(item.createTime) }}</td>
            <td>{{ formatDate(item.updateTime) }}</td>
            <td class="action-buttons">
              <button class="edit-btn" @click="editItem(item)">编辑</button>
              <button class="delete-btn" @click="deleteItem(item)">删除</button>
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

interface FormData {
  productId?: number;
  productName: string;
  category: string;
  stashName: string;
  quantity: number;
  storageTemperature: string;
  supplierName: string;
  remark: string;
  createTime: string;
  updateTime: string;
  imageUrl: string; // 图片 Base64 编码字符串
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

    const response = await selectAllProduct(params);
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
      await deleteProductById(item.productId); // 调用删除接口
      alert('删除成功！');
      loadData(); // 刷新列表
    } catch (error) {
      console.error('Error deleting product', error);
      alert('删除失败，请检查网络或联系管理员');
    }
  } else {
    alert('商品数据错误');
  }
};

// 解码 Base64 并生成图片 URL
const getImageUrl = (base64String: string): string => {
  // 如果没有图片数据，使用默认的图片
  if (!base64String) {
    return 'https://example.com/default-image.jpg';  // 这里替换为你项目中的默认图片 URL
  }

  // 如果是有效的 Base64 字符串，则返回其本身
  if (!base64String.startsWith('data:image')) {
    base64String = `data:image/jpeg;base64,${base64String}`;
  }

  return base64String;
};
</script>

<style scoped>
.showStore-body {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  background-color: #f9fafb; /* 浅色背景 */
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
  width: 100%; /* 确保阴影与显示框等长 */
}

.filter-row {
  display: flex;
  justify-content: space-between;
  gap: 16px; /* 增加行内元素之间的间距 */
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
  gap: 8px; /* 减少标签和输入框之间的间距 */
  flex-basis: calc(33.33% - 16px); /* 每个过滤组占据三分之一宽度，减去间距 */
  min-width: 150px; /* 设置最小宽度，防止过窄 */
}

.filter-group label {
  min-width: 80px;
  color: #555;
  font-weight: 500;
}

select, input {
  padding: 8px 12px; /* 更小的内边距 */
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  width: 100%;
  transition: border-color 0.3s ease;
  font-size: 14px;
  color: #333;
}

select:focus, input:focus {
  border-color: #409eff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.3);
}

.search-btn, .add-btn {
  padding: 10px 20px; /* 缩小按钮的内边距 */
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
  width: 100%; /* 确保阴影与显示框等长 */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 16px; /* 缩小单元格的内边距 */
  text-align: left;
  border-bottom: 1px solid #ebebeb;
  font-size: 14px;
  color: #333;
}

th {
  background: #f5f7fa; /* 标识栏背景色与展示框一致 */
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

.edit-btn, .delete-btn {
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

.pagination {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.pagination button {
  padding: 10px 20px; /* 缩小分页按钮的内边距 */
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
</style>



