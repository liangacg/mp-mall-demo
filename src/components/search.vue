<template>
    <view class="box" :style="{backgroundColor:bgColor,Color:fontColor,fixed:fix,borderBottom: '2px solid '+borColor,opacity:opa}">
        <uni-icons :type="leftIcon" size="30" color="black" v-if="leftIcon" ></uni-icons>
        <view class="search-box">
            <view class="left">
                <uni-icons type="search" size="20" color="#aaa"></uni-icons>
                <view class="title">
                    <text>{{title}}</text>
                </view>
            </view>
            <view class="btn">
                    <uni-icons type="camera" size="20" color="#aaa"></uni-icons>
                    <span class="btn-text" :style="{backgroundColor:btnColor,border:'2px solid '+btnBorColor}">
                        <text>搜索</text>
                    </span>
            </view>
        </view>
        <uni-icons :type="rightIcon" size="30" color="black" v-if="rightIcon" ></uni-icons>
    </view>
</template>

<script>
    import {uniIcons} from '@dcloudio/uni-ui'

    export default{
        data() {
            return{
            }
        },
        props:['title','fixed','bgColor','fontColor','borColor','btnColor','btnBorColor','leftIcon','rightIcon','opa'],
        components:{
            uniIcons
        },
        computed:{
            fix(){
                if(this.fixed == 'true'){
                    return true
                }else{
                    return false
                }
            }
        }
    }
</script>

<style>
    .box{
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: content-box;
        padding: 2px 0;
        transition: all 0.5s
    }
    .fixed{
        background-color: red;
    }
    .search-box{
        width: 70%;
        height: 76%;
        background-color: #fff;
        border-radius: 20px;
        border: 2px solid rgb(107, 184, 158);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: .5rem;
    }
    .left{
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: start;
    }
    .title{
        font-size: 1rem;
    }
    .btn{
        width: 30%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .btn-text{
        display: inline;
        height: 100%;
        width: 3.4rem;
        border-radius: 20px;
        line-height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }
</style>