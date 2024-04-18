import request from "./modules/request";

/**
 * 查询用户位置列表
 * @param {Object} data
 */
export function queryUserPositionList(data) {
  return request({
    url: "/estate/userPosition/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询用户位置
 * @param {String} id 用户位置id
 */
export function queryUserPosition(id) {
  return request({
    url: "/estate/userPosition/" + id,
    method: "GET",
  });
}

/**
 * 修改用户位置
 * @param {Object} data
 */
export function editUserPosition(data) {
  return request({
    url: "/estate/userPosition",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除用户位置
 * @param {String} ids
 */
export function deleteUserPosition(ids) {
  return request({
    url: "/estate/userPosition/" + ids,
    method: "delete",
  });
}

/**
 * 导出用户位置表格
 * @param data
 */
export function exportUserPositionList(data) {
  return request({
    url: "/estate/userPosition/export",
    method: "post",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入用户位置
 * @param {Object} data
 */
export function insertUserPosition(data) {
  return request({
    url: "/estate/userPosition",
    method: "post",
    data: data,
  });
}

/**
 * 查询用户列表
 * @param {Object} data
 */
export function queryUserListSysbom(data) {
  return request({
    url: "/system/user/list",
    method: "get",
    params: data,
  });
}
