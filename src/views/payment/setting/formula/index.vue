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
          <div class="explain-boxes">
            <el-row :gutter="10" style="font-size: 12px">
              <el-col :span="6">
                <div class="grid-content explain-box">单项公摊费总额（A）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">同层入住户数（N）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">同楼入住户数（M）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">小区入住户数（T）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">
                  小区已购车位数量（n）
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">楼层数量（m）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">当次分摊总户数（h）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">楼层分摊系数（K）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">车位计费系数（k）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">楼宇总公摊系数（O）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">同楼入住层数（B）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">住房面积（S）</div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content explain-box">车位面积（s）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">物业费单价（Q）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">车位物管费单价（P）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">总用水量（W）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">总用电量（E）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">房屋用水量（w）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">房屋用电量（e）</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content explain-box">仪表用量（MR）</div>
              </el-col>
            </el-row>
          </div>
          <div class="search-box">
            <el-row :gutter="10" class="vertical-middle">
              <el-col :span="2" class="text-right vertical-middle">
                <div class="grid-content el-line-height">名称：</div>
              </el-col>
              <el-col :span="5" class="vertical-middle">
                <div class="grid-content">
                  <el-input
                    v-model="searchName"
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
                    @click="queryList((currentPage = 1))"
                    :style="{ 'background-color': themeColor }"
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
            <el-table-column
              label="序号"
              prop="index"
              width="60"
            ></el-table-column>
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column prop="formula" label="计算公式"></el-table-column>
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
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDelete(scope.row.id)"
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
  queryFormulaList,
  exportFormulaList,
  deleteFormula,
} from "@/api/payment.js";
import { resolveBlob } from "@/utils/util.js";
import rTree from "@/components/residenceTree.vue";
import tableHeaderBtn from "@/components/tableHeaderBtn";
export default {
  name: "formula",
  components: {
    rTree,
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
      ids: "",
    };
  },
  methods: {
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
          exportFormulaList({
            referenceResidenceId: this.referenceResidenceId,
            name: this.searchName,
          }).then((res) => {
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
        tempArr.push(val[index].id);
      }
      this.ids = tempArr.toString();
      // console.log("表格选择",this.ids);
    },
    /**
     * 删除
     */
    handleDeletes() {
      console.log("ids:", this.ids);
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
        view: "payment/setting/formula/editModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "查看计算公式",
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
        view: "payment/setting/formula/editModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "编辑计算公式",
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
        view: "payment/setting/formula/editModal.vue",
        params: {
          checkInfo: checkInfo,
          referenceResidenceId: this.referenceResidenceId,
        },
        title: "新增计算公式",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: this.modalCallFunction,
      });
    },
    /**
     * 删除
     * @param {String} ids
     */
    handleDelete(ids) {
      // console.log(ids);
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteFormula(ids).then((res) => {
            this.$message({
              message: "操作成功",
              center: true,
              type: "success",
            });
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
      queryFormulaList({
        pageNum: currentPage,
        pageSize: this.pageSize,
        name: this.searchName,
        referenceResidenceId: this.referenceResidenceId,
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
  padding: 10px;
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
