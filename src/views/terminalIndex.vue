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
                 <el-tag
                effect="dark"
                @click="downloadLog()"
                class="downLog"
                >日志下载</el-tag
              >
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
              <el-tooltip class="item" effect="light" content="点击刷新获取实时数据" placement="left-start">
             <div class="refresh"  @click="refreshData">
                <i class="el-icon-refresh"></i>
            </div>
            </el-tooltip>
            <div class="search_box">
      <search
        @list="onList"
        @filteStr="onFilteStr"
        :filterDataList="terminalList"
      ></search>
        </div>
          </el-card>
        </div>
    <!-- 加载终端所有信息 -->
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
          <el-table-column
            prop="remark"
            label="备注"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column fixed="right" label="管理状态">
            <template slot-scope="scope">
              <el-button
                class="white_font"
                type="primary"
                size="mini"
                @click="portManage(scope.row.terminal_ip,scope.row.location,scope.row.switch_ip,scope.row.switch_name,scope.row.terminal_type,scope.row.switch_port,scope.row.status)"
                >端口管理</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.totalNum">
    </el-pagination>
      </div>
      <!-- 这个是管理人员弹窗 -->
      <el-dialog title="使用人员管理" :visible.sync="staffDialogVisible" width="80%">
   <div class="multiUpload">
              <upload :submitUrl="staffSubmitUrl" :upload_btn="'uploadTerms_btn'" :title="'批量上传新增人员'"></upload>
               <el-button type="primary" size="mini" class="white_font" @click="downloadStaff">下载批量上传模板</el-button>
   </div>
    <div class="addBtns"> 
      <el-button type="success" size="mini" @click="addStaff" class="white_font">单条新增使用人员</el-button>
      </div>
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
          @click="deleteStaff(scope.row.united_iden_num,scope.row.department)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-pagination
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.totalStaffNum">
    </el-pagination>
      </el-dialog>
<!-- 这个是修改使用人员信息的弹框 -->
<el-dialog :title="staffTitle" :visible.sync="editStaffDialog">
  <el-form :model="EditStaffform" :rules="rules"  ref="form">
    <el-form-item label="姓名" :label-width= "formLabelWidth" prop="name">
      <el-input v-model.trim="EditStaffform.name" autocomplete="off"></el-input>
    </el-form-item>
    <!-- <el-form-item label="岗位" :label-width="formLabelWidth" prop="job">
      <el-input v-model.trim="EditStaffform.job" autocomplete="off"></el-input>
    </el-form-item> -->
    <el-form-item label="岗位" :label-width="formLabelWidth">
       <el-select v-model="EditStaffform.job" placeholder="请选择人员岗位">
      <el-option label="运行维护岗" value="运行维护岗"></el-option>
      <el-option label="运行值班经理岗" value="运行值班经理岗"></el-option>
      <el-option label="系统管理岗" value="系统管理岗"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="统一认证号" :label-width="formLabelWidth" prop="united_iden_num">
      <el-input v-model.trim="EditStaffform.united_iden_num" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="部门" :label-width="formLabelWidth" prop="department">
      <el-input v-model.trim="EditStaffform.department" placeholder="请输入数据中心xxx部" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editStaffCancle">取 消</el-button>
    <el-button v-if="staffTitle=='新增使用人员'" type="primary" @click="confirmStaffAdd">确定新增</el-button>
      <el-button v-else type="primary" @click="confirmStaffEdit">确定修改</el-button>
  </div>
</el-dialog>
<!-- 这是公用终端管理的弹框 -->

  <el-dialog title="公用终端管理" :visible.sync="terminalsDialogVisible" width="80%">
    <div class="multiUpload">
              <upload :submitUrl="terminalSubmitUrl" :upload_btn="'uploadStaff_btn'" :title="'批量上传新增终端'"></upload>
               <el-button type="primary" size="mini" class="white_font" @click="downloadTerminal">下载批量上传模板</el-button>

    </div>
    <div class="addBtns"> <el-button type="success" size="mini" @click="addTerms" class="white_font">单条新增终端</el-button></div>

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
   <el-pagination
      @size-change="handleSizeChange3"
      @current-change="handleCurrentChange3"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.totalTermsNum">
    </el-pagination>
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
                          v-model="portStatus"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          active-text="开启端口"
                          inactive-text="关闭端口"
                          active-value="on"
                          inactive-value="off"
                        >
                        </el-switch>
                      </div></div
                  ></el-col>
                  <el-col :span="17" :offset="0"
                    ><div class="grid-content bg-purple">
                      <div class="middle_place2">
                        <el-radio :disabled="this.portStatus!='on'" v-model="pickTime" label="永久有效"
                          >永久有效</el-radio
                        >
                        <el-radio :disabled="this.portStatus!='on'" v-model="pickTime" label="选择时间段"
                          >
                        <el-date-picker
                                          :disabled="this.portStatus!='on'||this.pickTime!=='选择时间段'"
                                          v-model="timeRange"
                                          type="datetimerange"
                                          format="yyyy/M/d HH:mm"
                                          value-format="yyyy/M/d HH:mm"
                                          start-placeholder="开始日期"
                                          end-placeholder="结束日期"
                                         >
                                      </el-date-picker>
                                      </el-radio
                        >
                      </div>
                    </div></el-col
                  >
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="24"
                    ><div class="grid-content bg-purple">
                      <div class="btns_position">
                        <el-button type="success" size="middle" @click="confirmPortOnOff" >确认</el-button>
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
                        <el-radio v-model="permanent" label="永久有效"
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
                        <el-radio v-model="permanent" label="永久有效"
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
  <el-form :model="EditTerminalsform" :rules="rules"  ref="form">
    <el-form-item label="物理位置" :label-width="formLabelWidth" prop="location">
      <el-input v-model.trim="EditTerminalsform.location" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="终端地址" :label-width="formLabelWidth" prop="terminal_ip">
      <el-input v-model.trim="EditTerminalsform.terminal_ip" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="终端分类" :label-width="formLabelWidth" prop="terminal_type">
      <el-input v-model.trim="EditTerminalsform.terminal_type" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="交换机设备IP" :label-width="formLabelWidth" prop="switch_ip">
    <el-select v-model="EditTerminalsform.switch_ip"  @change="autoSelectName" placeholder="请选择交换机设备IP">
       <el-option
      v-for="item in switchIpOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
  </el-form-item>
      <el-form-item label="交换机设备名称" :label-width="formLabelWidth"  prop="switch_name">
    <el-select v-model="EditTerminalsform.switch_name" placeholder="请选择交换机设备名称">
      <el-option label="JD49SW13-M2" value="JD49SW13-M2"></el-option>
      <el-option label="JD45SW01-M2" value="JD45SW01-M2"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="交换机接入端口" :label-width="formLabelWidth" prop="switch_port">
      <el-input v-model.trim="EditTerminalsform.switch_port" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editStaffCancle">取 消</el-button>
    <el-button v-if="termstitle=='新增终端'" @click="confirmTermianlAdd" type="primary">确定新增</el-button>
    <el-button v-else type="primary" @click="confirmTermianlEdit" >确定修改</el-button>
  </div>
</el-dialog>
<!-- 一键关闭成功对话框 -->
 <el-dialog
        title="一键式应急终端端口关闭成功提示"
        :visible.sync="succeedOffDialogVisible"
        width="40%"
        center
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
             <el-row>
                  <el-col :span="24"
                    ><div class="grid-content bg-purple-dark">
                 <span class="center_pos">共关闭成功：</span><span class="center_pos">{{totalSuccessOff}}个</span>
                    </div></el-col
                  >
                </el-row>
          </div>
        </el-card>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="succeedOffDialogVisible = false"
            class="failedDialogclose"
            plain
            size="mini"
            >关闭</el-button
          >
        </span>
      </el-dialog>
      <!-- 一键开启成功对话框 -->
      <el-dialog
        title="一键式应急终端端口开启成功提示"
        :visible.sync="succeedDialogVisible"
        width="40%"
        center
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
             <el-row>
                  <el-col :span="24"
                    ><div class="grid-content bg-purple-dark">
                 <span class="center_pos">共开启成功：</span><span class="center_pos">{{totalSuccess}}个</span>
                    </div></el-col
                  >
                </el-row>
          </div>
        </el-card>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="succeedDialogVisible = false"
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
    return {
      staffDialogVisible: false,
      // 这是控制一线处理对话框显示与否
      portOnOffDialogVisible: false,
      emergencyOnDialogVisible: false,
      emergencyOffDialogVisible: false,
      succeedDialogVisible:false,
      succeedOffDialogVisible:false,
      multiEmerOnValue: 'on',
      multiEmerOffValue: 'off',
      portStatus: "",
      restoreTime: "",
      permanent: "",
      pickTime:"",
      timeRange:"",
      tableData: [],
      newTime:"",
      portList:[],
      filterWord: "",
      filterResult: [],
      staffSubmitUrl: "/ecc/staff/upload",
      terminalSubmitUrl:"/ecc/device/upload",
      staffData: [],
      terminalsData: [],
      terminalList: [],
      termstitle: "",
      staffTitle: "",
      switchIpOptions:[{
         value: '76.7.115.156',
          label: '76.7.115.156'
      },{
         value: '76.7.115.151',
          label: '76.7.115.151'
      }],
      rules:{
united_iden_num:[
{ required: true, validator: this.checkIdenNum, trigger: "blur" }
],
name:[
{ required: true,  message: '请输入人员姓名', trigger: "blur" }
],
job:[
{ required: true,  message: '请输入人员职位', trigger: "blur" }
],
department:[
{ required: true,  validator: this.checkDepartment, trigger: "blur" }
],
location:[
{ required: true,  message: '请输入终端的物理位置', trigger: "blur" }
],
terminal_ip:[
{ required: true,  message: '请输入终端ip地址', trigger: "blur" }
],
terminal_type:[
{ required: true,  message: '请输入终端类型', trigger: "blur" }
],
switch_ip:[
{ required: true,  message: '请输入接入交换机设备ip', trigger: "blur" }
],
switch_name:[
{ required: true,  message: '请输入接入交换机设备名称', trigger: "blur" }
],
switch_port:[
{ required: true, validator: this.checkPort, trigger: "blur" }
]
      },
      termType: [],
      totalNum: 0,
      totalStaffNum:0,
      totalTermsNum:0,
      pageNum: 1,
      pageSize: 10,
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
      formLabelWidth: "135px",
      INC_NUMBER_LIST: [],
      listIncNum: [],
      switch_port: "",
      terminal_ip:"",
      location:"",
      switch_ip:"",
      switch_name:"",
      terminal_type:"",
      username: "",
      totalSuccessOff:"",
      totalSuccess:"",
      loading: true
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    terminalsTableList() {
      if (this.filterWord == "") {
        // return this.tableData;
         let end = this.pageNum * this.pageSize;
      let start = end - this.pageSize;
      return this.tableData.slice(start, end);
      } else {
        return this.filterResult;
        }
    }
  },
  methods: {
     checkIdenNum(rule, value, callback){
      let regNum = /^.{9,9}$/;
      if (value === ''|| value ==undefined) {
            callback(new Error('必须输入统一认证号'));
      } else if (!Number.isInteger(+value)) {
            callback(new Error('输入数字'));
            console.log(this.EditStaffform.indenti_num)
      } else if (!regNum.test(value)) {
            callback(new Error('请输入9位统一认证号'));
      } else {
            callback();
      }
},
    checkDepartment(rule, value, callback) {
   if(value===''|| value==undefined){
callback(new Error('请输入部门'))
   }
   else if(this.$root.Hub.department!==value){
callback(new Error('您没有权限新增该部门人员信息！'))
   }else{
    callback()
   }
 },
  checkPort(rule, value, callback) {
   if(value===''|| value==undefined){
callback(new Error('请输入接入交换机设备端口'))
   }
   if(this.portList.indexOf(value)==-1){
callback()
   }else{
    callback(new Error("该端口已存在！"))
   }
 },
    // 查找指定终端
    onList(_list) {
      // console.log(_list);
      this.filterResult = _list;
        // console.log(this.filterResult)
      if(this.filterResult.length==0){
        this.$message.error("查无此信息，请确认输入内容是否准确！")}
      // this.total = this.list.length;
      // this.pageNum = 1;
    },
    onFilteStr(_filteStr) {
      // console.log(_filteStr);
      this.filterWord = _filteStr;
    },
    // 交换机ip变了交换机name也变
    autoSelectName(val){
// console.log('autoSelectName',val)
if(val=="76.7.115.151"){
this.EditTerminalsform.switch_name="JD45SW01-M2"
}else{
this.EditTerminalsform.switch_name="JD49SW13-M2"
}
    },
    // 监听每页显示多少条信息
     handleSizeChange(newSize) {
        // console.log(`每页 ${newSize} 条`);
        this.pageSize=newSize;
        this.loadData()
      },
      handleCurrentChange(newPage) {
        // console.log(`当前页: ${newPage}`);
        this.pageNum=newPage;
        this.loadData()
      },
      handleSizeChange2(newSize) {
        // console.log(`每页 ${newSize} 条`);
        this.pageSize=newSize;
        this.staffManage()
      },
      handleCurrentChange2(newPage) {
        // console.log(`当前页: ${newPage}`);
        this.pageNum=newPage;
        this.staffManage()
      },
      handleSizeChange3(newSize) {
        // console.log(`每页 ${newSize} 条`);
        this.pageSize=newSize;
        this.terminalManage()
      },
      handleCurrentChange3(newPage) {
        // console.log(`当前页: ${newPage}`);
        this.pageNum=newPage;
        this.terminalManage()
      },
    // 管理人员事件
    staffManage() {
      this.$http.get('/ecc/auth/operation')
      .then(res=>{
        if(res.data.errcode==0){
   this.$http
        .get("/ecc/staff")
        .then(res => {
          // console.log(res);
          let SS = res.data.data;
          this.totalStaffNum=res.data.total
          let end = this.pageNum * this.pageSize;
          let start = end - this.pageSize;
          this.staffData = SS.slice(start, end);
          this.staffDialogVisible = true;
        })
        .catch(res => {
          this.$message.error("获取人员信息失败！");
        });
        }else{
          this.$message.warning("对不起，您无操作权限！")
        }
      })
    },
    // 新增使用人员
    addStaff() {
      this.staffTitle = "新增使用人员";
      this.editStaffDialog = true;
      this.EditStaffform = Object.assign({},'');
    },
    // 编辑人员信息
    editStaff(index, row) {
      // console.log(index,row)
      this.staffTitle = "修改使用人员信息";
      let _row = row;
      if(this.$root.Hub.department=="数据中心运行一部" && _row.department=="数据中心网络一部"){
        this.$message.warning("您没有权限修改网络一部人员信息！")
      }else if(this.$root.Hub.department=="数据中心网络一部" && _row.department=="数据中心运行一部"){
        this.$message.warning("您没有权限修改运行一部人员信息！")
      }else{
      this.EditStaffform = Object.assign({}, _row);
      this.editStaffDialog = true;
      }

      //将每一行的数据赋值给Dialog弹框（这里是重点）
    
    },
    // 删除人员
     deleteStaff(indenti_num,department) {
 if(this.$root.Hub.department !== department){
        this.$message.warning("您没有权限删除该部人员信息！")
      }else{
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
      }
    },
    // 确认新增使用人员
      confirmStaffAdd() {
      this.$confirm("确认新增人员信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs.form.validate(valid=>{
            if(!valid){
            this.$message.warning("校验未通过");
          return;
            }
            try{
             this.$http
            .post("/ecc/staff", this.EditStaffform)
            .then(res => {
                // console.log(this.EditStaffform)
              if (res.data.errcode =="0") {
                this.$message.success("新增人员成功！");
          this.editStaffDialog=false;
          this.$refs.form.resetFields();
          this.staffManage();
              } else {
                this.$message.error("新增人员失败！");
                this.editStaffDialog=false;
              }
            })
            .catch(res => {
              this.$message.error("新增人员操作出现问题了！");
            });}
            catch(error){
          this.$message.error("请求发送失败");
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消新增"
          });
        });
    },
    // 取消修改人员
    editStaffCancle(){
    this.editStaffDialog = false
    this.editTerminalsDialog = false
    this.$refs.form.resetFields();
    },
    // 确认修改使用人员
    confirmStaffEdit() {
      this.$confirm("确认修改人员信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
           this.$refs.form.validate(valid=>{
              if (!valid) {
          this.$message.warning("校验未通过");
          return;
        }
        try{
            this.$http
            .post("/ecc/staff", this.EditStaffform)
            .then(res => {
              if (res.data.errcode =="0") {
                this.$message.success("修改人员成功！");
                // console.log(this.EditStaffform)
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
            });}
            catch(error){
          this.$message.error("请求发送失败");
            }
           })
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
      this.$http.get('/ecc/auth/system')
      .then(res=>{
        if(res.data.errcode !=='0'){
      this.$message.warning("对不起，您没有此权限！");
        }else{
  this.$http
        .get("/ecc/device")
        .then(res => {
          let terms = res.data.data;
          this.totalTermsNum=res.data.total
          let end = this.pageNum * this.pageSize;
          let start = end - this.pageSize;
          this.terminalsData = terms.slice(start, end);
          this.terminalsDialogVisible = true;
        })
        .catch(res => {
          this.$message.error("获取终端信息失败！");
        });
    }
      }
      )
      .catch(res=>{
this.$message.error("访问失败")
      })
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
          this.$refs.form.validate(valid=>{
            if(!valid){
               this.$message.warning("校验未通过");
          return;
            }
try{
 this.$http
            .post("/ecc/device", this.EditTerminalsform)
            .then(res => {
              // console.log(this.EditTerminalsform)
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
}
catch(error){
          this.$message.error("请求发送失败");
}
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消新增"
          });
          this.$refs.form.resetFields();
        });
},
// 下载日志
downloadLog(){
  window.open('/ecc/log/download')
},
// 下载人员信息模板
downloadStaff(){
  window.open('')
},
// 下载终端信息模板
downloadTerminal(){
window.open('')
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
          this.$refs.form.validate(valid=>{
             if(!valid){
               this.$message.warning("校验未通过");
          return;
            }
 try{
   this.$http
            .put("/ecc/device", this.EditTerminalsform)
            .then(res => {
              if (res.data.errcode =="0") {
                this.$message.success("修改终端成功！");
                // console.log(this.EditTerminalsform)
          this.editTerminalsDialog=false;
          this.terminalManage();
              } else {
                this.$message.error("修改终端失败！");
                this.editTerminalsDialog=false;
              }
            })
            .catch(res => {
              this.$message.error("修改终端操作出现问题了！");
            });}
            catch(error){
          this.$message.error("请求发送失败");
}
          })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
                   this.$refs.form.resetFields();
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
       this.$http
        .get("/ecc/auth/manager")
        .then(res => {
          if (res.data.errcode !== "0") {
            this.$message.warning("对不起，您没有此权限！");
          } else {
            this.$http.get('/ecc/terminal/open/all')
            .then(res=>{
              this.totalSuccess=res.data.total
 this.$confirm('正在启动应急终端端口，请等待<span class="loading"></span>', '一键式启动应急终端端口中', {
          cancelButtonText: '关闭弹框',
          type: 'warning',
          dangerouslyUseHTMLString:true,
          showConfirmButton:false,
          center: true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已关闭一键式启动应急终端端口弹框'
          });
        });
if(res.data.errcode =="0"){
 this.succeedDialogVisible=true;
  // this.$message({
  //         dangerouslyUseHTMLString: true,
  //         type:'success',
  //         message: '<strong>这是 <i>HTML</i> 片段</strong>'
  //       });
}else{
  this.$message.error("一键式应急开启失败！")
}
            })
            .catch(res=>{
              this.$message.error("访问失败！")
            })
      // this.emergencyOnDialogVisible = true;
      
          }
        })
        .catch(res => {
          this.$message.error("访问失败！");
        });
    },
    // 一键应急端口关闭
    emergencyOnekeyOff() {
        this.$http
        .get("/ecc/auth/manager")
        .then(res => {
          if (res.data.errcode !== "0") {
            this.$message.warning("对不起，您没有此权限！");
          } else {
             this.$http.get('/ecc/terminal/close/all')
             .then(res=>{
               this.totalSuccessOff=res.data.total
 this.$confirm('正在关闭应急终端端口，请等待<span class="loading"></span>', '一键式关闭应急终端端口中', {
          cancelButtonText: '关闭弹框',
          type: 'warning',
          dangerouslyUseHTMLString:true,
          showConfirmButton:false,
          center: true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已关闭一键式关闭应急终端端口弹框'
          });
        });
        if(res.data.errcode =="0"){
 this.succeedOffDialogVisible =true;
}else{
  this.$message.error("一键式应急关闭失败！")
}
             })
          // this.emergencyOffDialogVisible = true;
          }
        })
        .catch(res => {
          this.$message.error("访问失败！");
        });
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
          this.totalNum=res.data.total
          for(let i=0;i<this.tableData.length;i++){
             this.portList.push(this.tableData[i].switch_port);
          }
          this.terminalList = list1;
        })
        .catch(res => {
          this.$message.error("数据获取失败");
         this.loading=false;
        });
    },
    // 刷新数据
    refreshData(){
    this.newTime=new Date()

    console.log(this.newTime)
    this.$http.get('/ecc/terminal/real/data')
    .then(res => {
          this.loading = false;
          let list1 = res.data.data;
          this.tableData = list1;
          this.$message.success("数据刷新成功！")
           })
      

    },
    // 确认开关端口
    confirmPortOnOff(){
  this.$confirm("确认对端口进行此操作？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(this.timeRange,"kkk")
          if(this.timeRange=="" && this.portStatus=="on" && this.pickTime=='选择时间段'){
            this.$message.warning("请选择开启端口的时间段!")
          }else{
      var obj1={
      status:this.portStatus,
      available_time:this.pickTime,
      switch_ip:this.switch_ip,
      terminal_ip:this.terminal_ip,
      location:this.location,
      switch_name:this.switch_name,
      switch_port:this.switch_port,
      terminal_type:this.terminal_type
    }
             var obj2={
      status:this.portStatus,
      available_time:this.timeRange,
      switch_ip:this.switch_ip,
      terminal_ip:this.terminal_ip,
      location:this.location,
      switch_name:this.switch_name,
      switch_port:this.switch_port,
      terminal_type:this.terminal_type
    }
    if(this.pickTime=='选择时间段'){
      this.$http.put('/ecc/terminal',obj2)
    .then(res=>{
        if (res.data.errcode !== "0") {
            this.$message.error("端口操作失败！");
          } else {
            this.$message.success("端口操作成功！");
            this.portOnOffDialogVisible=false
            this.loadData()
            console.log(obj2)
          }
    })
     .catch(res=>{
      this.$message.error("访问失败！")
    })
          }
          else{
              this.$http.put('/ecc/terminal',obj1)
    .then(res=>{
        if (res.data.errcode !== "0") {
            this.$message.error("端口操作失败！");
          } else {
            this.$message.success("端口操作成功！");
            this.portOnOffDialogVisible=false
            this.loadData()
            console.log(obj1)
          }
    })
    .catch(res=>{
      this.$message.error("访问失败！")
    })
          }
    }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消对端口进行此操作"
          });
        });
    },
    // 端口开启关闭弹框
    portManage(terminal_ip,location,terminal_type,switch_name,switch_ip,switch_port, status) {
      this.timeRange=""
      this.$http.get('/ecc/auth/manager')
.then(res=>{
  if(res.data.errcode !=='0'){
         this.$message.warning("对不起，您没有此权限！");
  }else{
     this.portOnOffDialogVisible = true;
      this.switch_port=switch_port;
      this.portStatus=status;
       this.terminal_ip=terminal_ip;
       this.location=location;
       this.terminal_type=terminal_type;
       this.switch_name=switch_name;
       this.switch_ip=switch_ip;
  }
})
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
        .refresh{
            top: -32px;
            width: 33px;
            right: -941px;
            height: 34px;
            background-color: #35b7ce;
            border-radius: 25%;
            position: relative;
            .el-icon-refresh:before {
            content: "\e6d0";
            position: absolute;
            top: 9px;
            right: 8px;
        }
          }
        .oprations_btns {
            width: 653px;
            margin-left: -13px;
          margin-left: -14px;
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
          .downLog{
             background-color: rgb(218, 140, 76);
            border: 1px solid rgb(218, 140, 76);
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
      /deep/.el-select {
     display: inline;
    position: relative;
}
  .addBtns {
    text-align: right;
    margin-right: 61px;
    color: white;
  }
  .multiUpload{
float:left;
  }
  .search_box {
      margin-left: 989px;
    margin-top: -69px;
    width: 300px;
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
  .box-card{
.center_pos{
  position:relative;
  top:20px;
  margin-left: 18px;
}

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
.loading:after {
overflow: hidden;
display: inline-block;
vertical-align: bottom;
animation: ellipsis 2s infinite;
content: "\2026";
}
@keyframes ellipsis {
from {
width: 2px;
}
to {
width: 15px;
}
}
</style>