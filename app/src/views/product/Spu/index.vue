<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 三级联动已经是全局组件了 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="scene != 0" />
    </el-card>
    <!-- 底部将来有三部分进行切换 -->
    <el-card>
      <!-- 展示SPU列表的结构 -->
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <!-- 这里将来用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--@current-change="handleCurrentChange"    
                @size-change="handleSizeChange" -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 添加SPU|修改SPU -->
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <!-- 添加SKU -->
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>
    </el-card>
    <el-dialog
      :title="`${skuLists.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-closr="close"
    >
      <!-- table展示sku列表 -->
      <el-table :data="skuLists" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="默认图片" width="width">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" alt="">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
//引入子组件
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      //分别是分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //控制三级联动的可操作性
      //isShowTable: true,
      page: 1, //分页器当前第几页
      limit: 3, //每页展示的数据
      records: [], //spu列表数据
      total: 0, //分页器一共需要展示数据的条数
      scene: 0, //0表示展示SPU列表数据  1添加SPU|修改SPU  2 修改SKU
      dialogTableVisible: false, //控制对话框的显示与隐藏
      skuList: {}, //sku列表的索引
      skuLists: [], //sku列表的数据
      loading:true,
    };
  },
  methods: {
    //三级联动的自定义事件，可以把子组件的相应的id传递给父组件
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        //清除2,3级分类残留数据
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        //清除3级分类残留数据
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //发请求获取SPU列表数据进行展示
        this.getSpuList();
      }
    },
    //获取SPU列表数据的方法
    async getSpuList(pages = 1) {
      //点击分页器的第几页的回调
      this.page = pages;
      const { page, limit, category3Id } = this;
      //携带三个参数；page 第几页 limit 每一页需要展示多少条数据  三级分类Id
      const result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //当分页器的某一个展示数据条数发生变化的回调
    handleSizeChange(limit) {
      //修改参数，再次发请求
      this.limit = limit;
      this.getSpuList();
    },
    //添加SPU按钮的回调
    addSpu() {
      //切换场景为1
      this.scene = 1;
      //通知子组件SpuForm发请求 --- 两次
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //修改某一个SPU
    updateSpu(row) {
      this.scene = 1;
      //获取子组件SpuForm
      this.$refs.spu.initSpuData(row);
    },
    //接受子组件改变scene显示
    changeScene({ scene, flag }) {
      //修改scene
      this.scene = scene;
      //子组件通知父组件切换场景，需要再次获取spu的数据进行展示
      //flag是为了区分保存和修改
      if (flag == "update") {
        //修改则跳转当前页
        this.getSpuList(this.page);
      } else {
        //更新返回第一页
        this.getSpuList();
      }
    },
    //删除spu按钮的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除spu成功" });
        //删除个数大于1，停留当前，小于1，回到上页
        this.getSpuList(this.records > 1 ? this.page : this.page - 1);
      }
    },
    //添加Sku按钮的回调
    addSku(row) {
      //切换场景为2
      this.scene = 2;
      //父组件调用子组件的方法，让子组件发请求-----三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    //skuForm通知父组件修改场景
    changeScenes(scene) {
      this.scene = scene;
    },
    //查看sku按钮的回调
    async handler(skuList) {
      //将对话框可见
      this.dialogTableVisible = true;
      //存储skuList
      this.skuList = skuList;
      //获取sku列表的数据进行展示
      let result = await this.$API.spu.reqSkuList(skuList.id);
      if (result.code == 200) {
        this.skuLists = result.data;
        this.loading = false
      }
      
    },
    //关闭对话框的回调
    close(){
      //loading属性再次为真
      this.loading = true
      //清除skulist的数据
      this.skuLists = []
    }
  },
  components: { SpuForm, SkuForm },
};
</script>

<style>
</style>