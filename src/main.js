import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import AMap from "vue-amap";
Vue.use(AMap);
// 初始化地图
AMap.initAMapApiLoader({
  key: "f4cc813709ba44891435c6683a169783",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
  ], // 插件集合
});

import echarts from "echarts";
Vue.use(echarts);

/** 引入ElementUI */
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

/** 使用 TankLightVue */
import TankLightVue from "tanklight-vue";
import "tanklight-vue/dist/index.css";

import LiConfirmVisit from "../src/components/LiConfirmVisit/index.js";

Vue.use(TankLightVue, {
  ElementUI,
  loadView: (view) => {
    return (resolve) => require(["@/views/" + view], resolve);
  },
  store,
  router,
  custom: true, // 可选，当为 true 时，启用自定义配置，当为 true 时框架不会去调用后端配置
  whiteList: [
    "/wiseScreen/home",
    "/wisdom-oriented/Location",
    "/wisdom-oriented/home",
    "/wisdom-oriented/checkIn",
    "/wisdom-oriented/suggest",
    "/wisdom-oriented/notice",
    "/wisdom-oriented/notice/detail",
    "/wisdom-oriented/question",
    "/wisdom-oriented/guide/detail",
    "/wisdom-oriented/guide",
    "/wisdom-oriented/appointment",
    "/count",
  ],
  developComponents: [LiConfirmVisit],
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
