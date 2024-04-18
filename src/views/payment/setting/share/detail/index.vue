<template>
  <div>
    <div class="search-box">
      <el-row :gutter="10" class="vertical-middle">
        <el-col :span="4" class="text-right vertical-middle">
          <div class="grid-content el-line-height">名称：</div>
        </el-col>
        <el-col :span="7" class="vertical-middle">
          <div class="grid-content">
            <el-input v-model="searchName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>

        <el-col :span="2" class="vertical-middle">
          <div class="grid-content text-right">
            <el-button
              size="small"
              class="search-btn"
              type="primary"
              @click="queryList(referenceCoefficientId)"
              >搜索
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <table-header-btn
      :insertBtn="true"
      :deleteBtn="true"
      @handleInsert="handleInsert(false)"
      @handleDeletes="handleDeletes"
    ></table-header-btn>
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" prop="index" width="60"></el-table-column>
      <el-table-column
        prop="coefficient"
        label="楼层分摊系数K"
      ></el-table-column>
      <el-table-column prop="start" label="开始楼层"></el-table-column>
      <el-table-column prop="end" label="截至楼层"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleCheck(true, scope.row)"
            >查看</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="handleEdit(false, scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="text" @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--    <div class="block pagination-center">-->
    <!--      <el-pagination-->
    <!--          @size-change="handleSizeChange"-->
    <!--          @current-change="handleCurrentChange"-->
    <!--          :current-page="currentPage"-->
    <!--          :page-sizes="pageSizes"-->
    <!--          :page-size="pageSize"-->
    <!--          layout="total, sizes, prev, pager, next, jumper"-->
    <!--          :total="total"-->
    <!--      >-->
    <!--      </el-pagination>-->
    <!--    </div>-->
    <li-modal style="min-width: 1200px" ref="editModal" />
  </div>
</template>

<script>
import {
  queryCoefficientDetailList,
  deleteCoefficientDetail,
} from "@/api/payment.js";
import tableHeaderBtn from "@/components/tableHeaderBtn";
export default {
  name: "detail",
  components: {
    "table-header-btn": tableHeaderBtn,
  },
  props: {
    params: {
      type: Object,
      required: true,
    },
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
      fullscreenLoading: false,
      ids: "",

      referenceCoefficientId: "",
    };
  },
  methods: {
    //表格选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let tempArr = [];
      for (let index in val) {
        tempArr.push(val[index].id);
      }
      this.ids = tempArr.toString();
      // console.log("表格选择",this.ids);
    },
    /**
     * 删除
     * @param {String} ids
     */
    handleDeletes() {
      // console.log("ids:", this.ids);
      if (!this.ids) {
        this.$message({
          message: "请勾选内容",
          center: true,
          type: "warning",
        });
        return;
      }
      this.handleDelete(this.ids);
    },

    /**
     * 查看操作
     * @param {boolean} checkInfo
     * @param {Object} row
     */
    handleCheck(checkInfo, row) {
      // console.log(row);
      this.$refs["editModal"].show({
        view: "payment/setting/share/detail/editModal.vue",
        params: {
          checkInfo: checkInfo,
          id: row.id,
          referenceCoefficientId: this.referenceCoefficientId,
        },
        title: "查看分摊详情",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
      });
    },

    /**
     *modal回调
     */
    modalCallFunction() {
      this.queryList(this.referenceCoefficientId);
      this.$refs["editModal"].hide();
    },

    /**
     * 编辑操作
     * @param {boolean} checkInfo
     * @param {Object} row
     */
    handleEdit(checkInfo, row) {
      console.log("编辑", row);
      this.$refs["editModal"].show({
        view: "payment/setting/share/detail/editModal.vue",
        params: {
          checkInfo: checkInfo,
          id: row.id,
          referenceCoefficientId: this.referenceCoefficientId,
        },
        title: "编辑分摊详情",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: this.modalCallFunction,
      });
    },

    /**
     * 新增操作
     * @param {boolean} checkInfo
     */
    handleInsert(checkInfo) {
      // console.log(index, row);
      this.$refs["editModal"].show({
        view: "payment/setting/share/detail/editModal.vue",
        params: {
          checkInfo: checkInfo,
          referenceCoefficientId: this.referenceCoefficientId,
        },
        title: "新增分摊详情",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: this.modalCallFunction,
      });
    },
    /**
     * 删除
     * @param index
     * @param {Object} row
     */
    handleDelete(ids) {
      // console.log(ids);
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCoefficientDetail(ids).then((res) => {
            this.$message({
              message: "操作成功",
              center: true,
              type: "success",
            });
            if (this.total % this.pageSize === 1 && this.currentPage > 1) {
              this.currentPage--;
            }
            this.queryList(this.referenceCoefficientId);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //每页显示条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.queryList((this.currentPage = 1));
    },

    // 分页
    handleCurrentChange(val) {
      this.queryList((this.currentPage = val));
    },

    queryList(id) {
      // console.log(this.searchName);
      queryCoefficientDetailList(id).then((res) => {
        // console.log(res);
        for (let index in res.rows) {
          res.rows[index].index =
            parseInt(index) + 1 + (this.currentPage - 1) * this.pageSize;
        }
        this.tableData = res.rows;
        this.total = res.total;
      });
    },
  },
  mounted() {
    // console.log(this.params.id);
    this.referenceCoefficientId = this.params.id;
    this.queryList(this.referenceCoefficientId);
  },
};
</script>

<style scoped></style>
