/**
 * Created by 14752 on 2020-06-27.
 */
var login_status = new Vue({
    el:'#login_status',
    data:{
        id:'201830663124',
        name:'toddxxx'
    },
    methods:{

    }
})

function logout(){
    login_status.id=''
}


