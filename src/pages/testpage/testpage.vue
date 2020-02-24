<template>
	<view class="index">
		<cartList></cartList>	
	</view>
</template>

<script>
    import {mapState,mapGetters,mapMutations} from 'vuex';
	import {uniIcons} from '@dcloudio/uni-ui'
	import cartList from '../../components/cart-list.vue'

	export default {
		onLoad() {

		},
		data() {
			return {
            }
		},
		methods: {
		},
		components: {
			uniIcons,
			cartList
		},
		computed:{
			...mapState(['userData'])
		}
	}
</script>

<style>
	.index{
	}
</style>
