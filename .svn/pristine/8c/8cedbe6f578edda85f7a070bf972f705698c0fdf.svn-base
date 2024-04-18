<template>
  <div>
    <!--    <div class="search-box">-->
    <!--      <el-row :gutter="10" class="vertical-middle">-->
    <!--        <el-col :span="4" class="text-right vertical-middle">-->
    <!--          <div class="grid-content el-line-height">名称：</div>-->
    <!--        </el-col>-->
    <!--        <el-col :span="7" class="vertical-middle">-->
    <!--          <div class="grid-content">-->
    <!--            <el-input v-model="searchName" placeholder="请输入内容"></el-input>-->
    <!--          </div>-->
    <!--        </el-col>-->

    <!--        <el-col :span="2" class="vertical-middle">-->
    <!--          <div class="grid-content text-right">-->
    <!--            <el-button-->
    <!--              size="small"-->
    <!--              class="search-btn"-->
    <!--              type="primary"-->
    <!--              @click="queryList((currentPage = 1))"-->
    <!--              :style="{ 'background-color': themeColor }"-->
    <!--              >搜索-->
    <!--            </el-button>-->
    <!--          </div>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </div>-->
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @select-all="onSelectAll"
      @selection-change="selectItem"
      @row-click="onSelectOp"
      :loading="loading"
    >
      <el-table-column type="selection" :reserve-selection="false">
      </el-table-column>
      <el-table-column prop="name" label="名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="code" label="编码" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="typeCodeName" label="类型" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip>
        <template slot-scope="scope"
          >{{ findStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column prop="manager" label="管理员" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip>
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
import { queryPlaceWithConfirm } from "@/api/appointment.js";

export default {
  name: "placeModal",
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      searchName: "",
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: 0,
      status: [
        {
          id: "0",
          name: "未提交",
        },
        {
          id: "1",
          name: "审核中",
        },
        {
          id: "2",
          name: "拒绝",
        },
        {
          id: "3",
          name: "正常",
        },
        {
          id: "4",
          name: "下线",
        },
      ],
      typeCode: "",
      referenceOrganizationId: "",
      manager: "",
    };
  },
  methods: {
    findStatus(val) {
      let res = this.status.find((item) => {
        if (item.id === val) {
          return item;
        }
      });
      return res ? res.name : "";
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

    //多选
    handleSelectionChange(val) {
      // console.log("选中", val);
      this.multipleSelection = val;
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
      this.loading = true;
      // console.log(this.searchName);
      queryPlaceWithConfirm({
        typeCode: this.typeCode,
        referenceOrganizationId: this.referenceOrganizationId,
        manager: this.manager,
        pageNum: currentPage,
        pageSize: this.pageSize,
        // name: this.searchName,
      }).then((res) => {
        // console.log(res);
        // for (let index in res) {
        //   res.rows[index].index =
        //     parseInt(index) + 1 + (this.currentPage - 1) * this.pageSize;
        // }
        this.tableData = res.rows;
        this.total = res.total;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.typeCode = this.params.referenceServiceTypeCode;
    this.referenceOrganizationId = this.params.info.referenceOrganizationId;
    this.manager = this.params.info.manager;
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
