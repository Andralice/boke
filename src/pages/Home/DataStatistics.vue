<template>
  <div class="region region1">
    <div class="header">
      <img src="@/assets/images/Data.png" alt="" class="icon">
      <h3>数据统计</h3>
    </div>
    <div class="data-rows">
      <div class="data-box blue" @mouseenter="showBadge('blue')" @mouseleave="hideBadge('blue')">
        <div class="box-title">仓库数量</div>
        <div class="box-number">{{ stashNum }}</div>
        <div class="box-description">当前分类记录数</div>
        <div class="badge" v-if="badgeVisibility.blue">{{ badgeTexts.blue }}</div>
      </div>
      <div class="data-box green" @mouseenter="showBadge('green')" @mouseleave="hideBadge('green')">
        <div class="box-title">库存总额</div>
        <div class="box-number">{{ inventoryNum }}</div>
        <div class="box-description">当前分类记录数</div>
        <div class="badge" v-if="badgeVisibility.green">{{ badgeTexts.green }}</div>
      </div>
      <div class="data-box cyan" @mouseenter="showBadge('cyan')" @mouseleave="hideBadge('cyan')"
        @click="showNoTimeModal = true">
        <div class="box-title">到期商品</div>
        <div class="box-number">{{ noTimeNum }}</div>
        <div class="box-description">当前分类记录数</div>
        <div class="badge" v-if="badgeVisibility.cyan">{{ badgeTexts.cyan }}</div>
      </div>
      <div class="data-box light-green" @mouseenter="showBadge('lightGreen')" @mouseleave="hideBadge('lightGreen')"
        @click="showNoInventoryModal = true">
        <div class="box-title">缺货商品</div>
        <div class="box-number">{{ noInventoryNum }}</div>
        <div class="box-description">当前分类记录数</div>
        <div class="badge" v-if="badgeVisibility.lightGreen">{{ badgeTexts.lightGreen }}</div>
      </div>
    </div>

    <!-- 缺货商品弹窗 -->
    <div v-if="showNoInventoryModal" class="modal-overlay" @click="showNoInventoryModal = false">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="showNoInventoryModal = false">&times;</span>
        <h4>缺货商品列表</h4>
        <table>
          <thead>
            <tr>
              <th>商品名称</th>
              <th>仓库</th>
              <th>供应商</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in paginatedNoInventoryProducts" :key="index">
              <td>{{ product.productName }}</td>
              <td>{{ product.stashName }}</td>
              <td>{{ product.supplierName }}</td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="prevNoInventoryPage" :disabled="currentNoInventoryPage === 1">上一页</button>
          <span>第 {{ currentNoInventoryPage }} 页 / 共 {{ noInventoryTotalPages }} 页</span>
          <button @click="nextNoInventoryPage" :disabled="currentNoInventoryPage === noInventoryTotalPages">下一页</button>
        </div>
      </div>
    </div>

    <!-- 到期商品弹窗 -->
    <div v-if="showNoTimeModal" class="modal-overlay" @click="showNoTimeModal = false">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="showNoTimeModal = false">&times;</span>
        <h4>到期商品列表</h4>
        <table>
          <thead>
            <tr>
              <th>商品名称</th>
              <th>仓库</th>
              <th>供应商</th>
              <th>剩余时间(天)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in paginatedNoTimeProducts" :key="index">
              <td>{{ product.productName }}</td>
              <td>{{ product.stashName }}</td>
              <td>{{ product.supplierName }}</td>
              <td :class="{ 'expired': product.daysLeft < 0 }">{{ product.daysLeft < 0 ? '过期' : product.daysLeft }}</td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="prevNoTimePage" :disabled="currentNoTimePage === 1">上一页</button>
          <span>第 {{ currentNoTimePage }} 页 / 共 {{ noTimeTotalPages }} 页</span>
          <button @click="nextNoTimePage" :disabled="currentNoTimePage === noTimeTotalPages">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { PanelAllData } from '@/api/Data/allData';

const badgeTexts = ref({
  blue: '实时',
  cyan: '实时',
  green: '实时',
  lightGreen: '实时'
});

const badgeVisibility = ref({
  blue: false,
  cyan: false,
  green: false,
  lightGreen: false
});

function showBadge(color: string) {
  badgeVisibility.value[color] = true;
}

function hideBadge(color: string) {
  badgeVisibility.value[color] = false;
}

// 定义响应式变量来存储从 API 获取的数据
const stashNum = ref(0);
const productNum = ref(0);
const inventoryNum = ref(0);
const noInventoryNum = ref(0);
const noInventoryProducts = ref([]);
const noTimeNum = ref(0);
const noTimeProducts = ref([]);

// 弹窗显示状态
const showNoInventoryModal = ref(false);
const showNoTimeModal = ref(false);

// 缺货商品分页
const currentNoInventoryPage = ref(1);
const noInventoryPageSize = ref(5);
const noInventoryTotalPages = computed(() => Math.ceil(noInventoryProducts.value.length / noInventoryPageSize.value));
const paginatedNoInventoryProducts = computed(() =>
  noInventoryProducts.value.slice((currentNoInventoryPage.value - 1) * noInventoryPageSize.value, currentNoInventoryPage.value * noInventoryPageSize.value)
);

// 到期商品分页
const currentNoTimePage = ref(1);
const noTimePageSize = ref(5);
const noTimeTotalPages = computed(() => Math.ceil(noTimeProducts.value.length / noTimePageSize.value));
const paginatedNoTimeProducts = computed(() =>
  noTimeProducts.value.slice((currentNoTimePage.value - 1) * noTimePageSize.value, currentNoTimePage.value * noTimePageSize.value)
);

// 分页操作
const prevNoInventoryPage = () => {
  if (currentNoInventoryPage.value > 1) {
    currentNoInventoryPage.value--;
  }
};

const nextNoInventoryPage = () => {
  if (currentNoInventoryPage.value < noInventoryTotalPages.value) {
    currentNoInventoryPage.value++;
  }
};

const prevNoTimePage = () => {
  if (currentNoTimePage.value > 1) {
    currentNoTimePage.value--;
  }
};

const nextNoTimePage = () => {
  if (currentNoTimePage.value < noTimeTotalPages.value) {
    currentNoTimePage.value++;
  }
};

// 初始化加载数据
onMounted(() => {
  loadPanelData();
});

// 加载数据方法
const loadPanelData = async () => {
  try {
    const response = await PanelAllData();
    console.log(response);
    // 更新响应式变量
    stashNum.value = response.stash.num;
    productNum.value = response.product.num;
    inventoryNum.value = response.inventory.totalNum;
    noInventoryNum.value = response.noInventoryNum;
    noInventoryProducts.value = response.noInventoryProducts;
    noTimeNum.value = response.noTimeNum;
    noTimeProducts.value = response.noTimeProducts;
  } catch (error) {
    console.error('加载数据失败:', error);
  }
};
</script>





<style scoped>
.region.region1 {
  width: 100%;
  margin: auto;
  background-color: #ffffff;
  /* border-radius: 16px; */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 20px;
}

.region.region1 .header {
  display: flex;
  align-items: center;
  /* padding-bottom: 15px; */
  border-bottom: 1px solid #e0e0e0;
}

.region.region1 .header .icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

.region.region1 .header h3 {
  margin: 0;
  font-size: 1.5em;
  color: #333;
  font-weight: bold;
}

.region.region1 .data-rows {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  /* padding-top: 20px; */
}

.region.region1 .data-box {
  flex: 1;
  min-height: 100px;
  padding: 25px;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.region.region1 .data-box:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.region.region1 .data-box .badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  text-align: center;
  color: white;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.6);
}

.region.region1 .data-box.blue {
  background: linear-gradient(135deg, #1e90ff, #00bfff);
}

.region.region1 .data-box.cyan {
  background: linear-gradient(135deg, #00ced1, #20b2aa);
}

.region.region1 .data-box.green {
  background: linear-gradient(135deg, #32cd32, #7cfc00);
}

.region.region1 .data-box.light-green {
  background: linear-gradient(135deg, #7cfc00, #32cd32);
}

.region.region1 .data-box .box-title {
  font-size: 1.1em;
  color: white;
  font-weight: bold;
  margin-bottom: 5px;
}

.region.region1 .data-box .box-number {
  font-size: 2em;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
}

.region.region1 .data-box .box-description {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.7);
}

body {
  font-family: 'Roboto', sans-serif;
  /* 设置默认字体为整个应用 */
}

/* 弹窗标题样式 */
.modal-content h4 {
  font-family: 'Merriweather', serif;
  /* 使用Merriweather字体作为标题 */
  font-weight: 700;
  /* 字体粗细为700，相当于bold */
  margin-top:0;
  /* 标题顶部外边距为0 */
  text-align: center;
  /* 标题居中 */
  font-size: 1.5em;
  /* 添加这一行来设置字体大小 */
}

/* 背景遮罩层 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(33, 37, 41, 0.6);
  /* 更深的半透明背景色 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 关闭按钮 */
.close-button {
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  background: none;
  border: none;
}

/* 弹窗内容 */
.modal-content {
  background-color: #ffffff;
  border-radius: 12px;
  /* 增大圆角 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  /* 加强阴影效果 */
  padding: 30px;
  max-width: 800px;
  width: 90%;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  /* 确保子元素垂直排列 */
  align-items: center;
  /* 子元素水平居中 */
}

/* 表格样式 */
.modal-content table {
  width: 100%;
  /* 确保表格宽度充满其容器 */
  margin-top: 20px;
  border-collapse: collapse;
  text-align: center;
  /* 表格内容居中 */
}

.modal-content th,
.modal-content td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.modal-content th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.modal-content tr:hover {
  background-color: #f1f1f1;
}

/* 过期商品特殊样式 */
.modal-content .expired {
  color: red;
  font-weight: bold;
}

/* 分页按钮 */
.modal-content .pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.modal-content .pagination button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Roboto', sans-serif;
  /* 确保按钮文字也使用相同的字体 */
}

.modal-content .pagination button[disabled] {
  background-color: #cccccc;
  cursor: not-allowed;
}

.modal-content .pagination button:hover {
  background-color: #0056b3;
}
</style>
