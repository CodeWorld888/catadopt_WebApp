<template>
    <div class="">
        <van-nav-bar title="我的领养" left-arrow @click-left="onClickLeft" fixed />
        <div class="empty" v-if="empty">
            <van-empty description="您还没有领养任何猫咪" />
        </div>
        <ul class="adopt-list">
            <li v-for="(item, index) in catList" :key="index">
                <van-cell center>
                    <template #title>
                        <div class="photo">
                            <img :src="item.cover_photo" />
                        </div>
                    </template>
                    <template>
                        <ul class="info_value">
                            <li>编号 <span>{{ item.send_id }}</span></li>
                            <li>{{ item.varity }}</li>
                            <li>{{ item.sex }}</li>
                            <li>{{ item.age }}</li>
                        </ul>
                    </template>
                    <template #right-icon>
                        <div class="btn">
                            <van-button plain type="primary" @click="goFeedback(item.send_id)">发布反馈</van-button>
                        </div>
                    </template>
                </van-cell>
            </li>
        </ul>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            catList: [],
            empty: true,
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back()
        },
        goFeedback(id) {
            this.$router.push({
                name: 'SendFeedback',
                query: { sendId: id }
            })
        },
        getCatListInfo() {
            axios({
                method: 'get',
                url: 'http://localhost:3000/myadopt',
                params: { id: this.$store.state.user.userInfo.id }
            }).then(res => {
                this.catList = res.data
                if (this.catList.length) {
                    this.empty = false
                }
            })
        }
    },
    created() {
        this.getCatListInfo()
    }
}
</script>

<style scoped>
.empty {
    margin-top: 100px;
}

.adopt-list {
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

.btn {
    margin-left: 10px;
}</style>