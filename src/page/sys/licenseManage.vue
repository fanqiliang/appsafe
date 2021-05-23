<template>
    <div>
        <license-item v-for="(item, index) in licenseList" :key="index" :licenseData="item"></license-item>
    </div>
</template>

<script>
import licenseItem from '@/components/license/licenseItem'

export default {
    components: {
        licenseItem
    },

    data() {
        return {
            licenseList: [
                {
                    "id": 1,
                    "license": "2fddee4c1f1f78e91c3972ddf0e54ac308516fa131242ab2e752855d0040439c8df20249087e62f1005419a67c236aaca1a7c8dad4e75609b448cd041767f1464c05930527dcd829dade17557dcbad8e92a2a98d57019b8edff4491f5c68e1a012cfbb24bbedcf684e59178ccf23dd8cf56c9b6353a5c359605e26c26908badd",
                    "service": "soShield",
                    "startTime": "2021-05-01",
                    "endTime": "2021-06-09",
                    "max": 500,
                    "used": 4
                }
            ]
        }
    },

    mounted() {
        this.queryLicenseList()
    },

    methods: {
        queryLicenseList() {
            this.$store.dispatch('system/queryLicenseList').then(res => {
                this.licenseList = res
            })
        }
    }
}
</script>

<style lang="less" scoped>
    
</style>