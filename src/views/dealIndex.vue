<!--  -->
<template>
  <div class="terminalIndex">
    <div class="breadcrumb">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>事件单列表</el-breadcrumb-item>
      </el-breadcrumb> -->
    </div>

    <div class="el_body" @update="loadData">
      <div class="content_area">
        <div class="nav_area">
          
          <!-- <div class="multi_btn">
            <el-button class="white_font" type="warning" size="medium" @click="multiDeal()"
              >批量一线处理</el-button
            >
            <el-button class="white_font" type="info" size="medium" @click="cancleSelect()"
              >取消选择</el-button
            >
          </div> -->
          <!-- <div class="datePicker">
            <el-date-picker
              v-model="datePicked"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              @change="onChange()"
              :clearable="false"
            >
            </el-date-picker>
          </div> -->
           <el-card shadow="always">
            <div class="oprations_btns">
      <el-tag effect="dark" @click="staffManage" class="staff_btn">管理人员</el-tag>
      <el-tag effect="dark" @click="terminalManage" class="terminal_btn">管理终端</el-tag>
      <el-tag effect="dark" @click="emergencyOnekey" class="emergency_btn">一键应急</el-tag>
       </div>
    </el-card>
        </div>

        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100%"
          @selection-change="handleSelectionChange"
            v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="INC_NUMBER" label="事件号"> </el-table-column>
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
            prop="INC_HAPPENTIME"
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
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <!-- <el-button
              type="primary"
              @click="showData(scope.row.INC_NUMBER)"
              style=""
              size="small"
              >查看</el-button
            > -->
              <el-button
                :disabled="multipleSelection.length != 0"
                class="white_font"
                type="primary"
                size="mini"
                @click="portManage(scope.row.INC_NUMBER)"
                >端口管理</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 这个是管理人员弹窗 -->
<el-dialog title="收货地址" :visible.sync="staffDialogVisible">
  <el-table :data="gridData">
    <el-table-column property="date" label="日期" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
  </el-table>
</el-dialog>

      <!-- 这个是一线处理的弹窗 -->
      <el-dialog title="" :visible.sync="DealDialogVisible" width="85%" center>
        <div class="el_body_dialog">
          <div class="incNumTitle">
            <span id="fontWeightUp">事件单号：</span>
             <span v-if="multipleSelection.length>0" id="fontWeightUp">共{{multipleSelection.length}}条</span>
             <span v-else id="fontWeightUp">共1条</span>
          </div>
           <el-card shadow="always">
      <div class="incNumshow">
            <div v-if="multipleSelection.length > 0">
              <el-button
                type="primary"
                plain
                size="medium"
                v-for="(item, index) in INC_NUMBER_LIST"
                :key="index"
                >{{ item }}</el-button
              >
            </div>
            <div v-else>
              <el-button type="primary" plain size="medium">
                {{ INC_NUMBER }}
              </el-button>
            </div>
          </div>
    </el-card>

          <div class="form">
            <el-form
              label-width="45%"
              :rules="rules"
              ref="form"
              style="margin:10px;width:auto;"
              :model="sizeForm"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="事件类别">
                    <el-input disabled v-model="eventKind"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="涉及层面">
                    <el-select v-model="sizeForm.LAYER_LIST">
                      <el-option
                        v-for="item in belongingGroup"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="事件二级类别">
                    <el-select v-model="sizeForm.INC_CATEGORY">
                      <el-option
                        v-for="item in secondaryCategory"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>

                    <!-- <el-input v-model="sizeForm.influence"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否影响业务">
                    <el-select v-model="sizeForm.IS_AFFECT_BUSINESS">
                      <el-option
                        v-for="item in influences"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="系统架构冗余或高可用方式解决">
                    <el-select
                      class="adjust"
                      v-model="sizeForm.ISHIGHAVAILABLE"
                    >
                      <el-option
                        v-for="item in highWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否涉及人行票交所托管系统">
                    <el-select v-model="sizeForm.ISPJS">
                      <el-option
                        v-for="item in ticketArea"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="解决途径">
                    <el-select v-model="sizeForm.RESOLVE_CHANNEL">
                      <el-option
                        v-for="item in solveByWhat"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="影响情况" prop="AFFECT_SITUATION">
                    <el-input
                      id="validateSuccess1"
                      type="textarea"
                      :rows="2"
                      resize="none"
                      placeholder="请输入影响情况"
                      v-model.trim="sizeForm.AFFECT_SITUATION"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="故障恢复时间" prop="RESTORE_TIME">
                    <div style="margin: 20px 0;"></div>
                    <div class="restoreTime">
                      <el-date-picker
                        v-model="sizeForm.RESTORE_TIME"
                        type="datetime"
                        format="yyyy 年 MM 月 dd 日 HH:mm"
                        value-format="yyyy-MM-dd HH:mm"
                        placeholder="选择故障恢复日期时间"
                      >
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="事件解决程度">
                    <el-select v-model="sizeForm.SOL_DEGREE">
                      <el-option
                        v-for="item in solveWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="添加处理内容" prop="DEAL_NOTE">
                    <div style="margin: 20px 0;"></div>
                    <el-input
                      id="validateSuccess2"
                      type="textarea"
                      :rows="8"
                      placeholder="请输入处理内容"
                      v-model.trim="sizeForm.DEAL_NOTE"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="问题原因" prop="INC_REASON">
                    <div style="margin: 20px 0;"></div>
                    <el-input
                      id="validateSuccess3"
                      type="textarea"
                      :rows="8"
                      placeholder="请输入问题产生原因"
                      v-model.trim="sizeForm.INC_REASON"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 这是处理和取消按钮 -->
              <div class="deal_btns">
                <el-button type="primary" size="medium" @click="onSubmit('this.sizeForm')"
                  >确认处理</el-button
                >
                <el-button type="info" size="medium" @click="cancle()">取消处理</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-dialog>
      <!-- 提醒哪些事件处理未成功对话框 -->
      <el-dialog
        title="以下事件单号处理失败："
        :visible.sync="failedDialogVisible"
        width="40%"
        center
      >
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>处理失败共：</span><span>{{result_list.length}}条</span>
  </div>
  <span
          class="failedIncsShow"
          v-for="(item, index) in result_list"
          :key="index"
          >{{ item }}</span
        >
</el-card>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="failedDialogVisible=false" class="failedDialogclose" plain size="mini">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { format1,format } from "../utils/utils.js";
import { black } from "color-name";
import { getCookie } from "../utils/getCookie.js";
import { getUserInfo } from "../utils/getUserInfo.js";
export default {
  data() {
     const start = new Date();
     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    const validateIncReason = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("事件原因不能为空"));
      } else {
        callback();
        document.getElementById("validateSuccess3").style.borderColor = "green";
      }
    };
    const validateDealContent = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("处理内容不能为空"));
      } else {
        callback();
        document.getElementById("validateSuccess2").style.borderColor = "green";
      }
    };
    const validateInfluence = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("事件影响不能为空"));
      } else {
        callback();
        document.getElementById("validateSuccess1").style.borderColor = "green";
      }
    };
    return {
       gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        staffDialogVisible: false,
      // 这是控制一线处理对话框显示与否
      DealDialogVisible: false,
      failedDialogVisible: false,
      tableData: [],
      result_list: [],
      datePicked: [start, new Date()],
      multipleSelection: [],
      sizeForm: {
        LAYER_LIST: "网络层面",
        INC_CATEGORY: "网络通信",
        IS_AFFECT_BUSINESS: "否",
        SOL_DEGREE: "完全解决",
        ISPJS: "否",
        RESOLVE_CHANNEL: "无需继续处理",
        ISHIGHAVAILABLE: "否",
        AFFECT_SITUATION: "",
        DEAL_NOTE: "",
        INC_REASON: "",
        RESTORE_TIME: format(new Date())
      },
      rules: {
        INC_REASON: [
          { required: true, validator: validateIncReason, trigger: "blur" }
        ],
        DEAL_NOTE: [
          { required: true, validator: validateDealContent, trigger: "blur" }
        ],
        AFFECT_SITUATION: [
          { required: true, validator: validateInfluence, trigger: "blur" }
        ]
      },
      influences: [
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        }
      ],
      // 怎么把生产故障事件传给后台，这一条后台是怎么存储的？
      eventKind: "生产故障事件",
      solveWay: [
        {
          value: "完全解决",
          label: "完全解决"
        },
        {
          value: "规避解决",
          label: "规避解决"
        }
      ],
      ticketArea: [
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        }
      ],
      highWay: [
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        }
      ],
      solveByWhat: [
        {
          value: "无需继续处理",
          label: "无需继续处理"
        },
        {
          value: "维护手册",
          label: "维护手册"
        }
      ],
      belongingGroup: [
        {
          value: "网络层面",
          label: "网络层面"
        },
        {
          value: "客户端设置",
          label: "客户端设置"
        },
        {
          value: "应用层面",
          label: "应用层面"
        },
        {
          value: "操作系统",
          label: "操作系统"
        },
        {
          value: "数据库",
          label: "数据库"
        },
        {
          value: "监控系统",
          label: "监控系统"
        },
        {
          value: "硬件层面",
          label: "硬件层面"
        }
      ],
      secondaryCategory: [
        {
          value: "业务应用",
          label: "业务应用"
        },
        {
          value: "机器设备 ",
          label: "机器设备"
        },
        {
          value: "机房设施",
          label: "机房设施"
        },
        {
          value: "系统环境",
          label: "系统环境"
        },
        {
          value: "网络通信",
          label: "网络通信"
        }
      ],
      INC_NUMBER_LIST: [],
      listIncNum: [],
      INC_NUMBER: "",
      username:'',
       loading: true
    };
  },
  mounted() {
    this.loadData();
  },

  methods: {
    // 管理人员事件
    staffManage(){
 this.staffDialogVisible = true;
    },
    terminalManage(){
 this.staffDialogVisible = true;
    },
    emergencyOnekey(){
 this.staffDialogVisible = true;
    },
    // 事件发生变化重新请求数据
    onChange() {
      this.loadData();
    },
  //   dateChangeformat(val){
  // var ctx = this;
  //       ctx.RESTORE_TIME = val;
  //       this.RESTORE_TIME=ctx.RESTORE_TIME;
  //   },
    // 获取数据
    loadData() {
      this.$http
        .get("getIncs", {
          params: {
            startTime: format1(this.datePicked[0]),
            endTime: format1(this.datePicked[1])
          }
        })
        .then(res => {
          this.loading=false;
          let list1 = res.data.data;
          this.tableData = list1;
        })
        .catch(res => {
          this.$message.error("数据获取失败");
           setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
          this.loading=false;                      // 关闭遮罩层
  },5000)
        });
    },

    // 批量一线处理
    multiDeal() {
getUserInfo().then(res=>{
        this.username = res.data.username;

if(this.username){
  if (this.multipleSelection.length <= 0) {
        this.DealDialogVisible = false;
        this.$message.warning("请至少选择一个事件进行答单！");
      } else {
        this.DealDialogVisible = true;
        this.INC_NUMBER_LIST = [];
        this.multipleSelection.forEach(item => {
          this.INC_NUMBER_LIST.push(item.INC_NUMBER);
        });
      }
}else{
  this.$message.warning("未登录请先登录")
}
})
    
    },
    /*多选框被触发
     多选框被选中时，单个一线处理按钮设置为不可用状态
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /*只有多选时才能触发批量处理按钮
     这是单条处理告警的对话框事件
    */
    portManage(INC_NUMBER) {
   getUserInfo().then(res=>{
        this.username = res.data.username;
      if (this.username) {
 this.INC_NUMBER_LIST = [];
      this.INC_NUMBER = INC_NUMBER;
      this.DealDialogVisible = true;
      }else {
        this.$message.warning('未登录请先登录')
        return
      }
   })
    },
    // 取消一线处理
    cancle() {
      this.DealDialogVisible = false;
      this.$refs.form.resetFields();
      document.getElementById("validateSuccess1").style.borderColor = "#DCDFE6";
      document.getElementById("validateSuccess2").style.borderColor = "#DCDFE6";
      document.getElementById("validateSuccess3").style.borderColor = "#DCDFE6";
    },
    // 关闭部分事件处理失败弹框
    closeFailedDialogclose(){

    },
    // 提交一线处理表单结果
    onSubmit(from) {
      if (this.INC_NUMBER_LIST.length > 0) {
        this.sizeForm.listIncNum = this.INC_NUMBER_LIST;
      } else {
        this.sizeForm.listIncNum = this.INC_NUMBER.split(",");
      }

      this.$refs.form.validate(async valid => {
        if (!valid) {
          this.$message.warning("校验未通过");
          return;
        }
        try {
          let {
            data: { status, result_list }
          } = await this.$http.post(
            "answerIncs",
            this.sizeForm
          );
          if (status != "success") {
            this.$message.error("一线处理失败！");
          } else {
            this.$emit("update");
            if (result_list.length > 0) {
              this.failedDialogVisible = true;
              this.result_list = result_list;
              this.$message.warning("一线处理部分事件成功！");
            } else {
              this.$message.success("一线处理成功！");
              
            }
          }
          this.DealDialogVisible = false;
          this.$refs.form.resetFields();
          document.getElementById("validateSuccess1").style.borderColor = "#DCDFE6";
      document.getElementById("validateSuccess2").style.borderColor = "#DCDFE6";
      document.getElementById("validateSuccess3").style.borderColor = "#DCDFE6";
          this.loadData();
        } catch (error) {
          console.log(error);
          this.$message.error("请求发送失败");
        }
      });
    },
    cancleSelect(rows){
 if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    }

  }
};
</script>

<style lang='less'>
//@import url(); 引入公共css类
.terminalIndex {
  .el-breadcrumb {
    font-size: 16px;
    line-height: 3;
    margin: -27px 0 14px 26px;
  }
  .el_body {
    width: 100%;
    border-radius: 6px;
    background-color: #fff;
    box-sizing: border-box;
    height: 100%;
    border: 6px solid #bfc5c2;
    border-top: none;
    margin: 0 auto;
    .content_area {
      width: 100%;
      height: 100%;
      clear: both;

      .nav_area {
        width: 100%;
        height: 71px;
        // .terminal_btn{
        //   background-color:#394a6d;
        //   border: 1px solid #394a6d;
        //   margin-left:40px;
        // }
        // .staff_btn{
        //   background-color:#504658;
        //   border: 1px solid #504658;
        //   margin-left:40px;
        // }
        // .emergency_btn{
        //   background-color:#1a2849;
        //   border: 1px solid #1a2849;
        //   margin-left:40px;
        // }
        .oprations_btns{
           width: 500px;
    margin-left: -80px;
        .staff_btn{
          background-color:rgb(238, 137, 61);
          border: 1px solid #FFA259;
          margin-left:40px;
        }
          .terminal_btn{
          background-color:#FE6845;
          border: 1px solid #FE6845;
          margin-left:40px;
        }
        .emergency_btn{
          background-color:rgb(194, 13, 28);
          border: 1px solid rgb(194, 13, 28);
          margin-left:40px;
        }
        }
        
        .datePicker {
          float: left;
          margin-left: 16px;
              margin-top: 13px;
        }
        .el-date-editor--daterange.el-input,
        .el-date-editor--daterange.el-input__inner,
        .el-date-editor--timerange.el-input,
        .el-date-editor--timerange.el-input__inner {
          width: 420px;
        }
        .multi_btn {
          float: right;
          margin-right: 61px;
              margin-top: 13px;
        }
      }
    }
    /deep/.white_font span {
      color: white;
      font-size: 12px;
      font-weight: 600;
    }
    .el-card__body {
       padding: 10px 10px 3px 10px;
}
  }
  .form {
    margin-top: 40px;
    .el-select {
      display: inline-block;
      position: relative;
      width: 82%;
    }
    .el-textarea {
      position: relative;
      display: inline-block;
      width: 83%;
      vertical-align: bottom;
      position: absolute;
      top: -4px;
      font-size: 14px;
    }
    .restoreTime {
      margin-top: -23px;
    }
    .el-col-12 {
      width: 50%;
      margin-bottom: 20px;
    }
    .el-input.is-disabled .el-input__inner {
      background-color: #e0e9f7;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
      font-size: 14px;
      width: 82%;
    }
    .el-form-item__error {
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding-top: 0px;
      position: absolute;
      top: 31px;
      left: 18px;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 225px;
}
    .deal_btns {
      text-align: center;
            margin-top: 153px;
    margin-left: 116px;
    }
  }
  .incNumTitle {
  font-size: 18px;
    height: 30px;
    position: absolute;
    top: 23px;
    left: 44px;
    #fontWeightUp {
      font-weight: 600;
    }
  }
  .incNumshow {
    .el-button--primary.is-plain {
      color: #409eff;
      margin-bottom: 7px;
      background: #ecf5ff;
      border-color: #b3d8ff;
    }
  }
  .failedIncsShow {
    background-color: rgba(245, 108, 108, 0.1);
    border-color: rgba(245, 108, 108, 0.2);
    color: #f56c6c;
    padding: 6px;
    margin-left: 5px;
    border-radius: 8px;
  }
  .el-dialog__title {
    line-height: 24px;
    font-size: 16px;
    color: #303133;
}
  .el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 25px 30px 43px;
}
}
.failedDialogclose {
  color: #e4e7ed;
}
</style>