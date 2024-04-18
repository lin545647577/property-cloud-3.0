<template>
  <div class="organization">
    <el-select v-model="value" placeholder="请选择组织" style="width: 100%">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "organization",
  props: {
    params: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      value: undefined,
      options: [],
    };
  },
  mounted() {
    this.$TankLight.sysPreLogin(this.params).then((data) => {
      this.options = data;
    });
  },
};
</script>
