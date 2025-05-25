import { createStore } from 'vuex'
import axios from 'axios'

function loadState() {
	try {
		const serializedState = localStorage.getItem('vuex-auth')
		return serializedState ? JSON.parse(serializedState) : { isAuthorized: false, userData: {}, loginErrorMessage: null }
	} catch (e) {
		console.error(e)
		return {
			isAuthorized: false,
			loginErrorMessage: null,
			userData: {},
		}
	}
}

export default createStore({
	state: loadState(),
	mutations: {
		SET_AUTH(state, { isAuthorized, userData }) {
			state.isAuthorized = isAuthorized
			state.userData = {
				...state.userData,
				...userData,
				name: userData.name || state.userData.name || userData.email.split('@')[0]
			}
			localStorage.setItem(
				'vuex-auth',
				JSON.stringify({
					isAuthorized: state.isAuthorized,
					userData: state.userData,
				})
			)
		},
		SET_LOGIN_ERROR(state, message) {
			state.loginErrorMessage = message
		},
		RESET_STATE(state) {
			state.isAuthorized = false
			state.userData = {}
			localStorage.removeItem('vuex-auth')
		},
	},
	actions: {
		async registration({ commit }, payload) {
			try {
				const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/registration`, {
					name: payload.name,
					email: payload.email,
					password: payload.password,
				})
				commit('SET_LOGIN_ERROR', null)
				return response.data
			} catch (e) {
				const errorMessage = e.response?.data?.message
				commit('SET_LOGIN_ERROR', errorMessage)
				console.error(errorMessage)
				throw errorMessage
			}
		},

		async auth({ commit }, payload) {
			try {
				const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, {
					email: payload.email,
					password: payload.password,
				})
				commit('SET_AUTH', {
					isAuthorized: true,
					userData: {
						...response.data.userData,
						accessToken: response.data.accessToken,
					},
				})
				commit('SET_LOGIN_ERROR', null)
				return response.data
			} catch (e) {
				const errorMessage = e.response?.data?.message
				commit('SET_LOGIN_ERROR', errorMessage)
				console.error(errorMessage)
				throw errorMessage
			}
		},

		async update({ commit, state }, payload) {
			try {
				const response = await axios.patch(
					`${process.env.VUE_APP_API_URL}/auth/update`,
					{
						name: payload.name,
						email: payload.email,
						password: payload.password,
					},
					{
						headers: {
							Authorization: `Bearer ${state.userData.accessToken}`,
						},
						withCredentials: true,
					}
				)
				commit('SET_AUTH', {
					isAuthorized: true,
					userData: {
						...state.userData,
						...response.data.userData,
						name: payload.name || state.userData.name,
						email: payload.email || state.userData.email,
					},
				})
				commit('SET_LOGIN_ERROR', null)
				return response.data
			} catch (e) {
				const errorMessage = e.response?.data?.message
				commit('SET_LOGIN_ERROR', errorMessage)
				console.error(errorMessage)
				throw errorMessage
			}
		},

		async logout() {
			try {
				const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/logout`, {}, { withCredentials: true })
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
