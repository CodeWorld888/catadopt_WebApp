<template>
    <div class="">
        <van-nav-bar title="我的领养反馈" left-arrow @click-left="onClickLeft" fixed />
        <div class="empty" v-if="empty">
            <van-empty description="您还没有发布任何反馈" />
        </div>
        <ul class="feedback-list">
            <li v-for="(list, index) in myFeedbackList" :key="index">
                <div class="user">
                    <div class="circle">
                        <img :src="list.picture" />
                    </div>
                    <span>{{ list.nickname }}</span>
                    <div class="delete-btn">
                        <van-button type="warning" @click="deletefb(list.id)">删除反馈</van-button>
                    </div>
                </div>
                <h1 class="content">
                    {{ list.content }}
                </h1>
                <ul class="photo-list">
                    <li v-for="(item, index) in list.photo" :key="index">
                        <img :src="item" />
                    </li>
                </ul>
                <van-divider :style="{ color: '#000', borderColor: '#b8b8b8' }" />
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
            myFeedbackList: [],
            empty: true,
        }
    },
    watch: {
        myFeedbackList: {
            handler() {
                if (this.myFeedbackList.length) {
                    this.empty = false
                } else {
                    this.empty = true
                }
            }
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back()
        },
        deletefb(id) {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/deleteFeedback',
                data: { id }
            }).then(res => {
                this.getFeedbackInfo()
                Toast.success(res.data.msg)
            })
        },
        getFeedbackInfo() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/myFeedback',
                params: { id: this.$store.state.user.userInfo.id }
            }).then(res => {
                this.myFeedbackList = res.data

            })
        }
    },
    created() {
        this.getFeedbackInfo()
    }
}
</script>

<style scoped>
.empty {
    margin-top: 100px;
}

.feedback-list {
    padding: 0 10px;
    background-color: #fff;
    margin-top: 60px;
}

.user {
    display: flex;
    align-items: center;
    font-size: 18px;
    margin: 10px 0;
}

.delete-btn {
    margin-left: auto;
}

.circle {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
}

.circle img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
}

.content {
    font-size: 20px;
    margin-bottom: 10px;
}

.photo-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #f6f6f6;
}

.photo-list li {
    flex-grow: 1;
    width: 48%;
    padding: 2px;
}

.photo-list li img {
    width: 100%;
    height: 100%;
}
</style>