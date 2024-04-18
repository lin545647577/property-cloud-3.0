<template>
  <div>
    <div class="search-box">
      <el-row :gutter="10" class="vertical-middle">
        <el-col :span="4" class="text-right vertical-middle">
          <div class="grid-content el-line-height">昵称：</div>
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
              @click="queryList((currentPage = 1))"
              >搜索
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--    <el-table-->
    <!--      border-->
    <!--      ref="multipleTable"-->
    <!--      :data="tableData"-->
    <!--      tooltip-effect="dark"-->
    <!--      style="width: 100%"-->
    <!--      @select-all="onSelectAll"-->
    <!--      @selection-change="selectItem"-->
    <!--      @row-click="onSelectOp"-->
    <!--    >-->
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @select-all="onSelectAll"
      @selection-change="selectItem"
    >
      <el-table-column type="selection" :reserve-selection="false">
      </el-table-column>
      <el-table-column label="昵称" prop="nickName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="账号" prop="userName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="部门" prop="dept.deptName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="性别" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.sex == "1" ? "女" : "男" }}
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

    <div class="modal-btn">
      <el-button size="small" @click="hiddenModal">取消</el-button>
      <el-button
        size="small"
        type="primary"
        class="control-btn"
        @click="submitForm('ruleForm')"
        >确认
      </el-button>
    </div>
  </div>
</template>

<script>
import { listSystemUser } from "@/api/taskProcess";
export default {
  name: "singleModalTable",
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
    };
  },
  methods: {
    /**
     * 表单提交
     * @param {String} formName ref表单名
     */
    submitForm(formName) {
      if (!this.multipleSelection.length) {
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
      // console.log(this.form);
      this.$emit("modal-cancel");
    },

    onSelectAll() {
      this.$refs.multipleTable.clearSelection();
    },
    //单选事件
    selectItem(rows) {
      if (rows.length > 1) {
        var newRows = rows.filter((it, index) => {
          if (index == rows.length - 1) {
            this.$refs.multipleTable.toggleRowSelection(it, true);
            return true;
          } else {
            this.$refs.multipleTable.toggleRowSelection(it, false);
            return false;
          }
        });
        this.multipleSelection = newRows;
      } else {
        this.multipleSelection = rows;
      }
    },
    //点击行触发选中
    onSelectOp(row) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(row, true);
      this.multipleSelection = [];
      this.multipleSelection.push(row);
    },
    //每页显示条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.queryList((this.currentPage = 1));
    },

    // 分页
    handleCurrentChange(val) {
      // console.log(`第 ${val} 页`);
      this.queryList((this.currentPage = val));
    },
    queryList(currentPage) {
      // console.log(this.searchName);
      listSystemUser({
        pageNum: currentPage,
        pageSize: this.pageSize,
        nickName: this.searchName,
      }).then((res) => {
        for (let index in res.rows) {
          res.rows[index].index =
            parseInt(index) + 1 + (this.currentPage - 1) * this.pageSize;
        }

        this.tableData = res.rows;
        this.total = res.total;

        this.$nextTick(() => {
          if (this.params.chargeUserId) {
            for (let index in this.tableData) {
              if (this.params.chargeUserId === this.tableData[index].userId) {
                this.multipleSelection.push(this.tableData[index]);
                this.$refs.multipleTable.toggleRowSelection(
                  this.tableData[index],
                  true
                );
                break;
              }
            }
          }
        });
      });
    },
  },
  mounted() {
    this.queryList(this.currentPage);
  },
};
</script>

<style scoped></style>
