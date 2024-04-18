<template>
  <div class="normalForm">
    <el-form
      v-if="formSetting"
      v-loading="loading"
      :model="form"
      ref="ruleForm"
      :label-width="formSetting.labelWidth + 'px'"
      class="demo-ruleForm"
      :disabled="checkInfo"
      :label-position="formSetting.labelPosition"
      :size="formSetting.size"
    >
      <template v-for="(item, index) in formJson">
        <!--输入框-->
        <el-form-item
          v-if="
            item.__config__.tag === 'el-input' &&
            item.__config__.tagIcon === 'input' &&
            !item.__config__.popupType
          "
          :label="item.__config__.label"
          :prop="item.__vModel__"
          :key="index"
          :rules="[
            {
              required: item.__config__.required,
              message: '请输入',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            v-model="form[item.__vModel__]"
            :placeholder="item.placeholder"
            :disabled="checkInfo"
            clearable
          ></el-input>
        </el-form-item>

        <!--文本输入框-->
        <el-form-item
          v-if="
            item.__config__.tag === 'el-input' &&
            item.__config__.tagIcon === 'textarea'
          "
          :label="item.__config__.label"
          :prop="item.__vModel__"
          :key="index"
          :rules="[
            {
              required: item.__config__.required,
              message: '请输入',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            autosize
            type="textarea"
            v-model="form[item.__vModel__]"
            :placeholder="item.placeholder"
            :disabled="checkInfo"
            clearable
          ></el-input>
        </el-form-item>

        <!--日期选择器-->
        <el-form-item
          v-if="
            item.__config__.tag === 'el-date-picker' &&
            item.__config__.tagIcon === 'date'
          "
          :label="item.__config__.label"
          :prop="item.__vModel__"
          :key="index"
          :rules="[
            {
              required: item.__config__.required,
              message: '请选择',
              trigger: 'change',
            },
          ]"
        >
          <el-date-picker
            :style="item.style"
            v-model="form[item.__vModel__]"
            :type="item.type"
            :placeholder="item.placeholder"
            :disabled="checkInfo"
            :format="item.format"
            :value-format="item['value-format']"
          >
          </el-date-picker>
        </el-form-item>

        <!--日期范围-->
        <el-form-item
          v-if="
            item.__config__.tag === 'el-date-picker' &&
            item.__config__.tagIcon === 'date-range'
          "
          :label="item.__config__.label"
          :prop="item.__vModel__"
          :key="index"
          :rules="[
            {
              required: item.__config__.required,
              message: '请选择',
              trigger: 'change',
            },
          ]"
        >
          <el-date-picker
            :style="item.style"
            v-model="form[item.__vModel__]"
            :type="item.type"
            :range-separator="item['range-separator']"
            :start-placeholder="item['start-placeholder']"
            :end-placeholder="item['end-placeholder']"
            :format="item.format"
            :value-format="item['value-format']"
            :disabled="checkInfo"
          >
          </el-date-picker>
        </el-form-item>

        <!--时间选择器-->
        <el-form-item
          v-if="
            item.__config__.tag === 'el-time-picker' &&
            item.__config__.tagIcon === 'time'
          "
          :label="item.__config__.label"
          :prop="item.__vModel__"
          :key="index"
          :rules="[
            {
              required: item.__config__.required,
              message: '请选择',
              trigger: 'change',
            },
          ]"
        >
          <el-time-picker
            v-model="form[item.__vModel__]"
            :style="item.style"
            :picker-options="item['picker-options']"
            :placeholder="item.placeholder"
            :disabled="checkInfo"
          >
          </el-time-picker>
        </el-form-item>

        <!--时间范围选择-->
        <el-form-item
          v-if="
            item.__config__.tag === 'el-time-picker' &&
            item.__config__.tagIcon === 'time-range'
          "
          :label="item.__config__.label"
          :prop="item.__vModel__"
          :key="index"
          :rules="[
            {
              required: item.__config__.required,
              message: '请选择',
              trigger: 'change',
            },
          ]"
        >
          <el-time-picker
            :defaultValue="item.__config__.defaultValue"
            is-range
            :style="item.style"
            v-model="form[item.__vModel__]"
            :type="item.type"
            :range-separator="item['range-separator']"
            :start-placeholder="item['start-placeholder']"
            :end-placeholder="item['end-placeholder']"
            :format="item.format"
            :value-format="item['value-format']"
            :disabled="checkInfo"
          >
          </el-time-picker>
        </el-form-item>

        <!--单选框组-->
        <el-form-item
          v-if="item.__config__.tag === 'el-radio-group'"
          :label="item.__config__.label"
          :prop="item.__vModel__"
          :key="index"
          :rules="[
            {
              required: item.__config__.required,
              message: '请选择',
              trigger: 'change',
            },
          ]"
        >
          <el-radio-group v-model="form[item.__vModel__]" :disabled="checkInfo">
            <el-radio
              v-for="(opItem, opIndex) in item.__slot__.options"
              :key="opIndex"
              :label="opItem.dictValue"
              >{{ opItem.dictLabel }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <!--下拉框-->
        <el-form-item
          v-if="item.__config__.tag === 'el-select'"
          :label="item.__config__.label"
          :prop="item.__vModel__"
          :key="index"
        >
          <el-select
            v-model="form[item.__vModel__]"
            :placeholder="item.placeholder"
            :disabled="checkInfo"
            style="width: 100%"
          >
            <el-option
              v-for="(opItem, opIndex) in item.__slot__.options"
              :key="opIndex"
              :label="opItem.dictLabel"
              :value="opItem.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!--多选框-->
        <el-form-item
          v-if="item.__config__.tag === 'el-checkbox-group'"
          :label="item.__config__.label"
          :prop="item.__vModel__"
          :key="index"
        >
          <el-checkbox-group
            v-model="form[item.__vModel__]"
            :disabled="checkInfo"
          >
            <el-checkbox
              v-for="(opItem, opIndex) in item.__slot__.options"
              :key="opIndex"
              :label="opItem.dictValue"
              >{{ opItem.dictLabel }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!--          上传-->
        <el-form-item
          v-if="item.__config__.tag === 'el-upload'"
          :label="item.__config__.label"
          :prop="item.__vModel__"
          :key="index"
        >
          <li-attachment v-model="form[item.__vModel__]" />
        </el-form-item>

        <!--表格弹框-->
        <el-form-item
          v-if="item.__config__.popupType === 'table'"
          :label="item.__config__.label"
          :prop="item.__vModel__"
          :key="index"
        >
          <el-input
            v-model="form[item.__vModel__ + keyPlaceholder]"
            :placeholder="item.placeholder"
            :disabled="checkInfo"
            clearable
            @focus="handleChooseTable(item.__vModel__, item.__config__.dataUrl)"
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

    <li-modal style="min-width: 1200px" ref="chooseTable" />
  </div>
</template>

<script>
import {
  queryForm,
  queryFormData,
  editFormData,
  queryDeveloper,
} from "@/api/property.js";
import { queryCoefficient } from "@/api/payment.js";

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
      formSetting: null,
      loading: false,
      checkInfo: false,
      rules: {},
      form: {
        id: "",
      },
      formJson: [],
    };
  },
  methods: {
    /**
     * 弹窗选择表格
     * @param {String} keyName 键值名称
     * @param {String} url 调用地址
     */
    handleChooseTable(keyName, url) {
      // console.log("keyName:", keyName);
      this.$refs["chooseTable"].show({
        view: url,
        params: this.form.residenceId
          ? { referenceResidenceId: this.form.residenceId }
          : {},
        title: "选择表格",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: (res) => {
          // console.log("选中", res);
          this.loading = true;
          this.form[keyName] = res.multipleSelection[0].id;
          this.form[keyName + this.keyPlaceholder] =
            res.multipleSelection[0].name;
          // console.log("选择后", this.form);
          this.$refs["chooseTable"].hide();
          this.loading = false;
        },
      });
    },
    hiddenModal() {
      // console.log(this.form)
      this.$emit("modal-cancel");
    },
    // insertInfo() {
    //   let that = this;
    //   insertResidence(this.form, (res) => {
    //     that.$message({
    //       message: "操作成功",
    //       center: true,
    //       type: "success",
    //     });
    //     that.$emit("modal-submit");
    //   });
    // },
    editInfo() {
      // console.log(this.form);
      editFormData(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
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
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    queryFormElement(id) {
      this.loading = true;
      queryForm(id).then((res) => {
        this.formSetting = JSON.parse(res);
        // console.log(JSON.parse(res));
        this.formJson = JSON.parse(res).fields;
        this.loading = false;
      });
    },
    queryFormData(id) {
      this.loading = true;
      queryFormData(id).then((res) => {
        // console.log("data", res);
        this.form = res;
        this.form.id = id;
        // if (this.form.developmenter) {
        //   this.getDeveloperName(this.form.developmenter);
        // }
        // if (this.form.referenceCoefficientId) {
        //   this.getCoefficient(this.form.referenceCoefficientId);
        // }
        this.loading = false;
        this.queryFormElement(id);
      });
    },
    // /**
    //  *获取分摊系数名称
    //  * @param {String} id 分摊系数id
    //  */
    // getCoefficient(id) {
    //   queryCoefficient(id).then((res) => {
    //     this.form.referenceCoefficientIdName = res.name;
    //   });
    // },
    // /**
    //  * 获取开发商名称
    //  *  @param {String} id 开发商id
    //  */
    // getDeveloperName(id) {
    //   queryDeveloper(id).then((res) => {
    //     this.form.developmenterName = res.name;
    //   });
    // },
  },
  mounted() {
    if (this.params.id) {
      this.queryFormData(this.params.id);
    }
    this.checkInfo = this.params.checkInfo;
  },
  computed: {
    keyPlaceholder() {
      return this.$store.state.keyPlaceholder;
    },
  },
};
</script>

<style></style>
