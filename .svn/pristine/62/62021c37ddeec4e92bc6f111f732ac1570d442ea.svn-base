import request from "./modules/request";

/**
 * 查询开发商列表
 * @param {Object} data
 */
export function queryDeveloperList(data) {
  return request({
    url: "/estate/developer/list",
    method: "GET",
    params: data,
  });
}

/**
 * 查询开发商
 * @param {String} id 开发商id
 */
export function queryDeveloper(id) {
  return request({
    url: "/estate/developer/" + id,
    method: "GET",
  });
}

/**
 * 修改开发商
 * @param {Object} data
 */
export function editDeveloper(data) {
  return request({
    url: "/estate/developer",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除开发商
 * @param {String} ids
 */
export function deleteDeveloper(ids) {
  return request({
    url: "/estate/developer/" + ids,
    method: "delete",
  });
}

/**
 * 导出开发商表格
 * @param data
 */
export function exportDeveloperList(data) {
  return request({
    url: "/estate/developer/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入开发商
 * @param {Object} data
 */
export function insertDeveloper(data) {
  return request({
    url: "/estate/developer",
    method: "post",
    data: data,
  });
}

/**
 * 查询公司列表
 * @param {Object} data
 */
export function queryCompanyList(data) {
  return request({
    url: "/system/tygxCompanyDefinition/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询公司
 * @param {String} id 公司id
 */
export function queryCompany(id) {
  return request({
    url: "/system/tygxCompanyDefinition/" + id,
    method: "GET",
  });
}

/**
 * 修改公司
 * @param {Object} data
 */
export function editCompany(data) {
  return request({
    url: "/system/tygxCompanyDefinition",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除公司
 * @param {String} ids
 */
export function deleteCompany(ids) {
  return request({
    url: "/system/tygxCompanyDefinition/" + ids,
    method: "delete",
  });
}

/**
 * 导出公司表格
 * @param data
 */
export function exportCompanyList(data) {
  return request({
    url: "/system/tygxCompanyDefinition/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入公司
 * @param {Object} data
 */
export function insertCompany(data) {
  return request({
    url: "/system/tygxCompanyDefinition",
    method: "post",
    data: data,
  });
}

/**
 * 查询公司业务类型
 */
export function queryCompanyType() {
  return request({
    url: "/system/dict/data/type/company_service_type",
    method: "get",
  });
}

/**
 * 查询公司状态
 */
export function queryCompanyStatus() {
  return request({
    url: "/system/dict/data/type/company_status",
    method: "get",
  });
}

/**
 * 查询小区列表
 * @param {Object} data
 */
export function queryResidenceList(data) {
  return request({
    url: "estate/residence/list",
    method: "GET",
    params: data,
  });
}

/**
 * 查询小区
 * @param {String} id 小区id
 */
export function queryResidence(id) {
  return request({
    url: "estate/residence/" + id,
    method: "GET",
  });
}

/**
 * 修改小区
 * @param {Object} data
 */
export function editResidece(data) {
  return request({
    url: "/estate/residence",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除小区
 * @param {String} ids
 */
export function deleteResidece(ids) {
  return request({
    url: "/estate/residence/" + ids,
    method: "delete",
  });
}

/**
 * 导出小区表格
 * @param data
 */
export function exportResidenceList(data) {
  return request({
    url: "/estate/residence/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入小区
 * @param {Object} data
 */
export function insertResidence(data) {
  return request({
    url: "/estate/residence",
    method: "post",
    data: data,
  });
}

/**
 * 查询智慧屏建筑列表
 * @param {Object} data 其他参数
 * @param {String} typeCode 元素编码（必填）
 */
export function queryBuildingListBywiseScreen(data) {
  return request({
    url: "/estate/architectureTree/displayList",
    method: "post",
    data: data,
  });
}

/**
 * 查询智慧屏公司列表
 * @param {String} nodeId 楼层id（必填）
 */
export function queryCompanyListByWiseScreen(nodeId) {
  return request({
    url:
      "/system/tygxCompanyDefinition/selectCompanysByArchitectureId/" + nodeId,
    method: "get",
  });
}

/**
 * 查询楼宇列表
 * @param {Object} data
 */
export function queryBuildingList(data) {
  return request({
    url: "/estate/building/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询楼宇
 * @param {String} id 楼宇id
 */
export function queryBuilding(id) {
  return request({
    url: "estate/building/" + id,
    method: "GET",
  });
}

/**
 * 修改楼宇
 * @param {Object} data
 */
export function editBuilding(data) {
  return request({
    url: "/estate/building",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除楼宇
 * @param {String} ids
 */
export function deleteBuilding(ids) {
  return request({
    url: "/estate/building/" + ids,
    method: "delete",
  });
}

/**
 * 导出楼宇表格
 * @param data
 * @param success
 */
export function exportBuildingList(data) {
  return request({
    url: "/estate/building/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入楼宇
 * @param {Object} data
 */
export function insertBuilding(data) {
  return request({
    url: "/estate/building",
    method: "post",
    data: data,
  });
}

/**
 * 查询楼层列表
 * @param {Object} data
 */
export function queryFloorList(data) {
  return request({
    url: "/estate/floor/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询楼层
 * @param {String} id 楼层id
 */
export function queryFloor(id) {
  return request({
    url: "estate/floor/" + id,
    method: "GET",
  });
}

/**
 * 修改楼层
 * @param {Object} data
 */
export function editFloor(data) {
  return request({
    url: "/estate/floor",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除楼层
 * @param {String} ids
 */
export function deleteFloor(ids) {
  return request({
    url: "/estate/floor/" + ids,
    method: "delete",
  });
}

/**
 * 导出楼层表格
 * @param data
 * @param success
 */
export function exportFloorList(data) {
  return request({
    url: "/estate/floor/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入楼层
 * @param {Object} data
 */
export function insertFloor(data) {
  return request({
    url: "/estate/floor",
    method: "post",
    data: data,
  });
}

/**
 * 查询房屋列表
 * @param {Object} data
 */
export function queryHouseList(data) {
  return request({
    url: "/estate/house/list",
    method: "get",
    params: data,
  });
}

/**
 * 查询房屋
 * @param {String} id 楼层id
 */
export function queryHouse(id) {
  return request({
    url: "estate/house/" + id,
    method: "GET",
  });
}

/**
 * 修改房屋
 * @param {Object} data
 */
export function editHouse(data) {
  return request({
    url: "/estate/house",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除房屋
 * @param {String} ids
 */
export function deleteHouse(ids) {
  return request({
    url: "/estate/house/" + ids,
    method: "delete",
  });
}

/**
 * 导出房屋表格
 * @param data
 * @param success
 */
export function exportHouseList(data) {
  return request({
    url: "/estate/house/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入房屋
 * @param {Object} data
 */
export function insertHouse(data) {
  return request({
    url: "/estate/house",
    method: "post",
    data: data,
  });
}

/**
 * 加载物业树
 * @param {Object} data
 */
export function queryPropertyTree(data) {
  return request({
    url: "/estate/residence/tree",
    method: "post",
    data: data,
  });
}

/**
 * 加载物业树当前层级列表
 * @param {Object} data
 */
export function queryPropertyTreeInfo(data) {
  return request({
    url: "/estate/residence/treeNodeDetail",
    method: "post",
    data: data,
  });
}

/**
 * 加载物业树当前层级信息
 * @param {Object} data
 */
export function queryPropertyTreeList(data, pageNum, pageSize) {
  return request({
    url:
      "/estate/residence/treeList?pageNum=" + pageNum + "&pageSize=" + pageSize,
    method: "post",
    data: data,
  });
}

/**
 * 获取位置树
 * @param {Long} residenceId
 */
export function queryPositionTree(residenceId) {
  return request({
    url: "/estate/position/getPosition",
    method: "get",
    data: { residenceId },
  });
}

/**
 * 获取建筑元素列表表头
 * @param {String} typeCode
 */
export function queryPropertyTableHeader(typeCode) {
  return request({
    url: "/estate/architectureTree/tableHeader/" + typeCode,
    method: "get",
  });
}

/**
 * 获取建筑元素列表
 * @param {Object} data
 */
export function queryPropertyTableData(data) {
  return request({
    url: "/estate/architectureTree/getTableData",
    method: "get",
    params: data,
  });
}

/**
 * 获取建筑元素动态表单格式
 * @param {String} id
 */
export function queryForm(id) {
  return request({
    url: "/estate/architectureTree/getFormById",
    method: "get",
    params: { id: id },
  });
}

/**
 * 获取建筑元素动态表单值
 * @param {String} id
 */
export function queryFormData(id) {
  return request({
    url: "/estate/architectureTree/getNodeDataById",
    method: "get",
    params: { id: id },
  });
}

/**
 * 删除建筑元素
 * @param {String} ids
 */
export function deleteFormData(ids) {
  return request({
    url: "/estate/architectureTree/" + ids,
    method: "delete",
  });
}

/**
 * 插入建筑元素
 * @param {Objec} data
 */
export function insertProperty(data) {
  return request({
    url: "/estate/architectureTree",
    method: "post",
    data: data,
  });
}

/**
 * 编辑建筑元素
 * @param {Object} data
 */
export function editFormData(data) {
  return request({
    url: "/estate/architectureData",
    method: "put",
    data: data,
  });
}

/**
 * 获取建筑元素列表
 * @param {String} typeCode
 */
export function queryPropertyList(typeCode) {
  return request({
    url: "/estate/architectureTree/list",
    method: "post",
    data: { typeCode },
  });
}

/**
 * 获取可添加子建筑元素列表
 * @param {String} id
 */
export function queryChildPropertyList(id) {
  return request({
    url: "/estate/architectureTree/getNodeTypesByNodeId",
    method: "get",
    params: { id },
  });
}
