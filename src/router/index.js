import Vue from "vue";
import VueRouter from "vue-router";
import LiLayoutWiseScreen from "tanklight-vue/dist/LiLayoutWiseScreen.js";

Vue.use(VueRouter);

import LiLayoutAdmin from "tanklight-vue/dist/LiLayoutAdmin";
import LiLayoutProperty from "tanklight-vue/dist/LiLayoutProperty";
// import LiLayoutWiseScreen from "tanklight-vue/dist/LiLayoutWiseScreen.js";

/* Router Modules - ZhongLi */
import wiseScreenRouter from "./modules/wiseScreenRouter";
import testRouter from "./modules/testRouter";

const routes = [
  // testRouter,
  {
    path: "/login", // 页面路径
    component: () => import("@/views/Login/index.vue"), // 页面路径
  },

  {
    path: "/count", // 数据统计面板
    component: () => import("@/views/count/index.vue"), // 页面路径
  },

  /** Load Router Modules - ZhongLi */
  // wiseScreenRouter,

  // {
  //   path: "/test", // 页面路径
  //   redirect: "/testForm", // 重定向
  //   component: LiLayoutProperty, // 使用 TankLightVue 框架中的 LiLayoutAdmin 布局
  //   meta: {
  //     title: "自定义", // 菜单名称｜String
  //     icon: "el-icon-menu", // 菜单图标类名，与 ElementUI 的 icon 一致 ｜ String
  //     group: true, // 是否是分组菜单，如果是分组请配置 children｜Boolean，不配置则默认 false
  //     hidden: false, // 是否在左侧菜单隐藏该项｜Boolean，不配置则默认 false
  //     hiddenBreadcrumb: false, // 是否在面包屑隐藏该项｜Boolean，不配置则默认 false
  //     hiddenTagView: false, // 是否在打开历史窗口隐藏该项｜Boolean，不配置则默认 false
  //   },
  //   children: [
  //     {
  //       path: "/testForm", // 页面路径
  //       component: () => import("@/views/temp/index.vue"), // 页面路径
  //       meta: {
  //         title: "公告信息", // 菜单名称｜String
  //         icon: "el-icon-menu", // 菜单图标类名，与 ElementUI 的 icon 一致 ｜ String
  //         group: false, // 是否是分组菜单，如果是分组请配置 children｜Boolean，不配置则默认 false
  //         hidden: false, // 是否在左侧菜单隐藏该项｜Boolean，不配置则默认 false
  //         hiddenBreadcrumb: false, // 是否在面包屑隐藏该项｜Boolean，不配置则默认 false
  //         hiddenTagView: false, // 是否在打开历史窗口隐藏该项｜Boolean，不配置则默认 false
  //       },
  //     },
  //     // ...... 可一直循环下去
  //   ],
  // },

  {
    path: "/wisdom-oriented",
    redirect: "/wisdom-oriented/development",
    component: LiLayoutWiseScreen,
    children: [
      {
        path: "/wisdom-oriented/home", //首页
        component: () => import("@/views/wiseScreen/index.vue"),
      },
      {
        path: "/wisdom-oriented/checkIn", //来访登记
        component: () => import("@/views/wiseScreen/checkIn/index.vue"),
      },
      {
        path: "/wisdom-oriented/suggest", //投诉建议
        component: () => import("@/views/wiseScreen/suggest/index.vue"),
      },
      {
        path: "/wisdom-oriented/notice", //公告信息
        component: () => import("@/views/wiseScreen/notice/index.vue"),
      },
      {
        path: "/wisdom-oriented/notice/detail", //公告信息详情
        component: () => import("@/views/wiseScreen/notice/detail.vue"),
      },
      {
        path: "/wisdom-oriented/question", //常见问题
        component: () => import("@/views/wiseScreen/question/index.vue"),
      },
      {
        path: "/wisdom-oriented/guide", //办事指南
        component: () => import("@/views/wiseScreen/guide/index.vue"),
      },
      {
        path: "/wisdom-oriented/guide/detail", //办事指南详情
        component: () => import("@/views/wiseScreen/guide/detail.vue"),
      },
      {
        path: "/wisdom-oriented/rent", //物业租赁
        component: () => import("@/views/wiseScreen/rent/index.vue"),
      },
      {
        path: "/wisdom-oriented/rent/detail", //物业租赁详情
        component: () => import("@/views/wiseScreen/rent/detail.vue"),
      },
      {
        path: "/wisdom-oriented/building", //楼层索引
        component: () => import("@/views/wiseScreen/building/index.vue"),
      },
      {
        path: "/wisdom-oriented/appointment", //园区预约
        component: () => import("@/views/wiseScreen/appointment/index.vue"),
      },
      {
        path: "/wisdom-oriented/Location", //园区寻路
        component: () => import("@/views/wiseScreen/location/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  /* 智慧向导布局组件配置 */
  LiLayoutWiseScreenConfig: {
    /* 菜单栏展示的页面 */
    pageHome: {
      path: "/wisdom-oriented/home", // 页面路径
      title: "首页", // 标题
      icon: "el-icon-s-home", // 图标
      layout: "full", // 布局方式， full全屏 nav带左侧导航栏
    },
    pageList: [
      {
        path: "/wisdom-oriented/home", // 页面路径
        title: "首页", // 标题
        icon: "el-icon-s-home", // 图标
        layout: "full", // 布局方式， full全屏 nav带左侧导航栏
        hidden: true,
      },
      {
        path: "/wisdom-oriented/Location",
        title: "园区寻路",
        icon: "el-icon-location-outline",
        layout: "nav",
      },
      {
        path: "/wisdom-oriented/checkIn",
        title: "来访登记",
        icon: "el-icon-user-solid",
        layout: "nav",
      },
      {
        path: "/wisdom-oriented/building",
        title: "楼层索引",
        icon: "el-icon-s-flag",
        layout: "nav",
      },
      {
        path: "/wisdom-oriented/question",
        title: "咨询服务",
        icon: "el-icon-s-comment",
        layout: "nav",
      },
      {
        path: "/wisdom-oriented/appointment",
        title: "场地预约",
        icon: "el-icon-s-shop",
        layout: "nav",
      },

      {
        path: "/wisdom-oriented/notice/detail",
        title: "公告信息详情",
        icon: "el-icon-message-solid",
        layout: "nav",
        hidden: true,
      },
      {
        path: "/wisdom-oriented/guide",
        title: "办事指南",
        icon: "el-icon-s-management",
        layout: "nav",
      },
      {
        path: "/wisdom-oriented/guide/detail",
        title: "办事指南详情",
        icon: "el-icon-s-management",
        layout: "nav",
        hidden: true,
      },
      {
        path: "/wisdom-oriented/notice",
        title: "公告信息",
        icon: "el-icon-message-solid",
        layout: "nav",
      },
      {
        path: "/wisdom-oriented/rent/detail",
        title: "物业租赁详情",
        icon: "el-icon-s-check",
        layout: "nav",
        hidden: true,
      },

      {
        path: "/wisdom-oriented/rent",
        title: "物业租赁",
        icon: "el-icon-s-check",
        layout: "nav",
      },
      {
        path: "/wisdom-oriented/suggest",
        title: "投诉建议",
        icon: "el-icon-s-order",
        layout: "nav",
      },
    ],
  },
});

export default router;
