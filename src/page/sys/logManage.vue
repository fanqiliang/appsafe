<template>
    <div>
        <div class="header-box flex flex-center">
            <span style="margin-right: 12px">用户名:</span>
            <el-input v-model="queryForm.name" size="small" style="width: 160px;margin-right: 20px"></el-input>
            <span style="margin-right: 12px">时间:</span>
            <el-date-picker
                size="small"
                v-model="queryForm.timeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" size="small" style="margin-left: 12px" @click="submitForm">查询</el-button>
        </div>
        <div class="table-box">
            <el-table
                :data="logData.list"
                style="width: 100%"
                class="operation-log-table"
                >
                <el-table-column prop="userName" label="用户名" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="time" label="操作时间" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{scope.row.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作日志" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
            <el-pagination
                v-show="logData.list.length > 0"
                @current-change="handleCurrentChange"
                :current-page="queryForm.currentPage"
                :page-size="queryForm.pageSize"
                :pager-count="7"
                layout="total, prev, pager, next"
                :total="logData.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryForm: {
                name: '',
                timeRange: [],
                currentPage: 1,
                pageSize: 10,
            },
            logData: {
                total: 0,
                list: []
            },
        }
    },

    mounted() {
        this.getLogList()
    },

    methods: {
        getLogList() {
            const { currentPage, pageSize, name } = this.queryForm
            this.$store.dispatch('system/queryOperationLog', {
                userName: name,
                startTime: (this.queryForm.timeRange && this.queryForm.timeRange[0]) ? new Date(this.queryForm.timeRange[0]).getTime() : null,
                endTime: (this.queryForm.timeRange && this.queryForm.timeRange[1]) ? new Date(this.queryForm.timeRange[1]).getTime() : null,
                pageN0: currentPage,
                pageSize: pageSize,
            }).then(res => {
                this.logData.list = res.records
                this.queryForm.currentPage = res.current
                this.queryForm.pageSize = res.size
                this.logData.total = res.total
            })
        },

        submitForm() {
            this.queryForm.currentPage = 1
            this.getLogList()
        },

        handleCurrentChange(v) {
            this.queryForm.currentPage = v
            this.getLogList()
        },

    }
}
</script>

<style lang="less" scoped>
    @import './common.less';
</style>