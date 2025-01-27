import request from "./modules/request";

/**
 * 查询建议投诉列表
 * @param {Object} data
 */
export function querySuggestionList(data) {
  return request({
    url: "/wxEstateShow/suggestionDefinition/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询建议投诉
 * @param {String} id 楼层id
 */
export function querySuggestion(id) {
  return request({
    url: "/wxEstateShow/suggestionDefinition/" + id,
    method: "GET",
  });
}

/**
 * 修改建议投诉
 * @param {Object} data
 */
export function editSuggestion(data) {
  return request({
    url: "/wxEstateShow/suggestionDefinition",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除建议投诉
 * @param {String} ids
 */
export function deleteSuggestion(ids) {
  return request({
    url: "/wxEstateShow/suggestionDefinition/" + ids,
    method: "delete",
  });
}

/**
 * 导出建议投诉表格
 * @param {Object} data
 */
export function exportSuggestionList(data) {
  return request({
    url: "/wxEstateShow/suggestionDefinition/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}

/**
 * 插入建议投诉
 * @param {Object} data
 */
export function insertSuggestion(data) {
  return request({
    url: "/wxEstateShow/suggestionDefinition",
    method: "post",
    data: data,
  });
}

/**
 * 查询办事指南列表
 * @param {Object} data
 */
export function queryGuideList(data) {
  return request({
    url: "/wxEstateShow/workGuide/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询办事指南
 * @param {String} id id
 */
export function queryGuide(id) {
  return request({
    url: "/wxEstateShow/workGuide/getInfo/" + id,
    method: "GET",
  });
}

/**
 * 修改办事指南
 * @param {Object} data
 */
export function editGuide(data) {
  return request({
    url: "/wxEstateShow/workGuide",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除办事指南
 * @param {String} ids
 */
export function deleteGuide(ids) {
  return request({
    url: "/wxEstateShow/workGuide/" + ids,
    method: "delete",
  });
}

/**
 * 导出办事指南表格
 * @param {Object} data
 */
export function exportGuideList(data) {
  return request({
    url: "/wxEstateShow/workGuide/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}

/**
 * 插入办事指南
 * @param {Object} data
 */
export function insertGuide(data) {
  return request({
    url: "/wxEstateShow/workGuide",
    method: "post",
    data: data,
  });
}

/**
 * 查询智慧屏办事指南列表
 * @param {Object} data
 */
export function queryGuideListByWiseScreen(data) {
  return request({
    url: "/wxEstateShow/workGuide/wisdomList",
    method: "post",
    data: data,
  });
}

/**
 * 查询智慧屏办事指南列表
 * @param {String} 办事指南id
 */
export function queryGuideByWiseScreen(id) {
  return request({
    url: "/wxEstateShow/workGuide/getWisdomInfo/" + id,
    method: "get",
  });
}

/**
 * 查询问题列表
 * @param {Object} data
 */
export function queryQuestionList(data) {
  return request({
    url: "/estate/question/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询问题
 * @param {String} id 楼层id
 */
export function queryQuestion(id) {
  return request({
    url: "estate/question/" + id,
    method: "GET",
  });
}

/**
 * 修改问题
 * @param {Object} data
 */
export function editQuestion(data) {
  return request({
    url: "/estate/question",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除问题
 * @param {String} ids
 */
export function deleteQuestion(ids) {
  return request({
    url: "/estate/question/" + ids,
    method: "delete",
  });
}

/**
 * 导出问题表格
 * @param {Object} data
 */
export function exportQuestionList(data) {
  return request({
    url: "/estate/question/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}

/**
 * 插入问题
 * @param {Object} data
 */
export function insertQuestion(data) {
  return request({
    url: "/estate/question",
    method: "post",
    data: data,
  });
}

/**
 * 查询问题类型列表
 * @param {Object} data
 */
export function queryQuestionTypeList(data) {
  return request({
    url: "/estate/questionType/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询问题类型
 * @param {String} id 楼层id
 */
export function queryQuestionType(id) {
  return request({
    url: "estate/questionType/" + id,
    method: "GET",
  });
}

/**
 * 修改问题类型
 * @param {Object} data
 */
export function editQuestionType(data) {
  return request({
    url: "/estate/questionType",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除问题类型
 * @param {String} ids
 */
export function deleteQuestionType(ids) {
  return request({
    url: "/estate/questionType/" + ids,
    method: "delete",
  });
}

/**
 * 导出问题类型表格
 * @param {Object} data
 */
export function exportQuestionTypeList(data) {
  return request({
    url: "/estate/questionType/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}

/**
 * 插入问题类型
 * @param {Object} data
 */
export function insertQuestionType(data) {
  return request({
    url: "/estate/questionType",
    method: "post",
    data: data,
  });
}

/**
 * 查询问题答疑列表
 * @param {Object} data
 */
export function queryAnswerList(data) {
  return request({
    url: "/estate/questionAnswer/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询问题答疑
 * @param {String} id 楼层id
 */
export function queryAnswer(id) {
  return request({
    url: "estate/questionAnswer/" + id,
    method: "GET",
  });
}

/**
 * 修改问题答疑
 * @param {Object} data
 */
export function editAnswer(data) {
  return request({
    url: "/estate/questionAnswer",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除问题答疑
 * @param {String} ids
 */
export function deleteAnswer(ids) {
  return request({
    url: "/estate/questionAnswer/" + ids,
    method: "delete",
  });
}

/**
 * 导出问题答疑表格
 * @param {Object} data
 */
export function exportAnswerList(data) {
  return request({
    url: "/estate/questionAnswer/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}

/**
 * 插入问题答疑
 * @param {Object} data
 */
export function insertAnswer(data) {
  return request({
    url: "/estate/questionAnswer",
    method: "post",
    data: data,
  });
}

/**
 * 查询用户问题列表
 * @param {Object} data
 */
export function queryUserQuestionList(data) {
  return request({
    url: "/estate/questionSubmit/list",
    method: "post",
    data: data,
  });
}

/**
 * 查询用户问题
 * @param {String} id 楼层id
 */
export function queryUserQuestion(id) {
  return request({
    url: "estate/questionSubmit/" + id,
    method: "GET",
  });
}

/**
 * 修改用户问题
 * @param {Object} data
 */
export function editUserQuestion(data) {
  return request({
    url: "/estate/questionSubmit",
    method: "PUT",
    data: data,
  });
}

/**
 * 删除用户问题
 * @param {String} ids
 */
export function deleteUserQuestion(ids) {
  return request({
    url: "/estate/questionSubmit/" + ids,
    method: "delete",
  });
}

/**
 * 导出用户问题表格
 * @param {Object} data
 */
export function exportUserQuestionList(data) {
  return request({
    url: "/estate/questionSubmit/export",
    method: "post",
    data: data,
    responseType: "blob",
  });
}

/**
 * 插入用户问题
 * @param {Object} data
 */
export function insertUserQuestion(data) {
  return request({
    url: "/estate/questionSubmit",
    method: "post",
    data: data,
  });
}

/**
 * 反馈用户问题
 * @param {Object} data
 */
export function replyUserQuestion(data) {
  return request({
    url: "/estate/questionSubmit/reply",
    method: "post",
    data: data,
  });
}

/**
 * 查询智慧屏幕问题类型
 * @param {Object} data
 */
export function queryQuestionTypeByWiseScreen(data) {
  return request({
    url: "/estate/questionType/displayList",
    method: "post",
    data: data,
  });
}

/**
 * 查询智慧屏幕问题
 * @param {Object} data
 */
export function queryQuestionByWiseScreen(data) {
  return request({
    url: "/estate/question/displayList",
    method: "post",
    data: data,
  });
}

/**
 * 智慧屏查询答案
 * @param {String} question
 */
export function queryAnswerByWiseScreen(question) {
  return request({
    url: "/estate/question/questionStr",
    method: "get",
    params: { question },
  });
}

/**
 * 智慧屏咨询服务二维码
 * @param {String} question
 */
export function queryQRByWiseScreen(question) {
  return request({
    url: "/estate/questionSubmit/generateQuestionUrlQrc",
    method: "get",
  });
}
