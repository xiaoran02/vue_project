<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="12">
        <el-card>
          <div><Search /></div> </el-card
      ></el-col>
      <el-col :span="12">
        <el-card>
          <div><Category /></div> </el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import Search from "./Search";
import Category from "./Category";
export default {
  components: {
    Category,
    Search,
  },
};
</script>

<style>
</style>