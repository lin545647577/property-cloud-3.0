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
      <el-form-item label="所属楼层：" prop="floorName">
        <el-input
          v-model="form.floorName"
          @focus="initModel"
          :disabled="checkInfo"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="房屋名称：" prop="name">
        <el-input v-model="form.name" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="房屋序号：" prop="sort">
        <el-input v-model="form.sort" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="房号：">
        <el-input v-model="form.nm" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="户型：">
        <el-input v-model="form.layerType" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="朝向：">
        <el-input v-model="form.orientation" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="装修：">
        <el-input v-model="form.renovation" :disabled="checkInfo"></el-input>
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
      <el-form-item label="分摊面积：">
        <el-input
          v-model="form.shareArea"
          type="number"
          :disabled="checkInfo"
        ></el-input>
      </el-form-item>
      <el-form-item label="物业类型：">
        <el-select
          v-model="form.type"
          placeholder="请选择物业类型"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option
            v-for="item in type"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select
          v-model="form.status"
          placeholder="请选择房屋状态"
          style="width: 100%"
          :disabled="checkInfo"
        >
          <el-option
            v-for="item in states"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="海康平台关联：">
        <el-input v-model="form.layerCnt" :disabled="checkInfo"></el-input>
      </el-form-item> -->
      <el-form-item label="备注：">
        <el-input v-model="form.remarks" :disabled="checkInfo"></el-input>
      </el-form-item>
    </el-form>
    <div class="modal-btn">
      <el-button @click="hiddenModal">取消</el-button>
      <el-button
        size="small"
        type="primary"
        class="control-btn"
        :style="{ 'background-color': themeColor }"
        @click="submitForm('ruleForm')"
        >确认
      </el-button>
    </div>

    <li-modal style="min-width: 1200px" ref="floorModal" />
  </div>
</template>

<script>
import { queryHouse, editHouse, insertHouse } from "@/api/property.js";

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
      rules: {
        name: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        floorName: [
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
      states: [
        {
          id: "0",
          name: "未售",
        },
        {
          id: "1",
          name: "未收楼",
        },
        {
          id: "2",
          name: "收楼",
        },
        {
          id: "3",
          name: "装修",
        },
        {
          id: "4",
          name: "入住",
        },
        {
          id: "5",
          name: "出租",
        },
      ],
      type: [
        {
          id: "1",
          name: "店铺",
        },
        {
          id: "2",
          name: "洋房",
        },
        {
          id: "3",
          name: "公寓",
        },
        {
          id: "4",
          name: "别墅",
        },
      ],
    };
  },
  methods: {
    initModel() {
      this.$refs["floorModal"].show({
        view: "property/common/floorModal.vue",
        params: { id: "123" },
        title: "楼层列表",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: this.getCallData,
      });
    },

    getCallData(data) {
      console.log(data.multipleSelection[0]);
      this.form.floorName = data.multipleSelection[0].name;
      this.form.referenceFloorId = data.multipleSelection[0].id;
      this.$refs["floorModal"].hide();
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
      queryHouse(id).then((res) => {
        console.log("房屋", res);
        this.form = {
          id: res.id,
          nm: res.nm,
          sort: res.sort,
          name: res.name,
          layerType: res.layerType,
          orientation: res.orientation,
          renovation: res.renovation,
          buildArea: res.buildArea,
          useArea: res.useArea,
          shareArea: res.shareArea,
          type: res.type,
          status: res.status,
          floorId: res.floorId,
          floorName: res.floorName,
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
      insertHouse(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    editInfo() {
      editHouse(this.form).then((res) => {
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
