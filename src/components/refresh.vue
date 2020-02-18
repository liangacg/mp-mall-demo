<template>
    <view :class="{box,transition:anime}" @touchstart="start" @touchmove="touchmove" @touchend="end" :style="{transform:'translateY('+move+'rem)'}">
        <view class="content" :style="{opacity:opacity}">
            <uniIcons type="reload" size="32" :class="{'icon':true,'t4':anime}" :style="{transform:'rotate('+ rotate +'deg)'}"></uniIcons>
            <p class="text">松手刷新</p>
        </view>
        <slot>
        </slot>
    </view>
</template>

<script>
    import {uniIcons} from '@dcloudio/uni-ui'

    export default{
        data() {
            return{
                move:-4.8,
                rotate:0,
                switch:false,
                oldY: 0,
                anime: false,
                opacity: 0
            }
        },
        props:[],
        components:{
            uniIcons
        },
        computed:{
            screenHeight(){
                let d
                let box = this.width
                uni.getSystemInfo({
                    success:function(res){
                    d = res.screenHeight
                    }
                })
                return d
            }
        },
        methods:{
            start(event){
                if(event.touches[0].pageY<this.screenHeight*0.3){
                    this.rotate = 0
                    this.switch = true
                    this.oldY = event.touches[0].pageY
                    this.anime = false
                }
            },
            touchmove(event){
                let y = event.touches[0].pageY
                if(this.switch==true&&this.move<1.5){
                    if(y>this.oldY){
                        this.move += (y-this.oldY)/this.screenHeight*4.5*4
                        this.rotate += y-this.oldY
                    }else if(this.move>-4.5){
                        this.move -= (this.oldY-y)/this.screenHeight*4.5*4
                        this.rotate += y-this.oldY
                    }
                }else{
                }
                if(this.move>-1){
                    this.opacity = 1
                    this.$emit('opa',this.opacity)
                }else{
                    this.opacity = 0
                    this.$emit('opa',this.opacity)
                }
                this.oldY = y
            },
            end(){
                if(this.move>1.5){
                    this.anime = true                    
                    setTimeout(()=>{uni.reLaunch({url:'index'})},1000)
                }else{
                    this.opacity = 0
                }
                this.switch = false
                this.move = -4.8
                this.rotate = 2000
            }
        }
    }
</script>

<style>
    .box{
        width: 100%;
    }
    .transition{
        transition: all 1s 2s
    }
    .content{
        transition: all 0.5s
    }
    .icon{
        display: block;
        width: 2rem;
        margin: 0 auto;
    }
    .t4{
        transition: all 4s;
    }
    .text{
        text-align: center;
        padding-bottom: 1rem;
    }
</style>