<template>
    <div>
        <div class="header-box flex flex-center pr">
            <el-button type="primary" @click="openAddUserModal">新增账号</el-button>
        </div>
        <div class="table-box">
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column prop="name" label="账号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="role" label="权限" width="160" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ROLE_TYPE[scope.row.role]}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="160" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div class="flex flex-center">
                            <div class="status-circle" :class="scope.row.status ? 'status-green' : 'status-red'"></div>
                            <div>{{scope.row.status ? '启用中' : '禁用中'}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="240" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{scope.row.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-link type="primary" :underline="false" @click="editUser(scope.row)" style="margin-right: 16px">编辑</el-link>
                        <el-link type="primary" :underline="false" @click="deleteUser(scope.row)" style="margin-right: 16px">删除</el-link>
                        <el-link v-if="scope.row.status" type="danger" :underline="false" @click="changeUserStatus(scope.row)">禁用</el-link>
                        <el-link v-else type="primary" :underline="false" @click="changeUserStatus(scope.row)">启用</el-link>
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
        <add-user-modal v-if="modal.addUser.show" :modalData="modal.addUser.data" @close="closeAddUserModal"></add-user-modal>
    </div>
</template>

<script>
import { ROLE_TYPE } from '@/assets/config/constant'
import addUserModal from '@/components/userManage/addUserModal.vue'

export default {
    components: {
        addUserModal
    },

    data() {
        return {
            ROLE_TYPE,
            queryForm: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
            },
            tableData: [],
            modal: {
                addUser: {
                    show: false,
                    data: {
                        isEdit: false,
                        ruleForm: {},
                    }
                }
            }
        }
    },

    mounted() {
        this.getUserList()
    },

    methods: {
        getUserList() {
            this.$store.dispatch('system/queryUserList', {
                pageNo: this.queryForm.currentPage,
                pageSize: this.queryForm.pageSize,
            }).then(res => {
                this.tableData = res.records
                this.queryForm.currentPage = res.current
                this.queryForm.pageSize = res.size
                this.queryForm.total = res.total
            })
        },

        editUser(row) {
            const { id, name, role } = row
            this.modal.addUser.show = true
            this.modal.addUser.data = {
                isEdit: true,
                ruleForm: {
                    id,
                    name,
                    password: '',
                    confirmPassword: '',
                    role
                }
            }
        },

        deleteUser(row) {
            const { id } = row
            this.$confirm(`确认删除该用户?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(res => {
                this.$store.dispatch('system/deleteUser', {id}).then(res => {
                    this.$message.success('操作成功')
                    this.getUserList()
                })
            })
        },

        changeUserStatus(row) {
            const { id, status } = row
            this.$confirm(`确认${status ? '禁用' : '启用'}该用户?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(res => {
                this.$store.dispatch('system/changeUserStatus', {id}).then(res => {
                    this.$message.success('操作成功')
                    this.getUserList()
                })
            })
        },

        openAddUserModal() {
            this.modal.addUser.show = true
            this.modal.addUser.data = {
                isEdit: false,
                ruleForm: {
                    id: '',
                    name: '',
                    password: '',
                    confirmPassword: '',
                    role: 1
                }
            }
        },

        closeAddUserModal(type) {
            this.modal.addUser.show = false
            if (type === 'add' || type === 'modify') {
                this.getUserList()
            }
        },

        handleCurrentChange(v) {
            this.queryForm.currentPage = v
            this.getUserList()
        },
    }
}
</script>

<style lang="less" scoped>
    @import './common.less';

    .status-circle{
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-right: 6px;
    }

    .status-green{
        background: #67C23A;
    }

    .status-red{
        background: #F56C6C;
    }
</style>