<template>
    <div class="main">
        <van-nav-bar title="我的TNR申请" left-arrow @click-left="onClickLeft" fixed/>
        <div class="empty" v-if="empty">
            <van-empty description="您还没有申请任何TNR" />
        </div>
        <div class="list">
            <van-collapse v-model="activeName" accordion>
            <van-collapse-item :name="item.id" center v-for="item in tnrInfoList">
                <template #title>
                    <div class="title">
                        <img :src="item.photo" />
                    </div>
                </template>
                <template #value>
                    <ul class="info-list">
                            <li>编号 {{ item.id }}</li>
                            <li>{{ item.varity }}</li>
                            <li>{{ item.sex }}</li>
                            <li>{{ item.city }} {{ item.location }}</li>
                    </ul>
                </template>
                <template>
                        <ul class="btn">
                            <li>
                                <van-button plain block type="info" @click="goEdit(item.id)">修改</van-button>
                            </li>
                            <li>
                                <van-button plain block type="danger" @click="deleteTnr(item.id)">撤销</van-button>
                            </li>
                        </ul>
                </template>
            </van-collapse-item>
        </van-collapse>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';
export default {
    data() {
        return {
            activeName: '1',
            list: [1, 2, 3, 4],
            tnrInfoList: [],
            empty:true,
        };
    },
    computed: {
        province() {
            return function (city) {
                let province = ''
                if (city.indexOf('黑龙江省') !== -1 || city.indexOf('内蒙古自治区') !== -1) {
                    province = city.slice(0, 3)
                } else {
                    province = city.slice(0, 2)
                }
                return province
            }
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back()
        },
        goEdit(id){
            this.$router.push({
                name:'SendTnr',
                query:{tnrId:id}
            })
        },
        deleteTnr(id){
            axios({
                method:'POST',
                url:'http://localhost:3000/deleteTnr',
                data:{tnrId:id}
            }).then(res=>{
                this.getTnrListInfo()
                Toast.success(res.data.msg)
            })
        },
        getTnrListInfo(){
            axios({
            method:'get',
            url:'http://localhost:3000/myTnr',
            params:{id:this.$store.state.user.userInfo.id}
        }).then(res=>{
            this.tnrInfoList = res.data
            if (this.tnrInfoList.length) {
                    this.empty = false
                } else {
                    this.empty = true
                }
        })
        }
    },
    created(){
        this.getTnrListInfo()
    }
}
</script>

<style scoped>
.empty {
    margin-top: 100px;
    height: 100vh;
}
.list{
    margin-top: 40px;
}
img {
    width: 100%;
    height: 100%;
}
.btn{
    display: flex;
    justify-content: space-around;
}
.btn li{
    flex: 1;
    padding: 0 5px;
}
</style>