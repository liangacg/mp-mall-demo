<template>
    <view class="box" :style="{backgroundColor:bgColor,color:fontColor}" >
        <div v-for="(item,index) in navarr" class="nav-box" @click="to(item.url)">
            <uni-icons :type="item.icon" :color="(selected==index+1)?btnColorS:btnColor" :size="(item.title)?32:42"></uni-icons>
            <text v-if="item.title" :style="{color:(selected==index+1)?btnColorS:btnColor}">{{item.title}}</text>
            <!-- 如果没有文字则值显示图标 -->
        </div>
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
			...mapState(['navarr'])
        },
        methods:{
            to(src){
                uni.redirectTo({
                    url:src
                })
            }
        }
    }
</script>

<style>
    .box{
        width: 100%;
        height: 3.4rem;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .nav-box{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        font-size: .6rem;
    }
</style>