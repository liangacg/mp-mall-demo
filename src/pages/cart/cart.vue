<template>
	<view class="index">
    购物车
		<bNav selected="3" :nav="navarr" btn-color="red" btn-color-s="blue" bg-color="aquamarine" font-color="red"></bNav>
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
