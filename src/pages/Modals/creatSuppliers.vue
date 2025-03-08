<template>
    <el-dialog 
      title="新增供应商" 
      v-model="localVisible" 
      width="40%" 
      @close="handleClose"
      custom-class="supplier-dialog"
      :close-on-click-modal="false"
    >
      <!-- 直接在 el-dialog 内部使用具名插槽 -->
      <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="120px">
        <el-form-item label="供应商名称" prop="supplierName">
          <el-input v-model="form.supplierName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="contactName">
          <el-input v-model="form.contactName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input v-model="form.bankAccount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="合作状态">
          <el-switch v-model="form.cooperationStatus"></el-switch>
        </el-form-item>
      </el-form>
  
      <!-- 使用具名插槽 #footer -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script lang="ts" setup name="creatSuppliers">
  import { ref, reactive, watch, defineProps, defineEmits } from 'vue';
  import { ElForm, ElFormItem, ElInput, ElDialog, ElButton, ElSwitch } from 'element-plus';
  
  // Props
  const props = defineProps({
    visible: Boolean
  });
  
  // 控制弹窗显示/隐藏
  const localVisible = ref(false);
  
  // 表单引用
  const ruleFormRef = ref(null);
  
  // 表单数据
  const form = reactive({
    supplierName: '',
    contactName: '',
    contactPhone: '',
    address: '',
    bankAccount: '',
    cooperationStatus: false
  });
  
  // 表单验证规则
  const rules = reactive({
    supplierName: [
      { required: true, message: '请输入供应商名称', trigger: 'blur' }
    ],
    contactName: [
      { required: true, message: '请输入联系人姓名', trigger: 'blur' }
    ],
    contactPhone: [
      { required: true, message: '请输入联系电话', trigger: 'blur' }
    ],
    address: [
      { required: true, message: '请输入详细地址', trigger: 'blur' }
    ],
    bankAccount: [
      { required: true, message: '请输入银行账号', trigger: 'blur' }
    ]
  });
  
  // 监听 props 的 visible 变化
  watch(() => props.visible, (newVal) => {
    localVisible.value = newVal;
  });
  
  // 提交表单
  const submitForm = (formEl) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        alert('提交成功!');
        // 这里可以添加发送数据到服务器的逻辑
        console.log(form);
        emit('update:visible', false); // 关闭弹窗
        emit('submit', form); // 触发 submit 事件
      } else {
        console.log('验证失败');
        return false;
      }
    });
  };
  
  // 重置表单
  const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
    handleClose();
  };
  
  // 处理关闭事件
  const handleClose = () => {
    emit('update:visible', false);
  };
  
  // 定义 emit 方法
  const emit = defineEmits(['update:visible', 'submit']);
  </script>
  
  <style scoped>
  /* 弹窗容器 */
  .supplier-dialog {
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
  
  /* 对话框内容 */
  .dialog-content {
    padding: 20px;
  }
  
  /* 表单项 */
  .el-form-item {
    margin-bottom: 20px;
  }
  
  /* 输入框 */
  .el-input {
    width: 100%;
  }
  
  /* 按钮组 */
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  /* 取消按钮 */
  .el-button {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  /* 确定按钮 */
  .el-button--primary {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  
  /* 确定按钮悬停效果 */
  .el-button--primary:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
  }
  </style>