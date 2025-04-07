<template>
  <div class="addstore-body">
    <el-card shadow="hover" class="main-container">
      <div class="header-title">
        <h1>新增商品</h1>
      </div>

      <!-- 新增商品表单 -->
      <el-form :model="formData" label-width="120px" :rules="rules" ref="formRef">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="商品名称" prop="productName">
              <el-input v-model="formData.productName" placeholder="请输入商品名称" class="expanded-input" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品类别" prop="category">
              <el-input v-model="formData.category" placeholder="请输入商品类别" class="expanded-input" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="仓库名称" prop="stashName">
              <el-input v-model="formData.stashName" placeholder="请输入仓库名称" class="expanded-input" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存储方式" prop="storageTemperature">
              <el-select v-model="formData.storageTemperature" placeholder="请选择存储方式" class="expanded-input">
                <el-option label="冷藏" value="冷藏"></el-option>
                <el-option label="阴凉" value="阴凉"></el-option>
                <el-option label="常温" value="常温"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="生产日期" prop="productTime">
              <el-date-picker v-model="formData.productTime" type="date" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" class="expanded-input" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保质期(月)" prop="shelfLife">
              <el-input-number v-model="formData.shelfLife" :min="1" placeholder="请输入保质期" class="expanded-input" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="供货商" prop="supplierName">
              <el-input v-model="formData.supplierName" placeholder="请输入供货商" class="expanded-input" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片上传" prop="imageUrl">
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
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 备注输入框改为在供应商下方 -->
        <el-row :gutter="30">
          <el-col :span="12" :offset="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="formData.remark"
                placeholder="请输入备注"
                type="textarea"
                class="expanded-input"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup name='createProduct'>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { createProduct } from '@/api/product/product';
import { useRouter } from 'vue-router'; // 新增路由依赖
import { arrayBufferToBase64, compressImage } from '@/util/imageUtils';

interface FormData {
  productName: string;
  category: string;
  stashName: string;
  storageTemperature: string;
  supplierName: string;
  remark: string;
  imageUrl: string;
  shelfLife: number;
  productTime: string;
}

const formRef = ref();
const formData = reactive<FormData>({
  productName: '',
  category: '',
  stashName: '',
  storageTemperature: '',
  supplierName: '',
  remark: '',
  imageUrl: '',
  shelfLife: 0,
  productTime: '',
});

const router = useRouter();
const previews = ref<string[]>([]);
const isSubmitting = ref(false);

const rules = {
  productName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  category: [{ required: true, message: '请输入商品类别', trigger: 'blur' }],
  stashName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
  storageTemperature: [{ required: true, message: '请选择存储方式', trigger: 'change' }],
  supplierName: [{ required: true, message: '请输入供货商', trigger: 'blur' }],
  shelfLife: [{ required: true, message: '请输入保质期', trigger: 'blur' }],
  productTime: [{ required: true, message: '请选择生产日期', trigger: 'change' }],
  // 图片上传不再是必填项
  imageUrl: [{ required: false, message: '请上传图片', trigger: 'change' }],
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
        formData.imageUrl = compressedBase64;
      };
    }
  };

  reader.readAsArrayBuffer(file.raw);
}

function submitForm() {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return;

    isSubmitting.value = true;
    try {
      const response = await createProduct(formData);
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
</script>

<style scoped>
.addstore-body {
  width: 100%;
  padding: 10px; /* 缩小容器的内边距，使其紧凑 */
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}

.main-container {
  width: 100%;
  max-width: 1200px;
  padding: 10px; /* 缩小容器内边距，使内容紧凑 */
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.header-title {
  text-align: left;
  margin-bottom: 20px; /* 减少标题与表单之间的空间 */
}

.header-title h1 {
  font-size: 40px;
  font-family: 'Arial', sans-serif;
  font-weight: normal;
  color: #2c3e50;
}

.el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 适当减少表单项之间的间距 */
}

.el-form-item label {
  width: 150px; /* 增加标签宽度 */
  margin-right: 20px; /* 给标签和输入框之间增加空隙 */
  text-align: left; /* 确保标签文本左对齐 */
}

.el-form-item .el-input,
.el-form-item .el-input-number,
.el-form-item .el-date-picker,
.el-form-item .el-select {
  width: 100%;
}

.expanded-input .el-input__inner,
.expanded-input .el-textarea__inner {
  font-size: 16px;
  height: 48px;
  line-height: 48px;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding-left: 12px; /* 增加输入框内的内边距，让输入框内容离边缘稍远 */
}

.el-button {
  font-size: 16px;
  padding: 12px 28px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.el-upload .el-upload__tip {
  color: #999;
  font-size: 14px;
}

@media (max-width: 1400px) {
  .main-container {
    width: 95%;
  }
}

@media (max-width: 1200px) {
  .el-col {
    flex-basis: 100%;
  }
}
</style>
