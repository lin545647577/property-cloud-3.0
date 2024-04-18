<template>
  <div @click="back" class="back-box">
    <i class="el-icon-back"></i>
  </div>
</template>

<script>
export default {
  name: "backBtn",
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.back-box {
  position: absolute;
  height: 50px;
  width: 50px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.6);
  line-height: 50px;
  font-size: 30px;
  border-radius: 50%;
  right: 3%;
  bottom: 3%;
}
</style>
