import request from "./modules/request";

/**
 * 查询车位类型列表
 * @param {Object} data
 * @param {Function} success
 */
export function queryParkingTypeList(data, success) {
  return request({
    url: "/estate/parkingType/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询车位类型
 * @param {String} id 楼层id
 * @param {Function} success
 */
export function queryParkingType(id, success) {
  return request({
    url: "estate/parkingType/" + id,
    method: "GET",
  });
}

/**
 * 修改车位类型
 * @param {Object} data
 * @param {Function} success
 */
export function editParkingType(data, success) {
  return request({
    url: "/estate/parkingType",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除车位类型
 * @param {String} ids
 * @param {Function} success
 */
export function deleteParkingType(ids, success) {
  return request({
    url: "/estate/parkingType/" + ids,
    method: "delete",
  });
}

/**
 * 导出车位类型表格
 * @param {Object} data
 * @param {Function} success
 */
export function exportParkingTypeList(data, success) {
  return request({
    url: "/estate/parkingType/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入车位类型
 * @param {Object} data
 * @param {Function} success
 */
export function insertParkingType(data, success) {
  return request({
    url: "/estate/parkingType",
    method: "post",
    data: data,
  });
}

/**
 * 查询车位列表
 * @param {Object} data
 * @param {Function} success
 */
export function queryParkingList(data, success) {
  return request({
    url: "/estate/parking/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询车位
 * @param {String} id id
 * @param {Function} success
 */
export function queryParking(id, success) {
  return request({
    url: "estate/parking/" + id,
    method: "GET",
  });
}

/**
 * 修改车位
 * @param {Object} data
 * @param {Function} success
 */
export function editParking(data, success) {
  return request({
    url: "/estate/parking",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除车位
 * @param {String} ids
 * @param {Function} success
 */
export function deleteParking(ids, success) {
  return request({
    url: "/estate/parking/" + ids,
    method: "delete",
  });
}

/**
 * 导出车位表格
 * @param {Object} data
 * @param {Function} success
 */
export function exportParkingList(data, success) {
  return request({
    url: "/estate/parking/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入车位
 * @param {Object} data
 * @param {Function} success
 */
export function insertParking(data, success) {
  return request({
    url: "/estate/parking",
    method: "post",
    data: data,
  });
}

/**
 * 解除车位人员关联
 * @param {Object} id
 */
export function removeParkingMemberr(id) {
  return request({
    url: "/estate/parking/removeMember/" + id,
    method: "get",
  });
}

/**
 * 查询车辆列表
 * @param {Object} data
 * @param {Function} success
 */
export function queryCarDefinitionList(data, success) {
  return request({
    url: "/estate/tygxCarDefinition/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询车辆
 * @param {String} id id
 * @param {Function} success
 */
export function queryCarDefinition(id, success) {
  return request({
    url: "estate/tygxCarDefinition/" + id,
    method: "GET",
  });
}

/**
 * 修改车辆
 * @param {Object} data
 * @param {Function} success
 */
export function editCarDefinition(data, success) {
  return request({
    url: "/estate/tygxCarDefinition",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除车辆
 * @param {String} ids
 * @param {Function} success
 */
export function deleteCarDefinition(ids, success) {
  return request({
    url: "/estate/tygxCarDefinition/" + ids,
    method: "delete",
  });
}

/**
 * 导出车辆表格
 * @param {Object} data
 * @param {Function} success
 */
export function exportCarDefinitionList(data, success) {
  return request({
    url: "/estate/tygxCarDefinition/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入车辆
 * @param {Object} data
 * @param {Function} success
 */
export function insertCarDefinition(data, success) {
  return request({
    url: "/estate/tygxCarDefinition",
    method: "post",
    data: data,
  });
}

/**
 * 查询车场列表
 * @param {Object} data
 * @param {Function} success
 */
export function queryCarParkDefinitionList(data, success) {
  return request({
    url: "/estate/tygxCarParkDefinition/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询车场
 * @param {String} id id
 * @param {Function} success
 */
export function queryCarParkDefinition(id, success) {
  return request({
    url: "estate/tygxCarParkDefinition/" + id,
    method: "GET",
  });
}

/**
 * 修改车场
 * @param {Object} data
 * @param {Function} success
 */
export function editCarParkDefinition(data, success) {
  return request({
    url: "/estate/tygxCarParkDefinition",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除车场
 * @param {String} ids
 * @param {Function} success
 */
export function deleteCarParkDefinition(ids, success) {
  return request({
    url: "/estate/tygxCarParkDefinition/" + ids,
    method: "delete",
  });
}

/**
 * 导出车场表格
 * @param {Object} data
 * @param {Function} success
 */
export function exportCarParkDefinitionList(data, success) {
  return request({
    url: "/estate/tygxCarParkDefinition/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入车场
 * @param {Object} data
 * @param {Function} success
 */
export function insertCarParkDefinition(data, success) {
  return request({
    url: "/estate/tygxCarParkDefinition",
    method: "post",
    data: data,
  });
}

/**
 * 查询车辆类型列表
 * @param {Object} data
 * @param {Function} success
 */
export function queryCarParkTypeConfigList(data, success) {
  return request({
    url: "/estate/tygxCarParkTypeConfig/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询车辆类型
 * @param {String} id id
 * @param {Function} success
 */
export function queryCarParkTypeConfig(id, success) {
  return request({
    url: "estate/tygxCarParkTypeConfig/" + id,
    method: "GET",
  });
}

/**
 * 修改车辆类型
 * @param {Object} data
 * @param {Function} success
 */
export function editCarParkTypeConfig(data, success) {
  return request({
    url: "/estate/tygxCarParkTypeConfig",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除车辆类型
 * @param {String} ids
 * @param {Function} success
 */
export function deleteCarParkTypeConfig(ids, success) {
  return request({
    url: "/estate/tygxCarParkTypeConfig/" + ids,
    method: "delete",
  });
}

/**
 * 导出车辆类型表格
 * @param {Object} data
 * @param {Function} success
 */
export function exportCarParkTypeConfigList(data, success) {
  return request({
    url: "/estate/tygxCarParkTypeConfig/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入车辆类型
 * @param {Object} data
 * @param {Function} success
 */
export function insertCarParkTypeConfig(data, success) {
  return request({
    url: "/estate/tygxCarParkTypeConfig",
    method: "post",
    data: data,
  });
}
