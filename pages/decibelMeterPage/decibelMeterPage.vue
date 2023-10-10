<!-- 不知道为什么计算出来的值一直是一样的 -->
<template>
	<view>
		<view>这是分贝计{{decibel}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				decibel: 0, // 分贝大小
			};
		},
		onLoad() {
			// 获取录音管理器对象
			const recorderManager = uni.getRecorderManager();

			// 开始录音
			recorderManager.start({
				sampleRate: 8000,
				numberOfChannels: 1,
				encodeBitRate: 48000,
				frameSize: 5,
			});
			// 监听录音帧数据的变化
			recorderManager.onFrameRecorded((res) => {
				// 获取录音帧数据
				const frameBuffer = new Int8Array(res.frameBuffer);

				// 计算分贝大小
				const decibel = this.calculateDecibel(frameBuffer);

				// 更新分贝大小的数据
				this.decibel = decibel.toFixed(2);
			});
		},
		methods: {
			// 计算分贝大小
			calculateDecibel(frameBuffer) {
				console.log("frameBuffer:", frameBuffer)
				let sum = 0;
				for (let i = 0; i < frameBuffer.length; i++) {
					sum += frameBuffer[i] * frameBuffer[i];
				}
				console.log("summmmmmmmmm:", sum)
				const rms = Math.sqrt(sum / frameBuffer.length);
				const decibel = 20 * Math.log10(rms);
				return decibel;
			},
		},
		onUnload() {
			// 停止录音
			const recorderManager = uni.getRecorderManager();
			recorderManager.stop();
		},
	};
</script>

<style>

</style>