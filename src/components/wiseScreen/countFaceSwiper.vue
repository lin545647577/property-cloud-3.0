<template>
  <div>
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in imgList" :key="index">
          <el-avatar :size="66" :src="item"></el-avatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
export default {
  name: "countFaceSwiper",
  props: {
    imgList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      // imgList: [
      //   "http://testwx.tank-light.com/profile/upload/2021/10/24/2021_10_24_19_15_20_467d7b16-a2c5-4e42-aacc-f44e1d9e57d8.jpg",
      //   "http://testwx.tank-light.com/profile/upload/2021/10/24/2021_10_24_18_36_15_821d6b6f-69fa-48d9-9b2a-e7b8c6ba307b.jpg",
      //   "http://testwx.tank-light.com/profile/upload/2021/10/24/2021_10_24_18_34_29_cb27b9dc-ddc3-4f1b-b214-e2e46de89144.jpg",
      //   "http://testwx.tank-light.com/profile/upload/2021/10/24/2021_10_24_09_55_46_80222bcc-d4e9-4de1-82d0-c7c8f6215706.jpg",
      // ],
      swiperBox: null,
    };
  },
  methods: {},
  mounted() {
    this.swiperBox = new Swiper(".mySwiper", {
      slidesPerView: 4,
      spaceBetween: 3,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  //background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide /deep/ .el-avatar > img {
  width: 100%;
}
</style>
