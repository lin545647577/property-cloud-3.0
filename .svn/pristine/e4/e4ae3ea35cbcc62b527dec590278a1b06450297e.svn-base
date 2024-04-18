import request from "./modules/request";

/**
 * 查询地图列表
 * @param {Object} data
 */
export function queryMapList(data) {
  return request({
    url: "/navigation/tygxMapDefinition/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询地图
 * @param {String} id 楼层id
 */
export function queryMap(id) {
  return request({
    url: "/navigation/tygxMapDefinition/" + id,
    method: "GET",
  });
}

/**
 * 修改地图
 * @param {Object} data
 */
export function editMap(data) {
  return request({
    url: "/navigation/tygxMapDefinition",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除地图
 * @param {String} ids
 */
export function deleteMap(ids) {
  return request({
    url: "/navigation/tygxMapDefinition/" + ids,
    method: "delete",
  });
}

/**
 * 导出地图表格
 * @param {Object} data
 */
export function exportMapList(data) {
  return request({
    url: "/navigation/tygxMapDefinition/export",
    method: "GET",
    params: data,
    responseType: "blob",
  });
}

/**
 * 上线地图
 * @param {String} code 地图编码
 */
export function deployMap(code) {
  return request({
    url: "/navigation/tygxMapDefinition/mapInUsed/" + code,
    method: "GET",
  });
}

/**
 * 下线地图
 * @param {String} code 地图编码
 */
export function offMap(code) {
  return request({
    url: "/navigation/tygxMapDefinition/mapOffLine/" + code,
    method: "GET",
  });
}

/**
 * 查看地图坐标
 * @param {Object} data
 */
export function queryMapCoordinateList(data) {
  return request({
    url: "/navigation/tygxMapPointDefinition/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询地图坐标
 * @param {String} id 楼层id
 */
export function queryMapCoordinate(id) {
  return request({
    url: "/navigation/tygxMapPointDefinition/" + id,
    method: "GET",
  });
}

/**
 * 修改地图坐标
 * @param {Object} data
 */
export function editMapCoordinate(data) {
  return request({
    url: "/navigation/tygxMapPointDefinition",
    method: "PUT",
    data: data,
  });
}
