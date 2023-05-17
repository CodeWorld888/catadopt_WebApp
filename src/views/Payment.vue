<template>
    <div class="payment">
        <van-nav-bar title="结算" left-arrow @click-left="onClickLeft" />
        <div class="cell">
            <van-cell title="上门自提" is-link center>
                <template #icon>
                    <van-icon name="checked" color="#f97745" />
                </template>
            </van-cell>
        </div>
        <span class="tip">请与送养人字行协商接猫时间和地点</span>
        <div class="info">
            <van-cell-group>
                <van-cell center>
                    <template #title>
                        <div class="photo">
                            <img :src="info.cover_photo" />
                        </div>
                    </template>
                    <template>
                        <ul class="info_value">
                            <li>编号 {{info.id}}</li>
                            <li>{{info.varity}}</li>
                            <li>{{info.sex}}</li>
                            <li>{{info.age}}</li>
                        </ul>
                    </template>
                </van-cell>
                <van-cell title="领养金额" center>
                    <template>
                        <span style="color:red">￥{{info.price}}</span>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
        <ul class="bottom">
            <li>
                <span>￥{{info.price}}</span>
            </li>
            <li @click="pay()">
                <span>支付</span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';
export default {
    data(){
        return {
            info:{}
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back()
        },
        pay(){

            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                onOpened:()=>{
                    axios({
                        method:'POST',
                        url:'http://localhost:3000/addAdopt',
                        data:{
                            userId:this.$store.state.user.userInfo.id,
                            sendId:this.$route.query.id,
                        }
                    })
                },
                onClose:()=>{
                    Toast.success('领养成功')
                    this.$router.replace('/home')
                }
            });
            
        }
    },
    created(){
        axios({
            method:'get',
            url:'http://localhost:3000/adoptDetail',
            params:{id:this.$route.query.id}
        }).then(res=>{
            // console.log(res);
            this.info = res.data.data[0]
        })
    }
}
</script>

<style scoped>
.payment {
    width: 100vw;
    height: 100vh;
    background-color: #f6f6f6;
}

.cell {
    margin-top: 10px;
}

.tip {
    font-size: 12px;
    color: #717171;
    margin-left: 10px;
}
.info{
    margin-top: 10px;
}
.photo {
    width: 120px;
    height: 100px;
}

.photo img {
    width: 100%;
    height: 100%;
}

.bottom {
    display: flex;
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
}

.bottom li:first-child {
    flex: 1;
    color: #f97745;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bottom li:last-child{
    flex: 2;
    background-color: #f97745;
    font-size: 20px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}</style>