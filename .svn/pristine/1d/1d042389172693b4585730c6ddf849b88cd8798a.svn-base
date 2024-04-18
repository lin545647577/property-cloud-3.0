<template>
  <el-row class="page-taskTemplate">
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
      <el-row class="box-pagination"></el-row>
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
          <el-form-item label="说明" prop="explain">
            <el-input
              type="text"
              placeholder="请输入说明"
              v-model="formData.explain"
              :readonly="formDisable"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否并行" prop="isParallel">
            <el-radio-group
              v-model="formData.isParallel"
              :disabled="formDisable"
            >
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input
              type="text"
              placeholder="编码"
              v-model="formData.code"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status" :disabled="formDisable">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
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
          <el-form-item
            v-for="(item, index) in formData.workingProcedureList"
            :key="index"
          >
            <el-row :gutter="10">
              <el-col :span="6">
                <el-select
                  v-model="item.workingProcedureCode"
                  placeholder="请选择工序模板"
                >
                  <el-option
                    :disabled="formDisable"
                    v-for="item in formProcessTemplateOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="16">
                <el-row :gutter="10" class="li-time">
                  <el-col :span="2"> 期限 </el-col>
                  <el-col :span="4">
                    <el-input
                      type="text"
                      placeholder="分"
                      :readonly="formDisable"
                      v-model="item.durationArray[0]"
                    >
                      <template slot="append">分</template>
                    </el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-input
                      type="text"
                      placeholder="时"
                      :readonly="formDisable"
                      v-model="item.durationArray[1]"
                    >
                      <template slot="append">时</template>
                    </el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-input
                      type="text"
                      placeholder="日"
                      :readonly="formDisable"
                      v-model="item.durationArray[2]"
                    >
                      <template slot="append">日</template>
                    </el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-input
                      type="text"
                      placeholder="月"
                      :readonly="formDisable"
                      v-model="item.durationArray[3]"
                    >
                      <template slot="append">月</template>
                    </el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-input
                      type="text"
                      placeholder="月"
                      :readonly="formDisable"
                      v-model="item.durationArray[4]"
                    >
                      <template slot="append">年</template>
                    </el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="2">
                <el-button
                  type="danger"
                  icon="el-icon-minus"
                  circle
                  @click="handleDeleteProcedure(index)"
                  v-if="!formDisable"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            ><el-button
              type="primary"
              icon="el-icon-plus"
              circle
              @click="handleAddProcedure"
              v-if="!formDisable"
            />
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
  listTaskTemplate,
  detailsTaskTemplate,
  deleteTaskTemplate,
  updateTaskTemplate,
  addTaskTemplate,
  listProcessTemplate,
} from "@/api/taskProcess.js";
export default {
  name: "TaskTemplate",
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
        explain: undefined,
        isParallel: undefined, //是否并行
        status: undefined, //状态
        remark: undefined,
        workingProcedureList: [],
      },
      formRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        isParallel: [
          { required: true, message: "请选择是否并行", trigger: "blur" },
        ],
      },
      formProcessTemplateOptions: [],
      formDisable: false,
    };
  },
  watch: {
    dialogVisible(v) {
      if (v) {
        listProcessTemplate({}).then((res) => {
          this.formProcessTemplateOptions = res.rows;
        });
      } else {
        this.formProcessTemplateOptions = [];
      }
    },
  },
  methods: {
    queryList(pageNum, pageSize) {
      this.condition.pageNum = pageNum || 1;
      this.condition.pageSize = pageSize || 10;
      listTaskTemplate(this.condition).then((res) => {
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
        explain: undefined,
        isParallel: undefined, //是否并行
        status: undefined, //状态
        remark: undefined,
        workingProcedureList: [],
      };
      this.dialogVisible = true;
    },
    handleView(row) {
      this.dialogTitle = "查看";
      this.formDisable = true;
      detailsTaskTemplate(row.id).then((res) => {
        res.workingProcedureList = this.transformDuration(
          res.workingProcedureList
        );
        this.formData = res;
        this.dialogVisible = true;
      });
    },
    handleEdit(row) {
      this.dialogTitle = "编辑";
      this.formDisable = false;
      detailsTaskTemplate(row.id).then((res) => {
        res.workingProcedureList = this.transformDuration(
          res.workingProcedureList
        );
        this.formData = res;
        this.dialogVisible = true;
      });
    },
    handleDelete(row) {
      this.$confirm("是否删除？", "删除")
        .then(() => {
          deleteTaskTemplate(row.id || this.tableSelectedIds).then(() => {
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
            ? updateTaskTemplate
            : addTaskTemplate;
          this.formData.workingProcedureList = this.transformDuration(
            this.formData.workingProcedureList
          );
          handleTarget(this.formData).then(() => {
            this.$message.success("操作成功");
            this.dialogVisible = false;
            this.queryList();
          });
        }
      });
    },
    handleAddProcedure() {
      this.formData.workingProcedureList.push({
        workingProcedureCode: undefined, //工序编码
        duration: undefined, //期限 表示 11分钟+22小时+33日+44月+55年
        durationArray: [0, 0, 0, 0, 0],
      });
    },
    handleDeleteProcedure(index) {
      this.formData.workingProcedureList.splice(index, 1);
    },

    transformDuration(list) {
      for (let index in list) {
        if (list[index].durationArray) {
          list[index].duration = list[index].durationArray.join(",");
        } else {
          list[index].durationArray = list[index].duration.split(",");
        }
      }
      return list;
    },
  },
  mounted() {
    this.queryList();
  },
};
</script>
<style scoped lang="less">
.li-time {
  ::v-deep .el-input-group__append {
    padding: 5px;
  }

  ::v-deep .el-input__inner {
    padding: 5px;
  }
}
</style>
