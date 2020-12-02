export default {
    namespaced: true,
    state: {
        user: {
            username: '',
            token: ''
        }
    },
    mutations: {
        // 登录存储
        setUser(state, user) {
            state.user = {
                username: user.username,
                token: user.token
            }
        },

        // 退出清空
        logout(state) {
            state.user = {
                username: '',
                token: ''
            }
        }
    }
}