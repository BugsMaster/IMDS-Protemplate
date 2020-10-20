<template>
    <el-container class="sub-page" id="sub-page">
        <div class="btn-close" size="mini" @click="closeFn">
            <i class="el-icon-close"></i>
        </div>
        <slot></slot>
        <el-backtop target="#sub-page">
            <span class="back-up nucfont inuc-to-top"></span>
        </el-backtop>
    </el-container>
</template>

<script>
    export default {
        props: {
            title: String,
            ID: String,
            closeFn: {
                type: Function,
                default() {
                    return (() => {
                        history.go(-1);
                    })()
                }
            }
        },
        data() {
            return {}
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        methods: {},
        components: {}
    }
</script>

<style lang="scss">
    .sub-page {
        position: fixed;
        top: $h-header;
        left: 64px;
        bottom: 0;
        right: 0;
        overflow: auto;
        min-width: $w-min;
        background-color: #f5f5f5;
        padding:10px;
        z-index: 1000;
        .btn-close {
            position: absolute;
            top: 0;
            right: 0;
            background-color: #333;
            color: #fff;
            padding: 6px 6px 15px 15px;
            border-radius:0 0 0 50px;
            z-index: 1000;
            cursor: pointer;
            i {
                font-size: 22px;
                transition: all .3s ease;
            }
            &:hover{
                background-color: #000;
                i{
                    transform: rotateZ(90deg);
                }
            } 
        }
    }
</style>
