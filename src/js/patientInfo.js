import request from "@/utils/request";

//分页条件查询患者信息
export function page(data) {
    return request({
        url:'/saas/patientInfo/page',
        method:'POST',
        data:data
    })
}

//新增患者信息
export function insert(data) {
    return request({
        url:'/saas/patientInfo/insert',
        method:'POST',
        data:data
    })
}

//逻辑删除患者信息
export function remove(id) {
    return request({
        url:'/saas/patientInfo/delete/' + id,
        method:'GET',
    })
}

//逻辑删除患者信息
export function info(patientId) {
    return request({
        url:'/saas/patientInfo/info/' + patientId,
        method:'GET',
    })
}

//修改患者信息
export function edit(data) {
    return request({
        url:'/saas/patientInfo/edit/',
        method:'POST',
        data:data
    })
}

//查询患者总数
export function count() {
    return request({
        url:'/saas/patientInfo/count',
        method:'GET',
    })
}
