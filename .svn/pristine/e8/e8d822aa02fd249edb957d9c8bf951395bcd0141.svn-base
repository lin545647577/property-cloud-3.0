<template>
  <div>
    <div class="search-box">
      <el-row :gutter="10" class="vertical-middle">
        <el-col :span="2" class="text-right vertical-middle">
          <div class="grid-content el-line-height">查询内容：</div>
        </el-col>
        <el-col :span="3" class="vertical-middle">
          <div class="grid-content">
            <el-input
              v-model="searchFilter"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </el-col>

        <el-col :span="3" class="vertical-middle">
          <div class="grid-content text-right">
            <el-button
              size="small"
              class="search-btn"
              type="primary"
              @click="queryTableData((currentPage = 1))"
              >搜索
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <table-header-btn
      :deleteBtn="true"
      @handleDeletes="handleDeletes"
    ></table-header-btn>
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection"></el-table-column>
      <!--      <el-table-column label="序号" prop="index" width="60"></el-table-column>-->
      <el-table-column
        v-for="item in tableHeader"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleCheck(true, scope.row)"
            >查看
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="handleEdit(false, scope.row)"
            >编辑
          </el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row.id)"
            >删除
          </el-button>
        </template>
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
    <li-modal style="min-width: 1200px" ref="editModal" />
  </div>
</template>

<script>
import {
  queryPropertyTableHeader,
  queryPropertyTableData,
  deleteFormData,
  editFormData,
} from "@/api/property.js";
import { resolveBlob } from "@/utils/util.js";
import tableHeaderBtn from "@/components/tableHeaderBtn";
export default {
  name: "table",
  props: {
    typeCode: {
      type: String,
      require: true,
    },
    modalUrl: {
      type: String,
    },
    title: {
      type: String,
      require: true,
    },
  },
  components: {
    "table-header-btn": tableHeaderBtn,
  },
  data() {
    return {
      loading: false,
      searchFilter: "",
      tableData: [],
      tableHeader: [],
      multipleSelection: [],
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: 0,
      fullscreenLoading: false,
      ids: "",
    };
  },
  methods: {
    /**
     * 导出小区信息
     */
    handleExport() {
      this.$confirm("是否导出全部数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.fullscreenLoading = true;
          // exportResidenceList({}).then((res) => {
          //   resolveBlob(res, res.type);
          //   this.$message({
          //     message: "操作成功",
          //     center: true,
          //     type: "success",
          //   });
          this.fullscreenLoading = false;
          // });
          //文件流
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
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
      this.$refs["editModal"].show({
        view: this.modalUrl,
        params: { checkInfo: checkInfo, id: row.id },
        title: "查看" + this.title,
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
      this.queryTableData(this.currentPage);
      this.$refs["editModal"].hide();
    },

    /**
     * 编辑操作
     * @param {boolean} checkInfo
     * @param {Object} row
     */
    handleEdit(checkInfo, row) {
      // console.log(index, row);
      this.$refs["editModal"].show({
        view: this.modalUrl,
        params: { checkInfo: checkInfo, id: row.id },
        title: "编辑" + this.title,
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
     * @param {Object} row
     */
    handleInsert(checkInfo, row) {
      // console.log(index, row);
      this.$refs["editModal"].show({
        view: this.modalUrl,
        params: { checkInfo: checkInfo },
        title: "新增" + this.title,
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
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteFormData(ids).then((res) => {
            this.$message({
              message: "操作成功",
              center: true,
              type: "success",
            });
            this.queryTableData(this.currentPage);
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
      this.queryTableData((this.currentPage = 1));
    },

    // 分页
    handleCurrentChange(val) {
      this.queryTableData((this.currentPage = val));
    },

    queryTableData(currentPage) {
      queryPropertyTableData({
        typeCode: this.typeCode,
        filter: this.searchFilter,
        pageSize: this.pageSize,
        pageNum: currentPage,
      }).then((tableData) => {
        // console.log(tableData);
        this.tableData = tableData.rows;
        this.total = tableData.total;
        this.loading = false;
      });
    },

    queryTable() {
      // console.log(this.searchName);
      this.loading = true;
      queryPropertyTableHeader(this.typeCode).then((res) => {
        this.tableHeader = res;
        this.queryTableData(this.currentPage);
        // console.log(res);
      });
    },
  },
  mounted() {
    this.queryTable(this.currentPage);
  },
};
</script>

<style scoped></style>
