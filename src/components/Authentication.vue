<template>
    <div id="identify" class="identify">
        <el-drawer size="80" class="identify-dialog" title="身份验证" :visible="visible" direction="ttb" :before-close="cancelIdentify" custom-class="drawer" :wrapperClosable="false">
            <div class="main">
                <p class="title">为了你的帐户安全，请验证身份，验证成功后可进行下一步操作。</p>
                <template v-if="identifyType==1">
                    <p class="title-sub">验证账户密码：
                    <div class="input-box">
                        <el-input type="password" style="width:250px;margin-right:10px" v-model="password" placeholder="密码" size="mini"></el-input> 
                    </div>
                </template>
                <template v-if="identifyType==2">
                    <p class="title-sub">验证手机号码：<span class="purple">{{this.inputMobile}}</span></p>
                    <div class="input-box">
                        <el-input style="width:250px;margin-right:10px" v-model="identifyCode" placeholder="6位验证码" size="mini"></el-input>
                        <el-button class="operation" size="mini" type="primary" plain @click="sendSMS">发送验证码</el-button>         
                    </div>
                </template>
                <div class="footer">
                    <el-button type="primary" @click="toIdentify" size="mini">验证</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import api from "assets/js/api";
    export default {
        data() {
            return {
                inputMobile:'未绑定',
                password:'',
                count:0,
            }
        },
        props: {
            visible:{
                type:Boolean,
                default:false
            },
            identifyType: {
                type: Number,
                default: 1
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {
        },
        methods: {
            toIdentify(){
                if(!this.password.length) return this.$message.warning("请输入密码");
                api.postAuthpassword({password:this.password}).then(data => {
                    this.password='';
                    this.$emit('identify-result',data);
                    if(!data) return this.$message.error("验证失败");
                });
            },
            cancelIdentify(){
                this.$emit('identify-result',false);
                this.password='';
            },
            sendSMS(){
                // api.getSms(this.formInfo.mobile);
                // this.count = 5;
                // let time = window.setInterval(()=>{
                //     if(this.count>0){
                //         this.count--;
                //     }else{
                //         window.clearInterval(time);
                //     }
                // },1000);
            },
        },
        components: {}
    }
</script>

<style lang="scss">
    .identify-dialog.el-dialog__wrapper{
        left: 30%;
        right: 30%;
    }
</style>
<style lang="scss" scoped>
    .identify-dialog{
        .main{
            padding:20px;
            padding-top:0;
            width:80%;
            margin:0 auto;
            .title{
                margin-bottom: 30px;
                font-size: 16px;
            }
            .title-sub{
                color: #666;
            }
            .input-box{
                padding:20px 0;
            }
        }
    }
</style>

