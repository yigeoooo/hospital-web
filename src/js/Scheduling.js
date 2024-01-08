import request from "@/utils/request";

//新建排版信息
export function insertInfo(data) {
    return request({
        url:'/saas/scheduling/topic',
        method:'POST',
        data:data
    })
}


//分页查询排班信息
export function pages(data) {
    return request({
        url:'/saas/scheduling/page',
        method:'POST',
        data:data
    })
}

//分页查询排班信息
export function getPages(data) {
    return request({
        url:'/saas/scheduling/getPage',
        method:'POST',
        data:data
    })
}


//逻辑删除排班信息
export function remove(id) {
    return request({
        url:`/saas/scheduling/${id}`,
        method:'DELETE',
    })
}

//修改排班信息
export function edit(data) {
    return request({
        url:'/saas/scheduling/edit',
        method:'PATCH',
        data:data
    })
}
