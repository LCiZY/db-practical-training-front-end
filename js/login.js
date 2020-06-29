/**
 * Created by 14752 on 2020-06-28.
 */
var login = new Vue({
    el:'#login-container',
    data:{
        type:'login',  //login, signUp,
        userID:null,
        password:null,
        password2:null


    },
    methods:{
        to_signUp:function(){
            this.type='signUp'
        },
        to_login:function(){
            this.type='login'
        },
        //登录，发送账号密码，返回操作用的code
        login:function(){
            axios.post('server/test.php', {
                userID:this.userID,
                password:this.password
            })
                .then(function (response) {
                    console.log(response);
                    //下面设置用户登录态
                    login_status.id=self.userID;
                    //login_status.operation_code=response.data.
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //注册，发送账号密码昵称，要判定是否账号已存在
        signUp:function(){
            if(this.password==this.password2){
                axios.post('server/test.php', {
                    userId:this.userID,
                    password:this.password,
                    nickname:'新用户'+this.userID
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