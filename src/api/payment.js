import request from "./modules/request";

/**
 * 查询计算公式列表
 * @param {Object} data
 */
export function queryFormulaList(data) {
  return request({
    url: "cost/formula/list",
    method: "GET",
    params: data,
  });
}

/**
 * 查询计算公式
 * @param {String} id 计算公式id
 */
export function queryFormula(id) {
  return request({
    url: "cost/formula/" + id,
    method: "GET",
  });
}

/**
 * 修改计算公式
 * @param {Object} data
 */
export function editFormula(data) {
  return request({
    url: "/cost/formula",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除计算公式
 * @param {String} ids
 */
export function deleteFormula(ids) {
  return request({
    url: "/cost/formula/" + ids,
    method: "delete",
  });
}

/**
 * 导出计算公式表格
 * @param data
 */
export function exportFormulaList(data) {
  return request({
    url: "/cost/formula/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入计算公式
 * @param {Object} data
 */
export function insertFormula(data) {
  return request({
    url: "/cost/formula",
    method: "post",
    data: data,
  });
}

/**
 * 查询公摊系数菜单列表
 * @param {Object} data
 */
export function queryCoefficientList(data) {
  return request({
    url: "/estate/coefficientMenu/list",
    method: "GET",
    params: data,
  });
}

/**
 * 查询公摊系数菜单
 * @param {String} id 公摊系数菜单id
 */
export function queryCoefficient(id) {
  return request({
    url: "/estate/coefficientMenu/" + id,
    method: "GET",
  });
}

/**
 * 修改公摊系数菜单
 * @param {Object} data
 */
export function editCoefficient(data) {
  return request({
    url: "/estate/coefficientMenu",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除公摊系数菜单
 * @param {String} ids
 */
export function deleteCoefficient(ids) {
  return request({
    url: "/estate/coefficientMenu/" + ids,
    method: "delete",
  });
}

/**
 * 导出公摊系数菜单表格
 * @param data
 */
export function exportCoefficientList(data) {
  return request({
    url: "/estate/coefficientMenu/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入公摊系数菜单
 * @param {Object} data
 */
export function insertCoefficient(data) {
  return request({
    url: "/estate/coefficientMenu",
    method: "post",
    data: data,
  });
}

/**
 * 查询公摊系数详情列表
 * @param {String} referenceCoefficientId
 */
export function queryCoefficientDetailList(referenceCoefficientId) {
  return request({
    url:
      "/estate/coefficientDetail/list?referenceCoefficientId=" +
      referenceCoefficientId,
    method: "GET",
  });
}

/**
 * 查询公摊系数详情
 * @param {String} id 公摊系数详情id
 */
export function queryCoefficientDetail(id) {
  return request({
    url: "/estate/coefficientDetail/" + id,
    method: "GET",
  });
}

/**
 * 修改公摊系数详情
 * @param {Object} data
 */
export function editCoefficientDetail(data) {
  return request({
    url: "/estate/coefficientDetail",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除公摊系数详情
 * @param {String} ids
 */
export function deleteCoefficientDetail(ids) {
  return request({
    url: "/estate/coefficientDetail/" + ids,
    method: "delete",
  });
}

/**
 * 插入公摊系数详情
 * @param {Object} data
 */
export function insertCoefficientDetail(data) {
  return request({
    url: "/estate/coefficientDetail",
    method: "post",
    data: data,
  });
}

/**
 * 查询费用项目信息列表
 * @param {Object} data
 */
export function queryItemList(data) {
  return request({
    url: "/cost/item/list",
    method: "GET",
    params: data,
  });
}

/**
 * 查询费用项目信息
 * @param {String} id 费用项目信息id
 */
export function queryItem(id) {
  return request({
    url: "/cost/item/" + id,
    method: "GET",
  });
}

/**
 * 修改费用项目信息
 * @param {Object} data
 */
export function editItem(data) {
  return request({
    url: "/cost/item",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除费用项目信息
 * @param {String} ids
 */
export function deleteItem(ids) {
  return request({
    url: "/cost/item/" + ids,
    method: "delete",
  });
}

/**
 * 导出费用项目信息表格
 * @param data
 */
export function exportItemList(data) {
  return request({
    url: "/cost/item/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入费用项目信息
 * @param {Object} data
 */
export function insertItem(data) {
  return request({
    url: "/cost/item",
    method: "post",
    data: data,
  });
}

/**
 * 生成账单
 * @param {Object} data
 */
export function generateTotalBill(data) {
  return request({
    url: "/cost/totalBill/generate",
    method: "POST",
    data: data,
  });
}

/**
 * 发布账单
 * @param {String} ids
 */
export function releaseTotalBill(ids) {
  return request({
    url: "/cost/totalBill/release/" + ids,
    method: "GET",
  });
}

/**
 * 查询费用账单列表
 * @param {Object} data
 */
export function queryTotalBillList(data) {
  return request({
    url: "/cost/totalBill/list",
    method: "GET",
    params: data,
  });
}

/**
 * 查询费用账单
 * @param {String} id 费用账单id
 */
export function queryTotalBill(id) {
  return request({
    url: "/cost/totalBill/" + id,
    method: "GET",
  });
}

/**
 * 修改费用账单
 * @param {Object} data
 */
export function editTotalBill(data) {
  return request({
    url: "/cost/totalBill",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除费用账单
 * @param {String} ids
 */
export function deleteTotalBill(ids) {
  return request({
    url: "/cost/totalBill/" + ids,
    method: "delete",
  });
}

/**
 * 导出费用账单表格
 * @param data
 */
export function exportTotalBillList(data) {
  return request({
    url: "/cost/totalBill/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入费用账单
 * @param {Object} data
 */
export function insertTotalBill(data) {
  return request({
    url: "/cost/totalBill",
    method: "post",
    data: data,
  });
}

/**
 * 插入其他公摊账单
 * @param {Object} data
 */
export function insertOtherBill(data) {
  return request({
    url: "/cost/otherTotalBill",
    method: "post",
    data: data,
  });
}

/**
 * 编辑其他公摊账单
 * @param {Object} data
 */
export function editOtherBill(data) {
  return request({
    url: "/cost/otherTotalBill",
    method: "put",
    data: data,
  });
}

/**
 * 计算其他公摊账单
 * @param {String} totalBillId
 */
export function calculationOtherBill(totalBillId) {
  return request({
    url: "/cost/otherTotalBill/calculation/" + totalBillId,
    method: "get",
  });
}

/**
 * 支付费用账单详情
 * @param {Object} data
 */
export function payOwnerBillList(data) {
  return request({
    url: "/cost/ownerBill/pay",
    method: "post",
    data: data,
  });
}

/**
 * 查询费用账单详情列表
 * @param {Object} data
 */
export function queryOwnerBillList(data) {
  return request({
    url: "/cost/ownerBill/list",
    method: "GET",
    params: data,
  });
}

/**
 * 查询费用账单详情
 * @param {String} id 费用账单详情id
 */
export function queryOwnerBill(id) {
  return request({
    url: "/cost/ownerBill/" + id,
    method: "GET",
  });
}

/**
 * 修改费用账单详情
 * @param {Object} data
 */
export function editOwnerBill(data) {
  return request({
    url: "/cost/ownerBill",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除费用账单详情
 * @param {String} ids
 */
export function deleteOwnerBill(ids) {
  return request({
    url: "/cost/ownerBill/" + ids,
    method: "delete",
  });
}

/**
 * 导出费用账单详情表格
 * @param data
 */
export function exportOwnerBillList(data) {
  return request({
    url: "/cost/ownerBill/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 插入费用账单详情
 * @param {Object} data
 */
export function insertOwnerBill(data) {
  return request({
    url: "/cost/ownerBill",
    method: "post",
    data: data,
  });
}

/**
 * 业主账单表头动态加载
 * @param {String} residenceId
 */
export function queryOwnerBillTableHeader(residenceId) {
  return request({
    url: "/cost/ownerBill/tableHeader/" + residenceId,
    method: "get",
  });
}

/**
 * 查询业主账单列表
 * @param {Object} data
 */
export function queryOwnerBillTableData(data) {
  return request({
    url: "/cost/ownerBill/memberBill",
    method: "get",
    params: data,
  });
}
