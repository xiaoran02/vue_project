<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格；展示平台属性 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="index"
                style="margin: 0 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              style="width: 250px"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button type="danger" @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里的结构需要span 和 input 相互切换 -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                v-show="row.flag"
                @blur="toLook(row)"
                :ref="$index"
                @keyup.native.enter="toLook(row)"
              ></el-input>
              <span
                v-show="!row.flag"
                @click="toEdit(row, $index)"
                style="padding: 10px 70px 10px 0px; display: block"
                >{{ row.valueName || "请输入属性值名称" }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 气泡确认框 -->
              <el-popconfirm
                :title="`确定删除${row.valueName}}?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addorUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button type="danger" @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",

      //接受平台属性的字段
      attrList: [],
      //这个属性控制表格的显示与隐藏
      isShowTable: true,
      //收集新增属性|修改属性使用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，因为属性值可以有多个因此用数组，
          //每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分是几级id
      },
    };
  },
  methods: {
    //自定义事件的回调
    getCategoryId({ categoryId, level }) {
      //区分三级分类的相应的id，以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //发请求获取品牌属性
        this.getAttrList();
      }
    },
    //获取平台属性的数据
    //当用户确定三级分类的数据时候，可以向服务器发请求获取平台属性进行展示
    async getAttrList() {
      //获取分类Id
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      } else {
      }
    },
    //添加属性值回调
    addAttrValue() {
      //向属性值的数组里面添加元素
      //attrId：是相应属性的id，目前而言我们是添加属性的操作，
      //还没有相应的属性的id，目前而言带个服务器的id为undifined
      //valueName:相应的属性值的名称
      this.attrInfo.attrValueList.push({
        //对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值
        //（新增属性值得时候，需要把已有的属性值id带上）
        attrId: this.attrInfo.id,
        valueName: "",
        //显示与隐藏属性编写框 的标记
        flag: true,
      });
      //使最后一个新增的input被聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性按钮的回调
    addAttr() {
      //切换table的显示与隐藏
      this.isShowTable = false;
      //清除数据
      //收集三级分类的id
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值，因为属性值可以有多个因此用数组，
          //每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: this.category3Id, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分是几级id
      };
    },
    //修改某一个属性
    updateAttr(row) {
      //isShowTable 变为false
      this.isShowTable = false;
      //将选中的属性值赋值给Attr
      //由于数据结构当中存在嵌套现象，需要用深拷贝来赋予数据
      this.attrInfo = cloneDeep(row);
      //在修改某一个属性的时候，将相应的属性值元素添加上flag这个标记
      this.attrInfo.attrValueList.forEach((item) => {
        //这样书写也可以给属性值添加flag自动，但是flag并非vue托管，不会随视图跟着变化
        //因为Vue无法探测普通的新增property，这样书写的属性并非响应式属性（数据变化视图跟这边）
        //第一个参数：对象，第二个参数：添加新的响应式属性 第三参数：新的属性的属性值
        this.$set(item, "flag", false);
      });
    },
    //失却焦点的事件---切换为查看模式，展示span
    toLook(row) {
      //row: 形参是当前用户添加的最新的属性值

      //如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      if (row.valueName.trim() == "") {
        this.$message("请输入有效属性值");
        return;
      }
      //新增的属性值不能与已有的属性值重复
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        //需要将row从数组里面判断的时候去除
        //row是最新的新增属性值 【数组的最后一项元素】
        if (row != item) {
          return row.valueName.trim() == item.valueName;
        }
      });
      if (isRepeat) {
        this.$message("请勿输入重复属性值");
        return;
      }
      //当前编辑模式变为查看模式【让input消失，显示span】
      row.flag = false;
    },
    //点击span的回调变为编辑模式
    toEdit(row, index) {
      //变为input显示
      row.flag = true;
      //获取input节点，实现自动聚焦
      //需要注意：点击span的时候，切换为input变为编辑模式，但是页面重绘和新增需要时间
      //点击span的时候需要延时 所以使用 $nextTick():当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        //获取对应的input表单元素实现聚焦
        //注意index是变量，所以获取属性要用数组形式
        this.$refs[index].focus();
      });
    },
    //气泡确认框确定按钮的回调
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    //保存按钮，进行添加属性或者修改属性的操作
    async addorUpdateAttr() {
      //整理参数：1.如果用户添加很多属性值，且属性值为空的不应该提交给服务器
      //提交给服务器数据当中不应该出现flag字段
      this.attrInfo.attrValueList.filter((item) => {
        //过滤掉属性值不是空的
        if (item.valueName != "") {
          //删除掉flag属性
          delete item.flag;
          return true;
        }
      });
      //发请求
      let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
      if (result.code == 200) {
        //展示列表
        this.isShowTable = true;
        this.$message({ type: "success", message: "保存成功" });
        //保存成功以后再次获取平台属性进行展示
        this.getAttrList();
      } else {
        this.$message("保存失败");
      }
    },
    //删除一个品牌
    deleteAttr(row) {
      //由于数据结构当中存在嵌套现象，需要用深拷贝来赋予数据
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        //这样书写也可以给属性值添加flag自动，但是flag并非vue托管，不会随视图跟着变化
        //因为Vue无法探测普通的新增property，这样书写的属性并非响应式属性（数据变化视图跟这边）
        //第一个参数：对象，第二个参数：添加新的响应式属性 第三参数：新的属性的属性值
        if (this.attrInfo.attrValueList.categoryId == item.categoryId) {
          item = {
            attrName: "", //属性名
            attrValueList: [
              //属性值，因为属性值可以有多个因此用数组，
              //每一个属性值都是一个对象需要attrId，valueName
            ],
            categoryId: 0, //三级分类的id
            categoryLevel: 3, //因为服务器也需要区分是几级id
          };
        }
      });
      //更新页面
      this.getAttrList();
    },
  },
};
</script>

<style>
</style>