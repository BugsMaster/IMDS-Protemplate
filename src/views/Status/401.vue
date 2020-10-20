<template>
    <div class="page">
       <div class="img"></div>
       <h2 class="red">401</h2>
       <p>身份信息无效</p>
       <p style="font-size: 22px">{{time}}后跳转。。。</p>
    </div>
</template>

<script>
import {Storage,Ticket} from 'assets/js/utils'
    export default {
        data() {
            return {
                time:2
            }
        },
        created() {
            //清空票据
            this.$nextTick(() => {
                Ticket.remove();
                Storage.clear();
            });
            setInterval(() => {
                this.time--;
                if (this.time==0){
                    window.location.href = "/login";
                }
            }, 1000)
        },
        mounted(){

        },
        computed: {

        },
        methods: {

        },
        beforeRouteLeave (to, from, next) {

            next();
        },
        watch: {},
        components: {}
    }
</script>
<style scoped lang="scss">
    @import 'style/const';
    .page {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-top: 200px;
        background: url("../../assets/images/common/bgc_status.jpg") no-repeat;
        background-size: 100% 100%;
        h2{
            margin-top: 20px;
            text-align: center;
            font-size: 40px;
        }
        p{
            margin-top: 20px;
            text-align: center;
            font-size: 26px;
            color: #ccc;
            letter-spacing: 3px;
        }
        .img{
            margin: 0 auto;
            width: 100px;
            height: 100px;
            background: url("../../assets/images/spirit/nodata.png") no-repeat;
            -webkit-background-size:100%;
            background-size:100%;
        }
    }

</style>

