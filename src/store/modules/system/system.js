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
    queryOperationLog({commit}, payload) {
		return axios.get('/appsafe/operation-log', {
            params: {...payload}
        })
	},

	queryUserList({commit}, payload) {
		return axios.get('/appsafe/user', {
            params: {...payload}
        })
	},

    addOrUpdateUser({commit}, payload) {
        return axios.post('/appsafe/user', payload)
    },

    changeUserStatus({commit}, payload) {
        return axios.post('/appsafe/user/status', payload)
    },

    deleteUser({commit}, payload) {
        return axios.post('/appsafe/user/delete', payload)
    },

	queryLicenseList() {
		return axios.get('/appsafe/license')
	},

	queryLicenseDetailData({commit}, payload) {
		return axios.post('/appsafe/license/parse', payload)
	},

	uploadLicense({commit}, payload) {
		return axios.post('/appsafe/license/upload', payload)
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
