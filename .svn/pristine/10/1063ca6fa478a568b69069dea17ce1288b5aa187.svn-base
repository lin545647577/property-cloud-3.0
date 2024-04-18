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
      <el-form-item label="所属物业：" prop="referenceResidenceId">
        <el-select
          @change="handleSelect"
          v-model="form.referenceResidenceId"
          filterable
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option
            v-for="item in residenceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <template v-if="form.referenceResidenceId">
        <el-form-item label="用户名称：" prop="userName">
          <el-input
            v-model="form.userName"
            @focus="handleUser"
            :disabled="checkInfo"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称：">
          <el-input v-model="form.nickName" disabled></el-input>
        </el-form-item>
        <el-form-item label="位置：" prop="positionName">
          <el-input
            v-model="form.positionName"
            @focus="handlePositionModal"
            :disabled="checkInfo"
          ></el-input>
        </el-form-item>
      </template>
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

    <li-modal style="min-width: 1200px" ref="chooseModal" />
  </div>
</template>

<script>
import { configPositionId } from "@/api/device.js";
import {
  queryUserPosition,
  editUserPosition,
  insertUserPosition,
} from "@/api/setting.js";
import { queryResidenceList } from "@/api/property.js";

import { queryFormulaList } from "@/api/payment.js";

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
        positionName: "",
        nickName: "",
        userName: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入",
            trigger: "change",
          },
        ],
        referenceResidenceId: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        positionName: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
      },

      residenceList: [],
    };
  },
  methods: {
    /**
     * 用户选择
     */
    handleUser() {
      this.$refs["chooseModal"].show({
        view: "setting/userPosition/userTable.vue",
        params: {},
        title: "用户选择",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: (res) => {
          // console.log("用户选择：", res);
          let temp = res.multipleSelection[0];
          this.form.userName = temp.userName;
          this.form.nickName = temp.nickName;
          this.form.userId = temp.userId;
          this.$refs["chooseModal"].hide();
        },
      });
    },
    /**
     * 选择物业小区处理数据
     */
    handleSelect(val) {
      this.$store.dispatch("updateResidenceTreeSelected", val);
    },
    // 位置选择
    handlePositionModal() {
      this.$refs["chooseModal"].show({
        view: "meter/meter/positionTreeModal.vue",
        params: {},
        title: "位置",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: this.getCallData,
      });
    },

    getCallData(data) {
      // console.log("选择", data);
      let tempArr = data.chooseTree;
      let tempData = [];
      for (let index in tempArr) {
        tempData.push(tempArr[index].id + ":" + tempArr[index].nodeType);
      }
      configPositionId({
        position: tempData.toString(),
        residenceId: parseInt(this.form.referenceResidenceId),
      }).then((res) => {
        // console.log("解析结果",res)
        this.form.positionName = res.name;
        this.form.positionInfo = res;
        this.$refs["chooseModal"].hide();
      });
    },

    hiddenModal() {
      // console.log(this.form)
      this.$emit("modal-cancel");
    },
    /**
     * 初始化数据
     * @param {String} id id
     */
    queryInfo(id) {
      this.loading = true;
      queryUserPosition(id).then((res) => {
        // console.log(res);
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
      insertUserPosition(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    editInfo() {
      editUserPosition(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    queryResidenceList() {
      this.loading = true;
      queryResidenceList({}).then((res) => {
        this.residenceList = res.rows;
        this.loading = false;
        if (this.params.id) {
          this.queryInfo(this.params.id);
        }
      });
    },
  },
  mounted() {
    this.queryResidenceList();
    this.checkInfo = this.params.checkInfo;
  },
};
</script>

<style scoped></style>
