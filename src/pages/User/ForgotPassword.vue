<template>
    <div class="gradient-background">
        <div class="forgot-password-form">
            <form @submit.prevent="handleRegister">
                <div class="form-group form-title-container">
                    <div class="form-title">修改密码</div>
                </div>
                <div class="form-group">
                    <label for="phone">手机号</label>
                    <input type="tel" id="phone" v-model="phone" required placeholder="请输入手机号" />
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" id="password" v-model="password" required placeholder="请输入密码" />
                </div>
                <div class="form-group">
                    <label for="confirmPassword">确认密码</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required placeholder="请确认密码" />
                </div>
                <div class="form-group">
                    <input type="submit" value="重置密码" />
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="js" name="forgot-password">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const phone = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
        alert('密码和确认密码不一致');
        return;
    }

    // 密码一致，跳转至首页
    router.push('/');
};
</script>

<style scoped>
.gradient-background {
    background: url('@/assets/images/bg1.jpg') no-repeat 0px 0px;
    font-family: 'Open Sans', sans-serif;
    background-size: cover;
    height: 920px;
}

.forgot-password-form {
    padding-top: 20px;
    padding-bottom: 20px;
    background: grey;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 30%;
    border-radius: 15px;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
}

.form-group {
    margin-bottom: 1em;
    text-align: left;
    padding: 0 2em;
    font-size: 24px;
}

.form-group label {
    display: block;
    margin-bottom: 0.5em;
    color: #26333A;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 5px;
    color: #9199aa;
    font-size: 18px;
    background: #fff;
    border: none;
    border-bottom: 1px solid #484856;
    border-radius: 5px;
}

.form-title-container {
    display: flex;
    justify-content: center;
}

.form-title {
    width: 200px; /* 设置标题的宽度 */
    height: 40px;
    text-align: justify;
    font-size: 40px;
    position: relative; /* 添加相对定位 */
}

.form-title::after {
    content: '';
    display: inline-block;
    width: 100%;
    height: 0;
    vertical-align: top;
}

.form-group input[type="submit"] {
    width: 100%;
    padding: 5px;
    color: #fff;
    font-size: 18px;
    background: #484856; /* 设置按钮背景颜色 */
    border: none;
    border-radius: 5px;
    height: 40px; /* 设置按钮高度 */
    cursor: pointer; /* 添加鼠标指针样式 */
}

.form-group input[type="submit"]:hover {
    background: blue; /* 设置鼠标悬停时的背景颜色 */
}
</style>