<template>
	<view class="index">
		<side :list="classList" @tab="change"></side>
		<ct :list="classList" :tag="tag"></ct>
		<!-- <form v-if="0">
			<radio-group @change="tick">
				<radio value="digital" checked="true">数码</radio>
				<radio value="department">百货</radio>
				<radio value="clothes">服饰</radio>
			</radio-group>
			{{className}}
			<input type="text" placeholder="小类名中文" v-model="classTitle">
			<input type="text" placeholder="图片地址" v-model="classImg">
			<button @click="update">提交</button>
			<button @click="start">刷新</button>
		</form>
		<view v-for="item in classList">
			<text>{{item.name}}</text>
		</view>
		<ul v-for="item in classList">
			<li v-for="i in item.class">{{i.name}}</li>
		</ul> -->
		<bNav selected="2" :nav="navarr" btn-color="red" btn-color-s="blue" bg-color="aquamarine" font-color="red"></bNav>
	</view>
</template>

<script>
	import bNav from '../../components/nav.vue'
	import side from '../../components/class-side.vue'
	import ct from '../../components/class-content.vue'

	export default {
		onShow(){
			this.start()
		},
		data() {
			return {
				className:'digital',
				classTitle:'',
				classImg:'cloud://liangacg.6c69-liangacg-1301112254/class_img/classImg.jpg',
				classList:[],
				tag: '数码'
            }
		},
		onLoad() {

		},
		methods: {
			update(){
				wx.cloud.init()
				let list = wx.cloud.database().collection('mall-good-class')
				list.add({
					data:{
						type: this.className,
						name: this.classTitle,
						img: this.classImg
					}
				}).then(res=>{
					console.log('提交成功')
					console.log(res)
				})
				this.classTitle=''
			},
			tick(event){
				this.className = event.detail.value
			},
			start(){
				this.classList = []
				wx.cloud.init()
				let list = wx.cloud.database().collection('mall-good-class')
				list.where({type:'digital'}).get().then(res=>{
					this.classList.push({
						name: '数码',
						class: res.data
					})
				})
				list.where({type:'department'}).get().then(res=>{
					this.classList.push({
						name: '百货',
						class: res.data
					})
				})
				list.where({type:'clothes'}).get().then(res=>{
					this.classList.push({
						name: '服饰',
						class: res.data
					})
				})
				console.log(this.classList)
			},
			change(msg){
				this.tag = msg
			}
		},
		components: {
			bNav,
			side,
			ct
        }
	}
</script>

<style>
	.index{
		width: 100%;
		height: 100%;
	}
	input{
		border: black 1px solid;
	}
	movable-area{
		width: 100px;
		height: 100px;
		background-color: aquamarine;
	}
	movable-view{
		width: 200px;
		height: 200px;
		background-color: black;
	}
	content{
	}
</style>
