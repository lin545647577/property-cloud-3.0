import request from "./modules/request";

/**
 * 查询公众号/小程序列表
 * @param {Object} data
 */
export function queryMPList(data) {
  return request({
    url: "/wechat/tygxWechatAppDefinition/list",
    method: "GET",
    params: data,
  });
}

/**
 * 查询公众号/小程序
 * @param {String} id 公众号/小程序id
 */
export function queryMP(id) {
  return request({
    url: "/wechat/tygxWechatAppDefinition/" + id,
    method: "GET",
  });
}

/**
 * 修改公众号/小程序
 * @param {Object} data
 */
export function editMP(data) {
  return request({
    url: "/wechat/tygxWechatAppDefinition",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除公众号/小程序
 * @param {String} ids
 */
export function deleteMP(ids) {
  return request({
    url: "/wechat/tygxWechatAppDefinition/" + ids,
    method: "delete",
  });
}

/**
 * 导出公众号/小程序表格
 * @param data
 */
export function exportMPList(data) {
  return request({
    url: "/wechat/tygxWechatAppDefinition/export",
    method: "post",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入公众号/小程序
 * @param {Object} data
 */
export function insertMP(data) {
  return request({
    url: "/wechat/tygxWechatAppDefinition",
    method: "post",
    data: data,
  });
}

/**
 *从微信服务更新
 * @param {String} mpIds 公众号id
 */
export function updateMPFormWX(mpIds) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateConfig/updateByWechat",
    method: "post",
    params: { mpIds },
  });
}

/**
 * 查询消息模板列表
 * @param {Object} data
 */
export function queryMsgTemplateList(data) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateConfig/list",
    method: "GET",
    params: data,
  });
}

/**
 * 查询消息模板
 * @param {String} id 消息模板id
 */
export function queryMsgTemplate(id) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateConfig/" + id,
    method: "GET",
  });
}

/**
 * 修改消息模板
 * @param {Object} data
 */
export function editMsgTemplate(data) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateConfig",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除消息模板
 * @param {String} ids
 */
export function deleteMsgTemplate(ids) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateConfig/" + ids,
    method: "delete",
  });
}

/**
 * 导出消息模板表格
 * @param data
 */
export function exportMsgTemplateList(data) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateConfig/export",
    method: "post",
    params: data,
    responseType: "blob",
  });
}

/**
 * 查询微信用户列表
 * @param {Object} data
 */
export function queryWXUserList(data) {
  return request({
    url: "/wechat/tygxWechatWxUserDefinition/list",
    method: "GET",
    params: data,
  });
}

/**
 * 查询微信用户
 * @param {String} id 微信用户id
 */
export function queryWXUser(id) {
  return request({
    url: "/wechat/tygxWechatWxUserDefinition/" + id,
    method: "GET",
  });
}

/**
 * 修改微信用户
 * @param {Object} data
 */
export function editWXUser(data) {
  return request({
    url: "/wechat/tygxWechatWxUserDefinition",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除微信用户
 * @param {String} ids
 */
export function deleteWXUser(ids) {
  return request({
    url: "/wechat/tygxWechatWxUserDefinition/" + ids,
    method: "delete",
  });
}

/**
 * 导出微信用户表格
 * @param data
 */
export function exportWXUserList(data) {
  return request({
    url: "/wechat/tygxWechatWxUserDefinition/export",
    method: "get",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入微信用户
 * @param {Object} data
 */
export function insertWXUser(data) {
  return request({
    url: "/wechat/tygxWechatWxUserDefinition",
    method: "post",
    data: data,
  });
}

/**
 * 查询微信配置消息模板列表
 * @param {Object} data
 */
export function queryTemplateMpConfigList(data) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateMpConfig/list",
    method: "GET",
    params: data,
  });
}

/**
 * 查询微信配置消息模板
 * @param {String} id 微信配置消息模板id
 */
export function queryTemplateMpConfig(id) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateMpConfig/" + id,
    method: "GET",
  });
}

/**
 * 修改微信配置消息模板
 * @param {Object} data
 */
export function editTemplateMpConfig(data) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateMpConfig",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除微信配置消息模板
 * @param {String} ids
 */
export function deleteTemplateMpConfig(ids) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateMpConfig/" + ids,
    method: "delete",
  });
}

/**
 * 导出微信配置消息模板表格
 * @param data
 */
export function exportTemplateMpConfigList(data) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateMpConfig/export",
    method: "get",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入微信配置消息模板
 * @param {Object} data
 */
export function insertTemplateMpConfig(data) {
  return request({
    url: "/wechat/tygxWechatMessageTemplateMpConfig",
    method: "post",
    data: data,
  });
}

/**
 * 查询联系我们列表
 * @param {Object} data
 */
export function queryContactList(data) {
  return request({
    url: "/system/tygxContactsRelationshipRecord/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询联系我们
 * @param {String} id id
 */
export function queryContact(id) {
  return request({
    url: "/system/tygxContactsRelationshipRecord/" + id,
    method: "GET",
  });
}

/**
 * 修改联系我们
 * @param {Object} data
 */
export function editContact(data) {
  return request({
    url: "/system/tygxContactsRelationshipRecord",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除联系我们
 * @param {String} ids
 */
export function deleteContact(ids) {
  return request({
    url: "/system/tygxContactsRelationshipRecord/" + ids,
    method: "delete",
  });
}

/**
 * 导出联系我们表格
 * @param data
 * @param success
 */
export function exportContactList(data) {
  return request({
    url: "/system/tygxContactsRelationshipRecord/listexport",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入联系我们
 * @param {Object} data
 */
export function insertContact(data) {
  return request({
    url: "/system/tygxContactsRelationshipRecord",
    method: "post",
    data: data,
  });
}
