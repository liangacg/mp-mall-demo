<template>
	<view class="index">
		<view class="top-content">
			<view class="img">
				<swiper time="none" point="true" point-color="red" point-color-s="blue" :img="[tabGood[type].good[num].img]" height="20"></swiper>
			</view>
			<view class="title">
				<view class="text">
					<text class="price">{{price}}</text>
					<text class="name">{{tabGood[type].good[num].name}}{{tabGood[type].good[num].name}}{{tabGood[type].good[num].name}}{{tabGood[type].good[num].name}}</text>
				</view>
				<view class="button-group">
					<view class="btnBuyer">
						<uni-icons type="heart" size="20" color="#666"></uni-icons>
						<text>推荐{{tabGood[type].good[num].num}}</text>
					</view>
					<view class="give">
						<uni-icons type="star" size="20" color="#666"></uni-icons>
						<text>收藏</text>
					</view>
					<view class="share">
						<uni-icons type="redo" size="20" color="#666"></uni-icons>
						<text>分享</text>
					</view>
				</view>
			</view>	

			<view class="address">
				<view class="delidery">
					<view>发货</view>
					<view class="address-content">
						<view>
							<uni-icons type="location" size="18"></uni-icons>
							广东深圳
						</view>
						<view>快递:免运费</view>
					</view>
					<view>月销{{tabGood[type].good[num].num}}</view>
				</view>
				<view class="delidery">
					<view>活动</view>
					<view class="address-content">
						<view>
							<uni-icons type="flag" size="18" color="red"></uni-icons>
							<text>『领！90元红包』</text>
						</view>
					</view>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
			</view>

			<view class="content">
				<view class="content-title">———— 商品详情 ————</view>
				<hr>
				<view class="detail">
					商品详情
				</view>
			</view>
		</view>

		<gnav :nav="nav" @add="add"></gnav>
	</view>
</template>

<script>
	import swiper from '../../components/swiper.vue'
	import gnav from '../../components/good-nav.vue'
    import {uniIcons} from '@dcloudio/uni-ui'
    import {mapState,mapMutations} from 'vuex';

	export default {
		data() {
			return {
                num:'',
				type:'',
				nav:[
					{
						title: '店铺',
						icon: 'shop',
						url: '../index/index'
					},{
						title: '客服',
						icon: 'help',
						url: ''
					},{
						title: '购物车',
						icon: 'cart',
						url: '../cart/cart'
					},
				]
            }
		},
		onLoad(option) {
            console.log(option)
            this.num = option.num
            this.type = option.type
		},
		methods: {
			...mapMutations(['login']),
			add(){
				let cartList = JSON.parse(JSON.stringify(this.userData.cart))
				let goodId = this.tabGood[this.type].good[this.num]._id
				let hadIf = true
				cartList.forEach(d=>{
					if(d.id==goodId){
						hadIf = false
						d.num +=1
					}
				})
				if(hadIf){
					cartList.push({
						id: goodId,
						num: 1
					})
				}
				console.log(cartList)
				wx.cloud.init()
				let list = wx.cloud.database().collection('mall-users')
				list.doc(this.userData._id).update({
					data:{
						cart: cartList
					}
				}).then(res=>{
					console.log('提交成功')
					console.log(res)
				})
				this.login()
			}
		},
		computed:{
			...mapState(['tabGood','userData']),
			price(){
				let p = this.tabGood[this.type].good[this.num].price
				if(parseInt(p)==parseFloat(p)){
					return '￥'+p+'.00'
				}else{
					return '￥'+p
				}
			}
		},
		components: {
			swiper,
			uniIcons,
			gnav
        }
	}
</script>

<style>
	.index{
		background-color: #eee;
		height: 200rem;
		background-color: #eee;
	}
	swiper{
		display: block;
		margin-top: -1rem;
		position: static;
		height: 20rem;
	}
	.title{
		padding: 0.2rem 0.6rem;
		background-color: #fff;
	}
	.price{
		font-size: 1.4rem;
		color:rgb(73, 255, 194);
	}
	.name{
		font-size: 1.1rem;
	}
	text{
		margin-top: 0.2rem;
		display: block;
	}
	.button-group{
		padding-top: 0.5rem;
		display: flex;
		justify-content:space-between
	}
	.btnBuyer,.give,.share{
		color: #666;
		padding: 0.4em 0 ;
		width: 30%;
		display: flex;
		justify-content:center;
	}
	.content-title{
		padding: 1rem 0;
		margin: 0 auto;
		text-align: center;
		color: #666;	
	}
	.detail{
		width: 100%;
		height: 100rem;
		background-color: #fff;
	}
	.address{
		width: 100%;
		background-color: #fff;
		margin-top: 0.5rem;
	}
	.delidery{
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
	}
	.address-content{
		padding-right: 1rem;
		display: flex;
		justify-content: start;	
	}
	.address-content view{
		padding: 0 0.6rem;
	}
	.address-content view:first-child{
		border-right: 1px solid #eee;
		display: flex;
		justify-content: start;	
	}
</style>
