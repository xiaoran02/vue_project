<template>
  <el-card>
    <div slot="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value" size="mini">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="charts" ref="charts"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    //饼图
    let mycharts = echarts.init(this.$refs.charts);
    mycharts.setOption({
      title: {
        text: "",
        subtext: 0,
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "0%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "16",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "金坷垃" },
            { value: 735, name: "昏睡红茶" },
            { value: 580, name: "秘制金桔茶" },
            { value: 484, name: "徐伦拿铁" },
            { value: 300, name: "阿帕茶" },
          ],
        },
      ],
    });
    //绑定事件
    mycharts.on("mouseover", (params) => {
      //获取鼠标移上去的那条数据
      const {name,value} = params.data
      //重新设置标题
      mycharts.setOption({
          title:{
              text:name,
              subtext:value
          }
      })
    });
  },
};
</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.charts {
  width: 100%;
  height: 400px;
}
</style>