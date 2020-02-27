<template>
	<view class="index">
		<add></add>
	地址管理
	</view>
</template>
<script>
	import add from '../../components/add-address.vue'
    import {uniIcons} from '@dcloudio/uni-ui'
    import {mapState,mapMutations} from 'vuex';

	export default {
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
			...mapState(['tabGood','userData']),
		},
		components: {
			uniIcons,
			add
        }
	}
</script>

<style>
	.index{
		width: 100%;
		background-color: #eee;
		padding: 1rem 0;
	}
</style>
