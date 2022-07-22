<template>
  <div>
    <div class="card-hearder">
      <span class="searchHeader">搜索用户数</span>
      <svg
        t="1650597924866"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3224"
        width="17"
        height="17"
      >
        <path
          d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"
          p-id="3225"
          fill="#cdcdcd"
        ></path>
        <path
          d="M512 746.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
          p-id="3226"
          fill="#cdcdcd"
        ></path>
        <path
          d="M512 245.333333c-76.8 0-138.666667 61.866667-138.666667 138.666667 0 17.066667 14.933333 32 32 32s32-14.933333 32-32c0-40.533333 34.133333-74.666667 74.666667-74.666667s74.666667 34.133333 74.666667 74.666667c0 27.733333-53.333333 76.8-91.733334 100.266667-8.533333 6.4-14.933333 17.066667-14.933333 27.733333v106.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-89.6c34.133333-25.6 106.666667-83.2 106.666667-145.066667 0-76.8-61.866667-138.666667-138.666667-138.666667z"
          p-id="3227"
          fill="#cdcdcd"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">114514</span>
      <span class="main-counter">1919810</span>
      <svg
        t="1650600796897"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2811"
        width="17"
        height="17"
      >
        <path
          d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z"
          p-id="2812"
          fill="#1afa29"
        ></path>
      </svg>
      <svg
        t="1650601032103"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4485"
        width="17"
        height="17"
      >
        <path
          d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z"
          p-id="4486"
          fill="#d81e06"
        ></path>
      </svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);

    //配置数据
    lineCharts.setOption({
      xAxis: {
        //隐藏轴线
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      //系列
      series: [
        {
          type: "line",
          data: [ 9, 77, 12, 23, 4,10, 57, 33, 12, 88,],
          //拐点的样式设置
          itemStyle: {
            opacity: 0,
          },
          //线条的样式
          lineStyle: {
            color: "purple",
          },
          //填充颜色的设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue", //0%处的颜色
                },
                {
                  offset: 1,
                  color: "white", //100%处的颜色
                },
              ],
              global: false, //缺省为false
            },
          },
          smooth: true,
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

<style scoped>
.card-hearder {
  display: flex;
  align-items: center;
  color: rgb(169, 178, 185);
}
.searchHeader {
  margin-right: 20px;
}
.main-title {
  margin-right: 30px;
}
.main-content {
  margin-right: 10px;
}
.main {
  margin: 10px 0;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>