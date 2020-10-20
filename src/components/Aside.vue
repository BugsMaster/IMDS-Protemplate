<template>
    <div
        id="app-side"
        class="app-side"
    >   
        <div class="logo-box"><img src="@/assets/images/common/clond_logo.png"></div>
        <el-menu 
            class="el-menu"
            :class="'bgc'+bgcIndex"
            background-color="rgba(0,0,0,.4)"
            text-color="#fff"
            active-text-color="#fbbd08"
            :default-active="activeMenu"
            @select="selectMunu"
            :collapse="isCollapse">
            <template v-for="item in menuListData">
                <el-menu-item v-if="!item.children.length || item.id==6" :index="item.router" :key="item.id">
                    <i class="nucfont" :class="item.icon"></i><span slot="title">&nbsp;&nbsp;{{item.name}}</span>
                </el-menu-item>
                <el-submenu v-else :index="item.router">
                    <template slot="title">
                        <i class="nucfont" :class="item.icon"></i>&nbsp;&nbsp;<span>{{item.name}}</span>
                    </template>
                    <template v-for="el in item.children">
                        <el-menu-item :index="el.router" v-if="!el.children.length">
                            <i class="nucfont" :class="el.icon"></i>&nbsp;&nbsp;<span>{{el.name}}</span>
                        </el-menu-item>
                        <el-submenu :index="el.router" v-else>
                            <template slot="title"><i class="nucfont" :class="el.icon"></i>&nbsp;&nbsp;<span>{{el.name}}</span></template>
                            <el-menu-item v-for="per in el.children" :index="per.router"><i class="nucfont" :class="per.icon"></i>&nbsp;&nbsp;<span>{{per.name}}</span></el-menu-item>
                        </el-submenu>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
        <div class="collapse-btn mmd-waves" @click="isCollapse=!isCollapse"><p><i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i></p></div>
    </div>
</template>

<script>
import {Storage,Debounce,MavesClass} from 'assets/js/utils';
import { setInterval } from 'timers';
export default {
    data() {
        return {
            isCollapse: true,
            activeMenu:'home',
            menuListData:Storage.get('menu').menu_tree.children,
            bgcIndex:4
        };
    },
    created() {
        this.initMenu();
        let date = new Date().getMonth();
        switch (date) {
            case 1:
            case 2:
            case 3:
                this.bgcIndex=1;
                break;
            case 4:
            case 5:
            case 6:
                this.bgcIndex=2;
                break;
            case 7:
            case 8:
            case 9:
                this.bgcIndex=3;
                break;
            case 10:
            case 11:
            case 0:
                this.bgcIndex=4;
                break;
            default:
                this.bgcIndex=4;
                break;
        }
    },
    mounted() {
        //涟漪特效
        $(".mmd-waves").mousedown(function(e) {
            var m = new MavesClass();
            m.showWaves(this,e);
        });
    },
    methods: {
        initMenu(){
            let urlPath = this.$router.currentRoute.path.substring(this.$router.currentRoute.path.lastIndexOf("/"));
            this.activeMenu = urlPath.replace('/','');
        },
        selectMunu:Debounce(function(key, keyPath){
            this.$router.push({name:key});
            this.activeMenu = key;
        },200),
    },
    computed: {},
    watch: {
        '$route': function() {
           this.initMenu();
        },
    },
    components: {

    }
};
</script>
<style lang="scss">
.app-side{
    .el-menu{
        .el-submenu__title:hover,.el-menu-item:hover{
            background-color: rgba(46, 44, 44, 0.3)!important;
        }
    }
}
.el-menu.el-menu--popup{
    .el-menu-item:hover{
        background-color: rgba(26, 25, 25, 0.3)!important;
    }
}
</style>

<style scoped lang="scss">
.app-side {
    background: $black;
    position: fixed;
    height: 100%;
    left: 0;
    z-index: 2000;
    box-shadow: 0 16px 38px -12px rgba(0,0,0,.56), 0 4px 25px 0 rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2);
    display: flex;
    flex-direction: column;
    .logo-box{
        color: $orange;
        text-align:center;
        height: $h-header;
        background-color: #000;
        display: flex;
        align-items:center;
        justify-content:center;
        img{
            width:50px;
        }
    }
    .el-menu:not(.el-menu--collapse) {
        width: 200px;
    }
    .el-menu{
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        border-right:0;
        @include scrollbar_black();
        background-size: cover;
        @for $i from 1 through 4 {
            &.bgc#{$i}{
                background:url("../../public/img/sidebar#{$i}.jpg");
            }
        }
    }
    .collapse-btn{
        cursor: pointer;
        background-color: #000;
        width:100%;
        text-align:center;
        line-height: 30px;
        color: #fff;
        font-weight: 700;
        font-size: 26px;
        transition: all 0.3s linear;
        &:hover{
            color: $orange;
        }
    }

}
</style>
