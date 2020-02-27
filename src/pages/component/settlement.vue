<template>
	<view class="index">
	</view>
</template>

<script>
	import swiper from '../../components/swiper.vue'
	import gnav from '../../components/good-nav.vue'
    import {uniIcons} from '@dcloudio/uni-ui'
    import {mapState,mapMutations} from 'vuex';

	export default {
		onUnload(){
		},
		data() {
			return {
            }
		},
		onLoad(option) {
		},
		methods: {
			...mapMutations(['login'])
		},
		computed:{
			...mapState(['tabGood','userData'])
		},
		components: {
			uniIcons
        }
	}
</script>

<style>
	.index{
		background-color: #eee;
	}
</style>
