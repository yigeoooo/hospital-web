import request from "@/utils/request";

//查询doctor账户信息
export function page(data) {
    return request({
        url:'/saas/doctor/page',
        method:'POST',
        data:data
    })
}

//修改帐号状态
export function status(data) {
    return request({
        url:'/saas/doctor/status',
        method:'POST',
        data:data
    })
}

//逻辑删除doctor账户
export function remove(data) {
    let id = data.id;
    return request({
        url: "/saas/doctor/delete/" + id,
        method: 'GET',
    })
}

//新增doctor账户
export function add(data) {
    return request({
        url: "/saas/doctor/insert",
        method: 'POST',
        data:data
    })
}

//修改doctor账户
export function edit(data) {
    return request({
        url: "/saas/doctor/edit",
        method: 'POST',
        data:data
    })
}


//查询root总数
export function count() {
    return request({
        url:'/saas/doctor/count',
        method:'GET',
    })
}
