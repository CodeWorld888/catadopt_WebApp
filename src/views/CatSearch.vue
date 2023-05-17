<template>
    <div class="search">
        <div>
            <van-nav-bar title="搜索" left-arrow @click-left="onClickLeft" />
            <van-search v-model="value" placeholder="请输入猫咪的ID" @search="onSearch" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'
export default {
    data() {
        return {
            value: '',
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push('/home')
        },
        onSearch(val) {
            var regex = /^[0-9]*$/
            if (val.match(regex)) {
                let id = parseInt(val)
                axios({
                    method: 'GET',
                    url: 'http://localhost:3000/adoptDetail',
                    params: { id, }
                }).then(res => {
                    if (res.data.success) {
                        this.$router.push({
                            name: 'Adopt',
                            query: { id }
                        })
                    }else{
                        Toast.fail(res.data.msg)
                    }

                    console.log(res.data);
                })
            } else {
                Toast.fail('请输入正确的ID')
            }

        }
    }
}
</script>

<style scoped>
.search {
    width: 100vw;
    height: 100vh;
    background-color: #f6f6f6;
}
</style>