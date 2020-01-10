<template>
  <div id="app">
    <el-container>
      <!--这是头部  -->
      <el-header class="el_head">
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <div class="logo_box">
                <a href="/" class="layout-logo">
                  <svg class="logo" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(0.5,0,0,0.5,20,30)">
                      <path
                        d="m 0,0 0,-4.426 14.363,0 0,13.28 -8.834,0 0,4.427 8.834,0 0,13.295 -14.363,0 0,-4.43 9.93,0 0,-4.437 -8.852,0 0,-13.283 8.852,0 L 9.93,0 0,0 z m -25.533,11.062 c 0,13.442 10.904,24.356 24.353,24.356 13.446,0 24.352,-10.914 24.352,-24.356 0,-13.447 -10.906,-24.353 -24.352,-24.353 -13.449,0 -24.353,10.906 -24.353,24.353 m -4.461,0 c 0,15.917 12.892,28.809 28.814,28.809 15.918,0 28.819,-12.892 28.819,-28.809 0,-15.917 -12.901,-28.814 -28.819,-28.814 -15.922,0 -28.814,12.897 -28.814,28.814 m 27.76,11.096 0,4.428 -14.381,0 0,-13.287 8.812,0 0,-4.432 -8.812,0 0,-13.285 14.381,0 0,4.428 -9.955,0 0,4.426 8.851,0 0,13.295 -8.851,0 0,4.427"
                        style="fill:#cb0202;fill-opacity:1;fill-rule:evenodd;stroke:none"
                      ></path>
                    </g>
                  </svg>
                  <span class="logo-text">ECC公用终端端口管理工具</span>
                </a>
              </div>
            </div>
          </el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <div class="head-right">
                <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#030120"
                  text-color="white"
                  active-text-color="white"
                >
                  <el-menu-item
                    v-if="!$root.Hub.username"
                    index="1"
                  >
                    <i class="el-icon-user-solid"></i>
                    未登录
                  </el-menu-item>
                  <el-submenu v-else index="2">
                    <template slot="title" class="login_text">
                      <i class="el-icon-user-solid"></i>
                      {{ $root.Hub.username }}{{$root.Hub.department}}
                    </template>
                    <el-menu-item index="2-1" @click="logout"
                      >退出登录</el-menu-item
                    >
                  </el-submenu>
                </el-menu>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <div class="deal_wrap">
        <el-main>
          <router-view></router-view>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .el_head {
    width: 100%;
    height: 64px;
    line-height: 64px;
    background: #030120;
    // background: linear-gradient(to left, #9eaca6, rgb(184, 184, 202), #d8d8db);
    border-radius: 5px;
    /deep/.el_main {
      padding: 4px;
    }
    .logo_box {
      text-indent: 3px;
      font-size: 14px;
      .layout-logo {
        text-decoration: none;
        font-size: 24px;
        color: #a6afb8;
        font-weight: 700;
        font-family: freight-display-pro;

        height: 64px;
        position: relative;
        line-height: 60px;
        margin: 0 50px 0 10px;
        float: left;

        .logo {
          width: 40px;
          height: 55px;
          vertical-align: middle;
          margin-top: -18px;
        }
        .logo-text {
          width: 110px;
          font-size: 20px;
          font-weight: bold;
          color: white;
          letter-spacing: 4px;
          &:hover {
            color: rgb(192, 193, 194);
          }
        }
      }
    }
    .head-right {
      width: 104px;
      height: 57px;
      float: right;
      margin-right: 119px;
      .login_text {
        font-size: 18px;
        margin-left: 7px;
        cursor: pointer;
      }
      .el-icon-user-solid:before {
        content: "\e7a5";
        width: 107px;
        color: white;
        font-size: 18px;
      }

      .el-icon-user {
        margin-top: -3px;
        font-size: 24px;
        margin-right: 2px;
      }
    }
  }
  .deal_wrap {
    background: rgb(240, 241, 241);
    padding: 2px 2px;
    width: 100%;
    height: 100%;
  }
  .el-menu--collapse .el-menu .el-submenu,
  .el-menu--popup {
    min-width: 140px !important;
  }
}
</style>

<script>
import { getCookie } from "./utils/getCookie.js";
import { getUserInfo } from "./utils/getUserInfo.js";
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    login() {
      window.location.href = "/login?next=" + window.location.href;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      //弹出确认对话框
      //用户点击确认，跳回用户登录页面，清除token
      this.$confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message.success("退出登录成功！");
          window.location.href = "/logout?next=" + window.location.href;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  mounted() {
    document.cookie = "username=hjhhhhh";
    document.cookie = "department=数据中心网络一部";
    this.$root.Hub.username = getCookie("username");
    this.$root.Hub.department=getCookie("department")
    if (this.$root.Hub.username == "") {
     this.login()
    }
  }
};
</script>
