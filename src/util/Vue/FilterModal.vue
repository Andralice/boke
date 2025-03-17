<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <h2>筛选条件</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
  
        <div class="filter-row">
          <div class="filter-group">
            <label>商品ID</label>
            <input type="text" v-model="localFormData.productId">
          </div>
          <div class="filter-group">
            <label>商品名称</label>
            <input type="text" v-model="localFormData.productName">
          </div>
          <div class="filter-group">
            <label>仓库名称</label>
            <input type="text" v-model="localFormData.stashName">
          </div>
          <div class="filter-group">
            <label>存储方式</label>
            <select v-model="localFormData.storageTemperature">
              <option value="">全部</option>
              <option value="冷藏">冷藏</option>
              <option value="阴凉">阴凉</option>
              <option value="常温">常温</option>
            </select>
          </div>
        </div>
  
        <div class="checkbox-section">
          <h3>选择商品</h3>
          <ul>
            <li v-for="item in filteredProducts" :key="item.productId">
              <label>
                <input type="checkbox" v-model="selectedProducts" :value="item">
                {{ item.productName }}
              </label>
            </li>
          </ul>
        </div>
  
        <div class="button-row">
          <button class="confirm-btn" @click="applyFiltersAndConfirm">确认</button>
          <button class="cancel-btn" @click="closeModal">取消</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup name="FilterModal">
  import { ref, reactive, watch } from 'vue';
  import { selectAllProduct } from '@/api/product/product';
  
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
  
  const isVisible = ref(false);
  const localFormData = reactive<Partial<FormData>>({
    productId: undefined,
    storageTemperature: '',
    productName: '',
    category: '',
    stashName: ''
  });
  
  const allProducts = ref<FormData[]>([]);
  const filteredProducts = ref<FormData[]>([]);
  const selectedProducts = ref<FormData[]>([]);
  
  // 打开模态框
  const openModal = () => {
    isVisible.value = true;
    loadProducts();
  };
  
  // 关闭模态框
  const closeModal = () => {
    isVisible.value = false;
    selectedProducts.value = [];
  };
  
  // 应用筛选条件并确认
  const applyFiltersAndConfirm = () => {
    emit('filters-applied', { ...localFormData }, selectedProducts.value);
    closeModal();
  };
  
  // 加载所有产品数据
  const loadProducts = async () => {
    try {
      const response = await selectAllProduct({ page: 1, size: 100 }); // 假设一次性加载所有产品
      allProducts.value = response.result;
      filterProducts();
    } catch (error) {
      console.error('加载数据失败:', error);
    }
  };
  
  // 根据筛选条件过滤产品
  const filterProducts = () => {
    filteredProducts.value = allProducts.value.filter(product => {
      if (
        (!localFormData.productId || product.productId === Number(localFormData.productId)) &&
        (!localFormData.productName || product.productName.includes(localFormData.productName)) &&
        (!localFormData.stashName || product.stashName.includes(localFormData.stashName)) &&
        (!localFormData.storageTemperature || product.storageTemperature === localFormData.storageTemperature)
      ) {
        return true;
      }
      return false;
    });
  };
  
  watch([() => localFormData.productId, () => localFormData.productName, () => localFormData.stashName, () => localFormData.storageTemperature], filterProducts);
  
  const emit = defineEmits<{
    (e: 'filters-applied', filters: Partial<FormData>, selectedProducts: FormData[]): void;
  }>();
  
  defineExpose({
    openModal
  });
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 600px;
    position: relative;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .filter-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .filter-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .filter-group input, .filter-group select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .checkbox-section {
    margin-top: 20px;
  }
  
  .checkbox-section h3 {
    margin-bottom: 10px;
  }
  
  .checkbox-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .checkbox-section li {
    margin-bottom: 5px;
  }
  
  .button-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .confirm-btn, .cancel-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .confirm-btn {
    background-color: #007bff;
    color: white;
  }
  
  .confirm-btn:hover {
    background-color: #0056b3;
  }
  
  .cancel-btn {
    background-color: #ccc;
    color: black;
  }
  
  .cancel-btn:hover {
    background-color: #aaa;
  }
  </style>
  
  
  
  