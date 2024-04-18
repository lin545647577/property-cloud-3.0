import request from "./modules/request";

/**
 * 查询人员列表
 * @param {Object} data
 */
export function queryMemberList(data) {
  return request({
    url: "/estate/member/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询人员
 * @param {String} id 楼层id
 */
export function queryMember(id) {
  return request({
    url: "estate/member/" + id,
    method: "GET",
  });
}

/**
 * 修改人员
 * @param {Object} data
 */
export function editMember(data) {
  return request({
    url: "/estate/member",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除人员
 * @param {String} ids
 */
export function deleteMember(ids) {
  return request({
    url: "/estate/member/" + ids,
    method: "delete",
  });
}

/**
 * 导出人员表格
 * @param {Object} data
 */
export function exportMemberList(data) {
  return request({
    url: "/estate/member/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入人员
 * @param {Object} data
 */
export function insertMember(data) {
  return request({
    url: "/estate/member",
    method: "post",
    data: data,
  });
}

/**
 * 查询业主列表
 * @param {Object} data
 */
export function queryOwnerList(data) {
  return request({
    url: "/estate/owner/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询业主
 * @param {String} id 楼层id
 */
export function queryOwner(id) {
  return request({
    url: "estate/owner/" + id,
    method: "GET",
  });
}

/**
 * 修改业主
 * @param {Object} data
 */
export function editOwner(data) {
  return request({
    url: "/estate/owner",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除业主
 * @param {String} ids
 */
export function deleteOwner(ids) {
  return request({
    url: "/estate/owner/" + ids,
    method: "delete",
  });
}

/**
 * 导出业主表格
 * @param {Object} data
 */
export function exportOwnerList(data) {
  return request({
    url: "/estate/owner/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入业主
 * @param {Object} data
 */
export function insertOwner(data) {
  return request({
    url: "/estate/owner",
    method: "post",
    data: data,
  });
}

/**
 * 查询家庭成员列表
 * @param {Object} data
 */
export function queryMemberHouseList(data) {
  return request({
    url: "/estate/memberHouse/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询家庭成员
 * @param {String} id 楼层id
 */
export function queryMemberHouse(id) {
  return request({
    url: "estate/memberHouse/" + id,
    method: "GET",
  });
}

/**
 * 修改家庭成员
 * @param {Object} data
 */
export function editMemberHouse(data) {
  return request({
    url: "/estate/memberHouse",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除家庭成员
 * @param {String} ids
 */
export function deleteMemberHouse(ids) {
  return request({
    url: "/estate/memberHouse/" + ids,
    method: "delete",
  });
}

/**
 * 导出家庭成员表格
 * @param {Object} data
 */
export function exportMemberHouseList(data) {
  return request({
    url: "/estate/memberHouse/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入家庭成员
 * @param {Object} data
 */
export function insertMemberHouse(data) {
  return request({
    url: "/estate/memberHouse",
    method: "post",
    data: data,
  });
}

/**
 * 查询物管人员列表
 * @param {Object} data
 */
export function queryPropertyMemberList(data) {
  return request({
    url: "/estate/memberEstate/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询物管人员
 * @param {String} id 楼层id
 */
export function queryPropertyMember(id) {
  return request({
    url: "estate/memberEstate/" + id,
    method: "GET",
  });
}

/**
 * 修改物管人员
 * @param {Object} data
 */
export function editPropertyMember(data) {
  return request({
    url: "/estate/memberEstate",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除物管人员
 * @param {String} ids
 */
export function deletePropertyMember(ids) {
  return request({
    url: "/estate/memberEstate/" + ids,
    method: "delete",
  });
}

/**
 * 导出物管人员表格
 * @param {Object} data
 */
export function exportPropertyMemberList(data) {
  return request({
    url: "/estate/memberEstate/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入物管人员
 * @param {Object} data
 */
export function insertPropertyMember(data) {
  return request({
    url: "/estate/memberEstate",
    method: "post",
    data: data,
  });
}

/**
 * 获取人员权限
 * @param {Object} data
 */
export function queryPermission(data) {
  return request({
    url: "/estate/tygxMemberPermissionReference/getPermission",
    method: "post",
    params: data,
  });
}

/**
 * 更新人员权限
 * @param {Object} data
 */
export function updatePermission(data) {
  return request({
    url: "/estate/tygxMemberPermissionReference/updateMul",
    method: "post",
    data: data,
  });
}
