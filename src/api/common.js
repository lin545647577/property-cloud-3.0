import request from "./modules/request";

export function get(url) {
  return request({
    url: url,
    method: "GET",
    responseType: "document",
  });
}

/**
 * 查询系统字段
 * @param {String} code 字段类型
 */
export function queryDictionary(code) {
  return request({
    url: "/system/dict/data/type/" + code,
    method: "get",
  });
}

/**
 * 查询系统字段
 * @param {Object} data 字段类型
 */
export function queryDictionaryWithKey(data) {
  return request({
    url: "/system/dict/data/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询系统用户
 * @param {Object} data
 */
export function queryUser(data) {
  return request({
    url: "/system/user/listByCurrentOrganization",
    method: "POST",
    data: data,
  });
}

/**
 * 查询二维码
 * @param {Object} data
 */
export function queryQR(data) {
  return request({
    url: "/commonApi/tygxQrcManagement/generateUrlQrc",
    method: "POST",
    data: data,
  });
}
/**
 * WebSocket
 * @param {String} deviceUuid
 */
export function wsConnect(deviceUuid) {
  return new WebSocket(
    // "/socket" + "/webSocketServer/device/" + deviceUuid
    "ws://192.168.66.103:8080/websocket/webSocketServer/device/" + deviceUuid
  );
}
