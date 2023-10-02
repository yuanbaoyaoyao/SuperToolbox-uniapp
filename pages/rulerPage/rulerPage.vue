<template>
	<view class="scroll-con" :style="{width: scrollWid}">
		<!-- 这个是线 -->
		<!-- 根据item.type来设定线的长度 -->
		<view class="topLine">
			<!-- 这里控制线 -->
			<view class="allLine" :style="{'marginRight': maginL + 'px'}" :class="item.type"
				v-for="(item,index) in scrollList" :key="index"></view>
		</view>
		<!-- 这个是数字 -->
		<view class="bottomNum" :style="{'paddingLeft': allNumLeft}">
			<text class="allNum" :style="{width: (maginL + 2) * 10 + 'px',left: -((maginL + 2) * 5) + 'px'}"
				v-for="(item,index) in scrollNumList" :key="index">
				{{item}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ScrollChoose',
		data() {
			return {
				/**
				 * 初始值（注意：初始值应在起始值和终止值之间）
				 */
				scrollLeft: 0,
				/**
				 * 滚动区域起始值（注意：起始值不能大于终止值）
				 */
				scrollStart: 0,
				/**
				 * 滚动区域终止值
				 */
				scrollEnd: 100,
				/**
				 * 线间距
				 */
				maginL: 5,
				scrollList: [],
				scrollNumList: [],
				scrollWid: '100vw',
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				for (let i = this.scrollStart; i < (this.scrollEnd + 1); i++) {
					let _line = {};
					if (i % 5 == 0) {
						if (i % 10 == 0) {
							this.scrollNumList.push(i);
							_line.type = 'LLine'
						} else {
							_line.type = 'MLine'
						}
					} else {
						_line.type = 'SLine'
					}
					this.scrollList.push(_line);
				}
				//设置间距
				this.scrollWid = uni.upx2px(750) + (this.scrollEnd - this.scrollStart) * (this.maginL + 2) + 'px';
				console.log("this.scrollWid:", this.scrollWid)
				console.log("uni.upx2px(750):", uni.upx2px(750))
				console.log("this.maginL:", this.maginL)
				if (this.scrollStart % 10 != 0) {
					if (this.scrollStart > 0) {
						this.allNumLeft = (10 - this.scrollStart % 10) * (this.maginL + 2) + uni.upx2px(372) + 'px';
					} else {
						this.allNumLeft = Math.abs(this.scrollStart % 10) * (this.maginL + 2) + uni.upx2px(372) + 'px';
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	@charset "UTF-8";



	.scroll-con {
		background: #f8f8f8;
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #ccc;
		margin: 10px 0;
		width: 750rpx;
		// width: 1000rpx;
		height: 70px;

		.topLine {
			height: 30px;
			// padding: 0 372rpx;
		}

		.bottomNum {
			height: 30px;
			// padding: 0 0 0 372rpx;
			width: 100%;

			.allNum {
				display: inline-block;
				position: relative;
				text-align: center;
			}
		}

		.allLine {
			display: inline-block;
			width: 2px;
			background: #999;
			position: relative;
		}

		.allLine:last-child {
			margin-right: 0px !important;
		}

		.LLine {
			height: 30px;
		}

		.MLine {
			height: 20px;
			top: -10px;
		}

		.SLine {
			height: 15px;
			top: -15px;
		}
	}
</style>