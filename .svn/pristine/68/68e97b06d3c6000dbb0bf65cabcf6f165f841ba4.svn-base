<template>
  <div class="normalForm">
    <el-form
      v-loading="loading"
      label-position="right"
      label-width="150px"
      :model="form"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="广告名称：" prop="tygxAdvDefinition.advName">
        <el-input
          @focus="handleAdvert"
          v-model="form.tygxAdvDefinition.advName"
          :disabled="checkInfo"
          clearable
          readonly
        ></el-input>
      </el-form-item>

      <!--      <el-form-item label="广告位置：" prop="locationKey">-->
      <!--        <el-select-->
      <!--          v-model="form.locationKey"-->
      <!--          placeholder="请选择"-->
      <!--          style="width: 100%"-->
      <!--          :disabled="checkInfo"-->
      <!--        >-->
      <!--          <el-option-->
      <!--            v-for="item in locations"-->
      <!--            :key="item.id"-->
      <!--            :label="item.name"-->
      <!--            :value="item.id"-->
      <!--          ></el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->

      <!--      <el-form-item label="状态：" prop="advState">-->
      <!--        <el-select-->
      <!--          v-model="form.advState"-->
      <!--          placeholder="请选择"-->
      <!--          style="width: 100%"-->
      <!--          :disabled="checkInfo"-->
      <!--        >-->
      <!--          <el-option-->
      <!--            v-for="item in status"-->
      <!--            :key="item.id"-->
      <!--            :label="item.name"-->
      <!--            :value="item.id"-->
      <!--          ></el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item label="默认：" prop="orNotDefault">
        <el-select
          v-model="form.orNotDefault"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option label="否" :value="0"></el-option>
          <el-option label="是" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <!--      <el-form-item label="设备：" prop="deviceName">-->
      <!--        <el-input-->
      <!--          @focus="handleDevice"-->
      <!--          v-model="form.deviceName"-->
      <!--          clearable-->
      <!--          :disabled="checkInfo"-->
      <!--        ></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="设备关联：" prop="deviceIds">
        <el-select
          v-model="form.deviceIds"
          style="width: 100%"
          multiple
          placeholder="请选择"
        >
          <el-option
            v-for="item in deviceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="modal-btn">
      <el-button size="small" @click="hiddenModal">取消</el-button>
      <el-button
        size="small"
        type="primary"
        class="control-btn"
        @click="submitForm('ruleForm')"
        >确认
      </el-button>
    </div>
    <li-modal ref="chooseModal" style="min-width: 1200px" />
  </div>
</template>
<script>
import {
  queryAdvDeviceLocation,
  editAdvDeviceLocation,
  insertAdvDeviceLocation,
} from "@/api/advert.js";
import { queryWiseDevideList } from "@/api/device.js";
export default {
  name: "editModal",
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      checkInfo: false,
      form: {
        tygxAdvDefinition: {
          advName: "",
        },
        deviceName: "",
        deviceIds: [],
      },
      rules: {
        deviceIds: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        deviceName: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        locationKey: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        orNotDefault: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        "tygxAdvDefinition.advName": [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
      },
      locations: [
        {
          id: 0,
          name: "左上角",
        },
        {
          id: 1,
          name: "右上角",
        },
        {
          id: 2,
          name: "左下角",
        },
        {
          id: 3,
          name: "右下角",
        },
        {
          id: 4,
          name: "上",
        },
        {
          id: 5,
          name: "下",
        },
        {
          id: 6,
          name: "左",
        },
        {
          id: 7,
          name: "右",
        },
      ],
      status: [
        {
          id: 0,
          name: "未发报",
        },
        {
          id: 1,
          name: "已发布",
        },
        {
          id: 2,
          name: "下发中",
        },
        {
          id: 3,
          name: "过期",
        },
        {
          id: 4,
          name: "作废",
        },
        {
          id: 5,
          name: "下发失败",
        },
      ],
      deviceList: [],
    };
  },
  methods: {
    // 获取设备列表
    queryDevice() {
      queryWiseDevideList({}).then((res) => {
        // console.log(res);
        this.deviceList = res.rows;
        if (this.params.id) {
          this.queryInfo(this.params.id);
        }
      });
    },
    /**
     * 选择广告信息
     */
    handleAdvert() {
      this.$refs["chooseModal"].show({
        view: "advert/common/advertTable.vue",
        params: {},
        title: "选择广告信息",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: (res) => {
          let tempData = res.multipleSelection[0];
          // console.log(tempData);
          this.form.tygxAdvDefinition = tempData;
          this.form.advId = tempData.id;
          this.$refs["chooseModal"].hide();
        },
      });
    },

    /**
     * 选择智慧屏设备
     */
    handleDevice() {
      this.$refs["chooseModal"].show({
        view: "device/common/wiseDeviceTable.vue",
        params: {},
        title: "选择设备",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: (res) => {
          let tempData = res.multipleSelection[0];
          // console.log(tempData);
          this.form.deviceId = tempData.id;
          this.form.deviceName = tempData.name;
          this.form.deviceUuid = tempData.uuid;
          this.form.devObj = tempData;
          this.$refs["chooseModal"].hide();
        },
      });
    },
    hiddenModal() {
      // console.log(this.form)
      this.$emit("modal-cancel");
    },
    /**
     * 初始化
     * @param {String} id 楼层id
     */
    queryInfo(id) {
      this.loading = true;
      queryAdvDeviceLocation(id).then((res) => {
        this.form = res;
        this.loading = false;
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.checkInfo) {
            if (this.form.id) {
              this.editInfo();
            } else {
              this.insertInfo();
            }
          } else {
            this.$emit("modal-submit");
          }
        } else {
          return false;
        }
      });
    },
    insertInfo() {
      insertAdvDeviceLocation(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    editInfo() {
      editAdvDeviceLocation(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
  },
  mounted() {
    this.checkInfo = this.params.checkInfo;
    this.queryDevice();
  },
};
</script>

<style scoped>
div {
  /*position: relative;*/
}
</style>
