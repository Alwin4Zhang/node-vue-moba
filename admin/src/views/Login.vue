<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      //sessionStorage表示关闭当前页面后就消失，localStorage表示暂存在浏览器中，下次打开还有
      localStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功",
      });
      // console.log(res.data);
    },
  },
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>

