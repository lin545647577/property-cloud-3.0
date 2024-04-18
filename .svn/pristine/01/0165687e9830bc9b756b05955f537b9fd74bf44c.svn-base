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
      <el-form-item label="名称：" prop="name">
        <el-input
          v-model="form.name"
          :disabled="checkInfo"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="uuid：">
        <el-input
          v-model="form.uuid"
          :disabled="checkInfo"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="类型：">
        <el-select
          v-model="form.type"
          placeholder="请选择"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option
            v-for="item in types"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="位置：">
        <el-input
          v-model="form.location"
          :disabled="checkInfo"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="状态：" prop="isOnline">
        <el-select
          v-model="form.isOnline"
          placeholder="请选择状态"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option label="离线" :value="0"></el-option>
          <el-option label="在线" :value="1"></el-option>
        </el-select>
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
      <!--      <el-form-item label="附件：">-->
      <!--        <li-attachment v-model="form.urls" :readonly="checkInfo" />-->
      <!--      </el-form-item>-->
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
  queryWiseDevide,
  editWiseDevide,
  insertWiseDevide,
} from "@/api/device.js";
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
        name: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        // uuid: [
        //   {
        //     required: true,
        //     message: "请输入",
        //     trigger: "blur",
        //   },
        // ],
        isOnline: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
      },

      types: [
        {
          id: 1,
          name: "大屏机",
        },
        {
          id: 2,
          name: "广告机",
        },
        {
          id: 3,
          name: "双屏机",
        },
      ],
    };
  },
  methods: {
    //房屋选择
    handleChooseHouse() {
      this.$refs["chooseModal"].show({
        view: "property/common/houseModal.vue",
        params: {},
        title: "查看房屋列表",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: (data) => {
          // console.log(data.multipleSelection[0].name);
          this.houseName = data.multipleSelection[0].name;
          this.form.houseId = data.multipleSelection[0].id;
          this.$refs["chooseModal"].hide();
        },
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
      queryWiseDevide(id).then((res) => {
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
      insertWiseDevide(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    editInfo() {
      editWiseDevide(this.form).then((res) => {
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
