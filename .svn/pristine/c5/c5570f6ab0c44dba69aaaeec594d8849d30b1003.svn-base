<template>
  <div>
    <div class="search-box">
      <el-row :gutter="10" class="vertical-middle">
        <el-col :span="2" class="text-right vertical-middle">
          <div class="grid-content el-line-height">地图名称：</div>
        </el-col>
        <el-col :span="5" class="vertical-middle">
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
      <el-table-column prop="id" label="主键" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="name" label="地图名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="code" label="地图编码" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="version" label="版本" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ findStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <template v-if="scope.row.status === '4'">
            <el-button
              size="mini"
              type="text"
              @click="handleDeplo(scope.row.code)"
              >上线
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(false, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleCoordinate(scope.row)"
              >坐标
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row.id)"
              >删除
            </el-button>
          </template>
          <template v-else>
            <el-button
              size="mini"
              type="text"
              @click="handleOff(scope.row.code)"
              >下线
            </el-button>
          </template>
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
  queryMapList,
  exportMapList,
  deleteMap,
  deployMap,
  offMap,
} from "@/api/map.js";
import { queryDictionary } from "@/api/common.js";
import { resolveBlob } from "@/utils/util.js";
import tableHeaderBtn from "@/components/tableHeaderBtn";

export default {
  name: "mapSetting",
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

      status: [],
    };
  },
  methods: {
    queryStatusList() {
      queryDictionary("tygx_map_status").then((res) => {
        // console.log(res);
        this.status = res;
      });
    },
    findStatus(id) {
      let res = this.status.find((item) => {
        if (item.dictValue === id) {
          return item;
        }
      });
      return res ? res.dictLabel : "";
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
          exportMapList({ name: this.searchName }).then((res) => {
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
     * 查看坐标
     * @param {Object} row
     */
    handleCoordinate(row) {
      // console.log(row);
      this.$refs["editModal"].show({
        view: "map/setting/coordinateTable.vue",
        params: { referenceMapCode: row.code },
        title: "查看坐标",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
      });
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
     * 上线操心
     * @param {String} code
     */
    handleDeplo(code) {
      this.$confirm("确认上线?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deployMap(code).then((res) => {
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

    /**
     * 下线操心
     * @param {String} code
     */
    handleOff(code) {
      this.$confirm("确认下线?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          offMap(code).then((res) => {
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
        view: "map/setting/editModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "编辑地图",
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
        view: "map/setting/editModal.vue",
        params: { checkInfo: checkInfo },
        title: "新增地图",
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
          deleteMap(ids).then((res) => {
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
      queryMapList({
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
    this.queryList(this.currentPage);
    this.queryStatusList();
  },
};
</script>

<style scoped></style>
