<template>
  <div>
    <propertyTable
      typeCode="house"
      title="房屋详情"
      modalUrl="property/editModal.vue"
    ></propertyTable>
  </div>
</template>

<script>
import {
  queryPropertyTableHeader,
  queryPropertyTableData,
} from "@/api/property.js";
import { resolveBlob } from "@/utils/util.js";
import propertyTable from "@/components/table/tableProperty";

export default {
  name: "house",
  components: {
    propertyTable,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped></style>
