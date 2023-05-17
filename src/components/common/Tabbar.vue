<template>
    <div class="tabbar">
        <ul>
            <li
                v-for="(item,index) in routerList"
                :key="index"
                @click="switchTab(item.path)">
                <img :src="$route.path.includes(item.path) ? item.selected : item.active" />
                <span>{{item.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            routerList:[
            {
                title:'领养',
                path:'/home',
                active:'/images/cat.png',
                selected:'/images/cat-selected.png'
            },
            // {
            //     title:'商城',
            //     path:'/shop',
            //     active:'/images/store.png',
            //     selected:'/images/store-selected.png'
            // },
            {
                title:'TNR',
                path:'/tnr',
                active:'/images/aixin.png',
                selected:'/images/aixin-selected.png'
            },
            {
                title:'我的',
                path:'/my',
                active:'/images/my.png',
                selected:'/images/my-selected.png'
            }
            ]
        }
    },
    methods:{
        switchTab(path){
			//判断点击的是不是同一个路由
			if(this.$route.path === path) return
            this.$router.replace(path)
        }
    }
}
</script>

<style scoped>
    .tabbar{
        background-color: #ffffff;
        width: 100%;
        height: 1.6rem;
        z-index: 999;
        border-top:1px solid gainsboro;
    }
    .tabbar ul{
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        align-items: center;
    }
    .tabbar ul li{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tabbar ul li img{
        width: 30px;
        height: 30px;
    }
    .tabbar ul li span{
        font-size: 15px;
        margin-top:2px;
    }
</style>