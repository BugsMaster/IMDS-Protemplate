<template>
    <div id="visual" class="visual">
        <div class="layoutbox bgc" :style="{backgroundImage:`url(${bgcPath})`}">
            <div class="title-box" :style="{top:title.top+'px'}">
                <h1 :style="{fontSize:title.size+'px',color:title.color}">{{title.name}}</h1>
                <h3 v-if="title.timeShow">{{currentTime}}</h3>
            </div>
            <ul class="section-ul" v-if="isEditModel">
                <li class="section" :style="{width:item.width+'px',height:item.height+'px',zIndex:item.position.zIndex,left:item.position.x+'px',top:item.position.y+'px'}"
                 v-for="(item,index) in sectionArr">
                    <h3 v-if="item.title.isShow" class="title" :style="{fontSize:item.title.size+'px',left:item.title.position.x+'px',top:item.title.position.y+'px',color:item.title.color}">{{item.title.name}}</h3>
                    <div class="wraper">
                        <section-chart :borderOptions="item.borderOptions">
                            <div class="chart-content" slot="chart-content">
                                <slot :name="item.id"></slot>
                            </div>
                        </section-chart>
                    </div>
                    <div class="mask" @mousedown="dragMove($event,index)"></div>
                    <span class="edit platfont iconplat-edit" @click.stop="editRec(item,index)"></span>
                    <span class="scale platfont iconplat-scale" @mousedown="scaleMove($event,index)"></span>
                </li>
            </ul>
            <ul class="section-ul-view" v-else>
                <li class="section" :style="{width:item.width+'px',height:item.height+'px',zIndex:item.position.zIndex,left:item.position.x+'px',top:item.position.y+'px'}"
                 v-for="(item,index) in sectionArr">
                    <h3 v-if="item.title.isShow" class="title" :style="{fontSize:item.title.size+'px',left:item.title.position.x+'px',top:item.title.position.y+'px',color:item.title.color}">{{item.title.name}}</h3>
                    <div class="wraper">
                        <section-chart :borderOptions="item.borderOptions">
                            <div class="chart-content" slot="chart-content">
                                <slot :name="item.id"></slot>
                            </div>
                        </section-chart>
                    </div>
                </li>
            </ul>
            <div class="operation-panel" v-if="isPanelShow">
                <ul class="operation-ul">
                    <li @click="initApp"><span class="platfont iconplat-init" title="位置初始化"></span></li>
                    <li @click="gridApp"><span class="platfont iconplat-grid" title="格式化位置"></span></li>
                    <li @click="isEditModel=!isEditModel"><span class="platfont  iconplat-fold-line" :class="{'green':isEditModel}"></span></li>
                    <li @click="editMain"><span class="platfont  iconplat-system"></span></li>
                    <li @click="clearConfig"><span class="platfont  iconplat-noconnect" title="清除"></span></li>
                    <li @click="saveConfig"><span class="platfont  iconplat-save" title="保存"></span></li>
                </ul>
            </div>
        </div>
        <el-drawer
        title="单元配置"
        :visible.sync="chartFormVisible"
        :before-close="cancleChartForm"
        direction="rtl"
        custom-class="drawer"
        :wrapperClosable="false"
        ref="drawer"
        >
            <div class="drawer_box">
                <div class="drawer_content">
                    <el-form label-position="right" label-width="150px" :model="chartForm" ref="chartForm">
                        <h3 style="margin-bottom:20px;font-weight:700">标题设置</h3>
                        <el-form-item label="名称：">
                            <el-input size="small" placeholder="请输入" v-model="chartForm.name" clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="字体大小">
                            <el-input-number size="small" placeholder="请输入" v-model="chartForm.size" clearable></el-input-number>
                        </el-form-item>
                        <el-form-item label="颜色：">
                            <el-color-picker v-model="chartForm.color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="Left - Top(px)：">
                            <el-input-number style="width:120px" size="small" v-model="chartForm.leftTitle">
                            </el-input-number>
                            ——
                            <el-input-number style="width:120px" size="small" v-model="chartForm.topTitle">
                            </el-input-number>
                        </el-form-item>
                        <el-form-item label="是否展示：">
                            <el-switch v-model="chartForm.isShow"></el-switch>
                        </el-form-item>
                        <h3 style="margin-bottom:20px;font-weight:700">内容设置</h3>
                        <el-form-item label="宽 - 高 (px)：">
                            <el-input-number style="width:120px" size="small" v-model="chartForm.width">
                            </el-input-number>
                            ——
                            <el-input-number style="width:120px" size="small" v-model="chartForm.height">
                            </el-input-number>
                        </el-form-item>
                        <el-form-item label="X - Y (px)：">
                            <el-input-number style="width:120px" size="small" v-model="chartForm.left">
                            </el-input-number>
                            ——
                            <el-input-number style="width:120px" size="small" v-model="chartForm.top">
                            </el-input-number>
                        </el-form-item>
                        <el-form-item label="层级：">
                            <el-input-number size="small" placeholder="请输入" v-model="chartForm.zIndex" :min="0" :step="1"></el-input-number>
                        </el-form-item>
                        <el-form-item label="背景颜色：">
                            <el-color-picker v-model="chartForm.bgColor"></el-color-picker>
                        </el-form-item>
                        <h3 style="margin-bottom:20px;font-weight:700">边框设置</h3>
                        <el-form-item label="样式序号：">
                            <el-select v-model="chartForm.type" placeholder="请选择" size="mini">
                                <el-option label="无" value="0"> </el-option>
                                <el-option
                                v-for="item in 13"
                                :key="item"
                                :label="'# '+item"
                                :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="chartForm.type==11" label="边框名称：">
                            <el-input size="small" placeholder="请输入" v-model="chartForm.borderTitle" clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item v-if="chartForm.type==11" label="名称长度：">
                            <el-input-number style="width:120px" size="small" placeholder="请输入" v-model="chartForm.borderTitleWidth" clearable>
                            </el-input-number>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="drawer_footer">
                    <el-button @click="cancleChartForm">取 消</el-button>
                    <el-button type="primary" @click="confirmChartForm">确 定</el-button>
                </div>
            </div>
        </el-drawer>
        <el-drawer
        title="主配置"
        :visible.sync="mainFormVisible"
        :before-close="cancleForm"
        direction="rtl"
        custom-class="drawer"
        :wrapperClosable="false"
        ref="maindrawer"
        >
            <div class="drawer_box">
                <div class="drawer_content">
                    <el-form label-position="right" label-width="100px" ref="mainForm">
                        <el-form-item label="标题：" prop="name">
                            <el-input size="small" placeholder="请输入" v-model="mainForm.name" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="字体大小：" prop="size">
                            <el-input-number size="small" placeholder="请输入" v-model="mainForm.size" :min="14" clearable></el-input-number>
                        </el-form-item>
                        <el-form-item label="Top：" prop="top">
                            <el-input-number size="small" placeholder="请输入" v-model="mainForm.top" :min="0" clearable></el-input-number>
                        </el-form-item>
                        <el-form-item label="颜色：">
                            <el-color-picker v-model="mainForm.color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="时间展示：">
                            <el-switch v-model="mainForm.timeShow"></el-switch>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="drawer_footer">
                    <el-button @click="cancleForm">取 消</el-button>
                    <el-button type="primary" @click="confirmForm">确 定</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { Storage } from '../lib/utils';
import sectionChart from './SectionChart'
export default {
    components:{
        sectionChart
    },
    data() {
        return {
            bgcPath:'',
            title:{
                name:'',
                size:16,
                color:'',
                top:0,
                timeShow:true
            },
            // 主配置
            mainFormVisible:false,
            mainForm:{
                name:'',
                size:16,
                color:'',
                timeShow:true,
                top:0
            },
            // 单元配置
            chartFormVisible:false,
            chartForm:{
                // title
                name:'',
                size:16,
                leftTitle:null,
                topTitle:null,
                isShow:true,
                color:'',
                // content
                width:null,
                height:null,
                left:null, 
                top:null,
                zIndex:1,
                // border
                type:0,
                bgColor:'',
                borderTitle:'',
                borderTitleWidth:250
            },
            currentTime: new Date().toLocaleString(),
            sectionIndex:null,
            sectionArr:[],
            saveConfigData:{},
            // 全局环境变量
            isEditModel:false,
            isPanelShow:false,
        }
    },
    props: {
        option:Object
    },
    computed: {},
    created() {
        setInterval(() => {
            this.currentTime = new Date().toLocaleString();
        }, 1000);
    },
    mounted() {
        this.bgcPath = this.option.bgcPath;
        this.title = this.option.title;
        this.sectionArr = this.option.sectionArr;
        let that = this;
        document.onkeydown = function (event) {
            switch (event.keyCode) {
                case 69:
                    that.isEditModel=!that.isEditModel;
                    break;
                case 72:
                    that.isPanelShow = !that.isPanelShow;
                    break;
                default:
                    break;
            }
        };
    },
    methods: {
        initApp(){
            this.sectionArr.forEach(item=>{
                item.position.x = 0;
                item.position.y = 0;
            });   
        },
        gridApp(){
            this.sectionArr.forEach(item=>{
                item.position.x = Math.round(item.position.x/20)*20;
                item.position.y = Math.round(item.position.y/20)*20;
            });   
        },
        clearConfig(){
            Storage.remove('visualConfig');
            this.$emit('clearConfig',true);
        },
        saveConfig(){
            this.saveConfigData={
                bgcPath:this.bgcPath,
                title:this.title,
                sectionArr:this.sectionArr
            }
            Storage.set('visualConfig', this.saveConfigData);
            this.$emit('saveConfig',this.saveConfigData);
        },
        // 主配置
        editMain(){
            this.mainFormVisible = true;
            this.mainForm.name = this.title.name;
            this.mainForm.top = this.title.top;
            this.mainForm.size = this.title.size;
            this.mainForm.color = this.title.color;
            this.mainForm.timeShow = this.title.timeShow;
        },
        cancleForm(){
            this.mainFormVisible = false;
            this.mainForm = {
                name:'',
                size:16,
                top:0,
                color:'',
                timeShow:true
            };
        },
        confirmForm(){
            this.title = {
                name:this.mainForm.name,
                size:this.mainForm.size,
                top:this.mainForm.top,
                color:this.mainForm.color,
                timeShow:this.mainForm.timeShow,
            };
            this.mainFormVisible = false;
        },
        // 单元配置
        editRec(item,index){
            this.sectionIndex = index;
            this.chartFormVisible = true;
            this.chartForm={
                // title
                name:item.title.name,
                size:item.title.size,
                color:item.title.color,
                leftTitle:item.title.position.x,
                topTitle:item.title.position.y,
                isShow:item.title.isShow,
                // content
                width:item.width,
                height:item.height,
                left:item.position.x,
                top:item.position.y,
                zIndex:item.position.zIndex,
                // border
                type:item.borderOptions.type,
                bgColor:item.borderOptions.bgColor,
                borderTitle:item.borderOptions.title,
                borderTitleWidth:item.borderOptions.titleWidth
            }
        },
        cancleChartForm(){
            this.chartFormVisible = false;
            this.chartForm={
                // title
                name:'',
                size:16,
                leftTitle:null,
                topTitle:null,
                isShow:true,
                color:'',
                // content
                width:null,
                height:null,
                left:null, 
                top:null,
                zIndex:1,
                // border
                type:0,
                bgColor:'',
                borderTitle:'',
                borderTitleWidth:250
            }
        },
        confirmChartForm(){
            this.sectionArr[this.sectionIndex].title = {
                name:this.chartForm.name,
                size:this.chartForm.size,
                color:this.chartForm.color,
                position:{x:this.chartForm.leftTitle,y:this.chartForm.topTitle},
                isShow:this.chartForm.isShow
            }
            this.sectionArr[this.sectionIndex].width = this.chartForm.width;
            this.sectionArr[this.sectionIndex].height = this.chartForm.height;
            this.sectionArr[this.sectionIndex].position = {
                x:this.chartForm.left,
                y:this.chartForm.top,
                zIndex:this.chartForm.zIndex,
            }  
            this.sectionArr[this.sectionIndex].borderOptions = {
                type:this.chartForm.type,
                bgColor:this.chartForm.bgColor,
                borderTitle:this.chartForm.title,
                borderTitleWidth:this.chartForm.titleWidth
            }  
            this.cancleChartForm();
        },
        // 鼠标手势
        dragMove(e,index) {
            this.sectionIndex = index;
            let odiv = e.currentTarget.parentNode;
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;
            document.onmousemove = (e)=>{ //鼠标按下并移动的事件
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                //移动当前元素
                this.sectionArr[this.sectionIndex].position.x = left;
                this.sectionArr[this.sectionIndex].position.y = top;
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        scaleMove(e,index){
            this.sectionIndex = index;
            let odiv = e.currentTarget;
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft+8;
            let disY = e.clientY - odiv.offsetTop+5;
            document.onmousemove = (e)=>{ //鼠标按下并移动的事件
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                //移动当前元素
                this.sectionArr[this.sectionIndex].width = left+50;
                this.sectionArr[this.sectionIndex].height = top+50;
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    },
    watch: {
        option: {
    　　　　 handler(newValue, oldValue) {
                this.bgcPath = this.option.bgcPath;
                this.title = this.option.title;
                this.sectionArr = this.option.sectionArr;
    　　　　},
    　　　　deep: true
    　　}
    },
};
</script>
<style lang="scss">
$mauve: #9c26b0;
.el-drawer__container{
    .drawer{
        overflow: auto;
        .el-drawer__header{
            border-bottom: 1px solid $mauve;
            padding-bottom: 10px;
            margin-bottom:20px;
            color: $mauve;
        }
        .drawer_box{
            height: 100%;
            padding:0 20px;
            display: flex;
            flex-direction: column;
            .drawer_content{
                overflow: auto;
                flex:1;
            }
            .drawer_footer{
                padding:20px;
                display: flex;
                .el-button{
                    flex:1;
                }
            }
        }
    }
}
</style>
<style scoped lang="scss">
@font-face {
  font-family: 'platfont';
  src: url('../font/iconfont.eot');
  src: url('../font/iconfont.eot?#iefix') format('embedded-opentype'),
      url('../font/iconfont.woff2') format('woff2'),
      url('../font/iconfont.woff') format('woff'),
      url('../font/iconfont.ttf') format('truetype'),
      url('../font/iconfont.svg#platfont') format('svg');
}
.platfont {
  font-family: "platfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconplat-scale:before {
  content: "\e72f";
}

.iconplat-edit:before {
  content: "\e61b";
}

.iconplat-system:before {
  content: "\e608";
}

.iconplat-save:before {
  content: "\e6d9";
}

.iconplat-fold-line:before {
  content: "\e61e";
}

.iconplat-init:before {
  content: "\e61f";
}

.iconplat-noconnect:before {
  content: "\e61d";
}

.iconplat-grid:before {
  content: "\e8e0";
}




//主题
$danger: #f56c6c;
$success: #49cd45;
/* 标准色 */
$red: #fd2671;
$orange: #fa9b25;
$yellow: #fbbd08;
$yellow-light: #fed904;
$olive: #8dc63f;
$green: #39b54a;
$cyan: #00bcd4;
$blue: #0081ff;
$blue-bgc:rgba(19,21,32,0.3);
$blue-light: #7399fe;
$blue-dark: #0a3f6f;
$blue-opacity:rgba(35,70,107,.3);
$steel:#474f5f;
$steel-opacity: rgba(70,80,95,.9);
$purple: #6739b6;
$mauve: #9c26b0;
$pink: #e03997;
$brown: #a5673f;
$grey: #8799a3;
$black: #333333;
$darkGray: #666666;
$gray: #aaaaaa;
$ghostWhite: #f2f2f2;
$white: #ffffff;
/* 浅色 */
$redLight: #fadbd9;
$orangeLight: #fde6d2;
$yellowLight: #fef2ce;
$oliveLight: #e8f4d9;
$greenLight: #d7f0db;
$cyanLight: #d2f1f0;
$blueLight: #cce6ff;
$purpleLight: #e1d7f0;
$mauveLight: #ebd4ef;
$pinkLight: #f9d7ea;
$brownLight: #ede1d9;
$greyLight: #e7ebed;

.visual{
    height: 100%;
}
.layoutbox {
    height: 100%;
    position: relative;
    overflow: hidden;
    &.bgc{
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .title-box {
        position: absolute;
        z-index: 20000;
        left: 50%;
        transform: translateX(-50%);
        h1 {
            color: #ddd;
            font-size: 28px;
            text-align: center;
            font-weight: 700;
            letter-spacing: 4px;
        }
        h3 {
            color: #ddd;
            line-height: 4;
            font-size: 18px;
            text-align: center;
            z-index: 20000;
        }
    }
    .section-ul{
        position: absolute;
        left: 0;
        top: 0;
        .section{
            border: 1px solid $mauve;
            position: absolute;
            .wraper{
                padding: 10px;
                width: 100%;
                height: 100%;
            }
            &:hover{
                border-color: $purpleLight;
                .mask{
                    background-color: rgba(197, 124, 247, 0.3);
                }
                .edit{
                    display: block;
                }
                .scale{
                    display: block;
                }
            }
            .title{
                position: absolute;
                top:30px;
                left:30px;
                color: #ddd;
                z-index: 1000;
            }
            .mask{
                position: absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
                z-index: 100;
                cursor: move;
            }
            .edit{
                display: none;
                position: absolute;
                right: 0;
                top: 0;
                background-color: $steel;
                padding: 10px;
                color: #ddd;
                border-radius: 0% 0% 0% 50%;
                font-size: 20px;
                cursor: pointer;
                z-index: 101;
                &:hover{
                    color: $olive;
                }
            }
            .scale{
                display: none;
                position: absolute;
                right: 0;
                bottom: 0px;
                background-color: $steel;
                padding: 10px;
                color: #ddd;
                border-radius: 50% 0% 0% 0%;
                font-size: 20px;
                cursor: se-resize;
                z-index: 101;
                &:hover{
                    color: $olive;
                }
            }
            .chart-content{
                height: 100%;
            }
        }
    }
    .section-ul-view{
        position: absolute;
        left: 0;
        top: 0;
        .section{
            position: absolute;
            border: 1px solid transparent;
            .wraper{
                padding: 10px;
                width: 100%;
                height: 100%;
            }
            .title{
                position: absolute;
                top:30px;
                left:30px;
                color: #ddd;
                z-index: 1000;
            }
            .chart-content{
                height: 100%;
            }
        }
    }
    .operation-panel{
        width: 60%;
        height: 80px;
        position: fixed;
        bottom: -50px;
        left:20%;
        transition: all 0.3s ease-in;
        z-index: 1000;
        &:hover{
            bottom: 0px;
        }
        .operation-ul{
            margin:0 auto;
            height: 100%;
            border-top:1px solid #000;
            background: linear-gradient(to bottom, rgba(0,0,0,.2),#000);
            border-radius: 50% 50% 0 0;
            padding: 40px 20px 0px;
            display: flex;
            li{
                flex:1;
                text-align: center;
                cursor: pointer;
                &:hover{
                    span{
                        color: #fff;
                    }
                }
                span{
                    font-size: 25px;
                    color: #666;
                }
                span.green{
                    color: $green;
                }
            }
        }
    }
}
</style>
