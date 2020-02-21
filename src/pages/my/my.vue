<template>
	<view class="index">
		<view class="top-content">
			<view class="user">
				<cover-image :src="userData.avatarUrl" v-if="userData.avatarUrl" class="avatar"></cover-image>
				<text v-if="userData.name" class="name">{{userData.name}}</text>
				<view class="user-btn-box">
					<bNav selected="4" btn-color="red" btn-color-s="blue" bg-color="aquamarine" font-color="red"></bNav>
						<view class="user-btn">
							<p>0</p>
							<p>商品足迹</p>
						</view>
						<view class="user-btn">
							<p>0</p>
							<p>店铺足迹</p>
						</view>
						<view class="user-btn">
							<p>0</p>
							<p>我的收藏</p>
						</view>
						<view class="user-btn">
							<p>0.00</p>
							<p>我的余额</p>
						</view>
				</view>
			</view>
		</view>

		<view class="order">
			<view class="order-title">
				<p>我的订单</p>
				<p>全部订单</p>
			</view>
			<view class="order-btn-box">
				<view class="order-btn">
					<uni-icons type="flag" size="25"></uni-icons>
					<p>代付款</p>
				</view>
				<view class="order-btn">
					<uni-icons type="redo" size="25"></uni-icons>
					<p>代发货</p>
				</view>
				<view class="order-btn">
					<uni-icons type="undo" size="25"></uni-icons>
					<p>待收货</p>
				</view>
				<view class="order-btn">
					<uni-icons type="checkmarkempty" size="25"></uni-icons>
					<p>已完成</p>
				</view>
			</view>
		</view>

		<view class="order">
			<view class="order-title">
				<p>更多功能</p>
				<p> </p>
			</view>
			<view class="order-btn-box">
				<view class="order-btn">
					<uni-icons type="help" size="25"></uni-icons>
					<p>帮助</p>
				</view>
				<view class="order-btn">
					<uni-icons type="gear" size="25"></uni-icons>
					<p>设置</p>
				</view>
				<view class="order-btn">
					<uni-icons type="shop" size="25"></uni-icons>
					<p>成为店主</p>
				</view>
				<view class="order-btn">
					<p> </p>
				</view>
			</view>
		</view>

		<view class="order">
			<view class="order-title">
				<p>更多功能</p>
				<p> </p>
			</view>
			<view class="order-btn-box">
				<view class="order-btn">
					<uni-icons type="help" size="25"></uni-icons>
					<p>帮助</p>
				</view>
				<view class="order-btn">
					<uni-icons type="gear" size="25"></uni-icons>
					<p>设置</p>
				</view>
				<view class="order-btn">
					<uni-icons type="shop" size="25"></uni-icons>
					<p>成为店主</p>
				</view>
				<view class="order-btn">
					<p> </p>
				</view>
			</view>
		</view>

		<view class="recommended">———— 商品推荐 ————</view>
		<sw :tab="tabGood" color="rgb(73, 255, 194)" title="false"></sw>

		<button open-type="getUserInfo" v-if="session">授权登录</button>
		<bNav selected="4" btn-color="red" btn-color-s="blue" bg-color="aquamarine" font-color="red"></bNav>
	</view>
</template>

<script>
    import {mapState,mapGetters,mapMutations} from 'vuex';
    import {uniIcons} from '@dcloudio/uni-ui'
	import sw from '../../components/switch.vue'
	import bNav from '../../components/nav.vue'

	export default {
		onLoad() {
			this.getData()
			this.login()
			this.check()
		},
		data() {
			return {
				session: true,
				data: []
            }
		},
		methods: {
			...mapMutations(['login','getData']),
			check(){
				const that = this
				uni.checkSession({
					success(){
						that.session = false
					},
					fail(){
						that.session = true
					}
				})
			}
		},
		components: {
			bNav,
			uniIcons,
			sw
		},
		computed:{
			...mapState(['tabGood','userCode','userData','refresh']),
			...mapGetters(['systemInfo'])
		}
	}
</script>

<style>
	.index{
		background-color: #eee;
	}
	.user{
		padding: 1rem 1rem 0 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
		align-items: center;
		background-color: aquamarine;
	}
	.avatar{
		width: 6rem;
		height: 6rem;
		border-radius: 50%;
	}
	.name{
		padding: 0.5rem 0;
		font-size: 1.5rem;
	}
	.user-btn-box{
		padding: 1rem;
		border-radius: 2rem 2rem 0 0;
		width: 95%;
		background-color: white;
		height: 3rem;
		display: flex;
		justify-content: space-around;
		font-size: 0.8rem;
	}
	.user-btn{
		width: 25%;
		display: flex;
		text-align: center;	
		flex-direction: column;
		align-items: center;
		border-left: 1px solid #eee;
	}
	.user-btn:first-of-type{
		border-left:none;
	}
	.order{
		padding: 0.5rem;
		width: 90%;
		border-radius: 0.5rem;
		background-color: white;
		margin: 1rem auto;
	}
	.order-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.order-btn-box{
		padding: 1em 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.order-btn{
		display: flex;
		width: 20%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 0.8rem;
	}
	.recommended{
		text-align: center;
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
</style>
