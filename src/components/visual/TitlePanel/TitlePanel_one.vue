<template>
  <div class="TitlePanel_one">
    <div
      class="box_1"
      v-for="(item, index) in configRule.data"
      :key="index"
      :style="{width:itemWidth,background:configRule.bgColor}"
    >
      <div
        class="title"
        :style="{color:configRule.titleColor,fontSize:configRule.titleFontSize}"
      >{{item.title}}</div>
      <div
        class="num"
        :style="{color:configRule.numColor,fontSize:configRule.numFontSize}"
      >{{item.num}}</div>
    </div>
  </div>
</template>

<script>
import validateConfig from '../utils/validateConfig'
/*
 * @description 描述
 * @props config 配置项
 *    data { Array } 必填 需要展示的数据
 *    rows {Number} 必填  需要展示几行
 *    titleColor {String} 选填 标题颜色
 *    titleFontSize  {String} 选填 标题字体大小
 *    numColor {String} 选填 数字颜色
 *    numFontSize  {String} 选填 数字字体大小
 *    bgColor {String} 选填 背景颜色
 */
export default {
  name: "TitleAndNum",
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
        //  return Object.assgin({},{titleColor:"#008eff",data:[]})
        // return {}
      },
    },
  },
  computed: {
    configRule() {
      const rule = {
        data: {
          type: Array,
          required: true,
          //default: [],
        },
        rows: {
          type: Number,
          default: 1,
          required: true,
        },
        titleColor: {
          type: String,
          default: "#0279fc",
          required: false,
        },
        titleFontSize: {
          type: String,
          default: "12px",
          required: false,
        },
        numColor: {
          type: String,
          default: "#dae3f9",
          required: false,
        },
        numFontSize: {
          type: String,
          default: "30px",
          required: false,
        },
        bgColor: {
          type: String,
          default: "#09153d",
          required: false,
        },
      };
      return validateConfig(rule, this.config);
    },
  },
  data() {
    return {
      itemWidth: "",
    };
  },
  created() {
    //console.log(validateConfig)
    this.calcItemWidth();
  },
  mounted() {},
  methods: {
    calcItemWidth() {
      let itemMrgin = 0.1;
      let count = this.configRule.data.length / this.configRule.rows; //每一行有几个
      let width = (100 - count * itemMrgin * 2) / count + "%"; //每一个的宽度
      this.itemWidth = width;
    },
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.TitlePanel_one {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.box_1 {
  margin: 0.1%;
}
.title {
  margin-left: 10px;
  margin-top: 10px;
}
.num {
  text-align: center;
  margin-bottom: 5px;
}
</style>
