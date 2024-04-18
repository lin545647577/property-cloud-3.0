<template>
  <div class="normalForm">
    <el-form
      label-position="right"
      label-width="50%"
      :model="form"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="添加成员数量限制">
        <el-input v-model="memberNum"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in authorityItems"
        :key="index"
        :label="item.remark"
      >
        <el-radio-group v-model="item.status">
          <el-radio :label="0">关</el-radio>
          <el-radio :label="1">开</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="modal-btn">
      <el-button size="small" @click="hiddenModal">取消</el-button>
      <el-button
        type="primary"
        class="control-btn"
        size="small"
        :style="{ 'background-color': themeColor }"
        @click="submitForm('ruleForm')"
        >确认
      </el-button>
    </div>
  </div>
</template>

<script>
import { queryPermission } from "@/api/member.js";

export default {
  name: "authorityModal",
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      memberType: this.params.type, //人员类型：1业主；2家庭成员；3物业人员
      memberNum: 3,
      authorityItems: [
        // {
        //   "remark": "家庭成员数量限制",
        //   "memberHouseId": this.memberHouseId,
        //   "permissionName": "add_family_num",
        //   "status": 0,
        //   "detail": this.memberNum,
        //   "memberType": this.memberType
        // }, {
        //   "remark": "蓝牙开门权限",
        //   "memberHouseId": this.memberHouseId,
        //   "permissionName": "bluetooth_open_door",
        //   "status": 0,
        //   "memberType": this.memberType
        // }, {
        //   "remark": "邀请访客权限",
        //   "memberHouseId": this.memberHouseId,
        //   "permissionName": "invite_visitors",
        //   "status": 0,
        //   "memberType": this.memberType
        // }, {
        //   "remark": "业主上传头像权限",
        //   "memberHouseId": this.memberHouseId,
        //   "permissionName": "update_owner_face",
        //   "status": 0,
        //   "memberType": this.memberType
        // }, {
        //   "remark": "删除家庭成员权限",
        //   "memberHouseId": this.memberHouseId,
        //   "permissionName": "del_family",
        //   "status": 0,
        //   "memberType": this.memberType
        // }, {
        //   "remark": "添加家庭成员权限",
        //   "memberHouseId": this.memberHouseId,
        //   "permissionName": "add_family",
        //   "status": 0,
        //   "memberType": this.memberType
        // }, {
        //   "remark": "开门权限",
        //   "memberHouseId": this.memberHouseId,
        //   "permissionName": "open_door",
        //   "status": 0,
        //   "memberType": this.memberType
        // }
      ],

      checkInfo: false,
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    hiddenModal() {
      // console.log(this.form)
      this.$emit("modal-cancel");
    },

    /**
     * 匹配权限选项
     * @param {Array} arr 匹配list
     * @param {String} name 比对属性名
     */
    findAuthorityValue(arr, name) {
      let res = arr.find((item) => {
        return item.permissionName == name;
      });
      return res ? res.status : 0;
    },

    /**
     * 获取权限
     * @param {Object} data
     */
    queryInfo(data) {
      // this.avatarUrl = null;
      queryPermission(data).then((res) => {
        // console.log(res);
        let arr = res;
        if (arr.length > 1) {
          for (let index in arr) {
            if (arr[index].permissionName === "add_family_num") {
              this.memberNum = arr[index].detail;
              // this.form.num=this.authorityItems[index].detail;
              break;
            }
          }

          this.authorityItems = [
            {
              remark: "家庭成员数量限制",
              memberHouseId: data.memberHouseId,
              permissionName: "add_family_num",
              status: this.findAuthorityValue(arr, "add_family_num"),
              detail: this.memberNum,
              memberType: this.memberType,
            },
            {
              remark: "蓝牙开门权限",
              memberHouseId: data.memberHouseId,
              permissionName: "bluetooth_open_door",
              status: this.findAuthorityValue(arr, "bluetooth_open_door"),
              memberType: this.memberType,
            },
            {
              remark: "邀请访客权限",
              memberHouseId: data.memberHouseId,
              permissionName: "invite_visitors",
              status: this.findAuthorityValue(arr, "invite_visitors"),
              memberType: this.memberType,
            },
            {
              remark: "业主上传头像权限",
              memberHouseId: data.memberHouseId,
              permissionName: "update_owner_face",
              status: this.findAuthorityValue(arr, "update_owner_face"),
              memberType: this.memberType,
            },
            {
              remark: "删除家庭成员权限",
              memberHouseId: data.memberHouseId,
              permissionName: "del_family",
              status: this.findAuthorityValue(arr, "del_family"),
              memberType: this.memberType,
            },
            {
              remark: "添加家庭成员权限",
              memberHouseId: data.memberHouseId,
              permissionName: "add_family",
              status: this.findAuthorityValue(arr, "add_family"),
              memberType: this.memberType,
            },
            {
              remark: "开门权限",
              memberHouseId: data.memberHouseId,
              permissionName: "open_door",
              status: this.findAuthorityValue(arr, "open_door"),
              memberType: this.memberType,
            },
            {
              remark: "咨询通知",
              memberHouseId: data.memberHouseId,
              permissionName: "notice_list",
              status: this.findAuthorityValue(arr, "notice_list"),
              memberType: this.memberType,
            },
            {
              remark: "用户场地预约列表",
              memberHouseId: data.memberHouseId,
              permissionName: "reservation_user_list",
              status: this.findAuthorityValue(arr, "reservation_user_list"),
              memberType: this.memberType,
            },
            {
              remark: "内部预约",
              memberHouseId: data.memberHouseId,
              permissionName: "appointment_inner",
              status: this.findAuthorityValue(arr, "appointment_inner"),
              memberType: this.memberType,
            },
            {
              remark: "被访记录",
              memberHouseId: data.memberHouseId,
              permissionName: "appointment_list",
              status: this.findAuthorityValue(arr, "appointment_list"),
              memberType: this.memberType,
            },
          ];
        } else {
          this.authorityItems = [
            {
              remark: "家庭成员数量限制",
              memberHouseId: data.memberHouseId,
              permissionName: "add_family_num",
              status: 0,
              detail: this.memberNum,
              memberType: this.memberType,
            },
            {
              remark: "蓝牙开门权限",
              memberHouseId: data.memberHouseId,
              permissionName: "bluetooth_open_door",
              status: 0,
              memberType: this.memberType,
            },
            {
              remark: "邀请访客权限",
              memberHouseId: data.memberHouseId,
              permissionName: "invite_visitors",
              status: 0,
              memberType: this.memberType,
            },
            {
              remark: "业主上传头像权限",
              memberHouseId: data.memberHouseId,
              permissionName: "update_owner_face",
              status: 0,
              memberType: this.memberType,
            },
            {
              remark: "删除家庭成员权限",
              memberHouseId: data.memberHouseId,
              permissionName: "del_family",
              status: 0,
              memberType: this.memberType,
            },
            {
              remark: "添加家庭成员权限",
              memberHouseId: data.memberHouseId,
              permissionName: "add_family",
              status: 0,
              memberType: this.memberType,
            },
            {
              remark: "开门权限",
              memberHouseId: data.memberHouseId,
              permissionName: "open_door",
              status: 0,
              memberType: this.memberType,
            },
            {
              remark: "咨询通知",
              memberHouseId: data.memberHouseId,
              permissionName: "notice_list",
              status: 0,
              memberType: this.memberType,
            },
            {
              remark: "用户场地预约列表",
              memberHouseId: data.memberHouseId,
              permissionName: "reservation_user_list",
              status: 0,
              memberType: this.memberType,
            },
            {
              remark: "内部预约",
              memberHouseId: data.memberHouseId,
              permissionName: "appointment_inner",
              status: 0,
              memberType: this.memberType,
            },
            {
              remark: "被访记录",
              memberHouseId: data.memberHouseId,
              permissionName: "appointment_list",
              status: 0,
              memberType: this.memberType,
            },
          ];
        }
      });
    },
    /**
     * 初始化元素
     * @param {Object} data
     */
    initItem(data) {
      if (data.memberHouseId.length === 1) {
        data.memberHouseId = parseInt(data.memberHouseId.toString());
        this.queryInfo(data);
      } else {
        this.authorityItems = [
          {
            remark: "家庭成员数量限制",
            memberHouseId: data.memberHouseId.toString(),
            permissionName: "add_family_num",
            status: 0,
            detail: this.memberNum,
            memberType: this.memberType,
          },
          {
            remark: "蓝牙开门权限",
            memberHouseId: data.memberHouseId.toString(),
            permissionName: "bluetooth_open_door",
            status: 0,
            memberType: this.memberType,
          },
          {
            remark: "邀请访客权限",
            memberHouseId: data.memberHouseId.toString(),
            permissionName: "invite_visitors",
            status: 0,
            memberType: this.memberType,
          },
          {
            remark: "业主上传头像权限",
            memberHouseId: data.memberHouseId.toString(),
            permissionName: "update_owner_face",
            status: 0,
            memberType: this.memberType,
          },
          {
            remark: "删除家庭成员权限",
            memberHouseId: data.memberHouseId.toString(),
            permissionName: "del_family",
            status: 0,
            memberType: this.memberType,
          },
          {
            remark: "添加家庭成员权限",
            memberHouseId: data.memberHouseId.toString(),
            permissionName: "add_family",
            status: 0,
            memberType: this.memberType,
          },
          {
            remark: "开门权限",
            memberHouseId: data.memberHouseId.toString(),
            permissionName: "open_door",
            status: 0,
            memberType: this.memberType,
          },
          {
            remark: "咨询通知",
            memberHouseId: data.memberHouseId.toString(),
            permissionName: "notice_list",
            status: 0,
            memberType: this.memberType,
          },
          {
            remark: "用户场地预约列表",
            memberHouseId: data.memberHouseId.toString(),
            permissionName: "reservation_user_list",
            status: 0,
            memberType: this.memberType,
          },
          {
            remark: "内部预约",
            memberHouseId: data.memberHouseId.toString(),
            permissionName: "appointment_inner",
            status: 0,
            memberType: this.memberType,
          },
          {
            remark: "被访记录",
            memberHouseId: data.memberHouseId.toString(),
            permissionName: "appointment_list",
            status: 0,
            memberType: this.memberType,
          },
        ];
      }
    },

    submitForm(formName) {
      this.$emit("modal-submit");
    },
  },
  mounted() {
    this.initItem(this.params);
  },
  computed: {
    themeColor() {
      return this.$store.state.app.themeColor;
    },
  },
};
</script>

<style scoped></style>
