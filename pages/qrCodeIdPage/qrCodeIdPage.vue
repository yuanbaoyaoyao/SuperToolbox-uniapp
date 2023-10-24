<template>
	<view class="qr-code-id">
		<view class="qr-code-id-container" v-if="result!=null" @tap="handleCopy">
			<view class="qr-code-id-info">二维码类型：{{scanType}}</view>
			<view class="qr-code-id-info">二维码内容：{{result}}</view>
		</view>
		<button @tap="handleScanQr">点击扫描二维码</button>
		<view class="tips" v-if="result!=null">提示:点击上方信息可以复制二维码内容</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scanType: null,
				result: null,
			}
		},
		methods: {
			handleCopy() {
				let that = this;
				uni.setClipboardData({
					data: that.result, //当前点击的地址
					success: () => {
						//获取刚复制好的地址到剪切板，
						uni.getClipboardData({
							success: () => {
								uni.showToast({
									title: '已复制二维码内容',
									icon: 'success'
								});
							}
						});
					}
				});
			},
			handleScanQr() {
				this.scanType = null
				this.result = null
				let that = this
				uni.scanCode({
					success: function(res) {
						that.scanType = res.scanType
						that.result = res.result
					},
				});
			}
		}
	}
</script>

<style lang="scss">
	.qr-code-id {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;

		&-container {
			width: 90vw;
			margin-bottom: 50upx;
			display: flex;
			flex-direction: column;
			word-wrap: break-word;
		}
	}

	.tips {
		width: 80%;
		color: #cccccc;
	}
</style>