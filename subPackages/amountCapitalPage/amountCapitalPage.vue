<template>
	<view class="amount">
		<defaultInput :placeholder="'请输入数字金额'" @changeInput="handleChangeTextValue" />
		<view class="amount-value-container">
			<view class="amount-value" v-show="capital!=null&&capital!='元'" @tap="handleCopy">大写：{{capital}}</view>
		</view>
		<view class="tips">提示:点击大写金额即可复制信息。</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				capital: null,
				showClearIcon: false,
				inputClearValue: '',
			}
		},
		methods: {
			handleCopy() {
				if (this.capital != null && this.capital != '超过限制或出现错误') {
					uni.setClipboardData({
						data: this.capital, // 必须字符串
						success: function() {
							uni.showToast({
								title: "复制成功",
							})
						}
					});
				}
			},
			handleChangeTextValue(e) {
				this.capital = this.transform(e)
			},
			transform(tranvalue) {
				try {
					var i = 1;
					var dw2 = new Array("", "万", "亿"); //大单位
					var dw1 = new Array("拾", "佰", "仟"); //小单位
					var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
					//以下是小写转换成大写显示在合计大写的文本框中    
					//分离整数与小数
					var source = new Array('', '');
					temp = tranvalue.split(".");
					for (var i = 0; i < temp.length; i++) {
						source[i] = temp[i];
					}
					var num = source[0];
					var dig = source[1];
					//转换整数部分
					var k1 = 0; //计小单位
					var k2 = 0; //计大单位
					var sum = 0;
					var str = "";
					var len = source[0].length; //整数的长度
					for (i = 1; i <= len; i++) {
						var n = source[0].charAt(len - i); //取得某个位数上的数字
						var bn = 0;
						if (len - i - 1 >= 0) {
							bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
						}
						sum = sum + Number(n);
						if (sum != 0) {
							str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
							if (n == '0') sum = 0;
						}
						if (len - i - 1 >= 0) { //在数字范围内
							if (k1 != 3) { //加小单位
								if (bn != 0) {
									str = dw1[k1].concat(str);
								}
								k1++;
							} else { //不加小单位，加大单位
								k1 = 0;
								var temp = str.charAt(0);
								if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
									str = str.substr(1, str.length - 1);
								str = dw2[k2].concat(str);
								sum = 0;
							}
						}
						if (k1 == 3) //小单位到千则大单位进一
						{
							k2++;
						}
					}
					//转换小数部分
					var strdig = "";
					if (dig != "") {
						var n = dig.charAt(0);
						if (n != 0) {
							strdig += dw[Number(n)] + "角"; //加数字
						}
						var n = dig.charAt(1);
						if (n != 0) {
							strdig += dw[Number(n)] + "分"; //加数字
						}
					}
					str += "元" + strdig;
				} catch (e) {
					return "超过限制或出现错误";
				}
				return str;
			}
		}
	}
</script>

<style lang="scss">
	.amount {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.amount-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #c8c8c8;
		height: 80upx;
		padding: 20upx;
		padding-left: 40upx;
		padding-right: 40upx;
		border-radius: 20upx;
		margin-bottom: 20upx;
		width: 80%;

		image {
			width: 50upx;
			height: 50upx;
		}
	}

	.amount-value-container {
		height: 300upx;
		width: 80%;
	}

	.tips {
		color: #cccccc;
	}
</style>