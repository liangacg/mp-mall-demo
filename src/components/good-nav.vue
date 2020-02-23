<template>
    <view class="box" :style="{backgroundColor:bgColor,color:fontColor}" >
        <div v-for="(item,index) in nav" class="nav-box" @click="to(item.url)">
            <uni-icons :type="item.icon" :color="(selected==index+1)?btnColorS:btnColor" :size="(item.title)?26:32"></uni-icons>
            <text v-if="item.title" :style="{color:(selected==index+1)?btnColorS:btnColor}">{{item.title}}</text>
            <!-- 如果没有文字则值显示图标 -->
        </div>
        <view class="btn">
            <view class="button" @click="addCart">
                <p>加入购物车</p> 
            </view>
            <view class="button">
                <p>立即购买</p>
            </view>
        </view>
    </view>
</template>

<script>
    import {uniIcons} from '@dcloudio/uni-ui'
    import {mapState} from 'vuex';

    export default{
        data() {
            return{
            }
        },
        props:['selected','nav',"btnColor","btnColorS","bgColor","fontColor"],
        components:{
            uniIcons
        },
        computed:{
        },
        methods:{
            to(src){
                uni.redirectTo({
                    url:src
                })
            },
            addCart(){
                 this.$emit('add')
            }
        }
    }
</script>

<style>
    .box{
        width: 100%;
        height: 3.2rem;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-top: 1px solid #666;
    }
    .nav-box{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        font-size: .4rem;
        height: 2.8rem;
    }
    .btn{
        width: 60%;
        height: 2.8rem;
        background-color: aqua;
        border-radius: 1.5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        overflow: hidden;
    }
    .button{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
    .button:first-child{
        background-color: tomato;
    }
</style>