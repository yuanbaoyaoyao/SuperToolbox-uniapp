<!-- TODO 二维码关注公众号,增加公众号头像 -->
<template>
	<view class="more-app">
		<view class="more-app-header">
			<text>魁地奇探索队</text>
			<button size="mini" @tap="handleShowPopup">
				点击关注
			</button>
		</view>
		<view class="more-app-divider">
			<view class="more-app-divider-line"></view>
		</view>
		<view class="more-app-content">
			<view class="more-app-item" v-for="(item,index) in appList" key="index" @tap="handleToMiniProgram(item)">
				<image :src=item.appIcon></image>
				<view class="more-app-item-info">
					<text class="more-app-item-info-name">{{item.appName}}</text>
					<text class="more-app-item-info-desc">{{item.appDesc}}</text>
				</view>
			</view>
		</view>
	</view>
	<view v-if="isShowPopup">
		<view class="more-app-popup-bg" @tap="handleClosePopup"></view>
		<view class="more-app-popup">
			<view class="more-app-popup-container">
				<view class="more-app-popup-header" @tap="handleClosePopup">
					<image src="/static/moreApp/close.svg"></image>
				</view>
				<view class="more-app-popup-content">
					<text>在稍后弹出的客服界面中输入"关注",即可获取公众号链接地址~</text>
				</view>
				<view class="more-app-popup-button">
					<button type="primary" open-type="contact" bindcontact="handleContact"
						session-from="sessionFrom">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appList: [{
					appIcon: "/static/moreApp/holiday_balance.png",
					appName: "我的假日",
					appDesc: '下一个假日，假期余额。为大家提供简洁美观的使用体验。'
				}],
				isShowPopup: false
			}
		},
		methods: {
			handleShowPopup() {
				this.isShowPopup = true
			},
			handleClosePopup() {
				this.isShowPopup = false
			},
			handleToMiniProgram(miniInfo) {
				uni.navigateToMiniProgram({
					appId: 'wx627c724a69f59702',
					path: 'pages/legalHolidays/legalHolidays', // 不填默认首页
					extraData: {},
					success(res) {}
				})
			}
		}
	}
</script>

<style lang="scss">
	.more-app-header {
		display: flex;
		flex-direction: column;
		align-items: center;

		text {
			font-size: large;
			margin: 30upx;
		}
	}

	.more-app-divider {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 20upx;
		margin-bottom: 10upx;

		&-line {
			background-color: #bfc5cc;
			width: calc(100vw - 40upx);
			height: 2upx;
		}
	}

	.more-app-item {
		display: grid;
		grid-template-columns: 1fr 4fr;
		align-items: center;
		margin: 20upx;


		&-info {
			display: flex;
			flex-direction: column;

			&-desc {
				font-size: 25upx;
				color: gray;
			}
		}

		image {
			width: 120upx;
			height: 120upx;
		}
	}

	.more-app-popup-bg {
		background-color: #bfc5cc;
		width: 100vw;
		height: 100vh;
		opacity: 0.5;
		position: fixed;
		top: 0;
		animation: half-opacity 0.5s ease-in-out;
	}

	.more-app-popup {
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		top: 30%;
		animation: opacity 0.5s ease-in-out;
		z-index: 10000;

		&-container {
			width: 80%;
			background-color: white;
			padding: 40upx;
			border-radius: 20upx;
		}

		&-button {
			margin-top: 20upx;
		}

		&-header {
			display: flex;
			justify-content: flex-end;
			margin-bottom: 20upx;
		}

		button {
			height: 90upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		image {
			width: 40upx;
			height: 40upx;
		}
	}

	@keyframes half-opacity {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 0.5;
		}
	}

	@keyframes opacity {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
</style>