<template>
	<view class="gyroscope-value">
		<text>水平角度:{{alpha}}°</text>
		<text>垂直角度:{{beta}}°</text>
	</view>
	<view class="gyroscope">
		<view class="region" :style="'background:' + regionBG"></view>
		<view class="core" :style="'background:' + backgroundColor + ';top:' + top + 'rpx;left:' + left + 'rpx;'">
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				top: 180,
				left: 180,
				backgroundColor: '#000000',
				regionBG: "#e72323",
				isOnAccelerometerChange: true,
				x: 0,
				y: 0,
				z: 0,
				alpha: 0,
				beta: 0
			};
		},
		onReady() {
			if (store.getters.platform != 'android' && store.getters.platform != 'ios') {
				uni.showModal({
					title: '提示',
					content: '此功能需要在手机端才能正常使用。',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},
		// 使用示例
		onLoad(options) {
			let that = this;
			uni.startGyroscope({
				interval: "normal",
				success() {
					uni.onAccelerometerChange(function(res) {
						if (!that.isOnAccelerometerChange) {
							return;
						}
						let x = (res.x * 180).toFixed(2);
						let y = -(res.y * 180).toFixed(2);
						let z = (res.z * 180).toFixed(2);
						let top = 180 + Number(y);
						let left = 180 + Number(x);
						let xg = x / 9.8;
						let yg = y / 9.8;
						let zg = z / 9.8;

						that.alpha = (180 - Math.abs(Math.atan2(yg, zg) * 180 / Math.PI)).toFixed(2);
						that.beta = (Math.abs(Math.atan2(xg, Math.sqrt(yg * yg + zg * zg)) * 180 /
							Math.PI)).toFixed(2);
						that.top = top;
						that.left = left;
						that.x = x;
						that.y = y;
						that.z = z;
						if (top > 180 && top < 190 && left > 180 && left < 190) {
							that.regionBG = "#82ec82";
						} else {
							that.regionBG = "#e72323";
						}
					});
				},
			});
		},
		onUnload() {
			this.isOnAccelerometerChange = false;
			uni.stopAccelerometer();
			uni.stopGyroscope();
		},
	};
</script>

<style lang="scss">
	.gyroscope-value {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		margin-top: 20%;

		text {
			font-size: x-large;
			width: fit-content;
		}
	}

	.gyroscope {
		width: 400rpx;
		height: 400rpx;
		border-radius: 200rpx;
		border: 1rpx solid #000000;
		position: absolute;
		top: 30%;
		left: 20%;
		background: #d1cfcf;
	}

	.region {
		width: 50rpx;
		height: 50rpx;
		border-radius: 26rpx;
		border: 1rpx solid #000000;
		position: absolute;
		left: 170rpx;
		top: 170rpx;
	}

	.core {
		width: 30rpx;
		height: 30rpx;
		border-radius: 15rpx;
		position: absolute;
	}
</style>