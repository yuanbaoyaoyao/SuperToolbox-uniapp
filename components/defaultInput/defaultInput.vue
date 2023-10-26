<template>
	<view class="default-input">
		<input :placeholder="placeholder" :value="inputValue" @input="setInputValue" />
		<image v-if="inputValue!=''" @click="clearInputValue" src="../../static/amountCapital/delete.svg" />
	</view>
</template>

<script>
	export default {
		name: "defaultInput",

		props: {
			placeholder: {
				type: String,
				default: '请输入'
			},
		},
		data() {
			return {
				inputValue: ""
			}
		},
		methods: {
			setInputValueFirst(e) {
				this.inputValue = e
			},
			setInputValue(event) {
				this.inputValue = event.detail.value
				this.$emit('changeInput', this.inputValue)
			},
			clearInputValue() {
				this.inputValue = ""
				this.$emit('changeInput', this.inputValue)
			},
		}
	}
</script>

<style lang="scss">
	.default-input {
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
		width: 80vw;

		input {
			width: 70vw;
		}

		image {
			width: 50upx;
			height: 50upx;
		}
	}
</style>