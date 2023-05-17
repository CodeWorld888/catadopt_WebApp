<template>
    <div class="tnr">
        <Header></Header>
        <section>
            <TnrList></TnrList>
            <TnrAdd></TnrAdd>
        </section>
        <Tabbar/>
    </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/common/Header.vue'
import TnrList from '@/components/tnr/TnrList.vue'
import TnrAdd from '@/components/tnr/TnrAdd.vue'
export default {
    components:{Tabbar,Header,TnrList,TnrAdd},
}
</script>

<style scoped>
.tnr{
    width: 100vw;
    height: 100vh;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
section{
    flex: 1;
    overflow: auto;
    position: relative;
}
</style>