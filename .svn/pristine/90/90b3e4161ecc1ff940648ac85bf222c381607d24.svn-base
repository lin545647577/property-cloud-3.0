<template>
  <div>
    <div class="search-box">
      <el-row :gutter="10" class="vertical-middle">
        <el-col :span="2" class="text-right vertical-middle">
          <div class="grid-content el-line-height">标题：</div>
        </el-col>
        <el-col :span="5" class="vertical-middle">
          <div class="grid-content">
            <el-input v-model="searchName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>

        <!--        <el-col :span="2" class="text-right vertical-middle">-->
        <!--          <div class="grid-content el-line-height">内容：</div>-->
        <!--        </el-col>-->
        <!--        <el-col :span="5" class="vertical-middle">-->
        <!--          <div class="grid-content">-->
        <!--            <el-input v-model="searchContent" placeholder="请输入"></el-input>-->
        <!--          </div>-->
        <!--        </el-col>-->

        <el-col :span="2" class="text-right vertical-middle">
          <div class="grid-content el-line-height">类型：</div>
        </el-col>
        <el-col :span="5" class="vertical-middle">
          <div class="grid-content">
            <el-select
              @change="changeTable"
              v-model="searchType"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in type"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="2" class="text-right vertical-middle">
          <div class="grid-content el-line-height">状态：</div>
        </el-col>
        <el-col :span="5" class="vertical-middle">
          <div class="grid-content">
            <el-select
              @change="changeTable"
              v-model="searchStatus"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label="所有" value=""></el-option>
              <el-option label="未发布" :value="0"></el-option>
              <el-option label="已发布" :value="1"></el-option>
            </el-select>
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
      <el-table-column prop="workGuideName" label="标题" show-overflow-tooltip>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="workGuideContent"-->
      <!--        label="内容"-->
      <!--        show-overflow-tooltip-->
      <!--      >-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="workGuidePerson"
        label="发布人"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="分类" show-overflow-tooltip>
        <template slot-scope="scope">{{ findType(scope.row.type) }}</template>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip>
        <template slot-scope="scope"
          >{{ scope.row.status === 1 ? "已发布" : "未发布" }}
        </template>
      </el-table-column>
      <el-table-column
        label="发布开始时间"
        show-overflow-tooltip
        prop="publishStartTime"
      >
      </el-table-column>
      <el-table-column
        prop="publishEndTime"
        label="发布结束时间"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleCheck(true, scope.row)"
            >查看
          </el-button>
          <el-button
            size="mini"
            type="text"
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
import { queryGuideList, exportGuideList, deleteGuide } from "@/api/order.js";
import { resolveBlob } from "@/utils/util.js";
import tableHeaderBtn from "@/components/tableHeaderBtn";
export default {
  name: "guide",
  components: {
    "table-header-btn": tableHeaderBtn,
  },
  data() {
    return {
      searchName: "",
      searchContent: "",
      searchType: "",
      searchStatus: "",
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: 0,
      fullscreenLoading: false,
      ids: "",
      type: [
        {
          id: "",
          name: "所有",
        },
        {
          id: 1,
          name: "业务办理指南",
        },
        {
          id: 2,
          name: "扶持政策申报指南",
        },
        {
          id: 3,
          name: "租赁手续办理指南",
        },
      ],
    };
  },
  methods: {
    changeTable() {
      this.queryList((this.currentPage = 1));
    },
    findType(val) {
      let res = this.type.find((item) => {
        if (item.id === val) {
          return item;
        }
      });
      return res ? res.name : "";
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
          exportGuideList({
            suggestName: this.searchName,
            suggestContent: this.searchContent,
          }).then((res) => {
            this.$message({
              message: "操作成功",
              center: true,
              type: "success",
            });
            console.log(res.type);
            resolveBlob(res, res.type);
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
    /**
     * 表格选择
     * @param {Array} val 选中对象
     */
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
        view: "order/guide/editModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "查看办事指南",
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
        view: "order/guide/editModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "编辑办事指南",
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
        view: "order/guide/editModal.vue",
        params: { checkInfo: checkInfo },
        title: "新增办事指南",
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
     */
    handleDelete(ids) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteGuide(ids).then((res) => {
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

    queryList(currentPage) {
      // console.log(this.searchName);
      queryGuideList({
        workGuideName: this.searchName,
        workGuideContent: this.searchContent,
        type: this.searchType,
        status: this.searchStatus,
        pageNum: currentPage,
        pageSize: this.pageSize,
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
  computed: {
    themeColor() {
      return this.$store.state.app.themeColor;
    },
  },
};
</script>

<style scoped></style>
