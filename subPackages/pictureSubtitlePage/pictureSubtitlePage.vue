<template>
<!-- 	<canvas canvas-id="mycnavas" id="mycnavas" @click="cancas"
		:style="{width:imageWidth+'px',height:outCanvasHeight+'px',top:(isShowPhoto&&!isSection?'0':'-9000px'),position:(isShowPhoto&&!isSection?'':'fixed')}" />
	<view class="picuter-subtitle-container">
		<view class="picuter-subtitle-actions">
			<view class="picuter-subtitle-slider">
				<view>字幕高度</view>
				<slider :value="xValue" @change="sliderChangeXValue" min="0" max="500" show-value />
			</view>
			<button @click="getPhoto">获取源图片</button>
			<button @click="savePhoto" type="primary" v-if="isShowPhoto">保存图片</button>
		</view>
	</view> -->
</template>

// <script>
// 	import store from '@/store/index.js'
// 	export default {
// 		data() {
// 			return {
// 				isShowPhoto: false,
// 				isSection: false,
// 				imageWidth: 0,
// 				imageHeight: 0,
// 				itemWidth: 0,
// 				itemHeight: 0,
// 				imageArr: [],
// 				offsetY: 60,
// 				xValue: 10,
// 				outCanvasHeight: 0
// 			}
// 		},
// 		methods: {
// 			savePhoto() {

// 			},
// 			getPhoto() {
// 				let tempList = []
// 				let that = this
// 				that.isShowPhoto = false
// 				that.isSection = false
// 				that.outCanvasHeight = 0
// 				uni.chooseImage({
// 					sourceType: ['album', 'camera'],
// 					success: function(res) {
// 						const ctx = uni.createCanvasContext('mycnavas')
// 						ctx.draw(false)
// 						ctx.draw(true)
// 						let py = 0
// 						for (let i = 0; i < res.tempFilePaths.length; i++) {
// 							uni.getImageInfo({
// 								src: res.tempFilePaths[res.tempFilePaths.length - i - 1],
// 								success: function(image) {
// 									tempList.push({
// 										src: res.tempFilePaths[res.tempFilePaths.length -
// 											i - 1],
// 										width: image.width,
// 										height: image.height
// 									})
// 									if (i === res.tempFilePaths.length - 1) {
// 										that.isShowPhoto = true
// 										tempList.forEach(function(img, index) {
// 											setTimeout(() => {
// 												let screenWidth = store.getters
// 													.screenWidth
// 												let screenHeight = store.getters
// 													.screenHeight
// 												that.imageWidth = img.width
// 												that.imageHeight = img.height

// 												if (that.imageWidth >
// 													screenWidth) {
// 													const ratio = screenWidth /
// 														that
// 														.imageWidth;
// 													that.imageWidth = screenWidth;
// 													that.imageHeight *= ratio;
// 												}

// 												if (that.imageHeight >
// 													screenHeight) {
// 													const ratio = screenHeight /
// 														that
// 														.imageHeight;
// 													that.imageHeight =
// 														screenHeight;
// 													that.imageWidth *= ratio;
// 												}

// 												// //不可出现小数点
// 												that.imageHeight = Number(that
// 													.imageHeight
// 													.toFixed(0))
// 												that.imageWidth = Number(that
// 													.imageWidth
// 													.toFixed(0))
// 												let y = that.outCanvasHeight
// 												ctx.drawImage(tempList[tempList
// 														.length -
// 														index - 1].src, 0,
// 													y, that
// 													.imageWidth,
// 													that.imageHeight)

// 												if (index === 0) {
// 													that.outCanvasHeight += that
// 														.imageHeight
// 												} else {
// 													that.outCanvasHeight += that
// 														.offsetY
// 												}
// 												if (index == tempList.length - 1) {
// 													setTimeout(() => {
// 														ctx.draw()
// 													}, 200)
// 												}
// 											}, index * 200)
// 										})
// 									}
// 								}
// 							});
// 						}
// 					},
// 					fail: (err) => {
// 						console.log("err:", err)
// 					}
// 				})
// 			},
// 		}
// 	}
// </script>

// <style lang="scss">
// 	.picuter-subtitle-container {
// 		width: 100vw;
// 		height: 100vh;
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: center;
// 		align-items: center;
// 	}

// 	.picuter-subtitle-actions {
// 		width: 100%;
// 		display: flex;
// 		flex-direction: column;
// 		padding: 20upx;
// 	}

// 	.picuter-subtitle-slider {
// 		display: grid;
// 		grid-template-columns: 1.5fr 6fr;
// 		align-items: center;
// 		font-size: small;
// 		margin-bottom: 20upx;
// 	}
// </style>