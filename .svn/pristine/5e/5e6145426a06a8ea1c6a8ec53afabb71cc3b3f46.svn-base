<template>
  <div>
    <div class="search-box">
      <el-row :gutter="10" class="vertical-middle">
        <el-col :span="4" class="text-right vertical-middle">
          <div class="grid-content el-line-height">名称：</div>
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
                :style="{ 'background-color': themeColor }"
            >搜索
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>

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
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" prop="index" width="60"></el-table-column>
      <el-table-column prop="parkingId" label="车位编号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="parkingTypeName" label="车位类型" show-overflow-tooltip>
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
      <el-table-column prop="parkingPoint" label="车位位置" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip>
        <template slot-scope="scope" v-if="scope.row.status">
          {{ findState(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column label="类型" show-overflow-tooltip>
        <template slot-scope="scope" v-if="scope.row.estateType">
          {{ findType(scope.row.estateType) }}
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
          :style="{ 'background-color': themeColor }"
          @click="submitForm('ruleForm')"
      >确认
      </el-button>
    </div>
  </div>
</template>

<script>
import { queryParkingList } from "@/api/parking.js";
export default {
  name: "parkingTypeModal",
  data() {
    return {
      searchName: "",
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: 0,

      states: [{
        id: 0,
        name: '未售'
      },
        {
          id: 1,
          name: '未收'
        },
        {
          id: 2,
          name: '已租'
        }, {
          id: 3,
          name: '已收'
        }
      ],
      manageType: [{
        id: 1,
        name: '出租'
      },
        {
          id: 2,
          name: '出售'
        }
      ],
      type: [{
        id: 1,
        name: '产权'
      }, {
        id: 2,
        name: '人防'
      }],
    };
  },
  methods: {
    findState(sid) {
      let res = this.states.find(item => {
        return item.id == sid;
      });
      return res ? res.name : '';
    },
    findType(tid) {
      let res = this.type.find(item => {
        return item.id == tid;
      });
      return res ? res.name : "";
    },
    findManageType(mid) {
      let res = this.manageType.find(item => {
        return item.id == mid;
      })
      return res ? res.name : ''
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
      // console.log("选中", val);
      this.multipleSelection = val;
    },
    //每页显示条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.queryList(this.currentPage=1);
    },

    // 分页
    handleCurrentChange(val) {
      // console.log(`第 ${val} 页`);
      this.queryList(this.currentPage=val);
    },
    queryList(currentPage) {
      // console.log(this.searchName);
      queryParkingList(
          {
            pageNum: currentPage,
            pageSize: this.pageSize,
            name: this.searchName,
          }).then(
          (res) => {
            // console.log(res);
            for (let index in res.rows) {
              res.rows[index].index =
                  parseInt(index) + 1 + (this.currentPage - 1) * this.pageSize;
            }
            this.tableData = res.rows;
            this.total = res.total;
          }
      );
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
