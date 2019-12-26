<!--  -->
<template>
  <div class="singDeatils">
    <el-page-header @back="goBack" content="详情页面"> </el-page-header>
    <div class="el_body">
      <div class="details_wrap">
       
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="事件单号：">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="事件发生时间：">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="紧急程度：">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="是否补单：">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="事件标题：">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="事件类别：">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="事件报告人：">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
                <el-form-item label="事件记录人所在部门：">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
                <el-form-item label="是否有附件：">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
                <el-form-item label="是否子事件单：">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
                  <el-form-item label="母事件单状态：">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
                <el-form-item label="是否涉及人行票交所托管系统：">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="" prop="nav_title1"> </el-table-column>
        </el-table>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="当前处理机构：">
                  <span>{{ jigou }}</span>
                </el-form-item>
                <el-form-item label="事件当前状态：">
                  <span>{{ status }}</span>
                </el-form-item>
                <el-form-item label="处理岗：">
                  <span>{{ chuligang }}</span>
                </el-form-item>
                <el-form-item label="当前处理人：">
                  <span>{{ chuliren }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="">{{nav_title2}}</el-table-column>
        </el-table>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="涉及的应用层 应用组 应用名称：">
                  <span>{{belonging_group}}</span>
                </el-form-item>
                <el-form-item label="事件类型：">
                  <span>{{style}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="">{{nav_title3}}</el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
import Vue from "vue";
Vue.component(CollapseTransition.name, CollapseTransition);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      tableData: [
        {
          nav_title1: "详细信息",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ],
      nav_title2: "事件处理状态",
      jigou: "数据中心",
      status: "时间当前状态",
      chuligang: "网络一部一线岗",
      chuliren: "hjh",
      nav_title3:"摘要信息",
      belonging_group:"基础设施类-开放平台集中监控",
      style:"网络类"

    };
  },
  computed: {},

  watch: {},

  methods: {
    goBack() {
      console.log("go back");
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
/deep/.el-page-header {
  margin-top: -10px;
  margin-bottom: 8px;
}
/deep/.el-page-header__title {
  font-size: 19px;
  font-weight: 600;
}
/deep/.el-page-header__left::after {
  background-color: black;
}
.el_body {
  border: 5px solid #9eaca6;
  border-radius: 3%;
  height: 1190px;
}

/deep/.el-table--enable-row-transition .el-table__body td {
  background-color: #c8c8d2;
}
/deep/.el-table th {
  white-space: nowrap;
  overflow: hidden;
  background-color: #eee;
}
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #c8c8d2;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>