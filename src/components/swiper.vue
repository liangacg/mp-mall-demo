<template>
    <view class="box" @click="onc" :style="{height: height+'rem'}">
        <swiper :indicator-dots="point" :indicator-color="pointColor" :indicator-active-color="pointColorS" :interval="time" autoplay="true" 
        :class="{'swiper-box':true,'border':border}" circular="true" >
            <swiper-item v-if="img[0]">
                <img :src="img[0]">
            </swiper-item>
            <swiper-item v-if="img[1]">
                <img :src="img[1]">
            </swiper-item>
            <swiper-item v-if="img[2]">
                <img :src="img[2]">
            </swiper-item>
            <swiper-item v-if="img[3]">
                <img :src="img[3]">
            </swiper-item>
            <swiper-item v-if="img[4]">
                <img :src="img[4]">
            </swiper-item>
            <swiper-item v-if="img[5]">
                <img :src="img[5]">
            </swiper-item>
            <swiper-item v-if="img[6]">
                <img :src="img[6]">
            </swiper-item>
            <swiper-item v-if="img[7]">
                <img :src="img[7]">
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import {uniIcons} from '@dcloudio/uni-ui'

    export default{
        data() {
            return{
                num: 0
            }
        },
        props:['time','point','pointColor','pointColorS','img','border','height'],
        components:{
        },
        computed:{
        },
        methods:{
        }
    }
</script>

<style>
    .box{
        margin-top: 1rem;
        width: 100%;
    }
    .swiper-box{
        height: 100%;
        margin: 0 auto; 
        background-color: red;
        overflow: hidden;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .border{
        border-radius: 1rem;  
        width: 90%; 
    }
</style>