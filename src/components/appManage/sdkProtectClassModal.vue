<template>
    <div>
        <el-dialog 
            title="加固类名" 
            :visible="true" 
            :close-on-click-modal="false" 
            custom-class="sdk-class-modal"
            @close="close()"
            width="480px" 
            top="200px"
        >
            <div class="class-list-box ">
                <div v-for="(item, index) in classList" :key="index" class="class-item">{{item}}</div>
            </div>
            <div class="flex jcct">
                <el-button type="primary" size="small" @click="close()">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { createLoading, deepCopy } from '@/utils/util'
import { byteWithUnitFloat } from '@/utils/util'

export default {
    props: ['modalData'],

    data() {
        return {
            classList: []
        }
    },

    watch: {
        'modalData.data': {
            handler(newValue, oldValue) {
                if (this.modalData.data && this.modalData.data.length > 0) {
                    this.classList = this.modalData.data.split(',')
                } else {
                    this.classList = ['全量加固']
                }
            },
            deep: true,
            immediate: true
        }
    },

    methods: {
        close(type) {
            this.$emit('close', type)
        },
    }
}
</script>

<style lang="less" scoped>
    .el-dialog__wrapper{
        /deep/ .sdk-class-modal{
            .el-dialog__body{
                border-top: 1px solid #d7dae2;
            }
        }
    }
    
    .class-list-box {
        padding-left: 100px;
        max-height: 600px;
        overflow: auto;
        margin-bottom: 20px;

        .class-item {
            padding: 8px 0px;
            font-size: 14px;
        }
    }
</style>