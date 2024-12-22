<template>
    <div class="gradient-background">
        <h1>登录商城</h1>
        <div class="login-form">
            <div class="close" @click="closeLoginForm"></div>
            <div class="head-info">
                <label class="lbl-1"></label>
                <label class="lbl-2"></label>
                <label class="lbl-3"></label>
            </div>
            <div class="clear"></div>
            <div class="avtar">
                <img src="@/assets/images/avatar.jpg"a /> <!-- 假设图片放在src/assets/images目录下 -->
            </div>
            <form @submit.prevent="handleLogin">
                <input type="text" class="text" v-model="username" required placeholder="账号" />
                <div class="key">
                    <input type="password" v-model="password" required placeholder="密码" />
                </div>
                <div class="signin">
                    <input type="submit" value="登录" />
                </div>
            </form>
            
            
        </div>
    </div>
</template>

<script setup lang="js" name="login">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; // 引入 useRouter
const router = useRouter(); // 获取 router 实例

function closeLoginForm() {
    router.push('/'); // 跳转到首页
}
const store = useStore();
const username = ref('');
const password = ref('');

const isLoggedIn = computed(() => store.getters.isLoggedIn);

const handleLogin = async () => {
    try {
        await store.dispatch('login', { username: username.value, password: password.value });
        username.value = '';
        password.value = '';
        router.push('/');
    } catch (error) {
        console.error('Login failed:', error);
    }
};

const logout = () => {
    store.dispatch('logout');
};

</script>

<style scoped>
.gradient-background {
    background: url('@/assets/images/bg1.jpg') no-repeat 0px 0px;
    font-family: 'Open Sans', sans-serif;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    height: 900px;
}

/*--close--*/
.close {
    background: url('@/assets/images/close.png') no-repeat 0px 0px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 20px;
    top: 20px;
    -webkit-transition: color 0.2s ease-in-out;
    -moz-transition: color 0.2s ease-in-out;
    -o-transition: color 0.2s ease-in-out;
    transition: color 0.2s ease-in-out;
}

/*--/close--*/
h1 {
    font-family: 'Exo 2', sans-serif;
    text-align: center;
    padding-top: 4em;
    font-weight: 400;
    color: #2B2B36;
    font-size: 2em;
}

.login-form {
    background: #2b2b36;
    position: relative;
    width: 30%;
    margin: 3% auto 0 auto;
    text-align: center;
    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;
}

.head img {
    width: 100%;
}

.avtar img {
    margin: 2em 0 0;
    height: 100px;
}

.head-info {
    padding: 5px 0;
    text-align: center;
    font-weight: 600;
    font-size: 2em;
    color: #fff;
    background: #23232e;
    height: 50px;
    border-top-left-radius: 10px;
    -webkit-border-top-left-radius: 10px;
    -moz-border-top-left-radius: 10px;
    -o-border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    -webkit-border-top-right-radius: 10px;
    -moz-border-top-right-radius: 10px;
    -o-border-top-right-radius: 10p
}

input[type="text"] {
    width: 70%;
    padding: 1em 2em 1em 3em;
    color: #9199aa;
    font-size: 18px;
    outline: none;
    background: url('@/assets/images/adm.png') no-repeat 10px 15px;
    border: none;
    font-weight: 100;
    border-bottom: 1px solid#484856;
    margin-top: 2em;
}

input[type="password"] {
    width: 70%;
    padding: 1em 2em 1em 3em;
    color: #dd3e3e;
    font-size: 18px;
    outline: none;
    background: url('@/assets/images/key.png') no-repeat 10px 23px;
    border: none;
    font-weight: 100;
    border-bottom: 1px solid#484856;
    margin-bottom: 3em;
}

.key {
    background: url('@/assets/images/pass.png') no-repeat 447px 17px;
}

input[type="submit"] {
    font-size: 30px;
    color: #fff;
    outline: none;
    border: none;
    background: #3ea751;
    width: 100%;
    padding: 18px 0;
    border-bottom-left-radius: 15px;
    -webkit-border-bottom-left-radius: 15px;
    -moz-border-bottom-left-radius: 15px;
    -o-border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    -webkit-border-bottom-right-radius: 15px;
    -moz-border-bottom-right-radius: 15px;
    -o-border-bottom-right-radius: 15px;
    cursor: pointer;
}

input[type="submit"]:hover {
    background: #ff2775;
    border-bottom-left-radius: 15px;
    -webkit-border-bottom-left-radius: 15px;
    -moz-border-bottom-left-radius: 15px;
    -o-border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    -webkit-border-bottom-right-radius: 15px;
    -moz-border-bottom-right-radius: 15px;
    -o-border-bottom-right-radius: 15px;
    transition: 1s all;
    -webkit-transition: 1s all;
    -moz-transition: 1s all;
    -o-transition: 1s all;
}

label.lbl-1 {
    background: #6756ea;
    width: 20px;
    height: 20px;
    display: block;
    float: right;
    border-radius: 50%;
    margin: 16px 10px 0px 0px;
}

label.lbl-2 {
    background: #ea569a;
    width: 20px;
    height: 20px;
    display: block;
    float: right;
    border-radius: 50%;
    margin: 16px 10px 0px 0px;
}

label.lbl-3 {
    background: #f1c85f;
    width: 20px;
    height: 20px;
    display: block;
    float: right;
    border-radius: 50%;
    margin: 16px 10px 0px 0px;
}
</style>