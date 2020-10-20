<template>
  <div class="home" id="home">
    <div class="layoutbox">
        <!-- <div class="map-btn box-shadow nucfont inuc-ditu" @click="$router.push({name:'gismap'});"></div> -->
        <div class="row-one">
            <div class="box hvr-shadow" @mouseenter="hoverIndex=0" @mouseleave="hoverIndex=null">
                <div class="state-lamp box-shadow nucfont inuc-init one"></div>
                <el-card class="box-card">
                    <div slot="header">
                        <p class="name">Number</p>
                        <p class="num">{{statCountData.init}}</p>
                    </div>
                    <div class="item" @click="checkDetail(0)"><span class="blue">初始化</span><span v-if="hoverIndex==0" class="view el-icon-search" title="查看"></span></div> 
                    <el-tooltip v-if="hoverIndex==0" class="tooltip" effect="dark" placement="top">
                        <div slot="content">
                            <p>设备已上电，还未启用</p>
                        </div>
                        <span class="info-angle-border"><i class="nucfont inuc-i-text"></i></span>
                    </el-tooltip>
                </el-card>
            </div>
            <div class="box hvr-shadow" @mouseenter="hoverIndex=1" @mouseleave="hoverIndex=null">
                <div class="state-lamp box-shadow nucfont inuc-right two"></div>
                <el-card class="box-card">
                    <div slot="header">
                        <p class="name">Number</p>
                        <p class="num">{{statCountData.normal}}</p>
                    </div>
                    <div class="item" @click="checkDetail(1)"><span class="green">正常</span><span v-if="hoverIndex==1" class="view el-icon-search" title="查看"></span></div>
                    <el-tooltip v-if="hoverIndex==1" class="tooltip" effect="dark" placement="top">
                        <div slot="content">
                            <p>设备正常工作中（扫描图像）</p>
                        </div>
                        <span class="info-angle-border"><i class="nucfont inuc-i-text"></i></span>
                    </el-tooltip>
                </el-card>
            </div>
            <div class="box hvr-shadow" @mouseenter="hoverIndex=2" @mouseleave="hoverIndex=null">
                <div class="state-lamp box-shadow nucfont inuc-fold-line three"></div>
                <el-card class="box-card">
                    <div slot="header">
                        <p class="name">Number</p>
                        <p class="num">{{statCountData.diagnose}}</p>
                    </div>
                    <div class="item" @click="checkDetail(3)"><span class="orange">诊断</span><span v-if="hoverIndex==2" class="view el-icon-search" title="查看"></span></div>
                    <el-tooltip v-if="hoverIndex==2" class="tooltip" effect="dark" placement="top">
                        <div slot="content">
                            <p>设备进行诊断</p>
                        </div>
                        <span class="info-angle-border"><i class="nucfont inuc-i-text"></i></span>
                    </el-tooltip>
                </el-card>
            </div>
            <div class="box hvr-shadow" @mouseenter="hoverIndex=3" @mouseleave="hoverIndex=null">
                <div class="state-lamp box-shadow nucfont inuc-wrong four"></div>
                <el-card class="box-card">
                    <div slot="header">
                        <p class="name">Number</p>
                        <p class="num">{{statCountData.failure}}</p>
                    </div>
                    <div class="item" @click="checkDetail(2)"><span class="red">故障</span><span v-if="hoverIndex==3" class="view el-icon-search" title="查看"></span></div>
                    <el-tooltip v-if="hoverIndex==3" class="tooltip" effect="dark" placement="top">
                        <div slot="content">
                            <p>设备出现故障</p>
                        </div>
                        <span class="info-angle-border"><i class="nucfont inuc-i-text"></i></span>
                    </el-tooltip>
                </el-card>
            </div>
            <div class="box hvr-shadow" @mouseenter="hoverIndex=4" @mouseleave="hoverIndex=null">
                <div class="state-lamp box-shadow nucfont inuc-shut-down five"></div>
                <el-card class="box-card">
                    <div slot="header">
                        <p class="name">Number</p>
                        <p class="num">{{statCountData.offline}}</p>
                    </div>
                    <div class="item" @click="checkDetail(4)"><span>关机</span><span v-if="hoverIndex==4" class="view el-icon-search" title="查看"></span></div>
                    <el-tooltip v-if="hoverIndex==4" class="tooltip" effect="dark" placement="top">
                        <div slot="content">
                            <p>设备关机下线</p>
                        </div>
                        <span class="info-angle-border"><i class="nucfont inuc-i-text"></i></span>
                    </el-tooltip>
                </el-card>
            </div>
            <div class="box hvr-shadow" @mouseenter="hoverIndex=5" @mouseleave="hoverIndex=null">
                <div class="state-lamp box-shadow nucfont inuc-noconnect six"></div>
                <el-card class="box-card">
                    <div slot="header">
                        <p class="name">Number</p>
                        <p class="num">{{statCountData.unknown}}</p>
                    </div>
                    <div class="item" @click="checkDetail(5)"><span class="grey">未知</span><span v-if="hoverIndex==5" class="view el-icon-search" title="查看"></span></div>
                    <el-tooltip v-if="hoverIndex==5" class="tooltip" effect="dark" placement="top">
                        <div slot="content">
                            <p>设备未联网</p>
                        </div>
                        <span class="info-angle-border"><i class="nucfont inuc-i-text"></i></span>
                    </el-tooltip>
                </el-card>
            </div>
        </div>
        <div class="row-two">
            <div class="box">
                <span class="refresh hvr-icon-spin" title="更新" @click="refresh(1)"><i class="el-icon-refresh hvr-icon"></i></span>
                <div class="chart-box box-shadow one" id="chart-one"></div>
                <el-card class="box-card">
                    <div slot="header">
                        <p class="name">设备运行时长</p>
                        <p class="num">对设备运行时长进行有效统计</p>
                    </div>
                    <div class="item"><span class="el-icon-time"></span> Updated {{updataTime}}</div>
                </el-card>
            </div>
            <div class="box">
                <span class="refresh hvr-icon-spin" title="更新" @click="refresh(2)"><i class="el-icon-refresh hvr-icon"></i></span>
                <div class="chart-box box-shadow two" id="chart-two"></div>
                <el-card class="box-card">
                    <div slot="header">
                        <p class="name">设备扫包数</p>
                        <p class="num">对设备扫包数量进行有效统计</p>
                    </div>
                    <div class="item"><span class="el-icon-time"></span> Updated {{updataTime}}</div>
                </el-card>
            </div>
            <div class="box">
                <!-- <span class="refresh hvr-icon-spin" title="更新" @click="refresh(3)"><i class="el-icon-refresh hvr-icon"></i></span> -->
                <div class="chart-box box-shadow three" id="chart-three"></div>
                <el-card class="box-card">
                    <div slot="header">
                        <p class="name">设备消息速率</p>
                        <p class="num">对设备消息速率进行实时监控</p>
                    </div>
                    <div class="item"><span class="el-icon-time"></span> Updated {{updataTime}}</div>
                </el-card>
            </div>
        </div>
        <div class="row-three">
            <div class="box">
                <div class="icon box-shadow nucfont inuc-pie-chart"></div>  
                <el-tooltip class="modle-btn" :content="$t('c.viewTransform')" placement="top">
                    <el-switch class="model-btn" v-model="typeShowModel" active-color="#39b54a" inactive-color="#9000ff" @change="switchChange"></el-switch>
                </el-tooltip>
                <el-card class="box-card">
                    <div slot="header">
                        <p class="name">设备类型</p>
                    </div>
                    <div class="type-container">
                        <div class="type-box" v-show="typeShowModel">
                            <div id="type" class="chart"></div>
                        </div>
                        <div class="type-table" v-show="!typeShowModel">
                            <ul class="title">
                                <li>类型</li>
                                <li>厂商</li>
                                <li>型号</li>
                                <li>数量 <span class="blue">({{total}})</span></li>
                                <li>百分比(%)</li>
                            </ul>
                            <ul class="content">
                                <li v-for="item in serieData">
                                    <div class="one">
                                        <p class="type">{{item.name}}</p>
                                        <div class="two">
                                            <div class="three" v-for="per in item.children">
                                                <p class="manufacturer">{{per.name}}</p>
                                                <div class="four">
                                                    <div class="five" v-for="el in per.children">
                                                        <p>{{el.name}}</p>
                                                        <p class="blue">{{el.count}}</p>
                                                        <p class="blue">{{el.percentage}} %</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="box">
                <div class="icon box-shadow el-icon-s-data"></div>
                <el-card class="box-card">
                    <div slot="header">
                        <p class="name">设备扫包排行榜</p>
                    </div>
                    <dv-scroll-ranking-board :config="deviceBagageCount" class="warn-info"/>
                    <!-- <div class="warn-info" v-if="XRayWarnInfoData.length">
                        <ul class="title-ul">
                            <li class="purple">{{$t('title.equipmentID')}}</li>
                            <li class="blue">{{$t('title.module')}}</li>
                            <li class="danger">{{$t('title.warningCode')}}</li>
                            <li>故障描述</li>
                            <li>{{$t('c.date')}}</li>
                        </ul>
                        <div class="content">
                            <ul class="content-item" v-for="(item,index) in XRayWarnInfoData" :key="index">
                                <li>{{item.eqp_num}}</li>
                                <li>{{item.unit_name}}</li>
                                <li>{{item.error_code}}</li>
                                <li>{{item.error_desc}}</li>
                                <li>{{item.clock}}</li>
                            </ul>
                        </div>         
                    </div>
                    <div class="warn-info" v-else>
                        <Nodata></Nodata>
                    </div>  -->
                </el-card>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import api from 'assets/js/api'
import { Shuffle,formatSeconds,showChartTip} from 'assets/js/utils'
import Nodata from 'components/Nodata.vue'
import { setTimeout } from 'timers';
let chartOne;
let chartTwo;
let chartThree;
let typePieChart;
export default {
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
            updataTime:'',
            updataTime:'',
            typeShowModel:false,
            serieData:[],
            total:0,
        }
    },
    created() {
    },
    mounted(){
        this.initPage();
    },
    computed: {
        XRayWarnInfoData(){
            return this.$store.state.XRayErrorData;
        },
        deviceBagageCount(){
            let data = [];
            for (const key in this.$store.state.deviceBagageCount) {
                data.push({
                    name:key,
                    value: this.$store.state.deviceBagageCount[key].value
                })
            }
            return {data};
        }
    },
    methods: {
        initPage(){
            // 初始化echart
            chartOne = echarts.init(document.getElementById("chart-one"));
            chartTwo = echarts.init(document.getElementById("chart-two"));
            chartThree = echarts.init(document.getElementById("chart-three"));
            api.getAnalysisDuration().then(data => {
                chartOne.setOption(this.chartOneOption(data.info));
            });
            api.getAnalysisBagage().then(data=>{
                chartTwo.setOption(this.chartTwoOption(data.info));
            });
            // 初始化消息速率
            let tempData = [
                {
                    clock:" "+new Date().toLocaleTimeString(),
                    count:0,
                }
            ];
            chartThree.setOption(this.chartThreeOption(tempData));
            let currentDate = new Date();
            this.updataTime = currentDate.toLocaleDateString()+' '+currentDate.toTimeString().split(' ')[0];
            // api.getAnalysisHealth().then(data=>{
            //     this.updataTime=data.updated_time;
            //     chartThree.setOption(this.chartThreeOption(data.info));
            // })
            // api.getStatsEqpSerie().then(data=>{
            //     data.forEach(element => {
            //         element.value=element.count;
            //     });
            //     typePieChart = echarts.init(document.getElementById("type"));
            //     typePieChart.setOption(this.customPicOption(data));
            // })
            api.getAnalysisSerie().then(data=>{
                data.forEach(item=>{
                    this.total += item.count;
                })
                data.forEach(item=>{
                    item.value=item.count;
                    item.children.forEach(per=>{
                        per.value=per.count;
                        per.children.forEach(el=>{
                            el.value=el.count;
                            el.percentage=Math.floor(el.count/this.total*10000)/100;
                        })
                    })
                })
                this.serieData=data;
            })
        },
        refresh(type){
            switch (type) {
                case 1:
                    showChartTip.loading(chartOne);
                    api.getAnalysisDuration().then(data => {
                        setTimeout(()=>{
                            chartOne.hideLoading();
                        },1000)
                        chartOne.setOption(this.chartOneOption(data.info));
                    });
                    break;
                case 2:
                    showChartTip.loading(chartTwo);
                    api.getAnalysisBagage().then(data=>{
                        setTimeout(()=>{
                            chartTwo.hideLoading();
                        },1000)
                        chartTwo.setOption(this.chartTwoOption(data.info));
                    });
                    break;
                default:
                    break;
            }
        },
        switchChange(val){
            if(val){
                typePieChart = echarts.init(document.getElementById("type"));
                $('#type').width($('.type-container').width()).height($('.type-container').height());
                typePieChart.setOption(this.typePieOption(this.serieData));
                typePieChart.resize();
            }
        },
        checkDetail(status){
            this.$router.push({name:'devicelist',params:{status:status}});
        },
        chartOneOption(dataArr) {
            return {
                grid: {
                    left: 60,
                    right: 20,
                    top: 40,
                    bottom: 40,
                },
                legend:{
                    data:['平均运行时长','总运行时长'],
                    selected:{
                        '平均运行时长':true,
                        '总运行时长':false
                    },
                    textStyle: {
                        color: 'white'
                    },
                    top:10,
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "line",
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    formatter: (params)=> {
                        if(params.length==1){
                            return `${params[0].name}<br />${params[0].seriesName}：${formatSeconds(params[0].value*60)}`;
                        }else{
                            return `${params[0].name}<br />${params[0].seriesName}：${formatSeconds(params[0].value*60)}
                                    <br /><span>${params[1].seriesName}：</span>${formatSeconds(params[1].value*60)}`;
                        }
                    }
                },
                xAxis: {
                    data: dataArr.map(item=>{
                        return item.date;
                    }),
                    axisLine: {
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    axisLabel: {
                        color: "#fff",
                        fontSize: 12,
                    }
                },
                yAxis: {
                    name: `( min )`,
                    nameTextStyle: {
                        color: "#fff",
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    axisLabel: {
                        color: "#fff",
                        fontSize: 12
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#0177d4"
                        }
                    }
                },
                dataZoom: [
                    {
                        type: "inside"
                    }
                ],
                series: [{
                    name: '平均运行时长',
                    type: "line",
                    smooth: true,
                    itemStyle: {
                        normal: {color:"#b4189e"}
                    },
                    data: dataArr.map(item=> {
                        return item.avg/60;
                    })
                },{
                    name: '总运行时长',
                    type: "line",
                    smooth: true,
                    itemStyle: {
                        normal: {color:"#fd8904"}
                    },
                    data: dataArr.map(item=>{
                        return item.total/60;
                    }),
                }]
            };
        },
        chartTwoOption(dataArr) {
            return {
                color: '#fff',
                grid: {
                    left: 80,
                    right: 20,
                    top: 40,
                    bottom: 40,
                },
                legend:{
                    data:['平均扫包数量','总扫包数量'],
                    selected:{
                        '总扫包数量':true,
                        '平均扫包数量':false
                    },
                    textStyle: {
                        color: 'white'
                    },
                    top:10,
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                        crossStyle: {
                            color: "#384757"
                        }
                    },
                    formatter: (params)=> {
                        if(params.length==1){
                            return `${params[0].name}<br />${params[0].seriesName}：${params[0].value}`;
                        }else{
                            return `${params[0].name}<br />${params[0].seriesName}：${params[0].value}
                                    <br />${params[1].seriesName}：${params[1].value}`
                        }
                       
                    }
                },
                xAxis: {
                    data: dataArr.map(item=>{
                        return item.date.substring(5);
                    }),
                    axisLine: {
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    axisLabel: {
                        color: "#fff",
                        fontSize: 12,
                    }
                },
                yAxis: {
                    name: `( num )`,
                    nameTextStyle: {
                        color: "#fff",
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    axisLabel: {
                        color: "#fff",
                        fontSize: 12
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#0177d4"
                        }
                    }
                },
                dataZoom: [
                    {
                        type: "inside"
                    }
                ],
                series: [
                    {
                        name: '平均扫包数量',
                        type: "bar",
                        barWidth: 18,
                        smooth: true,
                        data: dataArr.map(item=>{
                            return item.avg;
                        }),
                        color:'#fa9b25'
                    },
                    {
                        name: '总扫包数量',
                        type: "bar",
                        barWidth: 18,
                        smooth: true,
                        data: dataArr.map(item=>{
                            return item.total;
                        }),
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "#f43f3b"
                                        },
                                        {
                                            offset: 0.8,
                                            color: "#ec008c"
                                        }
                                    ],
                                    false
                                )
                            }
                        },
                    },
                ]
            };
            
        },
        chartThreeOption(dataArr) {
            return {
                color: '#fff',
                grid: {
                    left: 50,
                    right: 20,
                    top: 40,
                    bottom: 40,
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                        crossStyle: {
                            color: "#384757"
                        }
                    },
                    formatter: (params)=> {
                        return `${params[0].name}<br />${params[0].seriesName}：${params[0].value}`
                    }
                },
                xAxis: {
                    data: dataArr.map(item=>{
                        return item.clock.split(' ')[1];
                    }),
                    axisLine: {
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    axisLabel: {
                        color: "#fff",
                        fontSize: 12,
                    }
                },
                yAxis: {
                    name: `( num/s )`,
                    nameTextStyle: {
                        color: "#fff",
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    axisLabel: {
                        color: "#fff",
                        fontSize: 12
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#0177d4"
                        }
                    }
                },
                dataZoom: [
                    {
                        type: "inside"
                    }
                ],
                series: [{
                        name: '速率',
                        type: "bar",
                        barWidth: 18,
                        smooth: true,
                        data: dataArr.map(item=>{
                            return item.count;
                        }),
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "#1cbbb4"
                                        },
                                        {
                                            offset: 0.8,
                                            color: "#0081ff"
                                        }
                                    ],
                                    false
                                )
                            }
                        },
                    },
                ]
            };
        },
        typePieOption(dataArr){
            let oneCircleData=[];
            let twoCircleData=[];
            let threeCircleData=[];
            dataArr.forEach(item=>{
                oneCircleData.push(item);
                item.children.forEach(per=>{
                    twoCircleData.push(per);
                    per.children.forEach(el=>{
                        threeCircleData.push(el);
                    })
                })
            })
            return {
                backgroundColor:"rgba(11,24,55,.8)",
                color: [
                    '#0cabff','#49cd45','#fd2671','#fa9b25','#7399fe','#9fd0f5','#ef9379', '#fad665', '#4c8bf5', '#47e1ac', '#e0abf9'
                ],
                grid: {
                    left: '5',
                    top: '5%',
                    bottom: '50%',
                    right: '5%',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    type: "scroll",
                    orient: "vartical",
                    // x: "right",
                    top: "center",
                    right: "5",
                    // bottom: "0%",
                    itemWidth: 16,
                    itemHeight: 8,
                    itemGap: 16,
                    textStyle: {
                        color: '#A3E2F4',
                        fontSize: 12,
                        fontWeight: 0
                    },
                    data: dataArr.map(item=>{return item.serie})
                },
                polar: {},
                angleAxis: {
                    interval: 1,
                    type: 'category',
                    data: [],
                    z: 10,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#0B4A6B",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        show: true,
                        color: "#0B4A6B",
                        margin: 8,
                        fontSize: 16
                    },
                },
                radiusAxis: {
                    min: 35,
                    max: 40,
                    interval: 1,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#0B3E5E",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        formatter: '{value} %',
                        show: false,
                        padding: [0, 0, 20, 0],
                        color: "#0B3E5E",
                        fontSize: 16
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#0B3E5E",
                            width: 2,
                            type: "solid"
                        }
                    }
                },
                calculable: true,
                series: [
                {
                    name:'数量',
                    type: 'pie',
                    radius: [0, '30%'],
                    label: {
                        normal: {
                            show: true,
                            formatter:"{b} : {c} ({d}%)",
                            textStyle: {
                                fontSize: 12,
                            },
                            position: 'inner'
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                    },
                    data: oneCircleData
                }, 
                {
                    name:'数量',
                    type: 'pie',
                    radius: ['40%', '50%'],
                    zlevel:10,
                    label: {
                        normal: {
                            show: true,
                            formatter:"{b} : {c} ({d}%)",
                            textStyle: {
                                fontSize: 12,
                            },
                            position: 'inner'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                    },
                    data: twoCircleData
                },
                {
                    name:'数量',
                    type: 'pie',
                    radius: ['60%', '75%'],
                    clockWise: true,//顺时针 
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    zlevel:10,
                    label: {
                        normal: {
                            show: true,
                            formatter:"{b} : {c} ({d}%)",
                            textStyle: {
                                fontSize: 12,
                            },
                            position: 'outside'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 20,
                            length2: 55
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: threeCircleData
                },]
            }
        },
    },
    watch: {
        "$store.state.XRayStateData": function(val){
            this.statCountData.init = 0;
            this.statCountData.normal = 0;
            this.statCountData.diagnose = 0;
            this.statCountData.failure = 0;
            this.statCountData.offline = 0;
            this.statCountData.unknown = 0;
            for (const key in val) {
                switch (val[key].state_name) {
                    case '初始化':
                        this.statCountData.init++;
                        break;
                    case '正常':
                        this.statCountData.normal++;
                        break;
                    case '故障':
                        this.statCountData.failure++;
                        break;
                    case '诊断中':
                        this.statCountData.diagnose++;
                        break;
                    case '关机':
                        this.statCountData.offline++;
                        break;
                    default:
                        this.statCountData.unknown++;
                        break;
                }
            }
        },
        "$store.state.deviceMessageCount": function(val){
            console.log("设备消息速率",val)
            chartThree.setOption(this.chartThreeOption(val));
            let currentDate = new Date();
            this.updataTime = currentDate.toLocaleDateString()+' '+currentDate.toTimeString().split(' ')[0];
        },
        // "$store.state.deviceBagageCount": function(val){
        //     let data = [];
        //     for (const key in this.$store.state.deviceBagageCount) {
        //         data.push({
        //              name:key,
        //               value: this.$store.state.deviceBagageCount[key].value
        //         })
        //     }
        //     this.deviceBagageCount = {data};
        //     console.log(this.deviceBagageCount)
        // },
    },
    components: {Nodata}
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

.warn-info{
    .row-item{
        .ranking-info{
            .info-name{
                color: #333;
                font-weight: 700;
            }
            .ranking-value{
                font-weight: 700;
                color: $mauve;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.home{
    .layoutbox{
        .map-btn{
             padding:15px;
             background: $gradualBlue;
             position: fixed;
             bottom:100px;
             right:25px;
             font-size:40px;
             color: #fff;
             border-radius: 50%;
             z-index: 1000;
             cursor: pointer;
             &:hover{
                 background: $gradualBlue-circle;
             }
        }
        .row-one{
            padding-top:50px;
            display: flex;
            .box{
                flex:1;
                margin-right:30px;
                &:last-child{
                    margin-right:0;
                }
                position: relative;
                .state-lamp{
                    position: absolute;
                    top:-30px;
                    left:20px;
                    font-size:34px;
                    color: #fff;
                    padding:25px;
                    &.one{
                        background: $gradualBlue;
                    }
                    &.two{
                        background: $gradualGreen;
                    }
                    &.three{
                        background: $gradualOrange;
                    }
                    &.four{
                        background: $gradualRed;
                    }
                    &.five{
                        background: $gradualBlack;
                    }
                    &.six{
                        color:#333;
                        background: #ccc;
                    }
                }
                .box-card{
                    .name,.num{
                        font-size: 14px;
                        text-align: right;
                        font-weight:700;
                        color: #ccc;
                    }
                    .num{
                        font-size: 24px;
                        color: #999;
                    }
                    .item{
                        font-weight:700;
                        letter-spacing:2px;
                        cursor: pointer;
                        .view{
                            float: right;
                            font-weight:700;
                            font-size: 22px;
                            color: #999;
                            &:hover{
                                color: #333;
                            }
                        }
                    }
                }
            }
        }
        .row-two{
            margin-top:40px;
            display: flex;
            .box{
                flex:1;
                margin-right:30px;
                &:last-child{
                    margin-right:0;
                }
                position: relative;
                .refresh{
                    position: absolute;
                    top: 10px;
                    right: 25px;
                    z-index: 30;
                    color: #fff;
                    font-size:20px;
                    cursor: pointer;
                }
                .chart-box{
                    margin:0 auto;
                    margin-bottom:-80px;
                    width:95%;
                    height: 220px;
                    border-radius:10px;
                    z-index: 20;
                    position: relative;
                    &.one{
                        background: $gradualGreen;
                    }
                    &.two{
                        background: $gradualBlue;
                    }
                    &.three{
                        background: $gradualPink;
                    }
                }
                .box-card{
                    padding-top:80px;
                    .name{
                        font-weight:700;
                        color: #666;
                    }
                    .num{
                        float: right;
                        margin-top:-15px;
                        font-weight:700;
                        font-size: 12px;
                        color: #ccc;
                    }
                    .item{
                        color:#999;
                    }
                }
            }
        }
        .row-three{
            margin-top:40px;
            display: flex;
            .box{
                flex:1;
                margin-right:30px;
                &:last-child{
                    margin-right:0;
                }
                position: relative;
                .icon{
                    position: absolute;
                    top:-20px;
                    left:20px;
                    font-size:26px;
                    color: #fff;
                    padding:20px;
                    background:$mauve;
                }
                .model-btn{
                    position: absolute;
                    top:20px;
                    right:20px;
                }
                .box-card{
                    .name{
                        padding-left:80px;
                        color: #666;
                        font-weight:700;
                    }
                    .type-container{
                        height: 100%;
                        flex:1;
                        height: 500px;
                        .type-box,.chart{
                            width:100%;
                            height: 100%;
                        }
                        .type-table{
                            height: 100%;
                            display: flex;
                            flex-direction:column;
                            padding:20px;
                            .title{
                                display: flex;
                                padding:10px 0;
                                border-bottom:1px solid #ccc;
                                font-weight:700;
                                li{
                                    flex:1;
                                    text-align:center;
                                }
                            }
                            .content{
                                flex: 1;
                                overflow: auto;
                                li{
                                    display: flex;
                                    border-bottom:1px solid #ccc;
                                    .one{
                                        display: flex;
                                        width:100%;
                                        border-left:1px solid #999;
                                        text-align:center;
                                        .two{
                                            flex:1;
                                            display: flex;
                                            flex-direction:column;
                                            border-left:1px solid #999;
                                            .three{
                                                flex:1;
                                                display: flex;
                                                border-bottom:1px solid #999;
                                                &:last-child{
                                                    border:0;
                                                }
                                                .four{
                                                    flex:1;
                                                    border-left:1px solid #999;
                                                    display: flex;
                                                    flex-direction:column;
                                                    .five{
                                                        flex:1;
                                                        display: flex;
                                                        padding:10px 5px;
                                                        border-bottom:1px solid #999;
                                                        &:last-child{
                                                            border:0;
                                                        }
                                                        p{
                                                            flex:1;
                                                           
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    .type,.manufacturer
                                    {
                                        width:20%;
                                        margin:auto;
                                        text-align:center;
                                        padding:7px 0;
                                    }
                                }
                            }
                        }
                    }
                    .warn-info{
                        padding:20px;
                        height: 500px;
                        // background-color: #282c34;
                        overflow: auto;
                    }
                    // .warn-info{
                    //     padding:10px;
                    //     height: 100%;
                    //     text-align: center;
                    //     height: 500px;
                    //     flex:1;
                    //     box-sizing: border-box;
                    //     display: flex;
                    //     flex-direction: column;
                    //     overflow: hidden;
                    //     .title-ul {
                    //         width: 100%;
                    //         display: flex;
                    //         margin-top: 10px;
                    //         li {
                    //             flex: 1;
                    //             word-break:break-all;
                    //             text-align: center;
                    //         }
                    //     }
                    //     .content {
                    //         flex: 1;
                    //         width: 100%;
                    //         display: flex;
                    //         flex-flow:row wrap;
                    //         align-content: flex-start;
                    //         overflow-y: auto;
                    //         overflow-x: hidden;
                    //         margin-top: 10px;
                    //         .content-item {
                    //             width: 100%;
                    //             display: flex;
                    //             padding: 10px 0;
                    //             li {
                    //                 flex: 1;
                    //                 text-align: center;
                    //                 max-width:250px;
                    //             }
                    //             &:nth-child(odd) {
                    //                 background-color: $mauveLight;
                    //             }
                    //         }
                    //     }
                    // }
                }
            }
        }
    }
}
</style>