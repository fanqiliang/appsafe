import axios from 'axios'
import { deepCopy } from '@/utils/util'
import defaultSetting from '@/assets/config/defaultSetting'

// const commonNavigators = [
//     {
//         name: '统计概览',
//         href: ['/web/overview'],
//         active: false,
//     },
// ]

const basicNavigators = 
    {
        name: '应用管理',
        href: ['/app'],
        active: false,
        children: [
            {
                name: 'SDK加固',
                namePrivilege: 'sdkShield',
                href: ['/web/app/sdk-protect'],
                active: false,
            },
            {
                name: 'SO加固',
                namePrivilege: 'soShield',
                href: ['/web/app/so-protect'],
                active: false,
            },
        ]
    }


const systemNavigators = 
    {
        name: '系统管理',
        href: ['/web/sys'],
        active: false,
        children: [
            {
                name: '用户管理',
                href: ['/web/sys/user-manage'],
                active: false,
            },
            {
                name: 'License管理',
                href: ['/web/sys/license-manage'],
                active: false,
            },
            {
                name: '日志管理',
                href: ['/web/sys/log-manage'],
                active: false,
            },
            {
                name: '关于系统',
                href: ['/web/sys/about'],
                active: false,
            },
        ]
    }


let navigators = [
    basicNavigators,
    systemNavigators,
]

const state = {
    mainLoading: false,
    navigators: [...navigators],
    permissionNavigators: [],
    defaultSetting,
    globalConfig: window.globalConfig,
    userName: '',
    userRole: '',
    crumbs: [],
}

// getters
const getters = {
	
}

// actions
const actions = {
    
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

    setNavigatorByPermission(state, payload) {
        const role = sessionStorage.getItem('role')
        const menus = JSON.parse(sessionStorage.getItem('menus'))
        const basicChildren = basicNavigators.children.filter(v => menus.indexOf(v.namePrivilege) !== -1)
        const newBasicNavigators = {
            ...basicNavigators,
            children: basicChildren
        }
        let result = []
        if (role === '1') {
            result = [newBasicNavigators]
        } else {
            result = [newBasicNavigators, systemNavigators]
        }
        state.navigators = deepCopy(result)
        window.location.href = '#' + basicChildren[0].href
    },

    setActiveMenu(state, payload) {
        state.crumbs = []
        state.navigators.forEach(v => {
            v.active = false
            if (v.children && v.children.length > 0) {
                let hasActive = false
                v.children = v.children.map(k => {
                    k.active = false
                    if (k.href.indexOf(payload) !== -1) {
                        k.active = true
                        hasActive = true
                        state.crumbs.push(k.name)
                    }
                    return k
                })
                if (hasActive) {
                    v.active = true
                    state.crumbs.unshift(v.name)
                }
            } else if (v.href.indexOf(payload) !== -1) {
                v.active = true
                state.crumbs.push(v.name)
            }
        });
    },
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
