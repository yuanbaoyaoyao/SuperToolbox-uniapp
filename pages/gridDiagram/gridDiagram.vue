<template>
	<view class="grid-diagram-container">
		<canvas canvas-id="mycnavas" id="mycnavas" @click="cancas"
			:style="{width:imageWidth+'px',height:imageHeight+'px',top:(isShowPhoto&&!isSection?'0':'-900px'),position:(isShowPhoto&&!isSection?'':'fixed')}"></canvas>
		<view class="newcanvas" v-show="isSection">
			<canvas v-for="(item,index) in 9" :key="index" :canvas-id="'img'+index"
				:style="{width:itemWidth+'px',height:itemHeight+'px'}"></canvas>
		</view>
		<view class="grid-diagram-actions"
			:style="{alignItems: (!isShowPhoto&&!isSection  ? 'center':'' ),height:(!isShowPhoto&&!isSection  ? '100vh':'')}">
			<button @click="getPhoto">获取源图片</button>
			<button @click="newphoto" v-if="isShowPhoto&&!isSection" type="primary">开始切图</button>
			<button @click="saveCanvas" v-if="isSection" type="primary">下载图片</button>
		</view>
	</view>

</template>

<script>
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				isShowPhoto: false,
				isSection: false,
				imageWidth: 0,
				imageHeight: 0,
				itemWidth: 0,
				itemHeight: 0,
			}
		},
		methods: {
			getPhoto() {
				let tempList = []
				let that = this
				that.isShowPhoto = false
				that.isSection = false
				uni.chooseImage({
					sourceType: ['album', 'camera'],
					count: 1,
					success: function(res) {
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								let screenWidth = store.getters.screenWidth
								let screenHeight = store.getters.screenHeight
								that.imageWidth = image.width
								that.imageHeight = image.height

								if (that.imageWidth > screenWidth) {
									const ratio = screenWidth / that.imageWidth;
									that.imageWidth = screenWidth;
									that.imageHeight *= ratio;
								}

								if (that.imageHeight > screenHeight) {
									const ratio = screenHeight / that.imageHeight;
									that.imageHeight = screenHeight;
									that.imageWidth *= ratio;
								}
								//不可出现小数点
								that.imageHeight = Number(that.imageHeight.toFixed(0))
								that.imageWidth = Number(that.imageWidth.toFixed(0))
								that.itemWidth = Number((that.imageWidth / 3).toFixed(0))
								that.itemHeight = Number((that.imageHeight / 3).toFixed(0))
								that.isShowPhoto = true
								setTimeout(() => {
									const ctx = uni.createCanvasContext('mycnavas')
									ctx.drawImage(res.tempFilePaths[0], 0, 0, that
										.imageWidth, that.imageHeight)
									ctx.draw()
								}, 300)
							}
						});
					},
					fail: (err) => {}
				})
			},
			//有可能不用async/await，可能是因为我使用了v-if，导致找不到canvas
			async newphoto() {
				const ctx = uni.createCanvasContext('mycnavas');
				this.isSection = true
				let promises = [];
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 3; j++) {
						let q = i * 3 + j;
						promises.push(this.getImageData(ctx, j, i, q));
					}
				}
				await Promise.all(promises);
			},
			async getImageData(ctx, x, y, q) {
				let that = this;
				return new Promise((resolve, reject) => {
					uni.canvasGetImageData({
						canvasId: 'mycnavas',
						x: x * that.itemWidth,
						y: y * that.itemHeight,
						width: that.itemWidth,
						height: that.itemHeight,
						success: async (res) => {
							await this.putImageData(ctx, res.data, q);
							await this.canvasToTempFilePath(ctx, q);
							resolve();
						},
						fail(res) {
							console.log("fail:", res)
						}
					});
				});
			},
			async putImageData(ctx, data, q) {
				let that = this;
				return new Promise((resolve, reject) => {
					uni.canvasPutImageData({
						data: data,
						canvasId: 'img' + q,
						x: 0,
						y: 0,
						width: that.itemWidth,
						height: that.itemHeight,
						success: () => {
							resolve();
						}
					});
				});
			},
			async canvasToTempFilePath(ctx, q) {
				let that = this;
				return new Promise((resolve, reject) => {
					uni.canvasToTempFilePath({
						canvasId: 'img' + q,
						destWidth: that.itemWidth,
						destHeight: that.itemHeight,
						success: (res) => {
							resolve();
						}
					});
				});
			},
			//保存
			async saveCanvas() {
				for (let i = 0; i < 9; i++) {
					let canvasId = 'img' + i
					const tempFilePath = await this.canvasToFilPath(canvasId)
					await new Promise((resolve, reject) => {
						// #ifdef H5
						try {
							const a = document.createElement('a')
							a.href = tempFilePath
							a.download = this.fileName
							document.body.appendChild(a)
							a.click()
							a.remove()
							resolve()
						} catch (e) {
							reject(e)
						}
						// #endif
						// #ifndef H5
						uni.saveImageToPhotosAlbum({
							filePath: tempFilePath,
							success(resObj) {
								if (i == 8) {
									uni.showToast({
										title: "成功保存切图到相册",
										icon: 'success',
										success: function(res) {},
										fail: function(res) {},
									})
								}
								resolve(resObj)
							},
							fail(err) {
								reject(err)
							}
						})
						// #endif
					})
				}
			},
			// 保存临时路径
			async canvasToFilPath(canvasId) {
				return new Promise((resolve, reject) => {
					uni.canvasToTempFilePath({
						canvasId: canvasId,
						success: res => {
							resolve(res.tempFilePath)
						},
						fail: err => {
							reject(err)
						}
					}, this)
				})
			},
		},
	}
</script>

<style lang="scss">
	.newcanvas {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 10px;
	}

	.grid-diagram-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		min-width: 100vw;
	}

	.grid-diagram-actions {
		display: flex;
		justify-content: space-around;
		width: 100vw;
		margin: 20upx;
	}
</style>