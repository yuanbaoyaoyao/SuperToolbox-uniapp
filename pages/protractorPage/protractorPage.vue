<template>
	<view>
		<canvas canvas-id="myCanvas" id="myCanvas" :style="{ width: '100vw', height: '100vh' }"></canvas>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onReady() {
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					that.drawRoundImage(res.screenHeight);
				}
			});
		},
		methods: {
			drawRoundImage(height) {
				const ctx = uni.createCanvasContext('myCanvas');
				// 绘制圆角矩形
				ctx.beginPath();
				ctx.arc(10, height / 2, height / 2 - 50, (90 * Math.PI) / 180, (270 * Math.PI) / 180, true);
				ctx.lineTo(10, height - 50); // 添加一个垂直线段
				ctx.setStrokeStyle('#333333');
				ctx.stroke();
				ctx.closePath();
				// ctx.clip();

				// 修改部分开始
				const degrees = 180; // 总共的角度
				const tickSpacing = degrees / 180; // 每度之间的刻度线间隔
				const centerX = 10; // 圆心的X坐标
				const centerY = height / 2; // 圆心的Y坐标
				const radius = height / 2 - 50; // 圆的半径
				const centerTextX = 10; //文本圆心的X坐标
				const centerTextY = height / 2 - 10; // 圆心的Y坐标
				const textRadius = height / 2 - 85; // 圆的半径

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
						// 绘制文本
						// ctx.fillText(i, centerX + Math.cos(angle) * (radius - 40),
						// 	centerY + Math.sin(angle) * (radius - 40));
						ctx.setFontSize(12);

						ctx.translate(textEndX, textEndY);
						ctx.rotate(Math.PI / 2);

						ctx.fillText(i, 0, 0);

						ctx.setTransform(1, 0, 0, 1, 0, 0);

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