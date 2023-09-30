<template>
	<view class="content">
		<view class="content-title">超级工具箱</view>
		<view class="content-description">您的超级助手</view>
		<view class="content-details">
			<router-link to="pages/rulerPage/rulerPage" class="content-detail">
				尺子
			</router-link>
			<router-link to="pages/protractorPage/protractorPage" class="content-detail">
				量角器
			</router-link>
			<router-link to="pages/gradienterPage/gradienterPage" class="content-detail">
				水平仪
			</router-link>
			<router-link to="pages/compassPage/compassPage" class="content-detail">
				指南针
			</router-link>
			<router-link to="pages/decibelMeterPage/decibelMeterPage" class="content-detail">
				分贝仪
			</router-link>
			<router-link to="pages/altitudePage/altitudePage" class="content-detail">
				海拔仪
			</router-link>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding:10rpx;
	}
	.content-title{
		
	}
	.content-details{
		display: grid;
		grid-template-columns: 1fr 1fr; 
		width: 100%;
		justify-items: center;
	}
	.content-detail{
		padding: 30rpx;
		background-color: aquamarine;
		text-align: center;
		border-radius: 10rpx;
		margin:10rpx;
	}
</style>
