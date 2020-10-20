<template>
    <div class="title-panel">
        <ul class="ul-content">
            <li class="box" :style="{backgroundColor:'#fff'}" v-for="item in options.data">
                <div class="state-lamp one" :class="[item.icon,item.iconBgColor]"></div>
                <div class="box-card">
                    <div slot="header">
                        <p class="name" :style="{color:options.numColor,fontSize:options.numSize}">Number</p>
                        <p class="num" :style="{color:options.countColor,fontSize:options.countSize}">{{item.num}}</p>
                    </div>
                    <div class="item" :style="{borderColor:options.lineColor}"><span :style="{color:item.titleColor,fontSize:options.titleSize}">{{item.title}}</span></div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import validateConfig from '../utils/validateConfig'
export default {
    data() {
        return {
            rule: {
                data:{
                    type: Array,
                    required: true,
                },
                bgColor:{
                    type: String,
                    required: false,
                    default:'#fff'
                },
                numColor:{
                    type: String,
                    required: false,
                    default:'#999'
                },
                numSize:{
                    type: String,
                    required: false,
                    default:'14px'
                },
                countColor:{
                    type: String,
                    required: false,
                    default:'#ccc'
                },
                countSize:{
                    type: String,
                    required: false,
                    default:'24px'
                },
                lineColor:{
                    type: String,
                    required: false,
                    default:'#ddd'
                },
                titleSize:{
                    type: String,
                    required: false,
                    default:'16px'
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

        },
        initPage(){

        },
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.title-panel{
    $gradualRed: linear-gradient(45deg, #f43f3b, #ec008c);
    $gradualOrange: linear-gradient(45deg, #ff9700, #ed1c24);
    $gradualGreen: linear-gradient(45deg, #39b54a, #8dc63f);
    $gradualPurple: linear-gradient(45deg, #9000ff, #5e00ff);
    $gradualPink: linear-gradient(45deg, #ec008c, #6739b6);
    $gradualBlue: linear-gradient(45deg, #0081ff, #1cbbb4);
    $gradualBlack: linear-gradient(45deg, #303030, #666);
    .ul-content{
        display: flex;
        .box{
            flex:1;
            margin-right:20px;
            border-radius: 6px;
            &:last-child{
                margin-right:0;
            }
            position: relative;
            padding:20px 10px;
            .state-lamp{
                position: absolute;
                top:-30px;
                left:20px;
                font-size:34px;
                color: #fff;
                padding: 20px;
                &.blue{
                    background: $gradualBlue;
                }
                &.green{
                    background: $gradualGreen;
                }
                &.orange{
                    background: $gradualOrange;
                }
                &.red{
                    background: $gradualRed;
                }
                &.purple{
                    background: $gradualPurple;
                }
                &.pink{
                    background: $gradualPink;
                }
                &.black{
                    background: $gradualBlack;
                }
                &.grey{
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
                    padding-bottom:10px;
                }
                .item{
                    font-weight:700;
                    letter-spacing:2px;
                    border-top:2px solid #ddd;
                    padding-left:10px;
                    padding-top:10px;
                    cursor: pointer;
                }
            }
        }
    }
}

</style>
