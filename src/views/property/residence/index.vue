<template>
  <div>
    <property-table
      typeCode="residence"
      title="物业详情"
      modalUrl="property/editModal.vue"
    ></property-table>
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
  name: "residence",
  components: {
    "property-table": propertyTable,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped></style>
