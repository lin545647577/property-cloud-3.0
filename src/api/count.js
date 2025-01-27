import request from "./modules/request";
import axios from "axios";

/**
 * 查询费用情况
 * @param {Object} data
 */
export function queryBill(data) {
  return axios({
    headers: {
      "content-Type": "application/json;charset=utf-8",
    },
    url: "prod-api-v2/estate/ShareTotal/displayData",
    method: "get",
    params: data,
    withCredentials: true,
  });
}

/**
 * 查询品控
 * @param {Object} data
 */
export function queryQuality(data) {
  return request({
    url: "/taskDistribution/taskInstance/diagramData",
    method: "get",
  });
}

/**
 * 查询分摊费用
 * @param {Object} data
 */
export function queryShareBill(data) {
  return axios({
    headers: {
      "content-Type": "application/json;charset=utf-8",
    },
    url: "prod-api-v2/estate/ShareTotal/barChartDisplayData",
    method: "get",
    params: data,
    withCredentials: true,
  });
}

/**
 * 查询租售信息
 * @param {Object} data
 */
export function queryCount(data) {
  return axios({
    headers: {
      "content-Type": "application/json;charset=utf-8",
    },
    url: "prod-api-v2/estate/portal/cloudStatistics",
    method: "post",
    params: data,
    withCredentials: true,
  });
}
