import LiLayoutWiseScreen from "tanklight-vue/dist/LiLayoutWiseScreen.js";

const testRouter = {
  path: "/",
  component: LiLayoutWiseScreen,
  meta: { title: "默认页" },
  children: [
    {
      path: "/wiseScreen/Location",
      component: () => import("@/views/wiseScreen/location/index.vue"),
      meta: { title: "定位巡航" },
    },
  ],
};

export default testRouter;
