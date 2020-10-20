<template>
    <div id="groupmanager" class="groupmanager">
        <div class="layoutbox">
            <div class="query-form">
                <el-form ref="searchForm" :inline="true" :model="searchForm" @submit.native.prevent  @keyup.enter.native="query">
                    <el-form-item :label="$t('c.name')+'：'">
                        <el-input
                            size="mini"
                            :placeholder="$t('rule.input')"
                            v-model="searchForm.name"
                            prefix-icon="el-icon-search"
                            clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" @click="query" type="primary" plain>{{$t('c.query')}}</el-button>
                    </el-form-item>
                    <el-popover popper-class="site-box" placement="top" width="300" v-model="addShow" trigger="click">
                        <el-input size="mini" show-word-limit :placeholder="$tc('rule.inputName',[1])" maxlength="10" v-model="addNameValue" @keyup.enter.native="toAdd" clearable>
                            <el-button size="mini" slot="append" icon="el-icon-check" type="primary" @click="toAdd"></el-button>
                        </el-input>
                        <el-button slot="reference" type="primary" class="add" size="mini" :title="$t('c.add')" circle><i class="el-icon-plus"></i></el-button>
                    </el-popover>
                </el-form>
            </div>
            <div class="content-box" v-if="groupDataList.length">
                <ul class="content-ul">
                    <li v-for="item in pagenatorData" :class="{'active':currentMainID==item.id}" @click="clickItem(item)" @mouseenter="hover(item.id)" @mouseleave="leave(item.id)">
                        <el-card class="hvr-grow-shadow">
                            <h3 class="name">
                                <span class="el-icon-s-grid"></span> {{item.name}}
                                <el-popover placement="top" width="200" trigger="click" v-model="isdeleteGroupShow[item.id]" v-show="allHover[item.id]">
                                    <p style="margin-bottom: 10px">{{$t('tip.delete')}}</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="info" @click="isdeleteGroupShow[item.id] = false">{{$t('tip.cancel')}}</el-button>
                                        <el-button type="primary" size="mini" @click="toDeleteGroup(item)">{{$t('tip.confirm')}}</el-button>
                                    </div>
                                    <span slot="reference" class="el-icon-delete delete" title="删除"></span>
                                </el-popover>
                                <el-popover popper-class="scene-box" placement="top" width="300" v-model="editGroupShow[item.id]" trigger="click" v-show="allHover[item.id]">
                                    <el-input size="mini" show-word-limit :placeholder="$tc('rule.inputName',[1])" maxlength="10" v-model="editGroupNameValue" @keyup.enter.native="toEditGroup(item)" clearable>
                                        <el-button size="mini" slot="append" icon="el-icon-check" type="primary" @click="toEditGroup(item)"></el-button>
                                    </el-input>
                                    <span slot="reference" class="el-icon-edit edit" title="编辑" @click.stop="toOpenEditGroup(item)"></span>
                                </el-popover>
                            </h3>
                            <div class="content">
                                <p>成员数：<span class="cyan">{{item.users.length}}</span></p>
                                <p>设备数：<span class="cyan">{{item.equips.length}}</span></p>
                                <p>创建人：<span>{{item.creator_name}}</span></p>
                                <p>创建时间：<span>{{item.create_time}}</span></p>
                                <img class="img" :src="item.cover">
                            </div>
                        </el-card>
                    </li>
                </ul>
                <dir class="pagination-box">
                    <el-pagination
                        small
                        background
                        hide-on-single-page
                        layout="prev, pager, next"
                        :current-page="currentMainPage"
                        @current-change="currentMainPageChange"
                        :page-size="12"
                        :total="groupDataList.length">
                    </el-pagination>
                </dir>
            </div>
            <div v-else>
                <Nodata></Nodata>
            </div>
            <h3 class="current-name" v-if="groupDataList.length"><span class="el-icon-s-grid"></span> {{currentMainName}}</h3>
            <div class="datatable-box" v-if="groupDataList.length">
                <div class="left-box">
                    <p class="title">组成员配置 <el-button slot="reference" type="primary" class="add" :title="$t('c.add')" size="mini" circle @click="openMemberDialog"><i class="el-icon-setting"></i></el-button></p>
                    <data-tables class="form-table" :data="groupUserData" :table-props="tableProps" :pagination-props="{pageSizes: [5,20,100]}" :page-size="5">
                        <el-table-column label="头像" align="center">
                            <template slot-scope="scope">
                                <el-image :src="scope.row.avatar" fit="contain">
                                    <div slot="error" class="image-slot">
                                        <i class="nucfont inuc-usermanager"></i>
                                    </div>
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column prop="account_no" label="账号" align="center" sortable></el-table-column>
                        <el-table-column prop="name" label="名称" align="center" sortable></el-table-column>
                        <el-table-column prop="usertype_name" label="类型" align="center" sortable></el-table-column>
                        <el-table-column prop="org_name" label="所属组" align="center" sortable> </el-table-column>
                        <el-table-column :label="$t('c.operation')" align="center">
                            <div slot-scope="scope">
                                <el-button plain style="margin-left: 10px" slot="reference" :title="$t('c.delete')" size="mini" type="danger" class="el-icon-delete" @click="deleteMemberRow(scope.row.id)"></el-button>
                            </div>
                        </el-table-column>
                    </data-tables>
                </div>
                <div class="right-box">
                    <p class="title">组设备配置 <el-button slot="reference" type="primary" class="add" :title="$t('c.add')" size="mini" circle @click="openDeviceDialog"><i class="el-icon-setting"></i></el-button></p>
                    <data-tables class="form-table" :data="groupEqpsData" :table-props="tableProps" :pagination-props="{pageSizes: [5,20,100]}" :page-size="5">
                        <el-table-column prop="name" label="名称" align="center" sortable></el-table-column>
                        <el-table-column prop="eqp_num" label="编号" align="center" sortable></el-table-column>
                        <el-table-column sortable label="型号" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.type}} / {{scope.row.company}} / {{scope.row.serie}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="org_name" label="所属组" align="center" sortable> </el-table-column>
                        <el-table-column :label="$t('c.operation')" align="center">
                            <div slot-scope="scope">
                                <el-button plain style="margin-left: 10px" slot="reference" :title="$t('c.delete')" size="mini" type="danger" class="el-icon-delete" @click="deleteEqpRow(scope.row.id)"></el-button>
                            </div>
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
        </div>
        <el-dialog custom-class="member-dialog" :title="$tc('c.personnelDistribution',2)" width="800px" center :visible.sync="memberFormVisible" :close-on-click-modal="false" @close="cancelSaveUser">
            <div class="search-box">
                <el-input class="search" placeholder="请输入名称" prefix-icon="el-icon-search" v-model="memberSearch" size="mini" clearable @input="searchUser">
                </el-input>
            </div>
            <data-tables class="datatable-box"
                         ref="multipleTable"
                         :data="memberTableData"
                         :table-props="tableProps"
                         :current-page.sync="currentPage"
                         :pagination-props="{pageSizes: [5,20,100]}"
                         :page-size="5"
                         @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55px"
                    :reserve-selection="true"
                    align="center">
                </el-table-column>
                <el-table-column label="头像" align="center">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.avatar" fit="contain">
                            <div slot="error" class="image-slot">
                                <i class="nucfont inuc-usermanager"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column v-for="title in dialogTitles" :prop="title.prop" :label="title.label"
                                 :key="title.label"
                                 align="center"
                                 sortable="custom">
                </el-table-column>
            </data-tables>
            <div slot="footer" style="text-align: right;margin-top: 10px;">
                <el-button size="mini" @click="cancelSaveUser">{{$t('tip.cancel')}}</el-button>
                <el-button size="mini" type="primary" @click="saveUser">{{$t('tip.confirm')}}</el-button>
            </div>
        </el-dialog>
        <el-dialog custom-class="member-dialog" title="设备配置" width="800px" center :visible.sync="deviceFormVisible" :close-on-click-modal="false" @close="cancelSaveDevice">
            <div class="search-box">
                <el-input class="search" placeholder="请输入名称" prefix-icon="el-icon-search" v-model="deviceSearch" size="mini" clearable @input="searchDevice">
                </el-input>
            </div>
            <data-tables class="form-table"
                         ref="multipleTableDevice"
                         :data="deviceTableData"
                         :table-props="tableProps"
                         :current-page.sync="currentPage"
                         :pagination-props="{pageSizes: [5,20,100]}"
                         :page-size="5"
                         @selection-change="deviceTableSelectionChange">
                <el-table-column
                    type="selection"
                    width="55px"
                    :reserve-selection="true"
                    align="center">
                </el-table-column>
                <el-table-column v-for="title in dialogTitlesDevice" :prop="title.prop" :label="title.label"
                                 :key="title.label"
                                 align="center"
                                 sortable="custom">
                </el-table-column>
            </data-tables>
            <div slot="footer" style="text-align: right;margin-top: 10px;">
                <el-button size="mini" @click="cancelSaveDevice">{{$t('tip.cancel')}}</el-button>
                <el-button size="mini" type="primary" @click="saveDevice">{{$t('tip.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from 'assets/js/api';
import { Debounce,DuplicateArr  } from 'assets/js/utils';
import Nodata from 'components/Nodata.vue'
export default {
    data() {
        return {
            currentMainPage:1,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            tableProps: {
                border: false,
                stripe: true,
                "row-key": row => {
                    return row.id;
                },
            },
            searchForm:{
                name:''
            },
            mainForm: {
                name:'',
                status:null,
                status_name:'',
                is_builtin:null,
                modify_time:'',
                create_time:'',
                creator_name:'',
                description:'',
            },
            MainRules: {
                name: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
                code: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
                type: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
                menu_name: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
            },
            allHover:{},
            //新增
            addShow:false,
            addNameValue:'',
            //编辑
            editGroupShow:{},
            editGroupNameValue:'',
            //删除
            isdeleteGroupShow:{},
            currentMainID: null,
            currentMainName: '',
            groupDataList:[],
            //===人员分配
            groupUserData: [],
            memberSearch:'',
            memberFormVisible:false,
            memberTableData:[],
            multipleSelectedData:[],
            tableMemberSelectedData:[],
            dialogTitles: [
                {
                    prop: "account_no",
                    label: this.$t('c.account')
                },
                {
                    prop: "name",
                    label: this.$t('c.username')
                },
                {
                    prop: "usertype_name",
                    label: "身份"
                },
                {
                    prop: "org_name",
                    label: "所属组"
                }
            ],
            //设备管理
            groupEqpsData:[],
            deviceTableData:[],
            multipleDeviceSelectedData:[],
            tableDeviceSelectedData:[],
            deviceFormVisible:false,
            deviceSearch:"",
            currentDevicePage:1,
            dialogTitlesDevice:[
                {
                    prop: "name",
                    label: this.$t('c.name')
                },
                {
                    prop: "eqp_num",
                    label: this.$t('title.equipmentID')
                },
                {
                    prop: "type_name",
                    label: this.$tc('c.type',0)
                },
                {
                    prop: "org_name",
                    label: "所属组"
                }
            ],
            currentPage:1,
        };
    },
    created() {
        this.getDataList();
    },
    mounted() {},
    computed: {
        ...mapGetters(['getRolePermission']),
        pagenatorData(){
            return this.groupDataList.slice((this.currentMainPage - 1) * 12,this.currentMainPage * 12);
        }  
    },
    methods: {
        query(){
            this.getDataList();
        },
        currentMainPageChange(page){
            this.currentMainPage=page;
        },
        getDataList(){
            api.getGroupList({name:this.searchForm.name}).then(data => {
                if(data){
                     this.groupDataList=data;
                     this.currentMainID=data[0].id;
                     this.currentMainName=data[0].name;
                     this.groupUserData = data[0].users;
                     this.groupEqpsData = data[0].equips;
                }
            });
        },
        hover(id){
            this.$forceUpdate();
            this.allHover[id]=true;
        },
        leave(id){
            this.$forceUpdate();
            this.allHover[id]=false;
        },
        toAdd(){
            if(!this.getRolePermission.create) return this.$message.warning('无权限');
            if(this.addNameValue.trim().length){
                api.postGroup({name:this.addNameValue}).then(data => {
                    this.addNameValue='';
                    this.addShow=false;
                    return this.getDataList();
                });
            }
        },
        toOpenEditGroup(val){
            if(!this.getRolePermission.edit) return this.$message.warning('无权限');
            this.editGroupShow={};
            this.editGroupNameValue=val.name;
        },
        toEditGroup(val){
            api.putGroup(val.id,{name:this.editGroupNameValue}).then(res => {
                this.editGroupNameValue='';
                this.editGroupShow={};
                return this.getDataList(); 
            });
        },
        toDeleteGroup(val){
            if(!this.getRolePermission.delete) return this.$message.warning('无权限');
            api.deleteGroup(val.id).then(res => {
                this.isdeleteGroupShow={};
                return this.getDataList(); 
            });
        },
        clickItem(val){
            this.groupUserData = val.users;
            this.groupEqpsData = val.equips;
            this.currentMainID=val.id;
            this.currentMainName=val.name;
        },
        //成员管理===========================
        openMemberDialog(){
            if(!this.getRolePermission.assign) return this.$message.warning('无权限');
            this.memberFormVisible=true;
            api.getGroupUsers().then(data => {
                if (!data) {
                    this.memberTableData = [];
                } else { 
                    this.memberTableData =data;
                    this.$nextTick(()=>{
                        this.memberTableData.forEach(row=>{
                            this.groupUserData.forEach(el => {
                                if(el.id == row.id){
                                    this.$refs.multipleTable.$refs.elTable.toggleRowSelection(row,true);
                                }
                            }); 
                        });
                    });
                }
            });
        },
        handleSelectionChange(val){
            this.multipleSelectedData=val;
        },
        searchUser:Debounce(function(){
            api.getGroupUsers({name: this.memberSearch}).then(data => {
                if (!data) {
                    this.memberTableData = [];
                } else {
                    this.memberTableData = data;
                    this.$nextTick(()=>{
                        this.memberTableData.forEach(row=>{
                            this.groupUserData.forEach(el => {
                                if(el.id == row.id){
                                    this.$refs.multipleTable.$refs.elTable.toggleRowSelection(row,true);
                                }
                            }); 
                        });
                    });
                }
            });
        },300),
        cancelSaveUser(){
            this.$nextTick(()=>{
                this.currentPage=1; 
                this.memberSearch='';
                this.memberTableData.forEach(row => {
                    this.$refs.multipleTable.$refs.elTable.toggleRowSelection(row,false);
                });
                this.memberFormVisible = false; 
            });
        },
        saveUser(){
            let userArr= this.multipleSelectedData.map(el=>{
                return el.id;
            });
            api.putOperationGroupUsers(this.currentMainID,{uid:DuplicateArr(userArr)}).then(res => {
                return api.getGroupList();
            }).then(data => {
                this.$nextTick(()=>{
                    this.groupDataList=data;
                    data.forEach(item=>{
                        if(this.currentMainID==item.id){
                            this.groupUserData=item.users;
                        }
                    });
                    this.multipleSelectedData=[];
                    this.memberFormVisible = false;
                });
            });
        },
        //=======设备管理==========================
        openDeviceDialog(){
            if(!this.getRolePermission.assign) return this.$message.warning('无权限');
            this.deviceFormVisible=true;
            this.$nextTick(()=>{
                 //刷新table
                api.getGroupEqps().then(data => {
                    this.deviceTableData=data;
                    this.deviceTableData.forEach(row=>{
                        this.groupEqpsData.forEach(el => {
                            if(el.id == row.id){
                                this.$refs.multipleTableDevice.$refs.elTable.toggleRowSelection(row,true);
                            }
                        }); 
                    });
                });
            });
        },
        getGroupDevice(groupID){
            api.getGroupEqps({org_id:groupID}).then(data => {
                this.groupEqpsData=data;
            });
        },
        searchDevice:Debounce(function(){
            api.getGroupEqps({name:this.deviceSearch}).then(data => {
                if (!data) {
                    this.deviceTableData = [];
                } else {
                    this.deviceTableData = data;
                    this.deviceTableData.forEach(row=>{
                        this.groupEqpsData.forEach(el => {
                            if(el.id == row.id){
                                this.$refs.multipleTableDevice.$refs.elTable.toggleRowSelection(row,true);
                            }
                        }); 
                    });
                }
            });
        },300),
        deviceTableSelectionChange(val){
            this.multipleDeviceSelectedData=val;
        },
        cancelSaveDevice(){
            this.$nextTick(()=>{
                this.multipleDeviceSelectedData=[];
                this.currentDevicePage=1; 
                this.deviceSearch='';
                this.deviceTableData.forEach(row => {
                    this.$refs.multipleTableDevice.$refs.elTable.toggleRowSelection(row,false);
                });
                this.deviceFormVisible = false; 
            });
        },
        saveDevice(){
            let tempArr= this.multipleDeviceSelectedData.map(el=>{
                return el.id;
            });
            api.putOperationGroupEqps(this.currentMainID,{eid:DuplicateArr(tempArr)}).then(res => {
                return api.getGroupList();
            }).then(data => {
                this.$nextTick(()=>{
                    this.groupDataList=data;
                        data.forEach(item=>{
                        if(this.currentMainID==item.id){
                            this.groupEqpsData=item.equips;
                        }
                    });
                    this.deviceFormVisible=false;
                    this.multipleDeviceSelectedData=[];
                });
            });
        },
        deviceSelectionChange(val){
            this.tableDeviceSelectedData=val;
        },
        //删除
        deleteMemberRow(ID){
            if(!this.getRolePermission.delete) return this.$message.warning('无权限');
            let tempArr=[];
            this.groupUserData.forEach(el=>{
                if(ID!=el.id){
                    tempArr.push(el.id);
                }
            });
            api.putOperationGroupUsers(this.currentMainID,{uid:tempArr}).then(res => {
                return api.getGroupList();
            }).then(data => {
                this.$nextTick(()=>{
                    this.groupDataList=data;
                    data.forEach(item=>{
                        if(this.currentMainID==item.id){
                            this.groupUserData=item.users;
                        }
                    });
                    this.multipleSelectedData=[];
                    this.memberFormVisible = false;
                });
            });
        },
        deleteEqpRow(ID){
            if(!this.getRolePermission.delete) return this.$message.warning('无权限');
            let tempArr=[];
            this.groupEqpsData.forEach(el=>{
                if(ID!=el.id){
                    tempArr.push(el.id);
                }
            });
            api.putOperationGroupEqps(this.currentMainID,{eid:tempArr}).then(res => {
                return api.getGroupList();
            }).then(data => {
                this.$nextTick(()=>{
                    this.groupDataList=data;
                        data.forEach(item=>{
                        if(this.currentMainID==item.id){
                            this.groupEqpsData=item.equips;
                        }
                    });
                    this.multipleDeviceSelectedData=[];
                    this.deviceFormVisible=false;
                });
            });
        },
    },
    watch: {},
    components: {Nodata}
};
</script>
<style lang="scss">
.groupmanager{
    .el-card{
        width: 100%;
        .el-card__body{
            padding:0;
        }
    }
    .datatable-box{
        .el-image{
            border-radius:50%;
            overflow: hidden;
            height:20px;
        }
    }
}
</style>

<style scoped lang="scss">
.groupmanager{
    .layoutbox {
        .query-form{
            background-color: #fff;
            margin-bottom:10px;
            .add{
                float: right;
                margin-top:5px;
            }
        }
        .content-box{
            .content-ul{
                display: flex;
                flex-flow:wrap row;
                li{
                    cursor: pointer;
                    width:280px;
                    margin-bottom:20px;
                    margin-right:20px;
                    position: relative;
                    z-index: 0;
                    &.active .name{
                        color:$yellow;
                    }
                    .name{
                        padding:10px;
                        color:#fff;
                        background: linear-gradient(45deg, #000, transparent);
                        .delete{
                            color: #fff;
                            float: right;
                            line-height:20px;
                            cursor: pointer;
                            margin-left:10px;
                            &:hover{
                                color: $red;
                            }
                        }
                        .edit{
                            color: #fff;
                            float: right;
                            line-height:20px;
                            cursor: pointer;
                            &:hover{
                                color: $green;
                            }
                        }
                    }
                    .content{
                        color: #ccc;
                        padding:10px;
                        p{
                            font-size:14px;
                        }
                        .img{
                            position: absolute;
                            left:0;
                            top:0;
                            width:100%;
                            z-index: -1;
                        }
                    }
                }
            }
        }
        .current-name{
            height: 45px;
            padding:10px 20px;
            background-color:$steel;
            font-size:18px;
            color: $yellow;
        }
        .datatable-box{
            display: flex;
            justify-content:space-between;
            .left-box,.right-box{
                width:calc(50% - 4px);
                position: relative;
                .title{
                    color: #fff;
                    position: absolute;
                    right:10px;
                    top:-35px;
                    font-size:12px;
                    .add{
                        margin-left:10px;
                    }
                }
            }
            .form-table{
                background-color: #fff;
                .status-box{
                    color: #fff;
                    padding: 10px;
                    &.yes{
                        background-color: $green;
                    }
                    &.no{
                        background-color: $red;
                    }
                }
                .type-box{
                    color: #fff;
                    padding: 10px;
                    &.yes{
                        background-color: $cyan;
                    }
                    &.no{
                        background-color: $gray;
                    }
                }
            }
        }
        .pagination-box{
            margin-top:0;
            margin-bottom:5px;
        }
    }
    .member-dialog{
        .search-box{
            text-align:left;
            .search{
                width:200px;
            }
        }
    }
}
    
</style>
