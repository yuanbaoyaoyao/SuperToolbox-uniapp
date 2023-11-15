<template>
	<view v-if="isShowCanvas" class="canvas-container" @touchend="maskTouchend" @longpress="handleReturn"
		@tap="handleHideButton">
		<canvas v-show=" !isHideCanvasTemp" canvas-id="clock"
			:style="{width: canvasWidth + 'px', height: canvasWidth + 'px'}"></canvas>
	</view>
	<view class="content" v-else @touchend="maskTouchend" @longpress="handleReturn" @tap="handleHideButton">
		<!-- #ifdef H5 -->
		<a style="position: fixed;top: 0;right: 0;" href='https://gitee.com/jianjroh/flip-clock'><img
				src='https://gitee.com/jianjroh/flip-clock/widgets/widget_1.svg' alt='Fork me on Gitee'></img></a>
			<!-- #endif -->
		<view class="flip-container">
			<view class="flip-items" v-for="(unit,unitIndex) of timeArr" :key="unitIndex">
				<view class="item" v-for="(item,index) of unit.max + 1" :key="index"
					:class="{current: unit.current == index, past: unit.current - 1 == index || index==unit.max&&unit.current==0}">
					<view class="up">
						<view class="inner">{{index}}</view>
						<view class="shadow"></view>
					</view>
					<view class="down">
						<view class="inner">{{index}}</view>
						<view class="shadow"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<t-color-picker ref="colorPicker" :color="color" @confirm="confirm" @close="handleClosePicker"
		style="z-index: 1001;"></t-color-picker>
	<view class="background" :style="{backgroundColor:nowBackgroundColor}" @tap="handleHideButton"></view>
	<button v-show="!isHideButton" class="button" size="mini" @tap="open('背景颜色')">背景颜色</button>
</template>

<script>
	import store from '@/store/index.js'

	function getTimeStr() {
		let time = new Date();
		let hour = ('00' + time.getHours()).slice(-2)
		let minute = ('00' + time.getMinutes()).slice(-2)
		let second = ('00' + time.getSeconds()).slice(-2)
		let timeStr = hour + minute + second
		return timeStr
	}

	export default {
		data() {
			return {
				canvasWidth: store.getters.screenWidth,
				timeStr: getTimeStr(),
				timeRunner: '',
				isShowCanvas: false,
				touchNum: 0,
				nowBackgroundColor: '',
				isHideButton: true,
				isHideCanvasTemp: false,
				rgba: {
					r: 100,
					g: 187,
					b: 227,
					a: 1
				},
				color: {
					r: 0,
					g: 0,
					b: 0,
					a: 1
				},
			}
		},
		computed: {
			timeArr() {
				return [...this.timeStr].map((unit, index) => {
					let max;
					if (index & 1 == 1) { //时分秒的个位
						max = 9
					} else if (index == 0) { //时十位
						max = 2
					} else if (index == 2) { //分十位
						max = 5
					} else if (index == 4) { //秒十位
						max = 5
					}
					return {
						max,
						current: Number(unit),
					}
				})
			}
		},
		mounted() {
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			// #endif
			let nowTime = new Date().getHours()
			if (nowTime >= 17 || nowTime <= 7) {
				this.nowBackgroundColor = '#000'
			} else {
				this.nowBackgroundColor = ''
			}
			uni.showModal({
				title: '提示',
				content: '单击背景显示隐藏按钮，双击界面切换时间形态，长按界面返回主页。',
				showCancel: false,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
			this.setTimeRunner()
			uni.setKeepScreenOn({
				keepScreenOn: true
			});
		},
		beforeDestroy() {
			clearInterval(this.timeRunner)
		},
		methods: {
			handleClosePicker(e) {
				if (e) {
					this.isHideCanvasTemp = false
				}
			},
			handleHideButton() {
				this.isHideButton = !this.isHideButton
			},
			rgbaToHex(r, g, b, a) {
				const red = r.toString(16).padStart(2, '0');
				const green = g.toString(16).padStart(2, '0');
				const blue = b.toString(16).padStart(2, '0');
				const alpha = Math.round(a * 255).toString(16).padStart(2, '0').slice(2);
				return `#${alpha}${red}${green}${blue}`;
			},
			open(item) {
				this.$refs.colorPicker.open();
				this.isHideCanvasTemp = true
			},
			confirm(e) {
				this.rgba = e.rgba;
				this.nowBackgroundColor = this.rgbaToHex(this.rgba.r, this.rgba.g, this.rgba.b, this.rgba.a)
			},
			handleReturn() {
				uni.navigateBack()
			},
			handleShowClock() {
				this.isShowCanvas = !this.isShowCanvas
				if (this.isShowCanvas) {
					this.drawClock()
				} else {
					this.setTimeRunner()
				}
			},
			maskTouchend(e) {
				this.touchNum++
				let that = this
				setTimeout(() => {
					if (this.touchNum >= 2) {
						that.handleShowClock()
					}
					this.touchNum = 0
				}, 250)
			},
			setTimeRunner() {
				this.timeRunner = setInterval(() => {
					this.timeStr = getTimeStr()
				}, 1000)
			},
			drawClock() {
				const ctx = uni.createCanvasContext('clock', this)
				// 调用绘制方法
				this.timeRunner = setInterval(() => {
					this.drawCanvas(ctx, this.canvasWidth)
					ctx.draw()
				}, 1000)
			},
			drawCanvas(ctx, canvasWidth) {

				const centerX = canvasWidth / 2
				const centerY = canvasWidth / 2
				const radius = canvasWidth / 2 - 5

				// 保存当前坐标系统
				ctx.save();

				// 移动坐标原点到圆心
				ctx.translate(centerX, centerY);

				// 旋转坐标系
				ctx.rotate(Math.PI / 2);
				// 移动坐标原点回默认位置
				ctx.translate(-centerX, -centerY);

				// 绘制表盘
				ctx.setLineWidth(canvasWidth * 0.02)
				ctx.setStrokeStyle('#333333')
				ctx.beginPath()
				ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
				ctx.stroke()

				// 绘制时针
				const now = new Date()
				const hour = now.getHours()
				const minute = now.getMinutes()
				const second = now.getSeconds()

				const hourAngle = (hour + minute / 60 + second / 3600) * (Math.PI / 6)

				ctx.setLineWidth(canvasWidth * 0.02)
				ctx.setStrokeStyle('#333333')
				ctx.beginPath()
				ctx.moveTo(centerX - Math.sin(hourAngle) * (radius * 0.05),
					centerY + Math.cos(hourAngle) * (radius * 0.05))
				ctx.lineTo(centerX + Math.sin(hourAngle) * (radius * 0.5),
					centerY - Math.cos(hourAngle) * (radius * 0.5))
				ctx.stroke()

				// 绘制分针
				const minuteAngle = (minute + second / 60) * (Math.PI / 30)

				ctx.setLineWidth(canvasWidth * 0.01)
				ctx.setStrokeStyle('#333333')
				ctx.beginPath()
				// ctx.moveTo(centerX, centerY)
				ctx.moveTo(centerX - Math.sin(minuteAngle) * (radius * 0.08),
					centerY + Math.cos(minuteAngle) * (radius * 0.08))
				ctx.lineTo(centerX + Math.sin(minuteAngle) * (radius * 0.8),
					centerY - Math.cos(minuteAngle) * (radius * 0.8))
				ctx.stroke()

				// 绘制秒针
				const secondAngle = second * (Math.PI / 30)

				ctx.setLineWidth(canvasWidth * 0.003 + 1)
				ctx.setStrokeStyle('#F58212')
				ctx.beginPath()
				ctx.moveTo(centerX - Math.sin(secondAngle) * (radius * 0.12),
					centerY + Math.cos(secondAngle) * (radius * 0.12))
				ctx.lineTo(centerX + Math.sin(secondAngle) * (radius * 0.9),
					centerY - Math.cos(secondAngle) * (radius * 0.9))
				ctx.stroke()

				ctx.beginPath()
				ctx.arc(centerX, centerY, canvasWidth * 0.015, 0, 2 * Math.PI)
				ctx.setFillStyle('#F58212')
				ctx.fill()

				// 保存当前状态
				ctx.save()
				// 将坐标原点移到表盘圆心
				ctx.translate(centerX, centerY)

				// 计算间隔角度
				const degStep = Math.PI / 30
				ctx.setStrokeStyle('#333333')
				// 绘制间隔  
				for (let i = 0; i < 60; i++) {

					if (i % 5 === 0) {
						// 绘制长线
						ctx.setLineWidth(canvasWidth * 0.01)
						ctx.beginPath()
						ctx.moveTo(0, -radius * 0.93)
						ctx.lineTo(0, -radius * 0.98)
					} else {
						// 绘制短线
						ctx.setLineWidth(canvasWidth * 0.005)
						ctx.beginPath()
						ctx.moveTo(0, -radius * 0.96)
						ctx.lineTo(0, -radius * 0.98)
					}

					ctx.stroke()

					// 按固定角度旋转坐标轴
					ctx.rotate(degStep)
				}
				// 恢复状态
				ctx.restore()
			}
		}
	}
</script>
<style lang="scss" scoped>
	@use "sass:math";
	$width: 170upx;
	$backgroundColor: #333;
	$color: #ccc;
	$time: 1s;
	$height: $width * 1.5;
	$fontSize: $width * 1.3;
	$lineWidth: (
		math.div($width, 60)
	);
	$radius: (
		math.div($width, 10)
	);
	$perspective: $width * 5;
	$gap: $width * 0.2;
	$margin-right: $gap * 3;

	.canvas-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: animate-show .5s linear;
		//
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.content {
		transform: rotate(90deg);
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: animate-show .5s linear;
		//
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.flip-container {
		display: flex;
		justify-content: center;
		padding: 0 20rpx;
		position: relative;

		.flip-items {
			position: relative;
			width: $width;
			height: $height;
			font-size: $fontSize;
			font-weight: bold;
			border-radius: $radius;
			box-shadow: 0 2rpx 18rpx rgba(0, 0, 0, 0.7);

			&:nth-of-type(2n+1) {
				margin-right: $gap;
			}

			&:nth-of-type(2),
			&:nth-of-type(4) {
				margin-right: $gap * 3;

				&::after,
				&::before {
					position: absolute;
					right: -(math.div($margin-right, 2));
					content: '';
					transform: translateX(50%);
					width: (math.div($gap, 1.5));
					height: (math.div($gap, 1.5));
					border-radius: 50%;
					background-color: $backgroundColor;
				}

				&::before {
					top: 25%;
				}

				&::after {
					bottom: 25%;
				}
			}

			.item {
				z-index: 1;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				perspective: $perspective;

				&:before {
					content: '';
					position: absolute;
					top: (math.div($height - $lineWidth, 2));
					left: 0;
					z-index: 9;
					width: 100%;
					height: $lineWidth;
					min-height: 2px;
					background-color: rgba(0, 0, 0, 0.6);
				}

				.up,
				.down {
					position: absolute;
					left: 0;
					right: 0;
					height: 50%;
					overflow: hidden;
				}

				.up {
					transform-origin: 50% 100%;
					top: 0;
				}

				.down {
					transform-origin: 50% 0%;
					bottom: 0;
				}

				.inner {
					position: absolute;
					left: 0;
					width: 100%;
					height: $height;
					line-height: $height;
					color: $color;
					text-shadow: 0 2rpx 4rpx #000;
					text-align: center;
					background-color: $backgroundColor;
					border-radius: $radius;
				}

				.up .inner {
					top: 0;
				}

				.down .inner {
					bottom: 0;
				}

				.up .shadow {
					border-top-left-radius: $radius;
					border-top-right-radius: $radius;
				}

				.down .shadow {
					border-bottom-left-radius: $radius;
					border-bottom-right-radius: $radius;
				}
			}

			.item {
				&.past {
					z-index: 3;
				}

				&.current {
					animation: highter-level (math.div($time, 2)) (math.div($time, 2)) linear forwards;
					z-index: 2;
				}

				&.past .up {
					animation: flip-past-up (math.div($time, 2)) linear both;
				}

				&.current .down {
					animation: flip-current-down (math.div($time, 2)) (math.div($time, 2)) linear both;
				}

				@keyframes flip-current-down {
					from {
						transform: rotateX(90deg);
					}

					to {
						transform: rotateX(0deg);
					}
				}

				@keyframes flip-past-up {
					from {
						transform: rotateX(0deg);
					}

					to {
						transform: rotateX(-90deg);
					}
				}

				@keyframes highter-level {
					from {
						z-index: 4;
					}

					to {
						z-index: 4;
					}
				}
			}

			// 控制阴影
			.item {
				.shadow {
					position: absolute;
					width: 100%;
					height: 100%;
				}

				&.past .up .shadow {
					background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 100%);
					animation: show (math.div($time, 2)) linear both;
				}

				&.past .down .shadow {
					background: linear-gradient(rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 100%);
					animation: show (math.div($time, 2)) linear both;
				}

				&.current .up .shadow {
					background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 100%);
					animation: hide (math.div($time, 2)) 0.3s linear both;
				}

				&.current .down .shadow {
					background: linear-gradient(rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 100%);
					animation: hide (math.div($time, 2)) 0.3s linear both;
				}

				@keyframes show {
					from {
						opacity: 0;
					}

					to {
						opacity: 1;
					}
				}

				@keyframes hide {
					from {
						opacity: 1;
					}

					to {
						opacity: 0;
					}
				}
			}
		}

		.other {
			position: absolute;
			font-size: 26px;
			left: 50%;
			transform: translateX(-50%);
			bottom: 50rpx;
		}
	}

	@keyframes animate-show {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}

	.button {
		position: fixed;
		bottom: 0;
		margin-bottom: 120upx;
		right: 0;
		transform: rotate(90deg);
		z-index: 1000;
	}
</style>