<template>
  <div>
    <div class="search-box">
      <el-row :gutter="10" class="vertical-middle">
        <el-col :span="2" class="text-right vertical-middle">
          <div class="grid-content el-line-height">公司名称：</div>
        </el-col>
        <el-col :span="3" class="vertical-middle">
          <div class="grid-content">
            <el-input v-model="searchName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>

        <el-col :span="3" class="vertical-middle">
          <div class="grid-content text-right">
            <el-button
              size="small"
              class="search-btn"
              type="primary"
              @click="queryList((currentPage = 1))"
              >搜索
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <table-header-btn
      :insertBtn="true"
      :exportBtn="true"
      :deleteBtn="true"
      @handleInsert="handleInsert(false)"
      @handleExport="handleExport"
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
      <el-table-column prop="name" label="公司名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="code" label="公司编码" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="业务类型" show-overflow-tooltip
        ><template slot-scope="scope">
          {{ findType(scope.row.businessType) }}
        </template>
      </el-table-column>
      <el-table-column prop="manager" label="管理员" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ findStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
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
  queryCompanyList,
  exportCompanyList,
  deleteCompany,
  queryCompanyStatus,
  queryCompanyType,
} from "@/api/property.js";
import { resolveBlob } from "@/utils/util.js";
import tableHeaderBtn from "@/components/tableHeaderBtn";

export default {
  name: "company",
  components: {
    "table-header-btn": tableHeaderBtn,
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
      type: [],
      status: [],
    };
  },
  methods: {
    findStatus(val) {
      let res = this.status.find((item) => {
        if (item.dictValue === val) {
          return item;
        }
      });
      return res ? res.dictLabel : "";
    },
    // 初始化状态
    initStatus() {
      queryCompanyStatus().then((res) => {
        this.status = res;
      });
    },
    findType(val) {
      let res = this.type.find((item) => {
        if (item.dictValue === val) {
          return item;
        }
      });
      return res ? res.dictLabel : "";
    },
    // 初始化服务类型
    initType() {
      queryCompanyType().then((res) => {
        // console.log(res);
        this.type = res;
      });
    },
    /**
     * 导出信息
     */
    handleExport() {
      this.$confirm("是否导出全部数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.fullscreenLoading = true;
          exportCompanyList({ name: this.searchName }).then((res) => {
            resolveBlob(res, res.type);
            this.$message({
              message: "操作成功",
              center: true,
              type: "success",
            });
            this.fullscreenLoading = false;
          });
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
      // console.log(row);
      this.$refs["editModal"].show({
        view: "property/company/editModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "查看公司",
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
      this.queryList(this.currentPage);
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
        view: "property/company/editModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "编辑公司",
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
      // console.log(index);
      this.$refs["editModal"].show({
        view: "property/company/editModal.vue",
        params: { checkInfo: checkInfo },
        title: "新增公司",
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
          // console.log(row);
          deleteCompany(ids).then((res) => {
            this.$message({
              message: "操作成功",
              center: true,
              type: "success",
            });
            if (this.total % this.pageSize === 1 && this.currentPage > 1) {
              this.currentPage--;
            }
            this.queryList(this.currentPage);
          });
        })
        .catch((error) => {
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

    queryList(currentPage) {
      // console.log(this.searchName);
      queryCompanyList({
        pageNum: currentPage,
        pageSize: this.pageSize,
        name: this.searchName,
      }).then((res) => {
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
    this.initStatus();
    this.initType();
    this.queryList(this.currentPage);
  },
};
</script>

<style scoped></style>
