<template>
	<view class="index">
    我的页面
		<bNav selected="4" btn-color="red" btn-color-s="blue" bg-color="aquamarine" font-color="red"></bNav>
	</view>
</template>

<script>
	import bNav from '../../components/nav.vue'

	export default {
		data() {
			return {
            }
		},
		onLoad() {

		},
		methods: {
		},
		components: {
			bNav
        }
	}
</script>

<style>
	.index{
	}
</style>
