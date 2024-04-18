<template>
  <el-row>
    <el-button @click="handleTickets" class="btn-tickets" type="success"
      >到访确认
    </el-button>
    <el-dialog
      class="dialog-tickets"
      width="40%"
      title="请选择来访确认方式："
      :visible.sync="dialogTickets"
      :show-close="false"
      @close="dialogClose"
    >
      <div v-if="dialog_select" style="display: flex; justify-content: center">
        <el-button @click="select_method(1)" type="primary"
          >身份证读卡</el-button
        >
        <el-button @click="select_method(2)" type="primary"
          >扫描二维码</el-button
        >
      </div>
      <div v-if="identity_card">
        <p class="text-tickets">{{ dialog_content }}</p>
        <div v-if="make_an_appointment">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @row-click="handleClick"
          >
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="visitStartTime" label="开始时间" width="200">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="130">
            </el-table-column>
            <el-table-column prop="itwName" label="被访人" width="206">
            </el-table-column>
            <!-- <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >确认</el-button
                >
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
      <div v-if="quick_mark">
        <p class="text-tickets">{{ dialog_content }}</p>
        <div class="box-tickets">
          <el-input
            @change="handleTicketsChange"
            @blur="handleTicketsBlur"
            ref="tickets"
            v-model="ticketsNumber"
            autocomplete="off"
          ></el-input>
        </div>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
import { codeValidate, identityApi, appointmentRegister } from "@/api/business";

export default {
  name: "LiConfirmVisit",
  data() {
    return {
      dialogTickets: false,
      ticketsNumber: undefined,
      dialog_select: true,
      identity_card: false,
      quick_mark: false,
      dialog_content: "",
      tableData: [],
      make_an_appointment: false,
    };
  },
  methods: {
    /*
     *用户选择验证方式
     */
    select_method(radio) {
      this.dialog_select = false;
      if (radio === 1) {
        this.identity_card = true;
        this.dialog_content = "请将身份证放到读卡处";
        let that = this;
        that.timer = setInterval(function () {
          identityApi().then((res) => {
            if (res.data.success === 1) {
              clearInterval(that.timer);
              that.dialog_content = "请选择您的预约单";
              that.$message.success("身份证验证完成，请选择您的预约单");
              appointmentRegister(res.data.wszID).then((res) => {
                that.tableData = res;
                that.make_an_appointment = true;
              });
            }
          });
        }, 3000);
      } else {
        this.quick_mark = true;
        this.dialog_content = "请将二维码放置扫描处";
        setTimeout(() => {
          this.$refs["tickets"].$refs.input.focus();
        }, 200);
      }
    },

    handleTickets() {
      this.dialogTickets = true;
      this.dialog_select = true;
      this.radio = "";
      this.identity_card = false;
      this.quick_mark = false;
    },

    handleTicketsBlur() {
      this.dialogTickets = false;
      this.ticketsNumber = undefined;
    },

    handleTicketsChange(v) {
      if (v) {
        codeValidate(v)
          .then((res) => {
            this.$message.success("二维码确认成功，请测量体温");
            this.dialog_content = "请测量体温";
            this.websocket(res);
          })
          .catch(() => {
            this.$message.error("无效的二维码");
            this.ticketsNumber = undefined;
            this.dialogTickets = false;
          });
      }
    },
    /*
     *用户选择预约单
     */
    handleClick(row) {
      console.log(row);
      this.dialog_content = "选择成功，请测量体温";
      this.make_an_appointment = false;
      let res = {
        name: row.name,
        content: row.reason,
        time: row.visitStartTime + " - " + row.visitEndTime,
      };
      this.websocket(res);
    },
    /*
     *用户测量体温和打印
     */
    websocket(res) {
      var url = "ws://127.0.0.1:8003/websocket";
      var ws = new WebSocket(url);
      let that = this;
      ws.onmessage = function (e) {
        let temperature = JSON.parse(e.data).BO;
        if (temperature > 3800) {
          that.$message.success("体温过高，请重新测量体温！");
          that.dialog_content = "请重新测量体温";
          return;
        }
        if (temperature > 3400) {
          that.$message.success("体温测量成功");
          that.dialog_content = "体温测量成功";
          // 这里是系统打印接口
          ws.close();
          // 加多一个体温字段
          let temperature_string = JSON.stringify(temperature);
          for (const i in temperature_string) {
            console.log(temperature_string[i]);
            res.temperature =
              temperature_string[0] +
              temperature_string[1] +
              "." +
              temperature_string[2] +
              temperature_string[3] +
              "℃";
          }
          res.qrcSrc =
            "https://w3c.tank-light.com/static/tank-light/logo-title.png";
          that.$PRINT.printCodeValidate(res).then(() => {
            that.$message.success("确认成功");
          });
          that.ticketsNumber = undefined;
          that.dialogTickets = false;
        }
      };
    },
    /*
     *用户点击关闭
     */
    dialogClose() {
      clearInterval(this.timer);
      console.log(111);
    },
  },
};
</script>
<style lang="less">
.btn-tickets {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  padding: 35px 20px;
}

.dialog-tickets {
  .text-tickets {
    text-align: center;
    color: #3a8ee6;
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 30px;
  }

  .box-tickets {
    height: 0;
    overflow-y: hidden;
  }
  .el-button--primary {
    width: 35%;
    height: 100px;
    font-size: 20px;
  }
}
</style>
