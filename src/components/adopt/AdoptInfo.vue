<template>
    <div class="info-wrapper">
        <div class="info">
            <van-divider :style="{ color: '#000', borderColor: '#b8b8b8', padding: '0 5px' }">基本信息</van-divider>
            <ul class="info-list">
                <li>
                    <h1>{{ info.id }}</h1>
                    <span>猫咪编号</span>
                </li>
                <li>
                    <h1>{{ info.varity }}</h1>
                    <span>猫咪品种</span>
                </li>
                <li>
                    <h1>{{ info.birth }}</h1>
                    <span>出生日期</span>
                </li>
                <li>
                    <h1>{{ info.sex }}</h1>
                    <span>性别</span>
                </li>
                <li>
                    <h1>{{ info.city }}</h1>
                    <span>所在城市</span>
                </li>
                <li>
                    <h1>{{ info.sterilization }}</h1>
                    <span>绝育情况</span>
                </li>
            </ul>

            <van-divider :style="{ color: '#000', borderColor: '#b8b8b8', padding: '0 5px' }">免疫状况</van-divider>
            <div class="vaccinum">
                <h1>疫苗说明</h1>
                <span>{{ info.vaccinum }}</span>
            </div>
            <div class="parasite">
                <h1>驱虫说明</h1>
                <span>{{ info.parasite }}</span>
            </div>

            <van-divider :style="{ color: '#000', borderColor: '#b8b8b8', padding: '0 5px' }">猫咪来源</van-divider>
            <span class="source-health">{{ info.source_detail }}</span>


            <van-divider :style="{ color: '#000', borderColor: '#b8b8b8', padding: '0 5px' }">健康说明</van-divider>
            <span class="source-health">{{ info.health }}</span>


            <van-divider :style="{ color: '#000', borderColor: '#b8b8b8', padding: '0 5px' }">押金价格</van-divider>
            <div class="price">
                <h1>领养押金：</h1>
                <span>￥{{ info.price }}</span>
            </div>

            <van-divider :style="{ color: '#000', borderColor: '#b8b8b8', padding: '0 5px' }">其他说明</van-divider>
            <ul class="notice-list">
                <li >
                    <h1>领养流程：</h1>
                    <p>和送养人微信沟通看猫 =》完成下单 =》双方协商接猫事件地点 =》成功领猫</p>
                </li>
                <li >
                    <h1>领后服务：</h1>
                    <p>赠送商城永久会员，包括面海在线养猫咨询和商品服务折扣</p>
                </li>
                <li >
                    <h1>退养说明：</h1>
                    <p>如果个人原因无法继续喂养，需将猫咪送至送养人处，经送养人确认，退还押金</p>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
export default {
    props:['info'],
}
</script>

<style scoped>
.info-wrapper {
    padding-top: 10px;
}

.info {
    background-color: #fff;
    padding-top: 5px;
}

.info-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 10px;
}

.info-list li {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 15px 0;
}

.info-list li h1 {
    font-size: 16px;
    margin-bottom: 10px;
}

.info-list li span {
    font-size: 13px;
    color: #717171;
}

.vaccinum {
    display: flex;
    padding-left: 15px;
    align-items: center;
}

.vaccinum h1 {
    font-size: 16px;
}

.vaccinum span {
    font-size: 15px;
    color: #717171;
    margin-left: 10px;
}

.parasite {
    display: flex;
    padding-left: 15px;
    align-items: center;
    margin-top: 10px;
}

.parasite h1 {
    font-size: 16px;
}

.parasite span {
    font-size: 15px;
    color: #717171;
    margin-left: 10px;
}

.price {
    display: flex;
    padding-left: 15px;
    align-items: center;
}

.source-health {
    font-size: 15px;
    color: #717171;
    margin-left: 15px;
}

.price h1 {
    font-size: 16px;
}

.price span {
    font-size: 16px;
    color: red;
    margin-left: 5px;
}
.notice-list{
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
    padding: 0 15px;
}
.notice-list li{
    display: block;
    overflow: hidden;
    clear: both;
    margin-bottom: 10px;
    
}

.notice-list li h1 {
    float: left;
    font-size: 16px;
}

.notice-list li p {
    float: right;
    font-size: 15px;
    color: #717171;
    width: 260px;
    line-height: 20px;
}</style>