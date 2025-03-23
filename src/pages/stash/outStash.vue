<template>
  <div class="inventory-management">
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="入库" name="inbound">
          <el-form :model="inboundForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="商品名称">
                  <el-input v-model="inboundForm.productName">
                    <template #append>
                      <el-button @click="openSelectDialog('inbound')">选择</el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类别">
                  <el-input v-model="inboundForm.category"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="仓库名称">
                  <el-input v-model="inboundForm.stashName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="供应商名称">
                  <el-input v-model="inboundForm.supplierName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="存储温度">
                  <el-input v-model="inboundForm.storageTemperature"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input v-model="inboundForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="保质期（天）">
                  <el-input-number v-model="inboundForm.shelfLife" :min="1"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生产日期">
                  <el-date-picker
                    v-model="inboundForm.productTime"
                    type="date"
                    placeholder="选择日期"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="数量">
                  <el-input-number v-model="inboundForm.quantity" :min="1"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品图片">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                    :auto-upload="false"
                    ref="uploadRef">
                    <i class="el-icon-plus"></i>
                    <template #tip>
                      <div class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                    </template>
                  </el-upload>
                  <el-dialog :visible.sync="dialogImageUrlVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                  <el-button style="margin-top: 10px;" type="success" @click="submitUpload">提交图片</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="handleInboundSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="出库" name="outbound">
          <el-form :model="outboundForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="商品名称">
                  <el-input v-model="outboundForm.productName">
                    <template #append>
                      <el-button @click="openSelectDialog('outbound')">选择</el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数量">
                  <el-input-number v-model="outboundForm.quantity" :min="1"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="出库原因">
                  <el-input v-model="outboundForm.reason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="handleOutboundSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <el-table :data="inventoryData" style="width: 100%; margin-top: 20px;">
        <el-table-column prop="productName" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="category" label="类别" width="180"></el-table-column>
        <el-table-column prop="stashName" label="仓库名称" width="180"></el-table-column>
        <el-table-column prop="supplierName" label="供应商名称" width="180"></el-table-column>
        <el-table-column prop="storageTemperature" label="存储温度" width="180"></el-table-column>
        <el-table-column prop="remark" label="备注" width="180"></el-table-column>
        <el-table-column prop="shelfLife" label="保质期（天）" width="180"></el-table-column>
        <el-table-column prop="productTime" label="生产日期" width="180"></el-table-column>
        <el-table-column prop="quantity" label="库存数量" width="180"></el-table-column>
        <el-table-column prop="imageUrl" label="商品图片" width="180">
          <template #default="scope">
            <img v-if="scope.row.imageUrl" :src="scope.row.imageUrl" alt="Product Image" style="max-width: 100px; max-height: 100px;">
            <span v-else>无图片</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="选择商品" v-model="dialogVisible" width="30%">
      <el-select v-model="selectedItem" placeholder="请选择商品" filterable>
        <el-option
          v-for="item in templateItems"
          :key="item.productId"
          :label="item.productName"
          :value="item.productName">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSelection">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, useRoute } from 'element-plus';

const route = useRoute();
const activeTab = ref(route.query.tab || 'inbound');
const uploadRef = ref(null);

const inboundForm = reactive({
  productName: '',
  category: '',
  stashName: '',
  supplierName: '',
  storageTemperature: '',
  remark: '',
  shelfLife: 1,
  productTime: '',
  quantity: 1,
  imageUrl: '',
});

const outboundForm = reactive({
  productName: '',
  quantity: 1,
  reason: '',
});

const inventoryData = ref([
  // 初始数据为空
]);

const dialogVisible = ref(false);
const selectedItem = ref('');
const selectedType = ref('');
const dialogImageUrlVisible = ref(false);
const dialogImageUrl = ref('');
const fileList = ref([]);

const templateItems = [];

const openSelectDialog = (type) => {
  dialogVisible.value = true;
  selectedType.value = type;
};

const confirmSelection = () => {
  if (selectedType.value === 'inbound') {
    inboundForm.productName = selectedItem.value;
  } else if (selectedType.value === 'outbound') {
    outboundForm.productName = selectedItem.value;
  }
  dialogVisible.value = false;
  selectedItem.value = '';
};

const handleInboundSubmit = () => {
  const itemIndex = inventoryData.value.findIndex(item => item.productName === inboundForm.productName);
  if (itemIndex !== -1) {
    inventoryData.value[itemIndex].quantity += inboundForm.quantity;
  } else {
    inventoryData.value.push({ ...inboundForm });
  }
  resetForm(inboundForm);
};

const handleOutboundSubmit = () => {
  const itemIndex = inventoryData.value.findIndex(item => item.productName === outboundForm.productName);
  if (itemIndex !== -1 && inventoryData.value[itemIndex].quantity >= outboundForm.quantity) {
    inventoryData.value[itemIndex].quantity -= outboundForm.quantity;
    if (inventoryData.value[itemIndex].quantity === 0) {
      inventoryData.value.splice(itemIndex, 1);
    }
  } else {
    ElMessage.error('库存不足或商品不存在');
  }
  resetForm(outboundForm);
};

const resetForm = (form) => {
  form.productName = '';
  form.category = '';
  form.stashName = '';
  form.supplierName = '';
  form.storageTemperature = '';
  form.remark = '';
  form.shelfLife = 1;
  form.productTime = '';
  form.quantity = 1;
  form.imageUrl = '';
  form.reason = '';
  fileList.value = [];
};

const handleRemove = (file, fileList) => {
  console.log(file, fileList);
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogImageUrlVisible.value = true;
};

const beforeUpload = (file) => {
  const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPGorPNG) {
    ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
  }

  return isJPGorPNG && isLt2M;
};

const submitUpload = () => {
  uploadRef.value.submit();
};

onMounted(() => {
  // 初始化时根据查询参数设置活动标签
  activeTab.value = route.query.tab || 'inbound';
});
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
</style>



