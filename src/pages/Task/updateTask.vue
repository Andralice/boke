<template>
    <div class="addstore-body">
        <h1>新增任务</h1>

        <!-- 新增仓库输入框模块 -->
        <div class="new-stash-container">
            <h2>新增任务信息</h2>
            <div class="stash-input-row">
                <div class="stash-input-group">
                    <label for="任务名称">任务名称</label>
                    <input type="text" id="任务名称" placeholder="请输入任务名称" v-model="formData.taskName">
                </div>

                <div class="stash-input-group">
                    <label for="管理员名称">管理员名称</label>
                    <input type="text" id="管理员名称" placeholder="请输入管理员名称" v-model="formData.taskAdminName">
                </div>

                <div class="stash-input-group">
                    <label for="执行人员">执行人员</label>
                    <input type="text" id="执行人员" placeholder="请输入执行人员" v-model="formData.taskUserNames">
                </div>
            </div>
            <div class="stash-input-row">
                <div class="stash-input-group">
                    <label for="任务类型">任务类型</label>
                    <select id="任务类型" v-model="formData.taskType">
                        <option value="">请选择任务类型</option>
                        <option value="入库搬运">入库搬运</option>
                        <option value="入库统计">入库统计</option>
                        <option value="出库搬运">出库搬运</option>
                        <option value="出库统计">出库统计</option>
                    </select>
                </div>



                <div class="preview-container">
                    <div v-if="previews.length > 0" class="preview-item">
                        <img :src="previews[0]" alt="Preview" class="preview-image">
                    </div>
                </div>
            </div>
        </div>
                        <!-- 备注 -->
                        <div class="note-container">
                    <div class="header">
                        <h2>任务描述</h2>
                        <button class="note-button" @click="clearNote()">任务描述</button>
                    </div>
                    <textarea id="note-input" placeholder="在这里输入您的任务描述..."
                        v-model="formData.taskDescription">
                    </textarea>
                </div>

        <!-- 提交按钮 -->
        <div class="addstore-button">
            <button :disabled="isSubmitting" @click="submitForm">提交</button>
        </div>
    </div>
</template>

<script lang="ts" setup name='createTask'>
import { ref,onMounted } from 'vue';
import { updateTask, selectTaskById } from '@/api/Task/task';
import { useRouter,useRoute } from 'vue-router'; // 新增路由依赖

interface FormData {
    taskName: string;
    taskDescription: string;
    taskStatus: string;
    taskType: string;
    taskAdminName: string;
    taskUserNames: string;
}

const formData = ref<FormData>({
    taskName: "",
    taskDescription: "",
    taskStatus: "",
    taskType: "",
    taskAdminName: "",
    taskUserNames: ""
});

const router = useRouter();
const route = useRoute();
const previews = ref<string[]>([]);
const isSubmitting = ref(false);
const taskId = ref<number>(parseInt(route.params.id as string) || 0); // 从URL参数获取仓库ID

function clearNote() {
    formData.value.taskDescription = '';
}

async function submitForm() {
    isSubmitting.value = true;
    try {
        // 发送请求
        const response = await updateTask(formData.value);
        router.push('/showALLTask');
    } catch (error) {
        console.error('Error:', error);
        alert('提交失败，请检查网络或联系管理员');
    } finally {
        isSubmitting.value = false;
    }
}

  // 新增：加载现有仓库数据（编辑页面需要预加载数据）
  onMounted(async () => {
  if (taskId.value) {
    try {
      const response = await selectTaskById(taskId.value); // 调用更新后的接口
      formData.value = response.result;
    } catch (error) {
      console.error('Failed to load stash data', error);
      alert('无法加载仓库信息，请检查网络或联系管理员');
    }
  }
});
  
</script>












<style scoped>
.addstore-body {
    width: 100%;
    height: auto;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f9f9f9;
    /* 轻微背景色 */
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    font-weight: 600;
}

.new-stash-container {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    margin-bottom: 20px;
    background-color: white;
}

.new-stash-container h2 {
    margin-bottom: 10px;
    font-size: 20px;
    color: #333;
    font-weight: 500;
}

.new-stash-container:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.stash-input-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.stash-input-group {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 250px;
    margin-bottom: 10px;
}

.stash-input-group label {
    font-weight: 500;
    width: 120px;
    /* 固定宽度以确保对齐 */
    margin-right: 10px;
    color: #555;
}

.stash-input-group input,
.stash-input-group select {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    font-size: 14px;
    color: #333;
}

.stash-input-group input:focus,
.stash-input-group select:focus {
    border-color: #007bff;
}

.preview-container {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.preview-item {
    display: flex;
    align-items: center;
    justify-content: center;
}

.preview-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.note-container {
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    transition: box-shadow 0.3s ease;
}

.note-container:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.header h2 {
    font-size: 18px;
    color: #333;
    font-weight: 500;
}

textarea {
    width: 98%;
    height: 140px;
    resize: vertical;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    font-size: 14px;
    color: #333;
}

textarea:focus {
    border-color: #007bff;
}

.note-button {
    margin-left: 10px;
    height: 40px;
    background-color: #555;
    /* 更柔和的颜色 */
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.note-button:hover {
    background-color: #333;
}

.addstore-button {
    position: fixed;
    right: 80px;
    bottom: 80px;
    /* 向上移动一些 */
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.addstore-button button {
    width: 200px;
    /* 减少宽度 */
    height: 40px;
    /* 减少高度 */
    color: white;
    background-color: #555;
    /* 更柔和的颜色 */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;
    font-weight: 500;
}

.addstore-button button:hover {
    background-color: #333;
}
</style>