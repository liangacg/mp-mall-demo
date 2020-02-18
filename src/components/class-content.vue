<template>
    <view class="box" :style="{height:sh+'px',transform:'translateY('+y+'px)'}">
        <view class="content" @touchstart="start" v-for="item in list" v-show="item.name==tag"> 
            <view class="list" v-for="i in item.class" >
                <cover-image :src="i.img"></cover-image>
                <text>{{i.name}}</text>
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
        props:['list','tag'],
        components:{
            uniIcons
        },
        computed:{
            sh(){
                let d
                uni.getSystemInfo({
                    success:function(res){
                    d = res.windowHeight
                    }
                })
                return d
            }
        },
        methods:{
            start(){
            }
        }
    }
</script>

<style>
    .box{
        width: 78%;
        background-color: #eee;   
        position: absolute;
        right: 0;
        top:0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    } 
    .content{
        width: 76%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 1rem 0.5rem 1.5rem 1.3rem;
        background-color:white;
        border-radius: 1rem;
        margin-top: 1rem;
    }
    .list{
        font-size: 0.7rem;
        text-align: center;
        width: 3.8rem;
        height: 4.8rem;
        margin-right: 0.8rem;
        margin-top: 0.5rem;
    }
    cover-image{
        width: 3.8rem;
        height: 3.8rem;
    }
</style>