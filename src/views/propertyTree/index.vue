<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8"
        ><div class="grid-content"><proTree></proTree></div
      ></el-col>
      <el-col :span="16">
        <div class="grid-content" v-if="!loading">
          <li-modal style="min-width: 1200px" ref="chooseModal" />

          <el-card class="box-card" v-if="node && node.nodeType != '0'">
            <div slot="header" class="clearfix">
              <span>{{ node.name }}</span>
            </div>
            <div class="text item">
              <my-form
                v-if="formSetting"
                ref="formCom"
                @bindForm="bindData"
                :formSetting="formSetting"
                :form="formData"
                :loading="loading"
                :residenceId="residenceId"
              ></my-form>
            </div>
          </el-card></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import proTree from "@/components/propertyTree.vue";
import { queryForm, queryFormData, editFormData } from "@/api/property.js";
import myForm from "@/components/form/editForm";

export default {
  name: "propertyTree",
  components: { proTree, "my-form": myForm },
  data() {
    return {
      loading: false,
      formSetting: null,
      formData: {
        id: "",
      },
    };
  },
  methods: {
    /**
     * 绑定回调数据
     * @param {Object} data 回调数据
     */
    bindData(data) {
      // console.log("父组件回调：", data);
      this.loading = true;
      editFormData(data).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.loading = false;
        this.queryFormData(this.node.nodeId);
      });
    },
    queryInfo(id) {
      this.loading = true;
      queryForm(id).then((res) => {
        this.formSetting = JSON.parse(res);
        // console.log("格式", JSON.parse(res).fields);
        this.loading = false;
      });
    },
    queryFormData(id) {
      this.loading = true;
      queryFormData(id).then((res) => {
        // console.log("值", res);
        this.formData = res;
        this.formData.id = id;
        this.queryInfo(id);
      });
    },
  },
  beforeMount() {
    this.$store.dispatch("updatePropertyTreeSelectedBysessionStorage");
    this.$store.dispatch("updateNodeBysessionStorage");
  },
  mounted() {
    if (this.node.nodeId) {
      this.queryFormData(this.node.nodeId);
    }
  },
  computed: {
    residenceId() {
      let temp = 0;
      let tempArr = this.$store.state.propertyTreeSelected;
      for (let index in tempArr) {
        if (tempArr[index].nodeType === "residence") {
          temp = tempArr[index].nodeId;
        }
      }
      return temp;
    },
    node() {
      return this.$store.state.node;
    },
  },
  watch: {
    "node.nodeId": {
      handler(nval, oval) {
        if (!nval) {
          return;
        }
        if (nval != oval) {
          this.queryFormData(nval);
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
</style>
