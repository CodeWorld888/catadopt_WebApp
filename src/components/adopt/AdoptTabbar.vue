<template>
    <div class="tabbar">
        <div class="contact">
            <img src="/images/adopt/contact.png" />
            <span @click="sWechat()">联系送养人</span>
        </div>
        <div class="button">
            <button @click="adopt(id,userId)" v-if="isAdopted == 'false'">保障领养</button>
            <button v-if="isAdopted == 'true'" style="background-color: grey;">已被领养</button>
        </div>
    </div>
</template>

<script>
import { Dialog, Toast } from 'vant';
export default {
    props:['wechat','id','isAdopted','userId'],
    components: {
        [Dialog.Component.name]: Dialog.Component,
    },
    methods: {
        sWechat() {
            Dialog.alert({
                title: '送养人微信',
                message: this.wechat,
                theme: 'round-button',
            })
        },
        adopt(id,userId){
            if(userId == this.$store.state.user.userInfo.id){
                Toast.fail('不能领养自己发布的猫咪')
            }else{
                this.$router.push({
                name:'Payment',
                query:{id}
            })
            }
            
        }
    }
}
</script>

<style scoped>
.tabbar {
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-top: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    /* position: fixed;
    bottom: 0;
    left: 0; */
}

.contact {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    flex: 1;
    color: #707070;
}

.contact img {
    width: 28px;
    height: 28px;
    margin-bottom: 5px;
}

.button {
    display: flex;
    justify-content: center;
    flex: 3;
}

.button button {
    width: 260px;
    height: 40px;
    border-radius: 5px;
    border: none;
    font-size: 18px;
    color: #fff;
    background-color: #f97745;
}
</style>