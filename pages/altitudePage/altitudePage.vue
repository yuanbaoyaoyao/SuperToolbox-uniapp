<template>
	<view class="altitude-info">
		<view class="altitude-info-item">当前经度：{{longitude}}</view>
		<view class="altitude-info-item">当前纬度：{{latitude}}</view>
		<view class="altitude-info-item" v-if="platform=='ios'">当前高度：{{altitude}}</view>
		<!-- <view>当前速度：{{speed}}</view> -->
	</view>
	<button @tap="handleGetAccurateInfo">观看激励视频广告获取高精度地理信息</button>
	<view class="altitude-info">
		<view class="altitude-info-item">当前位置：{{accuratePosition}}</view>
	</view>
	<!-- 观看激励视频广告获取高精度地理信息 -->
	<!-- 借助腾讯地图能力 -->
</template>

<script>
	//好像必须这样写，import才能把sdk给引入
	import * as QQMapWXSDK from "@/common/utils/qqmap-wx-jssdk.js"
	var QQMapWX = require('../../common/utils/qqmap-wx-jssdk.js');

	import store from "@/store/index.js"
	export default {
		data() {
			return {
				latitude: undefined,
				longitude: undefined,
				speed: undefined,
				altitude: undefined,
				platform: '',
				isWatachedAD: false,
				accuratePosition: ''
			}
		},
		onReady() {
			this.platform = store.state.platform
		},
		onShow: function() {
			let that = this
			uni.startLocationUpdate({
				success: res => {
					uni.onLocationChange(function(res2) {
						that.latitude = (res2.latitude).toFixed(2)
						that.longitude = (res2.longitude).toFixed(2)
						that.altitude = (res2.altitude).toFixed(2)
						that.speed = (res2.speed).toFixed(2)
					});
				},
				fail: err => console.error('开启小程序接收位置消息失败：', err),
				complete: msg => console.log('调用开启小程序接收位置消息 API 完成')
			});
		},
		onHide: function() {
			uni.stopLocationUpdate();
		},
		methods: {
			async handleGetAccurateInfo() {
				const location = await this.getLocationInfo();
				this.accuratePosition = location.address
			},
			//获取位置信息
			async getLocationInfo() {
				return new Promise((resolve) => {
					//位置信息默认数据
					let location = {
						longitude: 0,
						latitude: 0,
						province: "",
						city: "",
						area: "",
						street: "",
						address: "",
					};
					uni.getLocation({
						type: "gcj02",
						success(res) {
							location.longitude = res.longitude;
							location.latitude = res.latitude;
							// 腾讯地图Api
							const qqmapsdk = new QQMapWX({
								key: '4QRBZ-ZCL6I-UKAG4-UNBE3-6YDKT-GTFBU' //这里填写自己申请的key
							});
							qqmapsdk.reverseGeocoder({
								location,
								success(response) {
									let info = response.result;
									console.log(info);
									location.province = info.address_component.province;
									location.city = info.address_component.city;
									location.area = info.address_component.district;
									location.street = info.address_component.street;
									location.address = info.address;
									resolve(location);
								},
								fail: function(error) {
									console.error(error, '解析fail');
								},
								complete: function(res) {
									console.log(res, 'complete');
								}
							});
						},
						fail(err) {
							console.log(err)
							resolve(location);
						},
					});
				});
			}
		}
	}
</script>

<style>
	.altitude-info {
		width: 100%;
		height: 100%;
		margin-left: 20%;
	}

	.altitude-info-item {
		padding: 20rpx
	}
</style>