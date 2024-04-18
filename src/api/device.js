import request from "./modules/request";

/**
 * 查询监控设备列表
 * @param {Object} data
 */
export function queryMonitorList(data) {
  return request({
    url: "/device/monitor/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询监控设备
 * @param {String} id 楼层id
 */
export function queryMonitor(id) {
  return request({
    url: "device/monitor/" + id,
    method: "GET",
  });
}

/**
 * 修改监控设备
 * @param {Object} data
 */
export function editMonitor(data) {
  return request({
    url: "/device/monitor",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除监控设备
 * @param {String} ids
 */
export function deleteMonitor(ids) {
  return request({
    url: "/device/monitor/" + ids,
    method: "delete",
  });
}

/**
 * 导出监控设备表格
 * @param {Object} data
 */
export function exportMonitorList(data) {
  return request({
    url: "/device/monitor/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入监控设备
 * @param {Object} data
 */
export function insertMonitor(data) {
  return request({
    url: "/device/monitor",
    method: "post",
    data: data,
  });
}

/**
 * 查询仪表位置列表
 * @param {Long} residenceId
 */
export function queryPositionList(residenceId) {
  return request({
    url: "/estate/position/getPosition?residenceId=" + residenceId,
    method: "get",
  });
}

/**
 * 解析位置树ID
 * @param {Object} data
 */
export function configPositionId(data) {
  return request({
    url: "/estate/position/analysisPosition",
    method: "post",
    data: data,
  });
}

/**
 * 查询仪表列表
 * @param {Object} data
 */
export function queryMeterList(data) {
  return request({
    url: "/device/meter/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询仪表
 * @param {String} id 楼层id
 */
export function queryMeter(id) {
  return request({
    url: "device/meter/" + id,
    method: "GET",
  });
}

/**
 * 修改仪表
 * @param {Object} data
 */
export function editMeter(data) {
  return request({
    url: "/device/meter",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除仪表
 * @param {String} ids
 */
export function deleteMeter(ids) {
  return request({
    url: "/device/meter/" + ids,
    method: "delete",
  });
}

/**
 * 导出仪表表格
 * @param {Object} data
 */
export function exportMeterList(data) {
  return request({
    url: "/device/meter/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入仪表
 * @param {Object} data
 */
export function insertMeter(data) {
  return request({
    url: "/device/meter",
    method: "post",
    data: data,
  });
}

/**
 * 更换仪表
 * @param {Object} data
 */
export function changeMeter(data) {
  return request({
    url: "/device/meter/change",
    method: "post",
    data: data,
  });
}

/**
 * 查询抄表数据列表
 * @param {Object} data
 */
export function queryMeterReadingList(data) {
  return request({
    url: "/device/meterReading/template",
    method: "get",
    params: data,
  });
}

/**
 * 查询抄表详细数据
 * @param {String} id
 */
export function queryMeterReading(id, data) {
  return request({
    url: "device/meterReading/" + id,
    method: "GET",
    params: data,
  });
}

/**
 * 修改抄表数据
 * @param {Object} data
 */
export function editMeterReading(data) {
  return request({
    url: "/device/meterReading",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除抄表数据
 * @param {String} ids
 */
export function deleteMeterReading(ids) {
  return request({
    url: "/device/meterReading/" + ids,
    method: "delete",
  });
}

/**
 * 导出抄表数据表格
 * @param {Object} data
 */
export function exportMeterReadingList(data) {
  return request({
    url: "/device/meterReading/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入抄表数据
 * @param {Object} data
 */
export function insertMeterReading(data) {
  return request({
    url: "/device/meterReading",
    method: "post",
    data: data,
  });
}

/**
 * 查询智慧向导设备列表
 * @param {Object} data
 */
export function queryWiseDevideList(data) {
  return request({
    url: "/device/deviceShow/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询智慧向导设备数据
 * @param {String} id
 */
export function queryWiseDevide(id) {
  return request({
    url: "/device/deviceShow/" + id,
    method: "GET",
  });
}

/**
 * 修改智慧向导设备
 * @param {Object} data
 */
export function editWiseDevide(data) {
  return request({
    url: "/device/deviceShow",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除智慧向导设备
 * @param {String} ids
 */
export function deleteWiseDevide(ids) {
  return request({
    url: "/device/deviceShow/" + ids,
    method: "delete",
  });
}

/**
 * 导出智慧向导设备表格
 * @param {Object} data
 */
export function exportWiseDevideList(data) {
  return request({
    url: "/device/deviceShow/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入智慧向导设备
 * @param {Object} data
 */
export function insertWiseDevide(data) {
  return request({
    url: "/device/deviceShow",
    method: "post",
    data: data,
  });
}
