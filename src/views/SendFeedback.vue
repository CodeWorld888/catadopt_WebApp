<template>
    <div class="">
        <van-nav-bar name="content" title="发布领养反馈" left-arrow @click-left="onClickLeft" />
        <van-form @submit="onSubmit">
            <van-field
                v-model="content"
                rows="2"
                autosize
                name="content"
                label="内容"
                type="textarea"
                maxlength="50"
                placeholder="请输入反馈内容"
                show-word-limit
                :rules="[{ required: true }]"
                />
            <van-field name="photo" label="猫咪照片" is-link center input-align="right" :rules="[{ required: true, message: '请上传猫咪照片' }]">
                <template #input>
                    <van-uploader v-model="photo" :max-count="4" />
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'
export default {
    data(){
        return {
            content:'',
            photo:[]
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back()
        },
        onSubmit(values) {
            values.userId = this.$store.state.user.userInfo.id
            values.sendId = this.$route.query.sendId
            for(let i=0;i<this.photo.length;i++){
                this.photo[i]=this.photo[i].content
            }
            values.photo = JSON.stringify(this.photo)
            // console.log(values);
            axios({
                method:'POST',
                url:'http://localhost:3000/sendFeedback',
                data:values,
            }).then(res=>{
                Toast.success(res.data.msg)
                this.$router.back()
            })
        },
    },

}
</script>

<style scoped></style>