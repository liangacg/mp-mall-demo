<template>
	<view class="index">
		<se :opa="opacity" title="特价潮牌女装" fixed="true" bg-color="" font-color="" bor-color="rgba(135, 238, 204,.2)" btn-color="rgb(73, 255, 194)" btn-bor-color="" left-icon="scan" right-icon="chat"></se>
		<box @opa="change">
		<banner height="10" time="2000" point="true" point-color="red" point-color-s="blue" :img="img" border="true"></banner>
			<scroll width="90" height="6.5rem" scroll-color="red" scroll-color-s="blue"></scroll>
			<sw color="rgb(73, 255, 194)" :tab="tabGood"></sw>
		</box>
		<bNav selected="1" :nav="navarr" btn-color="red" btn-color-s="blue" bg-color="aquamarine" font-color="red"></bNav>
	</view>
</template>

<script>
    import {mapState,mapGetters,mapMutations} from 'vuex';
	import se from '../../components/search.vue'
	import bNav from '../../components/nav.vue'
	import banner from '../../components/swiper.vue'
	import scroll from '../../components/scroll.vue'
	import goods from '../../components/goods.vue'
	import sw from '../../components/switch.vue'
	import box from '../../components/refresh.vue'

	export default {
		onLoad(){
			this.getData()
		},
		data() {
			return {
				opacity: 1,
				title: 'Hello',
				navarr: [
					{title:'首页',icon:'locked',url:'../index/index'},
					{title:'分类',icon:'checkbox',url:'../class/class'},
					{title:'购物车',icon:'camera',url:'../cart/cart'},
					{title:'我',icon:'camera',url:'../my/my'}],
				img: ['../static/1.jpg','../static/2.jpg','../static/3.jpg']
			}
		},
		computed:{
			...mapState(['tabGood'])
		},
		methods: {
			change(msg){
				if(msg==0){
					this.opacity = 1
				}else{
					this.opacity = 0
				}
			},
			...mapMutations(['getData'])
		},
		components: {
			se,
			bNav,
			banner,
			scroll,
			goods,
			sw,
			box
		}
	}
</script>

<style>
	.index{
		background-color: #eee;
		height: 200rem;
	}
</style>
