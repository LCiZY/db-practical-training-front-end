/**
 * Created by 14752 on 2020-06-27.
 */
var login_status = new Vue({
    el:'#login_status',
    data:{
        id:'201830663124',
        operation_code:'',
        name:'toddxxx'
    },
    methods:{
        logout:function(){
            this.id='';
            this.operate_code=''
        }
    }
})


