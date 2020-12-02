import i18n from '../plugins/i18n'
import store from '../store/index'
import jwt from 'jwt-decode'

export function initProject() {
    // 刷新设置语言环境
    if (localStorage.getItem('lang')) {
        i18n.locale = localStorage.getItem('lang')
    }




    if (localStorage.getItem('ego')) {
        // 存在存储就让存储存在仓库
        store.commit('loginModule/setUser', {
            username: jwt(localStorage.getItem('ego')).username,
            token: localStorage.getItem('ego')
        })
    }
}

