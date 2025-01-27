import request from "./modules/request";

/**
 * 查询通知列表
 * @param {Object} data
 */
export function queryNoticeList(data) {
  return request({
    url: "/estate/notice/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询通知
 * @param {String} id id
 */
export function queryNotice(id) {
  return request({
    url: "estate/notice/" + id,
    method: "GET",
  });
}

/**
 * 修改通知
 * @param {Object} data
 */
export function editNotice(data) {
  return request({
    url: "/estate/notice",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除通知
 * @param {String} ids
 */
export function deleteNotice(ids) {
  return request({
    url: "/estate/notice/" + ids,
    method: "delete",
  });
}

/**
 * 导出通知表格
 * @param data
 * @param success
 */
export function exportNoticeList(data) {
  return request({
    url: "/estate/notice/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入通知
 * @param {Object} data
 */
export function insertNotice(data) {
  return request({
    url: "/estate/notice",
    method: "post",
    data: data,
  });
}

/**
 * 发布通知
 * @param {Object} ids
 */
export function publishNotice(ids) {
  return request({
    url: "/estate/notice/release/" + ids,
    method: "get",
  });
}

/**
 * 查询智慧屏通知公告
 * @param {Object} data
 */
export function queryNoticeListByWiseScreen(data) {
  return request({
    url: "/estate/notice/displayList",
    method: "get",
    params: data,
  });
}

/**
 * 用id查询智慧屏通知公告
 * @param {String} id
 */
export function queryNoticeByWiseScreen(id) {
  return request({
    url: "/estate/notice/" + id,
    method: "get",
  });
}
