<template>
    <div class="login-page">
        <div class="title-box flex jcct pr">
            <!-- <img src="@/assets/img/login/title.png" alt=""> -->
            <div class="flex flex-center title-content">
                <!-- <img src="@/assets/img/login/logo.png" alt="" class="title-logo"> -->
                <span class="title-text">{{stateGlobal.defaultSetting.name}}</span>
            </div>
        </div>
        <div class="content-box flex flex-center jcct">
            <div class="form-box">
                <div>
                    <div class="form-type">
                        <div class="type-btn" name="normal"><span class="hand">账户登录</span></div>
                    </div>
                    <div class="form-normal">
                        <div><input type="text" v-model="username" class="w100 input-margin" placeholder="请输入用户邮箱" @keydown="keydownInput"></div>
                        <div><input type="password" v-model="password" class="w100" placeholder="请输入用户密码" @keydown="keydownInput"></div>
                        <div class="login-btn" :class="(!username || !password) ? 'disabled' : ''" @click="submitForm">登 录</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data()  {
        return {
            username: '',
            password: '',
            // errorLogin: false
        }
    },

    computed: mapState({
		stateGlobal: state => state.global
	}),

    methods: {
        submitForm() {
            this.$store.dispatch('home/login', {
                name: this.username,
                password: this.password,
            })
            // .then(res => {
            //     this.$router.replace({path: '/web/basic/grade-class-manage'})
            // })
        },

        keydownInput(e) {
            let evt = window.event || e;
			if (evt.keyCode == 13){
                this.submitForm()
            }
        },

    }
}
</script>

<style lang="less" scoped>
    .login-page{
        position: relative;
        height: 100vh;
        background: rgba(44,60,98,1);
        background-size: cover;
        min-width: 1194px;
        min-height: 700px;
        overflow: auto;

        .title-box{
            height: 94px;
            position: relative;
            

            .title-content{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                // border: 1px solid #fff;
                // height: 100%;
                // padding: 0 20px;
                // border-radius: 6px;

                .title-logo{
                    margin-right: 16px;
                    width: 44px;
                    height: 44px;
                }

                .title-text{
                    font-size: 28px;
                    color:rgba(255,255,255,1);
                }
            }

        }

        .content-box{
            width: 100%;
            padding: 0 20px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);

            .form-box{
                flex-shrink: 0;
                width: 376px;
                height: 361px;
                background:rgba(44,60,98,0.6);
                padding: 48px 48px 0;

                .form-normal{
                    margin-top: 36px;

                    input{
                        height: 40px;
                        background:rgba(46,67,114,1);
                        border: none;
                        padding-left: 16px;
                        color:rgba(255,255,255,1);

                        &:focus{
                            padding-left: 14px;
                            border: 2px solid rgba(43,120,203,1);
                        }
                    }

                    .input-margin{
                        margin-bottom: 24px;
                    }

                    .login-btn{
                        margin-top: 36px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        background:rgba(43,138,217,1);
                        color: rgba(255,255,255,1);
                        cursor: pointer;

                        &:hover{
                            opacity: 0.8;
                        }
                    }

                    .disabled{
                        pointer-events:none;
                        opacity: 0.5;
                    }
                }

                .form-type{
                    .type-btn{
                        padding-bottom: 6px;
                        font-size: 18px;
                        // width: 108px;
                        text-align: center;
                        color:rgba(255,255,255,1);
                    }

                    .active{
                        border-bottom: 2px solid rgba(255,255,255,1);
                    }
                } 
            }
        }
    }

</style>