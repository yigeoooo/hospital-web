import request from "@/utils/request";


//新增挂号信息
export function insert(data) {
    return request({
        url:'/saas/registerOrder/insert',
        method:'POST',
        data:data
    })
}

//分页条件查询挂号信息
export function page(data) {
    return request({
        url:'/saas/registerOrder/page',
        method:'POST',
        data:data
    })
}

//分页条件查询挂号信息
export function pages(data) {
    return request({
        url:'/saas/registerOrder/pages',
        method:'POST',
        data:data
    })
}

//退号
export function reset(data) {
    return request({
        url:'/saas/registerOrder/reset',
        method:'POST',
        data:data
    })
}

//新增病例
export function writeAdvice(data) {
    return request({
        url:'/saas/advice/insert',
        method:'POST',
        data:data
    })
}

//病例详情
export function getInfo(id) {
    return request({
        url:`/saas/registerOrder/info/${id}`,
        method:'GET',
    })
}
