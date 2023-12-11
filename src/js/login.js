import request from "@/utils/request";
//登陆操作
export function userLogin(data) {
    return request({
        url:'/saas/login',
        method:'POST',
        data:data
    })
}
