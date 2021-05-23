<template>
    <div>
        <div class="header-box flex flex-center pr">
            <el-button type="primary" @click="openUploadSoModal">新建任务</el-button>
        </div>
        <div class="table-box">
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column prop="name" label="文件名" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="size" label="文件大小" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{byteWithUnitFloat(scope.row.size).quota + byteWithUnitFloat(scope.row.size).unit}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="加固状态" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="flex flex-center">
                            <i class="el-icon-success status-green" v-if="scope.row.status === 3"></i>
                            <i class="el-icon-error status-red" v-if="scope.row.status === 4"></i>
                            <i class="el-icon-loading color-blue" v-if="scope.row.status !== 3 && scope.row.status !== 4"></i>
                            <span style="margin-left: 10px">
                                {{PROTECT_STATUS[scope.row.status]}}
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="startTime" label="开始时间" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{scope.row.startTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{scope.row.endTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-link v-if="scope.row.status === 4" type="warning" :underline="false" @click="reStartTask(scope.row)" style="margin-right: 16px">重新加固</el-link>
                        <!-- <el-link v-if="scope.row.status === 3" type="primary" :underline="false" @click="downloadPackage(scope.row)" style="margin-right: 16px"> -->
                        <el-dropdown v-if="scope.row.status === 3" @command="downloadPackage">
                            <el-link type="primary" :underline="false">下载</el-link>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="{id: scope.row.id, type: 0}">原文件</el-dropdown-item>
                                <el-dropdown-item :command="{id: scope.row.id, type: 0}">加固包</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-show="tableData.length > 0"
                @current-change="handleCurrentChange"
                :current-page="queryForm.currentPage"
                :page-size="queryForm.pageSize"
                :pager-count="7"
                layout="total, prev, pager, next"
                :total="queryForm.total">
            </el-pagination>
        </div>
        <upload-so-modal v-if="modal.uploadSoModal.show" @close="closeUploadSoModal"></upload-so-modal>
    </div>
</template>

<script>
import { PROTECT_STATUS } from '@/assets/config/constant'
import { byteWithUnitFloat } from '@/utils/util'
import uploadSoModal from '@/components/appManage/uploadSoModal'
import qs from 'qs'

export default {
    components: {
        uploadSoModal
    },

    data() {
        return {
            PROTECT_STATUS,
            queryForm: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
            },
            tableData: [],
            modal: {
                uploadSoModal: {
                    show: false
                }
            },
            queryInterval: null
        }
    },

    mounted() {
        this.getTableData()
        this.queryInterval = setInterval(() => {
            this.getTableData()
        }, 5000)
    },

    destroyed() {
        clearInterval(this.queryInterval)
    },

    methods: {
        byteWithUnitFloat(num) {
            return byteWithUnitFloat(num)
        },

        getTableData() {
            this.$store.dispatch('basic/querySoProtectList', {
                pageNo: this.queryForm.currentPage,
                pageSize: this.queryForm.pageSize,
            }).then(res => {
                this.tableData = res.records
                this.queryForm.currentPage = res.current
                this.queryForm.pageSize = res.size
                this.queryForm.total = res.total
            })
        },

        openUploadSoModal() {
            this.modal.uploadSoModal.show = true
        },

        closeUploadSoModal(type) {
            this.modal.uploadSoModal.show = false
            if (type === 'submit') {
                this.getTableData()
            }
        },

        reStartTask(row) {
            const { id } = row
            this.$confirm(`确认重新执行该任务?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(res => {
                this.$store.dispatch('basic/reStartSoProtectTask', {id}).then(res => {
                    this.$message.success('操作成功')
                    this.getTableData()
                })
            })
        },

        downloadPackage(info) {
            window.open(`/appsafe/so-shield/download?${qs.stringify(info)}`)
        },

        handleCurrentChange(v) {
            this.queryForm.currentPage = v
            this.getTableData()
        },
    }
}
</script>

<style lang="less" scoped>
    .status-green{
        color: #67C23A;
    }

    .status-red{
        color: #F56C6C;
    }

</style>