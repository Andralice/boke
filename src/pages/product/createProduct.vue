<template>
  <div class="inventory-management">
    <el-card shadow="hover" class="main-container">
      <el-tabs v-model="activeTab" type="card">
        <!-- 库存管理表单 -->
        <el-tab-pane label="添加商品" name="inventoryManagement">
          <el-form :model="inboundForm" label-width="120px" :rules="rules" ref="formRef" class="custom-form">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="商品名称*" prop="productName">
                  <el-input v-model="inboundForm.productName">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类别*" prop="category">
                  <el-input v-model="inboundForm.category"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">

              <el-col :span="12">
                <el-form-item label="存储方式*" prop="storageTemperature">
                  <el-select v-model="inboundForm.storageTemperature" placeholder="请选择存储方式">
                    <el-option label="冷藏" value="冷藏"></el-option>
                    <el-option label="阴凉" value="阴凉"></el-option>
                    <el-option label="常温" value="常温"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="生产商*" prop="manufacturer">
                  <el-input v-model="inboundForm.manufacturer"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保质期(月)*" prop="shelfLife">
                  <el-input-number v-model="inboundForm.shelfLife" :min="1" placeholder="请输入保质期"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">

              <el-col :span="12">
                <el-form-item label="图片上传*" prop="imageUrl">
                  <el-upload action="#" :auto-upload="false" :on-change="handleFileChange" accept="image/*">
                    <el-button slot="trigger" type="primary">选取文件</el-button>
                  </el-upload>
                  <div v-if="previews.length > 0" class="preview-container">
                    <img :src="previews[0]" alt="Preview" class="preview-image">
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="添加备注">
                  <el-input type="textarea" v-model="inboundForm.remark" :rows="6" placeholder="在这里输入您的备注..."></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="success" :disabled="isSubmitting || !inboundForm.imageUrl" @click="submitInboundForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 商品选择对话框 -->
    <el-dialog title="选择商品" v-model="dialogVisible" width="30%">
      <!-- 对话框内容需要根据实际需求填充 -->
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'; // 新增路由依赖
import { createProduct } from '@/api/product/product';
import { arrayBufferToBase64, compressImage } from '@/util/imageUtils';

interface FormData {
  productName: string;
  category: string;
  storageTemperature: string;
  remark: string;
  imageUrl: string;
  shelfLife: number;
  manufacturer:string;
}

const formRef = ref();
const inboundForm = reactive<FormData>({
  productName: '',
  category: '',
  storageTemperature: '',
  remark: '',
  imageUrl: '',
  shelfLife: 0,
  manufacturer:'',
});

const router = useRouter();
const previews = ref<string[]>([]);
const isSubmitting = ref(false);
const activeTab = ref('inventoryManagement');
const dialogVisible = ref(false);

const rules = {
  productName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  category: [{ required: true, message: '请输入商品类别', trigger: 'blur' }],
  stashName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
  storageTemperature: [{ required: true, message: '请选择存储方式', trigger: 'change' }],
  supplierName: [{ required: true, message: '请输入供货商', trigger: 'blur' }],
  shelfLife: [{ required: true, message: '请输入保质期', trigger: 'blur' }],
  productTime: [{ required: true, message: '请选择生产日期', trigger: 'change' }],
  imageUrl: [{ required: true, message: '请上传图片', trigger: 'change' }],
};

function handleFileChange(file: any) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    if (e.target?.result instanceof ArrayBuffer) {
      const imgBuffer = e.target.result;
      const base64String = arrayBufferToBase64(imgBuffer);
      const img = new Image();
      img.src = `data:image/jpeg;base64,${base64String}`;
      img.onload = () => {
        const compressedBase64 = compressImage(img, 200 * 1024);
        previews.value = [URL.createObjectURL(file.raw)];
        inboundForm.imageUrl = compressedBase64;
      };
    }
  };
  reader.readAsArrayBuffer(file.raw);
}

async function submitInboundForm() {
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return;
    isSubmitting.value = true;
    try {
      const response = await createProduct(inboundForm);
      router.push('/showALLProduct');
      ElMessage.success('商品新增成功！');
    } catch (error) {
      console.error('Error:', error);
      ElMessage.error('提交失败，请检查网络或联系管理员');
    } finally {
      isSubmitting.value = false;
    }
  });
}

function openSelectDialog(tab: string) {
  dialogVisible.value = true;
}
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
