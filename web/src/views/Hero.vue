<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 text-white px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <div class="text-white text-left">王者荣耀</div>
        <div class="ml-2 text-left">攻略站</div>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt; </router-link>
    </div>

    <div></div>
    <h1>{{ model.name }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data
    },
  },
  created() {
    this.fetch()
  },
};
</script>