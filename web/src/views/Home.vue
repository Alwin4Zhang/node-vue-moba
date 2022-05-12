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
        <template #items="{ category }">
          <router-link
            tag="div"
            :to="`/articles/${news._id}`"
            class="py-2 fs-lg d-flex"
            v-for="(news, i) in category.newsList"
            :key="i"
          >
            <!--todo:new-category-news -->
            <span class="new-category new-category-news">{{
              news.categoryName
            }}</span>
            <span class="px-2">|</span>
            <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
              news.title
            }}</span>
            <span class="text-grey-1 fs-sm">{{ news.createAt | date }}</span>
          </router-link>
        </template>
      </m-list-card>

      <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
        <template #items="{ category }">
          <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
            <router-link 
            tag="div"
            :to="`heroes/${hero._id}`"
            class="p-2 text-center" 
            style="width:20%" 
            v-for="(hero, i) in category.heroList" :key="i">
              <img :src="hero.avatar" alt="" class="w-100">
              <div>{{ hero.name }}</div>
            </router-link>
          </div>
        </template>
      </m-list-card>
      <m-card icon="menu1" title="精彩视频"></m-card>
      <m-card icon="menu1" title="百态王者"></m-card>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
    name2type(val) {
      return { 热门: "" }; // 放在filter不合适，应该在循环数据中带出来在赋值给class name
    },
  },
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
      newsCats: [],
      heroCats: [],
    };
  },
  methods: {
    async fetchNewCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
      console.log(this.newsList);
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
  },
  created() {
    this.fetchNewCats();
    this.fetchHeroCats();
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
    // border-right: 1px solid $border-color;
    // &:nth-child(4n) {
    //   border-right: none;
    // }
  }
}

.new-category {
  border-radius: 0.05rem;
  padding: 0.02rem 0.04rem;
  border: 1px solid #f4be19;
  color: #f4be19;
  font-size: 0.2rem;
  margin-right: 0.05rem;
  vertical-align: bottom;
}

.new-category-match {
  border-color: #4d9cff;
  color: #4d9cff;
}

.new-category-news {
  border-color: #1e96ab;
  color: #1e96ab;
}

.new-category-notice {
  border-color: #f09a37;
  color: #f09a37;
}

.new-category-activity,
.new-category-hot {
  border-color: #ff3636;
  color: #ff3636;
}
</style>