<template>
    <div id="Visualization" class="Visualization">
        <VisualTemplate :option="mainConfig">
            <div slot="one" class="slot-box">
               <Periodictable3D :options="Periodictable3DOption"></Periodictable3D>
            </div>
        </VisualTemplate>
    </div>
</template>

<script>
import api from "assets/js/api";
import { showChartTip } from "assets/js/utils";
import VisualTemplate, { visualSetOptions} from 'components/visual-platform/index'
import {GaugeOne,TitlePanelOne,TitlePanelTwo,LineOne} from 'components/visual'
import Periodictable3D from 'components/visual/Periodictable_3D.vue'
export default {
    components:{
        VisualTemplate,
        Periodictable3D
    },
    data() {
        return {
            Periodictable3DOption:{
                width:1850,
                height:820
            },
            defConfig:{
                title:{
                    top:20,
                    timeShow:false  
                },
                sectionArr:[
                    {
                        id:'one',
                        title:{name:'Periodictable3D',size:18,position:{x:20,y:20},color:'#fff',isShow:false},
                        height:870,
                        width:1900,
                        borderOptions:{
                            type:8,
                            dur:11
                        },
                        position:{
                            x:10,
                            y:60
                        },
                    }
                ],
            },
            mainConfig:{}
        }
    },
    computed: {},
    created() {
        this.mainConfig = visualSetOptions(this.defConfig);
    },
    mounted() {
    },
    methods: {
       
    },
    watch: {
    },
};
</script>
<style lang="scss">
  
</style>
<style scoped lang="scss">
.Visualization{
    height: 100%;
    .slot-box{
        height: 100%;
    }
}
</style>
