<template>
    <div class="main">
        <ul class="circle-list">
            <li
                v-for="(item,index) in instructionList"
                :key="index"
                @click="jump(item.title,item.name)">
                <div class="circle">
                    <img :src="item.img" />
                </div>
                <span>{{item.title}}</span>
            </li>
        </ul>
        <div class="adopt">
            <div class="feedback" @click="goFeedback()">
                <h1>领养反馈</h1>
            </div>
            <div class="line">

            </div>
            <div class="publish" @click="goSend()">
                <h1>我要送养</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            instructionList:[
                {
                    title:'领养简介',
                    img:'/images/jianjie.png',
                    name:'1'
                },
                {
                    title:'保障机制',
                    img:'/images/pen.png',
                    name:'2'
                },
                {
                    title:'领养条件',
                    img:'/images/tiaojian.png',
                    name:'3'
                },
                {
                    title:'领养流程',
                    img:'/images/liucheng.png',
                    name:'4'
                },
            ]
        }
    },
    methods:{
        jump(val,name){
            this.$router.push({
                path:'/instruction',
                query:{
                    title:val,
                    name,
                }
            })
        },
        goSend(){
            this.$router.push('/send')
        },
        goFeedback(){
            this.$router.push('/feedback')
        }
    }
}
</script>

<style scoped>
.main {
    background-color: #fff;
    padding-top: 10px;
}

.circle-list {
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.circle {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #444444;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
}

.circle img {
    width: 30px;
    height: 30px;
}

.circle-list li span {
    font-size: 15px;
}
.adopt {
    display: flex;
    height: 70px;
    margin-top: 10px;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #e7e7e7;
    font-size: 18px;
}


.feedback {
    width: 100%;
    text-align: center;
    line-height: 50px;
}

.line {
    height: 40px;
    border-left: 1px solid #e7e7e7;
}

.publish {
    width: 100%;
    text-align: center;
    line-height: 50px;
}</style>