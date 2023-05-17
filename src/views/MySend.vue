<template>
    <div class="">
        <van-nav-bar title="我的送养" left-arrow @click-left="onClickLeft" fixed/>
        <div class="empty" v-if="empty">
            <van-empty description="您还没有送养任何猫咪" />
        </div>
        <ul class="send-list">
            <li v-for="(item, index) in sendList" :key="index">
                <van-cell center>
                    <template #title>
                        <div class="photo">
                            <img :src="item.cover_photo" />
                        </div>
                    </template>
                    <template>
                        <ul class="info_value">
                            <li>编号 <span>{{item.id}}</span></li>
                            <li>{{item.varity}}</li>
                            <li>{{item.sex}}</li>
                            <li>{{item.age}}</li>
                        </ul>
                    </template>
                    <template #right-icon>
                        <ul class="btn" v-if="item.isAdopted == 'false'">
                            <li>
                                <van-button plain type="primary" @click="goEdit(item.id)">修改</van-button>
                            </li>
                            <li>
                                <van-button plain type="primary" @click="deleteSend(item.id)">撤销</van-button>
                            </li>
                        </ul>
                        <p class="info" v-if="item.isAdopted == 'true'">已被领养</p>
                    </template>
                </van-cell>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'
export default {
    data() {
        return {
            sendList: [],
            empty: true,
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back()
        },
        goEdit(id){
            this.$router.push({
                name:'Send',
                query:{sendId:id}
            })
        },
        deleteSend(id){
            axios({
                method:'POST',
                url:'http://localhost:3000/deleteSend',
                data:{sendId:id}
            }).then(res=>{
                this.getSendListInfo()
                Toast.success(res.data.msg)
            })
        },
        getSendListInfo(){
            axios({
            method:'get',
            url:'http://localhost:3000/mysend',
            params:{id:this.$store.state.user.userInfo.id}
        }).then(res=>{
            this.sendList = res.data
            if (this.sendList.length) {
                    this.empty = false
                } else {
                    this.empty = true
                }
        })
        }
    },
    created(){
        this.getSendListInfo()
    }
}
</script>

<style scoped>
.empty {
    margin-top: 100px;
}

.send-list{
    margin-top: 40px;
}
.photo {
    width: 120px;
    height: 100px;
}

.photo img {
    width: 100%;
    height: 100%;
}
.btn{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}
.btn li:first-child{
    margin-bottom: 10px;
}
.info{
    width: 30px;
    margin-left: 20px;
    color: red;
}
</style>