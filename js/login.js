/**
 * Created by 14752 on 2020-06-28.
 */

const serverUrl='http://localhost:8080/'

//cookie��name���ã�user_id, operation_code, nickname, keyWord
var login = new Vue({
    el:'#login-container',
    data:{
        type:'login',  //login, signUp,
        userID:null,
        password:null,
        password2:null


    },
    methods:{
        //����cookie�ĺ���
        setCookie:function(cname,cvalue){
            document.cookie = cname + "=" + cvalue;
        },
        //��ȡcookie����
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

        //��¼�������˺����룬���ز����õ�code�����û�nickname
        login:function(){
            //����Ϊ���Դ��롣�ŵ���¼�ɹ���.then��
            var temp_name='��С��';
            this.setCookie("user_id",this.userID);
            this.setCookie("operation_code",this.operation_code);
            this.setCookie("nickname",temp_name);

            axios.post('server/test.php', {
                userID:this.userID,
                password:this.password
            })
                .then(function (response) {
                    console.log(response);
                    //���������û���¼̬
                    //this.setCookie("user_id",this.userID);
                    //this.setCookie("operation_code",response.data.);
                    //this.setCookie("nickname",response.data.);

                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        //ע�ᣬ�����˺������ǳƣ�Ҫ�ж��Ƿ��˺��Ѵ���
        signUp:function(){
            if(this.password==this.password2){
                axios.post(serverUrl+'User/addUser', {
                    user_id:this.userID,
                    user_password:this.password,
                    user_name:'���û�'+this.userID
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