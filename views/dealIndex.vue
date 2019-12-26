<!--  -->
<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">事件单列表</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="el_body" @update="loadData">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="70"> </el-table-column>
        <el-table-column prop="INC_NUMBER" label="事件号" width="200">
        </el-table-column>
        <el-table-column
          prop="INC_SUMMARY"
          label="事件标题"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="INC_GROUP"
          label="事件单当前岗位"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="INC_STATUS_SCOPE"
          label="事件单当前状态"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="INC_PRIORITY" label="级别" width="70">
        </el-table-column>
        <el-table-column
          prop="INC_HAPPEN_TIME"
          label="事件发生时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="INC_CLOSETIME"
          label="事件关闭时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <!-- <el-button
              type="primary"
              @click="showData(scope.row.INC_NUMBER)"
              style=""
              size="small"
              >查看</el-button
            > -->
            <el-button type="primary" @click="sigleDeal(scope.row.INC_NUMBER)"
              >一线处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>

      <div class="multiDeal_btn">
        <el-button type="warning" @click="jump()">批量一线处理</el-button>
      </div>
      <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div> -->

      <!-- Table -->

      <!-- <el-dialog title="详情页面" :visible.sync="dialogTableVisible">
        <el-table :data="gridData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="事件单号：">
                  <span>{{ props.row.INC_NUMBER }}</span>
                </el-form-item>
                <el-form-item label="事件发生时间：">
                  <span>{{ props.row.INC_HAPPEN_TIME }}</span>
                </el-form-item>
                <el-form-item label="紧急程度：">
                  <span>{{ props.row.LEVEL }}</span>
                </el-form-item>
                <el-form-item label="是否补单：">
                  <span>{{ props.row.BUDAN }}</span>
                </el-form-item>
                <el-form-item label="事件标题：">
                  <span>{{ props.row.INC_SUMMARY }}</span>
                </el-form-item>
                <el-form-item label="事件类别：">
                  <span>{{ props.row.CATEGORY }}</span>
                </el-form-item>
                <el-form-item label="事件报告人：">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
                <el-form-item label="事件记录人所在部门：">
                  <span>{{ props.row.INC_GROUP }}</span>
                </el-form-item>
                <el-form-item label="是否有附件：">
                  <span>{{ props.row.POSTSCRIPT }}</span>
                </el-form-item>
                <el-form-item label="是否子事件单：">
                  <span>{{ props.row.SUBEVENT }}</span>
                </el-form-item>
                <el-form-item label="母事件单状态：">
                  <span>{{ props.row.MAIN }}</span>
                </el-form-item>
                <el-form-item label="是否涉及人行票交所托管系统：">
                  <span>{{ props.row.RENHANG }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="" prop="nav_title1"> </el-table-column>
        </el-table>

        <el-table :data="statusData" style="width: 100%">
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
          <el-table-column label="">{{ nav_title2 }}</el-table-column>
        </el-table>

        <el-table :data="substractData" style="width: 100%">
          <el-table-column type="expand">
            <template>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="涉及的应用层 应用组 应用名称：">
                  <span>{{ belonging_group }}</span>
                </el-form-item>
                <el-form-item label="事件类型：">
                  <span>{{ style }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="">{{ nav_title3 }}</el-table-column>
        </el-table>
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // gridData: [],
      tableData: [],
      // dialogTableVisible: false,
      // dialogFormVisible: false,
      // statusData: [
      //   {
      //     jigou: "数据中心",
      //     status: "时间当前状态",
      //     chuligang: "网络一部一线岗",
      //     chuliren: "hjh"
      //   }
      // ],
      // substractData: [
      //   {
      //     belonging_group: "基础设施类-开放平台集中监控",
      //     style: "网络类"
      //   }
      // ],
      // nav_title3: "摘要信息",
      // nav_title2: "事件处理状态",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      multipleSelection: []
    };
  },
  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      //to request
      this.tableData = [
        {
          INC_NUMBER: "IDCCS190820003",
          INC_SUMMARY: "事件单测试_20190820",
          INC_GROUP: "1215||软件开发中心-受理岗",
          INC_STATUS_SCOPE: "SD_DSL||待受理岗分派",
          INC_PRIORITY: "6",
          INC_HAPPEN_TIME: "2019-08-20 14:04:00",
          INC_CLOSETIME: "2019-08-20 15:04:00"
        },
        {
          INC_NUMBER: "IDCCS190820003",
          INC_SUMMARY: "事件单测试_20190820",
          INC_GROUP: "1215||软件开发中心-受理岗",
          INC_STATUS_SCOPE: "SD_DSL||待受理岗分派",
          INC_PRIORITY: "6",
          INC_HAPPEN_TIME: "2019-08-20 14:04:00",
          INC_CLOSETIME: "2019-08-20 15:04:00"
        }
      ];
    },
    showData(val) {
      this.dialogTableVisible = true;
      //todo 发请求给后台取数据
      this.$http
        .get("/api/event")
        .then(function(res) {
          console.log(res.data.data);
          let list = res.data.data;
          // this.tableData = list
          let info = list[0].BUDAN;
          console.log(info);
        })
        .catch(res => {
          this.$message.error("数据获取失败");
        });
      // this.gridData=[

      // ]
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row) {
      this.$router.push("/single-detail");
    },
    jump() {
      this.$router.push("/deal-online");
    },
    sigleDeal(val) {
      this.$router.push("/deal-online");
    }
  }
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
// .index_wrap {
//   height: 400px;
//   width: 400px;
//   background-color: aquamarine;
// }
.el-breadcrumb {
  font-size: 21px;
  line-height: 3;
  margin: -27px 0 14px 26px;
}
.el_body {
  width: 1690px;
  display: flex;
  min-width: 1690px;
  border-radius: 6px;
  background-color: #fff;
  box-sizing: border-box;
  height: 1290px;
  border: 6px solid #bfc5c2;
  border-top: none;
  margin: 0 auto;
  /deep/.el-table th > .cell {
    font-weight: 700;
    font-size: 18px;
  }
}
/deep/.el-checkbox__inner::after {
  height: 11px;
  left: 9px;
}

/deep/.el-checkbox__inner {
  width: 23px;
  height: 23px;
}

.multiDeal_btn {
  position: absolute;
  top: 97px;
  right: 68px;
  z-index: 4;
}
// .el-breadcrumb__item {
//   float: left;
//   margin-top: 25px;
//   position: relative;
//   left: 41px;
//   margin-bottom: 20px;
// }
// .el-breadcrumb__inner a,
// .el-breadcrumb__inner.is-link {
//   font-size: 21px;
// }
/deep/.el-table--enable-row-transition .el-table__body td {
  background-color: #c8c8d2;
}
/deep/.el-table th {
  white-space: nowrap;
  overflow: hidden;
  background-color: #eee;
}
// .demo-table-expand {
//   font-size: 0;
// }

// .demo-table-expand label {
//   width: 90px;
//   color: #c8c8d2;
// }
// .demo-table-expand .el-form-item {
//   margin-right: 0;
//   margin-bottom: 0;
//   width: 50%;
// }
.block {
  width: 450px;
  height: 40px;
  position: absolute;
  top: 99px;
  right: 201px;
  /deep/.el-date-editor .el-range-separator {
  width: 15%;

  }
}

</style>