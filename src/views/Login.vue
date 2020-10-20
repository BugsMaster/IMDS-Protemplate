<template>
    <div id="login" class="login">
        <div class="login-box">
            <div class="left-box"></div>
            <div class="right-box">
                <h3 class="title"><i class="nucfont inuc-cloud"></i>漆黑小T</h3>
                <el-form :model="loginform" :ref="loginform" label-position="right">
                    <el-form-item prop="username">
                        <el-input placeholder="账号" prefix-icon="nucfont inuc-usermanager" v-model="loginform.username">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="密码" prefix-icon="nucfont inuc-password" v-model="loginform.password" type="password" @keyup.enter.native="login">
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button class="confirm hvr-icon-forward" type="primary" @click="login">LOGIN IN
                    <i class="nucfont inuc-arrow-circle-right hvr-icon"></i>
                </el-button>
            </div>
        </div>
       <!--  <div class="copy-box">
            <div class="center-box">
                <p>Copyright © 漆黑小T 版权所有 </p>
                <p class="beian"><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802030488"><img class="icon" src="../../public/img/icon_record.png">京公网安备 11010802030488号-4</a></p>
            </div>
        </div> -->
    </div>
</template>

<script>
import api from "assets/js/api";
import Config from "assets/js/config";
import {Storage, Ticket } from "assets/js/utils";
export default {
    data() {
        return {
            loginform: {
                username: '',
                password: ''
            },
            fileUrl:Config.apiFileUrl
        };
    },
    mounted() {
        //清空票据
        this.$nextTick(() => {
            Ticket.remove();
            Storage.clear();
        });
    },
    methods: {
        login() {
            this.$router.push({ name: "visualization" });
            // let parameters = {
            //     username: this.loginform.username.trim(),
            //     password: this.loginform.password
            // };
            // api.login(parameters)
            //     .then(data => {
            //         Ticket.set(data.access_token);
            //         Storage.set("imds_ticket", data);
            //         //正确登录后
            //         return api.getMenu();
            //     })
            //     .then(data => {
            //         this.$nextTick(() => {
            //             Storage.set("menu", data);
            //             this.$router.push({ name: "home" });
            //             this.$store.state.isLogin = true;
            //         });
            //     });
        },
        errAlert(msg) {
            this.$notify({
                message: msg,
                type: "error",
                duration: 1000
            });
        }
    }
};
</script>
<style lang="scss">
.login-box {
    .el-form-item {
        .el-input {
            .el-input__inner {
                padding-left: 50px;
                background-color: transparent;
                color: #fff;
                border:0;
                border-bottom: 1px solid $mauve;
            }
            .el-input__prefix {
                padding-left: 10px;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.login {
    height: 100%;
    background-image:url("../../public/img/login.png");
    background-size:101% 101%;
    background-position: -1px -1px;
    color: $color-txt;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items:center;
    .login-box {
        width: 50vw;
        height: 60vh;
        border-radius: 30px;
        overflow: hidden;
        display: flex;
        .left-box{
            flex:2;
            background-image:url("../../public/img/login_bg.png");
            background-size: cover;
        }
        .right-box{
            flex:1;
            background:linear-gradient(135deg, rgba(87, 54, 110, 0.3), rgba(0, 0, 0, 0.3));
            padding:60px 60px;
            display: flex;
            flex-direction:column;
            .title{
                color:#fff;
                font-size:26px;
                text-align:center;
                letter-spacing: 5px;
                margin-bottom:10vh;
                i{
                    font-size: 22px;
                }
            }
            .confirm {
                margin-top:30px;
                display: block;
                width: 100%;
                letter-spacing: 0.2em;
                color: #fff;
                border-radius: 0;
                padding: 12px 80px 12px;
                transition: all 0.7s ease-out;
                background: linear-gradient(
                    270deg,
                    rgba(87, 54, 110, 0.3),
                    $mauve,
                    rgba(34, 34, 34, 0),
                    rgba(34, 34, 34, 0)
                );
                background-position: 1% 50%;
                background-size: 300% 300%;
            }
            .confirm:hover {
                border: 1px solid rgba(223, 190, 106, 0);
                background-position: 99% 50%;
            }
        }
    }
}
  .copy-box{
        padding: 20px;
        background-color: rgba(0,0,0,0.2);
        width:100%;
        position: fixed;
        left: 0;
        bottom: 0;
        .center-box{
            width:1100px;
            margin:0 auto;
            color: #ddd;
            text-align:center;
            line-height: 20px;
            position: relative;
            .beian{
                a{
                    color: rgba(255,255,255,0.5);
                    &:hover{
                        color: #ddd;
                    }
                }
            }
            .icon{
                margin-right:10px;
            }
            .qr-box1{
                position: absolute;
                right:100px;
                .qr{
                    display: block;
                    margin:0 auto;
                    width:50px;
                    margin-bottom:5px;
                }
                .text{
                    text-align:center;
                }
            }
            .qr-box2{
                right:-50px;
                position: absolute;
                .qr{
                    display: block;
                    margin:0 auto;
                    width:50px;
                    margin-bottom:5px;
                }
                .text{
                    text-align:center;
                }
            }
        }
    }

@media screen and (max-width: 800px) {
    .login{
        .login-box{
            width:80%;
            height: 50vh;
            .left-box{
                display: none;
            }
            .right-box{
                padding:rem(20);
            }
        }
        .copy-box{
            .center-box{
                width:100%;
                .qr-box1{
                    display: none;
                }
                .qr-box2{
                    display: none;
                }
            }
        }
    }
}
</style>
