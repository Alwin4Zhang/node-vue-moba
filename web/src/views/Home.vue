<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/hdp1.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/hdp2.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/hdp3.jpeg" alt="" />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3"
        slot="pagination"
      ></div>
    </swiper>
    <!--end-of-swiper-->
    <div
      class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1 text-bottom"
    >
      <div class="d-flex flex-wrap">
        <div
          class="nav-item mb-3"
          v-for="(label, className) in classNames"
          :key="className"
        >
          <i :class="className"></i>
          <div class="py-2">{{ label }}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-1"> </i>
        <span>收起</span>
      </div>
      <!--end of nav icons-->
      <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
        <!--子组件ListCard的值给父组件用于展示 -->
        <template #items="{category}">
          <div class="py-2" v-for="(news,i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
        </template>
      </m-list-card>
      <m-card icon="card-hero" title="英雄列表"></m-card>
      <m-card icon="menu1" title="精彩视频"></m-card>
      <m-card icon="menu1" title="百态王者"></m-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home",
        },
        autoplay: {
          delay: 2500,
        },
        disableOnInteraction: false,
      },
      classNames: {
        "sprite sprite-news": "爆料站",
        "sprite sprite-story": "故事站",
        "sprite sprite-shop": "周边商城",
        "sprite sprite-exp-serve": "体验服",
        "sprite sprite-fresh-man": "新人专区",
        "sprite sprite-reel-inherited": "荣耀·传承",
        "sprite sprite-wzyd": "王者营地",
        "sprite sprite-weixin": "公众号",
        "sprite sprite-version": "版本介绍",
        "sprite sprite-djhj": "对局环境",
        "sprite sprite-ipgc": "IP共创计划",
        "sprite sprite-cyhdy": "创意互动营",
      },
      newsCats:[
        {
          name:'热门',
          newsList: new Array(5).fill(1).map(v=>({ 
            categoryName:'公告',
              title:'1让声音被看到，KPL无障碍直播间5月8日春决上线，与你同战！',
              date:'05/06'
          }))
        },
        {
          name:'新闻',
          newsList: new Array(5).fill(1).map(v=>({
            categoryName:'新闻',
              title:'2让声音被看到，KPL无障碍直播间5月8日春决上线，与你同战！',
              date:'05/06'
          }))
        },
        {
          name:'新闻1',
          newsList: new Array(5).fill(1).map(v=>({
            categoryName:'新闻',
              title:'3让声音被看到，KPL无障碍直播间5月8日春决上线，与你同战！',
              date:'05/06'
          }))
        },
        {
          name:'新闻2',
          newsList: new Array(5).fill(1).map(v=>({
            categoryName:'新闻',
              title:'4让声音被看到，KPL无障碍直播间5月8日春决上线，与你同战！',
              date:'05/06'
          }))
        },
        {
          name:'新闻3',
          newsList: new Array(5).fill(1).map(v=>({
            categoryName:'新闻',
              title:'5让声音被看到，KPL无障碍直播间5月8日春决上线，与你同战！',
              date:'05/06'
          }))
        },
      ]
    };
  },
};
</script>
<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>