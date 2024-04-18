<template>
  <div>
    <div class="btn-box">
      <el-button
        class="control-btn"
        type="primary"
        size="small"
        @click="handleInsert"
        v-if="insertBtn"
        >新增
      </el-button>

      <!--      人员授权配置-->
      <el-button
        size="small"
        class="control-btn"
        type="success"
        @click="handleAuthority"
        v-if="authorityBtn"
        >配置权限
      </el-button>
      <!--      移动端配置-->
      <el-button
        size="small"
        class="control-btn"
        type="success"
        @click="handleUpdate"
        v-if="updateBtn"
        >更新模板
      </el-button>

      <!--      账单-->
      <el-button
        size="small"
        class="control-btn"
        type="primary"
        @click="handleInsert(false)"
        v-if="billInsertBtn"
        >添加其他公摊账单
      </el-button>
      <el-button
        size="small"
        class="control-btn"
        type="success"
        @click="handleGenerateModal"
        v-if="generateBtn"
        >生成账单
      </el-button>
      <el-button
        size="small"
        class="control-btn"
        type="warning"
        @click="handleReleases"
        v-if="releasesBtn"
        >发布
      </el-button>

      <el-button
        class="control-btn"
        type="info"
        size="small"
        @click="handleExport"
        v-if="exportBtn"
        >导出
      </el-button>
      <el-button
        class="control-btn"
        size="small"
        type="danger"
        @click="handleDeletes"
        v-if="deleteBtn"
        >删除
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "tableHeaderBtn",
  props: {
    insertBtn: {
      type: Boolean,
    },
    exportBtn: {
      type: Boolean,
    },
    deleteBtn: {
      type: Boolean,
    },
    authorityBtn: {
      type: Boolean,
    },
    updateBtn: {
      type: Boolean,
    },
    billInsertBtn: {
      type: Boolean,
    },
    generateBtn: {
      type: Boolean,
    },
    releasesBtn: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleInsert() {
      this.$emit("handleInsert");
    },
    handleExport() {
      this.$emit("handleExport");
    },
    handleDeletes() {
      this.$emit("handleDeletes");
    },
    handleAuthority() {
      this.$emit("handleAuthority");
    },
    handleUpdate() {
      this.$emit("handleUpdate");
    },
    handleGenerateModal() {
      this.$emit("handleGenerateModal");
    },
    handleReleases() {
      this.$emit("handleReleases");
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
