<template>
    <div class="">
        <header>
            <span class="title">TNR</span>
        </header>
    </div>
</template>

<script>
export default {
    methods: {
        goback() {
            this.$router.push('/home')
        }
    },
    props:['title']
}
</script>

<style scoped>
header {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #f97745;
}
header span {
    font-size: 18px;
    color: #fff;
}


</style>