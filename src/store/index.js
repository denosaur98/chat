import { createStore } from 'vuex'
import axios from 'axios'

const getDefaultState = () => ({
	filesData: {},
	isAuthorized: false,
	userData: {},
})

export default createStore({
	state: getDefaultState,
	mutations: {
		SET_FILES(state, data) {
			state.filesData = data
		},
		SET_AUTH(state, payload) {
			state.isAuthorized = payload.isAuthorized
			state.userData = payload.userData
		},
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
	},
	actions: {
		async fetchFiles({ commit }) {
			try {
				const response = await axios.get(`${process.env.VUE_APP_API_URL}/files`)
				commit('SET_FILES', response.data)
				return response.data
			} catch (e) {
				console.error(e)
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
	},
})
