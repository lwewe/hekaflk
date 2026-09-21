import request from "../utils/request";

/**
 * 城市列表
 */
export function getCityList(data) {
    return request.post("", data, { login: false });
}
//区县
export function getCountyList(data) {
    return request.post("", data, { login: false });
}
export function getDramaList(data) {
    return request.post("", data, { login: false });
}
