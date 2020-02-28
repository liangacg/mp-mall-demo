<template>
    <view class="box" >
        <view class="content" v-for="item in userData.address">
            <view class="name">{{item.name}}</view>
            <view class="number">{{item.number}}</view>
            <view class="address">{{item.province}}{{item.city}}{{item.area}}{{item.detailed}}</view>
        </view>
    </view>
</template>

<script>
    import {uniIcons} from '@dcloudio/uni-ui'
    import {mapState} from 'vuex';

    export default{
        beforeMount(){
            wx.cloud.init()
        },
        data() {
            return{
            }
        },
        props:[],
        components:{
            uniIcons
        },
        computed:{
            ...mapState(['userData'])
        },
        methods:{
        }
    }
</script>

<style>
    .box{
        width: 100%;
    } 
    .content{
        width: 95%;
        background-color: #fff;
        border-radius: 1rem;
        margin: 0 auto;
        padding-bottom: 1rem;
        transition: all 0.3s;
        margin-bottom: 1rem;
        padding: 1rem;
        box-sizing: border-box;
    }
    .name{
        font-size: 1.4rem;
    }
    .address{
        color: #aaa;
    }
</style>