<template>
  <div class="inventory-management">
    <el-card shadow="hover" class="main-container">
      <el-tabs v-model="activeTab" type="card">
        <!-- 新增库存表单 -->
        <el-tab-pane label="库存申请" name="addInventory">
          <el-form :model="formData" label-width="120px" class="custom-form">
            <el-row :gutter="20">
              <!-- 商品名称 -->
              <el-col :span="8">
                <el-form-item label="商品名称">
                  <el-select
                    v-model="formData.productName"
                    placeholder="请选择或搜索商品名称"
                    style="width: 100%;"
                    filterable
                    remote
                    :remote-method="searchProducts"
                    @focus="handleFocus('product')"
                    :loading="productLoading"
                    ref="productSelectRef"
                    popper-class="custom-dropdown"
                    @visible-change="handleVisibleChange('product', $event)"
                  >
                    <el-option
                      v-for="item in productOptions"
                      :key="item.id"
                      :label="item.productName"
                      :value="item.productName"
                    />
                    <!-- 自定义展示模块 -->
                    <template #empty>
                      <p>{{ productEmptyMessage }}</p>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>

              <!-- 仓库名称 -->
              <el-col :span="8">
                <el-form-item label="仓库名称">
                  <el-select
                    v-model="formData.stashName"
                    placeholder="请选择或搜索仓库名称"
                    style="width: 100%;"
                    filterable
                    remote
                    :remote-method="searchStashes"
                    @focus="handleFocus('stash')"
                    :loading="stashLoading"
                    ref="stashSelectRef"
                    popper-class="custom-dropdown"
                    @visible-change="handleVisibleChange('stash', $event)"
                  >
                    <el-option
                      v-for="item in stashOptions"
                      :key="item.id"
                      :label="item.stashName"
                      :value="item.stashName"
                    />
                    <!-- 自定义展示模块 -->
                    <template #empty>
                      <p>{{ stashEmptyMessage }}</p>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>

              <!-- 供货商名称 -->
              <el-col :span="8">
                <el-form-item label="供货商名称">
                  <el-select
                    v-model="formData.supplierName"
                    placeholder="请选择或搜索供货商名称"
                    style="width: 100%;"
                    filterable
                    remote
                    :remote-method="searchSuppliers"
                    @focus="handleFocus('supplier')"
                    :loading="supplierLoading"
                    ref="supplierSelectRef"
                    popper-class="custom-dropdown"
                    @visible-change="handleVisibleChange('supplier', $event)"
                  >
                    <el-option
                      v-for="item in supplierOptions"
                      :key="item.id"
                      :label="item.supplierName"
                      :value="item.supplierName"
                    />
                    <!-- 自定义展示模块 -->
                    <template #empty>
                      <p>{{ supplierEmptyMessage }}</p>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="生产日期*" prop="productTime">
                  <el-date-picker v-model="formData.productionDate" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="修改方式">
                  <el-select id="type" v-model="formData.type">
                    <el-option value="" label="请选择修改方式"></el-option>
                    <el-option value="add" label="添加"></el-option>
                    <el-option value="sub" label="减少"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改数量">
                  <el-input-number id="quantity" placeholder="请输入修改数量" v-model.number="formData.quantity"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="添加备注">
                  <el-input type="textarea" id="note-input" placeholder="在这里输入您的备注..." v-model="formData.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="success" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup name='createInventory'>
import { createInventory } from '@/api/inventory/inventory';
import { selectAllProduct } from '@/api/product/product';
import { selectAllStash } from '@/api/stash/stash';
import { selectAllSuppliers } from '@/api/suppliers/suppliers';
import { useRouter } from 'vue-router'; // 新增路由依赖
import { ref, reactive, onMounted, computed, nextTick, onUnmounted } from 'vue';
import axios from 'axios';
import debounce from 'lodash/debounce';

const activeTab = ref('addInventory');

interface FormData {
  productName: string;
  stashName: string;
  supplierName: string;
  type: string;
  quantity?: number;
  remark: string;
  productionDate: string;
}

const formData = ref<FormData>({
  productName: '',
  stashName: '',
  supplierName: '',
  type: '',
  quantity: undefined,
  remark: '',
  productionDate: ''
});

const router = useRouter();

const submitForm = async () => {
  try {
    const response = await createInventory(formData.value);
    router.push('/showAllInventory');
  } catch (error) {
    console.error('Error:', error);
    alert('提交失败，请检查网络或联系管理员');
  }
};

// 表单数据
const formData1 = reactive({
  productName: '',
  stashName: '',
  supplierName: ''
});

// 下拉选项
const productOptions = ref([]);
const stashOptions = ref([]);
const supplierOptions = ref([]);

// 加载状态
const productLoading = ref(false);
const stashLoading = ref(false);
const supplierLoading = ref(false);

// 分页参数
const pageSize = 20;

// 控制下拉菜单的可见性
const visibleDropdowns = ref({
  product: false,
  stash: false,
  supplier: false
});

// 防止重复打开标志位
const openFlags = ref({
  product: false,
  stash: false,
  supplier: false
});

const handleFocus = (type: 'product' | 'stash' | 'supplier') => {
  if (!openFlags.value[type]) {
    openFlags.value[type] = true;
    setTimeout(() => {
      openFlags.value[type] = false;
    }, 3000); // 3秒内不允许再次打开

    // 手动触发一次完整查询
    switch (type) {
      case 'product':
        searchProducts('');
        break;
      case 'stash':
        searchStashes('');
        break;
      case 'supplier':
        searchSuppliers('');
        break;
    }
  }
};

const handleVisibleChange = (type: 'product' | 'stash' | 'supplier', isVisible: boolean) => {
  visibleDropdowns.value[type] = isVisible;
};

// 搜索商品
const searchProducts = debounce(async (query: string) => {
  productLoading.value = true;
  productOptions.value = []; // 清空当前选项
  try {
    const res = await selectAllProduct({ productName: query, page: 1, size: pageSize });
    productOptions.value = res.result || [];
    if (res.result?.length === 0) {
      productEmptyMessage.value = '找不到数据，请确认您输入的是否正确';
    } else {
      productEmptyMessage.value = '';
    }
  } catch (error) {
    console.error('获取商品失败:', error);
    productOptions.value = [];
    productEmptyMessage.value = '找不到数据，请确认您输入的是否正确';
  } finally {
    productLoading.value = false;
  }
}, 300);

// 搜索仓库（假设用的是同一个接口，可替换）
const searchStashes = debounce(async (query: string) => {
  stashLoading.value = true;
  stashOptions.value = []; // 清空当前选项
  try {
    const res = await selectAllStash({ stashName: query, page: 1, size: pageSize });
    stashOptions.value = res.result || [];
    if (res.result?.length === 0) {
      stashEmptyMessage.value = '找不到数据，请确认您输入的是否正确';
    } else {
      stashEmptyMessage.value = '';
    }
  } catch (error) {
    console.error('获取仓库失败:', error);
    stashOptions.value = [];
    stashEmptyMessage.value = '找不到数据，请确认您输入的是否正确';
  } finally {
    stashLoading.value = false;
  }
}, 300);

// 搜索供货商（同理，可能调用其他接口）
const searchSuppliers = debounce(async (query: string) => {
  supplierLoading.value = true;
  supplierOptions.value = []; // 清空当前选项
  try {
    const res = await selectAllSuppliers({ supplierName: query, page: 1, size: pageSize });
    supplierOptions.value = res.result || [];
    if (res.result?.length === 0) {
      supplierEmptyMessage.value = '找不到数据，请确认您输入的是否正确';
    } else {
      supplierEmptyMessage.value = '';
    }
  } catch (error) {
    console.error('获取供货商失败:', error);
    supplierOptions.value = [];
    supplierEmptyMessage.value = '找不到数据，请确认您输入的是否正确';
  } finally {
    supplierLoading.value = false;
  }
}, 300);

// 空消息提示
const productEmptyMessage = ref('');
const stashEmptyMessage = ref('');
const supplierEmptyMessage = ref('');
</script>

<style scoped>
.inventory-management {
  padding: 20px;
}

.el-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}

.el-form-item {
  display: flex;
  align-items: center;
}

.el-form-item .el-input,
.el-form-item .el-input-number,
.el-form-item .el-date-picker {
  width: 100%;
}

/* 确保下拉列表正确显示 */
.custom-dropdown .el-select-dropdown__list {
  position: absolute;
  z-index: 1000;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
}

/* 自定义 empty 消息样式 */
.custom-dropdown .el-select-dropdown__empty p {
  margin: 10px;
  color: #909399;
  text-align: center;
}
</style>



