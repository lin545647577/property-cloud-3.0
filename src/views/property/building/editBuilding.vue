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
      <el-form-item label="所属物业：" prop="residenceName">
        <el-input
          v-model="form.residenceName"
          @focus="initResidenceModal"
          :disabled="checkInfo"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="楼宇序号：" prop="sort">
        <el-input v-model="form.sort" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="楼宇编号：">
        <el-input v-model="form.nm" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="楼宇名称：" prop="name">
        <el-input v-model="form.name" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="建筑面积：">
        <el-input
          v-model="form.buildArea"
          type="number"
          :disabled="checkInfo"
        ></el-input>
      </el-form-item>
      <el-form-item label="使用面积：">
        <el-input
          v-model="form.useArea"
          type="number"
          :disabled="checkInfo"
        ></el-input>
      </el-form-item>
      <el-form-item label="楼层数量：">
        <el-input
          v-model="form.floorCnt"
          type="number"
          :disabled="checkInfo"
        ></el-input>
      </el-form-item>
      <el-form-item label="户数：">
        <el-input
          v-model="form.layerCnt"
          type="number"
          :disabled="checkInfo"
        ></el-input>
      </el-form-item>
      <el-form-item label="预售许可证：">
        <el-input v-model="form.saleLicence" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="完工日期：">
        <el-date-picker
          type="date"
          v-model="form.finishedTime"
          style="width: 100%"
          :disabled="checkInfo"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="楼层分摊系数：">
        <el-input
          v-model="form.coefficientName"
          @focus="handleCoefficientModal"
          :disabled="checkInfo"
        ></el-input>
      </el-form-item>
    </el-form>

    <div class="modal-btn">
      <el-button size="small" @click="hiddenModal">取消</el-button>
      <el-button
        size="small"
        type="primary"
        class="control-btn"
        :style="{ 'background-color': themeColor }"
        @click="submitForm('ruleForm')"
        >确认
      </el-button>
    </div>

    <li-modal style="min-width: 1200px" ref="residenceModal" />
  </div>
</template>

<script>
import { queryBuilding, editBuilding, insertBuilding } from "@/api/property.js";
import { dateFormat } from "@/utils/util.js";
export default {
  name: "editBuilding",
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
        residenceName: "",
        coefficientName: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        residenceName: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 选择公摊费用
    handleCoefficientModal() {
      this.$refs["residenceModal"].show({
        view: "payment/common/shareMenuModal.vue",
        params: { referenceResidenceId: this.form.referenceResidenceId },
        title: "公摊列表",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: (data) => {
          // console.log(data);
          this.form.coefficientName = data.multipleSelection[0].name;
          this.form.referenceCoefficientId = data.multipleSelection[0].id;
          this.$refs["residenceModal"].hide();
        },
      });
    },

    initResidenceModal() {
      this.$refs["residenceModal"].show({
        view: "property/common/residenceModal.vue",
        params: { id: "123" },
        title: "物业列表",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: this.getCallData,
      });
    },

    getCallData(data) {
      console.log(data.multipleSelection[0].name);
      this.form.residenceName = data.multipleSelection[0].name;
      this.form.referenceResidenceId = data.multipleSelection[0].id;
      this.$refs["residenceModal"].hide();
    },

    hiddenModal() {
      // console.log(this.form)
      this.$emit("modal-cancel");
    },
    /**
     * 初始化楼宇
     * @param {String} id 小区id
     */
    queryBuilding(id) {
      this.loading = true;
      queryBuilding(id).then((res) => {
        // console.log(res);
        this.form = {
          id: res.id,
          nm: res.nm,
          sort: res.sort,
          name: res.name,
          buildArea: res.buildArea,
          useArea: res.useArea,
          floorCnt: res.floorCnt,
          layerCnt: res.layerCnt,
          saleLicence: res.saleLicence,
          finishedTime: res.finishedTime,
          referenceResidenceId: res.referenceResidenceId,
          residenceName: res.residenceName,
          referenceCoefficientId: res.referenceCoefficientId,
          coefficientName: res.coefficientName,
        };
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
      if (this.form.finishedTime) {
        this.form.finishedTime = dateFormat(
          "yyyy-MM-dd",
          new Date(this.form.finishedTime)
        );
      }
      insertBuilding(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    editInfo() {
      if (this.form.finishedTime) {
        this.form.finishedTime = dateFormat(
          "yyyy-MM-dd",
          new Date(this.form.finishedTime)
        );
      }
      editBuilding(this.form).then((res) => {
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
    if (this.params.id) {
      this.queryBuilding(this.params.id);
    }
  },
  computed: {
    themeColor() {
      return this.$store.state.app.themeColor;
    },
  },
};
</script>

<style scoped></style>
