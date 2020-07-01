/**
 * Created by 14752 on 2020-06-28.
 */

//cookie的name设置：user_id, operation_code, nickname, keyWord
var login = new Vue({
    el:'#login-container',
    data:{
        type:'login',  //login, signUp,
        userID:null,
        password:null,
        password2:null


    },
    methods:{
        //设置cookie的函数
        setCookie:function(cname,cvalue){
            document.cookie = cname + "=" + cvalue;
        },
        //获取cookie函数
        getCookie:function(cname){
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++)
            {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
            return "";
        },
        to_signUp:function(){
            this.type='signUp'
        },
        to_login:function(){
            this.type='login'
        },

        //登录，发送账号密码，返回操作用的code，和用户nickname
        login:function(){
            let param = new URLSearchParams();
            param.append("user_id",this.userID)
            param.append("user_password",this.password)
            let self=this
            axios.post(localStorage.serverUrl+'User/login', param)
                .then(function (response) {
                    console.log('res:')
                    console.log(response);
                    //下面设置用户登录态
                    localStorage.setItem('user_id',response.data.map.user_id);
                    localStorage.setItem('operation_code',response.data.opcode);
                    localStorage.setItem('nickname',response.data.map.user_name);
                    window.location.href="index.html";
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //注册，发送账号密码昵称，要判定是否账号已存在
        signUp:function(){
            if(this.password==this.password2){
                let param = new URLSearchParams();
                param.append("user_id",this.userID)
                param.append("user_password",this.password)
                param.append("user_name",'新用户'+this.userID)
                axios.post(localStorage.serverUrl+'User/addUser',param)
                    .then(function (response) {
                        if(response.data=='-1') {}     //用户已存在，注册失败
                        else if(response.data=='0'){}  //注册失败
                        else if(response.data=='1')//注册成功
                        //回到登录页
                        window.location.href="login.html";
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else{
                alert('两次输入密码不一致！')
            }

        }
    }

})