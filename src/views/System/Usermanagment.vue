<template>
    <div id="usermanager" class="usermanager">
        <div class="layoutbox">
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
                    <el-form-item :label="$t('c.occupation')+'：'" prop="type">
                        <el-select v-model="formSearch.usertype" :placeholder="$t('rule.select')" size="mini" clearable>
                            <el-option :label="item.usertype_name" :value="item.usertype" v-for="item in getUserTypeMenu" :key="item.usertype"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="组别：">
                        <el-popover
                            placement="bottom"
                            popper-class="treePop"
                            trigger="click">
                            <el-tree
                            :data="groupTreeData"
                            node-key="id"
                            ref="tree"
                            :expand-on-click-node="false"
                            highlight-current
                            default-expand-all
                            @node-click="nodeClick"
                            :props="defaultProps">
                                <div class="custom-tree-node" slot-scope="{node,data}">
                                    <span class="name">{{data.name}}</span>
                                </div>
                            </el-tree>
                            <el-input slot="reference" size="mini" :placeholder="$t('rule.select')" v-model="formSearch.org_name" clearable readonly>
                                <i slot="suffix" style="cursor:pointer" v-if="formSearch.org_name.length" class="el-icon-circle-close" @click="clearGroup"></i>
                                <i slot="suffix" v-else class="el-icon-arrow-down"></i>
                            </el-input>
                        </el-popover>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" @click="queryUser" type="primary" plain>{{$t('c.query')}}</el-button>
                    </el-form-item>
                    <el-button type="primary" class="add" :title="$t('c.add')" size="mini" circle @click="addUser"><i class="el-icon-plus"></i></el-button>
                </el-form>
            </div>
            <div class="datatable-box paginator-box">
                <data-tables ref="multipleTable" :data="tableData" :table-props="tableProps" :pagination-props="{ pageSizes: [10, 20,100] }" :page-size="10" style="width: 100%;flex:1;">
                    <el-table-column label="头像" align="center">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.avatar" fit="contain">
                                <div slot="error" class="image-slot">
                                   <i class="nucfont inuc-usermanager"></i>
                                </div>
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="account_no" :label="$t('c.account')" align="center">
                    </el-table-column>
                    <el-table-column sortable prop="name" :label="$t('c.username')" align="center">
                    </el-table-column>
                    <el-table-column prop="usertype_name" sortable :label="$t('c.occupation')" align="center">
                    </el-table-column>
                    <el-table-column prop="org_name" sortable label="组别" align="center">
                    </el-table-column>
                    <el-table-column prop="mobile" :label="$t('app.mobile')" sortable align="center">
                    </el-table-column>
                    <el-table-column :label="$t('c.operation')" align="center" width="300px">
                        <template slot-scope="scope">
                            <div v-if="scope.row.hasRoot">
                                <el-button plain :title="$t('c.edit')" size="mini" class="el-icon-edit" type="success" @click="editUserForm(scope.row)">
                                </el-button>
                                <el-button plain title="角色分配" size="mini" type="warning" class="el-icon-user" @click="editAction(scope.row)">
                                </el-button>
                                <el-popover placement="top" width="200" trigger="click" v-model="isRestPasswordShow[scope.$index]">
                                    <p style="margin-bottom: 10px">{{$t('tip.resetPwd')}}</p>
                                    <div style="text-align: right;">
                                        <el-button size="mini" type="info" @click="isRestPasswordShow[scope.$index] = false" icon="el-icon-close" circle></el-button>
                                        <el-button size="mini" type="primary" @click="resetPassword(scope.row)" icon="el-icon-check" circle></el-button>
                                    </div>
                                    <el-button plain style="margin-left: 10px" slot="reference" :title="$t('app.resetPwd')" size="mini" type="info" class="el-icon-refresh">
                                    </el-button>
                                </el-popover>
                                <el-popover placement="top" trigger="click" v-model="isdeleteUserShow[scope.$index]">
                                    <p>{{$t('tip.delete')}}</p>
                                    <div style="text-align: right;">
                                        <el-button size="mini" type="info" @click="isdeleteUserShow[scope.$index] = false" icon="el-icon-close" circle></el-button>
                                        <el-button size="mini" type="primary" @click="deleteUser(scope.row)" icon="el-icon-check" circle></el-button>
                                    </div>
                                    <el-button plain style="margin-left: 10px" slot="reference" :title="$t('c.delete')" size="mini" type="danger" class="el-icon-delete">
                                    </el-button>
                                </el-popover>
                            </div>
                        </template>
                    </el-table-column>
                </data-tables>
            </div>
        </div>
        <el-drawer
        title="信息"
        :visible.sync="userFormVisible"
        :before-close="cancleForm"
        direction="rtl"
        custom-class="drawer"
        :wrapperClosable="false"
        ref="drawer"
        >
        <div class="drawer_box">
            <div class="drawer_content">
                <el-form label-position="right" :label-width="$i18n.locale=='zh'?'100px':'80px'" :model="userForm" ref="userForm" :rules="userRules">
                    <el-form-item :label="$t('c.account')+'：'">{{userForm.account_no}}</el-form-item>
                    <el-form-item :label="$t('c.name')+'：'" prop="name">
                        <el-input size="small" :placeholder="$t('rule.input')" v-model="userForm.name" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('c.occupation')+'：'" prop="usertype">
                        <el-select style="width:220px" v-model="userForm.usertype" :placeholder="$t('rule.select')" size="small">
                            <el-option :label="item.usertype_name" :value="item.usertype" v-for="item in getUserTypeMenu" :key="item.usertype"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="组别：" prop="org_name">
                        <el-popover
                            v-model="treeOrgShow"
                            placement="bottom"
                            popper-class="treePop"
                            trigger="click">
                            <el-tree
                            :data="groupData"
                            node-key="id"
                            ref="departTree"
                            :expand-on-click-node="false"
                            highlight-current
                            default-expand-all
                            @node-click="treeNodeClick"
                            :props="defaultProps">
                                <div class="custom-tree-node" slot-scope="{node,data}">
                                    <span class="name">{{data.name}}</span>
                                </div>
                            </el-tree>
                            <el-input style="width:220px" slot="reference" size="small" :placeholder="$t('rule.select')" v-model="userForm.org_name" readonly @focus="initTreeOrg">
                                <i slot="suffix" class="el-icon-arrow-down"></i>
                            </el-input>
                        </el-popover>
                    </el-form-item>
                    <el-form-item :label="$t('app.mobile')+'：'" prop="mobile">
                        <el-input v-model="userForm.mobile " :placeholder="$t('rule.input')" size="small" clearable></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('app.email')+'：'" prop="email">
                        <el-input v-model="userForm.email " :placeholder="$t('rule.input')" size="small" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="创建人：">{{userForm.creator_name}}</el-form-item>
                    <el-form-item label="修改时间：">{{userForm.modify_time}}</el-form-item>
                    <el-form-item label="创建时间：">{{userForm.create_time}}</el-form-item>
                </el-form>
            </div>
            <div class="drawer_footer">
                <el-button @click="cancleForm">取 消</el-button>
                <el-button type="primary" @click="confirmForm">确 定</el-button>
            </div>
        </div>
        </el-drawer>
        <el-dialog title="角色分配" :visible="actionDialog" custom-class="role-dialog" center :width="$i18n.locale!='zh'?'680px':'610px'" :modal-append-to-body="false" :close-on-click-modal="false" @close="cancelSaveAction">
            <el-transfer v-model="actionSelected" :data="actionData" :titles="[$t('rule.unselected'),$t('rule.selected')]" :button-texts="[$t('c.deletePermissions'),$t('c.addPermissions')]"></el-transfer>
            <div slot="footer" style="text-align: center;margin-bottom: 10px;">
                <el-button type="primary" @click="saveUserAction">{{$t('tip.save')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "assets/js/api";
import { Storage, Exp } from "assets/js/utils";
export default {
    data() {
        return {
            formSearch:{
                name:"",
                org_id: 0,
                usertype:null,
                org_name: "",
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            // 搜索树data
            groupTreeData:[],
            //用户表单
            treeOrgShow:false,
            userFormVisible: false,
            currentMainID: null,
            userForm: {
                name: "",
                account_no: "",
                usertype: null,
                usertype_name: "",
                org_name:"",
                email: "",
                mobile: "",
                creator_name:"",
                modify_time:"",
                create_time:"",
            },
            userRules: {
                name: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                    { max: 20, message: this.$t('rule.maxLength',[20]), trigger: "change" },
                ],
                usertype: [
                    { required: true, message: this.$t('rule.pSelectTyp'), trigger: "change" }
                ],
                org_name: [
                    { required: true, message: this.$t('rule.select'), trigger: "change" },
                ],
                mobile: [
                    {
                        pattern: Exp.mobile,
                        message: this.$t('app.errorMobile'),
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        pattern: Exp.email,
                        message: '请输入正确的邮箱',
                        trigger: "blur"
                    }
                ]
            },
            //分页相关
            tableProps: {
                border: false,
                stripe: true,
                "row-key": row => {
                    return row.id;
                },
            },
            tableData: [],
            isdeleteUserShow: {},
            //===修改权限===================
            actionDialog: false,
            actionSelected: [],
            actionData: [],
            // 重置密码
            isRestPasswordShow:{},
            //组织结构
            groupData:[],
            currentGroupData:{},
            treeFormVisible:false,
        };
    },
    created() {
        !this.getUserTypeMenu.length &&this.$store.dispatch("getUserTypeMenu");
        this.getTableData();
        this.getTreeData();
        this.getRoleData();
    },
    mounted() {},
    computed: {
        ...mapGetters(['getUserTypeMenu','getRolePermission']),
    },
    methods: {
        getTableData(params) {
            api.getUserList(params).then(data => {
                let userData = Storage.get("imds_ticket");
                data.forEach(item=>{
                    if(userData.userType==item.usertype){
                        if(userData.currentMainID==item.currentMainID) {
                            item.hasRoot=true;
                        }else{
                            item.hasRoot=false;
                        }
                    }else{
                        item.hasRoot=true;
                    }
                });
                this.tableData = data;
            });
        },
        //搜索树
        nodeClick(val){
            this.formSearch.org_id=val.id;
            this.formSearch.org_name=val.name;
        },
        clearGroup(){
            this.formSearch.org_id= 0;
            this.formSearch.org_name= '';
            $('.el-tree-node').each(function(){
                $(this).removeClass("is-current");
            });
        },
        getTreeData(){
            api.getGroupTree().then(data => {
                if(!data) return; 
                this.groupData=[data];
                this.groupTreeData=[data];
            });
        },
        queryUser(){
            let params={
                name:this.formSearch.name,
                usertype:this.formSearch.usertype||0,
                org_id:this.formSearch.org_id
            }
            this.getTableData(params);
        },
        //表单开始
        addUser() {
            if(!this.getRolePermission.create) return this.$message.warning('无权限');
            this.userFormVisible = true;
            this.currentMainID = null;
            this.userForm = {
                name: "",
                account_no: "",
                usertype: null,
                usertype_name: "",
                org_id: null,
                org_name:"",
                email: "",
                mobile: "",
                creator_name:"",
                modify_time:"",
                create_time:"",
            };
        },
        initTreeOrg(){
            if(this.userForm.org_id){
                setTimeout(()=>{
                    this.$refs.departTree.setCurrentKey(this.userForm.org_id);
                },0)
            }else{
                $('.el-tree-node').each(function(){
                    $(this).removeClass("is-current");
                });
            }
        },
        treeNodeClick(val){
            this.userForm.org_id=val.id;
            this.userForm.org_name=val.name;
            this.treeOrgShow=false;
        },
        saveTree(){
            this.$set(this.userForm, 'org_name', this.currentGroupData.name)
            this.userForm.groupid = this.currentGroupData.id;
            this.treeFormVisible=false;
        },
        editUserForm(val) {
            if(!this.getRolePermission.edit) return this.$message.warning('无权限');
            this.$nextTick(() => {
                this.currentMainID = val.id;
                this.userForm = {
                    name: val.name,
                    account_no: val.account_no,
                    usertype: val.usertype,
                    usertype_name: val.usertype_name,
                    org_id:val.org_id,
                    org_name:val.org_name,
                    email: val.email,
                    mobile: val.mobile,
                    creator_name:val.creator_name,
                    modify_time:val.modify_time,
                    create_time:val.create_time,
                };
                this.userFormVisible = true;
            });
        },
        deleteUser(userData) {
            if(!this.getRolePermission.delete) return this.$message.warning('无权限');
            this.isdeleteUserShow = {};
            api.deleteUser(userData.id).then(res => {
                return this.getTableData();
            });
        },
        cancleForm() {
            this.userFormVisible = false;
            this.userForm = {
                name: "",
                account_no: "",
                usertype: null,
                usertype_name: "",
                org_id:null,
                org_name:"",
                email: "",
                mobile: "",
                creator_name:"",
                modify_time:"",
                create_time:"",
            };
            this.$refs["userForm"].resetFields();
            this.currentMainID=null;
        },
        confirmForm() {
            this.$refs["userForm"].validate(valid => {
                if (!valid) return;
                let params={
                    name: this.userForm.name,
                    email: this.userForm.email,
                    mobile: this.userForm.mobile,
                    usertype: this.userForm.usertype,
                    org_id: this.userForm.org_id
                }
                if (this.currentMainID) {
                    api.putUser(this.currentMainID,params).then(res => {
                        this.cancleForm();
                        return this.getTableData();
                    });
                } else {
                    api.postUser(params).then(res => {
                        this.cancleForm();
                        return this.getTableData();
                    });
                }
            });
        },
        //=========修改权限======
        getRoleData(){
            api.getRoleList().then(data => {
                data.forEach(v => {
                    this.actionData.push({
                        key: v.id,
                        label: v.name
                    });
                });
            });
        },
        editAction(val) {
            if(!this.getRolePermission.assign) return this.$message.warning('无权限');
            this.actionDialog = true;
            this.$nextTick(()=>{
                this.currentMainID = val.id;
                this.actionSelected=[];
                val.roles.forEach(v => {
                    this.actionSelected.push(v.id);
                });
            })
        },
        saveUserAction() {
            api.putUserRoles(this.currentMainID, { roles_id: this.actionSelected }).then(res => {
                this.cancelSaveAction();
                return this.getTableData();
            });
        },
        cancelSaveAction() {
            this.actionDialog = false;
            this.actionSelected = [];
            this.currentMainID = null;
        },
        resetPassword(row){
            if(!this.getRolePermission.reset_pwd) return this.$message.warning('无权限');
            this.isRestPasswordShow = {};
            api.putResetpwd(row.id).then(res => {
                return this.getTableData();
            });
        }
    },
    watch: {},
    components: {}
};
</script>
<style lang="scss">
.usermanager {
    .el-checkbox-group .el-transfer-panel__item{
        display: block;
    }
}
    // .treePop,.tree-dialog{
    //     h3{
    //         border-bottom:1px solid #ddd;
    //     }
    //     .el-tree{
    //         .el-tree-node:focus > .el-tree-node__content{
    //             color: $mauve;
    //         }
    //         &.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
    //             background-color:$blue;
    //             color: $mauve;
    //         }
    //     }
    // }
</style>
<style scoped lang="scss">
.layoutbox {
    .query-form{
        background-color: #fff;
        margin-bottom:10px;
        .add{
            float: right;
            margin-top:5px;
        }
    }
    .datatable-box{
        background-color: #fff;
        .el-image{
            border-radius:50%;
            overflow: hidden;
            width:30px;
            height:30px;
        }
    }
}
</style>
