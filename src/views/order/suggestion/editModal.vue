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
      <el-form-item label="投诉/建议 内容：" prop="suggestContent">
        <!-- <el-input v-model="form.content" :disabled="checkInfo"></el-input> -->
        <el-input
          type="textarea"
          autosize
          :disabled="checkInfo"
          placeholder="请输入"
          v-model="form.suggestContent"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="位置" prop="suggestLocation">
        <!-- <el-input v-model="form.content" :disabled="checkInfo"></el-input> -->
        <el-input
          :disabled="checkInfo"
          placeholder="请输入"
          v-model="form.suggestLocation"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="是否匿名：">
        <el-select
          v-model="form.orNotName"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option label="否" :value="0"></el-option>
          <el-option label="是" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <template v-if="!form.orNotName">
        <el-form-item label="投诉人姓名：">
          <el-input v-model="form.suggestName" :disabled="checkInfo"></el-input>
        </el-form-item>
        <el-form-item label="投诉人联系电话：">
          <el-input
            v-model="form.suggestPhone"
            :disabled="checkInfo"
          ></el-input>
        </el-form-item>
      </template>
      <el-form-item label="回复人联系电话：">
        <el-input v-model="form.respPhone" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="投诉类型：">
        <el-select
          v-model="form.suggestType"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option label="建议" value="0"></el-option>
          <el-option label="投诉" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投诉状态：">
        <el-select
          v-model="form.suggestStatus"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option label="未回复" :value="0"></el-option>
          <el-option label="已回复" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="处理人：">
        <el-input v-model="form.handler" :disabled="checkInfo"></el-input>
      </el-form-item>

      <!--      <el-form-item label="是否推送消息：">-->
      <!--        <el-select-->
      <!--          v-model="form.send"-->
      <!--          placeholder="请选择"-->
      <!--          style="width: 100%"-->
      <!--          :disabled="checkInfo"-->
      <!--        >-->
      <!--          <el-option label="否" :value="0"></el-option>-->
      <!--          <el-option label="是" :value="1"></el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item label="推送类型：" v-if="form.send">
        <el-select
          v-model="form.sendType"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option label="无" :value="0"></el-option>
          <el-option label="手机" :value="1"></el-option>
          <el-option label="公众号" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="回复说明：">
        <el-input
          type="textarea"
          autosize
          :disabled="checkInfo"
          placeholder="请输入"
          v-model="form.bakContent"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="备注：">
        <el-input
          type="textarea"
          autosize
          :disabled="checkInfo"
          placeholder="请输入"
          v-model="form.remark"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="附件：">
        <li-attachment v-model="form.urls" :readonly="checkInfo" />
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
  querySuggestion,
  editSuggestion,
  insertSuggestion,
} from "@/api/order.js";
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
      checkInfo: false,
      form: { suggestType: "0", suggestStatus: 0, orNotName: 0 },
      rules: {
        suggestLocation: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        suggestContent: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        bakContent: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
      },
      loading: false,
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
      querySuggestion(id).then((res) => {
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
      insertSuggestion(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    editInfo() {
      editSuggestion(this.form).then((res) => {
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
};
</script>

<style scoped></style>
