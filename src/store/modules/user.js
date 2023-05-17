export default{
    state:{
        loginStatus:false,  //登录状态
        token:null,  //token
        userInfo:{}
    },
    getters:{

    },
    actions:{

    },
    mutations:{
        USERLOGIN(state,user){
            state.loginStatus = true
            state.token=user.token
            state.userInfo = user
            localStorage.setItem('UserInfo',JSON.stringify(user))
        },
        INITUSER(state){
            let userInfo = JSON.parse(localStorage.getItem('UserInfo'))
            if(userInfo){
                state.loginStatus = true
                state.token = userInfo.token
                state.userInfo = userInfo
            }
        },
        LOGOUT(state){
            localStorage.removeItem('UserInfo')
            state.loginStatus = false
            state.token = null
            state.userInfo = {}
        }
    },
}