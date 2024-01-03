import request from "@/utils/request";

//查询root账户信息
export function page(data) {
    return request({
        url:'/saas/root/page',
        method:'POST',
        data:data
    })
}

//修改帐号状态
export function status(data) {
    return request({
        url:'/saas/root/status',
        method:'POST',
        data:data
    })
}

//逻辑删除root账户
export function remove(data) {
    let id = data.id;
    return request({
        url: "/saas/root/delete/" + id,
        method: 'GET',
    })
}

//新增root账户
export function add(data) {
    return request({
        url: "/saas/root/insert",
        method: 'POST',
        data:data
    })
}

//修改root账户
export function edit(data) {
    return request({
        url: "/saas/root/edit",
        method: 'POST',
        data:data
    })
}

//查询root总数
export function count() {
    return request({
        url:'/saas/root/count',
        method:'GET',
    })
}
