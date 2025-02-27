<template>
	<view class="autograph-box" :style="{ 'padding-bottom': bottomHeight + 'px' }">
		<canvas class="autograph" v-show="canvasShow" :class="{ 'hidden': !canvasShow }" :canvas-id="canvasId"
			:id="canvasId" @touchstart="canvasStart($event)" @touchmove="canvasMove($event)">
			<view v-if="history.length == 0" :class="['default-text', horizontalScreen ? 'rote-text' : '']">绘制区域</view>
		</canvas>
		<view v-show="!canvasShow" class="autograph" :class="{ 'hidden': canvasShow, 'rote-text': horizontalScreen }">
			配置中
		</view>
		<view :class="['action-box', horizontalScreen ? 'rote-action' : '']">
			<view class="action-bar">
				<view>
					<image src="../../static/drawingBoard/pencli.svg" @click="openAction('thLine')"
						v-if="judge('pencli')"></image>
					<image src="../../static/drawingBoard/color.svg" @click="openAction('thColor')"
						v-if="judge('color')"></image>
					<image src="../../static/drawingBoard/back.svg" @click="goBack" v-if="judge('back')"></image>
					<image src="../../static/drawingBoard/clear.svg" @click="clear" v-if="judge('clear')"></image>
				</view>
			</view>
			<button type="primary" size="mini" class="th-submit" @click="saveCanvas"
				hover-class="hover-class">保存</button>
		</view>
		<th-color ref="thColor" @setColor="setColor" @closePop="canvasShow = true"></th-color>
		<th-line ref="thLine" @setLine="setLine" @closePop="canvasShow = true"></th-line>
	</view>
</template>

<script>
	/**
	 * @property {Array} actionBar 操作按钮配置 pencli(线条)  color(颜色)  back(返回)  clear(清空)
	 * @property {String} canvasId CanvasId
	 * @property {Boolean} isDownload 是否下载签名
	 * @property {Boolean} horizontalScreen 是否横屏
	 * @property {String} fileName 文件名称
	 * @property {String} delineColor 线颜色
	 * @property {Number} delineWidth 线宽度
	 **/
	import thColor from "./th-color.vue"
	import thLine from "./th-line.vue"
	export default {
		props: {
			//canvasId
			canvasId: {
				type: String,
				default: `th-${Date.now()}`
			},
			//配置栏
			actionBar: {
				type: Array,
				default: () => {
					return [
						'pencli',
						'color',
						'back',
						'clear'
					]
				}
			},
			//是否下载签名
			isDownload: {
				type: Boolean,
				default: true
			},
			//是否横屏
			horizontalScreen: {
				type: Boolean,
				default: false
			},
			//文件名称
			fileName: {
				type: String,
				default: '签名'
			},
			//线颜色
			delineColor: {
				type: String,
				default: '#000'
			},
			//线宽度
			delineWidth: {
				type: Number,
				default: 4
			}
		},
		data() {
			return {
				context: "",
				actionShow: true,
				history: [],
				lineColor: "#000",
				lineWidth: 4,
				canvasShow: true,
				bottomHeight: 0
			}
		},
		components: {
			thColor,
			thLine
		},
		mounted() {
			// #ifdef MP-WEIXIN
			this.getIphoneBottom()
			// #endif
			this.lineColor = this.delineColor
			this.lineWidth = this.delineWidth
			const ctx = uni.createCanvasContext(this.canvasId, this)
			this.context = ctx;
		},
		methods: {
			getIphoneBottom() {
				uni.getSystemInfo({
					success: res => {
						const bottom = res.screenHeight - res.safeArea.bottom;
						this.bottomHeight = bottom > 0 ? bottom - 10 : bottom
					}
				})
			},
			//操作栏显示控制
			judge(key) {
				if (this.actionBar.includes(key)) {
					return true
				} else {
					return false;
				}
			},
			//打开选择器
			openAction(ref) {
				this.canvasShow = false
				this.$refs[ref].checkModel()
			},
			//设置颜色
			setColor(color) {
				this.lineColor = color;
			},
			//设置线条
			setLine(width) {
				this.lineWidth = width;
			},
			//切换控制栏
			checkAction() {
				this.actionShow = !this.actionShow
			},
			//保存
			async saveCanvas() {
				const tempFilePath = await this.canvasToFilPath()
				if (!this.isDownload) {
					return false;
				}
				return new Promise((resolve, reject) => {
					// #ifdef H5
					try {
						const a = document.createElement('a')
						a.href = tempFilePath
						a.download = this.fileName
						document.body.appendChild(a)
						a.click()
						a.remove()
						resolve()
					} catch (e) {
						reject(e)
					}
					// #endif
					// #ifndef H5
					uni.saveImageToPhotosAlbum({
						filePath: tempFilePath,
						success(resObj) {
							uni.showToast({
								title: "成功保存画板到相册",
								icon: 'success',
								success: function(res) {},
								fail: function(res) {},
							})
							resolve(resObj)
						},
						fail(err) {
							console.log("err:", err)
							reject(err)
						}
					})
					// #endif
				})
			},
			// 保存临时路径
			canvasToFilPath(conf = {}) {
				return new Promise((resolve, reject) => {
					uni.canvasToTempFilePath({
						canvasId: this.canvasId,
						success: res => {
							resolve(res.tempFilePath)
						},
						fail: err => {
							reject(err)
						}
					}, this)
				})
			},
			//撤回
			goBack() {
				this.context.draw()
				this.history.pop();
				this.history.forEach((item, index) => {
					let {
						color,
						width
					} = item.style
					this.context.beginPath()
					this.context.setLineCap('round')
					this.context.setStrokeStyle(color)
					this.context.setLineWidth(width)
					if (item.coordinates.length >= 2) {
						item.coordinates.forEach(it => {
							if (it.type == 'touchstart') {
								this.context.moveTo(it.x, it.y)
							} else {
								this.context.lineTo(it.x, it.y)
							}
						})
					} else {
						const point = item.coordinates[0]
						this.context.moveTo(point.x, point.y)
						this.context.lineTo(point.x + 1, point.y)
					}
					this.context.stroke()
				})
				this.context.draw(true)
			},
			//清空画布
			clear() {
				this.history = [];
				this.context.draw()
			},
			canvasStart(event) {
				let {
					x,
					y
				} = event.touches[0]
				this.history.push({
					style: {
						color: this.lineColor,
						width: this.lineWidth
					},
					coordinates: [{
						type: event.type,
						x: x,
						y: y
					}]
				})
				this.drawGraphics()
			},
			canvasMove(e) {
				// e.preventDefault()
				let {
					x,
					y
				} = e.touches[0]
				this.history[this.history.length - 1].coordinates.push({
					type: e.type,
					x: x,
					y: y
				})
				this.drawGraphics()
			},
			//绘制
			drawGraphics() {
				let historyLen = this.history.length
				if (!historyLen) return
				let currentData = this.history[historyLen - 1]
				let coordinates = currentData.coordinates
				if (!coordinates.length) return
				let startPoint, endPoint;
				if (coordinates.length < 2) {
					startPoint = coordinates[coordinates.length - 1]
					endPoint = {
						x: startPoint.x + 1,
						y: startPoint.y
					}
				} else {
					startPoint = coordinates[coordinates.length - 2]
					endPoint = coordinates[coordinates.length - 1]
				}
				let style = currentData.style
				this.context.beginPath()
				this.context.setLineCap('round')
				this.context.setStrokeStyle(style.color)
				this.context.setLineWidth(style.width)
				this.context.moveTo(startPoint.x, startPoint.y)
				this.context.lineTo(endPoint.x, endPoint.y)
				this.context.stroke()
				this.context.draw(true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hidden {
		height: 0 !important;
		overflow: hidden;
		border: 0 !important;
	}

	.autograph {
		width: 100%;
		height: 92%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 38upx;
		color: #C0C0C0;
	}

	.config {
		width: 100%;
		height: 92%;
		background-color: red;
	}

	.horizontalScreen {
		left: -150upx !important;
		bottom: 0 !important;
		right: auto !important;
		transform: rotate(90deg);
		transform-origin: bottom right;
	}

	.rote-text {
		transform: rotate(90deg);
	}

	.rote-action {
		transform: rotate(180deg);
		padding-top: 0 !important;

		.th-submit {
			transform: rotate(-90deg);
			width: 120upx !important;
			height: 100% !important;

		}
	}

	.action-box {
		height: 8%;
		position: absolute;
		bottom: 0;
		width: 100%;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border-top: 1px dashed gray;

		button {
			margin: 0;
			margin-right: 10upx;
		}
	}

	.th-submit {
		// background-color: #000;
		color: #FFFFFF;
		transition: all 0.3s;
	}

	.action-bar {
		image {
			width: 35upx;
			height: 35upx;
		}

		>image {
			transition: all 0.3s;
		}

		>view {
			display: flex;
			flex-direction: row;
			align-items: center;

			image {
				width: 40upx;
				height: 40upx;
				margin-right: 60upx;
			}
		}
	}

	.autograph-box {
		width: 100vw;
		height: 100vh;
		position: relative;
		box-sizing: border-box;

		.default-text {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			z-index: -1;
			justify-content: center;
			font-size: 38upx;
			color: #C0C0C0;
			letter-spacing: 5upx;
		}
	}

	.roteRight {
		transform: rotate(136deg);
	}

	.roteLeft {
		transform: rotate(0deg);
	}

	.hover-class {
		opacity: 0.6;
	}
</style>