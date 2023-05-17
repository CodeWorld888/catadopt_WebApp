<template>
    <div class="">
        <van-area
        title="城市选择"
        :area-list="areaList"
        visible-item-count="15"
        @cancel="goback()"
        @confirm="gonext"
        />
    </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import axios from 'axios'
export default {
    data() {
        return { areaList };
    },
    methods: {
        goback() {
            this.$router.back()
        },
        gonext(values){           
            this.$store.state.user.userInfo.city = values
                .filter((item) => !!item)
                .map((item) => item.name)
                .join('/');
            console.log(this.$store.state.user.userInfo.city);
            this.$router.back()
        }
    }
}
</script>

<style scoped>

</style>