/**
 * Created by 14752 on 2020-06-27.
 */

//cookie��name���ã�user_id, operation_code, nickname, keyWord

var login_status = new Vue({
    el:'#login_status',
    data:{
        //ÿ��ҳ�涼�ᴴ��һ���Լ���vueʵ�������������ÿ��ҳ�治һ��
        id:'',
        operation_code:'',
        name:''
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
        //�˳���¼
        logout:function(){
            this.id='';
            this.operation_code='';
            this.name='';
            this.setCookie("user_id",'');
            this.setCookie("operation_code",'');
            this.setCookie("nickname",'');
        }
    },
    created:function(){
        console.log('id'+this.getCookie("user_id"))
        //����ʵ��ʱ,ͨ��cookie��ȡid��name��code
        if(this.getCookie("user_id")!=null){//���ǵ�cookie�����ڵ������
            this.id=this.getCookie("user_id");
            this.operation_code=this.getCookie("operation_code");
            this.name=this.getCookie("nickname")
        }



    }
})



