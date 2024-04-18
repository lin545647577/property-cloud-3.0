import request from "./modules/request";

/**
 * 查询租赁列表
 * @param {Object} data
 */
export function queryLeasingList(data) {
  return request({
    url: "/wxEstateShow/propertyLeasing/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询租赁
 * @param {String} id 租赁id
 */
export function queryLeasing(id) {
  return request({
    url: "/wxEstateShow/propertyLeasing/getInfo/" + id,
    method: "get",
  });
}

/**
 * 修改租赁
 * @param {Object} data
 */
export function editLeasing(data) {
  return request({
    url: "/wxEstateShow/propertyLeasing",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除租赁
 * @param {String} ids
 */
export function deleteLeasing(ids) {
  return request({
    url: "/wxEstateShow/propertyLeasing/" + ids,
    method: "delete",
  });
}

/**
 * 导出租赁表格
 * @param data
 */
export function exportLeasingList(data) {
  return request({
    url: "/wxEstateShow/propertyLeasing/export",
    method: "post",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入租赁
 * @param {Object} data
 */
export function insertLeasing(data) {
  return request({
    url: "/wxEstateShow/propertyLeasing",
    method: "post",
    data: data,
  });
}

/**
 * 查询智慧屏租赁列表
 * @param {Object} data
 */
export function queryLeasingListByWiseScreen(data) {
  return request({
    url: "/wxEstateShow/propertyLeasing/wisdList",
    method: "post",
    data: data,
  });
}

/**
 * 查询智慧屏租赁
 * @param {String} id
 */
export function queryLeasingByWiseScreen(id) {
  return request({
    url: "/wxEstateShow/propertyLeasing/getWisdomInfo/" + id,
    method: "get",
  });
}
