<template>
    <div class="add" @click="goAdd()">
        <van-icon name="plus" color="#fff" size="25px"/>
    </div>
</template>

<script>
export default {
    methods:{
        goAdd(){
            this.$router.push('/sendTnr')
        }
    }
}
</script>

<style scoped>
.add{
    width: 60px;
    height: 60px;
    background-color: #f97745;
    opacity: 0.85;
    border-radius: 100%;
    position: fixed;
    bottom: 80px;
    right: 30px;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>