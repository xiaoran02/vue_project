<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="SPU描述"
          rows="4"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 上传图片：action 图片上传的地址 
        list-type 文件列表的类型 
        on-preview ：图片预览的时候触发
        on-remove : 删除图片的时候触发
        file-list : -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="
            unSelectSaleAttr.length > 0
              ? `还有${unSelectSaleAttr.length}项未选择`
              : '没有啦！！！'
          "
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="unselect in unSelectSaleAttr"
            :key="unselect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 10px"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <!-- 展示的是当前SPU属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="cneter"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row }">
              <!-- @close="handleClose(tag)" -->
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                style="margin-right: 10px"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
                style="width: 100px"
              >
              </el-input>
              <!-- @click="showInput" -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >+ add</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="label">
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //spu初始化的时候是一个默认对象，
      spu: {
        //三级分类的id
        category3Id: 0,
        //描述
        description: "string",
        //收集spu图片的信息
        spuImageList: [
          {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          },
        ],
        //spu名称
        spuName: "string",
        //平台的id
        tmId: 0,
        //平台属性与属性值收集
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "string",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "string",
                saleAttrName: "string",
                saleAttrValueName: "string",
                spuId: 0,
              },
            ],
          },
        ],
      }, //存储SPU信息属性
      tradeMarkList: [], //存储品牌信息
      spuImageList: [], //存储SPU图片的数据
      saleAttrList: [], //销售属性的数据
      attrIdAndAttrName: "", //未选择的销售属性id
    };
  },
  methods: {
    //删除图片
    handleRemove(file, fileList) {
      //file : 代表的是删除的那张照片
      //fileList：照片墙删除某一张图片以后，剩余的其他图片
      //收集照片墙图片的数据
      //对于已有的图片，照片墙显示数据务必要有name，url两个属性
      //但对于服务器而言，不需要name，url字段
      this.spuImageList = fileList;
    },
    //预览图片墙中的图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //初始化Spu数据
    async initSpuData(spu) {
      //获取SPU信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        //在修改spu的时候，需要向服务器发请求的，把服务器返回的数据（对象），赋值给spu属性
        this.spu = spuResult.data;
      }
      //获取品牌信息
      let tradeMarkList = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkList.code == 200) {
        this.tradeMarkList = tradeMarkList.data;
      }
      //获取SPU图片的数据
      let spuImageList = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageList.code == 200) {
        let listArr = spuImageList.data;
        //由于照片墙显示图片的数据需要数组，数组里面的元素需要name和url字段
        //需要把服务器返回的数据进行修改
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        //把整理好的数据赋值
        this.spuImageList = listArr;
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //照片墙上传成功的回调
    handlerSuccess(response, file, fileList) {
      //收集图片信息
      this.spuImageList = fileList;
    },
    //添加新的销售属性
    addSaleAttr() {
      //已经收集需要添加的销售属性的信息
      //把收集到的销售属性数据进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      //向spu对象的spuSaleAttrList属性里面添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      //添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr);
      //数据展示清空
      this.attrIdAndAttrName = "";
      //this.initSpuData(this.spu)
    },
    //添加按钮的回调
    addSaleAttrValue(row) {
      //点击销售属性值当中添加按钮的时候，需要又button变为input
      //通过当前属性的inputVisible
      this.$set(row, "inputVisible", true);
      //通过响应式数据inputValue字段收集新增的销售属性值
      this.$set(row, "inputValue", "");
    },
    //el-input失去焦点的事件
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      //新增属性值名称不能为空
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      //属性值不能重复
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!result) {
        this.$message("属性值不能重复");
        return;
      }
      //新增的销售属性值
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };

      //新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      //修改字段为false
      row.inputVisible = false;
    },
    //保存按钮的回调
    async addOrUpdateSpu() {
      //整理参数：需要整理照片墙的数据
      //携带参数：对于图片,需要携带imageName 和 imageUrl字段
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      //发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      if (result.code == 200) {
        //提示
        this.$message({ type: "success", message: "保存spu成功" });
        //通知父组件回到原来场景
        this.$emit("changeScene", {scene:0,flag:this.spu.id?'update':'add'});
      }
      //清除数据
      Object.assign(this._data,this.$options.data())
    },
    //点击添加SPu按钮的时候，发请求的函数
    async addSpuData(catagory3Id) {
      //添加SPU的时候收集三级分类的id
      this.spu.catagory3Id = catagory3Id
      //获取品牌信息
      let tradeMarkList = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkList.code == 200) {
        this.tradeMarkList = tradeMarkList.data;
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //取消按钮的回调
    cancel(){
      //切换场景
      this.$emit('changeScene', {scene:0,flag:''})
      //清除数据
      //Object.assign :es6中新增的方法可以合并对象
      //组件实例 this._data :可以操作data当中的响应式数据
      //this.$option 可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
      Object.assign(this._data,this.$options.data())
    }
  },
  computed: {
    //计算出还未选择的销售属性
    unSelectSaleAttr() {
      //整个平台的销售属性一共三个；尺寸，颜色，版本  ----saleAttrList
      //当前SPU拥有的属于自己的销售属性SPU，spuSaleAttrList ---- 颜色
      //数组的过滤方法，可以从已有的数组当中过滤出用户需要的元素，并返回一个新的数据
      return this.saleAttrList.filter((item) => {
        //every 数组的的方法：会返回一个布尔值
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
    },
  },
};
</script>

<style>
</style>