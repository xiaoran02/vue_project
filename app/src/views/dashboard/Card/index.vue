<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 98e">
            <!-- 作用域插槽 -->
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;&nbsp;11.45%
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
              </span>
              &nbsp;&nbsp;&nbsp;
              <span
                >日同比&nbsp;&nbsp;&nbsp;5.14%<svg
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
                  ></path></svg
              ></span>
            </template>
            <template slot="footer">
              <span>日销售额 ￥9.8e</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="1919810">
            <template slot="charts">
              <lineCharts />
            </template>
            <template slot="footer">
              <span>日访问量 1145</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="114514">
            <template slot="charts">
              <barCharts />
            </template>
            <template slot="footer">
              <span>转换率 51.4%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="86%">
            <template slot="charts">
              <progressCharts />
            </template>
            <template slot="footer">
              <span>转换率 11.4%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineCharts from "./lineChart";
import barCharts from "./barCharts";
import progressCharts from "./progressCharts";
export default {
  components: { Detail, lineCharts, barCharts, progressCharts },
};
</script>

<style>
span {
  font-size: 14px;
}
</style>