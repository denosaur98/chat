import { createStore } from 'vuex'
import axios from 'axios'

function loadState() {
	try {
		const serializedState = localStorage.getItem('vuex-auth')
		return serializedState ? JSON.parse(serializedState) : { isAuthorized: false, userData: {} }
	} catch (e) {
		console.error(e)
		return {
			isAuthorized: false,
			userData: {},
		}
	}
}

export default createStore({
	state: loadState(),
	mutations: {
		SET_AUTH(state, { isAuthorized, userData }) {
			state.isAuthorized = isAuthorized
			state.userData = userData || {}
			localStorage.setItem(
				'vuex-auth',
				JSON.stringify({
					isAuthorized: state.isAuthorized,
					userData: state.userData,
				})
			)
		},
		RESET_STATE(state) {
			state.isAuthorized = false
			state.userData = {}
			localStorage.removeItem('vuex-auth')
		},
	},
	actions: {
		async registration(_, payload) {
			try {
				const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/registration`, {
					name: payload.name,
					email: payload.mail,
					password: payload.password,
				})
				return response.data
			} catch (e) {
				console.error(e)
			}
		},

		async fetchFiles() {
			try {
				const response = await axios.get(`${process.env.VUE_APP_API_URL}/files`)
				return response.data
			} catch (e) {
				console.error(e)
			}
		},

		async fetchMessages() {
			try {
				const response = await axios.get(`${process.env.VUE_APP_API_URL}/messages`)
				return response.data
			} catch (e) {
				console.error(e)
			}
		},

		async sendMessage(_, messageText) {
			try {
				return await axios.post(`${process.env.VUE_APP_API_URL}/messages`, {
					text: messageText,
					isMine: true,
				})
			} catch (e) {
				console.error(e)
			}
		},
	},
})
