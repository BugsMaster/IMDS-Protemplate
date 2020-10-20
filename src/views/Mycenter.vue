<template>
    <div id="mycenter" class="mycenter">
        <div class="layoutbox">
            <div class="left-box">
                <ul class="label-ul">
                    <li @click="activeIndex=0" :class="{active:activeIndex==0}">个人主页</li>
                    <li @click="activeIndex=1" :class="{active:activeIndex==1}">个人信息</li>
                    <li @click="activeIndex=2" :class="{active:activeIndex==2}">安全设置</li>
                    <li @click="activeIndex=3" :class="{active:activeIndex==3}">消息通知</li>
                </ul>
            </div>
            <div class="right-box">
                <div class="base-box" v-if="activeIndex==0">
                    <h3 class="title">个人主页</h3>
                    <div class="personal-box">
                        <div class="info-box clearfix">
                            <el-button class="operation" size="mini" type="primary" plain @click="activeIndex=1" icon="el-icon-edit">编辑资料</el-button>
                            <div class="avatar-extend">
                                <img :src="getUserData.avatar">
                            </div>
                            <div class="info-main">
                                <p><i class="purple el-icon-user-solid"></i> {{formInfo.name}} / {{formInfo.accountName}}</p>
                                <p><i class="purple nucfont inuc-group"></i> {{formInfo.orgName}} / {{formInfo.usertypeName}}</p>
                                <p><span><i class="purple el-icon-phone"></i> {{inputMobile}}</span><span class="email"><i class="purple el-icon-message"></i> {{formInfo.email}}</span></p>
                            </div>
                        </div>
                        <div class="row-one">
                            <h3>平台活跃情况</h3>
                        </div>
                    </div>
                </div>
                <div class="base-box" v-if="activeIndex==1">
                    <h3 class="title">个人信息</h3>
                    <div class="userInfor-box">
                        <div class="avatar-extend" @click="isAvatarEditShow= !isAvatarEditShow">
                            <div class="camera" :title="$t('app.editAvatar')">
                                <svg class="svg" aria-hidden="true">
                                    <use xlink:href="#inuc-camera"></use>
                                </svg> 
                            </div>
                            <img :src="getUserData.avatar">
                        </div>
                        <my-upload field="upfile"
                                @crop-success="cropSuccess"
                                @crop-upload-success="cropUploadSuccess"
                                v-model="isAvatarEditShow"
                                :width="200"
                                :height="200"
                                :url="apiUrl+'/api/file/avatar'"
                                :params="params"
                                :langType="langType"
                                :headers="headers"
                                :noRotate="false"
                                img-format="png">
                        </my-upload>
                        <el-form label-position="right" label-width="80px" :model="formInfo" ref="formInfo" :rules="formInfoRules">
                            <el-form-item :label="$t('c.account')+'：'"><span class="purple">{{formInfo.accountName}}</span></el-form-item>
                            <el-form-item label="组织：">{{formInfo.orgName}} / {{formInfo.usertypeName}}</el-form-item>
                            <el-form-item :label="$t('c.username')+'：'" prop="name">
                                <el-input size="small" :placeholder="$t('rule.input')" v-model="formInfo.name" clearable>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="$t('app.email')+'：'" prop="email">
                                <el-input v-model="formInfo.email" :placeholder="$t('rule.input')" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="签名：" prop="introduce">
                                <el-input type="textarea" v-model="formInfo.introduce" :placeholder="$t('rule.input')" rows="4" size="small"  maxlength="30" show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item label="资质：" prop="introduce">
                                <template v-if="formInfo.qualifications.length">
                                    <viewer v-for="item in formInfo.qualifications" :key="item.id">
                                        <img :src="item.url" class="img-logo" alt="">
                                    </viewer>
                                </template>
                                <template v-else>
                                    无
                                </template>
                            </el-form-item>
                        </el-form>
                        <el-button class="submit-btn" type="primary" plain @click="confirmformInfo" size="mini">更新信息</el-button>
                    </div>
                </div>
                <div class="base-box" v-if="activeIndex==2">
                    <h3 class="title">安全设置</h3>
                    <div class="content-box">
                        <ul class="content-ul">
                            <li>
                                <h3 class="item-title">手机号码</h3>
                                <el-button v-if="formInfo.mobile && formInfo.mobile.length" class="operation" size="mini" type="primary" plain @click="modifyMobile">更改</el-button>
                                <el-button v-else class="operation" size="mini" type="success" plain @click="modifyMobile">绑定</el-button>
                                <div class="item-content">
                                    <span>{{inputMobile}}</span>
                                </div>
                            </li>
                            <li>
                                <h3 class="item-title">帐户密码</h3>
                                <el-button class="operation" size="mini" type="primary" plain @click="modifyPassword">更改</el-button>
                                <div class="item-content">
                                    <span>已设置，可通过帐户密码登录</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="base-box" v-if="activeIndex==3">
                    <h3 class="title">消息通知</h3>
                    <div class="content-box">
                        消息系统，顾名思义即信息的传达处理系统。目的是为了让用户获得需要得到的消息及提醒并进行处理。
                        这里的“需要得到”有两层意思：
                        用户彼此互动触发的信息流(留言、评论或者回复、私信等)
                        应用希望用户了解关注的信息(系统公告等)
                    </div>
                </div>
            </div>
        </div>
        <Authentication :visible="identifyVisible" @identify-result="identifyResult"></Authentication>
        <el-dialog class="mobile-dialog" width="30%" title="绑定手机号" :visible.sync="mobileVisible" :close-on-click-modal="false" @close="cancelMobile">
            <p class="title">当前绑定号码：<span class="purple">{{this.inputMobile}}</span></p>
            <el-input style="width:350px;margin-bottom:20px;" placeholder="新手机号" size="small" v-model="newMobile"><template slot="prepend">+ 86</template></el-input>
            <div class="input-box">
                <el-input style="width:250px;margin-right:10px" v-model="mobileCode"  placeholder="6位验证码" size="small"></el-input>
                <el-button class="operation" size="small" type="primary" :disabled="count>0" plain @click="toSendSMS">{{count>0?count+'秒后重新发送':'发送验证码'}}</el-button>         
            </div>
            <div slot="footer">
                <el-button @click="cancelMobile" size="mini">{{$t('c.cancel')}}</el-button>
                <el-button type="primary" @click="confirmMobile" size="mini">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="password-dialog" width="30%" title="更改密码" :visible.sync="passwordVisible" :close-on-click-modal="false" @close="cancelPassword">
            <p class="title">密码包含：<span class="purple">数字,英文,字符中的两种及以上，长度6-20.</span></p>
            <el-input class="newPassword" type="password" :placeholder="$t('rule.input')" size="small" v-model="oldPassword" :maxlength="20"><template slot="prepend">旧密码</template></el-input>
            <el-input class="newPassword" type="password" :placeholder="$t('rule.input')" size="small" v-model="newPassword" :maxlength="20"><template slot="prepend">新密码</template></el-input>
            <el-input class="copyPassword" type="password" :placeholder="$t('rule.input')" size="small" v-model="copyPassword" :maxlength="20"><template slot="prepend">请确认</template></el-input>
            <div slot="footer">
                <el-button @click="cancelPassword" size="mini">{{$t('c.cancel')}}</el-button>
                <el-button type="primary" @click="confirmPassword" size="mini">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from "assets/js/api";
import Config from "assets/js/config";
import {Storage, Ticket,Exp } from "assets/js/utils";
import {mapGetters} from 'vuex';
import myUpload from 'vue-image-crop-upload';
import { setInterval } from 'timers';
import Authentication from 'components/Authentication'
export default {
    data() {
        return {
            activeIndex:0,
            userData: {},
            formInfo:{
                accountName:'',
                usertypeName:'',
                mobile:'',
                orgName:'',
                name:'',
                email:'',
            },
            formInfoRules:{
                accountName: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" }
                ],
                orgName: [
                    { required: true, message: this.$t('rule.required'), trigger: "change"},
                    { max: 20, message: this.$t('rule.maxLength',[20]), trigger: "change"}
                ],
                name: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                    { max: 20, message: this.$t('rule.maxLength',[20]), trigger: "change" }
                ],
                introduce: [
                    { required: false, message: this.$t('rule.required'), trigger: "change" },
                    { max: 30, message: this.$t('rule.maxLength',[30]), trigger: "change" }
                ],
                email: [
                    {
                        pattern: Exp.email,
                        message: this.$t('app.errorEmail'),
                        trigger: "blur"
                    }
                ],
            },
            //图片上传相关
            apiUrl:Config.apiUrl,
            isAvatarEditShow: false,
            params: {
                culture:this.$i18n.locale
            },
            headers: {
                Authorization:null
            },
            langType:this.$i18n.locale=="zh"?"zh":"en",
            //安全设置相关
            inputMobile:'未绑定',
            identifyVisible:false,
            mobileVisible:false,
            newMobile:'',
            mobileCode:'',
            count:0,
            passwordVisible:false,
            oldPassword:'',
            newPassword:'',
            copyPassword:'',
            operationModel:0,

        }
    },
    computed: {
       ...mapGetters(['getUserData'])
    },
    created() {
        if (Ticket.get()) {
            this.userData = Storage.get("imds_ticket");
            this.headers.Authorization = "Bearer "+Storage.get("imds_ticket").access_token;
        }
    },
    mounted() {
        this.initPage();
    },
    methods: {
        initPage(){
            api.getUserInfo(this.userData.id).then(data => {
                this.formInfo={
                    usertypeName:data.usertype_name,
                    accountName:data.account_no,
                    orgName:data.org_name,
                    name:data.name,
                    mobile:data.mobile,
                    email:data.email,
                    introduce:data.introduce,
                    qualifications:data.qualifications
                }
                if(data.mobile && data.mobile.length){
                    let str = data.mobile.substring(3,data.mobile.length-4);
                    this.inputMobile = data.mobile.replace(str,"****");
                }
            })
        },
        confirmformInfo(){
            let params = {
                name : this.formInfo.name,
                // mobile : this.formInfo.mobile,
                email: this.formInfo.email
            };
            this.$refs["formInfo"].validate(valid => {
                if(valid){
                    api.putUser(this.userData.id,params).then(data => {
                        let temp = Storage.get("imds_ticket");
                        temp.name = params.name;
                        this.$store.commit("getUserData",temp);
                    })
                }
            })
        },
        // 更改手机号相关
        modifyMobile(){
            this.identifyVisible = true;
            this.operationModel=1;
        },
        identifyResult(result){
            this.identifyVisible = false;
            if(result){
                switch (this.operationModel) {
                    case 1:
                        this.mobileVisible = true;
                        break;
                    case 2:
                        this.passwordVisible = true;
                        break;
                
                    default:
                        break;
                }
            }
        },
        toSendSMS(){
            if(!Exp.mobile.test(this.newMobile)) return this.$message.warning("请输入正确的手机号码！")
            api.getSms(this.formInfo.mobile);
            this.count = 60;
            let time = window.setInterval(()=>{
                if(this.count>0){
                    this.count--;
                }else{
                    window.clearInterval(time);
                }
            },1000);
        },
        confirmMobile(){
            if(!Exp.mobile.test(this.newMobile)) return this.$message.warning("请输入正确的手机号码！")
            if(this.mobileCode.length!=6) return this.$message.warning("请输入6位验证码！")
            api.postBindmobile(this.newMobile,{code:this.mobileCode}).then(data => {
                this.cancelMobile();
            });
        },
        cancelMobile(){
            this.mobileVisible = false;
            this.mobileCode = '';
            this.newMobile = '';
        },
        //修改密码
        modifyPassword(){
            this.identifyVisible = true;
            this.operationModel=2;
        },
        confirmPassword(){
            if(!this.oldPassword.length) return this.$message.warning("请输入旧密码！");
            if(this.newPassword.length<6 || this.newPassword.length>20) return this.$message.warning("密码长度为6-20！");
            if(!Exp.password.test(this.newPassword)) return this.$message.warning("新密码格式不正确！");
            if(this.newPassword != this.copyPassword) return this.$message.warning("两次密码输入不一致！");
            let params={
                old_pwd:this.oldPassword,
                new_pwd:this.newPassword
            }
            api.putChangepwd(params).then(data => {
               this.cancelPassword();
            });
        },
        cancelPassword(){
            this.passwordVisible=false;
            this.oldPassword = '';
            this.newPassword = '';
            this.copyPassword = '';
        },
        //头像上传
        cropSuccess(imgDataUrl, field){
        },
        cropUploadSuccess(jsonData, field){
            let avatar = this.apiUrl+jsonData.data.avatar_url;
            let temp = Storage.get("imds_ticket");
            temp.avatar = avatar;
            Storage.set("imds_ticket",temp);
            this.$store.commit("getUserData",temp);
		},
    },
    components: {myUpload,Authentication}
};
</script>
<style lang="scss">
.userInfor-box{
    .avatar-extend {
        margin: 0 auto;
        width:150px;
        height: 150px;
        border-radius:50%;
        overflow: hidden;
        border: 1px solid #ccc;
        margin-bottom: 15px;
        cursor: pointer;
        position: relative;
        &:hover{
            .camera{
                display: block;
            }
        }
        .camera{
           position: absolute;
           left: 0;
           top:0;
           width: 100%;
           height: 100%;
           background-color: rgba(0,0,0,.3);
           display: none;
           .svg{
                position: absolute;
                left: 25%;
                top:25%;
                width: 50%;
                height: 50%;
                margin:0 auto;
           }
        }
        img{
            height: 100%;
            width: 100%;
            display: block;
        }
    }
}
</style>

<style lang="scss" scoped>
.mycenter{
    font-size:14px;
    .layoutbox{
        margin:0 auto;
        width:1000px;
        display: flex;
        .left-box{
            width:250px;
            margin-right:20px;
            .label-ul{
                background-color: #fff;
                max-height:300px;
                overflow: auto;
                border:1px solid #ddd;
                @include scrollbar();
                li{
                    color: #333;
                    cursor: pointer;
                    height: 50px;
                    line-height:50px;
                    padding:0 25px;
                    border-bottom:1px solid #ddd;
                    &:hover{
                        color:#999;
                    }
                }
                li.active{
                    color: $mauve;
                    border-left:4px solid $mauve;
                }
            }
        }
        .right-box{
            flex:1;
            background-color: #fff;
            border:1px solid #ddd;
            .base-box{
                .title{
                    font-weight:700;
                    height: 50px;
                    line-height:50px;
                    padding:0 20px;
                    border-bottom:1px solid #ddd;
                }
                .personal-box{
                    padding:40px 25px;
                    .info-box{
                        position: relative;
                        margin-bottom:20px;
                        .operation{
                            position: absolute;
                            top:-20px;
                            right:0px;
                        }
                        .avatar-extend{
                            width:100px;
                            height: 100px;
                            border-radius:50%;
                            overflow: hidden;
                            border: 1px solid #ccc;
                            float: left;
                        }
                        .info-main{
                            margin-left:160px;
                            i{
                                font-size:16px;
                            }
                            >p{
                                color: #666;
                                margin-bottom:20px;
                                .email{
                                    margin-left:40px;
                                }
                            }
                        }
                    }
                    .row-one{
                        border-top:1px solid #ddd;
                        padding:20px 0;
                    }
                }
                .userInfor-box{
                    padding:40px 80px;
                    .submit-btn{
                        display: block;
                        margin:0 auto;
                        margin-top:40px;
                    }
                    .img-logo{
                        width:150px;
                        height: 220px;
                        float: left;
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }
                }
                .content-box{
                    padding:20px;
                    .content-ul{
                        li{
                            padding:20px;
                            border:1px solid #ddd;
                            margin-bottom:20px;
                            .item-title{
                                font-size:16px;
                            }
                            .item-content{
                                color: #666;
                                width:300px;
                                margin-top:15px;
                            }
                            .operation{
                                float: right;
                            }
                        }
                    }
                }
            }
        }
    }
    .mobile-dialog{
        .title{
            margin-bottom:20px;
        }
    }
    .password-dialog{
        .title{
            margin-bottom:20px;
        }
        .newPassword{
            width:350px;
            margin-bottom:20px;
        }
        .copyPassword{
            width:350px;
        }
    }
}
</style>
