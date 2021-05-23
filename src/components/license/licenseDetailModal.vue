<template>
    <div>
        <el-dialog 
            title="license详情" 
            :visible="true" 
            custom-class="license-detail-modal"
            :close-on-click-modal="false" 
            @close="close()"
            width="480px" 
            top="200px"
        >
            <div class="pr">
                <el-form :model="licenseDetailData" ref="ruleForm" label-width="120px">
                    <el-form-item label="服务:">
                        {{LICENSE_SERVICE_TYPE[licenseDetailData.service]}}
                    </el-form-item>
                    <el-form-item label="开始时间:">
                        {{licenseDetailData.startTime || '-'}}
                    </el-form-item>
                    <el-form-item label="结束时间:">
                        {{licenseDetailData.endTime || '-'}}
                    </el-form-item>
                    <el-form-item label="服务个数:">
                        {{licenseDetailData.max}}
                    </el-form-item>
                </el-form>
            </div>
            <div class="flex jcct">
                <el-button type="primary" size="small" @click="submitForm">确定上传</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { LICENSE_SERVICE_TYPE } from '@/assets/config/constant'
import { createLoading, deepCopy } from '@/utils/util'

export default {
    props: ['licenseDetailData'],

    data() {
        return {
            LICENSE_SERVICE_TYPE,
        }
    },

    methods: {
        submitForm() {
            const loading = createLoading()
            this.$store.dispatch('system/uploadLicense', {
                license: this.licenseDetailData.license,
                service: this.licenseDetailData.service,
            }).then(res => {
                loading.close()
                this.$message.success('操作成功')
                this.close('modify')
            }).catch(res => {
                loading.close()
            })
        },

        close(type) {
            this.$emit('close', type)
        },
    }
}
</script>

<style lang="less" scoped>
    .el-dialog__wrapper{
        /deep/ .license-detail-modal{
            .el-dialog__body{
                border-top: 1px solid #d7dae2;
            }
        }
    }
</style>