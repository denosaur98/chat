import { createWebHistory, createRouter } from 'vue-router'
import ChatPage from '../pages/ChatPage.vue'

const routes = [{ path: '/', component: ChatPage }]

export default createRouter({
	history: createWebHistory(),
	routes,
})
