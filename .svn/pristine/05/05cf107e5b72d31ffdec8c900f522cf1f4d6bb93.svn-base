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
      <el-form-item label="坐标名称：">
        <el-input v-model="form.name" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="x：">
        <el-input v-model="form.x" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="y：">
        <el-input v-model="form.y" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="绑定建筑：">
        <el-select
          v-model="form.status"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in status"
            :key="item.id"
            :label="item.dictLabel"
            :value="item.dictValue"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联设备：">
        <el-select
          v-model="form.deviceUuid"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in deviceList"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
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
import { queryMapCoordinate, editMapCoordinate } from "@/api/map.js";
import { queryWiseDevideList } from "@/api/device.js";
export default {
  name: "coordinateModal",
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
      form: {},
      rules: {
        type: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
      },
      deviceList: [],
    };
  },
  methods: {
    // 获取设备列表
    queryDevice() {
      queryWiseDevideList({}).then((res) => {
        // console.log(res);
        this.deviceList = res.rows;
        this.queryInfo(this.params.id);
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
      queryMapCoordinate(id).then((res) => {
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
    // insertInfo() {
    //   insertMapCoordinate(this.form).then((res) => {
    //     this.$message({
    //       message: "操作成功",
    //       center: true,
    //       type: "success",
    //     });
    //     this.$emit("modal-submit");
    //   });
    // },
    editInfo() {
      editMapCoordinate(this.form).then((res) => {
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

<style scoped></style>
