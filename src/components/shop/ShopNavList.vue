<template>
    <div class="list-wrapper">
        <ul class="shop-list">
            <li v-for="(list,index) in navList" :key="index">
                <div class="title">
                    <h1>{{list.type}}</h1>
                    <span>更多></span>
                </div>
                <ul class="item-list">
                    <li v-for="(item,index) in list.itemList" :key="index">
                        <div>
                            <img :src="item.img" />
                        </div>
                        <p>{{item.title}}</p>
                        <span>￥{{item.price}}</span>
                    </li>
                </ul>
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
                    type:'猫咪主粮',
                    itemList:[
                        {
                            img:'/images/shop/shop01a.png',
                            title:'皇家 i27 室内成猫猫主粮 2kg/10kg',
                            price:128
                        },
                        {
                            img:'/images/shop/shop01b.png',
                            title:'加拿大进口now猫粮幼猫五谷美毛天然粮',
                            price:128
                        },
                        {
                            img:'/images/shop/shop01a.png',
                            title:'皇家 i27 室内成猫猫主粮 2kg/10kg',
                            price:128
                        },
                    ]
                },
                {
                    type:'猫咪零食',
                    itemList:[
                        {
                            img:'/images/shop/shop01a.png',
                            title:'皇家 i27 室内成猫猫主粮 2kg/10kg',
                            price:128
                        },
                        {
                            img:'/images/shop/shop01b.png',
                            title:'皇家 i27 室内成猫猫主粮 2kg/10kg',
                            price:128
                        },
                        {
                            img:'/images/shop/shop01a.png',
                            title:'皇家 i27 室内成猫猫主粮 2kg/10kg',
                            price:128
                        },
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped>
.list-wrapper {
    padding: 10px 0;
}
.shop-list > li{
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
}
.title {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    align-items: center;
}

.title h1 {
    font-size: 18px;
}

.title span {
    font-size: 15px;
    color: #8e8e8e
}

.item-list {
    display: flex;
}

.item-list li {
    width: 31%;
    font-size: 15px;
    flex-grow: 1;
}

.item-list li div {
    display: flex;
    justify-content: center;
}

.item-list li img {
    width: 100%;
    height: 100%;
}

.item-list li p {
    margin: 5px 0;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.item-list li span {
    font-size: 20px;
    color: #cd6750;
}</style>