<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in menuList" :key="item.id">
          <div
            class="img-box"
            :style="{ 'background-image': 'url(' + item.backGroundImg + ')' }"
            @click="toPage(item.url)"
          >
            <p>{{ item.name }}</p>
            <p class="EN-name">{{ item.ENName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
export default {
  name: "swiperMenu",
  data() {
    return {
      menuList: [
        {
          id: 0,
          name: "园区寻路",
          ENName: "PARK NAVIGATION",
          backGroundImg: require("@/assets/img/wiseScreen/2.0/index/PARKNAVIGATION.png"),
          url: "/wisdom-oriented/Location",
        },
        // {
        //   id: 1,
        //   name: "车位寻路",
        //   ENName: "PARKING LOT",
        //   backGroundImg: require("@/assets/img/wiseScreen/2.0/index/PARKINGLOT.png"),
        //   url: "/wisdom-oriented/Location",
        // },

        {
          id: 9,
          name: "来访登记",
          ENName: "CHECK IN",
          backGroundImg: require("@/assets/img/wiseScreen/2.0/index/checkIn.png"),
          url: "/wisdom-oriented/checkIn",
        },
        {
          id: 5,
          name: "楼层索引",
          ENName: "BUILDING DIRECTORY",
          backGroundImg: require("@/assets/img/wiseScreen/2.0/index/BUILDINGDIRECTORY.png"),
          url: "/wisdom-oriented/building",
        },
        {
          id: 1,
          name: "咨询服务",
          ENName: "CONSULTING SERVICE",
          backGroundImg: require("@/assets/img/wiseScreen/2.0/index/CONSULTINGSERVICE.png"),
          url: "/wisdom-oriented/question",
        },
        {
          id: 2,
          name: "场地预约",
          ENName: "PARK RESERVATION",
          backGroundImg: require("@/assets/img/wiseScreen/2.0/index/PARKRESERVATION.png"),
          url: "/wisdom-oriented/appointment",
        },

        {
          id: 6,
          name: "办事指南",
          ENName: "SERVICE GUIDE",
          backGroundImg: require("@/assets/img/wiseScreen/2.0/index/SERVICEGUIDE.png"),
          url: "/wisdom-oriented/guide",
        },
        {
          id: 4,
          name: "公告信息",
          ENName: "NOTICE",
          backGroundImg: require("@/assets/img/wiseScreen/2.0/index/NOTICE.png"),
          url: "/wisdom-oriented/notice",
        },
        {
          id: 3,
          name: "物业租赁",
          ENName: "PROPERTY LEASING",
          backGroundImg: require("@/assets/img/wiseScreen/2.0/index/PROPERTYLEASING.png"),
          url: "/wisdom-oriented/rent",
        },

        {
          id: 7,
          name: "投诉建议",
          ENName: "COMPLANT",
          backGroundImg: require("@/assets/img/wiseScreen/2.0/index/COMPLANT.png"),
          url: "/wisdom-oriented/suggest",
        },
      ],
    };
  },
  methods: {
    toPage(url) {
      this.$router.push({ path: url });
    },
  },
  mounted() {
    new Swiper(".swiper-container", {
      slidesPerView: 4,
      spaceBetween: 20,
      centeredSlides: false,
      loop: true,
    });
  },
};
</script>

<style scoped>
.swiper-container {
  width: 90%;
  height: 100%;
  overflow: visible;
}
.swiper-slide {
  border-radius: 20px;
  text-align: left;
  color: #ffffff;
  font-size: 36px;
  background-color: #999999;
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
  transition: 300ms;
  transform: scale(0.8);
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1);
}

.img-box {
  padding: 40px;
  width: 100%;
  height: 20%;
  display: block;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.img-box .EN-name {
  font-size: 20px;
}
</style>
