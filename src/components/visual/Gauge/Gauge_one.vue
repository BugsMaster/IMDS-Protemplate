<template>
    <div class="gauge-chart">
        <div class="chart-main" :class="options.chartID"></div>
    </div>
</template>
<script>
import validateConfig from '../utils/validateConfig'
export default {
    data() {
        return {
            chartMain:{},
            rule: {
                chartID:{
                    type:String,
                    required:true,
                },
                name:{
                    type:String,
                    required:false,
                    default:''
                },
                value:{
                    type:Number,
                    required:false,
                    default:0
                },
                unit:{
                    type:String,
                    required:false,
                    default:''
                },
                max:{
                    type:Number,
                    required:false,
                    default:100
                },
                bgColor:{
                    type:String,
                    required:false,
                    default:'#0E1327'
                },
            },
        };
    },
    props: {
       config:{}
    },
    computed: {
        options(){
            return validateConfig(this.rule,this.config);
        }
    },
    created() {
    },
    mounted() {
        this.initPage();
    },
    methods: {
        setOption(val){
            this.chartMain.setOption(this.chartOptions(val.name,val.value,val.unit,val.max,val.bgColor));
        },
        initPage(){
            this.chartMain = echarts.init(document.getElementsByClassName(this.options.chartID)[0]);
        },
        chartOptions(chartname,dataValue=0,unit='',max=100,bgColor='#0E1327') {
            return {
                backgroundColor: bgColor,
                tooltip: {
                    formatter: `{a} <br/>{b} : {c}`+unit,
                },
                series: [
                    {
                        name: "实时数据",
                        type: "gauge",
                        radius: "55%",
                        splitNumber: 10,
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [dataValue / max, '#468EFD'],
                                    [1, "#111F42"],
                                ],
                                width: 8,
                            },
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        itemStyle: {
                            show: false,
                        },
                        detail: {
                            formatter: (value)=> {
                                return dataValue.toFixed(1)  + ' '+unit;
                            },
                            offsetCenter: [0, 82],
                            textStyle: {
                                padding: [0, 0, 0, 0],
                                fontSize: 18,
                                fontWeight: "700",
                                color: '#468EFD',
                            },
                        },
                        title: {
                            show: true,
                            offsetCenter: [0, 46],
                            textStyle: {
                                color: "#fff",
                                fontSize: 16, //表盘上的标题文字大小
                                fontWeight: 400,
                                fontFamily: "PingFangSC",
                            },
                        },
                        data: [
                            {
                                name: chartname,
                                value: parseInt(dataValue * 100 / max),
                            },
                        ],
                        pointer: {
                            show: true,
                            length: "75%",
                            radius: "20%",
                            width: 10,
                        },
                        animationDuration: 4000,
                    },
                    {
                        name: "外部刻度",
                        type: "gauge",
                        radius: "75%",
                        min: 0, 
                        max: max,
                        splitNumber: 10,
                        startAngle: 225,
                        endAngle: -45,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
                                color: [[1, "rgba(0,0,0,0)"]],
                            },
                        }, //仪表盘轴线
                        axisLabel: {
                            show: true,
                            color: "#4d5bd1",
                            distance: 25,
                            formatter: function(v) {
                                return v;
                            },
                        }, //刻度标签。
                        axisTick: {
                            show: true,
                            splitNumber: 7,
                            lineStyle: {
                                color: '#468EFD', //用颜色渐变函数不起作用
                                width: 1,
                            },
                            length: -8,
                        }, //刻度样式
                        splitLine: {
                            show: true,
                            length: -20,
                            lineStyle: {
                                color: '#468EFD', //用颜色渐变函数不起作用
                            },
                        }, //分隔线样式
                        detail: {
                            show: false,
                        },
                        pointer: {
                            show: false,
                        },
                    },
                ],
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
    .chart-main{
        height: 100%;
    }
}

</style>
