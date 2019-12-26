<!--  -->
<template>
  <div class="el_body">
    <div class="form">
      <el-form
        label-width="120px"
        :rules="rules"
        ref="form"
        inline
        style="margin:10px;width:auto;"
        :model="sizeForm"
      >
        <el-form-item label="事件类别">
          <el-input disabled v-model="sizeForm.INC_CATEGORY"></el-input>
        </el-form-item>
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
          <!-- <el-input v-model="sizeForm.involved"></el-input> -->
        </el-form-item>
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

          <!-- <el-input v-model="sizeForm.influence"></el-input> -->
        </el-form-item>
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
          <!-- <el-input v-model="sizeForm.solved"></el-input> -->
        </el-form-item>

        <div class="position_adjustify">
          <span class="style_adjustify">系统架构冗余或高可用方式解决</span>
          <el-form-item label="">
            <el-select class="adjust" v-model="sizeForm.SOL_DEGREE">
              <el-option
                v-for="item in highWay"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!-- <el-input v-model="sizeForm.betterWay"></el-input> -->
          </el-form-item>
        </div>
        <div class="position_adjustify">
          <span class="style_adjustify2">是否涉及人行票交所托管系统</span>

          <el-form-item label="">
            <el-select class="adjust2" v-model="sizeForm.ISPJS">
              <el-option
                v-for="item in ticketArea"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!-- <el-input v-model="sizeForm.renhang"></el-input> -->
          </el-form-item>
        </div>

        <el-form-item label="解决途径">
          <!-- <el-input v-model="sizeForm.way"></el-input> -->
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

        <el-form-item label="影响情况" prop="AFFECT_SITUATION">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入影响情况"
            v-model="sizeForm.AFFECT_SITUATION"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="添加处理内容" prop="DEAL_NOTE">
          <div style="margin: 20px 0;"></div>
          <el-input
            type="textarea"
            autosize
            placeholder="请输入处理内容"
            v-model="sizeForm.DEAL_NOTE"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="问题原因" prop="INC_REASON">
          <div style="margin: 20px 0;"></div>
          <el-input
            type="textarea"
            autosize
            placeholder="请输入问题产生原因"
            v-model="sizeForm.INC_REASON"
          >
          </el-input>
        </el-form-item>

        <div class="deal_btns">
          <el-button type="primary" @click="onSubmit('sizeForm')"
            >确认处理</el-button
          >
          <el-button type="info" @click="goback()">取消处理</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  data() {
    return {
      sizeForm: {
        LAYER_LIST: "网络层面",
        IS_AFFECT_BUSINESS: "",
        SOL_DEGREE: "",
        ISPJS: "否",
        INC_CATEGORY: "生产故障事件",
        RESOLVE_CHANNEL: "",
        ISHIGHAVAILABLE: "否",
        AFFECT_SITUATION: "",
        DEAL_NOTE: "",
        INC_REASON: ""
      },

      rules: {
        INC_REASON: [
          { required: true, message: "问题原因不能为空", trigger: "blur" }
        ],
        DEAL_NOTE: [
          { required: true, message: "添加处理内容不能为空", trigger: "blur" }
        ],
        AFFECT_SITUATION: [
          { required: true, message: "填写影响情况不能为空", trigger: "blur" }
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
      value1: "否",
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
      value2: "完全解决",
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
      value3: "否",
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
      value4: "否",
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
      value5: "无需继续处理",
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
      value6: "网络层面"
    };
  },
  methods: {
    onSubmit(from) {
      this.$http.post("/api/deal", this.sizeForm).then(res => {
        // 处理成功
        this.$message({
          message: "处理成功",
          type: "success"
        });
        this.$emit("update");
      });
    },
    goback() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

.el_body {
  border: 5px solid #9eaca6;
  border-radius: 3%;
  height: 1190px;

  .deal_wrapper {
    height: 100%;
    background: #eee;
    padding: 20px 50px;
    // border:1px solid blue;
    width: 100%;
    height: 1290px;
  }
}
.el-main {
  overflow: hidden;
}

/deep/.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  width: 200px;
}
/deep/.el-form--inline .el-form-item {
  display: inline-block;
  margin-right: 116px;
  vertical-align: top;
}
.form {
  height: 100%;
  width: 1200px;
  border: 1px solid black;
  position: absolute;
  top: 133px;
  left: 273px;
  .position_adjustify {
    width: 500px;
    float: left;
    display: flex;
    height: 78px;
    // border: 1px solid black;
    .style_adjustify {
      font-size: 14px;
      color: #606266;
      width: 242px;
      margin-right: -47px;
      position: absolute;
      top: 159px;
      left: 39px;
    }
    .style_adjustify2 {
      font-size: 14px;
      color: #606266;
      width: 242px;
      margin-right: -47px;
      position: absolute;
      top: 159px;
      left: 495px;
    }
  }
  .adjust {
    position: absolute;
    top: 10px;
    left: 273px;
    width: 210px;
  }
  .adjust2 {
    position: absolute;
    top: 10px;
    left: 214px;
    width: 210px;
  }
  .deal_btns {
    width: 400px;
    position: absolute;
    top: 408px;
    left: 359px;
  }
}
</style>