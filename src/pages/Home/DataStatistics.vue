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
    <el-dialog v-model="showNoInventoryModal" title="缺货商品列表" width="60%" center>
      <el-table :data="paginatedNoInventoryProducts" style="width: 100%">
        <el-table-column prop="productName" label="商品名称" />
        <el-table-column prop="stashName" label="仓库" />
        <el-table-column prop="supplierName" label="供应商" />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="noInventoryTotalPages * noInventoryPageSize"
          :page-size="noInventoryPageSize"
          v-model:current-page="currentNoInventoryPage"
        />
      </div>
    </el-dialog>

    <!-- 到期商品弹窗 -->
    <el-dialog v-model="showNoTimeModal" title="到期商品列表" width="60%" center>
      <el-table :data="paginatedNoTimeProducts" style="width: 100%">
        <el-table-column prop="productName" label="商品名称" />
        <el-table-column prop="stashName" label="仓库" />
        <el-table-column prop="supplierName" label="供应商" />
        <el-table-column prop="daysLeft" label="剩余时间(天)">
          <template #default="scope">
            <span :class="{ 'expired': scope.row.daysLeft <= 0 }">{{ scope.row.daysLeft <= 0 ? '已过期' : scope.row.daysLeft }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="noTimeTotalPages * noTimePageSize"
          :page-size="noTimePageSize"
          v-model:current-page="currentNoTimePage"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { ElDialog, ElTable, ElTableColumn, ElPagination } from 'element-plus';
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
const noInventoryTotalPages = computed(() => Math.max(1, Math.ceil(noInventoryProducts.value.length / noInventoryPageSize.value)));
const paginatedNoInventoryProducts = computed(() =>
  noInventoryProducts.value.slice((currentNoInventoryPage.value - 1) * noInventoryPageSize.value, currentNoInventoryPage.value * noInventoryPageSize.value)
);

// 到期商品分页
const currentNoTimePage = ref(1);
const noTimePageSize = ref(5);
const noTimeTotalPages = computed(() => Math.max(1, Math.ceil(noTimeProducts.value.length / noTimePageSize.value)));
const paginatedNoTimeProducts = computed(() =>
  noTimeProducts.value.slice((currentNoTimePage.value - 1) * noTimePageSize.value, currentNoTimePage.value * noTimePageSize.value)
);

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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 20px;
}

.region.region1 .header {
  display: flex;
  align-items: center;
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

/* 过期商品特殊样式 */
.expired {
  color: red;
  font-weight: bold;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>



