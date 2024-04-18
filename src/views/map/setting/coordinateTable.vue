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
    >
      <!--      <el-table-column type="selection" :reserve-selection="false">-->
      <!--      </el-table-column>-->
      <el-table-column prop="id" label="主键" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="name" label="坐标名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="code" label="坐标编码" show-overflow-tooltip>
        <!--        <template slot-scope="scope" v-if="scope.row.certType">-->
        <!--          {{ findCertType(scope.row.certType) }}-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column
        prop="referenceMapCode"
        label="关联地图编码"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="x" label="x" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="y" label="y" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(false, scope.row)"
            >编辑
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
import { queryMapCoordinateList } from "@/api/map.js";
export default {
  name: "coordinateTable",
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
     * 编辑操作
     * @param {boolean} checkInfo
     * @param {Object} row
     */
    handleEdit(checkInfo, row) {
      // console.log(index, row);
      this.$refs["editModal"].show({
        view: "map/setting/coordinateModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "编辑坐标",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: this.modalCallFunction,
      });
    },
    /**
     *modal回调
     */
    modalCallFunction() {
      this.queryList(this.currentPage);
      this.$refs["editModal"].hide();
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
      console.log("选中", val);
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
      // console.log(this.searchName);
      queryMapCoordinateList({
        pageNum: currentPage,
        pageSize: this.pageSize,
        name: this.searchName,
        referenceMapCode: this.params.referenceMapCode,
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
    this.queryList(this.currentPage);
  },
};
</script>

<style scoped></style>
