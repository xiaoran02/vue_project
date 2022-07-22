<template>
<!-- 容器 -->
<div ref="charts" class="charts" width="280px" height="50px"></div>
</template>

<script>
//引入echarts
import * as echarts from 'echarts'
export default {
    mounted() {
        //初始化echarts实例
        let lineCharts = echarts.init(this.$refs.charts)

        //配置数据
        lineCharts.setOption({
            xAxis:{
                show:false,
                type:'category'
            },
            yAxis:{
                show:false
            },
            //系列
            series:[
                {
                    type:'bar',
                    data:[37,12,23,14,20,17,33,12,28,39],
                    color:'lightblue'
                }
            ],
            //布局测试
            grid:{
                left:0,
                top:0,
                right:0,
                bottom:0
            }
        })
    },

}
</script>

<style>
.charts{
    width: 100%;
    height: 100%;
}
</style>