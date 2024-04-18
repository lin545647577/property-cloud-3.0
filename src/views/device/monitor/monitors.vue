<template>
  <div>
    <div class="search-btn">
      <p v-if="pageSize == 1" style="padding-right: 50px">
        设备：
        <el-select
          v-model="cameraIdChoosed"
          placeholder="请选择"
          @change="getCamera"
        >
          <el-option
            v-for="item in cameraList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </p>
      <span>分屏：</span>
      <i
        class="el-icon-s-marketing icon-text"
        :style="{ color: pageSize === 1 ? themeColor : '' }"
        @click="changeImg(1)"
      ></i>
      <i
        class="el-icon-menu icon-text"
        :style="{ color: pageSize === 4 ? themeColor : '' }"
        @click="changeImg(4)"
      ></i>
      <i
        class="el-icon-s-grid icon-text"
        :style="{ color: pageSize === 9 ? themeColor : '' }"
        @click="changeImg(9)"
      ></i>
    </div>

    <div style="margin-top: 10px">
      <!--      一宫格-->
      <el-row :gutter="10" v-if="pageSize === 1">
        <el-col :span="24">
          <div class="grid-content">
            <div id="VideoBox1">
              <easy-player
                stretch="true"
                :video-url="cameraObjectChoosed.addr"
              ></easy-player>
            </div>
            <p
              style="margin-top: 20px; text-align: center"
              v-if="cameraList.length > 0"
            >
              {{ cameraObjectChoosed.name }}
            </p>
          </div>
        </el-col>
      </el-row>
      <!--      四宫格-->
      <el-row v-if="pageSize === 4">
        <el-col :span="12" v-for="(item, index) in cameraList" :key="item.id">
          <div class="grid-content">
            <div :id="'VideoBox' + index">
              <easy-player
                stretch="true"
                alt="无信号"
                :video-url="item.addr"
              ></easy-player>
            </div>
          </div>
        </el-col>
      </el-row>
      <!--      九宫格-->
      <el-row v-if="pageSize === 9">
        <el-col :span="8" v-for="(item, index) in cameraList" :key="item.id">
          <div class="grid-content">
            <div :id="'VideoBox' + index">
              <easy-player
                stretch="true"
                alt="无信号"
                :video-url="item.addr"
              ></easy-player>
            </div>
          </div>
        </el-col>
      </el-row>

      <div v-if="pageSize > 1" class="block pagination-center">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { queryMonitorList } from "@/api/device.js";

export default {
  name: "monitors",
  data() {
    return {
      cameraList: [], //选择摄像头列表
      cameraIdChoosed: "", //摄像头选中id
      cameraObjectChoosed: null, //摄像头选中对象
      currentPage: 1,
      pageSize: 1,
      total: 0,
    };
  },
  methods: {
    getCamera(val) {
      this.cameraObjectChoosed = null;
      // console.log(this.cameraList);
      let res = this.cameraList.find((item) => {
        if (item.id === val) return item;
      });
      this.cameraObjectChoosed = res;
    },

    changeImg(type) {
      this.pageSize = type;
      if (type == 1) {
        this.queryCaremaList((this.currentPage = null));
      }
      if (type == 4) {
        this.queryCaremaList((this.currentPage = 1));
      }
      if (type == 9) {
        this.queryCaremaList((this.currentPage = 1));
      }
    },
    queryCaremaList(currentPage) {
      queryMonitorList({
        pageNum: currentPage,
        pageSize: this.pageSize,
      }).then((res) => {
        this.cameraList = res.rows;
        if (this.pageSize === 1) {
          this.cameraIdChoosed = this.cameraList[0].id;
          this.cameraObjectChoosed = this.cameraList[0];
        }
        this.total = res.total;
      });
    },
    //翻页
    handleCurrentChange(val) {
      this.queryCaremaList((this.currentPage = val));
    },
  },
  mounted() {
    this.changeImg(1);
  },
  computed: {
    themeColor() {
      return this.$store.state.app.themeColor;
    },
  },
};
</script>

<style scoped>
.icon-text {
  font-size: 40px;
  color: #d0cccc;
}

.vertical-middle * {
  vertical-align: middle;
}

.search-btn {
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
