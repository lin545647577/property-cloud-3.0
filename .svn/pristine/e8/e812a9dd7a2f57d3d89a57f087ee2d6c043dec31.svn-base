<template>
  <el-row class="page-processTemplate">
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
          border
          :data="tableData"
          @selection-change="handleSelected"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="ID" prop="id" />
          <el-table-column label="编码" prop="code" />
          <el-table-column label="模板名称" prop="name" />
          <el-table-column label="说明" prop="explain" />
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
          label-width="80px"
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
          <el-form-item label="分类" prop="kindCode">
            <el-select v-model="formData.kindCode" placeholder="请选择分类">
              <el-option
                :disabled="formDisable"
                v-for="item in processClassifyOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="kindCode">
            <el-select v-model="formData.typeCode" placeholder="请选择类型">
              <el-option
                :disabled="formDisable"
                v-for="item in processTypeOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明" prop="explain">
            <el-input
              type="text"
              placeholder="请输入说明"
              v-model="formData.explain"
              :readonly="formDisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              type="textarea"
              placeholder="请输入备注"
              v-model="formData.remark"
              :readonly="formDisable"
              rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status" :disabled="formDisable">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="现成凭证" prop="needSceneVoucher">
            <el-radio-group
              v-model="formData.needSceneVoucher"
              :disabled="formDisable"
            >
              <el-radio :label="0">不需要</el-radio>
              <el-radio :label="1">需要</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="完成凭证" prop="needCompleteVoucher">
            <el-radio-group
              v-model="formData.needCompleteVoucher"
              :disabled="formDisable"
            >
              <el-radio :label="0">不需要</el-radio>
              <el-radio :label="1">需要</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文档" prop="needFile">
            <el-radio-group v-model="formData.needFile" :disabled="formDisable">
              <el-radio :label="0">不需要</el-radio>
              <el-radio :label="1">需要</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="完成说明" prop="needCompleteExplain">
            <el-radio-group
              v-model="formData.needCompleteExplain"
              :disabled="formDisable"
            >
              <el-radio :label="0">不需要</el-radio>
              <el-radio :label="1">需要</el-radio>
            </el-radio-group>
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
  listProcessType,
  listProcessTemplate,
  detailsProcessTemplate,
  deleteProcessTemplate,
  updateProcessTemplate,
  addProcessTemplate,
} from "@/api/taskProcess.js";
export default {
  name: "ProcessTemplate",
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
        explain: undefined, //说明
        kindCode: undefined, //分类编码
        name: undefined, //名称
        needCompleteVoucher: undefined, //是否需要完成凭证(0不需要 1需要)
        needFile: undefined, //是否需要文档(0不需要 1需要)
        needSceneVoucher: undefined, //是否需要现场凭证(0不需要 1需要)
        needCompleteExplain: undefined, // 是否需要完成说明(0不需要 1需要)
        remark: undefined, //备注
        status: undefined, //状态(0启用 1停用)
        typeCode: undefined, //类型编码
      },
      formRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        kindCode: [{ required: true, message: "请选择分类", trigger: "blur" }],
        typeCode: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
      processClassifyOptions: [],
      processTypeOptions: [],
      formDisable: false,
    };
  },
  watch: {
    dialogVisible(v) {
      if (v) {
        listProcessClassify({}).then((res) => {
          this.processClassifyOptions = res.rows;
        });
        listProcessType({}).then((res) => {
          this.processTypeOptions = res.rows;
        });
      } else {
        this.processClassifyOptions = [];
        this.processTypeOptions = [];
      }
    },
    "formData.kindCode"(v) {
      this.formData.typeCode = undefined;
      listProcessType({
        kindCode: v,
      }).then((res) => {
        this.processTypeOptions = res.rows;
      });
    },
  },
  methods: {
    queryList(pageNum, pageSize) {
      this.condition.pageNum = pageNum || 1;
      this.condition.pageSize = pageSize || 10;
      listProcessTemplate(this.condition).then((res) => {
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
        explain: undefined, //说明
        kindCode: undefined, //分类编码
        name: undefined, //名称
        needCompleteVoucher: undefined, //是否需要完成凭证(0不需要 1需要)
        needFile: undefined, //是否需要文档(0不需要 1需要)
        needSceneVoucher: undefined, //是否需要现场凭证(0不需要 1需要)
        needCompleteExplain: undefined, // 是否需要完成说明(0不需要 1需要)
        remark: undefined, //备注
        status: undefined, //状态(0启用 1停用)
        typeCode: undefined, //类型编码
      };
      this.dialogVisible = true;
    },
    handleView(row) {
      this.dialogTitle = "查看";
      this.formDisable = true;
      detailsProcessTemplate(row.id).then((res) => {
        this.formData = res;
        this.dialogVisible = true;
      });
    },
    handleEdit(row) {
      this.dialogTitle = "编辑";
      this.formDisable = false;
      detailsProcessTemplate(row.id).then((res) => {
        this.formData = res;
        this.dialogVisible = true;
      });
    },
    handleDelete(row) {
      this.$confirm("是否删除？", "删除")
        .then(() => {
          deleteProcessTemplate(row.id || this.tableSelectedIds).then(() => {
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
            ? updateProcessTemplate
            : addProcessTemplate;
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

<style scoped></style>
