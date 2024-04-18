<template>
  <el-card
    class="box-card card-box"
    v-if="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-spinner="2"
  >
    <el-row class="item" id="text">
      <el-col :span="24" class="header-title">
        <img :src="pointImg" fit="fill" />
        导航路线
      </el-col>
      <el-col :span="24">
        <div style="height: 150px">
          <el-timeline>
            <el-timeline-item :timestamp="origin" size="large" type="primary">
              起点
            </el-timeline-item>
            <el-timeline-item
              :timestamp="destination"
              size="large"
              type="primary"
              color="#0bbd87"
            >
              终点</el-timeline-item
            >
          </el-timeline>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top: 14%">
        <h1 style="font-size: 18px; font-weight: 600; margin-bottom: 10px">
          具体线路
        </h1>
      </el-col>
      <el-col :span="24">
        <div style="height: 390px; margin-bottom: 24px">
          <div class="my-scrollbar" style="overflow: auto; height: 100%">
            <el-timeline>
              <el-timeline-item :timestamp="origin" size="large" type="primary">
                起点
              </el-timeline-item>
              <el-timeline-item
                v-for="(activity, index) in routeExplain"
                :key="index"
                :timestamp="activity.explain"
              >
                步行{{ activity.distance }}米
              </el-timeline-item>
              <el-timeline-item
                :timestamp="destination"
                size="large"
                type="primary"
                color="#0bbd87"
              >
                终点</el-timeline-item
              >
            </el-timeline>
            <!-- <el-steps direction="vertical" :space="70">
              <el-step
                title="起点"
                status="finish "
                :description="origin"
              ></el-step>
              <el-step
                v-for="(item, index) in routeExplain"
                :key="index"
                :title="'步行' + item.distance + '米'"
                :description="item.explain"
                status="process "
              ></el-step>

              <el-step
                title="终点"
                status="error "
                :description="destination"
              ></el-step>
            </el-steps> -->
          </div>
        </div>
      </el-col>
      <div v-if="loadingnew">
        <el-card class="qr-box">
          <div class="box-card">
            <i
              class="el-icon-circle-close"
              style="position: absolute; right: 10%; top: -16%; font-size: 40px"
              @click="loading = false"
            ></i>
            <img :src="urlnew" alt="" />
            <p>扫码发送手机</p>
            <div id="triangle"></div>
          </div>
        </el-card>
      </div>

      <!-- <el-col :span="24">
        <div></div>
      </el-col> -->
    </el-row>
  </el-card>
</template>


<script>
// import vuescroll from "vuescroll";

export default {
  name: "sideCard",
  components: {
    // vuescroll: vuescroll,
  },
  props: {
    loading: {
      type: Boolean,
    },
    origin: {
      type: String,
    },
    destination: {
      type: String,
    },
    routeExplain: {
      type: Array,
    },
    urlnew: {
      type: String,
    },
  },
  data() {
    return {
      pointImg: require("@/assets/img/wiseScreen/2.0/point.png"),
      loadingnew: true,
      ops: {
        bar: {
          keepShow: true,
          background: "#1993fc",
        },
      },
    };
  },
  methods: {
    loadingclick() {
      this.loadingnew = false;
      // generateUrlQrc().then(res=>{
      //   console.log(res);
      // })
    },
  },
  mounted() {},
};
</script>

<style scoped>
.card-box {
  height: calc(100vh - 2px);
  position: relative;
  z-index: 100;
}

.card-box .header-title {
  font-size: 24px;
  color: #343f5e;
  margin: 10px 0 40px 0;
}
.card-box .header-title * {
  vertical-align: middle;
}
.qr-box {
  background-color: #1993fc;
  width: 90%;
  z-index: 3000;
  border: none;
  color: #e5edff;
  font-size: 26px;
  text-align: center;
  margin-top: 5%;
}
.qr-box img {
  width: 70%;
  height: 100%;
}
.card-box #triangle {
  position: absolute;
  left: 45%;
  bottom: -49px;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 50px solid #1993fc;
}
.item /deep/ .el-timeline-item__node--large {
  left: 0;
}

/* 设置滚动条的样式 */
.my-scrollbar::-webkit-scrollbar {
  width: 8px;
  background: rgba(146, 161, 183, 0.3);
  border-radius: 10px;
}

/* 滚动条滑块 */
.my-scrollbar::-webkit-scrollbar-thumb {
  background-image: linear-gradient(90deg, #90ccfe 0%, #1b96fe 100%);
  border-radius: 10px;
}
</style>
