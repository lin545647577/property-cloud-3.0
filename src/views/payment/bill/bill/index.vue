<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content">
          <rTree></rTree>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content">
          <div class="search-box">
            <el-row :gutter="10" class="vertical-middle">
              <el-col :span="2" class="text-right vertical-middle">
                <div class="grid-content el-line-height">账单名称：</div>
              </el-col>
              <el-col :span="5" class="vertical-middle">
                <div class="grid-content">
                  <el-input
                    v-model="searchName"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="2" class="text-right vertical-middle">
                <div class="grid-content el-line-height">月份：</div>
              </el-col>
              <el-col :span="5" class="vertical-middle">
                <div class="grid-content">
                  <el-date-picker
                    v-model="searchMonth"
                    style="width: auto"
                    type="month"
                    @change="changeData"
                    placeholder="选择月份"
                  ></el-date-picker>
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
            :billInsertBtn="true"
            :generateBtn="true"
            :releasesBtn="true"
            :exportBtn="true"
            :deleteBtn="true"
            @handleInsert="handleInsert(false)"
            @handleGenerateModal="handleGenerateModal"
            @handleReleases="handleReleases"
            @handleExport="handleExport"
            @handleDeletes="handleDeletes"
          ></table-header-btn>

          <!--          <div class="btn-box">-->
          <!--            <el-button-->
          <!--              size="small"-->
          <!--              class="control-btn"-->
          <!--              type="primary"-->
          <!--              @click="handleInsert(false)"-->
          <!--              >添加其他公摊账单-->
          <!--            </el-button>-->
          <!--            <el-button-->
          <!--              size="small"-->
          <!--              class="control-btn"-->
          <!--              type="primary"-->
          <!--              @click="handleGenerateModal"-->
          <!--              >生成账单-->
          <!--            </el-button>-->
          <!--            <el-button-->
          <!--              size="small"-->
          <!--              class="control-btn"-->
          <!--              type="primary"-->
          <!--              @click="handleReleases"-->
          <!--              >发布-->
          <!--            </el-button>-->
          <!--            <el-button-->
          <!--              size="small"-->
          <!--              class="control-btn"-->
          <!--              type="primary"-->
          <!--              @click="handleExport"-->
          <!--              >导出-->
          <!--            </el-button>-->
          <!--            <el-button-->
          <!--              size="small"-->
          <!--              class="control-btn"-->
          <!--              type="danger"-->
          <!--              @click="handleDeletes"-->
          <!--              >删除-->
          <!--            </el-button>-->
          <!--          </div>-->
          <el-table
            border
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column
              label="序号"
              prop="index"
              width="60"
            ></el-table-column>
            <el-table-column prop="name" label="账单名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="month" label="日期"> </el-table-column>
            <el-table-column prop="totalAmoutYuan" label="总金额">
            </el-table-column>
            <el-table-column label="费用类型">
              <template slot-scope="scope">{{
                findType(scope.row.itemType)
              }}</template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">{{
                scope.row.status == "build" ? "创建" : "发布"
              }}</template>
            </el-table-column>
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
                  @click="handleRelease(scope.row)"
                  >发布</el-button
                >
                <el-button
                  v-if="scope.row.itemType === 10"
                  type="text"
                  size="mini"
                  @click="handleCount(scope.row)"
                  >计算
                </el-button>
                <el-button
                  v-if="scope.row.itemType === 10"
                  type="text"
                  size="mini"
                  @click="handleEdit(false, scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDelete(scope.row)"
                  >删除</el-button
                >
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  queryTotalBillList,
  exportTotalBillList,
  deleteTotalBill,
  generateTotalBill,
  releaseTotalBill,
  calculationOtherBill,
} from "@/api/payment.js";
import { resolveBlob, dateFormat } from "@/utils/util.js";
import rTree from "@/components/residenceTree.vue";
import tableHeaderBtn from "@/components/tableHeaderBtn";

export default {
  name: "bill",
  components: {
    rTree,
    "table-header-btn": tableHeaderBtn,
  },
  data() {
    return {
      searchMonth: new Date(),
      searchName: "",
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: 0,
      ids: "",
      isRelease: false,

      types: [
        {
          id: 1,
          name: "房屋管理费",
        },
        {
          id: 2,
          name: "车位管理费",
        },
        {
          id: 3,
          name: "房屋水电公摊",
        },
        {
          id: 4,
          name: "车位水电公摊",
        },
        {
          id: 5,
          name: "水电费代收",
        },
        {
          id: 6,
          name: "房屋固定公摊费",
        },
        {
          id: 7,
          name: "车位固定公摊",
        },
        {
          id: 10,
          name: "其他公摊账单",
        },
      ],
    };
  },
  methods: {
    /**
     * 计算公摊账单操作
     * @param {Object} row
     */
    handleCount(row) {
      if (row.status === "release") {
        this.$message({
          message: "该费用已发布",
          center: true,
          type: "warning",
        });
        return;
      }
      calculationOtherBill(row.id).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.queryList(this.currentPage);
      });
    },
    // 月份选择器
    changeData() {
      this.queryList((this.currentPage = 1));
    },

    findType(val) {
      let res = this.types.find((item) => {
        return item.id == val;
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
          exportTotalBillList({ name: this.searchName }).then((res) => {
            this.$message({
              message: "操作成功",
              center: true,
              type: "success",
            });
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
    //表格选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let tempArr = [];
      for (let index in val) {
        if (val[index].status === "release") {
          this.isRelease = true;
        }
        tempArr.push(val[index].id);
      }
      this.ids = tempArr.toString();
      // console.log("表格选择",this.ids);
    },
    /**
     * 批量删除
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
      } else if (this.isRelease) {
        this.$message({
          message: "该费用已发布",
          center: true,
          type: "warning",
        });
        return;
      }

      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteTotalBill(this.ids).then((res) => {
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

    /**
     * 查看操作
     * @param {boolean} checkInfo
     * @param {Object} row
     */
    handleCheck(checkInfo, row) {
      // console.log(row);
      this.$refs["editModal"].show({
        view: "payment/bill/bill/billDetailModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "查看账单",
        width: "80%",
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
     * 批量发布
     */
    handleReleases() {
      // console.log("ids:", this.ids);
      if (!this.ids) {
        this.$message({
          message: "请勾选内容",
          center: true,
          type: "warning",
        });
        return;
      }
      this.releaseBill(this.ids);
    },

    /**
     * 发布操作
     * @param {Object} row
     */
    handleRelease(row) {
      // console.log("发布", row);
      if (row.status === "release") {
        this.$message({
          message: "该费用已发布",
          center: true,
          type: "warning",
        });
        return;
      }
      this.releaseBill(row.id);
    },

    /**
     * 发布
     * @param {String} ids
     */
    releaseBill(ids) {
      releaseTotalBill(ids).then((res) => {
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.queryList(this.currentPage);
      });
    },

    // 选择费用项目
    handleGenerateModal() {
      let that = this;
      this.$refs["editModal"].show({
        view: "payment/common/itemModal.vue",
        params: { referenceResidenceId: this.referenceResidenceId },
        title: "选择费用项目",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: (data) => {
          // console.log(data.multipleSelection);
          let itemIds = [];
          for (let index in data.multipleSelection) {
            itemIds.push(data.multipleSelection[index].id);
          }
          that.generateInfo(itemIds.toString());
          that.$refs["editModal"].hide();
        },
      });
    },

    /**
     * 生成账单
     * @param {String} itemIds 费用项目id（s）
     */
    generateInfo(itemIds) {
      generateTotalBill({
        itemIds: itemIds,
        month: dateFormat("yyyy-MM", this.searchMonth),
      }).then((res) => {
        // console.log(res);
        this.$message({
          message: "操作成功",
          center: true,
          type: "success",
        });
        this.queryList(this.currentPage);
      });
    },

    /**
     * 编辑操作
     * @param {boolean} checkInfo
     * @param {Object} row
     */
    handleEdit(checkInfo, row) {
      if (row.status === "release") {
        this.$message({
          message: "该费用已发布",
          center: true,
          type: "warning",
        });
        return;
      }
      // console.log( row);
      this.$refs["editModal"].show({
        view: "payment/bill/bill/editModal.vue",
        params: {
          checkInfo: checkInfo,
          id: row.id,
          referenceResidenceId: this.referenceResidenceId,
        },
        title: "编辑其他公摊账单",
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
      // console.log( row);
      this.$refs["editModal"].show({
        view: "payment/bill/bill/editModal.vue",
        params: {
          checkInfo: checkInfo,
          referenceResidenceId: this.referenceResidenceId,
          month: this.searchMonth,
        },
        title: "新增其他公摊账单",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: this.modalCallFunction,
      });
    },
    /**
     * 删除
     * @param {Object} row
     */
    handleDelete(row) {
      if (row.status === "release") {
        this.$message({
          message: "该费用已发布",
          center: true,
          type: "warning",
        });
        return;
      }

      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteTotalBill(row.id).then((res) => {
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
      queryTotalBillList({
        month: dateFormat("yyyy-MM", this.searchMonth),
        pageNum: currentPage,
        pageSize: this.pageSize,
        name: this.searchName,
        referenceResidenceId: this.referenceResidenceId,
      }).then((res) => {
        // console.log(res);
        for (let i in res.rows) {
          res.rows[i].index =
            parseInt(i) + 1 + (this.currentPage - 1) * this.pageSize;
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
    referenceResidenceId() {
      return this.$store.state.residenceTreeSelected;
    },
  },
  watch: {
    referenceResidenceId(nval, oval) {
      if (nval != oval) {
        this.queryList(this.currentPage);
      }
    },
  },
};
</script>

<style scoped>
.explain-boxes {
  margin-bottom: 20px;
}

.explain-box {
  border: 1px solid #dcdfe6;
  text-align: center;
  padding: 10px 5px;
  font-weight: 400;
  margin: 10px auto;
  border-radius: 5px;
  background-color: #f2fffd;
}

.mini-table {
  margin: 20px auto 0 auto;
  width: 67%;
}

.search-box {
  margin: 20px auto;
}

.control-btn {
  color: #ffffff;
}
</style>
