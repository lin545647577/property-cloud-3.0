<template>
  <div>
    <el-card class="box-card box-height">
      <div slot="header" class="clearfix">
        <span>物业选择</span>
      </div>
      <div class="text item">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          v-loading="loading"
        >
          <el-menu-item
            v-for="item in tableData"
            :key="item.id"
            :index="JSON.stringify(item.id)"
          >
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-card>
  </div>
</template>

<script>
import { queryResidenceList } from "@/api/property.js";

export default {
  name: "residenceTree",
  data() {
    return {
      tableData: [{ id: "0" }],
      activeIndex: "0",
      loading: false,
    };
  },
  methods: {
    handleSelect(index) {
      // console.log("点击事件",index)
      this.$store.dispatch("updateResidenceTreeSelected", index.toString());
    },

    queryList() {
      this.loading = true;
      queryResidenceList().then((res) => {
        // console.log("加载事件",res);
        this.tableData = res.rows;
        this.activeIndex = res.rows[0].id.toString();
        this.$store.dispatch("updateResidenceTreeSelected", this.activeIndex);
        this.loading = false;
      });
    },
  },
  mounted() {
    this.queryList();
  },
};
</script>

<style scoped>
.el-menu {
  border: none;
}
.box-height {
  height: calc(100vh - 110px);
}
</style>
