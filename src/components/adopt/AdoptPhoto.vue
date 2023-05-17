<template>
    <div class="">
        <ul class="photo-list">
            <li v-for="(item,index) in photo" :key="index">
                <img :src="item"/>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['photo']
}
</script>

<style scoped>
.photo-list{
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}
.photo-list li{
    width: 360px;
    height: 360px;
    padding: 5px 0;
}
.photo-list li img{
    width: 100%;
    height: 100%;
}
</style>