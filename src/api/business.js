import request from "./modules/request";
import axios from "axios";

/**
 * 校验通行二维码
 * @param {object} formData 请求数据
 * @return {AxiosPromise} 响应
 */
export function codeValidate(formData) {
  return request({
    url: "commonApi/qrcValidate/businessCodeValidate",
    method: "POST",
    data: formData,
  });
}



/**
 * 查询身份证
 */
export function identityApi() {
  return axios({
    // headers: {
    //   "content-Type": "application/json;charset=utf-8",
    // },
    url: "http://192.168.65.111:8003/api/f1",
    method: "get",
  });
}


/**
 * 校验通行二维码
 * @param {object} formData 请求数据
 * @return {AxiosPromise} 响应
 */
export function appointmentRegister(cardNo) {
  return request({
    url: "estate/appointmentRegister/visitConfirmation?cardNo=" + cardNo,
    method: "POST",
  });
}
