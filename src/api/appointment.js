import request from "./modules/request";

/**
 * 查询预约列表
 * @param {Object} data
 */
export function queryAppointmentList(data) {
  return request({
    url: "/estate/appointmentRegister/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询预约
 * @param {String} id id
 */
export function queryAppointment(id) {
  return request({
    url: "estate/appointmentRegister/" + id,
    method: "GET",
  });
}

/**
 * 修改预约
 * @param {Object} data
 */
export function editAppointment(data) {
  return request({
    url: "/estate/appointmentRegister",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除预约
 * @param {String} ids
 */
export function deleteAppointment(ids) {
  return request({
    url: "/estate/appointmentRegister/" + ids,
    method: "delete",
  });
}

/**
 * 导出预约表格
 * @param {Object} data
 */
export function exportAppointmentList(data) {
  return request({
    url: "/estate/appointmentRegister/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入预约
 * @param {Object} data
 */
export function insertAppointment(data) {
  return request({
    url: "/estate/appointmentRegister",
    method: "post",
    data: data,
  });
}

/**
 * 查询所有附加服务列表（管理员）
 * @param {Object} data
 */
export function queryAdditionalList(data) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition/list",
    method: "post",
    data: data,
  });
}
/**
 * 查询用户附加服务列表
 * @param {Object} data
 */
export function queryUserAdditionalList(data) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition/listByLoginUser",
    method: "post",
    data: data,
  });
}
/**
 * 查询机构附加服务列表
 * @param {Object} data
 */
export function queryOrganizationAdditionalList(data) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition/listForOrganizationManager",
    method: "post",
    data: data,
  });
}
/**
 * 查询待审核附加服务列表
 * @param {Object} data
 */
export function queryAuditAdditionalList(data) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition/listForAudit",
    method: "post",
    data: data,
  });
}

/**
 * 查询附加服务
 * @param {String} id id
 */
export function queryAdditional(id) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition/" + id,
    method: "GET",
  });
}

/**
 * 修改附加服务
 * @param {Object} data
 */
export function editAdditional(data) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除附加服务
 * @param {String} ids
 */
export function deleteAdditional(ids) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition/" + ids,
    method: "delete",
  });
}

/**
 * 导出附加服务表格
 * @param {Object} data
 */
export function exportAdditionalList(data) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}

/**
 * 插入附加服务
 * @param {Object} data
 */
export function insertAdditional(data) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition",
    method: "post",
    data: data,
  });
}

/**
 * 提交附加服务
 * @param {String} id
 */
export function submitAdditional(id) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition/submit/" + id,
    method: "get",
  });
}

/**
 * 审核附加服务
 * @param {Object} data
 */
export function auditAdditional(data) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition/audit",
    method: "post",
    data: data,
  });
}

/**
 * 查询附加服务类型
 */
export function queryAdditionalType() {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition/selectTypes",
    method: "get",
  });
}

/**
 * 查询可配置附加服务类型
 * @param {Object} data
 */
export function queryAdditionalWithReservation(data) {
  return request({
    url: "/reservation/tygxReservationAdditionalServiceDefinition/listForReservation",
    method: "post",
    data: data,
  });
}

/**
 * 查询所有场地列表（管理员）
 * @param {Object} data
 */
export function queryPlaceList(data) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition/list",
    method: "post",
    data: data,
  });
}
/**
 * 查询用户场地列表
 * @param {Object} data
 */
export function queryUserPlaceList(data) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition/listByLoginUser",
    method: "post",
    data: data,
  });
}
/**
 * 查询机构场地列表
 * @param {Object} data
 */
export function queryOrganizationPlaceList(data) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition/listForOrganizationManager",
    method: "post",
    data: data,
  });
}
/**
 * 查询待审核场地列表
 * @param {Object} data
 */
export function queryAuditPlaceList(data) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition/listForAudit",
    method: "post",
    data: data,
  });
}

/**
 * 查询场地
 * @param {String} id id
 */
export function queryPlace(id) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition/" + id,
    method: "GET",
  });
}

/**
 * 修改场地
 * @param {Object} data
 */
export function editPlace(data) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除场地
 * @param {String} ids
 */
export function deletePlace(ids) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition/" + ids,
    method: "delete",
  });
}

/**
 * 导出场地表格
 * @param {Object} data
 */
export function exportPlaceList(data) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}

/**
 * 插入场地
 * @param {Object} data
 */
export function insertPlace(data) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition",
    method: "post",
    data: data,
  });
}

/**
 * 审核场地申请
 * @param {Object} data
 */
export function auditPlace(data) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition/audit",
    method: "post",
    data: data,
  });
}

/**
 * 提交场地申请
 * @param {String} id
 */
export function submitPlace(id) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition/submit/" + id,
    method: "get",
  });
}

/**
 * 查询可预约的场地申请列表
 */
export function queryPlaceWithReservation() {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition/selectTypes",
    method: "get",
  });
}

/**
 * 查询可配置场地申请列表
 * @param {Object} data
 */
export function queryPlaceWithConfirm(data) {
  return request({
    url: "/reservation/tygxReservationFunctionRoomDefinition/listForReservation",
    method: "post",
    data: data,
  });
}

/**
 * 查询待确认预约列表（管理员）
 * @param {Object} data
 */
export function queryReservationList(data) {
  return request({
    url: "/reservation/tygxReservationRecord/listWaitForConfirm",
    method: "post",
    data: data,
  });
}
/**
 * 查询用户预约列表
 * @param {Object} data
 */
export function queryUserReservationList(data) {
  return request({
    url: "/reservation/tygxReservationRecord/listByCurrentUser",
    method: "post",
    data: data,
  });
}
/**
 * 查询机构预约列表
 * @param {Object} data
 */
export function queryOrganizationReservationList(data) {
  return request({
    url: "/reservation/tygxReservationRecord/listByManager",
    method: "post",
    data: data,
  });
}

/**
 * 查询预约
 * @param {String} id id
 */
export function queryReservation(id) {
  return request({
    url: "/reservation/tygxReservationRecord/" + id,
    method: "GET",
  });
}

/**
 * 修改预约
 * @param {Object} data
 */
export function editReservation(data) {
  return request({
    url: "/reservation/tygxReservationRecord/update",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除预约
 * @param {String} ids
 */
export function deleteReservation(ids) {
  return request({
    url: "/reservation/tygxReservationRecord/" + ids,
    method: "delete",
  });
}

/**
 * 取消预约
 * @param {String} id
 */
export function cancelReservation(id) {
  return request({
    url: "/reservation/tygxReservationRecord/cancel/" + id,
    method: "get",
  });
}

/**
 * 验证预约
 * @param {Object} data
 */
export function verifyReservation(data) {
  return request({
    url: "/reservation/tygxReservationRecord/verify",
    method: "post",
    data: data,
  });
}

/**
 * 确认预约
 * @param {Object} data
 */
export function confirmReservation(data) {
  return request({
    url: "/reservation/tygxReservationRecord/confirm",
    method: "post",
    data: data,
  });
}

/**
 * 导出预约表格
 * @param {Object} data
 */
export function exportReservationList(data) {
  return request({
    url: "/reservation/tygxReservationRecord/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}

/**
 * 小程序新增预约
 * @param {Object} data
 */
export function insertReservation(data) {
  return request({
    url: "/reservation/tygxReservationRecord",
    method: "post",
    data: data,
  });
}

/**
 * 开始使用场地(启动预约)
 * @param {String} id
 */
export function startReservation(id) {
  return request({
    url: "/reservation/tygxReservationRecord/start/" + id,
    method: "get",
  });
}

/**
 * 结束场地使用(完成预约)
 * @param {String} id
 */
export function finishedReservation(id) {
  return request({
    url: "/reservation/tygxReservationRecord/start/" + id,
    method: "get",
  });
}

/**
 * 获取动态表单
 * @param {String} id
 */
export function queryForm(id) {
  return request({
    url: "/tygx-estate/architecture/" + id,
    method: "get",
  });
}
