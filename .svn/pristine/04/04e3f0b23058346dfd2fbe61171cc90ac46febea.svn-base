<template>
  <div class="normalForm">
    <el-form
      label-position="right"
      label-width="150px"
      :model="form"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="支付方式：" prop="payType">
        <el-select
          v-model="form.payType"
          placeholder="请选择方式"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option label="微信" value="1"></el-option>
          <el-option label="支付宝" value="2"></el-option>
          <el-option label="平台余额" value="3"></el-option>
          <el-option label="现金" value="4"></el-option>
          <el-option label="扫码" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收款人：" prop="collectionPeople">
        <el-input
          v-model="form.collectionPeople"
          :disabled="checkInfo"
        ></el-input>
      </el-form-item>
      <el-form-item label="收据号：" prop="receiptNumber">
        <el-input v-model="form.receiptNumber" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="发票号：" prop="invoiceNumber">
        <el-input v-model="form.invoiceNumber" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="form.payRemark" :disabled="checkInfo"></el-input>
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
  </div>
</template>

<script>
import { payOwnerBillList, queryOwnerBill } from "@/api/payment.js";
import { dateFormat } from "@/utils/util.js";
export default {
  name: "payModal",
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      checkInfo: false,
      form: {},
      rules: {
        invoiceNumber: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        receiptNumber: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        collectionPeople: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        payType: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    hiddenModal() {
      // console.log(this.form)
      this.$emit("modal-cancel");
    },
    /**
     * 初始化
     * @param {String} id 开发商id
     */
    queryInfo(id) {
      queryOwnerBill(id).then((res) => {
        // console.log(res);
        this.form = {
          ids: res.id,
          payTime: dateFormat("yyyy-MM-dd hh:mm:ss", new Date()),
        };
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.payBill();
        } else {
          return false;
        }
      });
    },

    payBill() {
      payOwnerBillList(this.form).then((res) => {
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
      this.queryInfo(this.params.id);
    }
    // this.queryResidenceList();
  },
  computed: {
    themeColor() {
      return this.$store.state.app.themeColor;
    },
  },
};
</script>

<style scoped></style>
