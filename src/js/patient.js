import request from "@/utils/request";

//查询patient账户信息
export function page(data) {
    return request({
        url:'/saas/patient/page',
        method:'POST',
        data:data
    })
}

//修改帐号状态
export function status(data) {
    return request({
        url:'/saas/patient/status',
        method:'POST',
        data:data
    })
}

//逻辑删除patient账户
export function remove(data) {
    let id = data.id;
    return request({
        url: "/saas/patient/delete/" + id,
        method: 'GET',
    })
}

//新增patient账户
export function add(data) {
    return request({
        url: "/saas/patient/insert",
        method: 'POST',
        data:data
    })
}

//修改patient账户
export function edit(data) {
    return request({
        url: "/saas/patient/edit",
        method: 'POST',
        data:data
    })
}

//查询root总数
export function count() {
    return request({
        url:'/saas/patient/count',
        method:'GET',
    })
}

//注册患者账号
export function register(data) {
    return request({
        url:'/saas/patient/register',
        method:'POST',
        data:data,
    })
}
