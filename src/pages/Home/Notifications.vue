<template>
  <aside class="notifications-container">
    <div class="container">
      <h3>通知消息</h3>
      <ul>
        <li v-for="(notification, index) in notifications" :key="index" @click="handleClick(notification)">
          <span class="notification-icon"></span>
          {{ notification }}
        </li>
        <!-- 更多通知消息 -->
      </ul>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const notifications = ref([
  '新消息提醒',
  '系统更新提示',
  '会议邀请',
  // 更多通知消息
]);

function handleClick(notification: string) {
  console.log(`Clicked on notification: ${notification}`);
}
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 50%;
  right: 20px; /* 留出20px的距离 */
  transform: translateY(-50%);
  background-color: transparent; /* 透明背景以确保阴影效果 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 确保在页面层级较高 */
}

.notifications-container .container {
  width: 120px; /* 更窄一些的宽度 */
  max-width: 100%;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.notifications-container .container:hover {
  transform: translateX(-10px); /* 悬浮时向左移动一点 */
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
}

.notifications-container h3 {
  padding: 20px;
  font-size: 1.2em;
  color: #333;
  font-weight: bold;
  text-align: center;
  background-color: #e9ecef;
  border-bottom: 1px solid #ddd;
  letter-spacing: 0.5px;
}

.notifications-container ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.notifications-container li {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border-bottom: 1px solid #eee;
}

.notifications-container li:last-child {
  border-bottom: none;
}

.notifications-container li:hover {
  background-color: #f5f5f5;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}

.notification-icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 15px;
  background-color: #1e90ff;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
}

.notifications-container li:hover .notification-icon {
  background-color: #007bff;
}

.notifications-container li span {
  font-size: 1em;
  color: #333;
  line-height: 1.5;
  word-break: break-all;
}

/* 配合主页面导入的样式 */
.row_right {
  flex: 0.2;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .notifications-container .container {
    width: 200px; /* 在小屏幕上更窄 */
  }
}

@media (max-width: 480px) {
  .notifications-container .container {
    width: 180px; /* 在非常小的屏幕上更窄 */
  }

  .notifications-container {
    right: 10px; /* 在小屏幕上减少右边距 */
  }
}
</style>