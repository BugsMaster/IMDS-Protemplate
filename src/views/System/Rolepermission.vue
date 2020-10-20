<template>
    <div id="rolepermission" class="rolepermission">
        <div class="layoutbox">
            <div class="main">
                <div class="left-box">
                    <el-card class="box-card" shadow="never">
                        <div slot="header" class="clearfix">
                            <span>角色列表</span>
                        </div>
                        <ul class="ul-content">
                            <li v-for="item in listData" :key="item.id" :class="{'active':item.id==currentID}" @click="clickItem(item)">{{item.name}}<span v-if="item.is_builtin" class="blue" style="font-size:12px;">(内置)</span></li>
                        </ul>
                    </el-card>
                </div>
                <div class="right-box">
                   <!-- <p><span class="red">checkAll</span>--{{checkAll}}</p>
                   <p><span class="red">checkedItems</span>--{{checkedItems}}</p>
                   <p><span class="red">itemDisable</span>--{{itemDisable}}</p>
                   <p><span class="red">allDisable</span>--{{allDisable}}</p> -->
                    <el-card class="box-card" shadow="never">
                        <div slot="header" class="clearfix">
                            <span>权限列表</span>
                            <el-button v-if="!isBuiltin" class="save-btn" size="mini" type="primary" plain @click="save">保存</el-button>
                        </div>
                        <el-tree
                            :data="treeData"
                            node-key="id"
                            ref="tree"
                            :expand-on-click-node="false"
                            highlight-current
                            default-expand-all
                            :props="defaultProps">
                                <div class="custom-tree-node" slot-scope="{node,data}">
                                    <span class="name"><i class="icon nucfont" :class="data.icon"></i>{{data.name}}</span>
                                    <div class="permisions" v-if="isBuiltin">
                                        <el-checkbox class="check-all" v-model="checkAll[data.id]" disabled>全选</el-checkbox>
                                        <el-checkbox-group class="check-group" v-model="checkedItems[data.id]">
                                            <el-checkbox v-for="item in data.permissions" :label="item.id" :key="item.id" disabled>{{item.name}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                    <div class="permisions" v-else>
                                        <el-checkbox class="check-all" v-model="checkAll[data.id]" @change="handleCheckAllChange(data)" :disabled="allDisable[data.id]">全选</el-checkbox>
                                        <el-checkbox-group class="check-group" v-model="checkedItems[data.id]">
                                            <el-checkbox v-for="item in data.permissions" :label="item.id" :key="item.id" :disabled="itemDisable[item.id]"  @change="checkItemChange(data,item.id)">{{item.name}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </div>
                        </el-tree>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from 'assets/js/api';
import { Storage } from 'assets/js/utils';
export default {
    data() {
        return {
            listData: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            treeData:[],
            currentID:null,
            checkedItems:{},
            checkAll:{},
            menuLengthAll:{},
            allDisable:{},
            itemDisable:{},
            menuExclusion:[],
            permissionExclusion:[],
            isBuiltin:true,
            userType:Storage.get("imds_ticket").usertype
        };
    },
    computed:{
        ...mapGetters(['getRolePermission']),
    },
    created() {
        this.getExclusion();
        this.getListData();
    },
    mounted() {
        
    },
    methods: {
        calcExclusion(){
            return;
            this.allDisable={};
            this.itemDisable={};
            // 菜单
            if(this.menuExclusion.length){
                this.menuExclusion.forEach(item=>{//item:[12, 20, 22]
                    let temObj={};//菜单选中状态
                    item.forEach(menuid=>{
                        if(this.checkedItems[menuid] && this.checkedItems[menuid].length){
                            temObj[menuid]=true;
                        }else{
                            temObj[menuid]=false;
                        }
                    });
                    let num=0;
                    for(let per in temObj){
                        if(temObj[per]){
                            num++; 
                        }
                    }
                    if(num==Object.keys(temObj).length-1){
                        for(let per in temObj){
                            if(!temObj[per]){
                                this.$set(this.allDisable, per, true);
                                this.menuList.forEach(element=>{
                                    if(element.id==per){
                                        element.permissions.forEach(n=>{
                                            this.$set(this.itemDisable, n.id, true);
                                        });
                                    }
                                })
                            }
                        }
                    }
                });
            }
            //权限
            if(this.permissionExclusion.length){
                 let permissionArr=[];
                //  获取已选的全部权限[]
                 for(let per in this.checkedItems){
                    permissionArr = permissionArr.concat(this.checkedItems[per]);
                 }
                 this.permissionExclusion.forEach(item=>{ 
                    let temObj={};
                    item.forEach(permissid=>{
                        let isPermissExist=false;
                        permissionArr.forEach(per=>{
                            if(per==permissid){
                                isPermissExist=true;
                            }
                        });
                        if(isPermissExist){
                            temObj[permissid] = true;
                        }else{
                            temObj[permissid] = false;
                        }
                    });
                    //记录在已有的权限中的互斥权限
                    let num=0;
                    for(let per in temObj){
                        if(temObj[per]){
                           num++; 
                        }
                    }
                    if(num==Object.keys(temObj).length-1){
                        for(let per in temObj){
                            if(!temObj[per]){
                                this.$set(this.itemDisable, per, true);
                                this.menuList.forEach((m)=>{
                                    let tempArr = m.permissions.map(k=>{ return k.id});
                                    if(tempArr.indexOf(Number(per))>-1){ 
                                        this.$set(this.allDisable, m.id, true);
                                    }
                                });
                            }
                        }
                    }
                });
             }
        },
        getExclusion(){
            return;
            api.getPermissionExclusion().then(data => {
                console.log(data);
                this.menuExclusion=data.menu;
                this.permissionExclusion=data.permission;
            });
        },
        getListData() {
            api.getRoleList().then(data => {
                this.listData = data;
                this.currentID= data[0].id;
                if(this.userType==1){
                    this.isBuiltin=false;
                }else{
                    this.isBuiltin= Boolean(data[0].is_builtin);
                }
                this.getTreeData(this.getExclusion);
            });
        },
        getTreeData(fn){
            api.getRolePermissions(this.currentID).then(data=> {
                if(!data) return; 
                this.$nextTick(()=>{
                    this.treeData=[data.menu_tree];
                    this.menuList=data.menu_list;
                    data.menu_list.forEach(el=>{
                        let permisionsID = [];
                        el.permissions.forEach(item=>{
                            if(item.isexist){
                                permisionsID.push(item.id);
                            }
                        })
                        this.$set(this.checkedItems,el.id,permisionsID);
                        if(this.checkedItems[el.id].length==el.permissions.length){
                            this.$set(this.checkAll,el.id,true);
                        }else{
                            this.$set(this.checkAll,el.id,false);
                        }
                    });
                    if(fn) fn();
                });
            });
        },
        clickItem(val){
            this.currentID=val.id;
            if(this.userType==1){
                this.isBuiltin=false;
            }else{
                this.isBuiltin= Boolean(val.is_builtin);
            }
            this.getTreeData(this.calcExclusion);
        },
        checkItemChange(val,per){
            // 默认勾选浏览权限
            if(this.checkedItems[val.id].length){
                val.permissions.forEach(item=>{
                    if(item.action_code == 'view'){
                        if(this.checkedItems[val.id].indexOf(item.id)<0){
                            if(this.checkedItems[val.id].length==1){
                                if(per!= item.id){
                                    this.checkedItems[val.id].push(item.id);
                                }else{
                                    this.checkedItems[val.id] = [];
                                }
                            }else if(this.checkedItems[val.id].length>1){
                                this.checkedItems[val.id] = [];
                            }
                        }
                    }
                });
            }
            if(this.checkedItems[val.id].length==val.permissions.length){
                this.checkAll[val.id]=true;
            }else{
                this.checkAll[val.id]=false;
            }
            
            console.log(this.checkedItems[val.id])
            this.calcExclusion();
        },
        handleCheckAllChange(val){
            if(this.checkedItems[val.id].length==val.permissions.length){
                this.checkedItems[val.id]=[];
            }else{
                this.checkedItems[val.id]=val.permissions.map(el=>{ return el.id;});
            }
            this.calcExclusion();
        },
        save(){
            if(!this.getRolePermission.edit) return this.$message.warning('无权限');
            let params=[];
            for (let key in this.checkedItems) {
               params.push(this.checkedItems[key]);
            }
            api.putRolePermissions(this.currentID,{permission_id:params.flat(1)});
        }
    },
    watch: {},
    components: {}
};
</script>
<style lang="scss">
.rolepermission{
    .el-tree{
        .el-tree-node > .el-tree-node__content{
            padding:20px 0;
            border-bottom: 1px dotted #ddd;
        }
    }
    .el-card__header{
        padding:10px 20px;
        background: $gradualBlack;
        color: #fff;
    }
}
.custom-tree-node .el-checkbox{
    margin-right:20px;
}
</style>

<style scoped lang="scss">
.rolepermission{
    .layoutbox {
        .main{
            height: 100%;
            display: flex;
            .left-box{
                min-width: 230px;
                margin-right:20px;
                .box-card{
                    .ul-content{
                        li{
                            cursor: pointer;
                            color: #999;
                            padding:3px 0;
                            &:hover{
                                color: #666;
                            }
                            &.active{
                                color: $mauve;
                            }
                        }
                    } 
                }
            } 
            .right-box{
                flex:1;
                padding-bottom:50px;
                .box-card{
                    .save-btn{
                        float: right;
                        margin-top:-5px;
                    }
                    .custom-tree-node{
                        width:100%;
                        display: flex;
                        .name{
                            width:200px;
                            color: #999;
                            .icon{
                                color: #666;
                                margin-right:10px;
                            }
                        }
                        .permisions{
                            flex:1;
                            text-align:right;
                            .check-group{
                                float: right;
                            }
                            .check-all{
                                margin-left:20px;
                                float: right;
                            }
                        }
                    }
                }
               
            } 
        }
        
    }
    
}
    
</style>
