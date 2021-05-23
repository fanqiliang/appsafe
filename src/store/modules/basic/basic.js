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
    querySoProtectList({commit}, payload) {
		return axios.get('/appsafe/so-shield', {
            params: {...payload}
        })
	},

	submitSoProtectTask({commit}, payload) {
		return axios.post('/appsafe/so-shield/start', payload)
	},

	reStartSoProtectTask({commit}, payload) {
		return axios.post('/appsafe/so-shield/reStart', payload)
	},

	querySdkProtectList({commit}, payload) {
		return axios.get('/appsafe/sdk-shield', {
            params: {...payload}
        })
	},

	submitSdkProtectTask({commit}, payload) {
		return axios.post('/appsafe/sdk-shield/start', payload)
	},

	reStartSdkProtectTask({commit}, payload) {
		return axios.post('/appsafe/sdk-shield/reStart', payload)
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

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
