<template>
    <div class="feedback">
        <div class="header">
            <van-nav-bar title="领养反馈" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="cell">
            <van-cell title="我的领养反馈" is-link to="/myfeedback" style="margin-top: 10px;" />
        </div>
        <ul class="feedback-list">
            <li v-for="(list,index) in feedbackList" :key="index">
                <div class="user">
                    <div class="circle">
                        <img :src="list.picture" />
                    </div>
                    <span>{{list.nickname}}</span>
                </div>
                <h1 class="content">
                    {{list.content}}
                </h1>
                <ul class="photo-list">
                    <li v-for="(item,index) in list.photo" :key="index">
                        <img :src="item" />
                    </li>
                </ul>
                <div class="jump">
                    <span class="jump-circle" @click="goAdopt(list.send_id)">领养主页 ></span>
                </div>
            <van-divider :style="{ color: '#000', borderColor: '#b8b8b8' }"/>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            feedbackList:[]
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back()
        },
        goAdopt(id){
            this.$router.push({
                name:'Adopt',
                query:{id}
            })
            console.log(id);
        }
    },
    created(){
        axios({
            method:'GET',
            url:'http://localhost:3000/feedback',
        }).then(res=>{
            this.feedbackList = res.data
        })
    }
}
</script>

<style scoped>
.jump{
    text-align: center;
    padding-top: 10px;
}
.jump-circle{
    background-color: rgb(220, 219, 219);
    border-radius: 20px;
    width: 80px;
    color: rgb(135, 136, 136);
    display: inline-block;
    padding: 5px;
    font-size: 15px;
}
.feedback{
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
}
.header{
    width: 100%;
    position: fixed;
    z-index: 20;
}
.cell{
    margin-top: 50px;
}
.feedback-list{
    padding: 0 10px;
    background-color: #fff;
    margin-top: 10px;
}
.user{
    display: flex;
    align-items: center;
    font-size: 18px;
    margin: 10px 0;
}
.circle{
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
}
.circle img{
    width: 100%;
    height: 100%;
    border-radius: 100%;
}
.content{
    font-size: 20px;
    margin-bottom: 10px;
}
.photo-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #f6f6f6;
}
.photo-list li{
    flex-grow: 1;
    width: 48%;
    padding: 2px;
}
.photo-list li img{
    width: 100%;
    height: 100%;
}
</style>