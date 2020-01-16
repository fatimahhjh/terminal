<template>
  <div class="file-load">
    <el-upload
      class="upload-demo"
      ref="upload"
      :on-success="uploadSuccess"
      :action="submitUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small"  class="white_font" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        class="white_font"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">只能上传excecl文件</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ["submitUrl", "title", "offUploadTermDialog","offUploadStaffDialog", "upload_btn", "staffManage", "terminalManage"],
  data() {
    return {
      uploadbeha: false,
      fileList: []
    };
  },
  methods: {
    uploadSuccess(response) {
      let { errcode } = response;
      if (errcode == "0") {
        this.uploadbeha = true;
        this.$message({
          showClose: true,
          duration: 0,
          message: "上传成功",
          type: "success"
        });
        if (this.title == "批量上传新增终端") {
         this.offUploadTermDialog();
          this.terminalManage();
        } else {
          this.staffManage();
         this.offUploadStaffDialog();
        }
        //  文件上传成功
      } else {
        this.$message.error("数据库插入错误");
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>

<style lang="less">
.file-load {
  display: inline-block;
  margin: 0 10px;
}
.uploadStaff_btn {
  height: 28px;
  width: 130px;
  margin-right: -10px;
}
 /deep/.white_font span {
      color: white;
      font-size: 12px;
    }
.uploadTerms_btn {
  // background-color: rgb(236, 141, 69);
  // border: 1px solid rgb(236, 141, 69);
  height: 28px;
  width: 130px;
  margin-right: -10px;
}
</style>
