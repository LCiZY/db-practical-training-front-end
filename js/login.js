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
        //��¼�������˺����룬���ز����õ�code
        login:function(){
            axios.post('server/test.php', {
                userID:this.userID,
                password:this.password
            })
                .then(function (response) {
                    console.log(response);
                    //���������û���¼̬
                    login_status.id=self.userID;
                    //login_status.operation_code=response.data.
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //ע�ᣬ�����˺������ǳƣ�Ҫ�ж��Ƿ��˺��Ѵ���
        signUp:function(){
            if(this.password==this.password2){
                axios.post('server/test.php', {
                    userId:this.userID,
                    password:this.password,
                    nickname:'���û�'+this.userID
                })
                    .then(function (response) {
                        console.log(response);
                        //�ص���¼ҳ
                        window.location.href="login.html";
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else{
                alert('�����������벻һ�£�')
            }

        }
    }

})