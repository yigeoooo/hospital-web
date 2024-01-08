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
