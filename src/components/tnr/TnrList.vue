<template>
    <div class="tnr-list">
        <van-collapse v-model="activeName" accordion>
            <van-collapse-item :name="item.id" center v-for="item in tnrInfoList">
                <template #title>
                    <div class="title">
                        <img :src="item.photo" />
                        <ul class="info-list">
                            <li>编号 {{ item.id }}</li>
                            <li>{{ item.varity }}</li>
                            <li>{{ item.sex }}</li>
                            <li>{{ province(item.city) }}</li>
                        </ul>
                    </div>
                </template>
                <template>
                    <div>
                        <p>发布者：{{ item.nickname }}</p>
                        <p>联系电话：{{ item.tel }}</p>
                        <p>具体地址：{{ item.city }} {{ item.location }}</p>
                    </div>
                </template>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            activeName: '1',
            list: [1, 2, 3, 4],
            tnrInfoList: []
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
    created() {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/tnr',
        }).then(res => {
            // console.log(res);
            this.tnrInfoList = res.data
        })
    }
}
</script>

<style scoped>
.title {
    display: flex;
    justify-content: space-between;
}

img {
    width: 200px;
    height: 180px;
}

.info-list {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
}
</style>