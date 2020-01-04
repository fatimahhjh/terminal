<!--  -->
<template>
  <div class="terminalIndex">
    <div class="breadcrumb">
    </div>

    <div class="el_body" @update="loadData">
      <div class="content_area">
        <div class="nav_area">
          <!-- 导航栏操作 -->
          <el-card shadow="always">
            <div class="oprations_btns">
              <upload :submitUrl="submitUrl"></upload>
              <el-tag effect="dark" @click="staffManage" class="staff_btn"
                >使用人员管理</el-tag
              >
              <el-tag effect="dark" @click="terminalManage" class="terminal_btn"
                >公用终端管理</el-tag
              >
              <el-tag
                effect="dark"
                @click="emergencyOnekeyOn()"
                class="emergencyOn_btn"
                >一键应急开启</el-tag
              >
               <el-tag
                effect="dark"
                @click="emergencyOnekeyOff()"
                class="emergencyOff_btn"
                >一键应急关闭</el-tag
              >
            </div>
            <div class="search_box">
      <search
        @list="onList"
        @filteStr="onFilteStr"
        :filterDataList="terminalList"
      ></search>
        </div>
          </el-card>
        </div>

        <el-table
          :data="terminalsTableList"
          tooltip-effect="dark"
          style="width:100%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="terminal_type" label="终端类型">
          </el-table-column>
          <el-table-column
            prop="location"
            label="物理位置"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="terminal_ip"
            label="终端IP"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="switch_ip"
            label="交换机设备IP"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="switch_name" label="交换机设备名称">
          </el-table-column>
          <el-table-column
            prop="switch_port"
            label="交换机设备接入端口"
            show-overflow-tooltip
            width="150"
          >
          </el-table-column>
          <el-table-column prop="status" label="运行状态" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="available_time"
            label="有效时间"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column fixed="right" label="管理状态">
            <template slot-scope="scope">
              <el-button
                class="white_font"
                type="primary"
                size="mini"
                @click="portManage(scope.row.terminal_ip,scope.row.switch_port,scope.row.status)"
                >端口管理</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 这个是管理人员弹窗 -->
      <el-dialog title="使用人员管理" :visible.sync="staffDialogVisible" width="80%">
    <div class="addBtns"> <el-button type="success" size="mini" @click="addStaff" class="white_font">新增使用人员</el-button></div>
        <el-table
    :data="staffData"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="姓名"
      >
    </el-table-column>
     <el-table-column
      prop="job"
      label="岗位"
     >
    </el-table-column>
     <el-table-column
      prop="united_iden_num"
      label="统一认证号"
     >
    </el-table-column>
     <el-table-column
      prop="department"
      label="部门"
      >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
        type="info"
          size="mini"
           class="white_font"
          @click="editStaff(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
           class="white_font"
          @click="deleteStaff(scope.row.united_iden_num)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
      </el-dialog>
<!-- 这个是修改使用人员信息的弹框 -->
<el-dialog :title="staffTitle" :visible.sync="editStaffDialog">
  <el-form :model="EditStaffform" :rules="rules"  ref="form">
    <el-form-item label="姓名" :label-width= "formLabelWidth">
      <el-input v-model="EditStaffform.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="岗位" :label-width="formLabelWidth">
      <el-input v-model="EditStaffform.job" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="统一认证号" :label-width="formLabelWidth" prop="united_iden_num">
      <el-input v-model="EditStaffform.united_iden_num" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="部门" :label-width="formLabelWidth">
      <el-input v-model="EditStaffform.department" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editStaffDialog = false">取 消</el-button>
    <el-button v-if="staffTitle=='新增使用人员'" type="primary" @click="confirmStaffAdd">确定新增</el-button>
      <el-button v-else type="primary" @click="confirmStaffEdit">确定修改</el-button>
  </div>
</el-dialog>
<!-- 这是公用终端管理的弹框 -->

  <el-dialog title="公用终端管理" :visible.sync="terminalsDialogVisible" width="80%">
    <div class="addBtns"> <el-button type="success" size="mini" @click="addTerms" class="white_font">新增终端</el-button></div>
    
        <el-table
    :data="terminalsData"
    style="width: 100%">
    <el-table-column
      prop="location"
      label="物理位置"
     >
    </el-table-column>
     <el-table-column
      prop="terminal_ip"
      label="终端地址"
      >
    </el-table-column>
     <el-table-column
      prop="terminal_type"
      label="终端分类"
     >
    </el-table-column>
     <el-table-column
      prop="switch_ip"
      label="交换机设备IP"
     >
    </el-table-column>
    <el-table-column
      prop="switch_name"
      label="交换机设备名称"
      >
    </el-table-column>
    <el-table-column
      prop="switch_port"
      label="交换机接入端口"
    >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="info"
           class="white_font"
          @click="editTerminals(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
           class="white_font"
          @click="deleteTerminals(scope.row.terminal_ip)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      </el-dialog>

      <!-- 这个是端口管理的弹窗 -->
      <el-dialog title="" :visible.sync="portOnOffDialogVisible" width="65%" center>
        <div class="el_body_dialog">
          <div class="incNumTitle">
            <span id="fontWeightUp">你要对以下终端的端口进行管理</span>
          </div>
          <el-card shadow="always">
                <el-row>
                  <el-col :span="24"
                    ><div class="grid-content bg-purple-dark">
                      <div class="middle_place1">终端 {{terminal_ip}} 的 {{ switch_port }} 端口</div>
                    </div></el-col
                  >
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7"
                    ><div class="grid-content bg-purple">
                      <div class="middle_place">
                        <el-switch
                          style="display: block"
                          v-model="status"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          active-text="开启端口"
                          inactive-text="关闭端口"
                          active-value="off"
                          inactive-value="on"
                        >
                        </el-switch>
                      </div></div
                  ></el-col>
                  <el-col :span="17" :offset="0"
                    ><div class="grid-content bg-purple">
                      <div class="middle_place2">
                        <el-radio :disabled="status!='off'" v-model="radio" label="永久有效"
                          >永久有效</el-radio
                        >
                        <el-radio :disabled="status!='off'" v-model="radio" label="restoreTime"
                          >选取时间段： <el-date-picker
                                          v-model="restoreTime"
                                          type="datetime"
                                          format="yyyy-MM-dd HH:mm"
                                          placeholder="选择日期时间">
                                      </el-date-picker>
                                      </el-radio>
                      </div>
                    </div></el-col
                  >
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="24"
                    ><div class="grid-content bg-purple">
                      <div class="btns_position">
                        <el-button type="success" size="middle">确认</el-button>
                        <el-button type="info" size="middle" @click="canclePortMana">取消</el-button>
                      </div>
                    </div></el-col
                  >
                </el-row>
          </el-card>
        </div>
      </el-dialog>
      <!-- 这个是批量应急终端端口开启弹框 -->
       <el-dialog title="" :visible.sync="emergencyOnDialogVisible" width="65%" center>
        <div class="el_body_dialog">
          <div class="incNumTitle">
            <span id="fontWeightUp">你要对以下应急端口进行端口开启</span>
            <span id="fontWeightUp"
              >共{{ }}条</span>
          </div>
          <el-card shadow="always">
            <div class="incNumshow">
                   <el-row>
                  <el-col :span="24"
                    ><div class="grid-content bg-purple-dark">
                      <div class="middle_place1" v-for="(item, index) in INC_NUMBER_LIST" :key="index">{{ item }},</div>
                    </div></el-col
                  >
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7"
                    ><div class="grid-content bg-purple">
                      <div class="middle_place">
                       <el-radio v-model="multiEmerOnValue">批量开启端口</el-radio>
                      </div></div
                  ></el-col>
                  <el-col :span="17" :offset="0"
                    ><div class="grid-content bg-purple">
                      <div class="posi_adjust">
                        <el-radio v-model="radio" label="永久有效"
                          >永久有效</el-radio
                        >
                      </div>
                    </div></el-col
                  >
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="24"
                    ><div class="grid-content bg-purple">
                      <div class="btns_position">
                        <el-button type="success" size="middle">确认开启</el-button>
              <el-button type="info" size="middle" @click="cancleEmerOn">取消开启</el-button>
                      </div>
                    </div></el-col
                  >
                </el-row>
            </div>
          </el-card>
        </div>
      </el-dialog>
      <!-- 这个是批量应急终端端口关闭弹框 -->
      <el-dialog title="" :visible.sync="emergencyOffDialogVisible" width="65%" center>
        <div class="el_body_dialog">
          <div class="incNumTitle">
            <span id="fontWeightUp">你要对以下应急端口进行端口关闭</span>
            <span id="fontWeightUp"
              >共{{ }}条</span>
          </div>
          <el-card shadow="always">
            <div class="incNumshow">
                   <el-row>
                  <el-col :span="24"
                    ><div class="grid-content bg-purple-dark">
                      <div class="middle_place1" v-for="(item, index) in INC_NUMBER_LIST" :key="index">{{ item }},</div>
                    </div></el-col
                  >
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="7"
                    ><div class="grid-content bg-purple">
                      <div class="middle_place">
                       <el-radio v-model="multiEmerOffValue">批量关闭端口</el-radio>
                      </div></div
                  ></el-col>
                  <el-col :span="17" :offset="0"
                    ><div class="grid-content bg-purple">
                      <div class="posi_adjust">
                        <el-radio v-model="radio" label="永久有效"
                          >永久有效</el-radio
                        >
                      </div>
                    </div></el-col
                  >
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="24"
                    ><div class="grid-content bg-purple">
                      <div class="btns_position">
                        <el-button type="success" size="middle">确认关闭</el-button>
              <el-button type="info" size="middle" @click="cancleEmerOff">取消关闭</el-button>
                      </div>
                    </div></el-col
                  >
                </el-row>
            </div>
          </el-card>
        </div>
      </el-dialog>
      <!-- 这是编辑终端弹框 -->
      <el-dialog :title="termstitle" :visible.sync="editTerminalsDialog">
  <el-form :model="EditTerminalsform">
    <el-form-item label="物理位置" :label-width="formLabelWidth">
      <el-input v-model="EditTerminalsform.location" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="终端地址" :label-width="formLabelWidth">
      <el-input v-model="EditTerminalsform.terminal_ip" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="终端分类" :label-width="formLabelWidth">
      <el-input v-model="EditTerminalsform.terminal_type" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="交换机设备IP" :label-width="formLabelWidth">
      <el-input v-model="EditTerminalsform.switch_ip" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="交换机设备名称" :label-width="formLabelWidth">
      <el-input v-model="EditTerminalsform.switch_name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="交换机接入端口" :label-width="formLabelWidth">
      <el-input v-model="EditTerminalsform.switch_port" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editTerminalsDialog = false">取 消</el-button>
    <el-button v-if="termstitle=='新增终端'" @click="confirmTermianlAdd" type="primary">确定新增</el-button>
    <el-button v-else type="primary" @click="confirmTermianlEdit" >确定修改</el-button>
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
            <span>处理失败共：</span><span>{{ result_list.length }}条</span>
          </div>
          <span
            class="failedIncsShow"
            v-for="(item, index) in result_list"
            :key="index"
            >{{ item }}</span
          >
        </el-card>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="failedDialogVisible = false"
            class="failedDialogclose"
            plain
            size="mini"
            >关闭</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { format1, format } from "../utils/utils.js";
import { black } from "color-name";
import { getCookie } from "../utils/getCookie.js";
import { getUserInfo } from "../utils/getUserInfo.js";
import upload from "./upload.vue";
import search from "./search.vue";
export default {
  components: {
    upload,
    search
  },
  data() {
    const checkIdenNum = (rule, value, callback) => {
      let regNum = /^.{1,20}$/;
      if (value === '') {
            callback(new Error('必须输入统一认证号'));
      } else if (!Number.isInteger(+value)) {
            callback(new Error('输入数字'));
      } else if (!regNum.test(value)) {
            callback(new Error('长度过长'));
      } else {
            callback();
      }
};
    return {
      staffDialogVisible: false,
      // 这是控制一线处理对话框显示与否
      portOnOffDialogVisible: false,
      emergencyOnDialogVisible: false,
      emergencyOffDialogVisible: false,
      failedDialogVisible: false,
      multiEmerOnValue: 'on',
      multiEmerOffValue: 'off',
      status: "",
      restoreTime: "",
      radio: "",
      tableData: [],
      filterWord: "",
      filterResult: [],
      submitUrl: "/ecc/staff/upload",
      staffData: [],
      terminalsData: [],
      terminalList: [],
      termstitle: "",
      staffTitle: "",
      rules:{
united_iden_num:[
{ required: true, validator: checkIdenNum, trigger: "blur" }
]
      },
      termType: [],
      result_list: [],
      editStaffDialog: false,
      editTerminalsDialog: false,
      terminalsDialogVisible: false,
      EditStaffform: {
        name: "",
        job: "",
        united_iden_num: "",
        department: ""
      },
      EditTerminalsform: {
        location: "",
        terminal_ip: "",
        terminal_type: "",
        switch_ip: "",
        switch_name: "",
        switch_port: ""
      },
      formLabelWidth: "120px",
      INC_NUMBER_LIST: [],
      listIncNum: [],
      switch_port: "",
      terminal_ip:"",
      username: "",
      loading: true
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    terminalsTableList() {
      if (this.filterWord == "") {
        return this.tableData;
      } else {
        return this.filterResult;
      }
    }
  },
  methods: {
    // 查找指定终端
    onList(_list) {
      // console.log(_list);
      this.filterResult = _list;
      // this.total = this.list.length;
      // this.pageNum = 1;
    },
    onFilteStr(_filteStr) {
      // console.log(_filteStr);
      this.filterWord = _filteStr;
    },
    // 管理人员事件
    staffManage() {
      this.$http
        .get("/ecc/staff")
        .then(res => {
          // console.log(res);
          let SS = res.data.data;
          this.staffData = SS;
          this.staffDialogVisible = true;
        })
        .catch(res => {
          this.$message.error("获取人员信息失败！");
        });
    },
    // 新增使用人员
    addStaff() {
      this.staffTitle = "新增使用人员";
      this.editStaffDialog = true;
      this.EditStaffform = Object.assign({}, "");
    },
    // 编辑人员信息
    editStaff(index, row) {
      this.staffTitle = "修改使用人员信息";
      // console.log(index, row);
      this.editStaffDialog = true;
      let _row = row;
      //将每一行的数据赋值给Dialog弹框（这里是重点）
      this.EditStaffform = Object.assign({}, _row);
    },
    // 删除人员
     deleteStaff(indenti_num) {
         this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/ecc/staff?united_iden_num='+indenti_num)
          .then(res=>{
             if (res.data.errcode =="0") {
                this.$message.success("人员删除成功！");
                this.staffManage()
          }else{
          this.$message.error("人员删除失败！");
          }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 确认新增使用人员
      confirmStaffAdd() {
      this.$confirm("确认新增人员信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/ecc/staff", this.EditStaffform)
            .then(res => {
              if (res.data.errcode =="0") {
                this.$message.success("新增人员成功！");
          this.editStaffDialog=false;
          this.staffManage();
              } else {
                this.$message.error("新增人员失败！");
                this.editStaffDialog=false;
              }
            })
            .catch(res => {
              this.$message.error("新增人员操作出现问题了！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消新增"
          });
        });
    },
    // 确认修改使用人员
    confirmStaffEdit() {
      this.$confirm("确认修改人员信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/ecc/staff", this.EditStaffform)
            .then(res => {
              if (res.data.errcode =="0") {
                this.$message.success("修改人员成功！");
                this.staffManage()
          this.editStaffDialog=false;
          this.staffManage();
              } else {
                this.$message.error("修改人员失败！");
                this.editStaffDialog=false;
              }
            })
            .catch(res => {
              this.$message.error("修改人员操作出现问题了！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    // 终端管理
    terminalManage() {
      this.$http
        .get("/ecc/device")
        .then(res => {
          let terms = res.data.data;
          this.terminalsData = terms;
          this.terminalsDialogVisible = true;
        })
        .catch(res => {
          this.$message.error("获取终端信息失败！");
        });
    },
    // 编辑终端
    editTerminals(index, row) {
      this.termstitle = "修改终端信息";
      this.editTerminalsDialog = true;
      let _row = row;
      //将每一行的数据赋值给Dialog弹框（这里是重点）
      this.EditTerminalsform = Object.assign({}, _row);
    },
    // 确定终端新增
confirmTermianlAdd(){
 this.$confirm("确认新增终端信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/ecc/device", this.EditTerminalsform)
            .then(res => {
              if (res.data.errcode =="0") {
                this.$message.success("新增终端成功！");
          this.editTerminalsDialog=false;
          this.terminalManage();
              } else {
                this.$message.error("新增终端失败！");
                this.editTerminalsDialog=false;
              }
            })
            .catch(res => {
              this.$message.error("新增终端操作出现问题了！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消新增"
          });
        });
},
  // 删除终端
     deleteTerminals(terminal_ip) {
         this.$confirm('此操作将永久删除该终端, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/ecc/device?terminal_ip='+terminal_ip)
          .then(res=>{
             if (res.data.errcode =="0") {
                this.$message.success("终端删除成功！");
                this.terminalManage();
          }else{
          this.$message.error("终端删除失败！");
          }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 新增终端
    addTerms() {
      this.termstitle = "新增终端";
      this.editTerminalsDialog = true;
      this.EditTerminalsform = Object.assign({},'');
    },
    // 确定终端修改
    confirmTermianlEdit(){
 this.$confirm("确认修改终端信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .put("/ecc/device", this.EditTerminalsform)
            .then(res => {
              if (res.data.errcode =="0") {
                this.$message.success("修改终端成功！");
          this.editTerminalsDialog=false;
          this.terminalManage();
              } else {
                this.$message.error("修改终端失败！");
                this.editTerminalsDialog=false;
              }
            })
            .catch(res => {
              this.$message.error("修改终端操作出现问题了！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    // 取消应急终端端口开启
    cancleEmerOn() {
      this.$confirm("确认取消一键应急终端端口开启？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.emergencyOnDialogVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "继续一键应急终端端口开启"
          });
        });
    },
    
    // 一键应急开启端口
    emergencyOnekeyOn() {
      this.emergencyOnDialogVisible = true;
    },
    // 一键应急端口关闭
    emergencyOnekeyOff() {
      this.emergencyOffDialogVisible = true;
    },
    // 取消一键应急终端端口关闭
    cancleEmerOff() {
      this.$confirm("确认取消一键应急终端端口关闭？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.emergencyOffDialogVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "继续一键应急终端端口关闭"
          });
        });
    },
    // 事件发生变化重新请求数据
    // onChange() {
    //   this.loadData();
    // },
    // 取消端口管理
    canclePortMana() {
      this.portOnOffDialogVisible = false;
    },
    loadData() {
      this.$http
        .get("/ecc/terminal")
        .then(res => {
          this.loading = false;
          let list1 = res.data.data;
          this.tableData = list1;
          this.terminalList = list1;
        })
        .catch(res => {
          this.$message.error("数据获取失败");
          setTimeout(function() {
            // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
            this.loading = false; // 关闭遮罩层
          }, 5000);
        });
    },
    // 端口开启关闭操作
    portManage(terminal_ip,switch_port, status) {
      this.portOnOffDialogVisible = true;
      this.switch_port=switch_port;
      this.status=status;
       this.terminal_ip=terminal_ip;
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
          } = await this.$http.post("answerIncs", this.sizeForm);
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
          document.getElementById("validateSuccess1").style.borderColor =
            "#DCDFE6";
          document.getElementById("validateSuccess2").style.borderColor =
            "#DCDFE6";
          document.getElementById("validateSuccess3").style.borderColor =
            "#DCDFE6";
          this.loadData();
        } catch (error) {
          console.log(error);
          this.$message.error("请求发送失败");
        }
      });
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
        .oprations_btns {
          width: 800px;
          margin-left: -25px;
          .staff_btn {
            background-color: rgb(231, 116, 21);
            border: 1px solid rgb(231, 116, 21);
            margin-left: 40px;
          }
          .terminal_btn {
            background-color: #fe6845;
            border: 1px solid #fe6845;
            margin-left: 40px;
          }
          .emergencyOn_btn {
            background-color: rgb(207, 79, 90);
            border: 1px solid rgb(207, 79, 90);
            margin-left: 40px;
          }
          .emergencyOff_btn {
            background-color: rgb(194, 13, 28);
            border: 1px solid rgb(194, 13, 28);
            margin-left: 40px;
          }
        }
      }
    }
    /deep/.white_font span {
      color: white;
      font-size: 12px;
    }
    .el-card__body {
      padding: 10px 10px 3px 10px;
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 53px;
  }
  .middle_place2 {
    position: relative;
    top: 7px;
    left: 19px;
    font-weight: 600;
    font-size: 15px;
  }
  .posi_adjust {
    position: relative;
    top: 19px;
    left: 42px;
  }
  .middle_place1 {
    position: relative;
    top: 17px;
    float: left;
    left: 19px;
    font-weight: 600;
    font-size: 15px;
  }
  .middle_place {
    position: relative;
    top: 17px;
    left: 19px;
  }
  .addBtns {
    text-align: right;
    margin-right: 61px;
    color: white;
  }
  .search_box {
    margin-left: 989px;
    margin-top: -37px;
  }
  .btns_position {
    width: 250px;
    margin: 0 auto;
    position: relative;
    top: 6px;
    .el-button--success {
      color: #fff;
      background-color: #67c23a;
      border-color: #67c23a;
      margin-right: 41px;
    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
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