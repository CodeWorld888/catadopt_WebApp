<template>
    <div class="main">
        <van-nav-bar name="content" title="发布TNR信息" left-arrow @click-left="onClickLeft" />
        <van-form @submit="onSubmit">
            <van-field
            readonly
            clickable
            name="city"
            :value="fieldValue.city"
            label="城市"
            @click="showList.city = true"
            input-align="right"
            is-link
            :rules="[{ required: true, message: '请填写地址' }]"
            />
            <van-popup v-model="showList.city" position="bottom">
            <van-area
                :area-list="areaList"
                @confirm="locateSelect"
                @cancel="cancel()"
            />
            </van-popup>
            <van-field v-model="fieldValue.location" name="location" label="具体地址" placeholder="请输入具体地址" />
            <van-field
                readonly
                clickable
                name="varity"
                :value="fieldValue.varity"
                label="品种"
                @click="showList.varity = true"
                input-align="right"
                is-link
                :rules="[{ required: true, message: '请填写品种' }]"
                />
            <van-popup v-model="showList.varity" round position="bottom">
                <van-picker show-toolbar :columns="varity" @cancel="cancel()" @confirm="varitySelect" />
            </van-popup>
            <van-field name="sex" label="性别" input-align="right">
            <template #input>
                <van-radio-group v-model="fieldValue.sex" direction="horizontal">
                <van-radio name="公猫">公猫</van-radio>
                <van-radio name="母猫">母猫</van-radio>
                </van-radio-group>
            </template>
            </van-field>
            <van-field name="photo" label="猫咪图片" is-link center input-align="right" :rules="[{ required: true, message: '请上传封面' }]">
                <template #input>
                    <van-uploader v-model="photo" :max-count="1" />
                </template>
            </van-field>
            
            <div class="bottom">
                    <van-button type="primary" native-type="submit">提交信息</van-button>
            </div>
            </van-form>
    </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import axios from 'axios';
import { Toast } from 'vant';
export default {
    data(){
        return {
            areaList,
            photo:[],
            varity: ['中华田园', '梅狸猫', '橘猫', '英国短毛', '银渐层', '金渐层', '布偶猫', '暹罗猫', '加菲猫', '缅因猫', '无毛猫', '矮脚猫', '其他'],
            showList: {
                city: false,
                sex: false,
                birth: false,
                varity: false,  //品种
            },
            fieldValue: {
                city: '',
                location:'',
                sex: '公猫',
                birth: '',
                varity: '',
                health: '',
                wechat: '',
            },
        }
    },
    methods: {
        onSubmit(values) {
            values.photo = values.photo[0].content
            values.userId = this.$store.state.user.userInfo.id
            values.tnrId = this.$route.query.tnrId
            console.log(values);
            axios({
                method:'POST',
                url:'http://localhost:3000/sendTnr',
                data:values
            }).then(res=>{
                Toast.success(res.data.msg)
                this.$router.back()
            })
            
        },
        locateSelect(values) {       //控制地址弹窗
            this.fieldValue.city = values
            .filter((item) => !!item)
            .map((item) => item.name)
            .join('/');
            this.showList.city = false
        },
        varitySelect(value) {   //品种弹窗
            this.fieldValue.varity = value
            this.showList.varity = false
        },
        cancel() {
            this.showList.city = false
            this.showList.birth = false
            this.showList.varity = false
        },
        onClickLeft() {
            this.$router.back()
        },
    },
    created(){
        if(this.$route.query.tnrId){
            axios({
                method:'GET',
                url:'http://localhost:3000/tnr',
                params:{id:this.$route.query.tnrId}
            }).then(res=>{
                console.log(res.data[0]);
                this.fieldValue = res.data[0]
            })
        }
    }
}
</script>

<style scoped>
.main{
    background-color: #f6f6f6;
    width: 100vw;
    height: 100vh;
}
.bottom {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>