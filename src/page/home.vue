<template>
    <div>
		<global-header></global-header>
        <div class="container">
			<el-container>
				<el-aside width="240px" class="left-aside">
					<el-menu
						default-active=""
						class="el-menu-vertical-detail"
						:router="true"
						:unique-opened="true"
					>
						<template v-for="(item, i) in stateGlobal.navigators">
							<el-menu-item v-if="!item.children || item.children.length === 0" :index="item.href[0]" :key="i" class="menu-item" :class="item.active ? 'menu-select' : ''">
								<div class="menu-item-content">
									<i :class="item.icon" class="menu-icon"></i>
									<span slot="title">{{item.name}}</span>
								</div>
							</el-menu-item>
							<el-submenu v-else :index="item.href[0]" :key="i" :class="item.active ? 'sub-active' : ''">
								<template slot="title">
									<i :class="item.icon" class="menu-icon"></i>
									<span>{{item.name}}</span>
								</template>
								<el-menu-item v-for="(sub, subIndex) in item.children" :key="subIndex" :index="sub.href[0]" class="menu-item" :class="sub.active ? 'sub-menu-select' : ''">
									<div class="menu-item-content">
										<span slot="title">{{sub.name}}</span>
									</div>
								</el-menu-item>
							</el-submenu>
						</template>
					</el-menu>
				</el-aside>
				<el-container>
					<el-header class="fs14 color-n header-container flex flex-center pr">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item v-for="(item, index) in stateGlobal.crumbs" :key="index">{{item}}</el-breadcrumb-item>
						</el-breadcrumb>
					</el-header>
					<el-main class="main-container" v-loading="stateGlobal.mainLoading" element-loading-text="数据加载中，请耐心等待">
						<div class="main-content-container" ref="mainContentContainer" id="mainContentContainer">
							<router-view/>
						</div>
					</el-main>
				</el-container>
			</el-container>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import globalHeader from '@/components/globalHeader.vue'

export default {
	components: {
		globalHeader,
	},

	computed: mapState({
        stateGlobal: state => state.global,
	}),

	mounted() {
	},

}
</script>

<style lang="less" scoped>
    @import '../css/navigatorPage.less';
</style>