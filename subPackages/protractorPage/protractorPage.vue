<template>
	<!-- todo:添加切换方向功能 -->
	<view class="action-buttons">
		<button size="mini" plain @click="handleCamera">{{!isShowCamera?'打开相机':'关闭相机'}}</button>
		<button size="mini" plain @click="handleReverseDirection">切换方向</button>
		<button size="mini" plain @click="handleReturn">返回主页</button>
	</view>
	<view>
		<camera device-position="back" flash="off" @error="error"
			:style="{ width: '100vw', height: '100vh',position:'fixed' }" v-if="isShowCamera" />
		<canvas canvas-id="myCanvas" id="myCanvas" :style="{ width: '100vw', height: '100vh',position:'fixed' }">
			<canvas canvas-id="myCanvas2" id="myCanvas2" :style="{ width: '100vw', height: '100vh' }"
				@touchstart="touchstart" @touchmove="touchstart" />
		</canvas>
	</view>
</template>

<script>
	export default {
		onShareAppMessage() {},
		onShareTimeline() {},
		data() {
			return {
				isShowCamera: false,
				ctx1: null,
				ctx: null,
				screenHeight: 0,
				screenWidth: 0,
				degree: 0,
				isReverseDirection: false
			}
		},
		onReady() {
			this.handleGetSysInfo()
		},
		methods: {
			handleReturn() {
				uni.navigateBack()
			},
			handleCamera() {
				this.isShowCamera = !this.isShowCamera
				this.handleGetSysInfo()
			},
			handleReverseDirection() {
				this.isReverseDirection = !this.isReverseDirection
				this.ctx1.draw(false);
				this.ctx.draw(false);
				this.ctx.draw(false);
				this.drawRoundImage(this.screenHeight, this.ctx1)
			},
			handleGetSysInfo() {
				let that = this
				uni.getSystemInfo({
					success: function(res) {
						const ctx = uni.createCanvasContext('myCanvas');
						const ctx2 = uni.createCanvasContext('myCanvas2');
						that.ctx1 = ctx
						that.ctx = ctx2
						that.screenHeight = res.screenHeight
						that.screenWidth = res.screenWidth
						that.drawRoundImage(res.screenHeight, ctx);
					}
				});
			},
			// 计算指针角度的函数  
			calculatePointerAngle(e, centerX, centerY) {
				const x = e.touches[0].x - centerX;
				const y = e.touches[0].y - centerY;
				const angle = Math.atan2(y, x);
				this.degree = (angle * 180 / Math.PI + 90).toFixed(2);
			},

			// 绘制指针的函数
			drawPointerLine(ctx, e, centerX, centerY) {
				const dx = e.touches[0].x - centerX;
				const dy = e.touches[0].y - centerY;
				const direction = Math.atan2(dy, dx);
				const winWidth = this.screenWidth;
				const length = this.screenWidth;
				const endX = centerX + Math.cos(direction) * length;
				const endY = centerY + Math.sin(direction) * length;

				ctx.beginPath();
				ctx.moveTo(centerX, centerY);
				ctx.lineTo(endX, endY);

				ctx.setStrokeStyle('#333333');
				ctx.stroke();
				ctx.draw();
			},

			// 在canvas组件的touchstart回调中调用
			touchstart(e) {
				const centerX = 10;
				let centerY = this.screenHeight / 2
				if (this.screenHeight / 2 > this.screenWidth) {
					centerY = this.screenWidth
				}

				this.calculatePointerAngle(e, centerX, centerY);
				// 绘制指针直线
				this.drawPointerLine(this.ctx, e, centerX, centerY);
				this.ctx.translate(centerX + 20, centerY - 20);
				this.ctx.rotate(Math.PI / 2);
				this.ctx.setFontSize(20);
				if (this.isReverseDirection) {
					let reverseDegree = (180 - this.degree).toFixed(2)
					this.ctx.fillText(reverseDegree + '°', 0, 0);
				} else {
					this.ctx.fillText(this.degree + '°', 0, 0);
				}

				this.ctx.setTransform(1, 0, 0, 1, 0, 0);
			},
			drawRoundImage(height, ctx) {
				if (height / 2 > this.screenWidth) {
					height = this.screenWidth * 2
				}
				// 绘制圆角矩形
				ctx.beginPath();
				ctx.arc(10, height / 2, height / 2 - 50, (90 * Math.PI) / 180, (270 * Math.PI) / 180, true);
				ctx.lineTo(10, height - 50); // 添加一个垂直线段
				ctx.setStrokeStyle('#333333');
				ctx.stroke();
				ctx.closePath();

				const degrees = 180; // 总共的角度
				const tickSpacing = degrees / 180; // 每度之间的刻度线间隔
				const centerX = 10; // 圆心的X坐标
				const centerY = height / 2; // 圆心的Y坐标


				const centerTextX = 10; //文本圆心的X坐标
				const centerTextY = height / 2 - 10; // 圆心的Y坐标
				const radius = height / 2 - 50
				const textRadius = height / 2 - 85

				for (let i = 0; i <= degrees; i += tickSpacing) {
					let tickLength = 10; // 刻度线的长度
					if (i % 5 == 0) {
						tickLength = 15
					}
					if (i % 10 == 0 || i == 0) {
						tickLength = 20
					}
					const angle = (i * Math.PI) / 180 - Math.PI / 2;
					const startX = centerX + Math.cos(angle) * (radius - tickLength);
					const startY = centerY + Math.sin(angle) * (radius - tickLength);
					const endX = centerX + Math.cos(angle) * radius;
					const endY = centerY + Math.sin(angle) * radius;
					const textEndX = centerTextX + Math.cos(angle) * textRadius;
					const textEndY = centerTextY + Math.sin(angle) * textRadius;

					if (i % 10 == 0 || i == 0) {
						ctx.setFontSize(12);

						ctx.translate(textEndX, textEndY);
						ctx.rotate(Math.PI / 2);

						//切换方向
						if (this.isReverseDirection) {
							ctx.fillText(180 - i, 0, 0);
						} else {
							ctx.fillText(i, 0, 0);
						}

						ctx.setTransform(1, 0, 0, 1, 0, 0);

					}

					ctx.beginPath();
					ctx.moveTo(startX, startY);
					ctx.lineTo(endX, endY);
					ctx.setStrokeStyle('#333333');
					ctx.stroke();
					ctx.closePath();
				}

				ctx.restore(); // 恢复之前保存的绘图上下文状态
				ctx.draw();
			},
		},
	};
</script>
<style lang="scss">
	.action-buttons {
		border: none;
		width: fit-content;
		font-size: 35rpx;
		position: absolute;
		right: 60rpx;
		bottom: 0;
		transform: rotate(90deg);
		z-index: 1000;
		display: flex;
		flex-direction: column;

		button {
			margin-top: 10rpx;
		}
	}

	#myCanvas {
		text {
			position: absolute;
			height: fit-content;
			background-color: gray;
			width: fit-content;
			left: 50rpx;
			bottom: 50vh;
			// margin-left: 20rpx;
			transform: rotate(90deg);
		}
	}
</style>