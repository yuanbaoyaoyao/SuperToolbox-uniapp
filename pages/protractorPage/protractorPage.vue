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
					console.log("ressssss:", res.screenHeight)
					that.drawRoundImage(res.screenHeight);
				}
			});
		},
		methods: {
			drawRoundImage(height) {
				console.log("heighttttttt:", height)
				const ctx = uni.createCanvasContext('myCanvas');
				// 绘制圆角矩形
				ctx.beginPath();
				ctx.arc(10, height / 2, height / 2 - 50, (90 * Math.PI) / 180, (270 * Math.PI) / 180, true)
				ctx.lineTo(10, height - 50); // Add a vertical line segment

				ctx.setStrokeStyle('#333333')
				ctx.stroke()

				ctx.closePath();
				ctx.clip();

				ctx.restore(); // 恢复之前保存的绘图上下文状态

				ctx.draw();
			},
		},
	};
</script>