import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

let v = new Vue();

const state = {
}

// getters
const getters = {}

// actions
const actions = {
	login({commit}, payload) {
		const { name } = payload
		return axios.post('/appsafe/login', payload).then(res => {
			const { role, menus, token } = res
			sessionStorage.setItem('username', name)
			sessionStorage.setItem('menus', JSON.stringify(menus))
			sessionStorage.setItem('role', role)
			commit('global/setNavigatorByPermission', null, {root: true})
			// window.location.href = '#/web/app/so-protect'
		})
	},

	logout({commit}) {
		return axios.post('/appsafe/logout').then(res => {
			commit('clearUserSessionStorage')
			window.location.href = '#/login'
		})
	},
}

// mutations
const mutations = {
	setState(state, payload) {
		for (const key in payload) {
			if (payload.hasOwnProperty(key)) {
				const value = payload[key];
				state[key] = value
			}
		}
	},

	clearUserSessionStorage() {
		sessionStorage.removeItem('username')
		sessionStorage.removeItem('menus')
		sessionStorage.removeItem('role')
	},

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
