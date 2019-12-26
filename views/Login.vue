<!--  -->
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名区域 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.userName" placeholder="请输入用户名" prefix-icon="iconfont iconmine"></el-input>
        </el-form-item>
        <!-- 密码区域 -->
         <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="iconfont iconlock"
          type="password"></el-input>
        </el-form-item>
        <!-- button区域 -->
        <el-form-item class="btns">
        <el-button @click="login" type="primary">登录</el-button>
        <el-button @click="resetLoginForm" type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // 这是登录表单中绑定的数据对象
      loginForm:{
        userName:'',
        password:''
      },
      loginFormRules:{
        username:[
           { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 4, message: '长度大于4 个字符', trigger: 'blur' }
        ],
        password:[
           { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, message: '长度大于4 个字符', trigger: 'blur' }

        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 点击重置按钮重置登录表单
    resetLoginForm(){
this.$refs.loginFormRef.resetFields();
    },
    login(){
      this.$refs.loginFormRef.validate(valid=>{
        if(!valid) return;
       
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.btns{
  display:flex;
  justify-content: flex-end;
}
.login_form{
  position:absolute;
  bottom:0;
  width:100%;
  padding:0 20px;
  box-sizing:border-box;

}
</style>