<script>
	import Vue from 'vue'
    import {mapState,mapGetters,mapMutations} from 'vuex';

	export default {
		onLaunch: function() {
			uni.login()
            this.loadUserData()
			console.log('App Lanuch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['loadUserData'])
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
