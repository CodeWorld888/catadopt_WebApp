<template>
    <div class="my">
        <van-nav-bar title="个人中心" />
        <section>
            <MyHeader></MyHeader>
            <MyList></MyList>
        </section>
        <Tabbar/>
    </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import MyHeader from '@/components/my/MyHeader.vue'
import MyList from '@/components/my/MyList.vue'
export default {
    components:{Tabbar,MyHeader,MyList}
}
</script>

<style scoped>
.my{
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #f6f6f6;
}
section{
    flex: 1;
    overflow: hidden;
}
</style>