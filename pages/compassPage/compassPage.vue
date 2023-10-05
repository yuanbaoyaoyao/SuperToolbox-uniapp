<template>
	<view>
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
				ctx: null,
				screenHeight: 0,
				screenWidth: 0,
				degree: 0
			}
		},
		onReady() {
			this.handleGetSysInfo()
		},
		methods: {
			countDigits(num) {
				if (num === 0) return 1;
				let digits = 0;
				while (num > 0) {
					digits++;
					num = Math.floor(num / 10);
				}
				return digits;
			},
			handleGetSysInfo() {
				let that = this
				uni.getSystemInfo({
					success: function(res) {
						const ctx = uni.createCanvasContext('myCanvas');
						const ctx2 = uni.createCanvasContext('myCanvas2');
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
				const centerY = this.screenHeight / 2;

				this.calculatePointerAngle(e, centerX, centerY);
				// 绘制指针直线
				this.drawPointerLine(this.ctx, e, centerX, centerY);
				this.ctx.translate(centerX + 20, centerY - 20);
				this.ctx.rotate(Math.PI / 2);
				this.ctx.setFontSize(20);
				this.ctx.fillText(this.degree + '°', 0, 0);

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
				// ctx.clip();

				// 修改部分开始
				const degrees = 360; // 总共的角度
				const tickSpacing = degrees / 360; // 每度之间的刻度线间隔
				const centerX = this.screenWidth / 2; // 圆心的X坐标
				const centerY = height / 2; // 圆心的Y坐标

				const radius = this.screenWidth / 2 - 50
				const textRadius = this.screenWidth / 2 - 25

				for (let i = 0; i <= degrees; i += tickSpacing) {
					let tickLength = 10; // 刻度线的长度
					if (i % 15 == 0 || i == 0) {
						tickLength = 20
					}
					const angle = (i * Math.PI) / 180 - Math.PI / 2;
					const startX = centerX + Math.cos(angle) * (radius + tickLength);
					const startY = centerY + Math.sin(angle) * (radius + tickLength);
					const endX = centerX + Math.cos(angle) * radius;
					const endY = centerY + Math.sin(angle) * radius;

					if ((i % 30 == 0 || i == 0) && i != 360) {
						// 绘制文本
						const textAngle = (i * Math.PI) / 180 - Math.PI / 2;
						const textEndX = centerX + Math.cos(textAngle) * textRadius;
						const textEndY = centerY + Math.sin(textAngle) * textRadius;
						ctx.setFontSize(12);

						//再逆时针旋转部分角度
						let extraRotate
						if (this.countDigits(i) == 1) {
							extraRotate = -1.5 * Math.PI / 180;
						} else if (this.countDigits(i) == 2) {
							extraRotate = -3.5 * Math.PI / 180;
						} else if (this.countDigits(i) == 3) {
							extraRotate = -4.8 * Math.PI / 180;
						}
						// 保存当前坐标系统
						ctx.save();

						// 将坐标原点移动到圆心
						ctx.translate(centerX, centerY);

						// 围绕圆心旋转10度  
						ctx.rotate(extraRotate);

						// 恢复坐标原点
						ctx.translate(-centerX, -centerY);

						// 绘制文本
						ctx.translate(textEndX, textEndY);
						ctx.rotate(i * Math.PI / 180);
						ctx.fillText(i, 0, 0);

						// 恢复坐标系统  
						ctx.restore();
					}

					ctx.beginPath();
					ctx.moveTo(startX, startY);
					ctx.lineTo(endX, endY);
					ctx.setStrokeStyle('#333333');
					ctx.stroke();
					ctx.closePath();
				}
				// 修改部分结束

				ctx.restore(); // 恢复之前保存的绘图上下文状态
				ctx.draw();
			},
		},
	};
</script>
<style lang="scss">
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