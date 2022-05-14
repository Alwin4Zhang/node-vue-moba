<template>
  <div class="card bg-white p-3 mt-3">
    <div
      class="card-header d-flex ai-center pb-3 fs-bold"
      :class="{ 'border-bottom': !plain, 'pb-3': !plain }"
    >
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2 text-left">{{ title }}</div>
      <i class="iconfont icon-menu" v-if="!plain"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
      <!--插槽占位-->
    </div>
  </div>
</template> 

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  // .card-header {
  //   border-bottom: 1px solid $border-color;
  // }
  border-bottom: 1px solid $border-color;
}
</style>