<template>
	<view class="index">
		我的页面
		{{userCode}}
		<button open-type="getUserInfo">登录</button>
		<bNav selected="4" btn-color="red" btn-color-s="blue" bg-color="aquamarine" font-color="red"></bNav>
	</view>
</template>

<script>
    import {mapState,mapGetters,mapMutations} from 'vuex';
	import bNav from '../../components/nav.vue'

	export default {
		onLoad() {
			this.login()
		},
		data() {
			return {
            }
		},
		methods: {
			...mapMutations(['login'])
		},
		components: {
			bNav
		},
		computed:{
			...mapState(['userCode'])
		}
	}
</script>

<style>
	.index{
	}
</style>
