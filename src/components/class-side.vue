<template>
    <view class="box" :style="{height:sh+'px',transform:'translateY('+y+'px)'}" @touchstart="start" @touchmove="move" @touchend="end">
        <view v-for="(item,index) in list" :class="{item,select:index==selected}" @click="tab(index,item.name)">
            <view class="i" v-show="index==selected"></view>
            <text class="text">{{item.name}}</text>
        </view>
    </view>
</template>

<script>
    import {uniIcons} from '@dcloudio/uni-ui'
    import {mapState} from 'vuex';

    export default{
        data() {
            return{
                selected: 0,
                y: 0,
                oldY: 0
            }
        },
        props:['list'],
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
            },
            sw(){
                let d
                uni.getSystemInfo({
                    success:function(res){
                    d = res.windowWidth
                    }
                })
                return d
            },
            rem(){
                return this.sw/20
            },
            max(){
                if(this.list.length*3*this.rem > this.sh){
                    return this.list.length*3*this.rem - this.sh
                }else{
                    return false
                }
                
            }
        },
        methods:{
            tab(index,name){
                this.selected = index
                this.$emit('tab',name)
            },
            start(event){
                this.oldY = event.touches[0].pageY
            },
            move(event){
                if(this.max){
                    if(this.y>=-this.max && this.y<=0){
                        let newY = event.touches[0].pageY
                        if(newY>this.oldY){
                            this.y += newY-this.oldY
                        }else if(newY<this.oldY){
                            this.y += newY-this.oldY
                        }
                    }
                    this.oldY = event.touches[0].pageY
                    
                    if(this.y>10){
                        this.y = 0
                    }
                    if(this.y<-this.max-10){
                        this.y = -this.max
                    }
                }
            },
            end(event){
                if(this.y>0){
                    this.y = 0
                }
                if(this.y<-this.max){
                    this.y = -this.max
                }
            }
        }
    }
</script>

<style>
    .box{
        width: 22%;
        background-color: #eee;
    }
    .item{
        width: 100%;
        padding: 1rem 0;
        background-color: white;
        text-align: center;
        box-sizing: border-box;
        font-size: 1rem;
    }
    .select{
        background-color: #eee;
    }
    .i{
        width: 0.3rem;
        height: 1.5rem;
        background-color: aquamarine;
        position: absolute;
    }   
</style>