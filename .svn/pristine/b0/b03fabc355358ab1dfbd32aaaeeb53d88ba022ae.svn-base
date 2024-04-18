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
      <el-form-item label="设备名称：" prop="name">
        <el-input v-model="form.name" :disabled="checkInfo"></el-input>
      </el-form-item>
      <el-form-item label="安装位置：">
        <el-input
          v-model="form.installPosition"
          :disabled="checkInfo"
        ></el-input>
        <!--        <div v-if="checkInfo">-->
        <!--          <el-input :value="form.positionName" :disabled="checkInfo"></el-input>-->
        <!--        </div>-->
        <!--        <div @click="handlePositionModal" v-else>-->
        <!--          <el-input :value="form.positionName" :disabled="checkInfo"></el-input>-->
        <!--        </div>-->
      </el-form-item>
      <el-form-item label="调用地址：">
        <el-input
          v-model="form.addr"
          :disabled="checkInfo"
          type="textarea"
          autosize
        ></el-input>
      </el-form-item>
      <!--      <el-form-item label="访问权限：" style="text-align: left">-->
      <!--        <el-checkbox-->
      <!--          :indeterminate="isIndeterminate"-->
      <!--          v-model="checkAll"-->
      <!--          @change="handleCheckAllChange"-->
      <!--          >全选</el-checkbox-->
      <!--        >-->
      <!--        <div style="margin: 15px 0"></div>-->
      <!--        <el-checkbox-group-->
      <!--          v-model="rolesChoosed"-->
      <!--          @change="handleCheckedCitiesChange"-->
      <!--        >-->
      <!--          <el-checkbox-->
      <!--            v-for="item in rolesList"-->
      <!--            :label="item.id"-->
      <!--            :key="item.id"-->
      <!--            >{{ item.name }}</el-checkbox-->
      <!--          >-->
      <!--        </el-checkbox-group>-->
      <!--      </el-form-item>-->
    </el-form>
    <div class="modal-btn">
      <el-button size="small" @click="hiddenModal">取消</el-button>
      <el-button
        type="primary"
        class="control-btn"
        size="small"
        :style="{ 'background-color': themeColor }"
        @click="submitForm('ruleForm')"
        >确认
      </el-button>
    </div>
  </div>
</template>

<script>
import { queryMonitor, editMonitor, insertMonitor } from "@/api/device.js";

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
            message: "请输入名称",
            trigger: "blur",
          },
        ],
      },

      rolesChoosed: [],
      isIndeterminate: true,
      checkAll: false,

      rolesList: [
        // {
        //   id: "0",
        //   name: "全选"
        // },
        {
          id: "1",
          name: "物业",
        },
        {
          id: "2",
          name: "本栋业主",
        },
        {
          id: "3",
          name: "全部业主",
        },
        {
          id: "4",
          name: "商铺",
        },
        {
          id: "5",
          name: "租客",
        },
      ],
    };
  },
  methods: {
    //多选全选
    handleCheckAllChange(val) {
      let temp = [];
      for (let i = 0; i < this.rolesList.length; i++) {
        temp.push(this.rolesList[i].id);
      }
      this.rolesChoosed = val ? temp : [];
      this.isIndeterminate = false;
    },
    //选择处理
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.rolesList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.rolesList.length;
    },

    handlePositionModal() {},

    getCallData(data) {
      console.log(data.multipleSelection[0]);
      this.form.buildingName = data.multipleSelection[0].name;
      this.form.referenceBuildingId = data.multipleSelection[0].id;
      this.$refs["buildingModal"].hide();
    },

    hiddenModal() {
      // console.log(this.form)
      this.$emit("modal-cancel");
    },
    /**
     * 初始化人员
     * @param {String} id 人员id
     */
    queryInfo(id) {
      // this.avatarUrl = null;
      this.loading = true;
      queryMonitor(id).then((res) => {
        // console.log(res);

        this.form = {
          id: res.id,
          positionName: res.positionName,
          installPosition: res.installPosition,
          positionType: res.positionType,
          positionId: res.positionId,
          name: res.name,
          brand: res.brand,
          model: res.model,
          equipmentId: res.equipmentId,
          addr: res.addr,
          jurisdiction: res.jurisdiction,
        };
        this.rolesChoosed = [];
        if (res.jurisdiction) {
          this.rolesChoosed = res.jurisdiction.split(",");
        }
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
      console.log(this.form);
      insertMonitor(this.form).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.$emit("modal-submit");
      });
    },
    editInfo() {
      editMonitor(this.form).then((res) => {
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
