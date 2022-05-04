<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    };
  },
  methods: {
    afterUpload(res) {
      //显式赋值  this.model.url这种赋值时给vue添加的属性可能不会显示，需要用this.$set显式赋值
      this.$set(this.model, "icon", res.url);
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/items", this.model);
      }
      console.log(res);
      // 这里没有添加rest前缀是因为是路径跳转页面，跳转页面后会自动刷新数据
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功!",
      });
    },
    async fetch() {
      //和新建分类公用同一个页面的优点，双向绑定model
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    //当跳入页面时，id存在时才fetch
    this.id && this.fetch();
  },
};
</script>

<style>
</style>