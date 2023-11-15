<template>
	<view class="random-shaker">
		<view class="content" @longpress="openDialog">
			<view v-if="names.length>0" class="names-container">
				<text class="name-text" v-if="isStarting||!isReturn">{{nameText}}</text>
				<view class="names-item" v-for="(item,index) in names" :key="index" @click="handelDeleteItem(index)"
					v-else>
					{{item}}
				</view>
			</view>
			<view v-else class="content-tip">
				<text>暂无信息</text>
			</view>
		</view>
		<defaultInput :placeholder="'请输入文本,根据逗号分割'" @changeInput="handleChangeTextValue" />
		<view class="names-buttons-container">
			<view class="names-buttons-import">
				<button @tap="chooseFile" size="mini">导入excel文件</button>
				<button size="mini" @tap="handleImportText">导入当前文本</button>
			</view>
			<view class="names-buttons-actions">
				<button @tap="handleReturn" v-if="!isReturn&&!isStarting">返回</button>
				<button @tap="start" v-if="!isStarting" type="primary">{{isReturn?'开始':'继续'}}</button>
				<button @tap="stop" v-else type="warn">停止</button>
			</view>
		</view>
		<view class="tips">提示:点击上方信息可以单独删除，长按可全部删除；excel文件暂不能读取第一行信息。</view>
		<view class="dialog-background" v-if="isShowDialog"></view>
		<view class="dialog-container" v-if="isShowDialog">
			<view class="dialog">
				<view class="dialog-content">是否清空信息？</view>
				<view class="dialog-buttons">
					<button size="mini" @tap="handleHideDialog">取消</button>
					<button size="mini" type="primary" @tap="handleClearInfo">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	import * as XLSXMIN from './xlsx.full.min.js';
	let XLSX
	// // #ifdef MP-WEIXIN
	if (store.getters.platform !== 'android') {
		XLSX = require('./xlsx.full.min.js');
	} else {
		XLSX = XLSXMIN
	}
	// // #endif
	export default {
		data() {
			return {
				names: [],
				nameText: '',
				isStarting: false,
				timer: null,
				isAllowsDuplicates: false,
				excelData: [],
				textValue: '',
				isShowDialog: false,
				isReturn: true
			}
		},
		methods: {
			handleClearInfo() {
				this.names = []
				this.isShowDialog = false
				uni.showToast({
					icon: 'none',
					title: `清空信息成功`
				})

			},
			handleHideDialog() {
				this.isShowDialog = false
			},
			openDialog() {
				if (this.names.length > 0) {
					this.isShowDialog = true
				}
			},
			handelDeleteItem(index) {
				this.names.splice(index, 1)
			},
			addStringToArray(str, arr) {
				// 使用逗号分割字符串并将其转换为数组
				var splitArr = str.split(/[,，]/);
				// 将分割后的数组与现有数组合并
				arr = arr.concat(splitArr);
				return arr;
			},
			handleChangeTextValue(e) {
				this.textValue = e
			},
			handleImportText() {
				this.names = this.addStringToArray(this.textValue, this.names)
			},
			chooseFile(e) {
				let that = this
				// #ifdef MP-WEIXIN
				wx.chooseMessageFile({
					count: 1,
					type: 'file',
					extension: ['.xls', '.xlsx'],
					success: res => {
						try {
							const path = res.tempFiles[0].path
							const fs = wx.getFileSystemManager()
							const data = fs.readFileSync(path, 'binary') // data为binary数据
							that.process(data)
						} catch (e) {
							console.error(e)
							uni.showModal({
								title: '提示',
								content: "文件读取失败",
								showCancel: false
							})
							return
						}
					}
				})
				// #endif
				// #ifdef APP-PLUS
				switch (plus.os.name) {
					case "Android":
						// Android平台: plus.android.*  
						console.log("Android111111111")
						break;
					case "iOS":
						// iOS平台: plus.ios.*
						  console.log("Ios111111111111")
						break;
					default:
						// 其它平台  
						break;
				}

				// uni.chooseFile({
				// 	count: 1,
				// 	type: 'file',
				// 	extension: ['.xls', '.xlsx'],
				// 	success: res => {
				// 		try {
				// 			const path = res.tempFiles[0].path
				// 			const fs = wx.getFileSystemManager()
				// 			const data = fs.readFileSync(path, 'binary') // data为binary数据
				// 			that.process(data)
				// 		} catch (e) {
				// 			console.error(e)
				// 			uni.showModal({
				// 				title: '提示',
				// 				content: "文件读取失败",
				// 				showCancel: false
				// 			})
				// 			return
				// 		}
				// 	}
				// })
				// #endif
			},
			process(data) {
				let workbook = XLSX.read(data, {
					type: "binary"
				});
				const sheetName = workbook.SheetNames[0]
				let sheet = workbook.Sheets[sheetName]
				const options = {
					// header:false,
					raw: false, // 如果不加raw:true的话日期会被读成数字，根据开发需求决定
				}
				const rawData = XLSX.utils.sheet_to_json(sheet, options);

				for (let item of rawData) {
					const valuesArray = Object.values(item);
					for (let value of valuesArray) {
						this.names.push(value)
					}
				}
			},
			start() {
				if (this.names.length > 0) {
					this.isStarting = true
					this.isReturn = false
					this.timer = setInterval(() => {
						let index = Math.floor(Math.random() * this.names.length)
						this.nameText = this.names[index]
					}, 50)
				} else {
					uni.showToast({
						icon: 'none',
						title: `请先输入信息`
					})
				}
			},
			stop() {
				this.isStarting = false
				clearInterval(this.timer)
				this.timer = null
			},
			handleReturn() {
				this.isReturn = true
			}
		}
	}
</script>
<style lang="scss">
	.dialog-background {
		background-color: #cccccc;
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 10000;
		opacity: 0.5;
		animation: halfOpacity .3s ease-in;
	}

	.dialog-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 10000;
		animation: opacity .3s ease-in;
	}

	@keyframes halfOpacity {
		from {
			opacity: 0;
		}

		to {
			opacity: 0.5;
		}
	}

	@keyframes opacity {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.dialog {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 20upx;
		border-radius: 20upx;
		width: 50vw;

		&-content {
			padding: 20upx;
		}

		&-buttons {
			display: flex;
			padding: 20upx;
		}
	}

	.content {
		height: 40vh;
		padding: 20upx;
		width: 85%;
		border: 1upx solid black;
		border-radius: 20upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow-y: auto;

		&-tip {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #d1d1d1;
		}
	}

	.names-container {
		display: flex;
		flex-wrap: wrap;
	}

	.names-item {
		padding: 10upx;
	}

	.name-text {
		justify-self: center;
		align-self: center;
		font-size: 150upx;
	}

	.names-buttons-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.names-buttons-import {
		display: flex;
		justify-content: space-evenly;
		width: 80%;
		margin-bottom: 40upx;
	}

	.names-buttons-actions {
		display: flex;
		justify-content: space-evenly;
		width: 80%;
		margin-bottom: 40upx;
	}

	.random-shaker {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tips {
		width: 80%;
		color: #cccccc;
	}
</style>