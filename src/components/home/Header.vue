<template>
    <div class="header">
        <div class="location" @click="golocate()">
            <img src="/images/locate.png" />
            <p>{{ locate }}</p>
        </div>
        <div class="title">
            <p>无偿领养</p>
        </div>
        <div class="search" @click="gosearch()">
            <img src="/images/search01.png" />
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        locate() {
            let locate=''
            if (this.$store.state.user.userInfo.city.indexOf('黑龙江省') !== -1  || this.$store.state.user.userInfo.city.indexOf('内蒙古自治区')!==-1 ) {
                locate = this.$store.state.user.userInfo.city.slice(0, 3)
            } else {
                locate = this.$store.state.user.userInfo.city.slice(0, 2)
            }
            return locate
        }
    },
    methods: {
        golocate() {
            this.$router.push('/location')
        },
        gosearch(){
            this.$router.push('/searchcat')
        }
    }
}
</script>

<style scoped>
.header {
    height: 40px;
    background-color: #f97745;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.location {
    display: flex;
    height: 100%;
    align-items: center;
}

.location img {
    width: 20px;
    height: 20px;
}

.location p {
    font-size: 17px;
    color: #fff;
}

.search img {
    width: 20px;
    height: 20px;
}

.title {
    margin-right: 40px;
}

.title p {
    font-size: 17px;
    color: #fff;
}
</style>