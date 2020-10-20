<template>
    <div id="feedback" class="feedback">
    <Subpageextend title="意见反馈">
        <div class="layoutbox">
            <div class="query-form">
                <el-form ref="formSearch" :inline="true" :model="formSearch">
                    <!-- <el-form-item :label="$t('c.name')+'：'">
                        <el-input
                            size="mini"
                            :placeholder="$t('rule.input')"
                            v-model="formSearch.name"
                            clearable>
                        </el-input>
                    </el-form-item> -->
                    <el-form-item label="反馈类型：" prop="type">
                        <el-select v-model="formSearch.type" :placeholder="$t('rule.select')" size="mini">
                            <el-option label="全部" :value="0"></el-option>
                            <el-option :label="item.name" :value="item.id" v-for="item in feedbackTypeData" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('rule.selectTime')+'：'">
                        <el-date-picker ref="picker" :editable="false" size="small" value-format="yyyy-MM-dd HH:mm:ss" v-model="datePickVal" type="datetimerange" :picker-options="pickerOptions" :range-separator="$t('c.to')" :start-placeholder="$t('c.startTime')" :end-placeholder="$t('c.endTime')" align="left">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" @click="query" type="primary" plain>{{$t('c.query')}}</el-button>
                    </el-form-item>
                    <el-button type="primary" style="float:right;margin-top:5px" :title="$t('c.add')" circle size="mini" @click="add">
                        <i class="nucfont inuc-add"></i>
                    </el-button>
                </el-form>
            </div>
            <div class="content">
                <div class="left-box" v-if="tableData.length">
                    <ul class="content-ul">
                        <li v-for="item in tableData" :class="{'active':activeIndex==item.id}" @click="clickItem(item)">
                            <p class="title">{{item.history[0].content}}<span class="type">（{{item.typeName}}）</span></p>
                            <p class="name">{{item.creator}} @ {{item.create_time}}</p>
                        </li>
                    </ul>
                    <div class="paginator-box">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 20 ,100]"
                            :page-size="pageSize"
                            layout="prev, pager, next, jumper,sizes,total"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
                <div class="left-box" v-else>
                    <Nodata style="margin-top:20px;"></Nodata>
                </div>
                <div class="right-box">
                    <h3>意见反馈：</h3>
                    <ul class="content-ul" v-if="isEditModle">
                        <li v-for="(item,index) in detailData" class="clearfix">
                            <div class="left-speak" v-if="item.creator_id!=userData.userID">
                                <img class="avatar" :src="item.avatar" alt="">
                                <p class="name">{{item.creator}} @ {{item.create_time}}</p>
                                <div class="detail">
                                    <span class="triangle"></span>
                                    <p>{{item.content}}</p>
                                    <ul class="attach-ul clearfix" v-if="item.attachment.length">
                                        <viewer>
                                            <li v-for="el in item.attachment">
                                                    <img :src="el.url">
                                            </li>
                                        </viewer>
                                    </ul>
                                </div>
                            </div>
                            <div class="right-speak" v-else>
                                <img class="avatar" :src="item.avatar" alt="">
                                <p class="name">{{item.creator}} @ {{item.create_time}}</p>
                                <div class="detail">
                                    <span class="triangle"></span>
                                    <p>{{item.content}}</p>
                                    <ul class="attach-ul clearfix" v-if="item.attachment.length">
                                        <viewer>
                                            <li v-for="el in item.attachment">
                                                    <img :src="el.url">
                                            </li>
                                        </viewer>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="footer">
                        <div style="margin-left:65px;" v-if="!isEditModle">
                            <span>反馈类型：</span>
                            <el-select v-model="formType" :placeholder="$t('rule.select')" size="mini">
                                <el-option :label="item.name" :value="item.id" v-for="item in feedbackTypeData" :key="item.id"></el-option>
                            </el-select>
                        </div>
                        
                        <div class="content-box">
                            <img class="avatar" :src="userData.userAvatar">
                            <el-input class="content" type="textarea" :autosize="{ minRows: 4}" :placeholder="$t('rule.input')" v-model.trim="formContent"></el-input>
                        </div>
                        <div class="fujian-box">
                            <h3>附件(<span class="yellow">{{this.imgData.length}}</span>/12)：</h3>
                            <div class="img-ul">
                                <div class="img-wrap">
                                    <viewer class="viewer clearfix" :images="imgData">
                                        <div v-for="item in imgData" class="img-box" @mouseenter="imgHover(item.id)" @mouseleave="imgLeave(item.id)">
                                            <img :src="item.url" :key="item.id" :title="item.Name">
                                            <template>
                                                <p class="delete" v-if="showIndex[item.id]"><i class="delete el-icon-delete" title="删除" @click="deleteImg(item)"></i></p>
                                            </template>
                                        </div>
                                        <div class="add-btn" v-if="this.imgData.length<12">
                                            <SimpleTypeUploader @fileUploadSuccess="fileUploadSuccess">
                                                <el-button slot="clickContent" type="primary" plain circle><i class="el-icon-plus" title="添加"></i></el-button>
                                            </SimpleTypeUploader>
                                        </div>
                                    </viewer>
                                </div>
                            </div>
                        </div>
                        <el-button type="success" @click="submmit">{{isEditModle?'回复':'提交'}}</el-button>
                    </div>
                </div>
            </div>
        </div>
    </Subpageextend>
    </div>
</template>

<script>
import api from '../../assets/js/api';
import { Storage } from '../../assets/js/utils';
import Subpageextend from "../../components/Subpageextend.vue";
import SimpleTypeUploader from '../../components/SimpleTypeUploader.vue'
import Nodata from '@/components/Nodata.vue'
export default {
    data() {
        return {
            formSearch:{
                type:0,
            },
            logType:[],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: this.$t("c.lastHours"),
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: this.$t("c.lastDay"),
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text:  this.$t("c.lastWeek"),
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }],
            },
            datePickVal: [],
            dateObject: {},
            feedbackTypeData:[],
            //分页相关
            editPage: 1,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            activeIndex:0,
            detailData:[],
            formType:1,
            formContent:'',
            imgData:[],
            showIndex:{},
            userData:Storage.get("userTicket"),
            isEditModle:false,
        };
    },
    created() {
        
    },
    mounted() {
        this.getfeedbackTypeData();
        this.getTableData();
    },
    computed: {},
    methods: {
        getTableData(paramas) {
            if (this.datePickVal && this.datePickVal.length) {
                this.dateObject = {
                    start_time: this.datePickVal[0],
                    end_time: this.datePickVal[1]
                };
            }else{
                this.dateObject = {
                    start_time: '',
                    end_time: ''
                };
            }
            let tempParam={
                page_no:this.currentPage,
                page_size:this.pageSize,
                type:this.formSearch.type?this.formSearch.type:0,
                ...this.dateObject
            }
            api.getFeedback(tempParam).then(res => {
                res.data.forEach(item=>{
                    this.feedbackTypeData.forEach(el=>{
                        if(el.id==item.type){
                            item.typeName = el.name;
                        }
                    });
                });
                this.total = res.total;
                this.tableData = res.data;
            });
        },
        query(){
            this.currentPage = 1;
            this.getTableData();
        },
        clickItem(item){
            this.activeIndex = item.id;
            this.detailData=item.history;
            this.isEditModle = true;
            this.editPage=this.currentPage;
        },
        //上传图片
        fileUploadSuccess(res){
            this.imgData.push({
                name:res.data.name,
                id:res.data.id,
                url:res.data.url
            });
        },
        imgHover(id){
            this.$forceUpdate();
            this.showIndex[id]=true;
        },
        imgLeave(){
            this.$forceUpdate();
            this.showIndex={};
        },
        deleteImg(item){
            this.imgData.forEach((el,index)=>{
                if(el.id==item.id){
                    this.imgData.splice(index,1);
                }
            });
        },
        add(){
            this.isEditModle = false;
            this.activeIndex = null;
        },
        submmit(){
            if(!this.formContent.length){
                this.$message.warning('请填写反馈内容');
                return;
            }
            let tempParam={
                type:this.formType,
                content:this.formContent,
                attachment: this.imgData.map(el=>{
                    return el.id;
                })
            }
            if(this.isEditModle){
                api.putFeedback(this.activeIndex,tempParam).then(res => {
                    this.$message.success(res.msg);
                    this.formContent='';
                    this.imgData=[];
                    let tempParam={
                        page_no:this.editPage,
                        page_size:this.pageSize,
                    }
                    api.getFeedback(tempParam).then(res => {
                        res.data.forEach(item=>{
                            if(this.activeIndex==item.id){
                                this.detailData=item.history;
                            }
                        });
                    });
                    this.getTableData();
                })
            }else{
                api.postFeedback(tempParam).then(res => {
                    this.$message.success(res.msg);
                    this.formType=1;
                    this.formContent='';
                    this.imgData=[];
                    this.getTableData();
                })
            }
           
        },
        //非逻辑方法
        handleSizeChange(val){
            this.pageSize = val;
            this.currentPage = 1;
            this.getTableData();
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.getTableData();
        },
        getfeedbackTypeData(){
            api.getFeedbackType().then(({ data }) => {
                this.feedbackTypeData = data;
            });
        }
    },
    watch: {},
    components: {Subpageextend,SimpleTypeUploader,Nodata}
};
</script>
<style lang="scss">
@import "../../style/const.scss";
.feedback {
    height: 100%;
    .pagination-bar {
        margin-top: 20px;
    }
    .el-dialog__header {
        border-bottom: 1px dashed $color-blue;
    }
    .query-form{
        padding: 5px 10px;
        .el-form-item{
            margin-bottom: 0;
            label{
                color: #fff;
            }
        }
    }
    
}
</style>
<style scoped lang="scss">
@import "../../style/const.scss";

.layoutbox {
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #fff;
    position: relative;
    z-index: 20;
    padding:0 10px;
    @include scrollbar_blue();
    > h2 {
        font-size: 18px;
        margin-bottom: 15px;
    }
    .query-form{
       margin-bottom: 15px;
       background-color: #214569;
       padding: 5px 10px;
       .el-form-item{
           label{
               color: #fff;
           }
       }
       .add{
           margin:5px;
       }
    }
    .content{
        display: flex;
        .left-box{
            width:30%;
            min-width:450px;
            .content-ul{
                background-color:$opacity-blue;
                li{
                    padding:10px;
                    &.active{
                        border-left:2px solid $color-yellow;
                        .title{
                            color: $color-yellow;
                        }
                    }
                    .title{
                        font-size:18px;
                        cursor: pointer;
                        &:hover{
                            color: $color-yellow;
                        }
                        .type{
                            font-size:12px;
                            color: #ddd;
                        }
                    }
                    .name{
                        color: #ddd;
                        text-align:right;
                    }
                }
               
            }
        }
        .right-box{
            margin-left:10px;
            padding-left:10px;
            border-left:4px solid $color-yellow;
            flex:1;
            h3{
                font-size:20px;
                margin-bottom:20px;
            }
            .content-ul{
                border-bottom:1px solid #ddd;
                padding-bottom:20px;
                background-color:$opacity-blue;
                padding-right:15px;
                >li{
                    margin-bottom:15px;
                    .left-speak{
                        width:45%;
                        .avatar{
                            border-radius:50%;
                            width:50px;
                            height:50px;
                            float: left;
                        }
                        .name{
                            color:#ddd;
                            margin-left:65px;
                        } 
                        .detail{
                            margin-left:65px;
                            border:1px solid $color-blue;
                            background-color: $opacity-blue;
                            padding:10px;
                            position: relative;
                            .triangle{
                               position: absolute;
                               left:-15px;
                               top:5px;
                               width:15px;
                               height:15px;
                               overflow: hidden;
                                &:before{
                                    position: absolute;
                                    content:'';
                                    width:15px;
                                    height:15px; 
                                    left:10px;
                                    top:0;
                                    background-color:$color-blue;
                                    transform:rotateZ(45deg);
                                } 
                            }
                            .attach-ul{
                                margin-top:10px;
                                li{
                                    float: left;
                                    padding:5px;
                                    width:50%;
                                }
                            } 
                        }
                    } 
                    .right-speak{
                        float: right;
                        width:45%;
                        .avatar{
                            border-radius:50%;
                            width:50px;
                            height:50px;
                            float: right;
                        }
                        .name{
                            color:#ddd;
                            margin-right:65px;
                            text-align:right;
                        } 
                        .detail{
                            margin-right:65px;
                            border:1px solid $color-blue;
                            background-color: $opacity-blue;
                            padding:10px;
                            position: relative;
                            .triangle{
                               position: absolute;
                               right:-15px;
                               top:5px;
                               width:15px;
                               height:15px;
                               overflow: hidden;
                                &:before{
                                    position: absolute;
                                    content:'';
                                    width:15px;
                                    height:15px; 
                                    right:10px;
                                    top:0;
                                    background-color:$color-blue;
                                    transform:rotateZ(45deg);
                                } 
                            }
                            .attach-ul{
                                margin-top:10px;
                                li{
                                    float: left;
                                    padding:5px;
                                    width:50%;
                                }
                            } 
                        }
                    } 
                }
            }
            .footer{
                padding:20px;
                .content-box{
                    margin-top:20px;
                    display: flex;
                    margin-bottom:10px;
                    .avatar{
                        width:50px;
                        height:50px;
                        border-radius:50%;
                        margin-right:15px;
                    }
                }
                .fujian-box{
                    margin-bottom:20px;
                    h3{
                        color: #fff;
                        font-size: 20px;
                        margin-bottom: 15px;
                    }
                    .img-ul{
                        position: relative;
                        .img-wrap{
                            .viewer{
                                .img-box{
                                    float: left;
                                    position: relative;
                                    margin-bottom:20px;
                                    margin-right:20px;
                                    position: relative;
                                    &:nth-child(6n){
                                        margin-right:0;
                                    }
                                    img{
                                        width:160px;
                                        height: 160px;
                                        box-shadow:5px 2px 8px #000;
                                        cursor: pointer;
                                    }
                                    .delete{
                                        background-color: #ccc;
                                        text-align:center;
                                        padding:5px;
                                        position: absolute;
                                        left:0;
                                        bottom:0;
                                        width:100%;
                                        cursor: pointer;
                                        &:hover{
                                            background-color: $color-danger;
                                            color: #fff;
                                        }
                                    }
                                }
                                .add-btn{
                                    float: left;
                                    width:160px;
                                    height: 160px;
                                    background-color: $opacity-blue;
                                    border:1px dashed $color-blue;
                                    display: flex;
                                    justify-content: center; /* 水平居中 */
                                    align-items: center;     /* 垂直居中 */
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    .paginator-box{
        text-align: center;
        margin-top: 30px;
    }
}
</style>
