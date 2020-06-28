/**
 * Created by 14752 on 2020-06-28.
 */
var login = new Vue({
    el:'#login-container',
    data:{
        type:'login',  //login, regist,
        name:'1'
    },
    methods:{
        to_signUp:function(){
            this.type='signUp'
        },
        to_login:function(){
            this.type='login'
        }
    }

})