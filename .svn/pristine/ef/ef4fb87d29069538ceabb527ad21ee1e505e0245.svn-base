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
      <el-form-item label="微信名：">
        <el-input
          v-model="form.nickname"
          :disabled="checkInfo"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="微信openid：">
        <el-input
          v-model="form.openid"
          :disabled="checkInfo"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="注册ip：">
        <el-input v-model="form.registerIp" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="最后登录ip：">
        <el-input v-model="form.lastLoginIp" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="部门ID：">
        <el-input v-model="form.deptId" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="创建者id：">
        <el-input v-model="form.userId" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="语言：">
        <el-input v-model="form.language" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="国家：">
        <el-input v-model="form.country" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="省份：">
        <el-input v-model="form.province" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="城市：">
        <el-input v-model="form.city" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="微信公众号ID：">
        <el-input v-model="form.wxAccountId" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="微信公众号appid：">
        <el-input
          v-model="form.wxAccountAppid"
          :disabled="checkInfo"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户unionId：">
        <el-input v-model="form.unionid" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="头像：">
        <li-portrait v-model="form.headimgurl" :readonly="checkInfo" />
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
import { queryWXUser, editWXUser, insertWXUser } from "@/api/phone.js";
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
      queryWXUser(id).then((res) => {
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
      insertWXUser(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    editInfo() {
      editWXUser(this.form).then((res) => {
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
