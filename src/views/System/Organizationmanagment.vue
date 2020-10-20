<template>
    <div id="organizationmanagment" class="layoutbox organizationmanagment">
        <div class="content">
            <div class="main-box">
                <div class="left-box">
                    <h3 class="title"><i class="nucfont inuc-organization"></i> 组织结构</h3>
                    <div class="tree-box">
                        <el-tree
                        :data="groupData"
                        node-key="id"
                        ref="tree"
                        :expand-on-click-node="false"
                        highlight-current
                        default-expand-all
                        @node-click="initePage"
                        :props="defaultProps">
                            <div class="custom-tree-node" slot-scope="{node,data}">
                                <span class="name">{{data.name}}</span>
                                <span class="opetation" v-if="opetionListShow[data.id]">
                                    <el-popover popper-class="group-box" placement="top" width="320" v-model="addGroupNameShow[data.id]" trigger="click">
                                        <el-input size="mini" show-word-limit :placeholder="$tc('rule.inputName',[1])" maxlength="10" v-model="addGroupNameValue" clearable>
                                            <el-button size="mini" slot="append" icon="el-icon-check" type="primary" @click="toAddGroup(data)"></el-button>
                                        </el-input>
                                        <el-button
                                            slot="reference"
                                            type="text"
                                            size="mini" 
                                            class="el-icon-plus add"
                                            title="新增"
                                            @click.stop="toOpenEditGroup('')">
                                        </el-button>
                                    </el-popover>
                                    <el-popover popper-class="group-box" placement="top" width="320" v-model="editGroupNameShow[data.id]" trigger="click">
                                        <el-input size="mini" show-word-limit :placeholder="$tc('rule.inputName',[1])" maxlength="10" v-model="groupNameValue" clearable>
                                            <el-button size="mini" slot="append" icon="el-icon-check" type="primary" @click="toEditGroup(data)"></el-button>
                                        </el-input>
                                        <el-button
                                            slot="reference"
                                            type="text"
                                            size="mini" 
                                            class="el-icon-edit edit"
                                            title="编辑"
                                            @click.stop="toOpenEditGroup(data.name)">
                                        </el-button>
                                    </el-popover>
                                    <el-button
                                        v-show="!data.isoriginal"
                                        type="text"
                                        size="mini"
                                        class="el-icon-rank move" title="移动" @click.stop="toOpenMoveGroup(data.id)">
                                    </el-button>
                                    <el-button
                                        v-show="!data.isoriginal"
                                        type="text"
                                        size="mini"
                                        class="el-icon-delete delete" title="删除" @click.stop="toDelete(data.id)">
                                    </el-button>
                                </span>
                                <span class="opetation" v-else>
                                    <el-button
                                        type="text"
                                        size="mini"
                                        class="el-icon-s-operation more" title="更多" @click.stop="toShowOperation(data.id)">
                                    </el-button>
                                </span>
                            </div>
                        </el-tree>
                    </div>
                </div>
                <div class="right-box">
                    <div class="operation-box" v-if="activeName==1">
                        <el-button type="primary" icon="el-icon-s-tools" size="mini" circle title="配置" @click="openMemberDialog"></el-button>
                        <el-button v-if="isMemberMultipleMode" type="success" icon="el-icon-rank" size="mini" circle title="移动" @click="toOpenMovePerson"></el-button>
                    </div>
                    <div class="operation-box" v-if="activeName==2">
                        <el-button type="primary" icon="el-icon-s-tools" size="mini" circle title="配置" @click="openDeviceDialog"></el-button>
                        <el-button v-if="isDeviceMultipleMode" type="success" icon="el-icon-rank" size="mini" circle title="移动" @click="toOpenMoveDevice"></el-button>
                    </div>
                    <el-tabs v-model="activeName" @tab-click="tabClick">
                        <el-tab-pane name="1">
                            <span slot="label"><i class="el-icon-user-solid"></i> 人员配置 <span class="blue">({{groupUserData.length}})</span></span>
                            <div class="content-box">
                                <div class="datatable-box paginator-box">
                                    <data-tables ref="groupUserTable" :data="groupUserData" :table-props="tableProps" :pagination-props="{ pageSizes: [10,20,100] }" :page-size="10" style="width: 100%;flex:1;" @selection-change="personSelectionChange">
                                        <el-table-column type="selection" width="55px" align="center">
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
                                        <el-table-column sortable prop="name" :label="$t('c.name')" align="center">
                                        </el-table-column>
                                        <el-table-column sortable prop="account_no" :label="$t('c.account')" align="center">
                                        </el-table-column>
                                        <el-table-column prop="usertype_name" sortable :label="$t('c.occupation')" align="center">
                                        </el-table-column>
                                        <el-table-column prop="mobile" :label="$t('app.mobile')" sortable align="center">
                                        </el-table-column>
                                        <el-table-column prop="org_name" label="所属组" sortable align="center">
                                        </el-table-column>
                                        <el-table-column :label="$t('c.operation')" sortable align="center">
                                            <template slot-scope="scope">
                                                <el-button title="移动" size="mini" class="el-icon-rank" type="success" plain @click="toOpenMovePerson(scope.row)">
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </data-tables>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane name="2">
                            <span slot="label"><i class="nucfont inuc-devicelist"></i> 设备配置 <span class="blue">({{groupEqpsData.length}})</span></span>
                            <div class="content-box">
                                <div class="datatable-box paginator-box">
                                    <data-tables ref="groupDeviceTable" :data="groupEqpsData" :table-props="tableProps" :pagination-props="{ pageSizes: [10,20,100] }" :page-size="10" style="width: 100%;flex:1;" @selection-change="deviceSelectionChange">
                                        <el-table-column type="selection" width="55px" align="center">
                                        </el-table-column>
                                        <el-table-column sortable prop="name" :label="$t('c.name')" align="center">
                                        </el-table-column>
                                        <el-table-column prop="eqp_num" sortable :label="$t('title.equipmentID')" align="center">
                                        </el-table-column>
                                        <el-table-column prop="serie" :label="$tc('c.type',0)" sortable align="center">
                                        </el-table-column>
                                        <el-table-column prop="type" label="类型" sortable align="center">
                                        </el-table-column>
                                        <el-table-column prop="org_name" label="所属组" sortable align="center">
                                        </el-table-column>
                                        <el-table-column :label="$t('c.operation')" sortable align="center">
                                            <template slot-scope="scope">
                                                <el-button title="移动" size="mini" class="el-icon-rank" type="success" plain @click="toOpenMoveDevice(scope.row)">
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </data-tables>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <el-dialog custom-class="member-dialog" :title="$tc('c.personnelDistribution',2)" width="800px" center :visible.sync="memberFormVisible" :close-on-click-modal="false" @close="cancelSaveUser">
            <div class="search-box">
                <el-input class="search" placeholder="请输入" prefix-icon="el-icon-search" v-model="memberSearch" size="mini" clearable @input="searchUser">
                </el-input>
            </div>
            <data-tables class="datatable-box"
                         ref="multipleTable"
                         :data="memberTableData"
                         :table-props="tableProps"
                         :current-page.sync="currentMemberPage"
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
                         <el-image :src="scope.row.avatar" fit="contain"></el-image>
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
                <el-input class="search" placeholder="请输入" prefix-icon="el-icon-search" v-model="deviceSearch" size="mini" clearable @input="searchDevice">
                </el-input>
            </div>
            <data-tables class="form-table"
                         ref="multipleTableDevice"
                         :data="deviceTableData"
                         :table-props="tablePropsDevice"
                         :current-page.sync="currentMemberPage"
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
        <el-dialog custom-class="tree-dialog" title="组织结构信息" width="400px" left :visible.sync="treeFormVisible" :close-on-click-modal="false" @close="cancelSavetree">
            <el-tree
            v-if="treeFormVisible"
            :data="groupData"
            node-key="id"
            ref="departTree"
            :expand-on-click-node="false"
            highlight-current
            default-expand-all
            @node-click="treeNodeClick"
            :props="defaultProps">
            </el-tree>
            <div slot="footer" style="text-align: right;margin-top: 10px;">
                <el-button size="mini" type="primary" @click="saveTree">{{$t('tip.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import api from 'assets/js/api'
    import { Storage, Ticket,Debounce,deepClone,DuplicateArr } from 'assets/js/utils'
    import Nodata from "components/Nodata.vue"
    export default {
        data() {
            return {
                currentGroupID:null,
                currentDeviceID:[],
                currentPersonID:[],
                destGroupID:null,
                groupData:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                activeName:'1',
                addGroupNameShow:{},
                editGroupNameShow:{},
                groupNameValue:'',
                addGroupNameValue:'',
                groupUserData:[],
                opetionListShow:{},
                isGroupMove:false,
                toMoveGroupID:null,
                //分页相关
                currentMemberPage:1,
                tableProps: {
                    border: false,
                    stripe: true,
                    "row-key": row => {
                        return row.id;
                    },
                },
                tablePropsDevice: {
                    border: false,
                    stripe: true,
                    "row-key": row => {
                        return row.ID;
                    },
                },
                //===人员分配
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
                //组织结构树
                treeFormVisible:false,
            }
        },
        created() {
        },
        mounted(){
            this.getTreeData();
        },
        computed: {
            ...mapGetters(['getRolePermission']),
            isMemberMultipleMode(){
                if(this.tableMemberSelectedData.length){
                    return true;
                }else{
                    return false;
                }
            },
            isDeviceMultipleMode(){
                if(this.tableDeviceSelectedData.length){
                    return true;
                }else{
                    return false;
                }
            }
        },
        methods: {
            tabClick(){
                this.$nextTick(()=>{   
                    this.groupUserData.forEach(row => {
                        this.$refs.groupUserTable.$refs.elTable.toggleRowSelection(row,false);
                    }); 
                    this.groupEqpsData.forEach(row => {
                        this.$refs.groupDeviceTable.$refs.elTable.toggleRowSelection(row,false);
                    }); 
                });
            },
            getTreeData(){
                api.getGroupTree().then(data => {
                    this.groupData=[data];
                    this.$nextTick(()=>{
                        this.$refs.tree.setCurrentKey(data.id);
                        this.initePage(data);
                    });
                });
            },
            initePage(val){
                this.opetionListShow={};
                this.currentGroupID = val.id;
                this.getGroupPersons(this.currentGroupID);
                this.getGroupDevice(this.currentGroupID);
            },
            toShowOperation(index){
                this.opetionListShow={};
                this.$set(this.opetionListShow, index, true);
            },
            toOpenEditGroup(name){
                if(!this.getRolePermission.edit) return this.$message.warning('无权限');
                if(name){
                    this.groupNameValue=name;
                }
                this.addGroupNameShow={};
                this.editGroupNameShow={};
            },
            toEditGroup(val){
                if(!this.getRolePermission.edit) return this.$message.warning('无权限');
                if(!this.groupNameValue.trim().length) return;
                api.putOrganization(val.id,{name:this.groupNameValue,parent_id:val.parent_id}).then(res => {
                    this.addGroupNameShow={};
                    this.editGroupNameShow={};
                    this.groupNameValue='';
                    return this.getTreeData();
                });
            },
            toAddGroup(val){
                if(!this.getRolePermission.create) return this.$message.warning('无权限');
                if(!this.addGroupNameValue.trim().length) return;
                api.postOrganization({name:this.addGroupNameValue,parent_id:val.id}).then(res => {
                    this.addGroupNameShow={};
                    this.editGroupNameShow={};
                    this.addGroupNameValue='';
                    return this.getTreeData();
                });
            },
            //移动组
            toOpenMoveGroup(toGroupID){
                if(!this.getRolePermission.move) return this.$message.warning('无权限');
                this.toMoveGroupID=toGroupID;
                this.isGroupMove=true;
                this.treeFormVisible=true;
                this.$nextTick(()=>{
                    this.$refs.departTree.setCurrentKey(toGroupID);
                });
            },
            toDelete(ID){
                if(!this.getRolePermission.delete) return this.$message.warning('无权限');
                api.deleteOrganization(ID).then(res => {
                    return this.getTreeData();
                });
            },
            // 获取组成员
            getGroupPersons(groupID){
                api.getGroupUsers({org_id:groupID}).then(data => {
                    this.groupUserData=data;
                });
            },
            openMemberDialog(){
                if(!this.getRolePermission.assign) return this.$message.warning('无权限');
                this.memberFormVisible=true;
                api.getGroupUsers().then(data=> {
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
                    this.currentMemberPage=1; 
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
                api.putGroupUsers(this.currentGroupID,{uid:DuplicateArr(userArr)}).then(data => {
                    return  api.getGroupUsers({org_id:this.currentGroupID});
                }).then(data => {
                    this.$nextTick(()=>{
                        this.groupUserData=data;
                        this.multipleSelectedData=[];
                        this.memberFormVisible = false;
                    });
                });
            },
            //获取table人员选择
            personSelectionChange(val){
                this.tableMemberSelectedData=val;
            },
            //移动人员
            toOpenMovePerson(val){
                if(!this.getRolePermission.move) return this.$message.warning('无权限');
                this.currentPersonID=[];
                this.destGroupID=val.org_id;
                if(this.isMemberMultipleMode){
                    this.currentPersonID= this.tableMemberSelectedData.map(el=>{
                        return el.id;
                    });
                }else{
                    this.currentPersonID.push(val.id);
                }
                this.treeFormVisible=true;
                this.$nextTick(()=>{
                    this.$refs.departTree.setCurrentKey(this.currentGroupID);
                });
            },
            //=======设备管理==========================
            openDeviceDialog(){
                if(!this.getRolePermission.assign) return this.$message.warning('无权限');
                this.deviceFormVisible=true;
                this.$nextTick(()=>{
                     //刷新table
                    api.getGroupEqps().then(data => {
                        this.deviceTableData=data.auth;
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
                    this.groupEqpsData=data.auth;
                });
            },
            searchDevice:Debounce(function(){
                api.getGroupEqps({name:this.deviceSearch}).then(data => {
                    if (!data) {
                        this.deviceTableData = [];
                    } else {
                        this.deviceTableData = data.auth;
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
                api.putGroupEqps(this.currentGroupID,{eid:DuplicateArr(tempArr)}).then(data => {
                    return api.getGroupEqps({org_id:this.currentGroupID});
                }).then(data => {
                    this.$nextTick(()=>{
                      this.groupEqpsData=data.auth;
                      this.deviceFormVisible=false;
                      this.multipleDeviceSelectedData=[];
                    });
                });
            },
            deviceSelectionChange(val){
                this.tableDeviceSelectedData=val;
            },
            //组织结构树
            toOpenMoveDevice(val){
                if(!this.getRolePermission.move) return this.$message.warning('无权限');
                this.currentDeviceID=[];
                this.destGroupID=val.org_id;
                if(this.isDeviceMultipleMode){
                    this.currentDeviceID= this.tableDeviceSelectedData.map(el=>{
                        return el.id;
                    })
                }else{
                    this.currentDeviceID.push(val.id);
                }
                this.treeFormVisible=true;
                this.$nextTick(()=>{
                    this.$refs.departTree.setCurrentKey(this.currentGroupID);
                });
            },
            treeNodeClick(val){
                this.destGroupID = val.id;
            },
            cancelSavetree(){
                this.destGroupID=null;
                this.treeFormVisible=false;
            },
            saveTree(){
                if(this.isGroupMove){
                    api.putOrganization(this.toMoveGroupID,{parent_id:this.destGroupID}).then(res => {
                        this.toMoveGroupID=null;
                        this.isGroupMove=false;
                        this.treeFormVisible=false;
                        return this.getTreeData();
                    });
                    return;
                }
                if(this.activeName=="1"){
                    api.putUsersMove(this.currentGroupID,{uid :this.currentPersonID,dest_org_id:this.destGroupID}).then(res => {
                        this.destGroupID=null;
                        this.currentPersonID=[];
                        this.treeFormVisible=false;
                        api.getGroupTree().then(data => {
                            this.groupData=[data];
                            data.children_id.forEach(item=>{
                                if(item.indexOf(this.currentGroupID)>-1){
                                    this.$nextTick(()=>{
                                        this.$refs.tree.setCurrentKey(this.currentGroupID);
                                    });
                                }else{
                                    setTimeout(()=>{
                                        $('.el-tree-node__content')[0].click();
                                    },100)
                                }
                            })
                        })
                        return this.getGroupPersons(this.currentGroupID);
                    });
                }else{
                    api.putDeviceMove(this.currentGroupID,{eid:this.currentDeviceID,dest_org_id:this.destGroupID}).then(res => {
                        this.destGroupID=null;
                        this.currentDeviceID=[];
                        this.treeFormVisible=false;
                        return this.getGroupDevice(this.currentGroupID);
                    });
                }
            },
        },
        watch: {

        },
        components: {
        }
    }
</script>
<style lang="scss">
.group-box {
    .el-input-group__append button.el-button:hover{
        color: #666;
    }
}
.organizationmanagment {
    // .el-tabs{
    //     .el-tabs__item{
    //         color: #fff;
    //         &.is-active{
    //             color:#fff;
    //         }
    //     }
    // }
    .el-tree{
        background-color: transparent;
        font-size:14px;
        color: #666;
        // .el-tree-node:focus > .el-tree-node__content{
        //     background-color: transparent;
        //     color: #666;
        // }
        // .el-tree-node__content:hover {
        //     background-color: transparent;
        //     color: #fff;
        // }
        &.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
            // background-color:$blue;
            color: $mauve;
        }
    }
    // .tree-dialog{
    //     h3{
    //         border-bottom:1px solid #ddd;
    //     }
    //     .el-tree{
    //         .el-tree-node:focus > .el-tree-node__content{
    //             color: #666;
    //         }
    //         &.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
    //             background-color:$blue;
    //             color: #666;
    //         }
    //     }
    // }
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

<style scoped lang="scss">
    .layoutbox {
        .content{
            .main-box{
                .left-box{
                    height: 100%;
                    float: left;
                    width:420px;
                    display: flex;
                    flex-flow:column nowrap;
                    .title{
                        padding:10px;
                        font-size:16px;
                        border-bottom:1px solid $mauve;
                        background: $gradualBlack;
                        color: #fff;
                    }
                    .tree-box{
                        background-color: #fff;
                        padding:10px;
                        flex:1;
                    }
                    .custom-tree-node{
                        width:100%;
                        .opetation{
                            position: absolute;
                            right: 0;
                            .el-button{
                                margin-left:0;
                                padding:0;
                                color:#999;
                                &.add:hover{
                                    color:$blue;
                                }
                                &.edit:hover{
                                    color:$green;
                                }
                                &.move:hover{
                                    color:$yellow;
                                }
                                &.delete:hover{
                                    color:$danger;
                                }
                                &.more:hover{
                                    color:$mauve;
                                }
                            }
                        }
                    }
                }
                .right-box{
                    background-color: #fff;
                    margin-left:450px;
                    padding:10px;
                    position: relative;
                    .operation-box{
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        z-index: 2000;
                    }
                }
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
