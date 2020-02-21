<template>
    <view class="box">
        <view class="tabsBox" v-if="title=='true'">
            <view class="tab" v-for="(item,index) in tab" @click="change(index)">
                <text class="title" :style="{color:(index==selected)?color:''}">{{item.title}}</text>
                <br>
                <text :class="{introduce:true,selected:index==selected}" :style="{backgroundColor:(index==selected)?color:''}">{{item.introduce}}</text>
            </view>
        </view>
        <view v-for="(item,index) in tab">
            <goods :good="item.good" :type="item.type" v-if="index==selected"></goods>
        </view>
    </view>
</template>

<script>
    import {uniIcons} from '@dcloudio/uni-ui'
	import goods from './goods.vue'

    export default{
        data() {
            return{
                selected: 0
            }
        },
        props:['color','tab','title'],
        components:{
            uniIcons,
            goods
        },
        computed:{
        },
        methods:{
            change(index){
                this.selected = index
            }
        }
    }
</script>

<style>
    .box{
        width: 100%;
        padding-bottom: 4rem;
    }
    .tabsBox{
        display: flex;
        justify-content: space-around;
    }
    .tab{
        text-align  : center;
        width: 25%;
        border-right: 1px solid #aaa;
    }
    .tab:last-child{
        border-right:none;
    }
    .title{
        font-size: 1.2rem;
    }
    .introduce{
        font-size: 0.8rem;
    }
    .selected{
        padding: 0.1rem 0.3rem;
        border-radius: 1rem;
        color: #fff;
    }
</style>