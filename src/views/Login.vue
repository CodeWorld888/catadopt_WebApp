<template>
    <div class="login">
        <van-nav-bar title="用户登录" />
        <div class="form">
            <van-form @submit="onSubmit">
                <van-field v-model="username" name="username" label="用户名" placeholder="请输入用户名"
                    :rules="[{ required: true }]" />
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="请输入密码"
                    :rules="[{ required: true }]" />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">登录</van-button>
                </div>
            </van-form>
        </div>
        <van-divider :style="{ color: '#565656', borderColor: '#b8b8b8', padding: '0 5px' }">
            <span @click="register()">去注册</span>
        </van-divider>

    </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';

export default {
    data() {
        return {
            username: '',
            password: '',
            
        };
    },
    methods: {
        onSubmit(values) {
            axios({
                method:'POST',
                url:'http://localhost:3000/login',
                data:values
            }).then(res=>{
                if(res.data.success==true){
                    Toast.success(res.data.msg)
                    this.$store.commit('USERLOGIN',res.data.userinfo)  //把返回的用户数据存入vuex
                    this.$router.push('/home')
                    // console.log(res.data)
                }else{
                    Toast.fail(res.data.msg)
                }
                
            })
        },
        register(){
            this.$router.push('/register')
        },
    },
};
</script>

<style scoped>
.login {
    width: 100vw;
    height: 100vh;
    background-color: #f6f6f6;
}

.form {
    margin-top: 20px;
}
</style>