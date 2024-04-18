import LiLayoutWiseScreen from "tanklight-vue/dist/LiLayoutWiseScreen.js";

const wiseScreenRouter = {
  path: "/wiseScreen",
  redirect: "/wiseScreen/Location",
  component: LiLayoutWiseScreen,
  children: [
    {
      path: "/wiseScreen/home",
      component: () => import("@/views/wiseScreen/location/index.vue"),
    },
    {
      path: "/wiseScreen/Location",
      component: () => import("@/views/wiseScreen/location/index.vue"),
    },
  ],
};

export default wiseScreenRouter;
