<template>
	<view class="index">
		<view class="top-content">
			<view class="img">
				<swiper time="none" point="true" point-color="red" point-color-s="blue" :img="[tabGood[type].good[num].img]" height="20"></swiper>
			</view>
			<view class="title">
				<view class="text">
					<text class="price">{{price}}</text>
					<text class="name">{{tabGood[type].good[num].name}}</text>
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
		</view>
	</view>
</template>

<script>
	import swiper from '../../components/swiper.vue'
    import {uniIcons} from '@dcloudio/uni-ui'
    import {mapState} from 'vuex';

	export default {
		data() {
			return {
                num:'',
                type:''
            }
		},
		onLoad(option) {
            console.log(option)
            this.num = option.num
            this.type = option.type
		},
		methods: {
		},
		computed:{
			...mapState(['tabGood']),
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
			uniIcons
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
		font-size: 1.2rem;
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
</style>
