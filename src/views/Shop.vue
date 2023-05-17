<template>
    <div class="shop">
        <div class="header">
            <div class="header-main">
                <Header></Header>
            </div>
        </div>
        <section>
            <ShopNavbar></ShopNavbar>
            <ShopNavList />
        </section>
        <Tabbar />
    </div>
</template>

<script>
import Header from '@/components/shop/ShopHeader.vue'
import Tabbar from '@/components/common/Tabbar.vue'
import ShopNavbar from '@/components/shop/ShopNavbar.vue'
import ShopNavList from '@/components/shop/ShopNavList.vue'
export default {
    components: { Tabbar, Header, ShopNavbar, ShopNavList }
}
</script>

<style scoped>
.shop{
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: auto;
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
    margin-top: 5px;
}
</style>