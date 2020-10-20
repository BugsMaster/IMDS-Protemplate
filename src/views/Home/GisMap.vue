<template>
  <div class="gismap" id="gismap">
    <app-header class="app-header"></app-header>
    <div class="layoutbox">
        <el-button class="btn-header" size="mini" @click="closeFn">
            <i class="el-icon-close"></i>
        </el-button>
        <div class="main">
            <div class="map-box">
                 <baidu-map :style="mapStyle" class="bm-view" ak="ReZ0710iNBi0WMqba92sDLF6aqO6uy16"
                             :center="center"
                             :zoom="zoom"
                             :double-click-zoom="false"
                             :scroll-wheel-zoom="true"
                             @ready="mapReady"
                             @click="getClickInfo">
                     <bm-view style="width: 100%; height:100%"></bm-view>
                     <!-- <bm-marker class="marker" :position="{lng: marker.lng, lat: marker.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                         <bm-label content="当前位置" :labelStyle="{borderColor:'steelblue',color: 'steelblue', fontSize : '18px',zIndex:1000}" :offset="{width: -35, height: 10}"/>
                     </bm-marker>
                     <bm-control :offset="{'width': '10px', 'height': '10px'}">
                         <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
                             <el-input style="width:400px;" type="text" v-model="keyword" @keyup.enter.native="movetokeyword" @change="movetokeyword" :placeholder="$t('rule.inputKeyword')" class="serachinput" prefix-icon="el-icon-search" clearable>
                                 <el-button slot="append" icon="el-icon-check"></el-button>
                             </el-input>
                         </bm-auto-complete>
                     </bm-control>
                     <bm-local-search :keyword="moveKeyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search> -->
                 </baidu-map>
                </div>
            </div>
       </div>
  </div>
</template>

<script>
import api from 'assets/js/api'
import { mapGetters } from "vuex";
import {BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker,BmLabel} from 'vue-baidu-map'
import { Shuffle,formatSeconds,showChartTip} from 'assets/js/utils'
import Nodata from 'components/Nodata.vue'
import appHeader from 'components/Header'
let chartOne;
let chartTwo;
let chartThree;
let typePieChart;
export default {
    components: {
      Nodata,
      appHeader,
      BaiduMap,
      BmControl,
      BmView,
      BmAutoComplete,
      BmLocalSearch,
      BmMarker,
      BmLabel
    },
    data() {
        return {
            statCountData:{
                init:0,
                normal:0,
                diagnose:0,
                failure:0,
                offline:0,
                unknown:0,
            },
            hoverIndex:null,
            updataTimeOne:'',
            updataTimeTwo:'',
            updataTimeThree:'',
            XRayWarnInfoData:[],
            serieData:[],
            total:0,


            //地图
            mapStyle: {
                width: '100%',
                height: '100%',
            },
            center: {lng: 111, lat: 36},
            marker: {
                lng: 116.404,
                lat: 39.915
            },
            zoom: 6,
            map:{}
        }
    },
    created() {
    },
    mounted(){
    },
    computed: {
         ...mapGetters([
            "getDeviceMessageCount",
        ]),
    },
    methods: {
        closeFn(){
            history.go(-1);
        },
        mapReady({ BMap, map }){
            // let geoc = new BMap.Geocoder();
            // let point = new BMap.Point(this.initLng, this.initLat);
            // geoc.getLocation(point,(rs)=> {
            //     this.keyword = rs.address;
            // });
            // if(this.initLng && this.initLat){
            //     this.marker.lng = this.initLng;
            //     this.marker.lat = this.initLat;
            //     this.center.lng = this.initLng;
            //     this.center.lat = this.initLat;
            // }
            // this.map=map;
        },
        getClickInfo (e) {},
    },
    watch: {
        "$store.state.XRayStateData": function(val){
            this.statCountData = val.stat_count;
        },
        "$store.state.XRayErrorData": function(val){
            this.XRayWarnInfoData=val.data;
        },
    }
}
</script>
<style lang="scss">
.home{
    .row-one{
        .el-card__body{
            position: relative;
        }
    }
    .row-two{
        .el-card__body{
            padding:10px 20px;
        } 
    }
    .row-three{
        .el-card__body{
            display: flex;
            padding:0;
        }
    }
    
}

</style>

<style lang="scss" scoped>
.gismap{
    height: 100%;
    overflow: hidden;
    .layoutbox{
        height: 100%;
         .btn-header {
            background-color: #213e5c;
            color: #fff;
            padding: 3px 8px;
            border: 0;
            line-height: 25px;
            position: absolute;
            right:5px;
            top:55px;
            z-index: 2000;
            i {
                font-size: 30px;
            }
            &:hover i {
                color: rgb(0, 188, 212);
            }
        }
        .main{
            height: 100%;
             .map-box{
                height: 100%;
                border:1px solid $purple;
            }
        }
    }
}
</style>