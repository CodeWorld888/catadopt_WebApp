<template>
    <div class="header">
        <div class="circle">
            <img :src="userInfo.picture" />
        </div>
        <h1>{{ userInfo.nickname }}</h1>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo   //调用vuex里存储的用户数据
        })
    },
    methods: {
        getBase64(data) {
            return new Promise((resolve, reject) => {
                const blob = new Blob([data], { type: 'image/jpg' }) // 必须指定type类型
                const reader = new FileReader()
                reader.readAsDataURL(blob)
                reader.onload = () => resolve(reader.result)
                reader.onerror = (error) => reject(error)
            })
        }

    },
    mounted() {
        // this.getBase64(this.userInfo.picture.data).then((base64) => {
        //     this.picture = base64
        //     console.log(this.picture);
        //   })
        // console.log(this.picture);
        // let imgUrl = "data:image/png;base64," + btoa(new
        //     Uint8Array(this.userInfo.picture).reduce((res, byte) => res + String.fromCharCode(byte), ''))
        // this.img = imgUrl
        // console.log(this.img);
        // console.log(this.userInfo);



    }
}
</script>

<style scoped>
.header {
    height: 200px;
    background-color: #f97745;
    display: flex;
    align-items: center;

}

.circle {
    width: 100px;
    height: 100px;
    background-color: aliceblue;
    border-radius: 100%;
    padding: 3px;
    margin: 0 20px;
}

.circle img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
}

.header h1 {
    color: #fff;
}
</style>