import {
	createStore
} from 'vuex'
const store = createStore({
	state: {
		platform: ''
	},
	mutations: {
		setPlatform(state, platform) {
			// 变更状态
			state.platform = platform
		}
	}
})
export default store