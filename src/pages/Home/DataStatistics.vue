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
      <div class="data-box cyan" @mouseenter="showBadge('cyan')" @mouseleave="hideBadge('cyan')">
        <div class="box-title">商品类型</div>
        <div class="box-number">{{ productNum }}</div>
        <div class="box-description">当前分类记录数</div>
        <div class="badge" v-if="badgeVisibility.cyan">{{ badgeTexts.cyan }}</div>
      </div>
      <div class="data-box green" @mouseenter="showBadge('green')" @mouseleave="hideBadge('green')">
        <div class="box-title">库存总额</div>
        <div class="box-number">{{ inventoryNum }}</div>
        <div class="box-description">当前分类记录数</div>
        <div class="badge" v-if="badgeVisibility.green">{{ badgeTexts.green }}</div>
      </div>
      <div class="data-box light-green" @mouseenter="showBadge('lightGreen')" @mouseleave="hideBadge('lightGreen')" @click="showNoInventoryModal = true">
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
            <tr v-for="(product, index) in noInventoryProducts" :key="index">
              <td>{{ product.productName }}</td>
              <td>{{ product.stashName }}</td>
              <td>{{ product.supplierName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
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

// 弹窗显示状态
const showNoInventoryModal = ref(false);

// 初始化加载数据
onMounted(() => {
  loadData();
});

// 加载数据方法
const loadData = async () => {
  try {
    const response = await PanelAllData();
    console.log(response);
    // 更新响应式变量
    stashNum.value = response.stash.num;
    productNum.value = response.product.num;
    inventoryNum.value = response.inventory.totalNum;
    noInventoryNum.value = response.noInventoryNum;
    noInventoryProducts.value = response.noInventoryProducts;
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
  z-index: 1000; /* 设置更高的z-index值 */
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1001; /* 设置更高的z-index值 */
  width: 80%;
  max-width: 600px;
  overflow-y: auto;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.5em;
}

.modal-content table {
  width: 100%;
  border-collapse: collapse;
}

.modal-content th, .modal-content td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.modal-content th {
  background-color: #f2f2f2;
}
</style>



