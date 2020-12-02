<template>
  <div class="login-container">
    登录注册页面

    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="handleClick"
      class="login-tabs"
      stretch
    >
      <!-- 登录界面的 -->
      <el-tab-pane label="登录" name="login">
        <el-form
          :model="user"
          status-icon
          :rules="rules"
          ref="loginForm"
          class="login-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              type="text"
              v-model="user.username"
              autocomplete
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="user.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 注册界面的 -->
      <el-tab-pane label="用户注册" name="register">
        <el-form
          ref="registerForm"
          :model="user"
          status-icon
          :rules="rules"
          class="login-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="surePassword">
            <el-input type="password" v-model="user.surePassword"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitRegForm('registerForm')"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from "../api";
import jwt from "jwt-decode";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Login",

  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      if (value.length <= 3) {
        callback(new Error("长度不够"));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };

    var validateSurePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };

    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      }
      callback();
    };
    return {
      activeName: "login",
      user: {
        username: "",
        password: "",
        surePassword:'',
        email:''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        surePassword: [{ validator: validateSurePassword, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
    };
  },



  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    handleClick(tab) {
      console.log(tab.name);
    },

    // 点击提交请求登录接口
    submitForm() {
      console.log(this.activeName);
      console.log(this.user);
      api
        .getLogin({
          username: this.user.username,
          password: this.user.password,
        })
        .then((res) => {
          console.log(res.data);
          console.log(jwt(res.data));
          if (res.status == 200) {
            this.setUser({
              username: jwt(res.data).username,
              token: res.data,
            });
            // 数据存在本地，永久存储
            localStorage.setItem('ego',res.data)
            this.$router.push("/");
          } else {
            console.log("登陆失败");
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error(error.data.errors)
        });
    },

    // 注册
    submitRegForm(){
      console.log('注册按钮');
      api.getRegister({
        username:this.user.username,
        password:this.user.password,
        email:this.user.email
      }).then(res=>{
        if(res.status==200){
          this.$message.success(res.data.msg)
        }
      }).catch(error=>{
        this.$message.error(error.data.msg)
      })
    }
  },
};
</script>

<style scoped lang="less">
.login-container {
  width: 500px;
  margin: 0 auto;
  margin-top: 100px;
  .login-form {
    padding: 40px 40px;
  }
  h3 {
    margin-top: 20px;
  }
  .login-tabs {
    border-radius: 5px;
  }
}
</style>