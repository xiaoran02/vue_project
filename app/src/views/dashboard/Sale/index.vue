<template>
  <el-card class="box-card" style="margin-top: 10px 0">
    <div slot="header" class="clearfix">
      <!-- v-model="activeName" @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="search"></el-tab-pane>
      </el-tabs>

      <!-- 头部右侧内容 -->
      <div class="right">
        <div @click="setDay">今日</div>
        <div @click="setWeek">本周</div>
        <div @click="setMonth">本月</div>
        <div @click="setYear">本年</div>
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="-"
          start-placeholder="start Date"
          end-placeholder="end Date"
          class="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6" class="saleCount">
          <div>
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="saleNum">0</span>
                <span class="saleShop">KFC</span>
                <span class="saleCount">1919810</span>
              </li>
              <li>
                <span class="saleNum">1</span>
                <span class="saleShop">McDonald</span>
                <span class="saleCount">123456</span>
              </li>
              <li>
                <span class="saleNum">2</span>
                <span class="saleShop">Wallace</span>
                <span class="saleCount">114514</span>
              </li>
              <li>
                <span>3</span>
                <span class="saleShop">dicos</span>
                <span class="saleCount">111111</span>
              </li>
              <li>
                <span>4</span>
                <span class="saleShop">NewOrlean</span>
                <span class="saleCount">7777</span>
              </li>
              <li>
                <span>5</span>
                <span class="saleShop">Loin</span>
                <span class="saleCount">486</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
//引入dayjs
import dayjs from "dayjs";
//引入echarts
import * as echarts from "echarts";
export default {
  data() {
    return {
      activeName: "sale",
      saleChart: null,
      //收集日历的数据
      date: [],
      saleData:[110, 152, 200, 334, 390, 330, 220, 354, 223, 124, 156, 251],
      searchData:[890,598,456,784,567,489,547,489,567,589,671,286]
    };
  },
  mounted() {
    //初始化echarts实例
    this.saleChart = echarts.init(this.$refs.charts);
    //配置数据
    this.saleChart.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "Jau",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Sale",
          type: "bar",
          barWidth: "60%",
          data: [110, 152, 200, 334, 390, 330, 220, 354, 223, 124, 156, 251],
        },
      ],
    });
  },
  computed: {
    //计算属性-标题
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  //监听属性
  watch: {
    title() {
      //重新修改图标配置的数据
      //图标配置数据可以再次修改，若有新数值可以换新数值
      this.saleChart.setOption({
        title: {
          text: this.title + "趋势",
        },
        series:[
          {
            data: this.activeName == 'sale' ? this.saleData : this.searchData
          }
        ]
      });
    },
  },
  methods: {
    //本天
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    //本周
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //本月
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //本年
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  display: flex;
  justify-content: row;
  right: 0px;
}
.right div{
    line-height: 35px;
    padding: 0 10px;
}
.right div:hover:nth-child(-n+4){
    background-color: rgb(54, 207, 228);
    cursor: pointer;
}
.date {
  width: 330px;
  margin: 0 20px;
}
.right span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
.saleCount {
  padding: 0;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 14%;
  font-weight: 700;
  font-size: 16px;
}
.saleNum {
  width: 25px;
  height: 20px;
  border-radius: 50%;
  background-color: lightblue;
  color: white;
  text-align: center;
  float: left;
  line-height: 25px;
}
.saleShop {
  margin-left: 20px;
}
.saleCount {
  float: right;
}

 * >>>.el-card__header{
  border-bottom:none;
}
</style>