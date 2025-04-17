import { createWebHistory, createRouter } from 'vue-router'
import AuthPage from '../pages/AuthPage.vue'
import ChatPage from '../pages/ChatPage.vue'

const routes = [
	{ path: '/', component: AuthPage },
	{ path: '/chat', component: ChatPage },
]

export default createRouter({
	history: createWebHistory(),
	routes,
})
