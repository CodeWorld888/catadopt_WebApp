<template>
    <div class="">
        <ul class="navbar">
            <li v-for="(item,index) in navList" :key="index">
                <div class="circle">
                    <img :src="item.img"/>
                </div>
                <span>{{item.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            navList:[
                {
                    title:'主粮',
                    img:'/images/shop/rice.png'
                },
                {
                    title:'零食',
                    img:'/images/shop/fish.png'
                },
                {
                    title:'护理用品',
                    img:'/images/shop/heal.png'
                },
                {
                    title:'保健品',
                    img:'/images/shop/medicine.png'
                },
                {
                    title:'生活用品',
                    img:'/images/shop/paper.png'
                },
                {
                    title:'猫砂猫厕',
                    img:'/images/shop/toilet.png'
                },
                {
                    title:'玩具服饰',
                    img:'/images/shop/cloths.png'
                },
                {
                    title:'清洁消毒',
                    img:'/images/shop/alcohol.png'
                },
            ]
        }
    }

}
</script>

<style scoped>
.navbar{
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
}
.navbar li{
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
}
.navbar li:first-child div{
    background-color: rgb(249, 206, 152);
}
.navbar li:nth-child(2) div{
    background-color: rgb(154, 96, 247);
}
.navbar li:nth-child(3) div{
    background-color: rgb(17, 157, 217);
}
.navbar li:nth-child(4) div{
    background-color:rgb(140, 204, 61);
}
.navbar li:nth-child(5) div{
    background-color:rgb(59, 234, 202);
}
.navbar li:nth-child(6) div{
    background-color:rgb(147, 107, 58);
}
.navbar li:nth-child(7) div{
    background-color:rgb(241, 79, 79);
}
.navbar li:nth-child(8) div{
    background-color:rgb(250, 56, 234);
}
.circle{
    width: 30px;
    /* background-color: cadetblue; */
    border-radius: 100%;
    padding: 10px;
    margin-bottom: 10px;
}
.circle img{
    width: 100%;
}
</style>