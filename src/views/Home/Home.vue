<template>
    <div id="Visualization" class="Visualization">
        <VisualTemplate :option="mainConfig">
            <div
                v-for="item in mainConfig.sectionArr"
                :slot="item.id"
                class="slot-box animated fadeInUp"
            >
                <component :is="item.id"></component>
            </div>
        </VisualTemplate>
    </div>
</template>

<script>
import api from "assets/js/api";
import { showChartTip } from "assets/js/utils";
import VisualTemplate, { visualSetOptions} from 'components/visual-platform/index'
import DeviceModel from 'views/Home/DeviceModel'
import Fly from 'views/Home/Fly'

export default {
    components:{
        VisualTemplate,
        DeviceModel,
        Fly
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
                        id: "Fly",
                        title: {
                        name: "飞机",
                        size: 64,
                        position: { x: 520, y: 20 },
                        color: "#3ad3ec",
                        isShow: false,
                        },
                        width: 1800,
                        height: 800,
                        borderOptions: {
                        type: 0,
                        },
                        position: {
                            x: 100,
                            y: 128,
                            zIndex: 11,
                        },
                    },
                    {
                        id:'DeviceModel',
                        title:{name:'Periodictable3D',size:18,position:{x:20,y:20},color:'#fff',isShow:true},
                        height:920,
                        width:1920,
                        borderOptions:{
                            type:7,
                        },
                        position:{
                            x:0,
                            y:0,
                            zIndex: 5,
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
        ddd(){
            console.log(999)
        }
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
.box{
    background-color: #e9e9e9;
    position: absolute;
    left: 700px;
    top: 100px;
    padding: 100px;
    z-index: 1000;
    li{
        margin-bottom: 70px;
    }
}
</style>
