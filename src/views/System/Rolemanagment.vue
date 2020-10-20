<template>
    <div id="rolemanager" class="rolemanager">
        <div class="layoutbox">
            <div class="query-form">
                <el-form ref="searchForm" :inline="true" :model="searchForm" @submit.native.prevent>
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
                    <el-button type="primary" class="add" :title="$t('c.add')" size="mini" @click="add" circle>
                        <i class="el-icon-plus"></i>
                    </el-button>
                </el-form>
            </div>
            <data-tables class="form-table" :data="tableData" :table-props="tableProps" :pagination-props="{pageSizes: [10,20,100]}" :page-size="10">
                <el-table-column prop="name" label="名称" align="center" sortable>
                </el-table-column>
                <el-table-column prop="status_id" label="状态" align="center" sortable>
                    <template slot-scope="scope">
                        <span class="status-box" :class="scope.row.status_id?'yes':'no'">{{scope.row.status_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="内置" align="center" sortable>
                    <template slot-scope="scope">
                        <span class="type-box" :class="scope.row.is_builtin?'yes':'no'">{{scope.row.is_builtin?'是':'否'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="creator_name" label="创建者" align="center" sortable>
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center" sortable>
                </el-table-column>
                <el-table-column prop="modify_time" label="修改时间" align="center" sortable>
                </el-table-column>
                <el-table-column :label="$t('c.operation')" align="center">
                    <div slot-scope="scope">
                        <div v-if="scope.row.is_builtin">
                            <el-button class="el-icon-s-custom" :title="$t('c.edit')" type="info" size="mini" plain @click="personAllocation(scope.row)"></el-button>
                        </div>
                        <div v-else>
                            <el-button class="el-icon-edit" :title="$t('c.edit')" type="success" size="mini" plain @click="editMain(scope.row)"></el-button>
                            <el-button class="el-icon-s-custom" :title="$t('c.edit')" type="info" size="mini" plain @click="personAllocation(scope.row)"></el-button>
                            <el-popover placement="top" trigger="click" v-model="isdeleteShow[scope.$index]">
                                <p>{{$t('tip.delete')}}</p>
                                <div style="text-align: right;">
                                    <el-button size="mini" type="info" @click="isdeleteShow[scope.$index] = false" icon="el-icon-close" circle></el-button>
                                    <el-button size="mini" type="primary" @click="deleteRow(scope.row)" icon="el-icon-check" circle></el-button>
                                </div>
                                <el-button plain style="margin-left: 10px" slot="reference" :title="$t('c.delete')" size="mini" type="danger" class="el-icon-delete">
                                </el-button>
                            </el-popover>
                        </div>
                    </div>
                </el-table-column>
            </data-tables>
        </div>
        <el-drawer
        title="信息"
        :visible.sync="mainFormVisible"
        direction="rtl"
        custom-class="drawer"
        :before-close="cancleForm"
        :wrapperClosable="false"
        ref="drawer"
        >
        <div class="drawer_box">
            <div class="drawer_content">
                <el-form label-position="right" label-width="100px" :model="mainForm" ref="mainForm" :rules="MainRules">
                    <el-form-item :label="$t('c.name')+'：'" prop="name">
                        <el-input size="small" :placeholder="$t('rule.input')" v-model="mainForm.name" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-switch
                        v-model="mainForm.status_id"
                        active-color="#13ce66"
                        inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="描述：">
                        <el-input type="textarea" v-model="mainForm.description" :placeholder="$t('rule.input')" rows="4" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="内置：">{{mainForm.is_builtin?'是':'否'}}</el-form-item>
                    <el-form-item label="创建人：">{{mainForm.creator_name}}</el-form-item>
                    <el-form-item label="修改时间：">{{mainForm.modify_time}}</el-form-item>
                    <el-form-item label="创建时间：">{{mainForm.create_time}}</el-form-item>
                </el-form>
            </div>
            <div class="drawer_footer">
                <el-button @click="cancleForm">取 消</el-button>
                <el-button type="primary" @click="confirmForm" :loading="loading">{{ loading ? '提交.中 ...' : '确 定' }}</el-button>
            </div>
        </div>
        </el-drawer>
        <el-dialog :title="$tc('c.personnelDistribution',2)" width="800px" right :visible.sync="memberFormVisible" :close-on-click-modal="false" @close="cancelSaveUser">
            <el-tabs type="border-card" v-model="activeName">

                <el-tab-pane :label="$t('c.all')" name="first">
                    <el-input style="width:200px;" class="search" placeholder="请输入名称" prefix-icon="el-icon-search" v-model.trim="memberSearch" size="mini" clearable @input="searchUser">
                    </el-input>
                    <data-tables class="form-table"
                                ref="multipleTable"
                                :data="memberTableData"
                                :table-props="dialogTableProps"
                                :current-page="1"
                                :pagination-props="{pageSizes: [5,20,100]}"
                                :page-size="5"
                                @selection-change="selectionChange">
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
                </el-tab-pane>

                <el-tab-pane :label="$t('rule.selected')+'('+multipleSelectedData.length+')'" name="second">
                    <data-tables class="form-table"
                                ref="selectedTable"
                                :data="multipleSelectedData"
                                :table-props="dialogTableProps"
                                :current-page="1"
                                :page-size="5"
                                :pagination-props="{pageSizes: [5,20,100]}">
                        <el-table-column label="头像" align="center">
                            <template slot-scope="scope">
                                <el-image :src="scope.row.avatar" fit="contain"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="title in dialogTitles" :prop="title.prop" :label="title.label"
                                        :key="title.label"
                                        align="center">
                        </el-table-column>
                        <el-table-column :label="$t('c.operation')" align="center">
                            <div class="btn-cell" slot-scope="scope">
                                <i class="delete el-icon-delete" :title="$t('c.delete')"
                                @click="handleDelete(scope.$index, scope.row)"></i>
                            </div>
                        </el-table-column>
                    </data-tables>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" style="text-align: right;margin-top: 10px;">
                <el-button @click="cancelSaveUser">{{$t('tip.cancel')}}</el-button>
                <el-button type="primary" @click="saveUser">{{$t('tip.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from 'assets/js/api'
export default {
    data() {
        return {
            tableData: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            tableProps: {
                border: false,
                stripe: true,
            },
            searchForm:{
                name:''
            },
            mainForm: {
                name:'',
                status_name:'',
                status_id:true,
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
            isdeleteShow:{},
            loading: false,
            mainFormVisible: false,
            currentMainID: null,
            treeFormVisible: false,
            treeData:[],
            //人员配置=============================
            memberFormVisible: false,
            memberSearch: "",
            memberTableData: [],
            initMemberTableData: [],
            multipleSelectedData: [],
            currentActionID: null,
            //分页相关
            activeName: "first",
            dialogTableProps: {
                border: false,
                stripe: true,
                "row-key": row => {
                    return row.userid;
                },
            },
            dialogTitles: [
                {
                    prop: "name",
                    label: this.$t('c.username')
                },
                {
                    prop: "account_no",
                    label: this.$t('c.account')
                },
                {
                    prop: "org_name",
                    label: "所属组"
                }
            ]
        };
    },
    created() {
        this.getTableData();
        this.getTreeData();
    },
    mounted() {},
    computed: {
        ...mapGetters(['getRolePermission']),
    },
    methods: {
        query(){
            this.getTableData();
        },
        getTableData() {
            api.getRoleList({name:this.searchForm.name}).then(data => {
                this.tableData = data;
            });
        },
        getTreeData(){
            api.getMenuTree().then(data=> {
                this.treeData=data.children;
            });
            api.getUserList().then( data  => {
                this.memberTableData = data;
                this.initMemberTableData = data;
            });
        },
        cancleForm() {
            this.currentMainID = null;
            this.mainFormVisible = false;
            this.$refs["mainForm"].resetFields();
            this.mainForm = {
                name:'',
                status_id:true,
                status_name:'',
                is_builtin:null,
                modify_time:'',
                create_time:'',
                creator_name:'',
                description:'',
            };
        },
        add(){
            if(!this.getRolePermission.create) return this.$message.warning('无权限');
            this.mainFormVisible = true;
        },
        editMain(rowData) {
            if(!this.getRolePermission.edit) return this.$message.warning('无权限');
            this.mainFormVisible=true;
            this.currentMainID = rowData.id;
            this.$nextTick(()=>{
                this.mainForm.name=rowData.name;
                this.mainForm.status_id=Boolean(rowData.status_id);
                this.mainForm.status_name=rowData.status_name;
                this.mainForm.is_builtin=rowData.is_builtin;
                this.mainForm.modify_time=rowData.modify_time;
                this.mainForm.create_time=rowData.create_time;
                this.mainForm.creator_name=rowData.creator_name;
                this.mainForm.description=rowData.description; 
            });
        },
        confirmForm() {
            let tempObj = {
                name: this.mainForm.name,
                status_id: this.mainForm.status_id,
                description: this.mainForm.description
            };
            this.$refs["mainForm"].validate(valid => {
                if (!valid) return;
                if (this.currentMainID) {
                    api.putRoleInfo(this.currentMainID, tempObj).then(res => {
                        this.cancleForm();
                        return this.getTableData();
                    });
                } else {
                    api.postRoleInfo(tempObj).then(res => {
                        this.cancleForm();
                        return this.getTableData();
                    });
                }
            });
        },
        deleteRow(row){
            if(!this.getRolePermission.delete) return this.$message.warning('无权限');
            this.isdeleteShow = {};
            api.deleteRole(row.id).then(res => {
                return this.getTableData();
            });
        },
        toOpenTree(){
            this.treeFormVisible=true;
        },
        //搜索树
        nodeClick(val){
            this.mainForm.menu_id=val.id;
            this.mainForm.menu_name=val.name;
        },
        //配置成员======================================
        personAllocation(row) {
            this.memberFormVisible = true;
            this.currentActionID = row.id;
            this.$nextTick(() => {
                row.members.forEach(item => {
                    this.memberTableData.forEach((element, index) => {
                        if (item.id == element.id) {
                            this.$refs.multipleTable.$refs.elTable.toggleRowSelection(
                                this.memberTableData[index],
                                true
                            );
                        }
                    });
                });
            });
        },
        searchUser() {
            api
                .getUserList({name: this.memberSearch})
                .then(({ data }) => {
                    this.memberTableData = data;
                });
        },
        selectionChange(val){
            this.multipleSelectedData = val;
        },
        cancelSaveUser() {
            this.memberSearch = '';
            this.currentActionID = null;
            this.$refs.multipleTable.$refs.elTable.clearSelection();
            this.memberTableData = this.initMemberTableData;
            this.activeName = "first";
            this.memberFormVisible = false;
        },
        handleDelete(index, row) {
            let eleIndex = this.multipleSelectedData.findIndex(
                ele => ele.id === row.id
            );
            this.multipleSelectedData.splice(eleIndex, 1);
            let index1 = this.memberTableData.findIndex(
                val => val.id === row.id
            );
            if (index1 > -1) {
                this.$refs.multipleTable.$refs.elTable.toggleRowSelection(
                    this.memberTableData[index1],
                    false
                );
            }
        },
        saveUser() {
            let userArray = this.multipleSelectedData.map(item => {
                return item.id;
            });
            api
                .putRoleMembers(this.currentActionID, { users: userArray })
                .then(data => {
                    this.cancelSaveUser();
                    return this.getTableData();
                });
        }
    },
    watch: {},
    components: {}
};
</script>
<style scoped lang="scss">
.rolemanager{
    .layoutbox {
        .query-form{
            background-color: #fff;
            margin-bottom:10px;
            .add{
                float: right;
                margin-top:5px;
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
    .form-table {
        display: flex;
        flex: 1;
        flex-direction: column;
        .el-image{
            border-radius:50%;
            overflow: hidden;
            width:30px;
            height:30px;
        }
        .delete{
            cursor: pointer;
            &:hover{
                color: $red;
            }
        }
    }

}
    
</style>
