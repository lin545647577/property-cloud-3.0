<template>
  <div>
    <div class="search-box">
      <el-row :gutter="10" class="vertical-middle">
        <el-col :span="2" class="text-right vertical-middle">
          <div class="grid-content el-line-height">姓名：</div>
        </el-col>
        <el-col :span="3" class="vertical-middle">
          <div class="grid-content">
            <el-input v-model="searchName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>

        <el-col :span="2" class="text-right vertical-middle">
          <div class="grid-content el-line-height">房屋：</div>
        </el-col>
        <el-col :span="3" class="vertical-middle">
          <div class="grid-content">
            <el-input
              v-model="searchHouseName"
              placeholder="请输入内容"
            ></el-input>
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
              <el-option label="所有" value=""></el-option>
              <el-option label="现住" value="now"></el-option>
              <el-option label="旧业主" value="old"></el-option>
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
      :authorityBtn="true"
      @handleInsert="handleInsert(false)"
      @handleExport="handleExport"
      @handleDeletes="handleDeletes"
      @handleAuthority="handleAuthority"
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
      <el-table-column prop="memberName" label="人员姓名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="houseName" label="房屋" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="物业" prop="residenceName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="楼宇" prop="buildingName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="楼层" prop="floorName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="ownerName" label="业主" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="relation" label="关系" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ findRelation(scope.row.relation) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" show-overflow-tooltip>
        <template slot-scope="scope" v-if="scope.row.status">
          {{ scope.row.status == "old" ? "旧业主" : "现住" }}
        </template>
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
    <li-modal v-loading="loading" style="min-width: 1200px" ref="editModal" />
  </div>
</template>

<script>
import {
  queryMemberHouseList,
  exportMemberHouseList,
  deleteMemberHouse,
  updatePermission,
} from "@/api/member.js";
import { resolveBlob } from "@/utils/util.js";
import tableHeaderBtn from "@/components/tableHeaderBtn";

export default {
  name: "memberHouse",
  components: {
    "table-header-btn": tableHeaderBtn,
  },
  data() {
    return {
      loading: false,
      searchStatus: "",
      searchHouseName: "",
      searchName: "",
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: 0,
      fullscreenLoading: false,
      ids: "",

      relation: [
        {
          id: 0,
          name: "副业主",
        },
        {
          id: 1,
          name: "租户",
        },
        {
          id: 3,
          name: "夫妻",
        },
        {
          id: 4,
          name: "子女",
        },
        {
          id: 5,
          name: "父母",
        },
        {
          id: 6,
          name: "朋友",
        },
        {
          id: 7,
          name: "其他",
        },
      ],
    };
  },
  methods: {
    // 配置权限
    handleAuthority() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "请勾选内容",
          center: true,
          type: "warning",
        });
        return;
      }
      //获取人房关系id list
      let memberHouseId = [];
      for (let index in this.multipleSelection) {
        memberHouseId.push(this.multipleSelection[index].id);
      }
      // console.log(memberHouseId.toString())
      let that = this;
      this.$refs["editModal"].show({
        view: "member/common/authorityModal.vue",
        params: { memberHouseId: memberHouseId, type: 2 },
        title: "配置权限",
        center: true,
        top: "5vh",
        hideSubmitButton: true,
        hideCancelButton: true,
        submit: (data) => {
          for (let index in data.authorityItems) {
            if (
              data.authorityItems[index].permissionName === "add_family_num"
            ) {
              data.authorityItems[index].detail = data.memberNum;
              break;
            }
          }
          // console.log(data);
          that.loading = true;
          updatePermission(JSON.stringify(data.authorityItems)).then((res) => {
            that.loading = false;
            that.$message({
              message: "操作成功",
              center: true,
              type: "success",
            });
            that.$refs["editModal"].hide();
          });
        },
      });
    },
    findRelation(rid) {
      let res = this.relation.find((item) => {
        return item.id == rid;
      });
      return res ? res.name : "";
    },
    //图片
    handleAvatarSuccess(res, file) {
      this.avatarUrl = URL.createObjectURL(file.raw);
      //console.log(res);
      this.form.fileId = res.data.id;
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
          exportMemberHouseList({
            name: this.searchName,
          }).then((res) => {
            resolveBlob(res, res.type);
            this.$message({
              message: "导出成功",
              center: true,
              type: "success",
            });
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
        view: "member/memberHouse/editModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "查看人员房屋信息",
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
        view: "member/memberHouse/editModal.vue",
        params: { checkInfo: checkInfo, id: row.id },
        title: "编辑人员房屋信息",
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
        view: "member/memberHouse/editModal.vue",
        params: { checkInfo: checkInfo },
        title: "新增人员房屋信息",
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
          deleteMemberHouse(ids).then((res) => {
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
      queryMemberHouseList({
        pageNum: currentPage,
        pageSize: this.pageSize,
        memberName: this.searchName,
        houseName: this.searchHouseName,
        status: this.searchStatus,
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
