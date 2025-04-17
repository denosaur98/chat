import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
	state() {
		return {
			filesData: null,
		}
	},
	mutations: {
		SET_FILES(state, data) {
			state.filesData = data
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
	},
})
