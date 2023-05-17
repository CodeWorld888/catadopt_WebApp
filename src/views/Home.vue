<template>
    <div class="home">
        <div class="header">
            <div class="header-main">
                <Header></Header>
            </div>
        </div>
        <section class="wrapper">
            <div>
                <Navbar></Navbar>
                <Accumulate />
                <List :adoptList="adoptList"></List>
            </div>
        </section>
        <Tabbar />
    </div>
</template>

<script>
import axios from 'axios'
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/home/Header.vue'
import Navbar from '@/components/home/Navbar.vue'
import Accumulate from '@/components/home/Accumulate.vue'
import List from '@/components/home/List.vue'
export default {
    data(){
        return {
            adoptList:[],
        }
    },
    components: { Tabbar, Header, Navbar, Accumulate, List },
    created(){
        axios({
            method:'get',
            url:'http://localhost:3000/home',
            
        }).then(res=>{
            // console.log(res.data);
            this.adoptList = res.data
        })
    },
}
</script>

<style scoped>
.home {
    background-color: #f6f6f6;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.header {
    height: 40px;
}

.header-main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}

section {
    flex: 1;
    overflow: auto;
}
</style>