<template>
    <div class="gauge-chart">
        <h3 class="title" :style="options.titleStyle">{{options.title}}</h3>
        <div class="chart-main" :class="options.chartID"></div>
    </div>
</template>
<script>
import validateConfig from '../utils/validateConfig'
import {Debounce,showChartTip} from '../utils/utils'
export default {
    data() {
        return {
            chartMain:{},
            rule: {
                chartID:{
                    type:String,
                    required:true,
                },
                data:{
                    type:Array,
                    required:true
                },
                color:{
                    type:String,
                    required:false,
                    default:'#fa9b25'
                },
                bgColor:{
                    type:String,
                    required:false,
                    default:'#0E1327'
                },
                title:{
                    type:String,
                    required:false,
                    default:''
                },
                chartName:{
                    type:String,
                    required:false,
                    default:''
                },
                grid:{
                    type:Object,
                    required:false,
                    default: {
                        top: 60,
                        left: 100,
                        right: 100,
                        height: 200
                    }
                },
                unit:{
                    type:String,
                    required:false,
                    default:''
                },
                zoom:{
                    type:Number,
                    required:false,
                     default:0.1
                },
                isMoreData:{
                    type:Boolean,
                    required:true,
                    default:false
                }
            },
            chartParams:{},
            initData:[],
            startPoint:0,
            lastPoint:0,
            canScroll:true
        };
    },
    props: {
       config:{}
    },
    computed: {
        options(){
            return validateConfig(this.rule,this.config);
        },
    },
    created() {
    },
    mounted() {
        this.initPage();
    },
    methods: {
        setOption(val){
            this.chartParams = validateConfig(this.rule,val);
            this.initData = val.data;
            this.chartMain.setOption(this.chartOptions(this.chartParams));
        },
        initPage(){
            this.chartMain = echarts.init(document.getElementsByClassName(this.options.chartID)[0]);
            this.chartMain.on('dataZoom',(params)=>{
                Debounce(()=>{
                    if(params.end==100 && this.canScroll){
                        showChartTip.loading(this.chartMain);
                        this.startPoint = params.start;
                        this.$emit('loadMoreData',this.chartMain);
                    }
                },500)();
            });
        },
        loadMoreData(newChuank,isMoreData){
            if(!isMoreData) return;  
             // 获取数据重新赋值
            this.chartMain.hideLoading();
            let newData = this.initData.concat(newChuank);
            this.startPoint = this.initData[Math.floor(this.initData.length*this.startPoint/100)].label;
            this.chartParams.data = newData;
            this.chartMain.setOption(this.chartOptions(this.chartParams))
            this.chartMain.dispatchAction({
                type: 'dataZoom',
                startValue: this.startPoint,
                endValue: this.initData[this.initData.length-1].label
            });
            this.lastPoint = newData[newData.length-1].label;
            this.canScroll = isMoreData;
            this.initData = newData;
        },
        chartOptions(params) {
            let dataArr = params.data;
            let grid = params.grid;
            let chartName = params.chartName;
            let zoom = params.zoom;
            let unit = params.unit;
            let bgColor = params.bgColor;
            let color = params.color;
            return {
                color: color,
                tooltip: {
                    trigger: "axis"
                },
                grid:grid,
                xAxis: {
                    axisLine: { show: true, lineStyle: { color: "#0392ee" } },
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontWeight: "normal",
                            fontSize: "12"
                        }
                    },
                    data: dataArr.map((item)=> {return item.label;})
                },
                yAxis: {
                    name: unit,
                    min: 0,
                    splitLine: {
                        show: false
                    },
                    axisLine: { show: true, lineStyle: { color: "#0392ee" } },
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontWeight: "normal",
                            fontSize: "12"
                        }
                    }
                },
                dataZoom: [
                    {
                        type: "slider",
                        endValue: dataArr[Math.floor(dataArr.length * zoom)].label,
                        backgroundColor: "#fff",
                        textStyle: {
                            color: "#fa9b25"
                        }
                    },
                ],
                series: {
                    name: chartName,
                    type: "line",
                    sampling:"average",
                    data: dataArr.map((item)=> {return item.value;})
                }
            };
        },
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.gauge-chart{
    height: 100%;
    padding: 10px;
    position: relative;
    .title{
        position: absolute;
        top:20px;
        left:20px;
        z-index: 1000;
    }
    .chart-main{
        height: 100%;
    }
}

</style>
