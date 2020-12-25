<template>
  <div class="login-container">
    <div class="login-weaper animated bounceInDown">
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">登录</h4>
          <el-form
            class="login-form"
            :rules="loginRules"
            ref="loginForm"
            :model="loginForm"
            @keyup.enter.native="handleLogin()"
            label-width="0"
          >
            <el-form-item prop="username">
              <el-input
                size="small"
                v-model="loginForm.username"
                auto-complete="off"
                placeholder="用户名"
              >
                <i slot="prefix" class="el-icon-user"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                size="small"
                v-model="loginForm.password"
                :type="passwordType"
                auto-complete="off"
                placeholder="密码"
              >
                <i
                  class="el-icon-view el-input__icon"
                  slot="suffix"
                  @click="showPassword"
                ></i>
                <i slot="prefix" class="el-icon-lock"></i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                :loading="submitLoading"
                @click.native.prevent="handleLogin"
                class="login-submit"
              >
                确定
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      code: "",
      loginRules: {},
      language: "zh",
      passwordType: "password",
      submitLoading: false,
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  watch: {},
  created() {},
  mounted() {
    sessionStorage.clear();
    localStorage.clear();
    this.resetStore();
  },
  computed: {},
  methods: {
    // 重置store
    resetStore() {
      this.$store.commit("setNavTree", {});
    },
    // 是否展示密码
    showPassword() {
      this.passwordType == "text"
        ? (this.passwordType = "password")
        : (this.passwordType = "text");
    },
    // 登录
    handleLogin() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.submitLoading = true;

          this.$api.login.mLogin().then((res) => {
            this.submitLoading = false;
            if (res.code == 0) {
              this.$message({ message: "登录成功", type: "success" });
              // 缓存token
              console.log(res.data)
              localStorage.setItem("token", res.data.token); 
              this.$refs["loginForm"].resetFields();
              this.$store.commit("menuRouteLoaded", false); // 要求重新加载导航菜单
              this.$router.push("/"); // 登录成功，跳转到主页
            } else {
              this.$message({
                message: "登录失败, " + res.message,
                type: "error",
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
  @import "@/styles/login.scss";
</style>