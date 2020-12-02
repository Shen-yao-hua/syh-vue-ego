import axios from '../utils/request'
import base from './base'


const api = {
    // 登录接口
    getLogin(params) {
        return axios.post(base.baseUrl + base.login, params)
    },

    // 注册接口
    getRegister(params) {
        return axios.post(base.baseUrl + base.register, params)
    },

    // 商品查询接口
    getselectTbItemAllByPage(params) {
        return axios.get(base.baseUrl + base.selectTbItemAllByPage, { params })
    },

    // 商品总条数
    getTotal() {
        return axios.get(base.baseUrl + base.total)
    },

    // 增加商品
    // getAdd(){
    //     return axios.get(base.baseUrl + base.)
    // },

    // 商品模糊查询
    getSearch(params) {
        return axios.get(base.baseUrl + base.search, { params })
    },


    // 商品类目选择
    selectItemCategoryByParentId(params) {
        return axios.get(base.baseUrl + base.selectItemCategoryByParentId, { params })
    },

    // 增加产品
    insertTbItem(params) {
        return axios.get(base.baseUrl + base.insertTbItem, { params })
    },

    // 删除产品
    deleteItemById(params) {
        return axios.get(base.baseUrl + base.deleteItemById, { params })
    },

    // 预更新：点击编辑取到这条数据
    preUpdateItem(params) {
        return axios.get(base.baseUrl + base.preUpdateItem, { params })
    },

    // 修改商品
    updateTbItem(params) {
        return axios.get(base.baseUrl + base.updateTbItem, { params })
    },

    // 获取单一商品类目
    preCategory(params) {
        return axios.get(base.baseUrl + base.preCategory, { params })
    },

    // 获取规格参数数据
    selectItemParamAll(params) {
        return axios.get(base.baseUrl + base.selectItemParamAll, { params })
    },

    // 规格参数页面模糊查询
    paramsSearch(params) {
        return axios.get(base.baseUrl + base.paramsSearch, { params })
    },

    // 规格参数删除
    paramsDelete(params) {
        return axios.get(base.baseUrl + base.paramsDelete, { params })
    },


    // 规格参数总页数
    paramsTotal() {
        return axios.get(base.baseUrl + base.paramsTotal)
    },

    // 规格参数添加
    insertItemParam(params) {
        return axios.get(base.baseUrl + base.insertItemParam, { params })
    },

    //  获取规格参数数据添加到产品
    paramsItem(params) {
        return axios.get(base.baseUrl + base.paramsItem, { params })
    },


    // 内容分类管理 导航查询
    selectContentCategoryByParentId(params) {
        return axios.get(base.baseUrl + base.selectContentCategoryByParentId, { params })
    },
    // 内容分类管理 增加子导航
    insertContentCategory(params) {
        return axios.get(base.baseUrl + base.insertContentCategory, { params })
    },
    // 内容分类管理 修改子导航
    updateContentCategory(params) {
        return axios.get(base.baseUrl + base.updateContentCategory, { params })
    },
    // 内容分类管理 删除子导航
    deleteContentCategoryById(params) {
        return axios.get(base.baseUrl + base.deleteContentCategoryById, { params })
    },
    // 内容分类管理 内容增加
    insertTbContent(params) {
        return axios.get(base.baseUrl + base.insertTbContent, { params })
    },
    // 内容分类管理 内容删除
    deleteContentByIds(params) {
        return axios.get(base.baseUrl + base.deleteContentByIds, { params })
    },
    // 内容分类管理 内容查询
    selectTbContentAllByCategoryId(params) {
        return axios.get(base.baseUrl + base.selectTbContentAllByCategoryId, { params })
    },




}

export default api