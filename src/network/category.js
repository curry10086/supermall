import { request } from "./request";

//获取分类页面左侧导航分类列表数据
export function getCategory() {
    return request({
        url: '/api/hy66/category'
    })
}
//获取右侧上方商品分类数据
export function getSubCategory(maitKey) {
    return request({
        url: '/api/hy66/subcategory',
        params: {
            maitKey
        }
    })
}
//获取右侧下方推荐商品数据
export function getSubDetail(miniWallkey) {
    return request({
        url: '/api/hy66/subcategory/detail',
        params: {
            miniWallkey
        }
    })
}

