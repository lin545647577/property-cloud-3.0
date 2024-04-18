<template>
  <el-submenu :index="item.code">
    <template slot="title">
      <span>
        {{ item.name }}
      </span>
    </template>
    <template v-if="item.children.length > 0">
      <div
        v-for="child in item.children"
        :item="child"
        :key="child.id"
        :is="child.isParent ? 'taskMenu' : 'task-item'"
      ></div>
    </template>
  </el-submenu>
</template>

<script>
import taskItem from "./taskItem";
import { queryTaskTree } from "@/api/taskProcess";
export default {
  name: "taskMenu",
  components: {
    "task-item": taskItem,
  },
  inject: ["type"],
  props: {
    item: {
      type: Object,
    },
  },
  created() {
    if (this.item.children.length < 1) {
      this.handleQueryTree(this.item.code);
    }
  },
  data() {
    return {};
  },
  methods: {
    // 查询任务树
    handleQueryTree(parentCode) {
      queryTaskTree({
        type: this.type,
        parentCode: parentCode,
      }).then((res) => {
        this.item.children = res;
        // console.log(res);
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.el-submenu__title span {
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inherit;
}
</style>
