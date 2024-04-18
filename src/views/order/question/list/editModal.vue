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
      <el-form-item label="标题：" prop="title">
        <!-- <el-input v-model="form.content" :disabled="checkInfo"></el-input> -->
        <el-input
          :disabled="checkInfo"
          placeholder="请输入"
          v-model="form.title"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="问题说明：">
        <!-- <el-input v-model="form.content" :disabled="checkInfo"></el-input> -->
        <el-input
          type="textarea"
          autosize
          :disabled="checkInfo"
          placeholder="请输入"
          v-model="form.explain"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="问题分类：" prop="referenceTypeId">
        <el-select
          v-model="form.referenceTypeId"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="常见问题：" prop="commonStatus">
        <el-select
          v-model="form.commonStatus"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option label="否" :value="0"></el-option>
          <el-option label="是" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题解答：">
        <el-input
          v-model="form.answerTitle"
          @focus="handleAnswer"
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
        @click="submitForm('ruleForm')"
        >确认
      </el-button>
    </div>
    <li-modal ref="chooseModal" style="min-width: 1200px" />
  </div>
</template>
<script>
import {
  queryQuestion,
  editQuestion,
  insertQuestion,
  queryQuestionTypeList,
} from "@/api/order.js";

import { queryPropertyList } from "@/api/property.js";
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
      form: {
        answerTitle: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        commonStatus: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        referenceTypeId: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
      },
      loading: false,
      types: [],
    };
  },
  methods: {
    // 选择解答
    handleAnswer() {
      this.$refs["chooseModal"].show({
        view: "order/question/common/answerModal.vue",
        params: {},
        title: "问题解答",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: this.getCallData,
      });
    },
    getCallData(data) {
      // console.log(data);
      this.form.referenceAnswerId = data.multipleSelection[0].id;
      this.form.answerTitle = data.multipleSelection[0].title;
      this.$refs["chooseModal"].hide();
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
      queryQuestion(id).then((res) => {
        this.form = res;
        this.loading = false;
      });
    },

    submitForm(formName) {
      // this.form.updateTime = dateFormat(
      //   "yyyy-MM-dd hh:mm:ss",
      //   new Date(this.form.updateTime)
      // );

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
      insertQuestion(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    editInfo() {
      editQuestion(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    queryTypes() {
      queryQuestionTypeList({}).then((res) => {
        this.types = res.rows;
      });
    },
  },
  mounted() {
    this.checkInfo = this.params.checkInfo;
    this.queryTypes();
    if (this.params.id) {
      this.queryInfo(this.params.id);
    }
  },
};
</script>

<style scoped></style>
