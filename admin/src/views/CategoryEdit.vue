<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            :key="item._id"
            v-for="item in parents"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/categories", this.model);
      }
      console.log(res);
      // 这里没有添加rest前缀是因为是路径跳转页面，跳转页面后会自动刷新数据
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功!",
      });
    },
    async fetch() {
      //和新建分类公用同一个页面的优点，双向绑定model
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    },
  },
  created() {
    //当跳入页面时，id存在时才fetch
    this.id && this.fetch();
    this.fetchParents();
  },
};
</script>