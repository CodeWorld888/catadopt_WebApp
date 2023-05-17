<template>
    <div class="">
        
        <van-nav-bar title="送养信息" left-arrow @click-left="onClickLeft" fixed />
        
        <div class="list">
            <van-form @submit="onSubmit">
            <van-field
            readonly
            clickable
            name="area"
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


            <van-field name="sex" label="性别" input-align="right">
            <template #input>
                <van-radio-group v-model="fieldValue.sex" direction="horizontal">
                <van-radio name="公猫">公猫</van-radio>
                <van-radio name="母猫">母猫</van-radio>
                </van-radio-group>
            </template>
            </van-field>

            <van-field
                readonly
                clickable
                name="birth"
                :value="fieldValue.birth"
                label="生日"
                @click="showList.birth = true"
                input-align="right"
                is-link
                :rules="[{ required: true, message: '请填写生日' }]"
                />
            <van-popup v-model="showList.birth" round position="bottom">
                <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate"
                    @confirm="birthSelect" @cancel="cancel()" />
            </van-popup>

            
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

            
            <van-field
                readonly
                clickable
                name="sterilization"
                :value="fieldValue.sterilization"
                label="是否绝育"
                @click="showList.sterilization = true"
                input-align="right"
                is-link
                :rules="[{ required: true, message: '请填写绝育信息' }]"
                />
            <van-action-sheet v-model="showList.sterilization" :actions="sterilization" @select="sterSelect" />


            <van-field
                readonly
                clickable
                name="source"
                :value="fieldValue.source"
                label="来源类型"
                @click="showList.source = true"
                :rules="[{ required: true, message: '请填写来源' }]"
                is-link
                input-align="right"
                />
            <van-popup v-model="showList.source" round position="bottom">
                <van-picker show-toolbar :columns="source" @cancel="cancel()" @confirm="sourceSelect" />
            </van-popup>

            <van-field
                v-model="fieldValue.source_detail"
                rows="2"
                autosize
                name="source_detail"
                label="来源说明"
                type="textarea"
                maxlength="50"
                placeholder="请输入猫咪具体来源"
                show-word-limit
                :rules="[{ required: true }]"
                />

            <van-field
                v-model="fieldValue.health"
                rows="2"
                autosize
                name="health"
                label="健康信息"
                type="textarea"
                maxlength="50"
                placeholder="请输入猫咪健康说明"
                show-word-limit
                :rules="[{ required: true }]"
                />

            <van-field
                v-model="fieldValue.parasite"
                rows="2"
                autosize
                name="parasite"
                label="驱虫信息"
                type="textarea"
                maxlength="50"
                placeholder="请输入猫咪驱虫说明"
                show-word-limit
                :rules="[{ required: true }]"
                />
 

            <van-field
                v-model="fieldValue.vaccinum"
                rows="2"
                autosize
                name="vaccinum"
                label="疫苗状况"
                type="textarea"
                maxlength="50"
                placeholder="请输入猫咪疫苗说明"
                show-word-limit
                :rules="[{ required: true }]"
                />


            <van-field name="price" v-model="fieldValue.price" type="number" label="押金价格" placeholder="防止贩卖，最低300元" input-align="right" :rules="[{ required: true, message: '请填写押金' }]"/>

            <van-field name="wechat" v-model="fieldValue.wechat" label="微信号" placeholder="请输入微信号" input-align="right" :rules="[{ required: true, message: '请填写微信号' }]"/>


            <van-field name="coverphoto" label="封面图" is-link center input-align="right" :rules="[{ required: true, message: '请上传封面' }]">
                <template #input>
                    <van-uploader :after-read="uploadCover" v-model="cover" :max-count="1" />
                </template>
            </van-field>

            <van-field name="photo" label="猫咪照片" is-link center input-align="right" :rules="[{ required: true, message: '请上传猫咪照片' }]">
                <template #input>
                    <van-uploader :after-read="uploadCover" v-model="photo" :max-count="5" />
                </template>
            </van-field>


            <div class="bottom">
                    <van-button type="primary" native-type="submit">提交信息</van-button>
            </div>
    </van-form>

        </div>
    </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import { areaList } from '@vant/area-data'
import axios from 'axios';
import { Toast } from 'vant';
export default {
    data() {
        return {
            cover: [], //封面图片
            photo: [], //猫咪照片
            show: false,
            sterilization: [{ name: '已绝育' }, { name: '未绝育' }],
            varity: ['中华田园', '梅狸猫', '橘猫', '英国短毛', '银渐层', '金渐层', '布偶猫', '暹罗猫', '加菲猫', '缅因猫', '无毛猫', '矮脚猫', '其他'],
            source: ['流浪救助', '主人送养', '猫舍退役', '其他'],
            minDate: new Date(2015, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(2021, 0, 17),
            areaList,
            showList: {
                city: false,
                sex: false,
                birth: false,
                varity: false,  //品种
                source: false,  //猫咪来源
                sterilization: false,   //绝育
            },
            fieldValue: {
                city: '',
                sex: '公猫',
                birth: '',
                varity: '',
                source: '',
                source_detail: '',
                sterilization: '',
                health: '',
                parasite: '',
                vaccinum: '',
                price: '',
                wechat: '',
            },
        }
    },
    components: { Header },
    methods: {
        onSubmit(values) {
            values.userId = this.$store.state.user.userInfo.id
            values.sendId = this.$route.query.sendId
            values.coverphoto = values.coverphoto[0].content
            for(let i=0;i<this.photo.length;i++){
                this.photo[i]=this.photo[i].content
            }
            values.photo = JSON.stringify(this.photo)
            // console.log('submit', values);
            axios({
                method: 'post',
                url:'http://localhost:3000/send',
                data:values
            }).then(res=>{
                // console.log(res);
                Toast.success(res.data.msg)
                this.$router.back()
            })
            
        },
        uploadCover(file) {     //上传封面
            // 此时可以自行将文件上传至服务器

            console.log(this.photo);
        },
        uploadPhoto(file) {     //上传照片
            // 此时可以自行将文件上传至服务器

            console.log(this.photo);
        },
        

        //格式化时间的方法
        formatTime(date) {
            date = new Date(date)
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var day = date.getDate()
            return [year, month, day].map(this.formatNumber).join('-')
        },
        formatNumber(n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        },
        
        birthSelect(value) {      //控制生日弹窗
            this.fieldValue.birth = this.formatTime(value, 'Y-M-D')
            this.showList.birth = false
        },

        sourceSelect(value) {  //来源类型弹窗
            this.fieldValue.source = value
            this.showList.source = false
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
        sterSelect(item) {       //绝育信息弹窗
            this.fieldValue.sterilization = item.name
            this.showList.sterilization = false;
        },

        cancel() {
            this.showList.city = false
            this.showList.birth = false
            this.showList.varity = false
            this.showList.source = false
        },
        onClickLeft() {
            this.$router.back()
        }
    },
    created(){
        if(this.$route.query.sendId){
            axios({
                method:'GET',
                url:'http://localhost:3000/editSend',
                params:{id:this.$route.query.sendId}
            }).then(res=>{
                console.log(res.data[0]);
                this.fieldValue = res.data[0]
            })
        }
    }
}
</script>
    
<style scoped>
.contain {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.bottom {
    width: 100%;
    height: 100px;
    background-color: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
}
.list{
    margin-top: 50px;
}
</style>