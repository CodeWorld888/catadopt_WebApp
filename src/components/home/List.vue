<template>
    <div class="main">
        <ul class="cat-list">
            <li v-for="(item,index) in adoptList" :key="index" @click="goadopt(item.id)">
                <div class="list-item">
                    <img :src="item.cover_photo" />
                    <div class="tag">
                        <ul>
                            <li>{{item.varity}}</li>
                            <li>{{item.age}}</li>
                            <li>{{item.sex}}</li>
                            <li>{{item.source}}</li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['adoptList'],
    methods:{
        goadopt(id){
            this.$router.push({
                name:'Adopt',
                query:{id}
            })
        }
    },
    
}
</script>

<style scoped>
.main {
    padding: 0 10px;
}

.cat-list {
    display: flex;
    flex-direction: column;
}
.cat-list > li{
    margin-bottom: 10px;
}
.list-item{
    display: flex;
    flex-direction: column;
}

.list-item img {
    width: 100%;
}

.tag {
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
}

.tag ul {
    display: flex;
    margin-left: 10px;
}
.tag ul li{
    background-color: #565553;
    border-radius: 5px;
    padding: 6px;
    font-size: 12px;
    color: #fff;
    margin-right: 5px;
}

</style>