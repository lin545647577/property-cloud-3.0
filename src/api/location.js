import request from "./modules/request";


/**
 * 缓存坐标
 * @param {Object} data
 */
export function addTempPoint(data) {
    return request({
        url: "/navigation/tygxMapPointDefinition/addTempPoint",
        method: "POST",
        data: data,
    })
}


/**
 * 获取地图的坐标缓存
 * @param {string} mapCode
 */
export function tempPointList(mapCode) {
    return request({
        url: "/navigation/tygxMapPointDefinition/tempPointList/" + mapCode,
        method: "get",
    })
}


/**
 * 清除地图坐标缓存
 * @param {string} mapCode
 */
export function clearTempPointList(mapCode) {
    return request({
        url: "/navigation/tygxMapPointDefinition/clearTempPointList/" + mapCode,
        method: "get",
    })
}


/**
 * 清除地图坐标缓存
 * @param {Object} data
 */
export function deleteTempPoint(data) {
    return request({
        url: "/navigation/tygxMapPointDefinition/deleteTempPoint",
        method: "delete",
        data: data,
    })
}

/**
 * 初始化地图坐标及坐标关系信息
 * @param {Object} data
 */
export function initMapPoints(data) {
    return request({
        url: "/navigation/tygxMapPointDefinition/initMapPoints",
        method: "post",
        data: data,
    })
}


/**
 * 计算路径
 * @param {Object} data
 */
export function pathCalculation(data) {
    return request({
        url: "/navigation/tygxMapNavigation/pathCalculationWithDijkstra",
        method: "POST",
        data: data,
    })
}



/**
 * 智慧屏查询可预约查询类型
 * @param {Object} data
 */
export function searchManagerDefinedTypeForWiseScreen(data) {
    return request({
        data: data,
        url: "/reservation/tygxReservationFunctionRoomDefinition/searchManagerDefinedTypeForWiseScreen",
        method: "POST",
    })
}
/**
 * 生成预约二维码接口
 * @param {Object} data
 */
export function generateToReservationQrc(data) {
    return request({
        data: data,
        url: "/reservation/tygxReservationRecord/generateToReservationQrc",
        method: "POST",
    })
}


/**
 * 设备获取地图信息
 * @param {Object} uuid
 */
export function deviceMapInfo() {
    return request({
        url: "/navigation/tygxMapDefinition/deviceMapInfo",
        method: "GET",
    })
}



/**
 * 设备获取地图坐标
 * @param {Object} uuid
 */
export function getPointByDeviceUuid() {
    return request({
        url: "/navigation/tygxMapPointDefinition/getPointByDeviceUuid",
        method: "GET",
    })
}



/**
 * 获取地图的路线缓存
 * @param {Object} uuid
 */
export function tempPathList(mapCode) {
    return request({
        url: "/navigation/tygxMapPointDefinition/tempPathList/" + mapCode,
        method: "GET",
    })
}


/**
 * 获取地图的路线缓存
 * @param {Object} uuid
 */
export function listByCurrentOrg(mapCode) {
    return request({
        url: "/tygx-map-navigation/tygxMapDefinition/listByCurrentOrg",
        method: "GET",
    })
}




/**
 * 新增logo坐标
 * @param {Object} formDate
 */
export function tygxMapLogoShowPositionDefinition(formDate) {
    return request({
        url: "/navigation/tygxMapLogoShowPositionDefinition",
        method: "POST",
        data: formDate
    })
}



/**
 * 获取建筑列表
 */
export function architectureTree(orgId) {
    return request({
        url: "/tygx-estate/architectureTree/api/getTreeByOrgId",
        method: "get",
        params: { orgId }
    })
}



/**
 * 删除logo坐标
 */
export function tygxMapLogoShowPositionDefinitionDelete(ids) {
    return request({
        url: "/navigation/tygxMapLogoShowPositionDefinition/" + ids,
        method: "DELETE",
    })
}



/**
 * 查询logo坐标
 */
export function tygxMapLogoShowPositionDefinitionDeleteList(referenceMapCode) {
    return request({
        url: "/navigation/tygxMapLogoShowPositionDefinition/list",
        method: "post",
        data: {
            referenceMapCode: referenceMapCode
        }
    })
}


/**
 * 查询公司列表
 */
export function listAllForDevice() {
    return request({
        url: "/system/companyUser/listAllForDevice",
        method: "get",
    })
}


/**
 * 设备当前坐标接口
 */
export function tygxMapPointDefinition() {
    return request({
        url: "/navigation/tygxMapPointDefinition/getPointByDeviceUuid",
        method: "get",
    })
}

/**
 * 智慧屏查询公司接口
 */
export function listForWisdomScreen(formDate) {
    return request({
        url: "/system/tygxCompanyDefinition/listForWisdomScreen",
        method: "post",
        data: formDate
    })
}

/**
 * 获取公司所在坐标接口
 */
export function findPositionByUser(userId, mapCode) {
    return request({
        url: "/navigation/tygxMapPointDefinition/findPositionByUser/" + userId + "/" + mapCode,
        method: "get",
    })
}



/**
 * 地图logo显示信息列表
 */
export function getLogoPointList(mapCode) {
    return request({
        url: "/navigation/tygxMapLogoShowPositionDefinition/getLogoPointList/" + mapCode,
        method: "get",
    })
}


/**
 * 生成预约二维码接口
 */
export function generateQrcCode(compCode) {
    return request({
        url: "/navigation/tygxMapLogoShowPositionDefinition/generateQrcCode/" + compCode,
        method: "get",
    })
}

/**
 * 获取右侧搜索附近列表
 */
export function searchOrgFunctionBusinessTypesForWiseScreen() {
    return request({
        url: "/reservation/tygxReservationFunctionRoomDefinition/searchOrgFunctionBusinessTypesForWiseScreen",
        method: "post",
    })
}

/**
 * 选择业务类型查询logo显示列表
 */
export function tygxMapLogoShowPositionDefinitionNearby(formDate) {
    return request({
        url: "/navigation/tygxMapLogoShowPositionDefinition/getLogoPointListByMapCodeNBusinessType",
        method: "post",
        data: formDate
    })
}

/**
 * 智慧屏-园区预约-模糊查询
 */
export function selectCurrentOrgDefinedTypes(filter) {
    return request({
        url: "/reservation/tygxReservationFunctionRoomDefinition/selectCurrentOrgDefinedTypes",
        method: "post",
        data: { filter: filter }
    })
}


/**
 * 智慧屏-园区预约-地图坐标列表
 */
export function selectShowPointsDataForReservationInWisdomScreen(formDate) {
    return request({
        url: "/navigation/tygxMapLogoShowPositionDefinition/selectShowPointsDataForReservationInWisdomScreen",
        method: "post",
        data: formDate
    })
}


/**
 * 智慧屏-园区预约-地图坐标列表
 */
export function generateUrlQrc(formDate) {
    return request({
        url: "/commonApi/tygxQrcManagement/generateUrlQrc",
        method: "post",
        data: formDate
    })
}


/**
 * 获取微信appid
 */
export function getWechatApp() {
    return request({
        url: "/device/common/getWechatApp",
        method: "post",
    })
}


/**
 * 获取地图公共设施接口
 */
export function getPublicUtilitiesByMapCode(mapCode) {
    return request({
        url: "/navigation/tygxMapLogoShowPositionDefinition/getPublicUtilitiesByMapCode/" + mapCode,
        method: "get",
    })
}


/**
 * 新增导航截图接口
 */
export function saveScreenshot(formDate) {
    return request({
        url: "/navigation/tygxMapNavigation/saveScreenshot",
        method: "POST",
        data: formDate
    })
}












