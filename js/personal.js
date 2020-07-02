/**
 * Created by 14752 on 2020-06-27.
 */

var personal = new Vue({
    el:'#personal',
    data:{
        //用户信息
        nickname:'未登录',
        contact:'',//联系方式
        area:'',//校区
        dormitory:'',//宿舍
        department:'',

        edit:false,//个人信息是否为编辑状态
        //下面的是编辑的，用于提交http
        e_nickname:'',
        e_contact:'',//联系方式
        e_area:'',//校区
        e_dormitory:'',//宿舍
        e_department:'',

        sellItem:true,  //出售、求物品, 选择出售物品为true，选择求物品为false

        sellList:[],
        askList:[],
        showingList:[]


    },
    methods:{
        to_edit_info:function(){
            this.edit=true
        },
        //提交修改的个人信息
        edit_submit:function(){
            var self=this
            let param = new URLSearchParams();
            param.append("user_id",login_status.id)
            param.append("user_login_code",login_status.operation_code)
            param.append("user_name",this.e_nickname)
            param.append("tel",this.e_contact)
            param.append("area",this.e_area)
            param.append("dormitory",this.e_dormitory)
            param.append("academy",this.e_department)
            axios.post(localStorage.serverUrl+'User/updateUserInfo',param  )
                .then(function (response) {
                    console.log(response);
                    self.nickname=self.e_nickname;
                    self.contact=self.e_contact;
                    self.area=self.e_area;
                    self.dormitory=self.e_dormitory;
                    self.department=self.e_department
                    login_status.name=self.nickname

                })
                .catch(function (error) {
                    console.log(error);
                });
                self.edit=false
        },
        //出售、请求物品的切换
        select_sell:function(){
            this.sellItem = true;
            this.showingList = this.sellList
        },
        select_ask:function(){
            this.sellItem = false;
            this.showingList = this.askList
        },

        //选中物品，用于删除
        select_item:function(index){

            if(this.sellItem){
                //为出售的物品
                this.sellList[index].select = !this.sellList[index].select;
                this.showingList[index].select = this.sellList[index].select
            }
            else{
                //为请求的物品
                this.askList[index].select = !this.askList[index].select;
                this.showingList[index].select = this.askList[index].select
            }

        },
        //完成交易，发送物品id
        deal_finished:function(index){
            var self=this;
            var itemID;
            if(this.sellItem){
                //出售的物品
                itemID=this.sellList[index].commodity_id;
                //发送用户id，物品id字符串，用空格隔开
                axios.get(localStorage.serverUrl+'?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_id='+itemID)
                    .then(function (response) {
                        console.log(response);
                        self.sellList[index].finished='Y';
                        self.showingList = self.sellList
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else{
                //请求的物品
                itemID=this.askList[index].commodity_id;
                //发送用户id，物品id字符串，用空格隔开
                axios.get(localStorage.serverUrl+'?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_id='+itemID)
                    .then(function (response) {
                        console.log(response);
                        self.askList[index].finished='Y';
                        self.showingList = self.askList
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        to_detail:function(id){
            if(this.sellItem){
                //出售的物品
                window.location.href="itemDetail.html?open_type=sell&id="+id
            }
            else{
                //请求的物品
                window.location.href="itemDetail.html?open_type=ask&id="+id
            }
        },

        //删除，创建个数组记录选择的物品id
        delete_item:function(){
            var self=this;
            var idList='';
            if(this.sellItem){
                //删除出售的物品，返回物品列表
                //发送用户id，物品id字符串，用空格隔开

                for(var i=0; i<this.sellList.length; i++){
                    if(this.sellList[i].select=true){
                        idList += this.sellList[i].commodity_id
                    }
                }
                axios.get(localStorage.serverUrl+'?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_idList='+idList)
                    .then(function (response) {
                        console.log(response);
                        //粘贴created的函数
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else{
                //删除请求的物品
                //发送用户id，物品id字符串，用空格隔开
                idList='';
                for(var j=0; j<this.sellList.length; j++){
                    if(this.sellList[j].select=true){
                        idList += this.sellList[j].commodity_id
                    }
                }
                axios.get(localStorage.serverUrl+'?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_idList='+idList)
                    .then(function (response) {
                        console.log(response);
                        //粘贴created的函数
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },

        //编辑功能还没写
        to_edit_item:function(id){
            alert('编辑')
            if(this.sellItem){
                //编辑出售的物品
            }
            else{
                //编辑请求的物品
            }
        }



    },
    created:function(){
        if(login_status.id==''){
            alert('当前未登录！')
        }
        else{
            //获取用户信息
            var userInfoStr=localStorage.userInfo
            if(userInfoStr){
                var userInfo = JSON.parse(userInfoStr)
                this.nickname=userInfo.user_name
                this.contact=userInfo.tel//联系方式
                this.area=userInfo.area//校区
                this.dormitory=userInfo.dormitory//宿舍
                this.department=userInfo.academy
            }
            //用户创建的出售物品列表,select统一设为false
            var self=this;
            axios.get(localStorage.serverUrl+'?user_id='+login_status.id+'&user_login_code='+login_status.operation_code)
                .then(function (response) {
                    console.log(response);
                    self.sellList=response.data;
                    self.sellList['select']=false;
                    self.showingList = self.sellList
                })
                .catch(function (error) {
                    console.log(error);
                });
            //用户创建的请求物品列表,select统一设为false
            axios.get(localStorage.serverUrl+'?user_id='+login_status.id+'&user_login_code='+login_status.operation_code)
                .then(function (response) {
                    console.log(response);
                    self.askList=response.data;
                    self.askList['select']=false;
                    self.showingList = self.askList
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
})
