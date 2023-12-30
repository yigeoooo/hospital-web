import request from "@/utils/request";
//登陆操作
export function userLogin(data) {
    return request({
        url:'/saas/root/login',
        method:'POST',
        data:data
    })
}
//医生登录
export function doctorLogin(data) {
    return request({
        url:'/saas/doctor/login',
        method:'POST',
        data:data
    })
}

//患者登录
export function patientLogin(data) {
    return request({
        url:'/saas/patient/login',
        method:'POST',
        data:data
    })
}
