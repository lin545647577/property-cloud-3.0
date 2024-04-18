<template>
  <div>
    <div class="search-box">
      <el-row :gutter="10" class="vertical-middle">
        <el-col :span="2" class="text-right vertical-middle">
          <div class="grid-content el-line-height">车位编号：</div>
        </el-col>
        <el-col :span="3" class="vertical-middle">
          <div class="grid-content">
            <el-input v-model="searchName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>

        <el-col :span="2" class="text-right vertical-middle">
          <div class="grid-content el-line-height">状态：</div>
        </el-col>
        <el-col :span="3" class="vertical-middle">
          <div class="grid-content">
            <el-select
              v-model="searchStatus"
              placeholder="请选择"
              @change="queryList((currentPage = 1))"
            >
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in states"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="2" class="text-right vertical-middle">
          <div class="grid-content el-line-height">管理类型：</div>
        </el-col>
        <el-col :span="3" class="vertical-middle">
          <div class="grid-content">
            <el-select
              v-model="searchType"
              placeholder="请选择"
              @change="queryList((currentPage = 1))"
            >
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in manageType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
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
      <el-table-column prop="parkingId" label="车位编号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="parkingTypeName"
        label="车位类型"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="管理类型" show-overflow-tooltip>
        <template slot-scope="scope" v-if="scope.row.type">
          {{ findManageType(scope.row.type) }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="preMoney" label="预售价格" show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column prop="rent" label="租金" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="parkingPoint"
        label="车位位置"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip>
        <template slot-scope="scope" v-if="scope.row.status">
          {{ findState(scope.row.status) }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="houseUniquecode" width="160" label="房屋唯一码" show-overflow-tooltip>
      </el-table-column> -->
      <!-- <el-table-column prop="houseType" label="房屋户型" show-overflow-tooltip>
      </el-table-column> -->
      <!-- <el-table-column label="关联房屋" show-overflow-tooltip>
        <template slot-scope="scope" v-if="scope.row.tEstateHouseInfo">{{scope.row.tEstateHouseInfo.name}}</template>
      </el-table-column> -->
      <el-table-column label="类型" show-overflow-tooltip>
        <template slot-scope="scope" v-if="scope.row.estateType">
          {{ findType(scope.row.estateType) }}
        </template>
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
import {
  queryParkingList,
  exportParkingList,
  deleteParking,
} from "@/api/parking.js";
import { resolveBlob } from "@/utils/util.js";
import tableHeaderBtn from "@/components/tableHeaderBtn";
export default {
  name: "parking",
  components: {
    "table-header-btn": tableHeaderBtn,
  },
  data() {
    return {
      searchType: "",
      searchStatus: "",
      searchName: "",
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: 0,
      fullscreenLoading: false,
      ids: "",

      states: [
        {
          id: 0,
          name: "未售",
        },
        {
          id: 1,
          name: "未收",
        },
        {
          id: 2,
          name: "已租",
        },
        {
          id: 3,
          name: "已收",
        },
      ],
      manageType: [
        {
          id: 1,
          name: "出租",
        },
        {
          id: 2,
          name: "出售",
        },
      ],
      type: [
        {
          id: 1,
          name: "产权",
        },
        {
          id: 2,
          name: "人防",
        },
      ],
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
          exportParkingList({ name: this.searchName }).then((res) => {
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
        view: "parking/parking/editModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "查看车位",
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
        view: "parking/parking/editModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "编辑车位",
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
        view: "parking/parking/editModal.vue",
        params: { checkInfo: checkInfo },
        title: "新增车位",
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
          deleteParking(ids).then((res) => {
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
      queryParkingList({
        pageNum: currentPage,
        pageSize: this.pageSize,
        parkingId: this.searchName,
        status: this.searchStatus,
        type: this.searchType,
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
    findState(sid) {
      let res = this.states.find((item) => {
        return item.id == sid;
      });
      return res ? res.name : "";
    },
    findType(tid) {
      let res = this.type.find((item) => {
        return item.id == tid;
      });
      return res ? res.name : "";
    },
    findManageType(mid) {
      let res = this.manageType.find((item) => {
        return item.id == mid;
      });
      return res ? res.name : "";
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
