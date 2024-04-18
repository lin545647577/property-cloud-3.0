<template>
  <div>
    <el-button
      v-if="tabDictValue === '1'"
      type="primary"
      style="width: 100%"
      @click="handleAdd"
      >新增任务</el-button
    >
    <el-menu
      v-loading="treeLoading"
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      text-color="#333333"
      active-text-color="#329DFA"
    >
      <template v-if="taskList && taskList.length > 0">
        <div
          v-for="item in taskList"
          :item="item"
          :key="item.id"
          :is="item.isParent ? 'task-menu' : 'task-item'"
        ></div>
      </template>
      <el-menu-item v-else index="0">
        <span slot="title">暂无任务</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import taskItem from "./taskItem";
import taskMenu from "./taskMenu";
import eventBus from "@/utils/eventBus";
import { queryTaskTree } from "@/api/taskProcess";
export default {
  name: "directoryTree",
  props: ["tabDictValue"],
  components: {
    "task-item": taskItem,
    "task-menu": taskMenu,
  },
  provide() {
    return {
      type: this.tabDictValue,
    };
  },
  data() {
    return {
      treeLoading: false,
      defaultActive: "",
      taskList: [],
      tabType: 0,
      parentCode: "",
      codeLevel: [],
    };
  },
  created() {
    // console.log(this.tabDictValue);
    this.tabType = this.tabDictValue;
    this.handleQueryTree(this.parentCode);
  },
  methods: {
    /**
     * 菜单展开或选中
     * @param {string} key  任务code
     * @param {Array} keyPath
     */
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      this.defaultActive = key;
      this.codeLevel = keyPath;
      eventBus.$emit("transmitKey" + this.tabDictValue, key);
      // for (let code of keyPath) {
      //   this.taskList.forEach((item) => {
      //     if (item.code === code) {
      //       queryTaskTree({
      //         type: this.tabDictValue,
      //         parentCode: code,
      //       }).then((res) => {
      //         item.children = res;
      //         console.log(res);
      //       });
      //     }
      //   });
      // }
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleAdd() {
      eventBus.$emit("transmitKey" + this.tabDictValue, null);
    },
    handleSelected(key) {
      this.defaultActive = key;
    },
    // 查询任务树
    handleQueryTree() {
      this.treeLoading = true;
      queryTaskTree({
        type: this.tabDictValue,
        parentCode: this.parentCode,
      }).then((res) => {
        this.taskList = res;
        this.treeLoading = false;
      });
    },
  },
  mounted() {
    // if (this.tabDictValue === "1") {
    eventBus.$on("transmitTree" + this.tabDictValue, (key) => {
      if (key) this.handleQueryTree();
    });
    // }
  },
  beforeDestroy() {
    // if (this.tabDictValue === "1") {
    eventBus.$off("transmitTree" + this.tabDictValue, null);
    // }
  },
};
</script>

<style scoped lang="less">
.points {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #329dfa;
}
.el-menu {
  border-right: none;
  /deep/ .el-submenu__title {
    font-size: 16px;
  }
}
</style>
