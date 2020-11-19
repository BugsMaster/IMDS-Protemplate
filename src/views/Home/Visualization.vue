<template>
    <div id="Visualization" class="Visualization">
        <VisualTemplate :option="mainConfig">
            <!-- 依次写出需要展示的单元 -->
            <!-- <div class="box" :slot="index" v-for="(item,index) in mainConfig.sectionArr">
                <span>{{item}}</span>   
            </div> -->
            <div slot="log1" class="slot-box">
                <GaugeOne :ref="GaugeOneOption.chartID" :config="GaugeOneOption"></GaugeOne>
            </div>
            <div slot="log2" class="slot-box">
               <Periodictable3D :options="Periodictable3DOption"></Periodictable3D>
            </div>
            <div slot="log3" class="slot-box">
                <LineOne :ref="LineOneOption.chartID" :config="LineOneOption" @loadMoreData="loadMoreData"></LineOne>
            </div>
            <div slot="log4" class="slot-box">
                <div class="clearfix">
                    <dv-decoration-3 style="width:250px;height:30px;float:right" />
                </div>
                <FlipClock class="flip-clock"></FlipClock>
                <ul class="box">
                    <li>
                        <ButtonOne :config="{type:1}"></ButtonOne>
                    </li>
                    <li>
                        <ButtonOne :config="{type:2}"></ButtonOne>
                    </li>
                    <li>
                        <ButtonOne :config="{type:3}"></ButtonOne>
                    </li>
                    <li>
                        <ButtonOne :config="{type:4}"></ButtonOne>
                    </li>
                </ul>
            </div>
            <div slot="log5" class="slot-box" style="padding:30px">
               <TitlePanelOne :config="titlePanel_one_config"></TitlePanelOne>
            </div>
            <div slot="log6" class="slot-box">
                <GaugeOne :ref="GaugeOneOption_ex.chartID" :config="GaugeOneOption_ex"></GaugeOne>
            </div>
            <div slot="log7" class="slot-box" style="padding:90px 20px 0;">
                <TitlePanelTwo :config="titlePanel_two_config"></TitlePanelTwo>
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
import FlipClock from 'components/FlipClock'
import {ButtonOne} from 'components/visual'
export default {
    components:{
        VisualTemplate,
        GaugeOne,
        TitlePanelOne,
        TitlePanelTwo,
        Periodictable3D,
        LineOne,
        FlipClock,
        ButtonOne
    },
    data() {
        return {
            num:0,
            LineOneOption:{
                chartID:'LineOne',
                data:[
                    // {
                    //     label:'2019',
                    //     value:123
                    // },
                    // {
                    //     label:'2020',
                    //     value:456
                    // }
                ],
                color:'#fa9b25',
                bgColor:'#0E1327',
                title:'万级数据',
                titleStyle:{
                    color:'#fff',
                },
                grid:{
                    top: 60,left: 100,right: 100,height: 100
                },
                chartName:'速度',
                unit:'',
                isMoreData:false
            },
            GaugeOneOption:{
                chartID:'GaugeOne',
                name:"速率",
                value: 50,
                unit:'kb/s',
                bgColor:'#0E1327',
                max:180
            },
            GaugeOneOption_ex:{
                chartID:'Gaugeother',
                name:"速度",
                value: 120,
                unit:'km/s',
                bgColor:'#0E1327',
                max:220
            },
            titlePanel_one_config:{
                data:[
                    {title:'服务项目',num:'7,2263'},
                    {title:'服务项目',num:'5340'},
                    {title:'服务项目',num:'3,2265'},
                    {title:'服务项目',num:'5000'},
                    {title:'服务项目',num:'301'},
                    {title:'服务项目',num:'3,2265'},
                    {title:'服务项目',num:'2,2263'},
                    {title:'服务项目',num:'2000'},
                    {title:'服务项目',num:'301'},
                    {title:'服务项目',num:'3,2265'},
                    {title:'服务项目',num:'2,2263'},
                    {title:'服务项目',num:'2000'},

                ],
                rows:3,
            },
            titlePanel_two_config:{
                data: [
                    {title:'初始化',num:'7,2263',icon:'nucfont inuc-init',iconBgColor:'blue',titleColor:'#0081ff'},
                    {title:'正常',num:'5340',icon:'nucfont inuc-right',iconBgColor:'green',titleColor:'#39b54a'},
                    {title:'诊断',num:'3,2265',icon:'nucfont inuc-fold-line',iconBgColor:'orange',titleColor:'#fa9b25'},
                    {title:'故障',num:'5000',icon:'nucfont inuc-wrong',iconBgColor:'red',titleColor:'#fd2671'},
                    {title:'关机',num:'701',icon:'nucfont inuc-shut-down',iconBgColor:'black',titleColor:'#333333'},
                    {title:'未知',num:'301',icon:'nucfont inuc-noconnect',iconBgColor:'grey',titleColor:'#aaaaaa'}
                ],
                bgColor:'#fff',
                numColor:'#999',
                numSize:'14px',
                countColor:'#ccc',
                countSize:'24px',
                lineColor:'#ddd',
                titleSize:'16px'
            },
            Periodictable3DOption:{
                width:750,
                height:540
            },
            defConfig:{
                title:{
                  timeShow:false  
                },
                sectionArr:[
                    {
                        id:'log1',
                        title:{name:'消息速率',size:18,position:{x:50,y:50},color:'#fff',isShow:true},
                        width:500,
                        height:500,
                        borderOptions:{
                            type:1,
                            bgColor:'rgba(35,70,107,.3)'
                        },
                        position:{
                            x:1413,
                            y:432
                        },
                    },
                    {
                        id:'log2',
                        title:{name:'two',size:18,position:{x:20,y:20},color:'#fff',isShow:true},
                        width:800,
                        height:600,
                        borderOptions:{
                            type:1
                        },
                        position:{
                            x:555,
                            y:330
                        },
                    },
                    {
                        id:'log3',
                        title:{name:'three',size:18,position:{x:20,y:20},color:'#fff',isShow:true},
                        width:500,
                        borderOptions:{
                            type:2
                        },
                        position:{
                            x:0,
                            y:600
                        },
                    },
                    {
                        id:'log4',
                        title:{name:'four',size:18,position:{x:40,y:20},color:'#fff',isShow:true},
                        borderOptions:{
                            type:3
                        },
                        position:{
                            x:1413,
                            y:100
                        },
                    },
                    {   
                        id:'log5',
                        title:{name:'five',size:18,position:{x:70,y:20},color:'#fff',isShow:true},
                        height:270,
                        borderOptions:{
                            type:4,
                            bgColor:'rgba(35,70,107,1)'
                        },
                        position:{
                            x:10,
                            y:30
                        },
                    },
                    {
                        id:'log6',
                        title:{name:'传送带速度',size:18,position:{x:40,y:40},color:'#fff',isShow:true},
                        borderOptions:{
                            type:8
                        },
                        position:{
                            x:0,
                            y:300,
                        },
                    },
                    {
                        id:'log7',
                        title:{name:'seven',size:18,position:{x:20,y:20},color:'#fff',isShow:true},
                        width:800,
                        borderOptions:{
                            type:11,
                            title:'实时监控',
                            titleWidth:200,
                        },
                        position:{
                            x:555,
                            y:30
                        },
                    },
                ],
            },
            mainConfig:{},
            chartMain:{}
        }
    },
    computed: {},
    created() {
        this.mainConfig = visualSetOptions(this.defConfig);
    },
    mounted() {
        this.GaugeOneStart();
        this.LineOneStart();
        
    },
    methods: {
        GaugeOneStart(){
            setInterval(()=>{
                this.GaugeOneOption_ex = {
                    chartID:'Gaugeother',
                    name:"速度",
                    value: Math.floor(Math.random()*120),
                    unit:'km/s',
                    bgColor:'#0E1327',
                    max:220
                }
                this.$refs[this.GaugeOneOption_ex.chartID].setOption(this.GaugeOneOption_ex);
            },1200);
            setInterval(()=>{
                this.GaugeOneOption = {
                    chartID:'GaugeOne',
                    name:"速率",
                    value: Math.floor(Math.random()*100),
                    unit:'kb/s',
                    bgColor:'#0E1327',
                    max:180
                }
                this.$refs[this.GaugeOneOption.chartID].setOption(this.GaugeOneOption);
            },1000);
        },
        getLineData(fn){
            setTimeout(()=>{
                for (let i = 0; i < 300; i++) {
                    this.LineOneOption.data.push({
                        label:('20-'+this.num)+i,
                        value: 300*Math.sin(i)+i
                    });
                }
                if(fn) fn();
            },2000);
        },
        LineOneStart(){
            this.getLineData(()=>{
                showChartTip.loading(this.$refs[this.LineOneOption.chartID].chartMain);
                this.$refs[this.LineOneOption.chartID].chartMain.hideLoading();
                this.$refs[this.LineOneOption.chartID].chartMain.clear();
                this.$refs[this.LineOneOption.chartID].setOption(this.LineOneOption);
            });
        },
        loadMoreData(chart){
            this.$refs[this.LineOneOption.chartID].chartMain.hideLoading();
            this.$refs[this.LineOneOption.chartID].chartMain.clear();
            let oldData = this.LineOneOption.data;
            let newChuank = [];
            this.num++;
            for (let i = 0; i < 300; i++) {
                newChuank.push({
                    label:('20-'+this.num)+i,
                    value: 300*Math.sin(i)+i
                });
            }
            this.$refs[this.LineOneOption.chartID].loadMoreData(newChuank,true);
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
</style>
