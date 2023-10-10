<template>
	<view class="altitude-info">
		<view class="altitude-info-item">当前经度：{{longitude}}</view>
		<view class="altitude-info-item">当前纬度：{{latitude}}</view>
		<!-- <view>当前高度：{{altitude}}</view> -->
		<!-- <view>当前速度：{{speed}}</view> -->
	</view>
	<!-- 观看一次视频获取高精度地理信息 -->
	<!-- 借助腾讯地图能力 -->
</template>

<script>
	export default {
		data() {
			return {
				latitude: undefined,
				longitude: undefined,
				speed: undefined,
				altitude: undefined
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			let that = this
			uni.startLocationUpdate({
				success: res => {
					uni.onLocationChange(function(res2) {
						console.log("resss22222222:", res2)
						console.log('纬度：' + res2.latitude);
						console.log('经度：' + res2.longitude);
						that.latitude = res2.latitude
						that.longitude = res2.longitude
						that.altitude = res2.altitude
						that.speed = res2.speed
					});
				},
				fail: err => console.error('开启小程序接收位置消息失败：', err),
				complete: msg => console.log('调用开启小程序接收位置消息 API 完成')
			});
		},
		onHide: function() {
			console.log('App Hide')
			uni.stopLocationUpdate();
		},
	}
</script>

<style>
	.altitude-info {
		width: 100%;
		height: 100%;
		margin-left: 35%;
	}

	.altitude-info-item {
		padding: 20rpx
	}
</style>