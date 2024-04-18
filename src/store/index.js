import Vue from "vue";
import Vuex from "vuex";
import el from "element-ui/src/locale/lang/el";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    treeOpenIds: [], //物业树展开id存储，作默认展开用
    node: { nodeId: "", nodeType: "" }, //物业树懒加载传参数据
    propertyTreeSelected: [], //物业树展开数据存储，作记录操作小区用

    residenceTreeSelected: "", //小区树选中id

    keyPlaceholder: "ZAxC",

    taskCodeSelected0: [], //任务树已展开标记
    taskCodeSelected1: [], //任务树已展开标记
    taskCodeSelected2: [], //任务树已展开标记
    taskCodeSelected3: [], //任务树已展开标记
    taskCodeSelected4: [], //任务树已展开标记
    taskCodeSelected5: [], //任务树已展开标记
    taskCodeSelected6: [], //任务树已展开标记
    taskCodeSelected7: [], //任务树已展开标记
  },
  mutations: {
    setTaskCodeSelected(state, info) {
      state["taskCodeSelected" + info.tabType] = info.tempArr;
      sessionStorage.setItem(
        "taskCodeSelected" + info.tabType,
        JSON.stringify(info.tempArr)
      );
    },

    setTreeData(state, info) {
      state.treeOpenIds = info.tempArr;
      state.propertyTreeSelected = info.tempObjArr;
      sessionStorage.setItem("treeOpenIds", JSON.stringify(info.tempArr));
      sessionStorage.setItem(
        "propertyTreeSelected",
        JSON.stringify(info.tempObjArr)
      );
    },
    setNode(state, info) {
      sessionStorage.setItem("node", JSON.stringify(info));
      state.node = info;
    },
    /**
     * 赋值小区树选中ID
     * @param state
     * @param info 参数
     */
    setResidenceTreeSelected(state, info) {
      state.residenceTreeSelected = info;
    },
    //赋值sessionStorage treeIds
    setTreeIdsBysessionStorage(state, info) {
      state.treeOpenIds = info;
    },
    //赋值sessionStorage propertyTreeSelected
    setPropertyTreeSelectedBysessionStorage(state, info) {
      state.propertyTreeSelected = info;
    },
  },
  actions: {
    updateTaskCodeSelected(context, data) {
      let tempArr = context.state["taskCodeSelected" + data.tabType]; //用于任务tree组件默认展开
      let index = data.node.level - 1; //取tree组件层级作为存储操作操作节点list下标
      if (data.node.level > tempArr.length) {
        //tree组件层级大于操作节点list长度时新增一个list长度数据
        tempArr.push(data.node.data.code);
      } else {
        //反之作已有操作节点修改
        tempArr[index] = data.node.data.code;
        tempArr = tempArr.slice(0, ++index);
      }
      context.commit("setTaskCodeSelected", {
        tempArr: tempArr,
        tabType: data.tabType,
      });
    },
    cutTaskCodeSelected(context, data) {
      let index = data.node.level - 1; //取tree组件层级作为存储操作操作节点list下标
      let tempArr = context.state["taskCodeSelected" + data.tabType].slice(
        0,
        index
      ); //用于tree组件默认展开
      context.commit("setTaskCodeSelected", {
        tempArr: tempArr,
        tabType: data.tabType,
      });
    },
    /**
     * 更新已点开物业树id
     * @param context
     * @param {Object} data  节点信息
     */
    updateTreeIds(context, data) {
      let tempArr = context.state.treeOpenIds; //用于tree组件默认展开
      let tempObjArr = context.state.propertyTreeSelected; //用于物业树节点懒加载
      let index = data.level - 1; //取tree组件层级作为存储操作操作节点list下标
      if (data.level > tempArr.length) {
        //tree组件层级大于操作节点list长度时新增一个list长度数据
        tempArr.push(data.data.id);
        tempObjArr.push({
          nodeId: data.data.id,
          nodeType: data.data.nodeType,
        });
      } else {
        //反之作已有操作节点修改
        tempArr[index] = data.data.id;
        tempObjArr[index] = {
          nodeId: data.data.id,
          nodeType: data.data.nodeType,
        };
        tempArr = tempArr.slice(0, ++index);
        tempObjArr = tempObjArr.slice(0, ++index);
      }
      context.commit("setTreeData", {
        tempArr: tempArr,
        tempObjArr: tempObjArr,
      });
    },
    /**
     * 截取物业树id
     * @param context
     * @param {Object} data  节点信息
     */
    cutTreeIds(context, data) {
      let index = data.level - 1; //取tree组件层级作为存储操作操作节点list下标
      let tempArr = context.state.treeOpenIds.slice(0, index); //用于tree组件默认展开
      let tempObjArr = context.state.propertyTreeSelected.slice(0, index); //用于物业树节点懒加载
      context.commit("setTreeData", {
        tempArr: tempArr,
        tempObjArr: tempObjArr,
      });
    },
    updateNode(context, data) {
      context.commit("setNode", data);
    },
    /**
     * 赋值已选中小区树
     * @param context
     * @param data 参数
     */
    updateResidenceTreeSelected(context, data) {
      context.commit("setResidenceTreeSelected", data);
    },
    updatePropertyTreeSelectedBysessionStorage(context) {
      if (sessionStorage.getItem("propertyTreeSelected")) {
        context.commit(
          "setPropertyTreeSelectedBysessionStorage",
          JSON.parse(sessionStorage.getItem("propertyTreeSelected"))
        );
      }
    },
    // 获取sessionStorage  treeIds
    updateTreeIdsBysessionStorage(context) {
      if (sessionStorage.getItem("treeOpenIds")) {
        context.commit(
          "setTreeIdsBysessionStorage",
          JSON.parse(sessionStorage.getItem("treeOpenIds"))
        );
      }
    },
    updateNodeBysessionStorage(context) {
      if (sessionStorage.getItem("node")) {
        context.commit("setNode", JSON.parse(sessionStorage.getItem("node")));
      }
    },
    updateTaskCodeSelectedBySessionStorage(context) {
      for (let i = 0; i < 8; i++) {
        let tempArr = JSON.parse(
          sessionStorage.getItem("taskCodeSelected" + i.toString())
        );
        if (tempArr) {
          context.commit("setTaskCodeSelected", {
            tempArr: tempArr,
            tabType: i.toString(),
          });
        }
      }
    },
  },
  modules: {},
});
