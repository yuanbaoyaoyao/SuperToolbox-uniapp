<template>
	<view class="return-button" @tap="handleReturn">
		<image src="../../static/return.svg"></image>
		<text>返回</text>
	</view>
	<view v-if="!isShowBarrage" class="barrage-container">
		<defaultInput ref="defaultInput" :placeholder="'请输入弹幕'" @changeInput="handleChangeTextValue" />
		<view class="barrage-buttons">
			<button @tap="handleShowPopup">设置</button>
			<button type="primary" @tap="handleShowBarrage">确定</button>
		</view>
		<view class="barrage-tips">tips:进入弹幕界面后长按可退出</view>
	</view>
	<view class="barrage-box" v-else @longpress="handleQuiteBarrage" :style="{backgroundColor:bgColor,
	animationName:nowBoxAnimationName}">
		<view class="text" :style="{fontSize:nowFontSize+'rpx',color:fontColor,
		animationDuration:nowAnimationDuration,animationName:nowAnimationName,}">
			{{barrage}}
		</view>
	</view>
	<t-color-picker ref="colorPicker" :color="color" @confirm="confirm"></t-color-picker>
	<view v-if="isShowPopup">
		<view class="barrage-popup-bg" @tap="handleClosePopup"></view>
		<view class="barrage-popup">
			<view class="barrage-popup-container">
				<view class="barrage-popup-header" @tap="handleClosePopup">
					<view class="left"></view>
					<view class="center">弹幕设置</view>
					<image class="right" src="/static/moreApp/close.svg"></image>
				</view>
				<view class="barrage-popup-content">
					<view class="barrage-setting-item-container">
						<view class="barrage-setting-color" @tap="open('字体颜色')">
							<text class="barrage-setting-item-title">字体颜色</text>
							<view class="barrage-setting-color-detail" :style="{backgroundColor:fontColor}" />
						</view>
						<view class="barrage-setting-color" @tap="open('背景颜色')">
							<text class="barrage-setting-item-title">背景颜色</text>
							<view class="barrage-setting-color-detail" :style="{backgroundColor:bgColor}" />
						</view>
					</view>
					<view class="barrage-setting-item-container">
						<view class="barrage-setting-item-title">效果</view>
						<view class="barrage-setting-items">
							<view class="barrage-setting-item" v-for="(item,index) in effects"
								@tap="handleSetEffect(item)" :key="index"
								:style="{ border: nowEffect == item ? '1rpx solid black' : '' }">
								{{item}}
							</view>
						</view>
					</view>
					<view class="barrage-setting-item-container">
						<view class="barrage-setting-item-title">速度</view>
						<view class="barrage-setting-items">
							<view class="barrage-setting-item" v-for="(item,index) in speeds"
								@tap="handleSetSpeed(item)" :key="index"
								:style="{ border: nowSpeed == item ? '1rpx solid black' : '' }">
								{{item}}
							</view>
						</view>
					</view>
					<view class="barrage-setting-item-container">
						<view class="barrage-setting-item-title">字号</view>
						<view class="barrage-setting-item-slider">
							<slider :value="nowFontSize" @change="sliderChange" min="200" max="700" show-value />
						</view>
					</view>
				</view>
				<view class="barrage-popup-button">
					<button @tap="handleClosePopup" type="default">关闭</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				effects: ['抖动', '正常', ],
				speeds: ['静止', '0.5倍', '正常', '1.5倍', '2倍'],
				nowFontSize: 400,
				fontColor: '#ffe8cd',
				bgColor: '#000',
				nowEffect: '抖动',
				nowSpeed: '正常',
				nowAnimationDuration: '5s',
				nowAnimationName: 'aniMove',
				nowBoxAnimationName: 'aniShake',
				nowActiveItem: '',

				isShowBarrage: false,
				barrage: null,
				showClearIcon: false,
				inputClearValue: '',
				isShowPopup: false,
				color: {
					r: 0,
					g: 0,
					b: 0,
					a: 1
				},
				rgba: {
					r: 100,
					g: 187,
					b: 227,
					a: 1
				}
			}
		},
		methods: {
			rgbaToHex(r, g, b, a) {
				const red = r.toString(16).padStart(2, '0');
				const green = g.toString(16).padStart(2, '0');
				const blue = b.toString(16).padStart(2, '0');
				const alpha = Math.round(a * 255).toString(16).padStart(2, '0').slice(2);
				return `#${alpha}${red}${green}${blue}`;
			},
			handleSetEffect(item) {
				this.nowEffect = item
				this.nowBoxAnimationName = 'aniShake'
				if (this.nowEffect == '正常') {
					this.nowBoxAnimationName = ''
				}
			},
			handleSetSpeed(item) {
				this.nowSpeed = item
				this.nowAnimationName = 'aniMove'
				switch (this.nowSpeed) {
					case '静止':
						this.nowAnimationName = ''
						break;
					case '0.5倍':
						this.nowAnimationDuration = '10s'
						break;
					case '正常':
						this.nowAnimationDuration = '5s'
						break;
					case '1.5倍':
						this.nowAnimationDuration = '3.3s'
						break;
					case '2倍':
						this.nowAnimationDuration = '2.5s'
						break;
				}
			},
			sliderChange(e) {
				this.nowFontSize = e.detail.value
			},
			handleShowPopup() {
				this.isShowPopup = true
			},
			handleClosePopup() {
				this.isShowPopup = false
			},
			open(item) {
				this.nowActiveItem = item
				this.$refs.colorPicker.open();
			},
			confirm(e) {
				this.rgba = e.rgba;
				if (this.nowActiveItem == '字体颜色') {
					this.fontColor = this.rgbaToHex(this.rgba.r, this.rgba.g, this.rgba.b, this.rgba.a)
				} else if (this.nowActiveItem == '背景颜色') {
					this.bgColor = this.rgbaToHex(this.rgba.r, this.rgba.g, this.rgba.b, this.rgba.a)
				}
			},
			handleChangeTextValue(e) {
				this.barrage = e
			},
			handleShowBarrage() {
				this.isShowBarrage = true
			},
			handleQuiteBarrage() {
				this.isShowBarrage = false
				this.$nextTick(() => {
					this.$refs.defaultInput.setInputValueFirst(this.barrage)
				})
			},
			handleReturn() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.return-button {
		position: fixed;
		left: 30upx;
		top: 90upx;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			height: 60upx;
			width: 60upx;
		}

	}

	.barrage-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.barrage-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #c8c8c8;
		height: 80upx;
		padding: 20upx;
		padding-left: 40upx;
		padding-right: 40upx;
		border-radius: 20upx;
		margin-bottom: 20upx;
		width: 80%;

		image {
			width: 50upx;
			height: 50upx;
		}
	}

	.barrage-buttons {
		display: flex;
		justify-content: space-around;
		width: 80%;
		margin-bottom: 30upx;
	}

	.barrage-tips {
		color: #959595;
	}

	.barrage-box {
		width: 100vh;
		height: 100vw;
		transform-origin: 50vw 50vw;
		transform: rotate(90deg);
		white-space: nowrap;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		animation-duration: 0.5s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	.text {
		width: 100%;
		text-align: center;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-fill-mode: forwards;
	}

	@keyframes aniMove {
		0% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(-100%);
		}
	}

	@keyframes aniShake {

		0%,
		33% {
			text-shadow: 3px -3px 0px #FE008E, -5px 5px 0px #00FFFF;
		}

		34%,
		66% {
			text-shadow: 5px -5px 0px #FE008E, -3px 3px 0px #00FFFF;
		}

		67%,
		100% {
			text-shadow: 3px -3px 0px #00FFFF, -5px 5px 0px #FE008E;
		}
	}

	.barrage-popup-bg {
		background-color: #bfc5cc;
		width: 100vw;
		height: 100vh;
		opacity: 0.5;
		position: fixed;
		top: 0;
		animation: half-opacity 0.5s ease-in-out;
	}

	.barrage-popup {
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		top: 20%;
		animation: opacity 0.5s ease-in-out;
		z-index: 10;
		width: 100%;

		&-container {
			width: 85%;
			background-color: white;
			padding: 40upx;
			border-radius: 20upx;
		}

		&-button {
			margin-top: 20upx;
		}

		&-header {
			align-items: center;
			display: grid;
			grid-template-columns: 1fr 10fr 1fr;
			margin-bottom: 20upx;

			.center {
				text-align: center;
			}
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

	.barrage-setting-item-container {
		margin-top: 50upx;
		margin-bottom: 50upx;
		display: flex;
		flex-direction: column;
	}

	.barrage-setting-item-container:first-child {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.barrage-setting-items {
		display: flex;
		overflow: auto;
		white-space: nowrap;
		margin-top: 5upx;
		margin-bottom: 5upx;
	}

	.barrage-setting-item-title {
		font-size: 35upx;
		color: #545659;
		margin-bottom: 10upx;
	}

	.barrage-setting-item {
		margin-right: 30upx;
		border-radius: 10upx;
		padding: 10upx
	}

	.barrage-setting-color {
		display: flex;
		justify-content: space-between;

		&-detail {
			width: 50rpx;
			height: 50rpx;
			margin-right: 20rpx;
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