import { createWebHistory, createRouter } from 'vue-router'
import AuthPage from '../pages/AuthPage.vue'
import ChatPage from '../pages/ChatPage.vue'
import store from '../store/index'

const routes = [
	{ path: '/', component: AuthPage },
	{ path: '/chat', component: ChatPage },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const isAuthorized = store.state.isAuthorized

	if (to.path === '/' && isAuthorized) {
		return next('/chat')
	}

	if (to.path === '/chat' && !isAuthorized) {
		return next('/')
	}

	next()
})

export default router
