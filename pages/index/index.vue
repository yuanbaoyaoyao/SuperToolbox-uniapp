<template>
	<view class="content">
		<view class="content-details">
			<view v-for="(item,index) in routers" :key="index" class="content-detail" @click="handleClickRouter(index)">
				<image :src="item.icon" />
				<text>
					{{item.name}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	//TODO pdf功能处理，需要后端功能
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
						name: "量角器",
						icon: "/static/index/protractor.svg"
					},
					{
						url: "/pages/compassPage/compassPage",
						name: "指南针",
						icon: "/static/index/compass.svg"
					},
					{
						url: "/pages/gradienterPage/gradienterPage",
						name: "水平仪",
						icon: "/static/index/gradienter.svg"
					},

					// {
					// 	url: "/pages/decibelMeterPage/decibelMeterPage",
					// 	name: "分贝仪"
					// },
					{
						url: "/pages/altitudePage/altitudePage",
						// name: "经纬度/位置",
						name: "经纬度",
						icon: "/static/index/position.svg"
					},
					{
						url: "/pages/drawingBoardPage/drawingBoardPage",
						name: "画板",
						icon: "/static/index/drawingBoard.svg"
					},
					{
						url: "/pages/qrCodeGenPage/qrCodeGenPage",
						name: "二维码生成器",
						icon: "/static/index/qrCodeGen.svg"
					},
					{
						url: "/pages/qrCodeIdPage/qrCodeIdPage",
						name: "二维码扫描器",
						icon: "/static/index/qrCodeId.svg"
					},
					{
						url: "/pages/amountCapitalPage/amountCapitalPage",
						name: "金额转大写",
						icon: "/static/index/amountCapital.svg"
					},
					{
						url: "/pages/handheldBarragePage/handheldBarragePage",
						name: "手持弹幕",
						icon: "/static/index/handheldBarrage.svg"
					},
					{
						url: "/pages/randomShakerPage/randomShakerPage",
						name: "随机摇号器",
						icon: "/static/index/randomShaker.svg"
					},
					{
						url: "/pages/gridDiagram/gridDiagram",
						name: "九宫格切图",
						icon: "/static/index/gridDiagram.svg"
					},
					{
						url: "/pages/fullScreenClockPage/fullScreenClockPage",
						name: "全屏时钟",
						icon: "/static/index/fullScreenClock.svg"
					},
					{
						url: "/pages/wonderfulFonts/wonderfulFonts",
						name: "奇妙字体",
						icon: "/static/index/wonderfulFonts.svg"
					},
					{
						url: "/pages/pdfWatermark/pdfWatermark",
						name: "pdf添加水印",
						icon: "/static/index/pdfWatermark.svg"
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
					store.commit('setScreenWidth', res.screenWidth)
					store.commit('setScreenHeight', res.screenHeight)
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

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 10rpx;
	}

	.content-details {
		display: grid;
		/* grid-template-columns: 1fr 1fr; */
		grid-template-columns: 1fr 1fr;
		width: 100%;
		justify-items: center;
	}

	.content-detail {
		padding: 30rpx;
		border-radius: 10rpx;
		margin: 10rpx;
		width: 80%;
		height: 60upx;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
		display: grid;
		grid-template-columns: 1fr 2fr;
		justify-items: center;
		align-items: center;

		image {
			width: 50upx;
			height: 50upx;
		}

		text {
			justify-self: start;
			font-size: small;
		}
	}
</style>