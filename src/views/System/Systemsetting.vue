<template>
    <div id="systemsetting" class="systemsetting">
        <div class="layoutbox">
            <div class="left-box">
                <ul class="label-ul">
                    <li @click="activeIndex=0" :class="{active:activeIndex==0}">系统名片</li>
                    <li @click="activeIndex=1" :class="{active:activeIndex==1}">系统信息</li>
                    <li @click="activeIndex=2" :class="{active:activeIndex==2}">系统安全</li>
                </ul>
            </div>
            <div class="right-box">
                <div class="base-box" v-if="activeIndex==0">
                    <h3 class="title">系统名片</h3>
                    <div class="card-box">
                        <div class="info-box clearfix box-shadow">
                            <div class="bgc"></div>
                            <div class="info-wrap">
                                <div class="avatar-extend">
                                    <img :src="formInfo.logo">
                                </div>
                                <div class="info-main">
                                    <p>系统名称： <span class="purple">{{formInfo.system_full_name}}</span></p>
                                    <p>系统简称： <span class="purple">{{formInfo.system_name}}</span></p>
                                    <p>系统简介： <span class="purple" style="line-height:35px;">{{formInfo.brief_introduction}}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="base-box" v-if="activeIndex==1">
                    <h3 class="title">系统信息</h3>
                    <div class="systeminfo-box">
                        <div class="avatar-extend" @click="isAvatarEditShow= !isAvatarEditShow">
                            <div class="camera" :title="$t('app.editAvatar')">
                                <svg class="svg" aria-hidden="true">
                                    <use xlink:href="#inuc-camera"></use>
                                </svg> 
                            </div>
                            <el-image class="logo-box" :src="formInfo.logo">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
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
                        <el-form label-position="right" label-width="120px" :model="formInfo" ref="formInfo" :rules="formInfoRules">
                            <el-form-item label="系统名称：" prop="system_full_name">
                                <el-input style="width:300px" size="small" :placeholder="$t('rule.input')" v-model="formInfo.system_full_name" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="系统简称：" prop="system_name">
                                <el-input style="width:300px" size="small" :placeholder="$t('rule.input')" v-model="formInfo.system_name" clearable>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="默认位置：" prop="init_longitude">
                                <el-input style="width: 125px" size="small" :placeholder="$t('rule.mapSelection')" v-model="formInfo.init_longitude" readonly>
                                </el-input>
                                —
                                <el-input style="width: 125px" size="small" :placeholder="$t('rule.mapSelection')" v-model="formInfo.init_latitude" readonly>
                                </el-input>
                                <el-button :title="$t('c.eqpPosition')" style="margin-left:10px;" type="primary" plain circle size="small" @click="geoMapEdit">
                                    <i class="el-icon-map-location"></i>
                                </el-button>
                            </el-form-item>
                            <el-form-item :label="'默认'+$t('c.address')+'：'" prop="init_address">
                                <el-input style="word-break:break-all"
                                type="textarea"
                                :rows="2"
                                size="small" :placeholder="$t('rule.input')" v-model="formInfo.init_address" clearable>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="系统简介：" prop="brief_introduction">
                                <el-input type="textarea" v-model="formInfo.brief_introduction" :placeholder="$t('rule.input')" rows="4" size="small"  maxlength="100" show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item label="修改时间：" prop="introduce">{{formInfo.modify_time}}</el-form-item>
                        </el-form>
                        <el-button class="submit-btn" type="primary" plain @click="confirmformInfo" size="mini">更新信息</el-button>
                    </div>
                </div>
                <div class="base-box" v-if="activeIndex==2">
                    <h3 class="title">系统安全</h3>
                    <div class="secure-box">
                        系统安全是指在系统生命周期内应用系统安全工程和系统安全管理方法，辨识系统中的隐患，并采取有效的控制措施使其危险性最小，从而使系统在规定的性能、时间和成本范围内达到最佳的安全程度。系统安全是人们为解决复杂系统的安全性问题而开发、研究出来的安全理论、方法体系，是系统工程与安全工程结合的完美体现。系统安全的基本原则就是在一个新系统的构思阶段就必须考虑其安全性的问题，制定并执行安全工作规划（系统安全活动），属于事前分析和预先的防护，与传统的事后分析并积累事故经验的思路截然不同。系统安全活动贯穿于生命整个系统生命周期，直到系统报废为止。
                    </div>
                </div>
            </div>
        </div>
        <Authentication :visible="identifyVisible" @identify-result="identifyResult"></Authentication>
        <el-dialog :title="$t('c.eqpPosition')" :visible.sync="geoMapDialogVisible" height="80%" width="70%" :close-on-click-modal="false">
            <GeoMapComponent v-if="geoMapDialogVisible" :initLng="initLng" :initLat="initLat" @map-confirm='geoMapConfirm' @map-cancel='geoMapCancel'></GeoMapComponent>
        </el-dialog>
    </div>
</template>

<script>
import api from "assets/js/api";
import Config from "assets/js/config";
import {Storage, Ticket,Exp } from "assets/js/utils";
import {mapGetters} from 'vuex';
import myUpload from 'vue-image-crop-upload';
import Authentication from 'components/Authentication';
import GeoMapComponent from 'components/GeoMap.vue';
export default {
    data() {
        return {
            activeIndex:0,
            formInfo:{
                logo:'',
                system_name:'',
                system_full_name:'',
                english_name:'',
                init_longitude:null,
                init_latitude:null,
                init_address:'',
                brief_introduction:'',
                modify_time:'',
            },
            formInfoRules:{
                system_full_name: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                    { max: 20, message: this.$t('rule.maxLength',[20]), trigger: "change"}
                ],
                system_name: [
                    { required: true, message: this.$t('rule.required'), trigger: "change"},
                    { max: 20, message: this.$t('rule.maxLength',[20]), trigger: "change"}
                ],
                init_longitude: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" }
                ],
                init_address: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                    { max: 50, message: this.$t('rule.maxLength',[50]), trigger: "change" }
                ],
            },
            identifyVisible:false,
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
            //===百度地图========
            geoMapDialogVisible: false,
            initLng:0,
            initLat:0,
        }
    },
    computed: {
       ...mapGetters(['getUserData','getSystemData'])
    },
    created() {
        if (Ticket.get()) {
            this.userData = Storage.get("imds_ticket");
            this.headers.Authorization = "Bearer "+Storage.get("imds_ticket").access_token;
        }
        !Object.keys(this.getSystemData).length && this.$store.dispatch("getSystemData");
    },
    mounted() {
        this.initPage();
    },
    methods: {
        initPage(){
            api.getSystemInfo().then(data => {
                this.formInfo={
                    logo:data.logo,
                    system_name:data.system_name,
                    system_full_name:data.system_full_name,
                    english_name:data.english_name,
                    init_longitude:data.init_longitude,
                    init_latitude:data.init_latitude,
                    init_address:data.init_address,
                    brief_introduction:data.brief_introduction,
                    modify_time:data.modify_time
                }
            });
        },
        confirmformInfo(){
            this.$refs["formInfo"].validate(valid => {
                if(valid){
                    this.identifyVisible = true;
                }
            })
        },
        identifyResult(result){
            this.identifyVisible = false;
            if(result){
                api.putSystemInfo(this.formInfo).then(data => {
                    return this.$store.dispatch("getSystemData");
                });
            }
        },
        //地理坐标
        geoMapEdit(){
            this.$nextTick(() => {
                this.geoMapDialogVisible = true;
                this.initLng = this.formInfo.init_longitude;
                this.initLat = this.formInfo.init_latitude;
            });
        },
        geoMapConfirm(mapData) {
            this.$nextTick(() => {
                this.geoMapDialogVisible = false;
                this.formInfo.init_longitude = mapData.lng;
                this.formInfo.init_latitude = mapData.lat;
                this.formInfo.init_address = mapData.address;
            });
        },
        geoMapCancel() {
            this.geoMapDialogVisible = false;
        },
        //头像上传
        cropSuccess(imgDataUrl, field){
        },
        cropUploadSuccess(jsonData, field){
            console.log(jsonData);
            this.formInfo.logo = this.apiUrl+jsonData.data.avatar_url;
		},
    },
    components: {myUpload,Authentication,GeoMapComponent}
};
</script>
<style lang="scss">
.systeminfo-box{
    position: relative;
    .avatar-extend {
        position: absolute;
        right:40px;
        top:40px;
        width:140px;
        height: 140px;
        overflow: hidden;
        border: 1px solid #ccc;
        background: #ddd;
        margin-bottom: 15px;
        cursor: pointer;
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
           z-index: 100;
            .svg{
                position: absolute;
                left: 25%;
                top:25%;
                width: 50%;
                height: 50%;
                margin:0 auto;
            }
        }
        .logo-box{
            width: 100%;
            height: 100%;
            i{
                position: absolute;
                top: 50%;
                left:50%;
                transform: translate(-50%,-50%);
                font-size:30px; 
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
.systemsetting{
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
            border:1px solid #ddd;
            .base-box{
                .title{
                    font-weight:700;
                    height: 50px;
                    line-height:50px;
                    padding:0 20px;
                    border-bottom:1px solid #ddd;
                    background-color: #fff;
                }
                .card-box{
                    background-color: #f5f5f5;
                    padding:40px 25px;
                    .info-box{
                        position: relative;
                        padding:20px;
                        background-image: url('../../../public/img/grid.jpg');
                        background-size: contain;
                        .bgc{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width:100%;
                            height: 100%;
                            z-index: 10;
                            background-color: rgba(255,255,255,.85);
                        }
                        .info-wrap{
                            position: relative;
                            z-index: 20;
                            .avatar-extend{
                                width:100px;
                                height: 100px;
                                border: 1px solid #ccc;
                                float: left;
                                background: radial-gradient( #ddd,#fff);
                                
                            }
                            .info-main{
                                margin-left:160px;
                                font-size:20px;
                                >p{
                                    color: #333;
                                    margin-bottom:10px;
                                    span{
                                        font-weight:700;
                                        color: $mauve;
                                    }
                                }
                            }
                        }
                    }
                }
                .systeminfo-box{
                    background-color: #fff;
                    padding:40px 80px;
                    .submit-btn{
                        display: block;
                        margin:0 auto;
                        margin-top:40px;
                    }
                }
                .secure-box{
                    background-color: #fff;
                    padding:20px;
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
