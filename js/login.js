/**
 * Created by 14752 on 2020-06-28.
 */

const serverUrl='http://localhost:8080/'

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
            //以下为测试代码。放到登录成功的.then里
            var temp_name='骆小胖';
            this.setCookie("user_id",this.userID);
            this.setCookie("operation_code",this.operation_code);
            this.setCookie("nickname",temp_name);

            axios.post('server/test.php', {
                userID:this.userID,
                password:this.password
            })
                .then(function (response) {
                    console.log(response);
                    //下面设置用户登录态
                    //this.setCookie("user_id",this.userID);
                    //this.setCookie("operation_code",response.data.);
                    //this.setCookie("nickname",response.data.);

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //注册，发送账号密码昵称，要判定是否账号已存在
        signUp:function(){
            if(this.password==this.password2){
                axios.post(serverUrl+'User/addUser', {
                    user_id:this.userID,
                    user_password:this.password,
                    user_name:'新用户'+this.userID
                })
                    .then(function (response) {
                        console.log(response);
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