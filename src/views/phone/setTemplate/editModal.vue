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
      <el-form-item label="公众号：" prop="referenceMpId">
        <el-select
          v-model="form.referenceMpId"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option
            v-for="item in mpList"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板名称：" prop="templateId">
        <el-select
          v-model="form.templateId"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option
            v-for="item in templateList"
            :label="item.title"
            :value="item.id"
            :key="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址：">
        <el-input v-model="form.url" :disabled="checkInfo" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          type="textarea"
          autosize
          v-model="form.remark"
          :disabled="checkInfo"
          clearable
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
    <li-modal ref="chooseModal" style="min-width: 1200px" />
  </div>
</template>
<script>
import {
  queryMsgTemplate,
  editMsgTemplate,
  queryMPList,
  queryMsgTemplateList,
} from "@/api/phone.js";
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
      mpList: [],
      templateList: [],
      rules: {
        referenceMpId: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        templateId: [
          {
            required: true,
            message: "请输入",
            trigger: "change",
          },
        ],
      },
      types: [
        {
          id: "1",
          name: "审核结果",
        },
        {
          id: "2",
          name: "预约取消",
        },
        {
          id: "3",
          name: "待审核通知",
        },
        {
          id: "4",
          name: "预约逾期",
        },
      ],
    };
  },
  methods: {
    queryTemplateList() {
      queryMsgTemplateList({}).then((res) => {
        this.templateList = res.rows;
      });
    },
    queryMPList() {
      queryMPList({
        type: 1,
      }).then((res) => {
        // console.log(res);
        this.mpList = res.rows;
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
      queryMsgTemplate(id).then((res) => {
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
      // insertMsgTemplate(this.form).then((res) => {
      //   this.$message({
      //     message: "操作成功",
      //     center: true,
      //     type: "success",
      //   });
      //   this.$emit("modal-submit");
      // });
    },
    editInfo() {
      editMsgTemplate(this.form).then((res) => {
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
    this.queryMPList();
    this.queryTemplateList();
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
