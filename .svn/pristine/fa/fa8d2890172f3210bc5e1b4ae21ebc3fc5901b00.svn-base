<template>
  <div>
    <el-table
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
    >
      <el-table-column prop="month" label="时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="thisReading" label="读数" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="unitPrive" label="单位" show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <div class="block pagination-center">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </div>

    <div class="modal-btn">
      <el-button @click="hiddenModal" size="small">取消</el-button>
      <el-button
          size="small"
          type="primary"
          class="control-btn"
          :style="{ 'background-color': themeColor }"
          @click="submitForm('ruleForm')"
      >确认
      </el-button>
    </div>
  </div>
</template>

<script>
import { queryMeterReading } from "@/api/device.js";
export default {
  name: "detailModal",
  props:{
    params:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      searchName: "",
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: 0,

      shareType: [{
        id: "0",
        name: '不公摊'
      }, {
        id: "1",
        name: '小区公摊'
      }, {
        id: "2",
        name: '同楼公摊'
      }, {
        id: "3",
        name: '车库公摊'
      }, {
        id: "4",
        name: '同层公摊'
      }, ],
    };
  },
  methods: {
    findShareType(sid) {
      let res = this.shareType.find(item => {
        return item.id == sid;
      })
      return res ? res.name : '';
    },

    submitForm(formName) {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "请选择内容",
          center: true,
          type: "warning",
        });
        return;
      }
      this.$emit("modal-submit");
    },

    hiddenModal() {
      console.log(this.form);
      this.$emit("modal-cancel");
    },


    //每页显示条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.queryList(this.currentPage=1);
    },

    // 分页
    handleCurrentChange(val) {
      // console.log(`第 ${val} 页`);
      this.queryList(this.currentPage=val);
    },
    queryList(currentPage) {
      queryMeterReading(this.params.id,
          {
            pageNum: currentPage,
            pageSize: this.pageSize
          }).then(
          (res) => {
            // console.log(res);
            for (let index in res.rows) {
              res.rows[index].index =
                  parseInt(index) + 1 + (this.currentPage - 1) * this.pageSize;
            }
            this.tableData = res.rows;
            this.total = res.total;
          }
      );
    },
  },
  mounted() {
    this.queryList(this.currentPage);
  },
  computed: {
    themeColor() {
      return this.$store.state.app.themeColor;
    },
  },
};
</script>

<style scoped></style>
