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
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sysConfig: {
                name: 'AppSafe',
                version: 'v3.0',
                intel: 'Intel Xeon',
                memory: '300MB/1024MB',
            }
        }
    }
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