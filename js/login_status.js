/**
 * Created by 14752 on 2020-06-27.
 */

//cookie的name设置：user_id, operation_code, nickname, keyWord

var login_status = new Vue({
    el:'#login_status',
    data:{
        //每个页面都会创建一个自己的vue实例，下面的数据每个页面不一样
        id:'',
        operation_code:'',
        name:''
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
        //退出登录
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
        //创建实例时,通过cookie获取id，name，code
        if(this.getCookie("user_id")!=null){//考虑当cookie不存在的情况？
            this.id=this.getCookie("user_id");
            this.operation_code=this.getCookie("operation_code");
            this.name=this.getCookie("nickname")
        }



    }
})



