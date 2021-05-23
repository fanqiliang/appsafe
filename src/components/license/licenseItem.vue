<template>
    <div class="license-box">
        <div>{{LICENSE_SERVICE_TYPE[licenseData.service]}}</div>
        <el-divider></el-divider>
        <div class="body-box">
            <div class="flex flex-center" style="margin-bottom: 20px">
                <div style="margin-right: 200px">
                    <span>有效期:</span>
                    <span>{{licenseData.startTime}}-{{licenseData.endTime}}</span>
                </div>
                <div>
                    <span>可用数:</span>
                    <span>{{licenseData.used}}/{{licenseData.max}}</span>
                </div>
            </div>
            <div class="flex flex-center">
                <el-input v-model="licenseText" placeholder="license" class="license-input"></el-input>
                <el-button type="primary" @click="getLicenseDetail">解析</el-button>
            </div>
        </div>
        <license-detail-modal v-if="licenseDetailModal.show" :licenseDetailData="licenseDetailModal.data" @close="closeLicenseDetailModal"></license-detail-modal>
    </div>
</template>

<script>
import { LICENSE_SERVICE_TYPE } from '@/assets/config/constant'
import licenseDetailModal from '@/components/license/licenseDetailModal'

export default {
    props: ['licenseData'],

    components: {
        licenseDetailModal
    },

    data() {
        return {
            LICENSE_SERVICE_TYPE,
            licenseText: '',
            licenseDetailModal: {
                show: false,
                data: {}
            }
        }
    },

    methods: {
        getLicenseDetail() {
            this.$store.dispatch('system/queryLicenseDetailData', {
                license: this.licenseText,
                service: this.licenseData.service,
            }).then(res => {
                this.licenseDetailModal.show = true
                this.licenseDetailModal.data = res
            })
        },

        closeLicenseDetailModal(type) {
            this.licenseDetailModal.show = false
            if (type === 'modify') {
                this.getLicenseDetail()
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .license-box {
        // border: 1px solid #d7dae2;

        .body-box {
            .license-input {
                width: 480px;
                margin-right: 20px;
            }
        }

        &+.license-box {
            margin-top: 80px;
        }
    }
</style>