<template>
    <div id="nodata" class="nodata">
        <div class="img"></div>
        <h3 :class="color"><span class="el-icon-warning-outline"></span> {{title}}</h3>
    </div>
</template>

<script>
    import $i18n from 'assets/i18n'
    export default {
        data() {
            return {
                title: '',
                color:''
            }
        },
        props: {
            theme:{
                default: ''
            }
        },
        computed: {},
        created() {
            this.title = $i18n.t('c.noData');
            this.color = this.theme;
        },
        mounted() {
        },
        methods: {
        },
        components: {}
    }
</script>

<style lang="scss">
    @import '../style/const.scss';
    .nodata{
        margin-top: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3{
            margin-top: 20px;
            font-size: 20px;
            font-weight: 400;
            color: #666;
            text-align: center;
            letter-spacing:2px;
            &.light{
                color: #fff;
            }
        }
        .img{
            margin: 0 auto;
            width: 100px;
            height: 100px;
            background: url("../assets/images/spirit/nodata.png") no-repeat;
            -webkit-background-size:100%;
            background-size:100%;
        }
    }
</style>
