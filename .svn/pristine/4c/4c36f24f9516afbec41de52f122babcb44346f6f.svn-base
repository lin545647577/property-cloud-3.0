<template>
  <div>
    <el-tree
      node-key="id"
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      @check-change="handleCheckChange"
      show-checkbox
    ></el-tree>
    <div class="modal-btn">
      <el-button size="small" @click="hiddenModal">取消</el-button>
      <el-button
        size="small"
        type="primary"
        class="control-btn"
        @click="submitModal"
        >确认
      </el-button>
    </div>
  </div>
</template>

<script>
import { queryPositionList } from "@/api/device.js";
export default {
  name: "positionTreeModal",
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      chooseTree: [],
    };
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data.name,"是否选中", checked,"是否全选（！）", indeterminate);
      // console.log("选中key：",this.$refs["tree"].getCheckedNodes());
      this.chooseTree = this.$refs["tree"].getCheckedNodes();
    },
    queryList(id) {
      queryPositionList(id).then((res) => {
        // console.log(res);
        this.treeData = res;
      });
    },
    hiddenModal() {
      // console.log(this.form)
      this.$emit("modal-cancel");
    },
    submitModal() {
      // console.log("确认", this.chooseTree);
      if (!this.chooseTree.length) {
        this.$message({
          message: "请选择位置",
          center: true,
          type: "warning",
        });
        return;
      }
      this.$emit("modal-submit");
    },
  },
  mounted() {
    this.queryList(this.residenceTreeSelected);
  },
  computed: {
    residenceTreeSelected() {
      return this.$store.state.residenceTreeSelected;
    },
  },
};
</script>

<style scoped></style>
