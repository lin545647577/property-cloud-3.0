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
      <el-form-item label="建筑元素类型：" prop="referenceArchitectureId">
        <el-select
          v-model="form.referenceArchitectureId"
          placeholder="请选择"
          style="width: 100%"
          @change="handleChangeType"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="建筑元素名称：" prop="name">
        <el-input v-model="form.name"></el-input>
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
  </div>
</template>
<script>
import { insertProperty, queryChildPropertyList } from "@/api/property.js";
import { dateFormat } from "@/utils/util.js";

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
      form: { referenceArchitectureId: "" },
      rules: {
        name: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        referenceArchitectureId: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      options: [],
    };
  },
  methods: {
    handleChangeType(val) {
      // console.log(val);
      let res = this.options.find((item) => {
        if (item.id === val) {
          return item;
        }
      });
      this.form.referenceOrderId = res.referenceOrderId;
    },
    hiddenModal() {
      // console.log(this.form)
      this.$emit("modal-cancel");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.form);
          insertProperty(this.form).then((res) => {
            this.$emit("modal-submit");
            this.$message({
              message: "操作成功",
              center: true,
              type: "success",
            });
          });
        } else {
          return false;
        }
      });
    },
    queryTypes(id) {
      queryChildPropertyList(id).then((res) => {
        // console.log(res);
        this.options = res;
      });
    },
  },
  mounted() {
    this.form = this.params.form;
    this.queryTypes(this.params.id);
  },
};
</script>

<style scoped></style>
