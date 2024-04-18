<template>
  <el-row class="page-processClassify">
    <section>
      <el-row class="box-menu">
        <el-button type="primary" size="mini" @click="handleAdd"
          >新增
        </el-button>
        <el-button
          type="danger"
          size="mini"
          @click="handleDelete"
          :disabled="tableSelectedIds.length === 0"
          >删除
        </el-button>
      </el-row>
      <el-row class="box-table">
        <el-table
          ref="table"
          size="small"
          :data="tableData"
          border
          @selection-change="handleSelected"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="ID" prop="id" />
          <el-table-column label="编码" prop="code" />
          <el-table-column label="分类名称" prop="name" />
          <el-table-column width="150" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleView(scope.row)"
                >查看
              </el-button>
              <el-button size="mini" type="text" @click="handleEdit(scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class="box-pagination">
        <el-pagination
          style="text-align: center; margin: 20px 0"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="condition.pageNum"
          :page-size="condition.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableTotal"
        />
      </el-row>
    </section>
    <section>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="800px"
      >
        <el-form
          ref="form"
          label-width="50px"
          :model="formData"
          :rules="formRules"
        >
          <el-form-item label="名称" prop="name">
            <el-input
              type="text"
              placeholder="请输入名称"
              v-model="formData.name"
              :readonly="formDisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              placeholder="请输入备注"
              v-model="formData.remark"
              :readonly="formDisable"
              rows="5"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit" v-if="!formDisable"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </section>
  </el-row>
</template>

<script>
import {
  listProcessClassify,
  detailsProcessClassify,
  updateProcessClassify,
  addProcessClassify,
  deleteProcessClassify,
} from "@/api/taskProcess.js";

export default {
  name: "ProcessClassify",
  data() {
    return {
      condition: {
        pageNum: undefined,
        pageSize: undefined,
      },
      tableData: [],
      tableTotal: 0,
      tableSelectedIds: [],
      dialogTitle: undefined,
      dialogVisible: false,
      formData: {
        name: undefined,
        remark: undefined,
      },
      formRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      formDisable: false,
    };
  },
  methods: {
    queryList(pageNum, pageSize) {
      this.condition.pageNum = pageNum || 1;
      this.condition.pageSize = pageSize || 10;
      listProcessClassify(this.condition).then((res) => {
        this.tableData = res.rows;
        this.tableTotal = res.total;
        this.tableSelectedIds = [];
      });
    },
    handleCurrentChange(pageNum) {
      this.queryList(pageNum, this.condition.pageSize);
    },
    handleSizeChange(pageSize) {
      this.queryList(this.condition.pageNum, pageSize);
    },
    handleSelected(row) {
      this.tableSelectedIds = row.map((item) => item.id) || [];
    },
    handleAdd() {
      this.dialogTitle = "新增";
      this.formDisable = false;
      this.formData = {
        name: undefined,
        remark: undefined,
      };
      this.dialogVisible = true;
    },
    handleView(row) {
      this.dialogTitle = "查看";
      this.formDisable = true;
      detailsProcessClassify(row.id).then((res) => {
        this.formData = res;
        this.dialogVisible = true;
      });
    },
    handleEdit(row) {
      this.dialogTitle = "编辑";
      this.formDisable = false;
      detailsProcessClassify(row.id).then((res) => {
        this.formData = res;
        this.dialogVisible = true;
      });
    },
    handleDelete(row) {
      this.$confirm("是否删除？", "删除")
        .then(() => {
          deleteProcessClassify(row.id || this.tableSelectedIds).then(() => {
            this.$message.success("操作成功");
            this.queryList();
          });
        })
        .catch(() => {});
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let handleTarget = this.formData.id
            ? updateProcessClassify
            : addProcessClassify;
          handleTarget(this.formData).then(() => {
            this.$message.success("操作成功");
            this.dialogVisible = false;
            this.queryList();
          });
        }
      });
    },
  },
  mounted() {
    this.queryList();
  },
};
</script>
