import request from "./modules/request";

export function listProcessClassify(condition) {
  return request({
    url: "taskDistribution/workingProcedureKind/list",
    method: "POST",
    data: condition,
  });
}

export function detailsProcessClassify(id) {
  return request({
    url: "taskDistribution/workingProcedureKind/" + id,
    method: "GET",
  });
}

export function updateProcessClassify(formData) {
  return request({
    url: "taskDistribution/workingProcedureKind",
    method: "PUT",
    data: formData,
  });
}

export function addProcessClassify(formData) {
  return request({
    url: "taskDistribution/workingProcedureKind",
    method: "POST",
    data: formData,
  });
}

export function deleteProcessClassify(ids) {
  return request({
    url: "taskDistribution/workingProcedureKind/" + ids,
    method: "DELETE",
  });
}

export function listProcessType(condition) {
  return request({
    url: "taskDistribution/workingProcedureType/list",
    method: "POST",
    data: condition,
  });
}

export function detailsProcessType(id) {
  return request({
    url: "taskDistribution/workingProcedureType/" + id,
    method: "GET",
  });
}

export function updateProcessType(formData) {
  return request({
    url: "taskDistribution/workingProcedureType",
    method: "PUT",
    data: formData,
  });
}

export function addProcessType(formData) {
  return request({
    url: "taskDistribution/workingProcedureType",
    method: "POST",
    data: formData,
  });
}

export function deleteProcessType(ids) {
  return request({
    url: "taskDistribution/workingProcedureType/" + ids,
    method: "DELETE",
  });
}

export function listProcessTemplate(condition) {
  return request({
    url: "taskDistribution/workingProcedure/list",
    method: "POST",
    data: condition,
  });
}

export function detailsProcessTemplate(id) {
  return request({
    url: "taskDistribution/workingProcedure/" + id,
    method: "GET",
  });
}

export function updateProcessTemplate(formData) {
  return request({
    url: "taskDistribution/workingProcedure",
    method: "PUT",
    data: formData,
  });
}

export function addProcessTemplate(formData) {
  return request({
    url: "taskDistribution/workingProcedure",
    method: "POST",
    data: formData,
  });
}

export function deleteProcessTemplate(ids) {
  return request({
    url: "taskDistribution/workingProcedure/" + ids,
    method: "DELETE",
  });
}

export function listTaskTemplate(condition) {
  return request({
    url: "taskDistribution/taskTemplate/list",
    method: "POST",
    data: condition,
  });
}

export function detailsTaskTemplate(id) {
  return request({
    url: "taskDistribution/taskTemplate/" + id,
    method: "GET",
  });
}

export function updateTaskTemplate(formData) {
  return request({
    url: "taskDistribution/taskTemplate",
    method: "PUT",
    data: formData,
  });
}

export function addTaskTemplate(formData) {
  return request({
    url: "taskDistribution/taskTemplate",
    method: "POST",
    data: formData,
  });
}

export function deleteTaskTemplate(ids) {
  return request({
    url: "taskDistribution/taskTemplate/" + ids,
    method: "DELETE",
  });
}

export function listInstance(condition) {
  return request({
    url: "taskDistribution/taskInstance/list",
    method: "POST",
    data: condition,
  });
}

export function detailsInstance(id) {
  return request({
    url: "taskDistribution/taskInstance/" + id,
    method: "GET",
  });
}

export function updateInstance(formData) {
  return request({
    url: "taskDistribution/taskInstance",
    method: "PUT",
    data: formData,
  });
}

export function addInstance(formData) {
  return request({
    url: "taskDistribution/taskInstance",
    method: "POST",
    data: formData,
  });
}

export function deleteInstance(ids) {
  return request({
    url: "taskDistribution/taskInstance/" + ids,
    method: "DELETE",
  });
}

export function listSystemUser(condition) {
  return request({
    url: "system/user/list",
    method: "GET",
    params: condition,
  });
}

export function listSystemSingleUser(userId) {
  return request({
    url: "system/user/" + userId,
    method: "GET",
  });
}

export function confirmProcess(formData) {
  return request({
    url: "taskDistribution/workingProcedureInstance/confirm",
    method: "POST",
    data: formData,
  });
}

export function confirmInstance(id) {
  return request({
    url: "taskDistribution/taskInstance/confirm/" + id,
    method: "GET",
  });
}

export function rejectInstance(formData) {
  return request({
    url: "taskDistribution/taskInstance/reject",
    method: "POST",
    data: formData,
  });
}

/**
 * 任务树
 * @param {Object} data {type,parentCode} 节点类型，父级code
 */
export function queryTaskTree(data) {
  return request({
    url: "/qualityControl/taskInstance/getTree",
    method: "get",
    params: data,
  });
}

/**
 * 任务详情
 * @param {String} code 任务code
 */
export function queryTaskDetail(code) {
  return request({
    url: "/qualityControl/taskInstance/getInfoByCode",
    method: "get",
    params: { code },
  });
}

/**
 * 添加任务
 * @param {Object} data
 */
export function insertTaskDetail(data) {
  return request({
    url: "/qualityControl/taskInstance/getInfoByCode",
    method: "post",
    data: data,
  });
}

/**
 * 查询table子任务list
 * @param {String} parentTaskCode 父级code
 */
export function queryTableList(parentTaskCode) {
  return request({
    url: "/qualityControl/taskInstance/list",
    method: "post",
    data: { parentTaskCode },
  });
}

/**
 * 新增任务
 * @param {Object} data
 */
export function insertTask(data) {
  return request({
    url: "/qualityControl/taskInstance",
    method: "post",
    data: data,
  });
}

/**
 * 删除任务
 * @param {String} ids 任务id
 */
export function deleteTask(ids) {
  return request({
    url: "/qualityControl/taskInstance/" + ids,
    method: "delete",
  });
}

/**
 * 修改任务
 * @param {Object} data
 */
export function updateTask(data) {
  return request({
    url: "/qualityControl/taskInstance",
    method: "put",
    data: data,
  });
}

/**
 * 操作任务
 * @param {Object} data
 */
export function controlTask(data) {
  return request({
    url: "/qualityControl/taskInstance/operation",
    method: "get",
    params: data,
  });
}

/**
 * 获取部门
 * @param {String} deptName 部门名称
 */
export function queryDept(deptName) {
  return request({
    url: "/system/dept/list",
    method: "get",
    params: deptName,
  });
}

/**
 * 获取任务权限list
 * @param {String} code
 */
export function queryAuth(code) {
  return request({
    url: "/qualityControl/taskInstance/getOperAuthByCode",
    method: "get",
    params: { code },
  });
}

/**
 * 任务审批
 * @param {Object} data
 */
export function examineTask(data) {
  return request({
    url: "/qualityControl/taskInstance/examine",
    method: "post",
    data: data,
  });
}

/**
 * 查询任务审批意见
 * @param {String} taskId 任务id
 */
export function queryTaskNews(taskId) {
  return request({
    url: "/qualityControl/TygxTaskInstanceAuditDetail/getNewest",
    method: "get",
    params: { taskId },
  });
}

/**
 * 任务申请操作接口
 * @param {Object} data
 */
export function applyTask(data) {
  return request({
    url: "/qualityControl/taskInstance/apply",
    method: "post",
    data: data,
  });
}

/**
 * 获取任务申请最新信息
 * @param {Number} taskId
 */
export function queryTaskApplyNews(taskId) {
  return request({
    url: "/qualityControl/TygxTaskInstanceLog/getNewestApplyContent",
    method: "get",
    params: { taskId },
  });
}
