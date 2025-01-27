import request from "./modules/request";

/**
 * 查询广告基础信息列表
 * @param {Object} data
 */
export function queryAdvInfoList(data) {
  return request({
    url: "/adv/advInfo/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询广告基础信息
 * @param {String} id 广告基础信息id
 */
export function queryAdvInfo(id) {
  return request({
    url: "/adv/advInfo/" + id,
    method: "GET",
  });
}

/**
 * 修改广告基础信息
 * @param {Object} data
 */
export function editAdvInfo(data) {
  return request({
    url: "/adv/advInfo",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除广告基础信息
 * @param {String} ids
 */
export function deleteAdvInfo(ids) {
  return request({
    url: "/adv/advInfo/" + ids,
    method: "delete",
  });
}

/**
 * 导出广告基础信息表格
 * @param data
 */
export function exportAdvInfoList(data) {
  return request({
    url: "/adv/advInfo/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}

/**
 * 插入广告基础信息
 * @param {Object} data
 */
export function insertAdvInfo(data) {
  return request({
    url: "/adv/advInfo",
    method: "post",
    data: data,
  });
}

/**
 * 推送广告
 * @param {String} id 广告id
 */
export function publishAdvInfo(id) {
  return request({
    url: "/adv/advDeviceLocation/sendMsg/" + id,
    method: "get",
  });
}

/**
 * 作废广告
 * @param {String} id 广告id
 * @param {String} deviceUUID
 */
export function offLineAdvInfo(id, deviceUUID) {
  return request({
    url: "/adv/advDeviceLocation/cancelAdvState/" + id + "/" + deviceUUID,
    method: "post",
  });
}

/**
 * 查询广告位置列表
 * @param {Object} data
 */
export function queryAdvDeviceLocationList(data) {
  return request({
    url: "/adv/advDeviceLocation/limitList",
    method: "post",
    data: data,
  });
}

/**
 * 查询广告位置
 * @param {String} id 广告位置id
 */
export function queryAdvDeviceLocation(id) {
  return request({
    url: "/adv/advDeviceLocation/" + id,
    method: "GET",
  });
}

/**
 * 修改广告位置
 * @param {Object} data
 */
export function editAdvDeviceLocation(data) {
  return request({
    url: "/adv/advDeviceLocation",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除广告位置
 * @param {String} ids
 */
export function deleteAdvDeviceLocation(ids) {
  return request({
    url: "/adv/advDeviceLocation/" + ids,
    method: "delete",
  });
}

/**
 * 导出广告位置表格
 * @param data
 */
export function exportAdvDeviceLocationList(data) {
  return request({
    url: "/adv/advDeviceLocation/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}

/**
 * 插入广告位置
 * @param {Object} data
 */
export function insertAdvDeviceLocation(data) {
  return request({
    url: "/adv/advDeviceLocation",
    method: "post",
    data: data,
  });
}

/**
 * 智慧屏初始化广告
 */
export function initAdvertWiseScreen() {
  return request({
    url: "/adv/advDeviceLocation/indexAdv",
    method: "get",
  });
}
