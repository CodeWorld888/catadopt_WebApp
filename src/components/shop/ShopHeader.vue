<template>
    <div class="header-wrapper">
        <div class="search">
            <img src="images/search02.png"/>
            <span>搜索商品</span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .header-wrapper{
        background-color: #f97745;
        padding: 8px 10px ;
        display: flex;
        justify-content: center;
    }
    .search{
        width: 350px;
        height: 30px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #8a8a8a;
    }
    .search img{
        width: 25px;
        height: 25px;
        margin: 0 5px;
    }
</style>