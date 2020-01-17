<template>
  <div class="search-box">
    <i class="el-icon-search"></i>
    <!-- <input class="input-text" type="text" name id placeholder="请输入要查询的内容" v-model="filteStr"> -->
    <el-input
      v-model="filteStr"
      placeholder="请输入要查询的内容"
      clearable
    ></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filteStr: ""
    };
  },
  props: {
    // 将父组件的数据拿过来做筛选
    filterDataList: {
      type: Array
    }
  },
  watch: {
    filteStr: _.debounce(function(val) {
      this.getFilterData();
    }, 500),
    // 如果父组件的数据发生变化,重新调用
    filterDataList: {
      deep: true,
      handler: function(val) {
        this.getFilterData();
      }
    }
  },
  methods: {
    // 传对象,和关键字
    filteData(data, str) {
      return data.filter(item => {
        // 是否存在返回true
        return this.containsVal(item, str);
      });
    },
    // 查找对象里面是否存在关键字
    containsVal(obj, keyword) {
      let flag = false;
      for (var p in obj) {
        if (String(obj[p]).indexOf(keyword) >= 0) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    // 接收筛选出来的数据
    getFilterData() {
      this.list = this.filteData(this.filterDataList, this.filteStr);
      this.$emit("filteStr", this.filteStr);
      this.$emit("list", this.list);
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.search-box {
  border: 1px solid #eee;
  background-color: #f5f7f9;
  border-radius: 8px;
  margin-left: -100px;
  float: right;
  width: 261px;
  .el-icon-search:before {
    content: "\e778";
    position: absolute;
    top: 11px;
    right: 33px;
    z-index: 3;
  }
  .el-input__inner {
    vertical-align: middle;
    border: none;
    text-indent: 0.5rem;
    font-size: 14px;
    outline: none;
    background-color: #f5f7f9;
  }
}
</style>