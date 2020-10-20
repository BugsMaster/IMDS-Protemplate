<template>
    <div id="app">
        <div class="single-page" v-if="$route.meta.single">
            <router-view :key="$route.query.t"></router-view>
        </div>
        <div class="app-wrap" v-if="!$route.meta.single">
            <app-aside></app-aside>
            <div class="app-main">
                <app-header class="app-header" :class="{'isSub':isSub}"></app-header>
                <div class="app-content" :class="{'isSub':isSub}">
                    <transition enter-active-class="animated fadeInLeft">
                        <router-view :key="$route.query.t"></router-view>
                    </transition>
                </div>
            </div>
        </div>
        <el-backtop target="#app">
            <span class="back-up nucfont inuc-to-top"></span>
        </el-backtop>
    </div>
</template>
<script>
    import api from "assets/js/api";
    import appHeader from 'components/Header'
    import appAside from 'components/Aside'
    import Config from 'assets/js/config'
    import {Storage, Ticket,Throttle} from 'assets/js/utils'
    export default {
        name: 'app',
        data() {
            return {
                isSub:this.$route.meta.subpage?true:false
            }
        },
        created(){
            /* if (typeof WebSocket != "function") {
                this.$message.error(this.$t('tip.ChangeBrowser'));
                return;
            }
            let pathname = window.location.pathname;
            if (Storage.get("imds_ticket")) {
                //若已经登录直接跳首页
                if(pathname == "/login"){
                    this.$router.push({name:'home'});
                }
                // 全局soket链接
                // this.globalWebsoketStart();
                this.permissionsInit();
            } */
        },
        mounted(){
            
        },
        methods: {
            globalWebsoketStart(){
                let globalSocket = io(Config.socketIP+"/GLOBAL" , {
                    query:{
                        culture:this.$i18n.locale,
                        uid:Storage.get("imds_ticket").id,
                        customer_code:Storage.get("imds_ticket").customer_code,
                        user_type:Storage.get("imds_ticket").usertype
                    },
                    transports: ['websocket', 'polling'],
                    reconnect: true,
                    timeout: 8000,
                    forceNew:true
                });
                globalSocket.on('connect', () => {
                    this.$notify({
                        type: 'success',
                        message: this.$t('tip.dataConnectSuccess')+'，Globle',
                        duration: 1000
                    });
                });
                globalSocket.on('disconnect', () => {
                    console.log("websoket已断开...")
                });
                globalSocket.on('device_bagage_count', (res) => {
                    if(Object.keys(this.$store.state.deviceBagageCount).length) return;
                    this.$store.commit("getDeviceBagageCount",res);
                });
            },
            permissionsInit(){
                let rooterMatch = this.$router.currentRoute.matched;
                let activeMenu = rooterMatch.map(item=>{
                    let tempArr = item.path.split('/');
                    return tempArr[tempArr.length-1];
                }); 
                let permissions={};
                if(Storage.get("menu")&&Storage.get("menu").menu_list.length){
                    let menuList = Storage.get("menu").menu_list;
                    menuList.forEach(item=>{
                        if(item.router==activeMenu){
                            item.permissions.forEach(element => {
                                permissions[element.action_code]=Boolean(element.status);
                            });
                            this.$store.commit("getRolePermission",permissions); 
                        }
                    })
                }
                console.log(activeMenu,permissions);
            }
        },
        computed: {

        },
        watch: {
            // 登录状态监控
            /* "$store.state.isLogin": function(val){
                if(Storage.get("imds_ticket") && val){
                    this.globalWebsoketStart();
                }
            },
            '$route': function(val) {
                this.permissionsInit();
                if(val.meta.subpage){
                    this.isSub=true;
                }else{
                    this.isSub=false;
                }
            }, */
        },
        components: {
            appHeader,
            appAside
        }
    }
</script>
<style lang="scss">
@import 'style/index';
#app {
    height: 100%;
    overflow: auto;
    min-width:$w-min;
    .single-page{
        height: 100%;
    }
    .app-wrap{
        padding-left:64px;
        .app-main{
            position: relative;
            .app-header.isSub{
                width: calc(100% - 64px);
                position: fixed;
                z-index: 100;
            }
            .app-content{
                padding: 15px;
                &.isSub{
                    padding-top: 60px;
                }
            }
        }
    }
    .back-up {
        color: #fff;
        border-radius: 50%;
        background-color: #666;
        padding: 10px;
        font-size: 30px;
        cursor: pointer;
        &:hover {
            color: $yellow;
        }
    }
}
@media screen and (max-width: 800px) {
    #app {
        min-width:0;
    }
}
</style>
