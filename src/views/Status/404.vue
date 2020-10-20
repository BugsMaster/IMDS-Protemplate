<template>
    <div class="page">
       <div class="img"></div>
       <h2 class="red">404</h2>
       <p>不找了，找不到了。。。</p>
    </div>
</template>

<script>
//    var echarts = require('echarts');
    export default {
        data() {
            return {
            }
        },
        created() {
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
    @import '../../style/const';
    .page {
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

