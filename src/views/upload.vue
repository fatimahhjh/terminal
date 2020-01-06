<template>
  <div class="file-load">
    <el-upload
      class="upload-demo"
      action
      ref="newupload"
      :auto-upload="true"
      accept=".xlsx, .xls"
      :show-file-list="false"
      content_type
      mutiplepart
      :http-request="upload"
    >
      <div class="uploadBtn">
        <el-tag effect="dark" :class="upload_btn">{{ title }}</el-tag>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ["submitUrl", "title", "upload_btn"],
  data() {
    return {
      uploadbeha: false
    };
  },
  methods: {
    upload(fileObj) {
      const formData = new FormData();
      formData.append("file", fileObj.file);
      // formData.append("type", fileObj.file.type);
      this.$http
        .request({
          url: this.submitUrl,
          method: "post",
          data: formData
        })
        .then(res => {
          let {
            data: { errcode }
          } = res;
          if (errcode == "0") {
            this.$message.success("上传成功");
            this.uploadbeha = true;
            //  文件上传成功
          } else {
            this.$message.error("数据库插入错误");
          }
        });
    }
  }
  // 文件失败
  // onError(response) {
  //   this.$message.error("文件上传失败");
  // }
};
</script>

<style lang="less">
.file-load {
  display: inline-block;
  margin: 0 10px;
}
.uploadStaff_btn {
  background-color: rgb(207, 155, 75);
  border: 1px solid rgb(207, 155, 75);
  margin-right: 19px;
}
.uploadTerms_btn {
  background-color: rgb(236, 141, 69);
  border: 1px solid rgb(236, 141, 69);
}
</style>
