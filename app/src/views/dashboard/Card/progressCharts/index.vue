<template>
  <!-- 容器 -->
  <div ref="charts" class="charts" width="280px" height="50px"></div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
export default {
  mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);

    //配置数据
    lineCharts.setOption({
      xAxis: {
        show: false,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      //系列
      series: [
        {
          type: "bar",
          data: [86],
          color: "blue",
          //柱状图的宽度
          barWidth:10,
          //背景颜色设置
          showBackground:true,

          backgroundStyle:{
              color:'#eee'
          },
          //文本
          label:{
              show:true,
              formatter:'|',
              position:'right',
          }
        },
      ],
      //布局测试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>