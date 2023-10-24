import {
	createStore
} from 'vuex'
const store = createStore({
	state: {
		platform: '',
		screenWidth: '',
		screenHeight: ''
	},
	mutations: {
		setPlatform(state, platform) {
			// 变更状态
			state.platform = platform
		},
		setScreenWidth(state, screenWidth) {
			state.screenWidth = screenWidth
		},
		setScreenHeight(state, screenHeight) {
			state.screenHeight = screenHeight
		}
	},
	getters: {
		platform(state) {
			return state.platform
		},
		screenWidth(state) {
			return state.screenWidth
		},
		screenHeight(state) {
			return state.screenHeight
		}
	}
})
export default store