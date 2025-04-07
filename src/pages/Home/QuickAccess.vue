<template>
  <div class="region region2">
    <div class="header">
      <span class="icon quick-access-icon"></span>
      <h3>快捷入口</h3>
    </div>
    <div class="box-container">
      <div class="small-box put-storage" @click="goToInbound">
        <div class="box-title">入库申请</div>
        <div class="box-icon"></div>
      </div>
      <div class="small-box del-storage" @click="goToOutbound">
        <div class="box-title">出库申请</div>
        <div class="box-icon"></div>
      </div>
      <div class="small-box task " @click="goToTask">
        <div class="box-title">任务列表</div>
        <div class="box-icon"></div>
      </div>
      <div class="small-box storage-list" @click="goToStorageList">
        <div class="box-title">库存列表</div>
        <div class="box-icon"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="QuickAccess">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToInbound = () => {
  router.push({ name: 'outStash', query: { tab: 'inbound' } });
};

const goToOutbound = () => {
  router.push({ name: 'outStash', query: { tab: 'outbound' } });
};

const goToTask = () => {
  router.push("/showAllTask");
};

const goToStorageList = () => {
    router.push("/showALLInventory");
};


</script>

<style scoped>
.region.region2 {
  height: auto; /* 让容器自适应高度 */
  width: 90%;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.region.region2 .header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.region.region2 .header .icon.quick-access-icon {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-color: #1e90ff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
}

.region.region2 .header h3 {
  margin: 0;
  font-size: 1.5em;
  color: #333;
  font-weight: bold;
}

.region.region2 .box-container {
  display: flex;
  flex-direction: column; /* 修改为列布局 */
  gap: 20px;
  justify-content: center;
  align-items: center; /* 水平居中对齐 */
  margin-bottom: 20px; /* 添加间距 */
}

.region.region2 .small-box {
  width: 150px;
  height: 180px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer; /* 添加鼠标指针样式 */
}

.region.region2 .small-box:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.region.region2 .small-box .box-title {
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
}

.region.region2 .small-box .box-icon {
  width: 80px;
  height: 80px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* 定制化的图标 */
.region.region2 .small-box.put-storage .box-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%231e90ff" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 48 256 48s200 89.5 200 200-89.5 200-200 200z"/><circle cx="256" cy="350" r="50" fill="%23fff"/></svg>');
}

.region.region2 .small-box.del-storage .box-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%2300ced1" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 48 256 48s200 89.5 200 200-89.5 200-200 200z"/><polygon points="256,100 200,200 312,200" fill="%23fff"/></svg>');
}

.region.region2 .small-box.task .box-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%2332cd32" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 48 256 48s200 89.5 200 200-89.5 200-200 200z"/><rect x="200" y="100" width="112" height="80" rx="10" ry="10" fill="%23fff"/></svg>');
}

.region.region2 .small-box.storage-list .box-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%237cfc00" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 48 256 48s200 89.5 200 200-89.5 200-200 200z"/><path d="M200 100v100h112V100H200zm0 150v100h112V250H200z" fill="%23fff"/></svg>');
}
</style>



