<template>
  <div class="common-box">
    <!--    头部-->
    <el-row type="flex" class="row-bg" align="middle">
      <el-col :span="8">
        <div class="grid-content">
          <div class="header">
            <img style="margin: 0 15px 7px 0" :src="pointImg" alt="" />公告信息
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-autocomplete
            popper-class="my-autocomplete"
            prefix-icon="el-icon-search"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
            style="width: 100%"
            v-li-keyboard
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.theme }}</div>
              <!--              <span class="addr">{{ item.address }}</span>-->
            </template>
          </el-autocomplete>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content"><weather></weather></div>
      </el-col>
    </el-row>
    <!--    内容-->
    <div class="content-box">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content">
            <el-card class="box-card card-box">
              <p class="box-title">政策支持</p>
              <div class="cover-box">
                <p style="font-size: 48px">最新政策</p>
                <p>LATEST NEWS</p>
              </div>
              <div class="notice-box1">
                <div
                  v-for="item in policyList"
                  :key="item.id"
                  class="text item notice-item"
                >
                  <el-row
                    v-if="item"
                    :gutter="20"
                    style="margin: 0 0 30px 0"
                    @click.native="toDetail(item)"
                  >
                    <el-col :span="16">
                      <div class="grid-content">
                        <p class="title ellipsis">
                          {{ item.theme ? item.theme : "暂无信息" }}
                        </p>
                        <p class="time">{{ item.startDate }}</p>
                        <p class="ellipsis2">
                          {{ item.explain ? item.explain : "暂无信息" }}
                        </p>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content">
                        <div class="img-box">
                          <img
                            v-if="item.fileUrls"
                            :src="item.fileUrls"
                            alt=""
                          />
                          <img
                            v-else
                            :src="
                              require('@/assets/img/wiseScreen/2.0/notice/1.png')
                            "
                            alt=""
                          />
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-card class="box-card card-box">
              <p class="box-title">园区通知</p>
              <div class="text item">
                <el-row :gutter="20">
                  <el-col :span="9">
                    <div
                      class="grid-content"
                      style="position: relative; width: 100%"
                      @click="toDetail(noticeList[0])"
                      v-if="noticeList[0]"
                    >
                      <div style="width: 370px; height: 370px">
                        <img
                          v-if="noticeList[0].fileUrls"
                          :src="noticeList[0].fileUrls"
                          alt=""
                        />
                        <img
                          v-else
                          :src="
                            require('@/assets/img/wiseScreen/2.0/notice/2.png')
                          "
                          alt=""
                        />
                      </div>

                      <p class="cover-title ellipsis">
                        {{ noticeList[0].theme }}
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content notice-box2">
                      <el-row
                        :gutter="20"
                        v-for="item in noticeList"
                        :key="item.id"
                        style="margin: 0"
                        @click.native="toDetail(item)"
                      >
                        <el-col :span="20">
                          <div
                            class="grid-content"
                            style="font-size: 18px; color: #343f5e"
                          >
                            <p class="notice-p ellipsis">
                              <span class="circle"></span>
                              {{ item.theme ? item.theme : "暂无信息" }}
                            </p>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div
                            class="grid-content"
                            style="font-size: 16px; color: #989eb2"
                          >
                            <p class="notice-p">{{ item.startDate }}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>

            <el-row :gutter="20">
              <el-col :span="18">
                <div class="grid-content">
                  <el-card class="box-card card-box" style="height: 35vh">
                    <p class="box-title">安全须知</p>
                    <div class="text item notice-box3">
                      <el-row :gutter="20" style="margin: 0">
                        <el-col
                          :span="12"
                          v-for="item in securityList"
                          :key="item.id"
                        >
                          <div class="grid-content">
                            <p
                              class="ellipsis notice-p"
                              @click="toDetail(item)"
                            >
                              <span class="circle"></span>
                              {{ item.theme ? item.theme : "暂无信息" }}
                            </p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-card class="box-card card-box us-box">
                    <p class="box-title" style="color: #ffffff">
                      <img
                        style="margin: 0 15px 7px 0; width: auto; height: auto"
                        :src="pointImg"
                        alt=""
                      />联系我们
                    </p>
                    <div class="text item us-p">
                      <p>电话：0757-25654565</p>
                      <p>传真：0757-25658656</p>
                      <p>邮箱：77545452@163.com</p>
                      <el-button class="us-btn" @click="navigationClick"
                        ><i
                          class="el-icon-location"
                          style="margin-right: 20px"
                        ></i
                        >到这里去</el-button
                      >
                    </div>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { queryNoticeListByWiseScreen } from "@/api/notice.js";
import weather from "@/components/wiseScreen/weather";

export default {
  name: "notice",
  components: {
    weather,
  },
  data() {
    return {
      pointImg: require("@/assets/img/wiseScreen/2.0/point.png"),
      noticeList: [],
      policyList: [],
      securityList: [],
      state: "",
    };
  },
  methods: {
    /**
     * 跳转详细页面
     * @param item
     */
    toDetail(item) {
      // console.log(item);
      this.$router.push({
        path: "/wisdom-oriented/notice/detail",
        query: { id: item.id, type: item.type },
      });
    },
    // 初始化园区公告
    queryNoticeList() {
      queryNoticeListByWiseScreen({
        type: "1",
        status: 1,
      }).then((res) => {
        // console.log(res);
        this.noticeList = res.rows;
      });
    },
    // 初始化政策公告
    queryPolicyList() {
      queryNoticeListByWiseScreen({
        type: "2",
        status: 1,
      }).then((res) => {
        // console.log(res);
        this.policyList = res.rows;
      });
    },
    // 初始化安全公告
    querySecurityList() {
      queryNoticeListByWiseScreen({
        type: "3",
        status: 1,
      }).then((res) => {
        // console.log(res);
        this.securityList = res.rows;
      });
    },
    // 查询返回
    querySearch(queryString, cb) {
      if (!queryString) {
        cb([]);
      } else {
        queryNoticeListByWiseScreen({ theme: queryString, status: 1 }).then(
          (res) => {
            // console.log(res);
            cb(res.rows);
          }
        );
      }
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      // console.log(item);
      this.$Keyboard.keyboardHidden();
      this.toDetail(item);
    },
    // 用户点击到这里去
    navigationClick() {
      this.$router.push({
        path: "/wisdom-oriented/Location",
        query: {
          id: 1361,
          destination: "金融街园区",
        },
      });
    },
  },
  mounted() {
    this.queryNoticeList();
    this.queryPolicyList();
    this.querySecurityList();
  },
};
</script>

<style scoped>
.circle {
  display: inline-block;
  border-radius: 50%;
  background-color: #e5edff;
  width: 10px;
  height: 10px;
  margin-right: 10px;
}

.common-box {
  padding: 3% 4% 0 4%;
  max-height: 1080px;
  width: auto;
}

.card-box /deep/ img {
  width: 100%;
  height: 100%;
}

.common-box .header {
  font-size: 36px;
}

.common-box .content-box {
  padding: 0;
}

.common-box .content-box .el-card {
  border: none;
}

.common-box .content-box .card-box {
  border-radius: 20px;
  margin-top: 20px;
}

.notice-box1 {
  overflow: auto;
  height: 48.2vh;
}

.notice-box2 {
  overflow: auto;
  height: 33.3vh;
}

.notice-box3 {
  overflow: auto;
  height: 27vh;
}

/* 设置滚动条的样式 */
.notice-box1::-webkit-scrollbar,
.notice-box2::-webkit-scrollbar,
.notice-box3::-webkit-scrollbar {
  width: 8px;
  background: rgba(146, 161, 183, 0.3);
  border-radius: 10px;
}

/* 滚动条滑块 */
.notice-box1::-webkit-scrollbar-thumb,
.notice-box2::-webkit-scrollbar-thumb,
.notice-box3::-webkit-scrollbar-thumb {
  background-image: linear-gradient(90deg, #90ccfe 0%, #1b96fe 100%);
  border-radius: 10px;
}

.common-box .content-box .card-box .img-box {
  height: 143px;
  width: 100%;
}

.common-box .content-box .card-box .notice-item {
  color: #989eb2;
  font-size: 16px;
}

.common-box .content-box .card-box .notice-item .rows {
  margin: 0 0 30px 0;
}

.common-box .content-box .card-box .notice-item .title {
  color: #343f5e;
  font-size: 18px;
}

.common-box .content-box .card-box .notice-item .time {
  margin-bottom: 25px;
}

.common-box .content-box .card-box .notice-p {
  margin: 10px 0;
}

.cover-title {
  font-size: 22px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  padding: 5px 10px;
  width: 92.7%;
}

.common-box .content-box .card-box .cover-box {
  width: 100%;
  text-align: center;
  color: #ffffff;
  background-image: url("../../../assets/img/wiseScreen/2.0/notice/notice.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 10% 0;
  margin: 40px 0;
}

.common-box .content-box .card-box .box-title {
  color: #42a6f4;
  font-size: 28px;
  margin-bottom: 20px;
}

.common-box .content-box .us-box {
  height: 35vh;
  color: #ffffff;
  background-image: linear-gradient(90deg, #90ccfe 0%, #1b96fe 100%);
}

.common-box .content-box .us-box .us-p {
  margin-top: 30%;
}
.common-box .content-box .us-box .us-p p {
  margin: 10% 0;
}

.common-box .content-box .us-box .us-btn {
  width: 100%;
  margin-top: 20%;
  color: #1b96fe;
}

.common-box /deep/ .el-input--prefix .el-input__inner {
  border-radius: 20px;
  width: 100%;
}
</style>
