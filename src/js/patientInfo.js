import request from "@/utils/request";

//分页条件查询医生信息
export function page(data) {
    return request({
        url:'/saas/patientInfo/page',
        method:'POST',
        data:data
    })
}

//新增医生信息
export function insert(data) {
    return request({
        url:'/saas/patientInfo/insert',
        method:'POST',
        data:data
    })
}

//逻辑删除医生信息
export function remove(id) {
    return request({
        url:'/saas/patientInfo/delete/' + id,
        method:'GET',
    })
}

//修改医生信息
export function edit(data) {
    return request({
        url:'/saas/patientInfo/edit/',
        method:'POST',
        data:data
    })
}

//查询root总数
export function count() {
    return request({
        url:'/saas/patientInfo/count',
        method:'GET',
    })
}
