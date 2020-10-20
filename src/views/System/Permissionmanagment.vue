<template>
    <div id="permissionmanager" class="permissionmanager">
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
                    <!-- <el-button type="primary" class="r add" :title="$t('c.add')" size="mini" @click="addUser">
                        <i class="nucfont inuc-add"></i>
                    </el-button> -->
                </el-form>
            </div>
            <data-tables class="form-table" :data="tableData" :table-props="tableProps" :pagination-props="{pageSizes: [10,20,100]}" :page-size="10">
                <el-table-column prop="name" label="名称" align="center" sortable="custom">
                </el-table-column>
                <el-table-column prop="action_code" label="操作码" align="center" sortable="custom">
                </el-table-column>
                <el-table-column prop="order" label="排序" align="center" sortable="custom">
                </el-table-column>
                <el-table-column prop="menu_name" label="关联菜单" sortable="custom">
                    <template slot-scope="scope">
                        <span><i class="nucfont" :class="scope.row.menu_icon"></i>&nbsp;&nbsp;{{scope.row.menu_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="modify_time" label="修改时间" align="center" sortable="custom">
                </el-table-column>
                <el-table-column prop="type_name" label="类型" align="center" sortable="custom">
                    <template slot-scope="scope">
                        <span class="type-box" :class="scope.row.type_id?'yes':'no'">{{scope.row.type_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center" sortable="custom">
                    <template slot-scope="scope">
                        <span class="status-box" :class="scope.row.status_id?'yes':'no'">{{scope.row.status_name}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column :label="$t('c.operation')" align="center">
                    <div slot-scope="scope">
                        <el-button class="el-icon-edit" :title="$t('c.edit')" type="success" size="mini" plain @click="editMain(scope.row)"></el-button>
                    </div>
                </el-table-column> -->
            </data-tables>
        </div>
        <el-drawer
        title="信息"
        :visible.sync="mainFormVisible"
        direction="rtl"
        custom-class="drawer"
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
                    <el-form-item label="创建人：">{{mainForm.creator_name}}</el-form-item>
                    <el-form-item label="操作码：">{{mainForm.action_code}}</el-form-item>
                    <el-form-item label="识别码：">{{mainForm.code}}</el-form-item>
                    <el-form-item label="修改时间：">{{mainForm.modify_time}}</el-form-item>
                    <el-form-item label="类型：" prop="type">
                        <el-select style="width:200px;" v-model="mainForm.type_id" :placeholder="$t('rule.select')" size="mini" disabled>
                            <el-option label="按钮" :value="1"></el-option>
                            <el-option label="菜单" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关联菜单：" prop="menu_name">
                        <!-- <el-popover
                            placement="bottom"
                             v-model="treeOrgShow"
                            popper-class="treePop"
                            trigger="click">
                            <el-tree
                            :data="treeData"
                            node-key="id"
                            ref="departTree"
                            :expand-on-click-node="false"
                            highlight-current
                            default-expand-all
                            @node-click="nodeClick"
                            :props="defaultProps">
                                <div class="custom-tree-node" slot-scope="{node,data}">
                                    <span class="name">{{data.name}}</span>
                                </div>
                            </el-tree>
                            <el-input style="width:200px;" slot="reference" size="mini" :placeholder="$t('rule.select')" v-model="mainForm.menu_name" clearable readonly @focus="initTreeOrg">
                                <i slot="suffix" class="el-icon-arrow-down"></i>
                            </el-input>
                        </el-popover> -->
                        <el-input style="width:200px;" size="mini" :placeholder="$t('rule.select')" v-model="mainForm.menu_name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="序号：" prop="order">
                        <el-input-number type="number" size="small" v-model="mainForm.order" :min="1" :step="1" step-strictl>
                        </el-input-number>
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
                </el-form>
            </div>
            <div class="drawer_footer">
                <el-button @click="cancleForm">取 消</el-button>
                <el-button type="primary" @click="confirmForm" :loading="loading">{{ loading ? '提交.中 ...' : '确 定' }}</el-button>
            </div>
        </div>
        </el-drawer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from 'assets/js/api';
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
                action_code:'',
                type_id:null,
                menu_id:null,
                status_id:null,
                menu_name:'',
                description:'',
                modify_time:'',
                creator_name:'',
                order:null
            },
            MainRules: {
                name: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
                code: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
                type_id: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
                menu_name: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
            },
            treeOrgShow:false,
            loading: false,
            mainFormVisible: false,
            currentMainID: null,
            treeFormVisible: false,
            treeData:[],
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
            api.getPermissionList({name:this.searchForm.name}).then(data => {
                this.tableData = data;
            });
        },
        getTreeData(){
            api.getMenuTree().then(data=> {
                this.treeData=[data.menu_tree];
            });
        },
        initTreeOrg(){
            if(this.mainForm.menu_id){
                setTimeout(()=>{
                    this.$refs.departTree.setCurrentKey(this.mainForm.menu_id);
                },0)
            }else{
                $('.el-tree-node').each(function(){
                    $(this).removeClass("is-current");
                });
            }
        },
        cancleForm() {
            this.currentMainID = null;
            this.mainFormVisible = false;
            this.$refs["mainForm"].resetFields();
            this.mainForm = {
                name:'',
                action_code:'',
                type_id:null,
                menu_id:null,
                status_id:null,
                menu_name:'',
                description:'',
                modify_time:'',
                creator_name:'',
                order:null
            };
        },
        confirmForm() {
            this.$refs["mainForm"].validate(valid => {
                if (!valid) return;
                let tempObj = {
                    name: this.mainForm.name,
                    menu_id: this.mainForm.menu_id,
                    type_id: this.mainForm.type_id,
                    status_id:this.mainForm.status_id,
                    order: this.mainForm.order,
                    description: this.mainForm.description
                };
                this.loading=true;
                api.putMenuInfo(this.currentMainID, tempObj).then(res => {
                    this.loading=false;
                    this.cancleForm();
                    return this.getTableData();
                });
            });
        },
        editMain(rowData) {
            if(!this.getRolePermission.edit) return this.$message.warning('无权限');
            this.mainFormVisible=true;
            this.currentMainID = rowData.id;
            api.getMenuInfo(rowData.id).then(data => {
                if(data){
                    this.mainForm.name=data.name;
                    this.mainForm.action_code=data.action_code;
                    this.mainForm.code=data.code;
                    this.mainForm.type_id=data.type_id;
                    this.mainForm.modify_time=data.modify_time;
                    this.mainForm.creator_name=data.creator_name;
                    this.mainForm.order=data.order;
                    this.mainForm.status_id=Boolean(data.status_id);
                    this.mainForm.menu_id=data.menu_id;
                    this.mainForm.menu_name=data.menu_name;
                    this.mainForm.description=data.description; 
                }
            });
        },
        //搜索树
        nodeClick(val){
            this.mainForm.menu_id=val.id;
            this.mainForm.menu_name=val.name;
            this.treeOrgShow=false;
        },
    },
    watch: {},
    components: {}
};
</script>
<style scoped lang="scss">
.permissionmanager{
    .layoutbox {
        .query-form{
            background-color: #fff;
            margin-bottom:10px;
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
                    background-color: $mauve;
                }
                &.no{
                    background-color: $cyan;
                }
            }
        }
    }
    
}
    
</style>
