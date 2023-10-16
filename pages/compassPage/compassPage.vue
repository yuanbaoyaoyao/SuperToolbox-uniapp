<template>
	<view style="position: fixed;padding-top: 20%;display: flex;justify-content: center;width: 100%;" v-if="isWorking">
		<text style="width: fit-content;font-size: x-large;">{{direction}} {{compassValue}}°</text>
	</view>
	<view style="position: fixed;width: 100vw;height: 100vh">
		<canvas canvas-id="myCanvas" id="myCanvas" :style="{ width: '100vw', height: '100vh',position:'fixed' }" />
		<canvas canvas-id="myCanvas2" id="myCanvas2" :style="{ width: '100vw', height: '100vh',position:'fixed' }" />
	</view>
</template>

<script>
	export default {
		onShareAppMessage() {},
		onShareTimeline() {},
		data() {
			return {
				screenHeight: 0,
				screenWidth: 0,
				centerX: 0,
				centerY: 0,
				degree: 0,
				myCanvas1: null,
				myCanvas2: null,
				compassValue: 0,
				direction: '北',
				isWorking: false
			}
		},
		onReady() {
			this.handleGetSysInfo()
			let that = this
			uni.onCompassChange((res) => {
				that.compassValue = parseInt(res.direction)
				if (that.compassValue > 345 && that.compassValue < 15) {
					that.direction = '北'
				} else if (that.compassValue >= 15 && that.compassValue <= 75) {
					that.direction = '东北'
				} else if (that.compassValue > 75 && that.compassValue < 105) {
					that.direction = '东'
				} else if (that.compassValue >= 105 && that.compassValue <= 165) {
					that.direction = '东南'
				} else if (that.compassValue > 165 && that.compassValue < 195) {
					that.direction = '南'
				} else if (that.compassValue >= 195 && that.compassValue <= 255) {
					that.direction = '西南'
				} else if (that.compassValue > 255 && that.compassValue < 285) {
					that.direction = '西'
				} else if (that.compassValue >= 285 && that.compassValue <= 345) {
					that.direction = '西北'
				}
				that.drawPointer(res.direction)
				this.isWorking = true
			});
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
						that.myCanvas2 = uni.createCanvasContext('myCanvas2')
						that.myCanvas1 = uni.createCanvasContext('myCanvas')
						that.screenHeight = res.screenHeight
						that.screenWidth = res.screenWidth
						that.drawRoundImage();
						// that.drawPointer();
					}
				});
			},
			drawPointer(degree) {
				let pageX, pageY, angle
				// if (e != undefined) {
				// 	pageX = e.touches[0].x;
				// 	pageY = e.touches[0].y;
				// }
				let ctx = this.myCanvas2
				ctx.clearRect(0, 0, this.screenHeight, this.screenWidth);
				let height = this.screenHeight
				if (height / 2 > this.screenWidth) {
					height = this.screenWidth * 2
				}

				const centerX = this.screenWidth / 2; // 圆心的X坐标
				const centerY = height / 2; // 圆心的Y坐标

				// 菱形边长
				const diamondSide = centerX * 0.9;

				// 菱形坐标
				const diamondX = centerX - diamondSide / 2;
				const diamondY = centerY - diamondSide / 2;

				if (degree != undefined) {
					angle = degree * Math.PI / 180;
					// 保存当前坐标系统
					ctx.save();

					// 移动坐标原点到圆心
					ctx.translate(centerX, centerY);

					// 旋转坐标系
					ctx.rotate(angle);
					// 移动坐标原点回默认位置
					ctx.translate(-centerX, -centerY);
				}

				// 开始路径
				ctx.beginPath();

				// 绘制菱形
				ctx.moveTo(diamondX + diamondSide * 0.43, centerY);
				ctx.lineTo(centerX, diamondY);
				ctx.lineTo(diamondX + diamondSide * 0.57, centerY);
				ctx.lineTo(diamondX + diamondSide * 0.43, centerY);

				// 填充颜色  
				ctx.fillStyle = '#ff0000';
				ctx.fill();

				// 关闭路径
				ctx.closePath();
				//
				// 开始路径
				ctx.beginPath();

				// 绘制菱形
				ctx.moveTo(diamondX + diamondSide * 0.43, centerY);
				ctx.lineTo(centerX, diamondY + diamondSide);
				ctx.lineTo(diamondX + diamondSide * 0.57, centerY);
				ctx.lineTo(diamondX + diamondSide * 0.43, centerY);

				// 填充颜色  
				ctx.fillStyle = '#333333';
				ctx.fill();

				// 关闭路径
				ctx.closePath();
				ctx.draw()
			},
			drawRoundImage(e) {
				let pageX, pageY, angle
				if (e != null) {
					pageX = e.touches[0].pageX;
					pageY = e.touches[0].pageY;
				}

				let height = this.screenHeight
				let ctx = this.myCanvas1
				if (height / 2 > this.screenWidth) {
					height = this.screenWidth * 2
				}

				// 修改部分开始
				const degrees = 360; // 总共的角度
				const tickSpacing = degrees / 180; // 每度之间的刻度线间隔
				const centerX = this.screenWidth / 2; // 圆心的X坐标
				const centerY = height / 2; // 圆心的Y坐标

				const radius = this.screenWidth / 2 - 50
				const textRadius = this.screenWidth / 2 - 30
				const directionRadius = this.screenWidth / 2 - 80

				if (e != null) {
					angle = Math.atan2(pageY - centerY, pageX - centerX);
					// 保存当前坐标系统
					ctx.save();

					// 移动坐标原点到圆心
					ctx.translate(centerX, centerY);

					// 旋转坐标系
					ctx.rotate(angle);
					// 移动坐标原点回默认位置
					ctx.translate(-centerX, -centerY);
				}

				for (let i = 0; i <= degrees; i += tickSpacing) {
					let tickLength = 10; // 刻度线的长度
					if (i % 30 == 0 || i == 0) {
						tickLength = 15
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
							extraRotate = -1.2 * Math.PI / 180;
						} else if (this.countDigits(i) == 2) {
							extraRotate = -2.5 * Math.PI / 180;
						} else if (this.countDigits(i) == 3) {
							extraRotate = -3.7 * Math.PI / 180;
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

					//绘制东南西北
					if ((i % 45 == 0 || i == 0) && i != 360) {
						// 绘制文本
						const directionAngle = (i * Math.PI) / 180 - Math.PI / 2;
						const directionEndX = centerX + Math.cos(directionAngle) * directionRadius;
						const directionEndY = centerY + Math.sin(directionAngle) * directionRadius;
						ctx.setFontSize(20);

						//再逆时针旋转部分角度
						let extraRotate = -5 * Math.PI / 180;

						// 保存当前坐标系统
						ctx.save();

						// 将坐标原点移动到圆心
						ctx.translate(centerX, centerY);

						// 围绕圆心旋转10度  
						ctx.rotate(extraRotate);

						// 恢复坐标原点
						ctx.translate(-centerX, -centerY);

						// 绘制文本
						ctx.translate(directionEndX, directionEndY);
						//这里稍微调节了一下
						ctx.rotate(i * Math.PI / 180 + 0.08);
						switch (i) {
							case 0:
								ctx.fillText("北", 0, 0);
								break;
							case 90:
								ctx.fillText("东", 0, 0);
								break;
							case 180:
								ctx.fillText("南", 0, 0);
								break;
							case 270:
								ctx.fillText("西", 0, 0);
								break;
						}
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
</style>