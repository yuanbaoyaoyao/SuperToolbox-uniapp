<template>
	<view v-if="!isShowBarrage" class="barrage-container">
		<view class="barrage-input">
			<input placeholder="请输入弹幕" :value="inputClearValue" @input="clearInput" />
			<image v-if="showClearIcon" @click="clearIcon" src="../../static/amountCapital/delete.svg" />
		</view>
		<view class="barrage-buttons">
			<button @tap="handleReturn">返回主页</button>
			<button type="primary" @tap="handleShowBarrage">确定</button>
		</view>
		<view class="barrage-tips">tips:进入弹幕界面后长按可退出</view>
	</view>
	<view class="barrage-box" v-else @longpress="handleQuiteBarrage">
		<view class="text">{{barrage}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowBarrage: false,
				barrage: null,
				showClearIcon: false,
				inputClearValue: '',
			}
		},
		methods: {
			clearInput: function(event) {
				this.inputClearValue = event.detail.value;
				this.barrage = this.inputClearValue
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() {
				this.inputClearValue = '';
				this.showClearIcon = false;
				this.barrage = null
			},
			handleShowBarrage() {
				this.isShowBarrage = true
			},
			handleQuiteBarrage() {
				this.isShowBarrage = false
			},
			handleReturn() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
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
		background-color: #000;
		overflow: hidden;
		animation: aniShake 0.5s linear infinite;
	}

	.text {
		width: 100%;
		font-size: 400upx;
		color: #FFF;
		animation: aniMove 5s linear infinite;
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
</style>