<template>
	<view>
		<view class="operation">
			<input focus placeholder="请输入信息" v-model="info" @input="inputInfo" />
			<view class="operation-buttons">
				<button @tap="handleClear">清空</button>
				<button type="primary" @tap="handleShowQRCode">确认</button>
			</view>
		</view>
		<view class="qr-box" v-if="info!=null">
			<canvas canvas-id="qrcode" v-show="qrShow" />
			<button v-show="qrShow" @click="saveCanvas">保存二维码</button>
		</view>
	</view>

</template>

<script>
	import uQRCode from './uqrcode.js'
	export default {
		props: [],
		data() {
			return {
				qrShow: false,
				info: null,
				isDownload: true
			}
		},
		methods: {
			inputInfo(e) {
				this.info = String(e.detail.value)
				if (e.detail.value.length == 0) {
					this.qrShow = false
				}
			},
			handleClear() {
				this.info = null
				this.qrShow = false
			},
			handleShowQRCode() {
				if (this.info != null) {
					this.qrFun(this.info)
				} else {
					uni.showToast({
						title: "请输入信息",
						icon: 'error',
						success: function(res) {},
						fail: function(res) {},
					})
				}
			},
			qrFun: function(text) {
				this.qrShow = true
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: text,
					size: 150,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {}
				})
			},
			//保存
			async saveCanvas() {
				const tempFilePath = await this.canvasToFilPath()
				return new Promise((resolve, reject) => {
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
							resolve(resObj)
						},
						fail(err) {
							reject(err)
						}
					})
					// #endif
				})
			},
			// 保存临时路径
			canvasToFilPath(conf = {}) {
				return new Promise((resolve, reject) => {
					uni.canvasToTempFilePath({
						canvasId: "qrcode",
						success: res => {
							resolve(res.tempFilePath)
						},
						fail: err => {
							reject(err)
						}
					}, this)
				})
			},

		}
	}
</script>

<style lang="scss">
	.qr-box {
		width: 400upx;
		height: 400upx;
		margin: 0 auto;

		canvas {
			width: inherit;
			height: inherit;
		}
	}

	.operation {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 120upx;
		margin-top: 60upx;

		input {
			height: 80upx;
			width: 60%;
			border-radius: 20upx;
			padding: 20upx;
			margin-bottom: 20upx;
			background-color: #d3dbe2;
		}

		button {
			display: flex;
			height: 80upx;
			font-size: 35upx;
			align-items: center;
		}

		&-buttons {
			display: flex;
			justify-content: space-evenly;
			width: 100%;
		}
	}
</style>