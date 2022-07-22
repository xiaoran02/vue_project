<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" :data="records">
      <el-table-column type="idnex" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-down"
            v-if="row.isSale == 1"
            @click="sale(row)"
          ></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-up"
            v-else
            @click="cancel(row)"
          ></el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="develop"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页      
       -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getSkuList"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    >
    </el-pagination>

    <!-- 抽屉效果 :before-close="handleClose"-->
    <el-drawer :visible.sync="show" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="attr in skuInfo.skuAttrValueList"
            :key="attr.id"
            style="margin-left: 10px"
            >{{ attr.attrId }}{{ attr.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel autoplay>
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <el-image :src="item.imgUrl" fit="contain"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, //代表当前第几页
      limit: 5, //代表当前页面有几条数据
      records: [], //存储SKU列表的数据
      total: 0, //存储分页器一共展示的数据
      skuInfo: {}, //存储sku信息
      show: false, //抽屉的显示与隐藏
    };
  },
  //组件挂载完毕
  mounted() {
    //获取SKu列表的方法
    this.getSkuList();
  },
  methods: {
    //获取sku列表数据的方法
    async getSkuList(pages = 1) {
      this.page = pages;
      //结构出默认的参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //修改一页展示数据条数
    handleSizeChange(limit) {
      //修改参数
      this.limit = limit;
      this.getSkuList();
    },
    //上架
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "上架成功!" });
      }
    },
    //下架
    async cancel(row) {
      let result = await this.$API.sku.reqCancel(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "下架成功!" });
      }
    },
    //开发选项
    develop() {
      this.$message("正在开发中...");
    },
    //获取Sku详情的方法
    async getSkuInfo(sku) {
      //展示SKU数据
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
      //展示抽屉
      this.show = true;
    },
  },
};
</script>

<style>
.el-carousel__item el-image {
  margin: 0;
  width: 100%;
  height: 500px;
  display: flex;
}

.el-carousel__button {
  width: 10px;
  height: 10px;
  background: rgb(235, 82, 82);
  border-radius: 50%;
}
</style>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
  margin-right: 20px;
}
</style>