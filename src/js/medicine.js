import request from "@/utils/request";

//插入medicine信息
export function insert(data) {
    return request({
        url:'/saas/medicine/topic',
        method:'POST',
        data:data
    })
}

//分页条件查询
export function getPage(data) {
    return request({
        url:'/saas/medicine/page',
        method:'POST',
        data:data
    })
}

//查询药品数量
export function count() {
    return request({
        url:'/saas/medicine/count',
        method:'GET',
    })
}

//逻辑删除信息
export function deleteById(id) {
    return request({
        url:'/saas/medicine/' + id,
        method:'DELETE',
    })
}

//药品数量入库
export function getCount(data) {
    const id = data.id;
    const count = data.count;
    return request({
        url:`/saas/medicine/${id}/${count}`,
        method:'PATCH',
    })
}


//修改药品信息
export function update(data) {
    return request({
        url:`/saas/medicine/update`,
        method:'PATCH',
        data:data
    })
}


//查询药品详情
export function info(medicineId) {
    return request({
        url:`/saas/medicineInfo/${medicineId}`,
        method:'GET',
    })
}

//更新药品详情
export function updateInfo(data) {
    return request({
        url:`/saas/medicineInfo/update`,
        method:'PUT',
        data:data
    })
}

//模糊查询药品种类
export function getMedineList(data) {
    return request({
        url:`/saas/medicine/type`,
        method:'GET',
        params:data
    })
}

