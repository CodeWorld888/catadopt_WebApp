<template>
    <div class="list-wrapper">
        <div class="list">
            <van-cell-group inset>
                <van-cell title="我的领养" is-link @click="goMyAdopt()"/>
                <van-cell title="我的送养" is-link @click="goMySend()"/>
                <van-cell title="我的TNR申请" is-link @click="goMyTnr()"/>
            </van-cell-group>
        </div>
        <div class="btn">
            <van-button type="danger" @click="loginout()">退出登录</van-button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { mapMutations } from 'vuex';

export default {
    methods:{
        ...mapMutations({
            logout:'LOGOUT'
        }),
        loginout(){
            this.logout()
            this.$router.push('/login')
            Toast.success('退出登录')
        },
        goMyAdopt(){
            this.$router.push('/myadopt')
        },
        goMySend(){
            this.$router.push('/mysend')
        },
        goMyTnr(){
            this.$router.push('/mytnr')
        }
    }
}
</script>

<style scoped>
.list{
    margin-top: 20px;
}
.btn{
    margin-top: 20px;
    margin-left: 140px;
}
</style>