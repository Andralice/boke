<template>
    <div class="showStore-body">
        <h1>库存概览</h1>
        <!-- 导航区 -->
        <div>
            <div class="showStore_container">
                <div class="showSotre-group">
                    <label for="仓库名称" class="showStore-group-label">仓库名称</label>
                    <select id="仓库名称" v-model="formData.仓库名称">
                        <option value="">请选择仓库名称</option>
                        <option value="仓库A">仓库A</option>
                        <option value="仓库B">仓库B</option>
                        <option value="仓库C">仓库C</option>
                    </select>
                </div>
                <div class="showSotre-group">
                    <label for="仓库联系人" class="showStore-group-label">仓库联系人</label>
                    <select id="仓库联系人" v-model="formData.仓库联系人">
                        <option value="">请选择仓库联系人</option>
                        <option value="联系人A">联系人A</option>
                        <option value="联系人B">联系人B</option>
                        <option value="联系人C">联系人C</option>
                    </select>
                </div>
                <div class="showSotre-group">
                    <label for="供货商" class="showStore-group-label">供货商</label>
                    <select id="供货商" v-model="formData.供货商">
                        <option value="">请选择供货商</option>
                        <option value="供货商A">供货商A</option>
                        <option value="供货商B">供货商B</option>
                        <option value="供货商C">供货商C</option>
                    </select>
                </div>
            </div>
            <div class="showStore_container">
                <div class="showSotre-group">
                    <label for="货物名称" class="showStore-group-label">货物名称</label>
                    <input type="text" id="货物名称" placeholder="请输入货物名称" v-model="formData.货物名称">
                </div>
                <div class="showSotre-group">
                    <label for="货物编号" class="showStore-group-label">货物编号</label>
                    <input type="text" id="货物编号" placeholder="请输入货物编号" v-model="formData.货物编号">
                </div>
                <div class="showSotre-group">
                    <label for="入库时间" class="showStore-group-label">入库时间</label>
                    <input type="text" id="入库时间" placeholder="请输入入库时间" v-model="formData.入库时间">
                </div>
                <div class="showSotre-group">
                    <label for="存储温度" class="showStore-group-label">存储温度</label>
                    <select id="存储温度" v-model="formData.存储温度">
                        <option value="">请选择存储温度</option>
                        <option value="-20°~0°">冷藏：-20°~0°</option>
                        <option value="0°~20°">阴凉： 0°~20°</option>
                        <option value="20°~40°">常温： 20°~40°</option>
                    </select>
                </div>
                <div class="showSotre-group">
                    <button for="存储温度" class="showStore-group-label-right" @click="navigateToAddPage">新增</button>
                </div>
            </div>
        </div>

        <!-- 内容区 -->
        <div class="nav-body">
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>货物图片</th>
                        <th>货物名称</th>
                        <th>货物数量</th>
                        <th>储存温度</th>
                        <th>入库时间</th>
                        <th>存储时间</th>
                        <th>剩余时间</th>
                        <th>仓库地址</th>
                        <th>联系人</th>
                        <th>联系电话</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedData" :key="index">
                        <td>{{ (currentPage - 1) * rowsPerPage + index + 1 }}</td>
                        <td><img :src="item.goodsImage" alt="Goods Image" style="width: 50px; height: 50px;"></td>
                        <td>{{ item.goodsName }}</td>
                        <td>{{ item.goodsQuantity }}</td>
                        <td>{{ item.storageTemperature }}</td>
                        <td>{{ item.inboundTime }}</td>
                        <td>{{ item.storageTime }}</td>
                        <td>{{ item.remainingTime }}</td>
                        <td>{{ item.warehouseAddress }}</td>
                        <td>{{ item.contactPerson }}</td>
                        <td>{{ item.contactPhone }}</td>
                        <td><button @click="editItem(item)">编辑</button></td>
                    </tr>
                    <tr v-if="paginatedData.length === 0">
                        <td colspan="12" class="no-data">无数据</td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup name='showStore'>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import dataJson from '@/pages/Store/ShowStore/showStore.json';


const router = useRouter(); // 初始化router

interface FormData {
    仓库名称: string;
    仓库地址: string;
    仓库联系人: string;
    货物名称: string;
    货物编号: string;
    入库时间: string;
    供货商: string;
    存储时间: string;
    存储温度: string;
}

const formData = ref<FormData>({
    仓库名称: '',
    仓库地址: '',
    仓库联系人: '',
    货物名称: '',
    货物编号: '',
    入库时间: '',
    供货商: '',
    存储时间: '',
    存储温度: ''
});

interface Item {
    goodsImage: string;
    goodsName: string;
    goodsQuantity: number;
    storageTemperature: string;
    inboundTime: string;
    storageTime: string;
    remainingTime: string;
    warehouseAddress: string;
    contactPerson: string;
    contactPhone: string;
}

const data = ref<Item[]>([]);
const currentPage = ref(1);
const rowsPerPage = 10;

const fetchData = async () => {
    data.value = dataJson.data as Item[];
};

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(data.value.length / rowsPerPage));

const changePage = (page: number) => {
    currentPage.value = page;
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const editItem = (item: Item) => {
    router.push('/editStore'); // 跳转到指定页面
    console.log("Edit item:", item);
};

const navigateToAddPage = () => {
    router.push('/addStore'); // 跳转到指定页面
};


onMounted(() => {
    fetchData();
});
</script>

<style scoped>
.showStore-body {
    width: 100%;
}

.showStore_container {
    display: flex;
    background-color: skyblue;
    justify-content: flex-start;
    width: calc(100% - 20px);
    height: 20%;
    flex-direction: row;
    gap: 20px;
    padding-bottom: 10px;
    padding-left: 10px;
    font-size: 16px;
}

.showStore-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.showStore-group-label {
    padding-right: 10px;
}
.showStore-group-label-right {
    position:absolute;
    right: 30px;
    width: 120px;
    height: 30px;
    top: 120px;
}
.showStore-group-label-right:hover{
    color: #FFFFFF;
    background-color: #004df2;
}
/* 添加或修改以下规则 */
.showStore-group select,
.showStore-group input {
    height: 40px;
    font-size: 16px;
    /* 根据需要调整字体大小 */
}

.nav-body {
    margin-top: 20px;
    padding: 20px;
    width: calc(100% - 50px);
    background-color: rgba(224, 217, 217, 0.5); /* 红色，50% 透明度 */
    height: 700px;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    padding: 4px;
    text-align: center;
    border: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

tr:hover {
    background-color: #f1f1f1;
}

.no-data {
    text-align: center;
    padding: 20px;
}

.pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.pagination span {
    margin: 0 10px;
}
</style>



