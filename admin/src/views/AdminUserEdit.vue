<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item> 
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    //组件属性
    id: {},
  },
  data() {
    return {
      model: {},
      parents: [],
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/admin_users", this.model);
      }
      console.log(res);
      // 这里没有添加rest前缀是因为是路径跳转页面，跳转页面后会自动刷新数据
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功!",
      });
    },
    async fetch() {
      //和新建分类公用同一个页面的优点，双向绑定model
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    //当跳入页面时，id存在时才fetch
    this.id && this.fetch();
  },
};
</script>