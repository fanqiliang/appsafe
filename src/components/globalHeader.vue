<template>
    <div class="header">
        <div class="title">
            <div class="w100 h100 flex flex-center pr">
                <div class="logo-png flex flex-center">
                    <span class="flex flex-center">
                        <!-- <img :src="require('@/assets/img/login/logo.png')" alt="" class="header-logo-img" style=""> -->
                        <span class="title-zh">{{stateGlobal.globalConfig && stateGlobal.globalConfig.name || stateGlobal.defaultSetting.name}}</span>
                    </span>
                </div>
                <div class="right flex flex-center h100">
                    <div class="version-box" style="margin-right: 24px">
                        系统版本:&nbsp;&nbsp;{{stateGlobal.defaultSetting.version}}
                    </div>
                    <div class="user-name version-box" @mouseenter="showUserBtn" @mouseleave="hideUserBtn">
                        <div v-if="userBtnShow" class="hover-box">
                            <div class="hover-item logout" @click="logout">安全退出</div>
                        </div>
                        <span>
                            <i class="el-icon-s-custom"></i>&nbsp;{{getCurrentUser()}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getCurrentUser } from '@/utils/util'

export default {
    computed: mapState({
		stateGlobal: state => state.global
    }),

    data() {
		return {
			userBtnShow: false,
		}
    },
    
    methods: {
        goIndex() {
            this.$router.push({path: '/'})
		},

		getCurrentUser() {
			return getCurrentUser()
		},
		
		showUserBtn() {
			this.userBtnShow = true
		},

		hideUserBtn() {
			this.userBtnShow = false
		},

		logout() {
			this.$confirm('是否确认退出当前账号?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('home/logout')
            })
		},

		goPage(url) {
            let {protocol, hostname} = location
            window.location.href = `${protocol}//${hostname}:${url}`
		},
		
    }
}
</script>

<style lang="less" scoped>
    .header {
		color: #f2fafa;
		height: 64px;
		line-height: 64px;
		width: 100%;
		min-width: 1000px;
		// min-width: 1260px;
		background-color: #0d4f8a;
		font-size: 19px;
	}
	
	.help-img{
		width: 14px;
		height: 14px;
		margin: 0 25px;
	}

    .title {
		// min-width: 1260px;
		padding-left: 40px;
		margin: auto;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		align-content: center;

		.logo-png{
			height: 64px;
		}

		.title-zh{
			box-sizing: border-box;
			line-height: normal;
			font-size: 16px;
		}

		.version-box{
			font-size: 12px;
			text-align: center;
			position: relative;
		}

		.user-name{
			padding: 0 24px;
			background: #1e64a5;
			margin-right: 16px;
			min-width: 100px;
		}

		.entry-span{
			&:hover{
				color: #409EFF;
			}
		}

		.header-logo-img{
			height: 21px;
			margin-right:8px;
			vertical-align: text-bottom;
		}

		.hover-box{
			position: absolute;
			z-index: 100;
			right: 0;
			top: 64px;
			padding-top: 2px;
			width: 120px;
			color: #f2fafa;

			.logout{
				// border-top: 1px solid rgba(255,255,255,.45);
			}

			.hover-item{
				height: 40px;
				line-height: 40px;
				background: #1e64a5;
				cursor: pointer;

				&:hover{
					background: #299bff;
				}
			}
			
		}
    }
</style>