<template>
    <div>
        <el-dialog 
            title="新建任务" 
            :visible="true" 
            :close-on-click-modal="false" 
            @close="close()"
            width="580px" 
            top="200px"
        >
            <div class="pr">
                <el-form :model="ruleForm" ref="ruleForm" label-width="120px" size="small">
                    <el-form-item label="文件名" prop="name">
                        <div class="flex flex-center">
                            <el-input v-model="ruleForm.name" class="form-item-input" :disabled="true"></el-input>
                            <el-upload
                                class="upload-demo"
                                action="/appsafe/so-shield/upload"
                                :on-change="onChangeFileUpload"
                                :on-progress="onFileProgress"
                                :show-file-list="false"
                                >
                                <span v-if="uploadStatus === STATUS_TYPE.processing" class="color-blue">{{filePercent}}%</span>
                                <el-button v-else size="small" type="primary">上传</el-button>
                            </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item label="文件大小" prop="size">
                        <el-input v-model="ruleForm.size" class="form-item-input" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="flex jcct">
                <el-button type="primary" size="small" @click="submitTask" :disabled="disableStartBtn">开始加固</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { createLoading, deepCopy } from '@/utils/util'
import { byteWithUnitFloat } from '@/utils/util'

const STATUS_TYPE = {
    'empty' : 0,
    'processing' : 1,
    'error' : 2,
    'success' : 3,
}

export default {
    props: ['modalData'],

    data() {
        return {
            STATUS_TYPE,
            ruleForm: {
                id: '',
                name: '',
                size: '',
            },
            filePercent: 0,
            uploadStatus: STATUS_TYPE.empty,
            disableStartBtn: true,
        }
    },

    methods: {
        submitTask() {
            const loading = createLoading()
            this.$store.dispatch('basic/submitSoProtectTask', {
                id: this.ruleForm.id
            }).then(res => {
                this.close('submit')
                loading.close()
            }).catch(res => {
                loading.close()
            })
        },

        byteWithUnitFloat(num) {
            return byteWithUnitFloat(num)
        },

        onFileProgress(e, file) {
            const { percentage } = file
            this.filePercent = percentage.toFixed(0)
            if (percentage < 100) {
                this.disableStartBtn = true
                this.uploadStatus = STATUS_TYPE.processing
            }
        },

        onChangeFileUpload(file, fileList) {
            const { percentage } = file
            if (percentage === 100) {
                const { response } = file
                const { code, data, msg } = response
                if (code !== 0) {
                    this.$message.error(msg)
                    this.uploadStatus = STATUS_TYPE.error
                } else {
                    this.disableStartBtn = false
                    this.uploadStatus = STATUS_TYPE.success
                    this.ruleForm = data
                    this.ruleForm.size = this.byteWithUnitFloat(data.size).quota + this.byteWithUnitFloat(data.size).unit
                }
            }
        },

        close(type) {
            this.$emit('close', type)
        },
    }
}
</script>

<style lang="less" scoped>
    .form-item-input {
        width: 300px;
        margin-right: 20px;
    }
</style>