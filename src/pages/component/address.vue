<template>
	<view class="index">
		<add></add>
	<get></get>
	</view>
</template>
<script>
	import add from '../../components/add-address.vue'
	import get from '../../components/get-address.vue'
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
			add,
			get
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
