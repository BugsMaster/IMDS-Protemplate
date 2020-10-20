<template>
    <bm-overlay
        ref="customOverlay"
        class="sample"
        pane="markerPane"
        @draw="draw"
    >
        <slot name="content"></slot>
    </bm-overlay>
</template>

<script>
import { BmOverlay } from "vue-baidu-map";
export default {
    components: {
        BmOverlay
    },
    props:{
        position:{
            type: Object,
            default: () =>{
                return {
                    lng: 116.404,
                    lat: 39.915
                }
            }
        }
    },
    mounted(){
    },
    watch: {
    },
    methods: {
        draw({ el, BMap, map }) {
            const { lng, lat } = this.position;
            const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
            el.style.left = pixel.x - 30 + "px";
            el.style.top = pixel.y + 30 + "px";
        }
    }
};
</script>

<style scoped>
.sample {
    width: 200px;
    background: rgba(0, 0, 0,1);
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);
    position: absolute;
}
</style>