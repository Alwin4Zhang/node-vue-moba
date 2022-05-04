<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            :key="item._id"
            v-for="item in categories"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <!-- <el-form-item label="详情">
        <vue-editor 
        v-model="model.body"
        useCustomImageHandler 
        @image-added="handleImageAdded">
        </vue-editor>
      </el-form-item> -->
      <el-form-item label="详情2">
        <quill-editor
        v-model="model.body">
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    // VueEditor,
    quillEditor
  },
  props: {
    //组件属性
    id: {},
  },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }
      console.log(res);
      // 这里没有添加rest前缀是因为是路径跳转页面，跳转页面后会自动刷新数据
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功!",
      });
    },
    async fetch() {
      //和新建分类公用同一个页面的优点，双向绑定model
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // TODO:富文本编辑器上传图片有问题
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
  },
  created() {
    this.fetchCategories();
    //当跳入页面时，id存在时才fetch
    this.id && this.fetch();
  },
};
</script>