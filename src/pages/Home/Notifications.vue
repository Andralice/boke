<template>
  <aside class="notifications">
    <h3>通知消息</h3>
    <ul>
      <li>
        <img src="@/assets/images/Notification.png" alt="Notification Icon" class="notification-icon">
        通知1
      </li>
      <li>
        <img src="@/assets/images/Notification.png" alt="Notification Icon" class="notification-icon">
        通知2
      </li>
      <li>
        <img src="@/assets/images/Notification.png" alt="Notification Icon" class="notification-icon">
        通知3
      </li>
      <!-- 更多通知消息 -->
    </ul>
  </aside>
</template>

<script lang="ts" setup>
// 必要的脚本部分
</script>

<style scoped>
.notifications {
  width: 300px;
  background-color: #f8f9fa;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  border: 1px solid #ddd;
}

.notifications h3 {
  padding: 10px;
  font-size: 1.2em;
  color: #333;
}

.notifications ul {
  list-style-type: none;
  padding: 0;
  flex-grow: 1;
}

.notifications li {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.notification-icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>