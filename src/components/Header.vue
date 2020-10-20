<template>
    <div id="app-header" class="app-header">
        <div class="loadpro_wraper">
            <div class="loadpro_box">
                <div class="loadbar" id="loadbar"></div>
            </div>
        </div>
        <div class="bread-box">
          <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item  v-for="item in currentMenuList" :key="item.id" :to="item.router">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <h3 class="title"><img class="logo" :src="getSystemData?getSystemData.logo:''" alt=""> {{getSystemData?getSystemData.system_full_name:''}}</h3>
        <div class="header-user clearfix"> 
            <!-- <el-tooltip class="tooltip" effect="dark" placement="bottom">
                <div slot="content">
                    <p>状态</p>
                </div>
                <span class="state_lamp el-icon-s-opportunity" :class="XRayCommStat.color"></span>
            </el-tooltip> -->
            <div class="flip-box"><FlipClock class="flip-clock"></FlipClock></div>
            <div class="person-box">
                <img class="avatar" :src="getUserData.avatar"  @click="isAvatarEditShow= !isAvatarEditShow">
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
                <el-tooltip placement="bottom" :content="$t('tip.signOut')">
                    <div slot="content">
                        <ul class="person-tooltip-ul">
                            <li @click="$router.push({name:'mycenter'})"><i class="nucfont inuc-system"></i> 设置</li>
                            <li @click="signOut"><i class="nucfont inuc-shut-down"></i> 退出</li>
                        </ul>
                    </div>
                    <span class="name-box"><span class="name">{{getUserData.name}}</span> <i class="el-icon-caret-bottom"></i></span>
                </el-tooltip>
            </div>
        </div>
  </div>
</template>

<script>
import Config from 'assets/js/config';
import {Storage,Ticket} from 'assets/js/utils';
import {mapGetters} from 'vuex';
import myUpload from 'vue-image-crop-upload';
import FlipClock from 'components/FlipClock'
export default {
    data() {
        return {
            activeMenu:this.$router.currentRoute.path.substring(this.$router.currentRoute.path.lastIndexOf("/")).replace('/',''),
            menuList:Storage.get("menu").menu_list,
            currentMenuList:[],
            XRayCommStat:{
                color:'',
                status:0
            },
             //图片上传相关
            apiUrl:Config.apiUrl,
            isAvatarEditShow: false,
            params: {
                culture:this.$i18n.locale
            },
            headers: {
                Authorization:"Bearer "+Storage.get("imds_ticket").access_token
            },
            langType:this.$i18n.locale=="zh"?"zh":"en",
        };
    },
    created() {
        if (Ticket.get()) {
            this.$store.commit("getUserData",Storage.get("imds_ticket"));
            this.initPage();
        }
        !Object.keys(this.getSystemData).length && this.$store.dispatch("getSystemData");
    },
    computed: {
        ...mapGetters(['getUserData','getSystemData'])
    },
    mounted(){
    },
    methods:{
        signOut() {
            //清空票据
            this.$nextTick(() => {
                Ticket.remove();
                Storage.clear();
            });
            // this.$store.state.isLogin = false;
            window.location.href = "/login";
        },
        initPage(){
            // some 和every 优化
            let exist = false;
            this.menuList.forEach(item=>{
                if(item.router==this.activeMenu){
                    this.currentMenuList=item.parents;
                    exist= true;
                }
            });
            if(!exist){
                switch (this.activeMenu) {
                    case 'mycenter':
                            this.currentMenuList=[{name:'设置'},{name:'个人中心'}];
                        break;
                    default:
                        break;
                }
            }
        },
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
    watch: {
        "$route":function(){
            this.activeMenu=this.$router.currentRoute.path.substring(this.$router.currentRoute.path.lastIndexOf("/")).replace('/','');
            this.initPage();
        },
        // "$store.state.XRayCommStat": function(val){
        //     switch (val.value) {
        //         case 1:
        //             this.XRayCommStat.color='green';
        //             break;
        //         case 2:
        //             this.XRayCommStat.color='red';
        //             break;
        //         default:
        //             break;
        //     }
        //     this.XRayCommStat.status=val.value;
        // },
    },
    components: {myUpload,FlipClock}
}
</script>
<style lang="scss">
.bread-box{
    .el-breadcrumb{
        .el-breadcrumb__item{
            .el-breadcrumb__inner{
                color: #ccc;
            }
            &:last-child .el-breadcrumb__inner{
                color: $yellow-light;
                font-weight: 700;
            }
        }
    }
}
.person-tooltip-ul{
    li{
        cursor: pointer;
        line-height: 30px;
        text-align: center;
        i{
            font-size:14px;
        }
        &:hover{
            color: $yellow;
        }
    }
}
</style>

<style scoped lang="scss">
.app-header{
    height: $h-header;
    background:$gradualBlack;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,0.20),0 3px 12px 0 rgba(0,0,0,0.16);
    display: flex;
    padding:0 10px;
    .bread-box{
        color: #fff;
        .el-breadcrumb{
            line-height:$h-header; 
            color: #fff;
            .el-breadcrumb__inner{
                color: #fff;
            }
        }
    }
    .title{
        flex:1;
        color: #fff;
        font-size: 22px;
        text-align: center;
        line-height: $h-header;
        overflow: hidden;
        letter-spacing: 2px;
        .logo{
            width: 30px;
            width: 30px;
            border-radius:4px;
        }
    }
   
    .header-user {
        line-height:20px;
        padding-left:30px;
        position: relative;
        // .state_lamp{
        //     position: absolute;
        //     left: 0;
        //     font-size:26px;
        //     top: 10px;
        //     &.green{
        //         color:$green;
        //         animation: greenlight 1.5s ease-in infinite;
        //     }
        //     &.red{
        //         color:$red;
        //         animation: redlight 1.5s ease-in infinite;
        //     }
        // }
        .flip-box{
            position: absolute;
            right: 0px;
            top: -25px;
            width: 440px;
            height: 20px;
            .flip-clock{
                transform: scale(0.36,0.36);
            }
        }
        .person-box{
            margin-top: 10px;
            padding-left: 10px;
            float: left;
            cursor: pointer;
            .avatar {
                float: left;
                width: 35px;
                height: 35px;
                margin-top: -3px;
                border-radius: 50%;
                border:1px solid #999;
                overflow: hidden;
                img {
                    width: 100%;
                }
            }
            .name-box{
                color: #fff;
                margin-left:10px;
                float: left;
                padding: 5px;
                .name{
                    @include no-wrap();
                    float: left;
                    max-width:100px;
                }
            }
        }
    }
}
.loadpro_wraper {
    position: fixed;
    left:0;
    top:0;
    height: 3px;
    width: 100%;
    z-index: 2000;
    .loadpro_box {
        display: none;
        width: 100%;
        height: 100%;
        .loadbar {
            width: 0%;
            height: 100%;
            background: $gradualGreen;
        }
    }
}
</style>
