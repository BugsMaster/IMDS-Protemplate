<template>
    <span class="button-box" @click="click">
        <span v-if="options.type==1" :class="'button_'+options.type">
            <span class="content">{{options.text}}</span>
        </span>
        <span v-if="options.type==2 || options.type==4" :class="'button_'+options.type">{{options.text}}</span>
        <span v-if="options.type==3" :class="'button_'+options.type">
            <span class="content">{{options.index}}</span>
            {{options.text}}
        </span>
    </span>
</template>
<script>
import validateConfig from '../utils/validateConfig'
export default {
    data() {
        return {
            rule: {
                type:{
                    type: Number,
                    required: true,
                    default: 1
                },
                text:{
                    type: String,
                    required: false,
                    default:'click'
                },
                index:{
                    type: String,
                    required: false,
                    default:'1'
                }
            },
        };
    },
    props: {
       config:{}
    },
    computed: {
        options(){
            return validateConfig(this.rule,this.config);
        }
    },
    created() {
    },
    mounted() {
        
    },
    methods: {
        click(){
            this.$emit('click',true);
        }
    },
    components: {},
};
</script>

<style lang="scss" scoped>
.button-box{
    .button_1{
        background-color: rgb(204, 208, 213);
        padding: 20px 10px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px;
        -webkit-box-shadow: inset 0px 1px 1px #909193, 0px 1px 0px #fff;
        -moz-box-shadow: inset 0px 1px 1px #909193, 0px 1px 0px #fff;
        -o-box-shadow: inset 0px 1px 1px #909193, 0px 1px 0px #fff;
        box-shadow: inset 0px 1px 1px #909193, 0px 1px 0px #fff;
        cursor: pointer;
        .content{
            background-color: rgb(59, 179, 224);
            padding: 10px;
            position: relative;
            text-decoration: none;
            color: rgb(255, 255, 255);
            border: solid 1px rgb(24, 111, 143);
            background-image: linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
            background-image: -o-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
            background-image: -moz-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
            background-image: -webkit-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
            background-image: -ms-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
            background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(44,160,202)), color-stop(1, rgb(62,184,229)) );
            -webkit-box-shadow: inset 0px 1px 0px #7fd2f1, 0px 1px 0px #fff;
            -moz-box-shadow: inset 0px 1px 0px #7fd2f1, 0px 1px 0px #fff;
            box-shadow: inset 0px 1px 0px #7fd2f1, 0px 1px 0px #fff;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -o-border-radius: 5px;
            border-radius: 5px;
            &:active {
                padding-bottom: 9px;
                padding-left: 10px;
                padding-right: 10px;
                padding-top: 11px;
                top: 1px;
                background-image: linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
                background-image: -o-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
                background-image: -moz-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
                background-image: -webkit-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
                background-image: -ms-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
                background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(62,184,229)), color-stop(1, rgb(44,160,202)) );
            }
        }
    }
    .button_2{
        background-color: rgb(59, 179, 224);
        padding: 10px;
        position: relative;
        text-decoration: none;
        color: rgb(255, 255, 255);
        background-image: linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -o-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -moz-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -webkit-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -ms-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(44,160,202)), color-stop(1, rgb(62,184,229)) );
        -webkit-box-shadow: inset 0px 1px 0px #7fd2f1, 0px 6px 0px #156785;
        -moz-box-shadow: inset 0px 1px 0px #7fd2f1, 0px 6px 0px #156785;
        -o-box-shadow: inset 0px 1px 0px #7fd2f1, 0px 6px 0px #156785;
        box-shadow: inset 0px 1px 0px #7fd2f1, 0px 6px 0px #156785;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        cursor: pointer;
        &:active {
            color: rgb(21, 103, 133);
            text-shadow: 0px 1px 1px rgba(255,255,255,0.3);
            background: rgb(44,160,202);
            -webkit-box-shadow: inset 0px 1px 0px #7fd2f1, inset 0px -1px 0px #156785;
            -moz-box-shadow: inset 0px 1px 0px #7fd2f1, inset 0px -1px 0px #156785;
            -o-box-shadow: inset 0px 1px 0px #7fd2f1, inset 0px -1px 0px #156785;
            box-shadow: inset 0px 1px 0px #7fd2f1, inset 0px -1px 0px #156785;
            top: 7px;
        }
        &::before {
            background-color: rgb(7, 34, 57);
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 110%;
            top: 5px;
            z-index: -1;
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            -o-border-radius: 6px;
            border-radius: 6px;
            -webkit-box-shadow: 0px 1px 0px #fff;
            -moz-box-shadow: 0px 1px 0px #fff;
            -o-box-shadow: 0px 1px 0px #fff;
            box-shadow: 0px 1px 0px #fff;
        }
        &:active::before {
            top: -2px;
        }
    }
    .button_3{
        background-color: rgb(59, 179, 224);
        text-decoration: none;
        color: rgb(255, 255, 255);
        position: relative;
        padding: 10px 20px;
        border-left: solid 1px rgb(42, 183, 236);
        margin-left: 35px;
        text-align: center;
        background-image: linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -o-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -moz-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -webkit-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -ms-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(44,160,202)), color-stop(1, rgb(62,184,229)) );
        -webkit-border-top-right-radius: 5px;
        -webkit-border-bottom-right-radius: 5px;
        -moz-border-radius-topright: 5px;
        -moz-border-radius-bottomright: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        -webkit-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785, 0px 10px 5px #999;
        -moz-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785, 0px 10px 5px #999;
        -o-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785, 0px 10px 5px #999;
        box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785, 0px 10px 5px #999;
        cursor: pointer;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        &:active {
            top: 3px;
            background-image: linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
            background-image: -o-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
            background-image: -moz-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
            background-image: -webkit-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
            background-image: -ms-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
            background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(62,184,229)), color-stop(1, rgb(44,160,202)) );
            -webkit-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #156785, 0px 5px 3px #999;
            -moz-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #156785, 0px 5px 3px #999;
            -o-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #156785, 0px 5px 3px #999;
            box-shadow: inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #156785, 0px 5px 3px #999;
        }
        .content {
            background-color: rgb(37, 97, 180);
            content: "1";
            width: 35px;
            height: 100%;
            position: absolute;
            display: block;
            padding-top: 8px;
            top: 0px;
            left: -36px;
            font-size: 16px;
            font-weight: bold;
            color: rgb(143, 209, 234);
            text-shadow: 1px 1px 0px #07526e;
            border-right: solid 1px rgb(7, 82, 110);
            background-image: linear-gradient(bottom, rgb(10,94,125) 0%, rgb(14,139,184) 100%);
            background-image: -o-linear-gradient(bottom, rgb(10,94,125) 0%, rgb(14,139,184) 100%);
            background-image: -moz-linear-gradient(bottom, rgb(10,94,125) 0%, rgb(14,139,184) 100%);
            background-image: -webkit-linear-gradient(bottom, rgb(10,94,125) 0%, rgb(14,139,184) 100%);
            background-image: -ms-linear-gradient(bottom, rgb(10,94,125) 0%, rgb(14,139,184) 100%);
            background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(10,94,125)), color-stop(1, rgb(14,139,184)) );
            -webkit-border-top-left-radius: 5px;
            -webkit-border-bottom-left-radius: 5px;
            -moz-border-radius-topleft: 5px;
            -moz-border-radius-bottomleft: 5px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            -webkit-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #032b3a, 0px 10px 5px #999;
            -moz-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #032b3a, 0px 10px 5px #999;
            -o-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #032b3a, 0px 10px 5px #999;
            box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #032b3a, 0px 10px 5px #999;
        }
        &:active .content {
            top: -3px;
            -webkit-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #032b3a, 1px 1px 0px 0px #044a64, 2px 2px 0px 0px #044a64, 2px 5px 0px 0px #044a64, 6px 4px 2px #0b698b, 0px 10px 5px #999;
            -moz-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #032b3a, 1px 1px 0px 0px #044a64, 2px 2px 0px 0px #044a64, 2px 5px 0px 0px #044a64, 6px 4px 2px #0b698b, 0px 10px 5px #999;
            -o-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #032b3a, 1px 1px 0px 0px #044a64, 2px 2px 0px 0px #044a64, 2px 5px 0px 0px #044a64, 6px 4px 2px #0b698b, 0px 10px 5px #999;
            box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #032b3a, 1px 1px 0px 0px #044a64, 2px 2px 0px 0px #044a64, 2px 5px 0px 0px #044a64, 6px 4px 2px #0b698b, 0px 10px 5px #999;
        }
    }
    .button_4{
        background-color: rgb(59, 179, 224);
        text-decoration: none;
        color: rgb(255, 255, 255);
        position: relative;
        padding: 10px 20px;
        padding-right: 50px;
        background-image: linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -o-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -moz-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -webkit-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -ms-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
        background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(44,160,202)), color-stop(1, rgb(62,184,229)) );
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px;
        -webkit-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785, 0px 10px 5px #999;
        -moz-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785, 0px 10px 5px #999;
        -o-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785, 0px 10px 5px #999;
        box-shadow: inset 0px 1px 0px #2ab7ec, 0px 5px 0px 0px #156785, 0px 10px 5px #999;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        cursor: pointer;
        &:active {
            top: 3px;
            background-image: linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
            background-image: -o-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
            background-image: -moz-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
            background-image: -webkit-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
            background-image: -ms-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
            background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(62,184,229)), color-stop(1, rgb(44,160,202)) );
            -webkit-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #156785, 0px 5px 3px #999;
            -moz-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #156785, 0px 5px 3px #999;
            -o-box-shadow: inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #156785, 0px 5px 3px #999;
            box-shadow: inset 0px 1px 0px #2ab7ec, 0px 2px 0px 0px #156785, 0px 5px 3px #999;
        }
        &::before {
            background-color: rgb(37, 145, 180);
            background-image: url(./img/right_arrow.png);
            background-repeat: no-repeat;
            background-position: center center;
            content: "";
            width: 20px;
            height: 20px;
            position: absolute;
            right: 15px;
            top: 50%;
            margin-top: -9px;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            -o-border-radius: 50%;
            border-radius: 50%;
            -webkit-box-shadow: inset 0px 1px 0px #052756, 0px 1px 0px #60c9f0;
            -moz-box-shadow: inset 0px 1px 0px #052756, 0px 1px 0px #60c9f0;
            -o-box-shadow: inset 0px 1px 0px #052756, 0px 1px 0px #60c9f0;
            box-shadow: inset 0px 1px 0px #052756, 0px 1px 0px #60c9f0;
        }
        &:active::before {
            top: 50%;
            margin-top: -12px;
            -webkit-box-shadow: inset 0px 1px 0px #60c9f0, 0px 3px 0px #0e3871, 0px 6px 3px #1a80a6;
            -moz-box-shadow: inset 0px 1px 0px #60c9f0, 0px 3px 0px #0e3871, 0px 6px 3px #1a80a6;
            -o-box-shadow: inset 0px 1px 0px #60c9f0, 0px 3px 0px #0e3871, 0px 6px 3px #1a80a6;
            box-shadow: inset 0px 1px 0px #60c9f0, 0px 3px 0px #0e3871, 0px 6px 3px #1a80a6;
        }
    }
}

</style>
