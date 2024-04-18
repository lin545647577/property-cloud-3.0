<template>
  <div>
    <el-card class="box-card box-height">
      <div slot="header" class="clearfix">
        <span>物业选择</span>
      </div>
      <div class="card-box">
        <div class="text item">
          <div class="custom-tree-container">
            <el-tree
              v-if="refreshDiv"
              v-loading="loading"
              accordion
              :props="props"
              :load="loadNode"
              node-key="id"
              :expand-on-click-node="false"
              :default-expanded-keys="expandedIds"
              @node-click="handleNodeClick"
              @node-expand="handleOpenExpande"
              @node-collapse="handleCloseExpande"
              lazy
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    type="text"
                    style="font-size: 18px"
                    @click.stop="append(data)"
                    :disabled="
                      data.nodeType == 'parking' || data.nodeType == 'house'
                    "
                    >+</el-button
                  >
                  <el-button
                    type="text"
                    style="font-size: 18px"
                    @click.stop="remove(data)"
                    >-</el-button
                  >
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
    </el-card>
    <li-modal style="min-width: 1200px" ref="editModal" />
  </div>
</template>

<script>
import { queryPropertyTree, deleteFormData } from "@/api/property.js";

export default {
  name: "propertyTreeNew",
  data() {
    return {
      props: {
        label: "name",
        children: "rows",
        isLeaf: "isChildren",
      },
      viewUrl: "",
      loading: false,
      refreshDiv: true,
    };
  },
  methods: {
    /**
     * 节点展开操作
     * @param {Object} data 节点数据
     * @param {Object} node 节点结构数据
     * @param {function} e 事件本身
     */
    handleOpenExpande(data, node, e) {
      // console.log("展开:", e.expanded);
      if (node.level > 0) {
        this.$store.dispatch("updateTreeIds", node);
      }
    },
    /**
     * 节点关闭操作
     * @param {Object} data 节点数据
     * @param {Object} node 节点结构数据
     * @param {function} e 事件本身
     */
    handleCloseExpande(data, node, e) {
      e.expanded = false; //节点关闭属性
      this.$store.dispatch("cutTreeIds", node);
    },

    // 添加操作
    append(data) {
      // console.log("添加:", data);
      this.$refs["editModal"].show({
        view: "propertyTree/commonModal/editModal.vue",
        params: {
          id: data.nodeType === "0" ? 0 : data.id,
          form: {
            referenceArchitectureId: "",
            parentId: data.id,
            name: "",
            referenceOrderId: 0,
          },
        },
        title: "新增建筑元素节点",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: () => {
          this.refreshDiv = false;
          this.$refs["editModal"].hide();
          setTimeout(() => {
            this.refreshDiv = true;
          }, 500);
        },
      });
    },

    // 删除操作
    remove(data) {
      // console.log("删除:", data);
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.refreshDiv = false;
          deleteFormData(data.id).then((res) => {
            this.$store.dispatch("updateNode", null);
            this.$message({
              type: "success",
              message: res.msg,
            });
          });
        })
        .catch(() => {})
        .finally(() => {
          this.refreshDiv = true;
        });
    },

    //点击节点事件
    handleNodeClick(data) {
      // console.log(data);
      this.$store.dispatch("updateNode", {
        nodeType: data.nodeType,
        nodeId: data.id,
        name: data.name,
      });
    },
    // 加载节点
    loadNode(node, resolve) {
      this.loading = true;
      // console.log("节点", node);
      let nodeType = "";
      let nodeId = "";
      if (node.data) {
        nodeType = node.data.nodeType;
        nodeId = node.data.id;
      }

      queryPropertyTree({
        nodeType: nodeType,
        nodeId: nodeId,
      }).then((res) => {
        // 初始化头节点信息

        // if (!node.level) {
        //   this.$store.dispatch("updateNode", {
        //     nodeType: res[0].nodeType,
        //     nodeId: res[0].id,
        //     name: res[0].name,
        //   });
        // }
        this.loading = false;
        // console.log("接口：", res);
        return resolve(res);
      });
    },
  },
  beforeMount() {
    this.$store.dispatch("updateTreeIdsBysessionStorage");
  },
  mounted() {},
  computed: {
    expandedIds() {
      return this.$store.state.treeOpenIds;
    },
  },
};
</script>

<style scoped>
.box-height {
  /*height: calc(100vh - 110px);*/
  height: 89.7vh;
  overflow-y: auto;
}

.box-height::-webkit-scrollbar {
  display: none;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
