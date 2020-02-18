<template>
    <view class="box">
        <view class="left">
            <view :class="{good,w90:index==clickIndex}" v-for="(item,index) in leftGoods" :style="{width:goodWidth+'%'}" @touchstart="start(index)" @touchend="end" @click="link(index,'left')">
            <cover-image :src="item.img" class="image"></cover-image>
            <view class="text">
                <view class="title">{{item.name}}</view>
                <view class="bottom">
                    <text class="price">￥{{item.price}}</text>
                    <text class="pay">{{item.num}}人付款</text>
                    <view class="icon">
                        <uni-icons type="more-filled" size="20"> </uni-icons>
                    </view>
                </view>
            </view>
        </view>
        </view>
        <view class="right">
            <view :class="{good,w90:index+100==clickIndex}" v-for="(item,index) in rightGoods" :style="{width:goodWidth+'%'}" @touchstart="start(index+100)" @touchend="end" @click="link(index,'right')">
            <cover-image :src="item.img" class="image"></cover-image>
            <view class="text">
                <view class="title">{{item.name}}</view>
                <view class="bottom">
                    <text class="price">￥{{item.price}}</text>
                    <text class="pay">{{item.num}}人付款</text>
                    <view class="icon">
                        <uni-icons type="more-filled" size="20"> </uni-icons>
                    </view>
                </view>
            </view>
        </view>
        </view>
    </view>
</template>

<script>
    import {uniIcons} from '@dcloudio/uni-ui'

    export default{
        data() {
            return{
                clickIndex: 99999
            }
        },
        props:['good','type'],
        components:{
            uniIcons
        },
        computed:{
            leftGoods(){
                let n = [];
                for(let i=0;i<this.good.length;i+=2){
                    n.push(this.good[i])
                }
                return n;
            },
            rightGoods(){
                let n = [];
                for(let i=1;i<this.good.length;i+=2){
                    n.push(this.good[i])
                }
                return n;
            }
        },
        methods:{
            start(index){
                this.clickIndex = index
            },
            end(){
                this.clickIndex = 99999
            },
            link(index,n){
                let num
                if(n=='left'){
                    if(index==0){
                        num = 0
                    }else{
                        num =index*2
                    }
                }else if(n=='right'){
                    num = index*2+1
                }
                uni.navigateTo({
                    url: '../component/good?type='+(this.type-1)+'&num='+num,
                    fail:function(err){console.log(err)}
                })
            }
        }
    }
</script>

<style>
    .box{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .left,.right{
        width: 46%;
    }
    .good{
        width: 100%;
        margin-top: 1rem;
        background-color: #fff;
        border-radius: .8rem;
        overflow: hidden;
        transition: all 0.2s
    }
    .title{
        padding: 0.5rem;
        padding-top: 0;
        line-height: 1.4em;
    }
    .bottom{
        padding: 0.5rem;
    }
    .price{
        color:rgb(0, 165, 110);
    }
    .pay{
        font-size: 0.8rem;
        color: #aaa;
        margin-left: 0.2rem;
    }
    .icon{
        padding-top: .1rem;
        display: inline-block;
        float: right;
    }
    .w90{
        transform: scale(0.95,0.95)
    }
</style>