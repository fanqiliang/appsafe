<template>
    <div>
        <el-aside width="240px" class="left-aside">
            <el-menu
                default-active="teacher-manage"
                class="el-menu-vertical-detail"
                :router="true"
            >
                <el-menu-item index="1">来访信息</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">基础数据</template>
                    <el-menu-item index="2-1">学生管理</el-menu-item>
                    <el-menu-item index="2-2">家长管理</el-menu-item>
                    <el-menu-item index="teacher-manage">教师管理</el-menu-item>
                    <el-menu-item index="2-3">班级管理</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">字典管理</template>
                        <el-menu-item index="2-4-1">字典细项</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2-3">设备管理</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .left-aside{
        height: 100%;
        background: #ffffff;
        border-right: 1px solid #d7dae2;

        /deep/ .el-menu{
            border-right: none;
        }
    }
</style>