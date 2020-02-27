<template>
    <view class="box" :style="{height: (testData.form)?28+'rem':5+'rem'}">
        <view class="address-table" v-if="testData.form">
            <view class="close">
                <view> </view>
                <uni-icons type="close" size="32"  @click="testData.form=!testData.form;init()" v-if="testData.form"></uni-icons>
            </view>
            <view class="error" v-show="!testData.name">请填写2~12位中英文名字</view>
            <input type="text" placeholder="收件人" v-model="name" @blur.prevent="nameTest">
            <view class="error" v-show="!testData.number">请填写11位手机号码</view>
            <input type="number" placeholder="手机号码" v-model="number" @blur.prevent="numberTest">

            <view class="error" v-show="!testData.address">请选择正确的地址</view>
            <view class="address-select">
                    <view class="address-title">
                        省份
                    </view>
                <picker mode = selector :range="provinceData" range-key="label" @change="provinceSelect">
                    <text v-if="testData.province">{{provinceData[selectProvince].label}}</text>
                    <text v-if="!testData.province" class="not-select">请选择省份</text>
                </picker>
            </view>
            <view class="address-select" v-if="testData.province">
                    <view class="address-title">
                        城市
                    </view>
                <picker mode = selector :range="cityData" range-key="label" @change="citySelect">
                    <text v-if="testData.city">{{cityData[selectCity].label}}</text>
                    <text v-if="!testData.city" class="not-select">请选择省份</text>
                </picker>
            </view>
            <view class="address-select"  v-if="testData.city">
                <view class="address-title">
                    区/镇/县
                </view>
                <picker mode = selector :range="areaData" range-key="label" @change="areaSelect">
                    <text v-if="testData.area">{{areaData[selectArea].label}}</text>
                    <text v-if="!testData.area" class="not-select">请选择省份</text>
                </picker>
            </view>
            <input type="text" placeholder="详细地址" v-model="detailed">
            <view class="error" v-show="!testData.zip">请填写正确的邮编</view>
            <input type="number" placeholder="邮政编码" v-model="zip" @blur.prevent="zipTest">
            <button @click="addAddress">提交</button>
        </view>

        <view class="add-btn" v-if="!testData.form" @click="testData.form=!testData.form">
            <uni-icons type="plusempty" size="30" color="#aaa" ></uni-icons>
            <text>添加地址</text>
        </view>
    </view>
</template>

<script>
    import {uniIcons} from '@dcloudio/uni-ui'
    import {mapState} from 'vuex'
	import area from './city-data/area.js'
	import city from './city-data/city.js'
	import province from './city-data/province.js'

    export default{
        beforeMount(){
            wx.cloud.init()
            this.provinceData = province
        },
        data() {
            return{
                name:'',
                number:'',
                zip:'',
                detailed:'',
				provinceData: [],
				selectProvince: 0,
				selectCity: 0,
                selectArea: 0,
                testData:{
                    name: true,
                    number: true,
                    province: false,
                    city: false,
                    area: false,
                    zip: true,
                    address: true,
                    form: false
                }
            }
        },
        props:[],
        components:{
            uniIcons
        },
        computed:{
            ...mapState(['userData']),
			cityData(){
				return city[this.selectProvince]
			},
			areaData(){
				return area[this.selectCity][0]
            },
            addressData(){
                let list ={
                    address: this.name,
                    number: this.number,
                    province: this.provinceData[this.selectProvince],
                    city: this.cityData[this.selectCity],
                    area: this.areaData[this.areaSelect],
                    detailed: this.detail,
                    zip: this.zip
                }
                return list
            }
        },
        methods:{
            provinceSelect(event){
                this.selectProvince = event.detail.value
                this.testData.province = true
                if(this.testData.province == true){
                    this.testData.city = false
                    this.testData.area = false
                }
            },
            citySelect(event){
                this.selectCity = event.detail.value
                this.testData.city = true
                if(this.testData.city == true){
                    this.testData.area = false
                }
            },
            areaSelect(event){
                this.selectArea = event.detail.value
                this.testData.area = true
            },
            addAddress(){
                console.log(this.userData._id)
                this.nameTest()
                this.numberTest()
                this.zipTest()
                if(!this.testData.province||!this.testData.city||!this.testData.area){
                    this.testData.address = false
                }else{
                    this.testData.address = true
                }
                if(this.testData.name&&this.testData.number&&this.testData.address&&this.testData.zip){
                    const db = wx.cloud.database()
                    const _ = db.command
                    db.collection('mall-users').doc(this.userData._id).update({
                        data:{
                            address: _.push(this.addressData)
                        }
                    }).then(res=>{
                        console.log(res)
                        this.init()
                    })
                }else{
                    console.log('提交失败')
                }
            },
            nameTest(){
                let patt =  /^[\u4e00-\u9fa5A-Za-z]{2,16}$/
                if(!patt.test(this.name)){
                    this.testData.name = false
                    console.log('信息错误')
                }else{
                    this.testData.name = true
                }
            },
            numberTest(){
                let patt =  /0?(13|14|15|18|17)[0-9]{9}/
                if(!patt.test(this.number)){
                    this.testData.number = false
                    console.log('信息错误')
                }else{
                    this.testData.number = true
                }
            },
            zipTest(){
                let patt =  /^[0-9]{6}$/
                if(!patt.test(this.zip)){
                    this.testData.zip = false
                    console.log('信息错误')
                }else{
                    this.testData.zip = true
                }
            },
            init(){
                this.name = ''
                this.number = ''
                this.zip = ''
                this.detailed = ''
                this.provinceSelect = 0
                this.citySelect = 0
                this.area = 0
                this.testData = {
                    name: true,
                    number: true,
                    province: false,
                    city: false,
                    area: false,
                    zip: true,
                    address: true,
                    form: false
                }
            }
        }
    }
</script>

<style>
    .box{
        width: 95%;
        background-color: #fff;
        border-radius: 1rem;
        margin: 0 auto;
        padding-bottom: 1rem;
        transition: all 0.3s;
    }
    .add-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem 0;
        transition: all 1s;
    }
    .add-btn text{
        font-size: 1.5rem;
        color: #aaa;
    }
    .address-table{
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 1s; 
    }
    input{
        width: 80%;
        height: 1.2rem;
        border: #aaa solid 1px;
        border-radius: 0.3rem;
        padding: 0.2rem;
        margin-top: 1rem;
    }
    .address-select{
        width: 80%;
        height: 1.2rem; 
        border: #aaa solid 1px;
        border-radius: 0.3rem;
        padding: 0.2rem;
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
    }
    .not-select{
        color: #aaa;
    }
    picker{
        width: 50%;
        text-align: center;
    }
    .error{
        width: 80%;
        color: rgb(233, 84, 84);
        margin: 0 auto;
        padding: 0 0.2rem;
        margin-bottom: -0.7rem;
    }
    button{
        width: 80%;
        margin-top: 1rem;
    }
    .close{
        width: 80%;
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }
</style>