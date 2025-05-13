<template>
  <div class="addstore-body">
    <el-card shadow="hover" class="main-container grid-layout">
      <el-tabs v-model="activeTab" type="card">
        <!-- 更新商品表单 -->
        <el-tab-pane label="更新商品" name="updateProduct">
          <el-form :model="formData" label-width="120px" :rules="rules" ref="formRef" class="custom-form">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="商品名称*" prop="productName">
                  <el-input v-model="formData.productName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品类别*" prop="category">
                  <el-input v-model="formData.category"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="仓库名称*" prop="stashName">
                  <el-input v-model="formData.stashName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="存储方式*" prop="storageTemperature">
                  <el-select v-model="formData.storageTemperature" placeholder="请选择存储方式">
                    <el-option value="冷藏">冷藏</el-option>
                    <el-option value="阴凉">阴凉</el-option>
                    <el-option value="常温">常温</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="生产日期*" prop="productTime">
                  <el-date-picker v-model="formData.productTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保质期(月)*" prop="shelfLife">
                  <el-input v-model="formData.shelfLife"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="生产商*" prop="manufacturer">
                  <el-input v-model="formData.manufacturer"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上传图片">
                  <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change="handleFileChange">
                    <i slot="default" class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="添加备注">
                  <el-input type="textarea" v-model="formData.remark" :rows="2" placeholder="在这里输入您的备注..."></el-input>
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
    <!-- 图片预览区域 -->
    <div class="previews">
      <div v-for="(preview, index) in previews" :key="index" class="preview-item">
        <img :src="preview" alt="Preview" class="preview-image">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name='updateProduct'>
import { ref, onMounted } from 'vue';
import { selectProductById, updateProduct } from '@/api/product/product';
import { useRouter, useRoute } from 'vue-router'; // 新增路由依赖
import { arrayBufferToBase64, compressImage } from '@/util/imageUtils';

interface FormData {
  productId?: number;
  productName: string;  // 商品名称
  category: string; // 商品类别
  stashName: string; // 仓库名称
  storageTemperature: string; // 存储方式
  manufacturer: string; // 供货商
  remark: string; // 备注
  imageUrl: string; // 图片二进制数据
  shelfLife: number; // 保质期
  productTime: string; // 生产日期
}

const formData = ref<FormData>({
  productName: '',
  category: '',
  stashName: '',
  storageTemperature: '',
  manufacturer: '',
  remark: '',
  imageUrl: '',
  shelfLife: 0,
  productTime: '',
});

// 新增路由参数获取
const router = useRouter();
const route = useRoute();

const productId = ref<number>(parseInt(route.params.id as string) || 0); // 从URL参数获取产品ID

// 新增：加载现有商品数据（编辑页面需要预加载数据）
onMounted(async () => {
  if (productId.value) {
    try {
      const response = await selectProductById(productId.value); // 调用接口获取商品数据
      formData.value = response.result;
      if (formData.value.imageUrl) {
        previews.value = [formData.value.imageUrl]; // 初始化预览数组
      }
    } catch (error) {
      console.error('Failed to load product data', error);
      alert('无法加载商品信息，请检查网络或联系管理员');
    }
  }
});

const activeTab = ref('updateProduct');

const rules = ref({
  productName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  category: [{ required: true, message: '请输入商品类别', trigger: 'blur' }],
  stashName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
  storageTemperature: [{ required: true, message: '请选择存储方式', trigger: 'change' }],
  manufacturer: [{ required: true, message: '请输入生产商', trigger: 'blur' }],
  shelfLife: [{ required: true, message: '请输入保质期', trigger: 'blur' }],
  productTime: [{ required: true, message: '请选择生产日期', trigger: 'change' }],
});

const previews = ref<string[]>([]);

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];

    // 使用 FileReader 读取文件
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        // 将 ArrayBuffer 转换为 Base64 编码的字符串
        const imgBuffer = e.target.result;
        const base64String = arrayBufferToBase64(imgBuffer);

        // 创建一个临时的 Image 对象来加载图片数据
        const img = new Image();
        img.src = `data:image/jpeg;base64,${base64String}`;
        img.onload = () => {
          // 压缩图片并获取压缩后的 Base64 编码字符串
          const compressedBase64 = compressImage(img, 200 * 1024); // 目标大小为 200KB

          previews.value = [compressedBase64]; // 更新预览数组
          formData.value.imageUrl = compressedBase64; // 更新 Base64 编码的图片数据
        };
      }
    };

    reader.readAsArrayBuffer(file);
  }
}

function clearNote() {
  formData.value.remark = '';
}

async function submitForm() {
  formData.value.productId = productId.value;
  try {
    const response = await updateProduct(formData.value); // 调用更新接口
    router.push('/showALLProduct');
  } catch (error) {
    console.error('Error updating Product', error);
    alert('更新失败，请检查网络或联系管理员');
  }
}
</script>

<style scoped>
.addstore-body {
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

/* 添加预览样式 */
.previews {
  margin-top: 20px;
}

.preview-item img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>



