<template>
  <baidu-map class="bm-view" :center="circleCenter" @ready="mapReady" :draggable="true" :scroll-wheel-zoom="true" :zoom="zoom" ak="ReZ0710iNBi0WMqba92sDLF6aqO6uy16">
    <bm-view style="width: 100%; height:100%"></bm-view>
    <bm-marker :position="circleCenter"  :icon="{url: '/img/position_red.png', size: {width:30, height: 30}}"></bm-marker>
    <bm-circle :center="circleCenter" :radius="radius" stroke-color="#9c26b0" :stroke-opacity="0.8" :stroke-weight="2" :editing="false"></bm-circle>
  </baidu-map>
</template>

<script>
import {BaiduMap, BmView,BmMarker,BmCircle} from 'vue-baidu-map'
  export default {
    components: {
      BaiduMap,
      BmView,
      BmMarker,
      BmCircle
    },
    props: {
        initLng:{
            default: 116.404
        },
        initLat:{
            default: 39.915
        },
        initRadius: {
            type: Number,
            default: 100
        },
        initzoom:{
            default: 19
        }
    },
    data () {
        return {
            circleCenter: {
                lng: 116.404,
                lat: 39.915
            },
            radius: 100,
            zoom:5
        }
    },
    created(){
    },
    mounted(){
    },
    methods: {
        mapReady({ BMap, map }){
            this.zoom = this.initzoom;
            this.radius = this.initRadius;
            this.circleCenter.lng = this.initLng;
            this.circleCenter.lat = this.initLat;
        },
    }
}
</script>
<style scoped lang="scss">
    .map-container{
        border:1px solid rgb(0, 188, 212);
        overflow: auto;
    }
</style>
