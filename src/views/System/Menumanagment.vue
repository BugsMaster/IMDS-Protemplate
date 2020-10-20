<template>
    <div id="menumanager" class="menumanager">
        <div class="layoutbox">
            <data-tables class="form-table" :data="tableData" :table-props="tableProps" :pagination-props="{pageSizes: [10,20,100]}" :page-size="10">
                <el-table-column prop="icon" label="图标" align="center" sortable="custom">
                    <template slot-scope="scope">
                        <span class="nucfont" :class="scope.row.icon"></span>
                    </template>
                </el-table-column>
                <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.label" align="center" sortable="custom">
                </el-table-column>
                <el-table-column prop="status_id" label="状态" align="center" sortable="custom">
                    <template slot-scope="scope">
                        <span class="status-box" :class="scope.row.status_id?'yes':'no'">{{scope.row.statusName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status_id" label="默认路由" align="center" sortable="custom">
                    <template slot-scope="scope">
                        <span class="status-box" :class="scope.row.is_default_route?'yes':'no'">{{scope.row.statusRouteName}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column :label="$t('c.operation')" align="center">
                    <div slot-scope="scope">
                        <el-button class="el-icon-edit" :title="$t('c.edit')" type="success" size="mini" plain @click="editMenu(scope.row)"></el-button>
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
                <el-form label-position="right" label-width="100px" :model="mainForm" ref="mainForm" :rules="menuRules">
                    <el-form-item :label="$t('c.name')+'：'" prop="name">
                        <el-input size="small" :placeholder="$t('rule.input')" v-model="mainForm.name" clearable disabled>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="图标：" prop="icon">
                        <el-input v-model="mainForm.icon" :placeholder="$t('rule.input')" disabled size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('c.path')+'：'" prop="url">
                        <el-input v-model="mainForm.url" :placeholder="$t('rule.input')" disabled size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="组件：" prop="component">
                        <el-input v-model="mainForm.component" :placeholder="$t('rule.input')" disabled size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="序号：" prop="order">
                        <el-input-number type="number" size="small" v-model="mainForm.order" :min="1" :step="1" step-strictl>
                        </el-input-number>
                    </el-form-item>
                    <el-form-item label="状态：" prop="status_id">
                        <el-switch
                        v-model="mainForm.status_id"
                        active-color="#13ce66"
                        inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="默认路由：">
                        <el-switch
                        v-model="mainForm.is_default_route"
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
                <el-button type="primary" @click="confirmForm">确 定</el-button>
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
            tableProps: {
                border: false,
                stripe: true,
            },
            titles: [
                {
                    prop: "icon",
                    label: "图标"
                },
                {
                    prop: "name",
                    label: "名称"
                },
                {
                    prop: "router",
                    label: "路径"
                },
                {
                    prop: "order",
                    label: "序号"
                },
                {
                    prop: "parent_name",
                    label: "上级菜单"
                },
                {
                    prop: "modify_time",
                    label: this.$t('c.modificationTime')
                }
            ],
            mainForm: {
                name:'',
                icon:'',
                url:'',
                order:null,
                status_id:false,
                component:'',
                is_default_route:false,
                description:''
            },
            menuRules: {
                name: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
                icon: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
                url: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
                component: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ],
                order: [
                    { required: true, message: this.$t('rule.required'), trigger: "change" },
                ]
            },
            mainFormVisible: false,
            currentMenuID: null,
        };
    },
    created() {
        this.getTableData();
    },
    mounted() {},
    computed: {
        ...mapGetters(['getRolePermission']),
    },
    methods: {
        getTableData() {
            this.tableData = [];
            api.getMenuList().then(data => {
                data.forEach((item, index) => {
                    item.statusName=item.status_id?"正常":"禁用";
                    item.statusRouteName=item.is_default_route?"是":"否";
                });
                this.tableData = data;
            });
        },
        cancleForm() {
            this.currentMenuID = null;
            this.mainFormVisible = false;
            this.$refs["mainForm"].resetFields();
            this.mainForm = {
                name:'',
                icon:'',
                url:'',
                order:null,
                status_id:null,
                component:'',
                is_default_route:null,
                description:''
            };
        },
        editMenu(rowData) {
            if(!this.getRolePermission.edit) return this.$message.warning('无权限');
            this.mainFormVisible=true;
            this.currentMenuID = rowData.id;
            api.getMenuData(rowData.id).then(data => {
                this.$nextTick(() => {
                    if(data){
                        this.mainForm.name=data.name;
                        this.mainForm.icon=data.icon;
                        this.mainForm.url=data.url;
                        this.mainForm.order=data.order;
                        this.mainForm.status_id=Boolean(data.status_id);
                        this.mainForm.is_default_route=Boolean(data.is_default_route);
                        this.mainForm.component=data.component;
                        this.mainForm.description=data.description;   
                    }
                });
            });
        },
        confirmForm() {
            let tempObj = {
                name:this.mainForm.name,
                description:this.mainForm.description,
                level_id:this.mainForm.level_id,
                url:this.mainForm.url,
                component:this.mainForm.component,
                icon:this.mainForm.icon,
                status_id:this.mainForm.status_id,
                order:this.mainForm.order,
                is_default_route:this.mainForm.is_default_route,
            };
            this.$refs["mainForm"].validate(valid => {
                if (!valid) return;
                api.putMenu(this.currentMenuID, tempObj).then(res => {
                    this.cancleForm();
                    return this.getTableData();
                });
            });
        },
    },
    watch: {},
    components: {}
};
</script>
<style scoped lang="scss">
.menumanager{
    .layoutbox {
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
        }
        
        
    }
    
}
    
</style>
