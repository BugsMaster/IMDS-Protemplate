<template>
  <div id="map" class="clearfix">
      <div class="map-container">
          <baidu-map :style="mapStyle" class="bm-view" ak="ReZ0710iNBi0WMqba92sDLF6aqO6uy16"
                     :center="center"
                     :zoom="zoom"
                     :double-click-zoom="false"
                     :scroll-wheel-zoom="true"
                     @ready="mapReady"
                     @click="getClickInfo">
              <bm-view style="width: 100%; height:100%"></bm-view>
              <bm-marker class="marker" :position="{lng: marker.lng, lat: marker.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                <bm-label content="当前位置" :labelStyle="{borderColor:'steelblue',color: 'steelblue', fontSize : '18px',zIndex:1000}" :offset="{width: -35, height: 10}"/>
              </bm-marker>
              <bm-control :offset="{'width': '10px', 'height': '10px'}">
                  <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
                      <el-input style="width:400px;" type="text" v-model="keyword" @keyup.enter.native="movetokeyword" @change="movetokeyword" :placeholder="$t('rule.inputKeyword')" class="serachinput" prefix-icon="el-icon-search" clearable>
                           <el-button slot="append" icon="el-icon-check"></el-button>
                      </el-input>
                  </bm-auto-complete>
              </bm-control>
              <bm-local-search :keyword="moveKeyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
          </baidu-map>
      </div>
      <span slot="footer" class="dialog-footer">
           <el-button @click="cancel">{{$t('c.cancel')}}</el-button>
           <el-button type="primary" @click="confirm">{{$t('c.confirm')}}</el-button>
      </span>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import {BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker,BmLabel} from 'vue-baidu-map'
  export default {
    components: {
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
        keyword: '',
        moveKeyword:'',
        mapStyle: {
          width: '100%',
          height: this.mapHeight + 'px',
        },
        center: {lng: 116.404, lat: 39.915},
        marker: {
            lng: 116.404,
            lat: 39.915
        },
        zoom: 12.8,
        map:{}
      }
    },
    watch: {

    },
    props: {
      initLng:{
        default: 0
      },
      initLat:{
        default: 0
      },
      mapHeight: {
        type: Number,
        default: 500
      }
    },
    computed: {
        ...mapGetters(['getSystemData']),
    },
    created() {
        
    },
    mounted(){
    },
    methods: {
        mapReady({ BMap, map }){
            let geoc = new BMap.Geocoder();
            let point = new BMap.Point(this.initLng, this.initLat);
            geoc.getLocation(point,(rs)=> {
                this.keyword = rs.address;
            });
            if(this.initLng && this.initLat){
                this.marker.lng = this.initLng;
                this.marker.lat = this.initLat;
                this.center.lng = this.initLng;
                this.center.lat = this.initLat;
            }else{
                this.marker.lng = this.getSystemData.init_longitude;
                this.marker.lat = this.getSystemData.init_latitude;
                this.center.lng =  this.getSystemData.init_longitude;
                this.center.lat = this.getSystemData.init_latitude;
            }
            this.map=map;
        },
      /***
       * 地图点击事件。
       */
      getClickInfo (e) {
        // 解构写法
        const {lng, lat} =e.point;
        this.marker.lng = lng;
        this.marker.lat = lat;
        this.center.lng = lng;
        this.center.lat = lat;
        let geoc = new BMap.Geocoder();
        let point = new BMap.Point(lng, lat);
        geoc.getLocation(point,(rs)=> {
            this.province=rs.addressComponents.province;
            console.log(this.province)
            this.keyword = rs.address;
        });
        this.zoom = e.target.getZoom();
      },
    //   syncCenterAndZoom (e) {
    //     const {lng, lat} = e.target.getCenter()
    //     this.center.lng = lng
    //     this.center.lat = lat
    //     this.zoom = e.target.getZoom()
    //   },
      movetokeyword(){
        if(this.keyword){
            this.moveKeyword=this.keyword;
            this.$nextTick(()=>{
                setTimeout(()=>{
                        const {lng, lat} =this.map.getViewport().center;
                        this.marker.lng = lng;
                        this.marker.lat = lat;
                },1000)
            })
        }
      },
      /***
       * 确认
       */
      confirm: function () {
        if(!this.keyword) return this.$message.warning('请点击地图以确认信息！');
         let geoData = {
             province:this.province,
             address:this.keyword,
             lng: this.marker.lng,
             lat: this.marker.lat,
         };
         if (geoData.address == ''){
             geoData.lng = '';
             geoData.lat = '';
         }  
         this.$emit('map-confirm',geoData);
      },
      /***
       * 取消
       */
      cancel: function () {
        this.keyword = '';
        this.center= {lng: 116.404, lat: 39.915};
        this.$emit('map-cancel', false);
      }
    }
  }
</script>
<style lang="scss">
    .anchorBL{
        display:none;
    }
    .BMap_Marker:not(:first-child){
        div{
            img{
                width:8px;
                height: 8px;
            }
        }
    }
</style>
<style scoped lang="scss">
    .map-container{
        border:1px solid rgb(0, 188, 212);
        overflow: auto;
    }
    .serachinput{
        margin-top: 10px;
        margin-left: 10px;
        width: 300px;
        font-size: 16px;
    }
    .dialog-footer{
        float: right;
        margin-top: 10px;
    }
</style>
