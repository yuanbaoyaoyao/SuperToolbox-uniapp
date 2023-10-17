<template>
	<view class="qr-code-id">
		<view v-if="result!=null">
			<view class="qr-code-id-info">条码类型：{{scanType}}</view>
			<view class="qr-code-id-info">条码内容：{{result}}</view>
		</view>
		<view>
			<view class="qr-code-id-info"></view>
		</view>
		<button size="mini" @tap="handleScanQr">点击扫描二维码</button>
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
			handleScanQr() {
				this.scanType = null
				this.result = null
				let that = this
				uni.scanCode({
					success: function(res) {
						// console.log('条码类型：' + res.scanType);
						// console.log('条码内容：' + res.result);
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

		&-info {
			margin: 20upx;
			width: fit-content;
		}
	}
</style>