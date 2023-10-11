<template>
	<view class="content">
		<view class="content-details">
			<view v-for="(item,index) in routers" :key="index" class="content-detail" @click="handleClickRouter(index)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				routers: [
					// {
					// 	url: "/pages/rulerPage/rulerPage",
					// 	name: "尺子"
					// },
					{
						url: "/pages/protractorPage/protractorPage",
						name: "量角器"
					},
					{
						url: "/pages/compassPage/compassPage",
						name: "指南针"
					},
					{
						url: "/pages/gradienterPage/gradienterPage",
						name: "水平仪"
					},

					// {
					// 	url: "/pages/decibelMeterPage/decibelMeterPage",
					// 	name: "分贝仪"
					// },
					{
						url: "/pages/altitudePage/altitudePage",
						name: "经纬度/位置"
					},
					{
						url: "/pages/drawingBoardPage/drawingBoardPage",
						name: "画板"
					},
				]
			}
		},
		onLoad() {

		},
		onReady() {
			uni.getSystemInfo({
				success: function(res) {
					const platform = res.platform.toLowerCase()
					store.commit('setPlatform', platform)
				},
				fail: function(error) {
					console.log("error:", error)
				}
			})
		},
		methods: {
			handleClickRouter(index) {
				uni.navigateTo({
					url: this.routers[index].url,
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 10rpx;
	}

	.content-details {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		justify-items: center;
	}

	.content-detail {
		padding: 30rpx;
		background-color: aquamarine;
		text-align: center;
		border-radius: 10rpx;
		margin: 10rpx;
		width: 70%;
	}
</style>