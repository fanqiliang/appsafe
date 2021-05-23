<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'App',

  mounted() {
    // if(!!window.ActiveVObject || 'ActiveVObject' in window){
    //   window.addEventListener('hashchange', ()=>{
    //     let currentPath = window.location.hash.slice(1)
    //     if (this.$route.path !== currentPath) {
    //       this.$router.push(currentPath)
    //     }
    //   }, false)
    // }
  }
  
}
</script>

<style lang="less" scoped>
    
</style>

<style lang="less">
	@import './css/common.less';

	*{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	body{
		background-color: #f8f8f8;
	}

	.container {
		min-height: calc(100vh - 64px);
		// min-width: 1260px;
  }
  
  .el-pagination{
    margin-top: 15px;
    text-align: right;
  }

	.packet-table th{
		background-color: #F5F7FA !important;
	}

  	.table-text-center{
		th{
			text-align: center;
		}

		td{
			text-align: center;
		}
	}

    .app-card-table th{
        background-color: #F5F7FA !important;
    }

    .chart-detail-row{
        padding: 10px;
        margin: -20px;
        background: #2f304e;
        border-radius: 4px;
    }

    .chart-detail{
        box-sizing: border-box;
        padding: 16px;
        margin: -20px;
        background: #2f304e;
        border-radius: 4px;

        .tip-title{
            color: #99989d;
            margin-bottom: 6px;
        }

        .tip-circle{
            width: 4px;
            height: 4px;
            border-radius: 2px;
            background: #fff;
        }

        .tip-circle-box{
            width: 10px;
        }
    }
</style>
