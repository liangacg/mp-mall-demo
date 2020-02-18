<template>
    <view class="box radius" :style="{width:width+'%',height:height}">
        <view class="content" :style="{transform:'translateX('+x+'px)',width:pageWidth+'%'}" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
            <view class="icon" v-for="item in ob">
                <uni-icons type="chat" size="35" v-if="item.type"></uni-icons>
                <cover-image :src="item.img"  v-if="item.img" class="icon-img"></cover-image>
                <text class="text">{{item.title}}</text>
            </view>
        </view>
        <view class="scroll" :style="{backgroundColor:scrollColor}" v-if="pageSwitch">
            <view class="fill" :style="{width:scrollWidth+'%',backgroundColor:scrollColorS,transform:'translateX('+x/6*-1+'px)'}"></view>
        </view>
    </view>
</template>

<script>
    import {uniIcons} from '@dcloudio/uni-ui'

    export default{
        data() {
            return{
                ob:[
                    {title:'name',img:'../static/logo.png'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',img:'../static/logo.png'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'},
                    {title:'name',type:'chat'}
                ],
                x: 0,
                newX: 0,
                oldX: 0
            }
        },
        props:['width','height','scrollColor','scrollColorS'],
        components:{
            uniIcons
        },
        computed:{
            ww(){
                let d
                let box = this.width
                uni.getSystemInfo({
                    success:function(res){
                    d = res.windowWidth*box*0.01
                    }
                })
                return d
            },
            pageWidth(){
                let n
                if(this.ob.length<=10){
                    n= 100
                }else if(this.ob.length<=12){
                    n= 120
                }else if(this.ob.length<=14){
                    n= 140
                }else if(this.ob.length<=16){
                    n= 160
                }else if(this.ob.length<=18){
                    n= 180
                }else if(this.ob.length<=20){
                    n= 200
                }
                if(this.ww<300){
                    return n+40
                }else if(this.ww<325){
                    return n+15
                }if(this.ww>350){
                    return n-15
                }else{
                    return n
                }
            },
            moveWidth(){
                return this.ww*this.width*0.01*(this.pageWidth+10)*0.01-this.ww*this.width*0.01
            },
            pageSwitch(){
                if(this.ob.length<=10){
                    return false
                }else{
                    return true
                }
            },
            scrollWidth(){
                return (this.ww*this.width*0.01)/(this.ww*this.width*0.01*(this.pageWidth+10)*0.01)*100
            }
        },
        methods:{
            touchstart(event){
                console.log(this.mallGood)
                if(this.pageSwitch){
                    this.newX = event.touches[0].clientX
                    this.oldX = event.touches[0].clientX
                }
            },
            touchmove(event){
                if(this.pageSwitch){
                    this.newX = event.touches[0].clientX
                    if(this.newX>this.oldX){
                        let d = this.newX - this.oldX
                        if(this.x<this.moveWidth*0.1){
                        this.x += d;
                        }
                    }else if(this.newX<this.oldX){
                        let d = this.oldX - this.newX
                        if(this.x>-this.moveWidth*1.1){
                            this.x -= d;
                        }
                    }
                    this.oldX = this.newX
                }
            },
            touchend(event){
                if(this.pageSwitch){
                    if(this.x<-this.moveWidth){
                        this.x = -this.moveWidth
                    }
                    if(this.x>0){
                        this.x = 0
                    }
                }
            }
        }
    }
</script>

<style>
    .box{
        width: 100%;
        background-color: aquamarine;
        margin: 1rem auto;
        padding: 0.5rem 0;
        overflow: hidden;
    }
    .radius{
        border-radius: 1rem;
    }
    .content{
        width: 205%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-star;
        transition: all 0.2s;
    }
    .icon{
        padding: 0 1rem;
        font-size: 1rem;
    }
    .text{
        display: block;
        margin-top: 5px;
        text-align: center;
        margin-top: -0.3rem;
        font-size: 0.8rem;
    }
    .scroll{
        width: 30%;
        height: 0.4rem;
        margin: 0.1rem auto;
        border-radius: 0.4rem;
        overflow: hidden;
    }
    .fill{
        width: 50%;
        height: 100%;
        border-radius: 0.4rem;
        transition: all 0.2s;
    }
    .icon-img{
        width: 2.35rem;
        height: 2.35rem;
    }
</style>