<template>
  <div>
    <my-form
      v-if="formSetting"
      ref="formCom"
      @bindForm="bindData"
      :formSetting="formSetting"
      :form="formData"
      :loading="loading"
    ></my-form>
  </div>
</template>

<script>
import {
  queryForm,
  queryFormData,
  editFormData,
  queryDeveloper,
} from "@/api/property.js";
import myForm from "@/components/form/editForm";

export default {
  name: "editModal",
  components: {
    "my-form": myForm,
  },
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      formSetting: null,
      formData: {
        developmenterName: "",
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
        if (this.formData.developmenter) {
          this.getDeveloperName(this.formData.developmenter);
        }
        this.queryInfo(id);
      });
    },
    /**
     * 获取开发商名称
     *  @param {String} id 开发商id
     */
    getDeveloperName(id) {
      queryDeveloper(id).then((res) => {
        this.formData.developmenterName = res.name;
      });
    },
  },
  mounted() {
    // this.queryList(this.currentPage);
    // console.log(this.params);
    if (this.params.id) {
      this.queryFormData(this.params.id);
    }
    if (this.node.nodeId) {
      this.queryFormData(this.node.nodeId);
    }
  },
  computed: {
    node() {
      return this.$store.state.node;
    },
  },
  watch: {
    "node.nodeId"(nval, oval) {
      if (nval != oval) {
        this.queryFormData(nval);
      }
    },
  },
};
</script>

<style scoped></style>
