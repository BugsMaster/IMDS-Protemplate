/* 
<Excuterperson @selectPerson="addPerson" position="right">
     <el-button slot="clickContent" class="add-btn" type="primary" size="mini" icon="el-icon-plus"> 添加</el-button>
 </Excuterperson>
 */ 
 <template>
    <div class="excuter-box">
        <el-popover popper-class="excuter-box" v-model="popShow" :placement="initPosition" width="200" trigger="click">
            <el-input size="mini" :placeholder="$tc('rule.inputName',[0])" v-model="excuterSearch" @input="queryUser" clearable></el-input>
            <ul class="excuter-ul">
                <li v-for="per in memberTableData" :key="per.id" @click="addPerson(per)"><img class="portrait" :src="per.avatar"> {{per.name}}</li>
                <div style="text-align:center;background-color:#ccc;" v-if="!memberTableData.length">查无此人</div>
            </ul>
            <span slot="reference"><slot name="clickContent"></slot></span>
        </el-popover>
    </div>
</template>

<script>
    import api from 'assets/js/api';
    import Config from 'assets/js/config';
    import SparkMD5 from 'spark-md5';
    import { Storage, Ticket,Debounce } from 'assets/js/utils';
    export default {
        props:{
            position:{
                type: String,
                default:'top'
            }
        },
        data() {
            return {
                popShow:false,
                initPosition:'',
                excuterSearch:'',
                memberTableData:[],
            }
        },
        created() {
            this.initPosition = this.position;
            this.queryUser();
        },
        mounted() {
        },
        computed: {

        },
        methods: {
            queryUser:Debounce(function(){
                api.getUserList({name: this.excuterSearch }).then(data => {
                    if (data.length) { 
                        this.memberTableData = data;
                    } else {
                        this.memberTableData = [];
                    }
                });
            },200),
            addPerson(val){
                this.popShow = false;
                this.$emit('selectPerson',val);
            }
        },
        watch: {},
        destroyed() {
        },
        components: {}
    }
</script>
<style lang="scss">
.excuter-box{
    .excuter-ul{
        padding:5px 0;
        max-height: 300px;
        overflow: auto;
        li{
            line-height: 30px;
            margin-bottom: 5px;
            cursor: pointer;
            border-radius: 14px 10px 10px 10px;
            &:hover{
                background: $purpleLight;
            }
            .portrait{
                height: 30px;
                width: 30px;
                border-radius: 50%;
                border:1px solid #999;
            }
        }
        li.select{
            background-color: #dddae2;
        }
    }
}
</style>

<style scoped lang="scss">

</style>
