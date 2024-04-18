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
      <el-form-item label="类型：" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option label="公众号" :value="1"> </el-option>
          <el-option label="小程序" :value="2"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称：" prop="name">
        <el-input v-model="form.name" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="账户：">
        <el-input v-model="form.account" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="appid：" prop="appid">
        <el-input v-model="form.appid" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="密钥：" prop="appsecret">
        <el-input v-model="form.appsecret" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="url：">
        <el-input v-model="form.url" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="token：">
        <el-input v-model="form.token" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="加密密钥：">
        <el-input v-model="form.aeskey" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="二维码图片URL：">
        <el-input v-model="form.qrUrl" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option label="启用" :value="1"> </el-option>
          <el-option label="停用" :value="0"> </el-option>
        </el-select>
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
    <li-modal ref="chooseModal" style="min-width: 1200px" />
  </div>
</template>
<script>
import { queryMP, editMP, insertMP } from "@/api/phone.js";
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
      form: {},
      houseName: "",
      rules: {
        type: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        status: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        name: [
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
      queryMP(id).then((res) => {
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
      insertMP(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    editInfo() {
      editMP(this.form).then((res) => {
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
  },
  computed: {
    themeColor() {
      return this.$store.state.app.themeColor;
    },
  },
};
</script>

<style scoped></style>
