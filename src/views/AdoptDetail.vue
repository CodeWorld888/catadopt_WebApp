<template>
    <div class="adopt">
        <div class="header">
            <van-nav-bar title="猫咪详情" left-arrow @click-left="onClickLeft" />
        </div>
        <section>
            <div class="list-item">
                <img :src="adoptInfo.cover_photo" />
                <div class="tag">
                    <ul>
                        <li>{{ adoptInfo.varity }}</li>
                        <li>{{adoptInfo.birth}}</li>
                        <li>{{adoptInfo.sex}}</li>
                        <li>{{adoptInfo.source}}</li>
                    </ul>
                </div>
            </div>
            <AdoptInfo :info="adoptInfo"></AdoptInfo>
            <AdoptPhoto :photo="adoptInfo.photo"></AdoptPhoto>
        </section>
        <AdoptTabbar :wechat="adoptInfo.wechat" :id="adoptInfo.id" :isAdopted = "adoptInfo.isAdopted" :userId = "adoptInfo.user_id"></AdoptTabbar>

    </div>
</template>

<script>
import AdoptTabbar from '@/components/adopt/AdoptTabbar.vue'
import AdoptInfo from '@/components/adopt/AdoptInfo.vue'
import AdoptPhoto from '@/components/adopt/AdoptPhoto.vue'
import axios from 'axios'
export default {
    data(){
        return {
            adoptInfo:{}
        }
    },
    components: { AdoptTabbar, AdoptInfo, AdoptPhoto },
    methods: {
        onClickLeft() {
            this.$router.back()
        }
    },
    created(){
        axios({
            method:'get',
            url:'http://localhost:3000/adoptDetail',
            params:{id:this.$route.query.id}
        }).then(res=>{
            // console.log(res.data.data[0]);
            this.adoptInfo = res.data.data[0]
            if(this.adoptInfo.city.indexOf('内蒙古') !== -1 || this.adoptInfo.city.indexOf('黑龙江') !== -1){
                this.adoptInfo.city=this.adoptInfo.city.slice(0,3)
            }else{
                this.adoptInfo.city=this.adoptInfo.city.slice(0,2)
            }

        })
    }
}
</script>

<style scoped>
.adopt {
    background-color: #f6f6f6;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

section {
    flex: 1;
    overflow: auto;
}

.list-item {
    display: flex;
    flex-direction: column;
}

.list-item img {
    width: 100%;
}

.tag {
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
}

.tag ul {
    display: flex;
    margin-left: 10px;
}

.tag ul li {
    background-color: #565553;
    border-radius: 5px;
    padding: 6px;
    font-size: 12px;
    color: #fff;
    margin-right: 5px;
}
</style>