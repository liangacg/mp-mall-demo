<template>
	<view class="index">
		<view class="cart-box">
			<view class="good" v-for="(item,index) in userCartSort" @back="cartInit">
				<view class="left">
					<radio @click="check(index)" :checked="item.checked"></radio>
					<cover-image :src="'../'+item.data.img" class="good-img" @click="link(item)"></cover-image>
				</view>
				<view class="right">
					<p>	{{item.data.name}}{{item.data.name}}{{item.data.name}}</p>
					<view class="number">
						<p class="price">	￥{{item.data.price}}.00</p>
						<view class="numbtn">
							<view @click="raduce(index,item)" class="btn">-</view>
							<view class="numtext">{{item.num}}</view>
							<view @click="add(index,item)" class="btn">+</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="bottom">
			<view class="future">
				<radio @click="future" :checked="allChecked"></radio>
				<p>全选</p>
			</view>
			<view class="altogether">
				<p>合计：<span>{{total}}.00</span></p>
				<view class="aloBtn">结算</view>
			</view>
		</view>
		<bNav selected="3" :nav="navarr" btn-color="red" btn-color-s="blue" bg-color="aquamarine" font-color="red"></bNav>
	</view>
</template>

<script>
    import {mapState,mapGetters,mapMutations} from 'vuex';
	import bNav from '../../components/nav.vue'

	export default {
		onShow(){
			this.cartInit()
		},
		data() {
			return {
				userCart: [],
				checkedGood: []
            }
		},
		methods: {
			...mapMutations(['login']),
			con(){
				console.log()
			},
			cartInit(){
				this.userCart = []
				const that = this
				wx.cloud.init()
				let table = wx.cloud.database().collection('mall-good')
				if(this.userData.cart){
					let list = JSON.parse(JSON.stringify(this.userData.cart))
					for(let i in list){
						table.doc(list[i].id).get({
							success(res){
								that.userCart.push({
									data: res.data,
									checked: false,
									num: list[i].num,
									date: list[i].date
								})
							}
						})
					}
					console.log(that.userCart)
				}else{
					console.log('获取购物车失败')
					uni.reLaunch({url:'cart'})
				}
			},
			check(index,item){
				this.userCart[index].checked = !this.userCart[index].checked
			},
			add(index,item){
				if(this.userCart[index].num>0){
					this.userCart[index].num +=1
				}
				this.updata(item,true)
			},
			raduce(index,item){
				if(this.userCart[index].num>1){
					this.userCart[index].num -=1
				}
				this.updata(item,false)
			},
			future(){
				const that = this
				let all = false
				this.userCart.forEach(d=>{
					if(d.checked==false){
						all = true
					}
				})
				if(all==false){
					that.userCart.forEach(d=>{
						d.checked = false
					})
				}else{
					that.userCart.forEach(d=>{
						d.checked = true
					})
				}
			},
			link(item){
				uni.navigateTo({
                    url: '../component/idToGood?id='+item.data._id,
                    fail:function(err){console.log(err)}
                })
			},
			updata(item,or){
				let Data = JSON.parse(JSON.stringify(this.userData.cart))
				Data.forEach((d,index)=>{
					console.log(d.num)
					if(item.data._id == d.id){
						if(or){
							d.num+=1
						}else{
							d.num-=1
						}
						console.log(d.num)
					}
				})
				wx.cloud.init()
				let list = wx.cloud.database().collection('mall-users')
				list.doc(this.userData._id).update({
					data:{
						cart: Data
					}
				}).then(res=>{
					console.log('提交成功')
					console.log(res)
					this.login()
				})
			}
		},
		components: {
			bNav
        },
		computed:{
			...mapState(['userData','tabGood']),
			allChecked(){
				let all = true
				this.userCart.forEach(d=>{
					if(d.checked==false){
						all = false
					}
				})
				return all
			},
			total(){
				let price = 0
				this.userCart.forEach(d=>{
					if(d.checked==true){
						price += d.num* d.data.price
					}
				})
				return price

			},
			userCartSort(){
				let list = this.userCart
				list.sort((a,b)=>{return b.date - a.date})
				return list
			}
		}
	}
</script>

<style>
	.index{
		padding: 1rem 0 7rem 0;
		background-color: #eee;
	}
	.good{
		width: 90%;
		height: 8rem;
		background-color: #fff;
		margin: 1rem auto;
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
		border-radius: 1rem;
	}
	.left{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 35%;
		height: 100%;
	}
	.good-img{
		width: 5rem;
		height: 5rem;
	}
	.right{
		padding: 1rem;
		box-sizing: border-box;
		width: 65%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.number{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.numbtn{	
		display: flex;
		justify-content: space-between;
		text-align: center;
		background-color: #fff;
		border-radius: 0.2rem;
		overflow: hidden;
		border: 1px solid #eee;
	}
	.btn{
		width: 1.2rem;
		height: 0.5rem;
	}
	.numtext{
		width: 2.4rem;
		border-left: 1px solid #eee;
		border-right: 1px solid #eee;
	}
	.bottom{
		position: fixed;
		bottom: 3.4rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 3rem;
		border-top: 1px solid #eee;
		background-color: #fff;
	}
	.future{
		width: 20%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 1rem;
	}
	.altogether{
		width: 50%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
	}
	.altogether span{
		font-size: 0.8rem;
		color: green;
	}
	.aloBtn{
		width: 50%;
		height: 2.5rem;
		border-radius: 1.5rem;
		background-color: blue;
		line-height: 2.5rem;
		text-align: center;
		color: #fff;
	}
</style>
