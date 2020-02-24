<template>
    <view class="box" @click="get">
    {{id}}
        <view class="cart-box">
			<view class="good" v-for="(item,index) in userCart">
				<view class="left">
					<radio @click="check(index)" :checked="item.checked"></radio>
					<cover-image :src="'../'+item.data.img" class="good-img" @click="link(item)"></cover-image>
				</view>
				<view class="right">
					<p>	{{item.data.name}}{{item.data.name}}{{item.data.name}}</p>
					<view class="number">
						<p class="price">	￥{{item.data.price}}.00</p>
						<view class="numbtn">
							<view @click="raduce(index)" class="btn">-</view>
							<view class="numtext">{{item.num}}</view>
							<view @click="add(index)" class="btn">+</view>
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
    </view>
</template>

<script>
    import {uniIcons} from '@dcloudio/uni-ui'
    import {mapState,mapGetters,mapMutations} from 'vuex';

    export default{
        created(){
        },
        data() {
            return{
            }
        },
        props:[],
        components:{
            uniIcons
        },
        computed:{
            ...mapState(['userData']),
            id(){
                return this.userData._id
            },
            cart(){
                return this.userData.cart
            }
        },
        methods:{
            get(){
            }
        }
    }
</script>

<style>
    .box{
    } 
</style>