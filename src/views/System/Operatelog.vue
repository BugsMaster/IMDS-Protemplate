<template>
    <div id="operatelog" class="operatelog">
        <div class="layoutbox">
            <h2>{{$t('title.systemManage')}} / 操作记录</h2>
            <div class="query-form">
                <el-form ref="formSearch" :inline="true" :model="formSearch">
                    <el-form-item :label="$t('c.name')+'：'">
                        <el-input
                            size="mini"
                            :placeholder="$t('rule.input')"
                            v-model="formSearch.name"
                            clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('title.equipmentID')+'：'">
                        <el-input
                            size="mini"
                            :placeholder="$t('rule.input')"
                            v-model="formSearch.eqp_id"
                            clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="操作类型：" prop="type">
                        <el-select v-model="formSearch.type" :placeholder="$t('rule.select')" size="mini" clearable>
                            <el-option :label="item.msg" :value="item.id" v-for="item in operateTypeData" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('rule.selectTime')+'：'">
                        <el-date-picker ref="picker" :editable="false" size="small" value-format="yyyy-MM-dd HH:mm:ss" v-model="datePickVal" type="datetimerange" :picker-options="pickerOptions" :range-separator="$t('c.to')" :start-placeholder="$t('c.startTime')" :end-placeholder="$t('c.endTime')" align="left">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" @click="query" type="primary" plain>{{$t('c.query')}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- <div class="datatable-box paginator-box"> -->
                <!-- <data-tables ref="multipleTable" :data="tableData" :table-props="tableProps" :pagination-props="{ pageSizes: [10, 20] }" :page-size="10" style="width: 100%;flex:1;">
                    <el-table-column sortable prop="UserName" :label="$t('c.name')" align="center">
                    </el-table-column>
                    <el-table-column sortable prop="TypeMsg" label="操作类型" align="center">
                    </el-table-column>
                    <el-table-column prop="EqpName" sortable :label="$t('c.eqpName')" align="center">
                    </el-table-column>
                    <el-table-column prop="Password" sortable :label="$t('app.pwd')" align="center">
                    </el-table-column>
                    <el-table-column prop="System" label="系统" sortable align="center">
                    </el-table-column>
                    <el-table-column prop="Browser" label="浏览器" sortable align="center">
                    </el-table-column>
                    <el-table-column prop="IP" label="IP地址" sortable align="center">
                    </el-table-column>
                    <el-table-column prop="CreateTime" label="时间" sortable align="center">
                    </el-table-column>
                </data-tables>
            </div> -->
            <div class="datatable-box">
                 <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    style="width: 100%;flex:1;">
                    <el-table-column sortable prop="Name" width="100px" :label="$t('c.name')" align="center">
                    </el-table-column>
                    <el-table-column sortable prop="UserName" width="100px" :label="$t('c.account')" align="center">
                    </el-table-column>
                    <el-table-column sortable prop="UserType" width="130px" :label="$t('c.occupation')" align="center">
                    </el-table-column>
                    <el-table-column sortable :show-overflow-tooltip="true" prop="TypeMsg" label="操作类型" align="center">
                    </el-table-column>
                    <el-table-column prop="EqpID" sortable :label="$t('title.equipmentID')" align="center">
                    </el-table-column>
                    <el-table-column prop="Password" sortable :show-overflow-tooltip="true" :label="$t('app.pwd')" align="center">
                    </el-table-column>
                    <el-table-column prop="System" width="100px" label="系统" sortable align="center">
                    </el-table-column>
                    <el-table-column prop="Browser" width="100px" label="浏览器" sortable align="center">
                    </el-table-column>
                    <el-table-column prop="IP" width="120px" label="IP地址" sortable align="center">
                    </el-table-column>
                    <el-table-column prop="CreateTime" width="150px" label="时间" sortable align="center" style="width:100px">
                    </el-table-column>
                 </el-table>
             </div>
            <div class="paginator-box">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20]"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper,sizes,total"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../../assets/js/api";
import { Storage } from "../../assets/js/utils";
export default {
    data() {
        return {
            formSearch:{
                name:'',
                eqp_id:'',
                start_time: '',
                end_time: ''
            },
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
            operateTypeData:[],
            //分页相关
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
        };
    },
    created() {
        this.getTableData();
        this.getOperateTypeData();
    },
    mounted() {},
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
            if(!this.formSearch.type){
               delete this.formSearch.type
            }
            let tempParam={
                page_no:this.currentPage,
                page_size:this.pageSize,
                ...this.formSearch,
                ...this.dateObject
            }
            api.getOperateRecords(tempParam).then(res => {
                res.data.forEach(item=>{
                    item.CreateTime=item.CreateTime.split('.')[0];
                });
                this.total = res.total;
                this.tableData = res.data;
            });
        },
        query(){
            this.currentPage = 1;
            this.getTableData();
        },
        handleSizeChange(val){
            this.pageSize = val;
            this.currentPage = 1;
            this.getTableData();
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.getTableData();
        },
        getOperateTypeData(){
            api.getOperateType().then(({ data }) => {
                this.operateTypeData = data;
            });
        }
    },
    watch: {},
    components: {}
};
</script>
<style lang="scss">
@import "../../style/const.scss";
.operatelog {
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
    background-image: url("../../assets/images/common/bg_normal.jpg");
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: #fff;
    position: relative;
    z-index: 20;
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
    .datatable-box{
        .el-image{
            border-radius:50%;
            overflow: hidden;
            width:30px;
            height:30px;
        }
    }
}
</style>
