<template>
    <div class="">
        <van-nav-bar title="用户注册" left-arrow @click-left="goback()" />
        <div>
            <van-form @submit="onSubmit">
                <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field v-model="nickname" name="nickname" label="昵称" placeholder="昵称"
                    :rules="[{ required: true, message: '请填写昵称' }]" />
                <van-field name="sex" label="性别">
                    <template #input>
                        <van-radio-group v-model="gender" direction="horizontal">
                            <van-radio name="0">男生</van-radio>
                            <van-radio name="1">女生</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="tel" name="tel" label="联系电话" placeholder="联系电话"
                    :rules="[{ pattern, message: '请输入正确的手机号' }]" />


                <van-field readonly clickable name="area" :value="city" label="地区选择" placeholder="点击选择省市区"
                    @click="showArea = true" />
                <van-popup v-model="showArea" position="bottom">
                    <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
                </van-popup>

                <van-field name="uploader" label="头像">
                    <template #input>
                        <van-uploader v-model="photo" :max-count="1" />
                    </template>
                </van-field>

                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
import { areaList } from '@vant/area-data'
import axios from 'axios'
export default {
    data() {
        return {
            username: '',
            password: '',
            nickname: '',
            gender: '0',
            tel: '',
            photo: [],
            city: '',
            showArea: false,
            areaList: areaList,
            pattern: /^1[23456789]\d{9}$/
        };
    },
    methods: {
        onConfirm(values) {
            this.city = values
                .filter((item) => !!item)
                .map((item) => item.name)
                .join('/');
            this.showArea = false;
        },
        onSubmit(values) {
            if (this.city && this.photo[0]) {
                values.picture = this.photo[0].content
                delete values.uploader
                // console.log(values);
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/register',
                    data: values
                }).then(res => {
                    if(res.data.success == true){
                        Toast.success(res.data.msg);
                        this.$router.replace('/login')
                    }else{
                        Toast.fail(res.data.msg);
                    }
                    
                })

            } else {
                Toast('请填入完整信息');
            }




        },
        goback() {
            this.$router.back()
        }
    }
}
</script>

<style scoped></style>