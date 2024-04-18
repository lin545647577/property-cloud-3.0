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
    <el-table
      :row-key="(row) => row.userId"
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :reserve-selection="true">
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
      <el-button @click="hiddenModal" size="small">取消</el-button>
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
import { listSystemUser, listSystemSingleUser } from "@/api/taskProcess";

export default {
  name: "multipleModalTable",
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

      defaultSelected: [], //传入已选id
      isInit: true, //是否第一次初始化，获取初次默认勾选用
      returnData: {},
      showTable: true,
    };
  },
  methods: {
    submitForm(formName) {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "请选择内容",
          center: true,
          type: "warning",
        });
        return;
      }
      let data = this.multipleSelection;
      let tempArr = [],
        tempName = [];
      for (let index in data) {
        tempArr.push(data[index].userId);
        tempName.push(data[index].nickName);
      }
      // if (tempName.length > 4) {
      //   console.log(tempName.toString());
      // } else {
      //   console.log(tempName.toString());
      // }

      this.returnData.usersToCarbonCopy = tempArr;
      this.returnData.carbonCopyUserNames = tempName.toString();

      this.$emit("modal-submit");
    },

    hiddenModal() {
      // console.log(this.form);
      this.$emit("modal-cancel");
    },

    onSelectAll() {
      this.$refs.multipleTable.clearSelection();
    },
    //点击行触发选中
    onSelectOp(row) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(row, true);
      this.multipleSelection = [];
      this.multipleSelection.push(row);
    },

    //表格选择
    handleSelectionChange(val) {
      // console.log("select:", val);
      this.multipleSelection = val;
    },

    checkArrayContain(deArr, mulArr) {
      let mark = 0;
      for (let index in deArr) {
        mulArr.forEach((item) => {
          if (item.userId === deArr[index].userId) {
            mark++;
            return;
          }
        });
      }
      return deArr.length > mark && mark > 0;
    },

    checkArrayEqual(deArr, mulArr) {
      let mark = 0;
      for (let index in deArr) {
        mulArr.forEach((item) => {
          if (item.userId === deArr[index].userId) {
            mark++;
            return;
          }
        });
      }
      return mark == mulArr.length;
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
        // console.log(res);
        this.tableData = res.rows;
        this.total = res.total;
        // 渲染已选中
        if (this.params.ids.length > 0 && this.isInit) {
          // this.$nextTick(() => {
          setTimeout(() => {
            this.queryDefaultSelected(this.params.ids);
          }, 1000);
          // });
        }
      });
    },
    queryDefaultSelected(ids) {
      this.multipleSelection = [];
      this.$refs.multipleTable.clearSelection();
      for (let id of ids) {
        this.showTable = true;
        listSystemSingleUser(id).then((res) => {
          if (res.code) {
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].userId === res.data.userId) {
                this.multipleSelection.push(this.tableData[i]);
                this.$refs.multipleTable.toggleRowSelection(
                  this.tableData[i],
                  true
                );
              }
            }

            // this.showTable = false;
          }
        });
      }
      this.isInit = false;
    },
  },
  mounted() {
    this.queryList(this.currentPage);
  },
};
</script>

<style scoped></style>
