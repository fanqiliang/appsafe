<template>
    <div>
        <div>系统信息</div>
        <el-divider></el-divider>
        <div style="padding-left: 60px">
            <div class="item-box flex flex-center">
                <div class="item-name">名称:</div>
                <div class="item-value">{{sysConfig.name}}</div>
            </div>
            <div class="item-box flex flex-center">
                <div class="item-name">版本号:</div>
                <div class="item-value">{{sysConfig.version}}</div>
            </div>
            <div class="item-box flex flex-center">
                <div class="item-name">处理器:</div>
                <div class="item-value">{{sysConfig.intel}}</div>
            </div>
            <div class="item-box flex flex-center">
                <div class="item-name">内存:</div>
                <div class="item-value">{{sysConfig.memory}}</div>
            </div>
            <div class="item-box flex flex-center">
                <div class="item-name">磁盘:</div>
                <div class="item-value">{{sysConfig.disk}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { byteWithUnitFloat } from '@/utils/util'

export default {

    data() {
        return {
            sysConfig: {
                name: '',
                version: '',
                intel: '',
                memory: '',
                disk: '',
            }
        }
    },

    computed: mapState({
		stateGlobal: state => state.global
    }),

    mounted() {
        this.sysConfig.name = this.stateGlobal.defaultSetting.name
        this.sysConfig.version = this.stateGlobal.defaultSetting.version
        this.querySystemInfo()
    },

    methods: {
        querySystemInfo() {
            this.$store.dispatch('system/querySystemInfo').then(res => {
                console.log(res);
                const { processorName, deskInfo, availableMemory, totalMemory } = res
                const parseAvailableMemory = byteWithUnitFloat(availableMemory)
                const parseTotalMemory = byteWithUnitFloat(totalMemory)
                this.sysConfig.intel = processorName
                this.sysConfig.memory = `${parseAvailableMemory.quota}${parseAvailableMemory.unit} 可用, 共 ${parseTotalMemory.quota}${parseTotalMemory.unit}`
                this.sysConfig.disk = deskInfo
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .item-box {
        height: 40px;
        font-size: 14px;

        .item-name {
            margin-right: 16px;
            width: 80px;
            text-align: right;
        }
    }
</style>