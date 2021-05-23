<template>
    <div>
        <el-dialog 
            :title="modalData.isEdit ? '编辑账号' : '新增账号'" 
            :visible="true" 
            :close-on-click-modal="false" 
            @close="close()"
            width="480px" 
            top="200px"
        >
            <div class="pr">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input v-model="ruleForm.confirmPassword" placeholder="请输入确认密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="权限" prop="role">
                        <el-select v-model="ruleForm.role" placeholder="请选择权限" style="width: 100%">
                            <el-option label="普通用户" :value="1"></el-option>
                            <el-option label="管理员" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="flex jcct">
                <el-button v-if="modalData.isEdit" type="primary" size="small" @click="submitForm('ruleForm', 'modify')">确 定</el-button>
                <el-button v-else type="primary" size="small" @click="submitForm('ruleForm', 'add')">创 建</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { createLoading, deepCopy } from '@/utils/util'

export default {
    props: ['modalData'],

    data() {
        return {
            ruleForm: {
                id: '',
                name: '',
                password: '',
                confirmPassword: '',
                role: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                confirmPassword: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                ],
                role: [
                    { required: true, message: '请选择权限', trigger: 'blur' },
                ],
            }
        }
    },

    watch: {
        'modalData': {
            handler(newValue, oldValue) {
                const { ruleForm } = newValue
                this.ruleForm = deepCopy(ruleForm)
            },
            deep: true,
            immediate: true
        }
    },

    methods: {
        submitForm(formName, type) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.password !== this.ruleForm.confirmPassword) {
                        this.$message.error('两次密码输入不一致');
                        return
                    }
                    const loading = createLoading()
                    this.$store.dispatch('system/addOrUpdateUser', this.ruleForm).then(res => {
                        loading.close()
                        this.$message.success('操作成功')
                        this.close(this.modalData.isEdit ? 'modify' : 'add')
                    }).catch(res => {
                        loading.close()
                    })
                }
            })
        },

        close(type) {
            this.$emit('close', type)
        },
    }
}
</script>

<style lang="less" scoped>

</style>