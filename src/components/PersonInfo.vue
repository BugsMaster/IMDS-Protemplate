<template>
    <div id="personInfo" class="personInfo">
        <!-- <el-tooltip placement="bottom" effect="light">
            <div slot="content" class="user-tooltip">
                <ul class="infor-ul">
                    <li @click="editSetting">{{$t('c.settings')}}</li>
                    <li @click="formPwdVisible = true">{{$t('app.pwd')}}</li>
                </ul>
            </div>
            <div class="avatar">
                <img :src="userData.avatar" alt="">
            </div>
        </el-tooltip> -->
        <div class="avatar" @click="$router.push({name:'my'});">
            <img :src="userData.avatar">
        </div>
        <!-- <my-upload field="avatar"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            v-model="isAvatarEditShowOut"
            :width="200"
            :height="200"
            :url="apiUrl+'/api/user/setavatar'"
            :params="params"
            :langType="langType"
            :headers="headers"
            :noRotate="false"
            img-format="png">
        </my-upload> -->
        <span class="name">{{userData.name}}</span>
        <!-- <el-dialog class="userInfor-dialog" :title="$t('c.userInformation')" width="500px" :append-to-body="true" center :visible.sync="formInfoVisible" :close-on-click-modal="false" @close="cancleformInfo">
            <div class="avatar-extend" @click="isAvatarEditShow= !isAvatarEditShow">
                <div class="camera" :title="$t('app.editAvatar')">
                    <svg class="svg" aria-hidden="true">
                        <use xlink:href="#inuc-camera"></use>
                    </svg> 
                </div>
                <img :src="userData.userAvatar">
            </div>
            <my-upload field="avatar"
                    @crop-success="cropSuccess"
                    @crop-upload-success="cropUploadSuccess"
                    v-model="isAvatarEditShow"
                    :width="200"
                    :height="200"
                    :url="apiUrl+'/api/user/setavatar'"
                    :params="params"
                    :langType="langType"
                    :headers="headers"
                    :noRotate="false"
                    img-format="png">
            </my-upload>
            <el-form label-position="right" :label-width="$i18n.locale=='zh'?'100px':'120px'" :model="formInfo" ref="formInfo" :rules="rules">
                <el-form-item :label="$t('c.account')+'：'" prop="accountName">
                    <el-input size="small" :placeholder="$t('rule.input')" v-model="formInfo.accountName" disabled>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('c.username')+'：'" prop="name">
                    <el-input size="small" :placeholder="$t('rule.input')" v-model="formInfo.name" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('app.mobile')+'：'" prop="mobile">
                    <el-input v-model="formInfo.mobile" :placeholder="$t('rule.input')" size="small"></el-input>
                </el-form-item>
                <el-form-item :label="$t('app.email')+'：'" prop="email">
                    <el-input v-model="formInfo.email" :placeholder="$t('rule.input')" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleformInfo" size="mini">{{$t('c.cancel')}}</el-button>
                <el-button type="primary" @click="confirmformInfo" size="mini">{{$t('c.confirm')}}</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="$t('app.changePwd')" width="400px" :append-to-body="true" center :visible.sync="formPwdVisible" :close-on-click-modal="false" @close="cancleformPwd">
            <el-form label-position="right" :label-width="$i18n.locale=='zh'?'80px':'120px'" :model="formPwd" ref="formPwd" :rules="rules">
                <el-form-item :label="$t('app.oldPwd')" prop="oldPwd">
                    <el-input v-model="formPwd.oldPwd" :placeholder="$t('rule.input')" size="small"></el-input>
                </el-form-item>
                <el-form-item :label="$t('app.newPwd')" prop="newPwd">
                    <el-input v-model="formPwd.newPwd" :placeholder="$t('rule.input')" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleformPwd" size="mini">{{$t('c.cancel')}}</el-button>
                <el-button type="primary" @click="confirmformPwd" size="mini">{{$t('c.confirm')}}</el-button>
            </div>
        </el-dialog> -->
    </div>  
</template>

<script>
    import api from 'assets/js/api'
    import { Storage, Ticket,Exp } from 'assets/js/utils'
    // import myUpload from 'vue-image-crop-upload';
    export default {
        data() {
            return {
                userData: {
                    userAvatar: "",
                    name: ""
                },
                formInfo:{
                    accountName:"",
                    name:"",
                    mobile:"",
                    email:"",
                },
                formPwd:{
                    username:'',
                    oldPwd:'',
                    newPwd:''
                },
                rules:{
                    accountName: [
                        { required: true, message: this.$t('rule.required'), trigger: "blur" }
                    ],
                    name: [
                        { required: true, message: this.$t('rule.required'), trigger: "blur" },
                        { max: 20, message: this.$t('rule.maxLength',[20]), trigger: "change" }
                    ],
                    mobile: [
                        {
                            pattern: Exp.mobile,
                            message: this.$t('app.errorMobile'),
                            trigger: "blur"
                        }
                    ],
                    email: [
                        {
                            pattern: Exp.email,
                            message: this.$t('app.errorEmail'),
                            trigger: "blur"
                        }
                    ],
                    oldPwd: [
                        { required: true, message: this.$t('rule.required'), trigger: "blur" },
                        { max: 20, message: this.$t('rule.maxLength',[20]), trigger: "change" }
                    ],
                    newPwd: [
                        { required: true, message: this.$t('rule.required'), trigger: "blur" },
                        { max: 20, message: this.$t('rule.maxLength',[20]), trigger: "change" }
                    ]
                },
                formInfoVisible:false,
                formPwdVisible:false,
                //图片上传相关
                apiUrl:'',
                isAvatarEditShow: false,
                isAvatarEditShowOut: false,
                params: {
                    culture:this.$i18n.locale
                },
                headers: {
                    Authorization:null
                },
                langType:this.$i18n.locale=="zh"?"zh":"en",
                
                }
        },
        computed: {
           
        },
        created() {
            if (Ticket.get()) {
                this.userData = Storage.get("imds_ticket");
                this.headers.Authorization = "Bearer "+Storage.get("imds_ticket").accessToken;
                // this.apiUrl = this.$store.state.apiUrl;
            }
        },
        mounted() {
            
        },
        methods: {
            editSetting(){
                this.formInfoVisible = true;
                api.getUserInfo(this.userData.userID).then(({data}) => {
                   this.formInfo={
                       accountName:data.username,
                       name:data.name,
                       mobile:data.mobile,
                       email:data.email
                   }
                })
            },
            cancleformInfo(){
                this.formInfoVisible = false;
                this.$refs["formInfo"].resetFields();
            },
            confirmformInfo(){
                let params = {
                    name : this.formInfo.name,
                    mobile : this.formInfo.mobile,
                    email: this.formInfo.email
                };
                this.$refs["formInfo"].validate(valid => {
                    if(valid){
                        api.putUser(this.userData.userID,params).then(res => {
                            this.$message({
                                type: "success",
                                message: res.msg
                            });
                            this.userData.name = params.name;
                            this.cancleformInfo();
                        })
                    }
                })
            },
            confirmformPwd(){
                let params = {
                    old_pwd: this.formPwd.oldPwd,
                    new_pwd: this.formPwd.newPwd
                };
                this.$refs["formPwd"].validate(valid => {
                    if(valid){
                        api.putResetpwd(params).then(res => {
                            if(res.operate){
                                this.$message({
                                    type: "success",
                                    message: res.msg
                                });
                                this.cancleformPwd();
                            }else{
                                this.$message.error(res.msg);
                                this.$refs["formPwd"].resetFields();
                            }
                        })
                    }
                   
                })
            },
            cancleformPwd(){
                this.formPwdVisible = false;
                this.$refs["formPwd"].resetFields();
            },
			cropSuccess(imgDataUrl, field){
				this.userData.userAvatar = imgDataUrl;
            },
            cropUploadSuccess(jsonData, field){
                let temp = Storage.get("imds_ticket");
                temp.userAvatar = this.apiUrl+jsonData.data.avatar_url;
                Storage.set("imds_ticket",temp);
			},
        },
        components: {myUpload}
    }
</script>
<style lang="scss">
.user-tooltip{
    .infor-ul{
        li{
            cursor: pointer;
            line-height: 30px;
            color: #000;
            text-align: center;
            &:hover{
                color: $yellow;
            }
        }
    }
}
.userInfor-dialog{
    .avatar-extend {
        margin: 0 auto;
        width:180px;
        height: 180px;
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

<style scoped lang="scss">
   .personInfo {
       
        .avatar {
            float: left;
            width: 35px;
            height: 35px;
            margin-top: -3px;
            border-radius: 50%;
            border:1px solid #999;
            overflow: hidden;
            cursor: pointer;
            img {
                width: 100%;
            }
        }
        .name{
            color: #fff;
            margin-left:10px;
            float: left;
            padding: 5px;
            max-width:100px;
            @include no-wrap()
        }
        .img{
            border-radius: 50%;
            overflow: hidden;
        }
    }
</style>
