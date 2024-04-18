<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-box"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-box"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-box"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-box"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-box"></div></el-col>

      <el-col :span="4"><div class="grid-content bg-box"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "quickGuide",
};
</script>

<style scoped>
.bg-box {
  height: 200px;
  color: #ffffff;
  font-size: 20px;
}
</style>
