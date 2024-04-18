<template>
  <div>
    <!--    <el-tabs-->
    <!--      v-model="editableTabsValue"-->
    <!--      type="card"-->
    <!--      editable-->
    <!--      @edit="handleTabsEdit"-->
    <!--    >-->
    <el-tabs v-model="editableTabsValue" type="card">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.dictValue"
        :label="item.dictLabel"
        :name="JSON.stringify(item.dictCode)"
      >
        <el-container>
          <el-aside width="300px">
            <directory-tree :tabDictValue="item.dictValue"></directory-tree>
          </el-aside>
          <el-main>
            <task-form
              :selectOptions="selectOptions"
              :tabDictValue="item.dictValue"
            ></task-form>
          </el-main>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import directoryTree from "@/components/task/directoryTree/directoryTree";
import { queryDictionaryWithKey } from "@/api/common";
import { listSystemUser, queryDept } from "@/api/taskProcess";
import taskForm from "@/components/task/taskForm";

import directoryTree from "@/components/task/directoryTree";

export default {
  name: "index",
  components: {
    "directory-tree": directoryTree,
    "task-form": taskForm,
  },
  data() {
    return {
      editableTabsValue: "1", //默认选中
      editableTabs: [], //tabslist
      tabIndex: 0, //tabslist长度
      selectOptions: {
        //表单下拉数据
        typeList: [], //任务类型
        statusList: [], //任务状态
        // systemUserOptions: [], //用户list
        deptList: [], //部门list
      },
    };
  },
  created() {
    this.initTabs();
    this.$store.state.app.sideBar.opened = false;
    this.queryTaskType();
    this.queryTaskStatus();
    // this.queryUserList();
    this.queryDeptList();
  },
  methods: {
    //获取部门list
    queryDeptList() {
      queryDept().then((res) => {
        // console.log(res);
        this.selectOptions.deptList = res;
      });
    },
    // 获取负责人list
    // queryUserList() {
    //   listSystemUser().then((res) => {
    //     this.selectOptions.systemUserOptions = res.rows;
    //   });
    // },
    // 获取任务状态list
    queryTaskStatus() {
      queryDictionaryWithKey({ dictType: "tygx_task_status" }).then((res) => {
        // console.log(res);
        this.selectOptions.statusList = res.rows;
      });
    },
    // 获取任务类型list
    queryTaskType() {
      queryDictionaryWithKey({ dictType: "tygx_task_type" }).then((res) => {
        // console.log(res);
        this.selectOptions.typeList = res.rows;
      });
    },
    // 动态编辑tab标签（预留）
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content",
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      }
    },
    // 初始化标签页
    initTabs() {
      queryDictionaryWithKey({ dictType: "task_tab" }).then((res) => {
        // console.log(res);
        this.editableTabs = res.rows;
        this.tabIndex = res.total;
        this.editableTabsValue = this.editableTabs[0].dictCode.toString();
      });
    },
  },
  beforeMount() {
    this.$store.dispatch("updateTaskCodeSelectedBySessionStorage"); //获取会话中的已选中code
  },
  mounted() {},
};
</script>

<style scoped></style>
