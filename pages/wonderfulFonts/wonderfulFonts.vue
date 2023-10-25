<template>
	<view class="container">
		<defaultInput :placeholder="'请输入'" @changeInput="handleChangeTextValue" />
		<view class="text-container">
			<view v-for="n in 13" :key="n" @tap="handleCopy(n)" v-if="nowMessage!=''"
				:class="{ 'hover-text': nowCopy === n }">
				{{ getMessage(n) }}
			</view>
		</view>
		<view class="tips">提示:目前仅支持英文的形态变化。</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nowCopy: '',
				nowMessage: '',
				newMessage1: '',
				newMessage2: '',
				newMessage3: '',
				newMessage4: '',
				newMessage5: '',
				newMessage6: '',
				newMessage7: '',
				newMessage8: '',
				newMessage9: '',
				newMessage10: '',
				newMessage11: '',
				newMessage12: '',
				newMessage13: '',
				// newMessage14: '',
				// newMessage15: '',
				// newMessage16: '',
				// newMessage17: '',
				// newMessage18: '',
				// newMessage19: '',
			}
		},
		computed: {
			getMessage(n) {
				return n => this[`newMessage${n}`]
			}
		},
		methods: {
			handleCopy(n) {
				this.nowCopy = n
				setTimeout(() => {
					this.nowCopy = ''
				}, 600)
				let that = this
				uni.setClipboardData({
					data: that[`newMessage${n}`], // 必须字符串
					success: function() {
						uni.showToast({
							title: "复制成功",
						})
					}
				});
			},
			handleChangeTextValue(e) {
				this.nowMessage = e
				this.handleChangeNewMessage1(e)
				this.handleChangeNewMessage2(e)
				this.handleChangeNewMessage3(e)
				this.handleChangeNewMessage4(e)
				this.handleChangeNewMessage5(e)
				this.handleChangeNewMessage6(e)
				this.handleChangeNewMessage7(e)
				this.handleChangeNewMessage8(e)
				this.handleChangeNewMessage9(e)
				this.handleChangeNewMessage10(e)
				this.handleChangeNewMessage11(e)
				this.handleChangeNewMessage12(e)
				this.handleChangeNewMessage13(e)
				// this.handleChangeNewMessage14(e)
				// this.handleChangeNewMessage15(e)
				// this.handleChangeNewMessage16(e)
				// this.handleChangeNewMessage17(e)
				// this.handleChangeNewMessage18(e)
				// this.handleChangeNewMessage19(e)
			},
			handleChangeNewMessage1(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					console.info("codePoint:", codePoint)
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 119743;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 119737;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage1 = newMessage
			},
			handleChangeNewMessage2(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120315;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120309;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage2 = newMessage
			},
			handleChangeNewMessage3(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 119795;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						if (codePoint == 104) {
							codePoint = 8462
						} else {
							codePoint += 119789;
						}
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage3 = newMessage
			},
			handleChangeNewMessage4(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 119847;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 119841;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage4 = newMessage
			},
			handleChangeNewMessage5(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						if (codePoint == 66) {
							codePoint = 8492
						} else if (codePoint == 69) {
							codePoint = 8496
						} else if (codePoint == 70) {
							codePoint = 8497
						} else if (codePoint == 72) {
							codePoint = 8459
						} else if (codePoint == 73) {
							codePoint = 8464
						} else if (codePoint == 76) {
							codePoint = 8466
						} else if (codePoint == 77) {
							codePoint = 8499
						} else if (codePoint == 82) {
							codePoint = 8475
						} else {
							codePoint += 119899;
						}
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						if (codePoint == 101) {
							codePoint = 8495;
						} else if (codePoint == 103) {
							codePoint = 8458;
						} else if (codePoint == 111) {
							codePoint = 8500;
						} else {
							codePoint += 119893;
						}
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage5 = newMessage
			},
			handleChangeNewMessage6(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 119951;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 119945;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage6 = newMessage
			},
			handleChangeNewMessage7(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						if (codePoint == 67) {
							codePoint = 8493
						} else if (codePoint == 72) {
							codePoint = 8460
						} else if (codePoint == 73) {
							codePoint = 8465
						} else if (codePoint == 82) {
							codePoint = 8476
						} else if (codePoint == 90) {
							codePoint = 8488
						} else {
							codePoint += 120003;
						}
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 119997;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage7 = newMessage
			},
			handleChangeNewMessage8(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						if (codePoint == 67) {
							codePoint = 8450
						} else if (codePoint == 72) {
							codePoint = 8461
						} else if (codePoint == 78) {
							codePoint = 8469
						} else if (codePoint == 80) {
							codePoint = 8473
						} else if (codePoint == 81) {
							codePoint = 8474
						} else if (codePoint == 82) {
							codePoint = 8477
						} else if (codePoint == 90) {
							codePoint = 8484
						} else {
							codePoint += 120055;
						}
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120049;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage8 = newMessage
			},
			handleChangeNewMessage9(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120107;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120101;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage9 = newMessage
			},
			handleChangeNewMessage10(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120159;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120153;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage10 = newMessage
			},
			handleChangeNewMessage11(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120263;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120257;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage11 = newMessage
			},
			handleChangeNewMessage12(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120315;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120309;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage12 = newMessage
			},
			handleChangeNewMessage13(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120367;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120361;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage13 = newMessage
			},
			handleChangeNewMessage14(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120423;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120417;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage14 = newMessage
			},
			handleChangeNewMessage15(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120481;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120475;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage15 = newMessage
			},
			handleChangeNewMessage16(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120539;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120533;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage16 = newMessage
			},
			handleChangeNewMessage17(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120597;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120591;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage17 = newMessage
			},
			handleChangeNewMessage18(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120655;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120649;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage18 = newMessage
			},
			handleChangeNewMessage19(e) {
				var newMessage = '';
				for (var codePoint of e) {
					codePoint = codePoint.charCodeAt(0);
					// A - Z 转换
					if (codePoint >= 65 && codePoint <= 90) {
						codePoint += 120655;
						newMessage += String.fromCodePoint(codePoint);
					}
					// a - z 转换
					else if (codePoint >= 97 && codePoint <= 122) {
						codePoint += 120649;
						newMessage += String.fromCodePoint(codePoint);
					} else {
						newMessage += String.fromCodePoint(codePoint);
					}
				}
				this.newMessage19 = newMessage
			},
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.text-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		// flex-wrap: wrap;
		width: 100vw;

		view {
			width: 90vw;
			padding: 10upx;
			border: 1upx solid black;
			margin: 5upx;
			border-radius: 10upx;
			word-wrap: break-word;
		}
	}

	.tips {
		color: #cccccc;
	}

	.hover-text {
		animation: hover-animation .5s ease-in-out;
	}

	@keyframes hover-animation {
		0% {
			background: none;
		}

		50% {
			background: #55aaff;
		}

		100% {
			background: none;
		}
	}
</style>