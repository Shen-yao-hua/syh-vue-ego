<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/" exact>
      <i class="el-icon-menu"></i>{{ $t("message.project") }}</el-menu-item
    >
    <el-menu-item index="/params">
      <i class="el-icon-document"></i>{{ $t("message.params") }}</el-menu-item
    >
    <el-menu-item index="/content">
      <i class="el-icon-setting"></i>{{ $t("message.content") }}</el-menu-item
    >
    <div class="user">
      <router-link to="/ucenter" tag="span" class="user-name">{{
        user.username
      }}</router-link>
      <el-button class="logout" @click="logoutHandle">退出</el-button>
    </div>

    <!-- 语言环境选择 -->
    <el-menu-item class="set-lang">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          语言环境
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">英文</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
    
  </el-menu>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "HeadNav",
  data() {
    return {
      activeIndex: "/",
    };
  },
  computed: {
    ...mapState("loginModule", {
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapMutations("loginModule", ["logout"]),
    handleSelect() {},

    // 点击退出事件
    logoutHandle() {
      this.logout();
      this.$router.push("/login");
      // 点击退出清空本地数据
      localStorage.removeItem("ego");
    },

    handleCommand(command) {
      console.log(command);
      // 点击变更语言环境
      this.$i18n.locale = command
      // 对语言做个存储
      localStorage.setItem('lang',command)
    },
  },
};
</script>

<style scoped lang="less">
.user {
  float: right;
  margin-right: 20px;
  line-height: 60px;
  .user-name {
    color: #fff;
    margin-right: 10px;
    font-size: 15px;
    border: 1px solid #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    text-align: center;
  }
  .logout {
  }
}

.set-lang {
  float: right !important;
}

.el-dropdown-link {
  color: #fff;
}
</style>