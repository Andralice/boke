<template>
  <div class="addstore-body">
    <!-- 主体容器 -->
    <el-card shadow="always" class="main-container">
      <div class="header-title">
        <h1>新增商品</h1>
      </div>

      <!-- 新增仓库输入框模块 -->
      <div class="new-stash-container">
        <el-form :model="formData" label-width="180px" :rules="rules" ref="formRef">
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="商品名称" prop="productName">
                <el-input v-model="formData.productName" placeholder="请输入商品名称" class="expanded-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品类别" prop="category">
                <el-input v-model="formData.category" placeholder="请输入商品类别" class="expanded-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="仓库名称" prop="stashName">
                <el-input v-model="formData.stashName" placeholder="请输入仓库名称" class="expanded-input"></el-input>
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
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="生产日期" prop="productTime">
                <el-date-picker v-model="formData.productTime" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="选择日期" class="expanded-input"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="保质期(月)" prop="shelfLife">
                <el-input-number v-model="formData.shelfLife" :min="1" placeholder="请输入保质期" class="expanded-input"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="供货商" prop="supplierName">
                <el-input v-model="formData.supplierName" placeholder="请输入供货商" class="expanded-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图片上传" prop="imageUrl">
                <el-upload action="#" :auto-upload="false" :on-change="handleFileChange" accept="image/*">
                  <el-button slot="trigger" type="primary">选取文件</el-button>
                </el-upload>
                <div v-if="previews.length > 0" class="preview-container">
                  <img :src="previews[0]" alt="Preview" class="preview-image">
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 备注 -->
      <div class="note-container">
        <div class="header">
          <h2>添加备注</h2>
          <el-button type="danger" @click="clearNote()">清除备注</el-button>
        </div>
        <el-input type="textarea" v-model="formData.remark" :rows="6" placeholder="在这里输入您的备注..." class="expanded-textarea"></el-input>
      </div>

      <!-- 提交按钮 -->
      <div class="addstore-button">
        <el-button type="success" :disabled="isSubmitting || !formData.imageUrl" @click="submitForm">提交</el-button>
      </div>
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
  productName: string;  // 商品名称
  category: string; // 商品类别
  stashName: string; // 仓库名称
  storageTemperature: string; // 存储方式
  supplierName: string; // 供货商
  remark: string; // 备注
  imageUrl: string; // 图片二进制数据
  shelfLife: number; // 保质期
  productTime: string; // 生产日期
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
        formData.imageUrl = compressedBase64;
      };
    }
  };

  reader.readAsArrayBuffer(file.raw);
}

function clearNote() {
  formData.remark = '';
}

async function submitForm() {
  await formRef.value.validate(async (valid: boolean) => {
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
  width: 100%; /* 设置主体宽度为100% */
  padding: 40px; /* 设置内边距 */
  box-sizing: border-box; /* 包括内边距和边框在内的总宽度和高度 */
  background-color: #f9f9f9; /* 设置背景颜色 */
  display: flex; /* 使用Flexbox布局 */
  justify-content: center; /* 水平居中 */
  align-items: flex-start; /* 垂直居中对齐改为垂直开始对齐 */
  min-height: 100vh; /* 最小高度为视口高度 */
  margin-top: -40px; /* 使用负的顶部外边距提升容器 */
}

.main-container {
  width: 100%; /* 设置主容器宽度为100% */
  max-width: 1400px; /* 最大宽度为1400px */
  padding: 40px; /* 设置内边距 */
  box-sizing: border-box; /* 包括内边距和边框在内的总宽度和高度 */
  background-color: white; /* 设置背景颜色 */
}

.header-title {
  text-align: left; /* 文字水平靠左 */
  margin-bottom: 30px; /* 下外边距 */
}

.header-title h1 {
  font-size: 32px; /* 字体大小 */
  color: #333; /* 字体颜色 */
  font-weight: 600; /* 字体粗细 */
  margin: 0; /* 移除默认的上下外边距 */
}

.new-stash-container, .note-container {
  margin-bottom: 40px; /* 下外边距 */
}

.header {
  display: flex; /* 使用Flexbox布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中 */
  margin-bottom: 20px; /* 下外边距 */
}

.preview-container {
  margin-top: 20px; /* 上外边距 */
}

.preview-image {
  width: 150px; /* 宽度 */
  height: 150px; /* 高度 */
  object-fit: cover; /* 裁剪图像以适应容器 */
  border: 1px solid #ccc; /* 边框 */
  border-radius: 4px; /* 圆角 */
}

.addstore-button {
  display: flex; /* 使用Flexbox布局 */
  justify-content: flex-end; /* 右对齐 */
  margin-top: 40px; /* 上外边距 */
}

.el-form-item__label {
  font-size: 24px; /* 字体大小 */
  color: #555; /* 字体颜色 */
}

.expanded-input .el-input__inner, .expanded-input .el-textarea__inner, .expanded-input .el-select, .expanded-input .el-date-picker, .expanded-input .el-input-number {
  font-size: 20px; /* 字体大小 */
  height: 48px; /* 高度 */
  line-height: 48px; /* 行高 */
  width: 100%; /* 宽度为100% */
}

.expanded-textarea .el-textarea__inner {
  font-size: 20px; /* 字体大小 */
  height: auto; /* 自动高度 */
  min-height: 150px; /* 最小高度 */
  width: 100%; /* 宽度为100% */
}

.el-button {
  font-size: 18px; /* 字体大小 */
  padding: 14px 28px; /* 内边距 */
}

@media (max-width: 1400px) {
  .main-container {
    width: 95%; /* 宽度为95% */
  }
}

@media (max-width: 1200px) {
  .el-col {
    flex-basis: 50% !important; /* 列宽度为50% */
  }
}

@media (max-width: 992px) {
  .el-col {
    flex-basis: 100% !important; /* 列宽度为100% */
  }
}
</style>



