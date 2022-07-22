<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="search-header">
        <span>线上热门搜索</span>
        <div class="rightDropdown">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>刘华强</el-dropdown-item>
              <el-dropdown-item>章鱼哥</el-dropdown-item>
              <el-dropdown-item>野兽先辈</el-dropdown-item>
              <el-dropdown-item>我修院</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12"><lineCharts /></el-col>
        <el-col :span="12"><lineCharts /></el-col>
      </el-row>
      <!-- table 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="排名" width="180"> </el-table-column>
        <el-table-column label="搜索关键字" sortable width="180">
        </el-table-column>
        <el-table-column label="用户数" sortable> </el-table-column>
        <el-table-column label="周涨幅" sortable> </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        :page-size="20"
        :pager-count="5"
        layout="prev, pager, next"
        :total="1000"
        class="pagination"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import lineCharts from "./lineCharts";
export default {
  components: { lineCharts },
  data() {
    return {
      tableData: [{}],
    };
  },
};
</script>

<style scoped>
.search-hearder {
  display: flex;
  justify-content: space-between;
}
.rightDropdown {
  float: right;
}
.pagination{
    float: right;
}
</style>