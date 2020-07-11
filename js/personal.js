/**
 * Created by 14752 on 2020-06-27.
 */

var personal = new Vue({
    el:'#personal',
    data:{
        //用户信息
        nickname:'未登录',
        contact:'',//联系方式
        user_area:'',//校区
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
        showingList:[],

        delete_modal:false,//删除模态框
        deal_modal:false,//完成交易模态框
        deal_item_index:null

    },
    methods:{
        to_edit_info:function(){
            this.edit=true;
            this.e_nickname=this.nickname;
            this.e_contact=this.contact;
            this.e_area=this.user_area;
            this.e_dormitory=this.dormitory;
            this.e_department=this.department;

        },
        return_to_info:function(){
            this.edit=false;
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
                    self.user_area=self.e_area;
                    self.dormitory=self.e_dormitory;
                    self.department=self.e_department

                    login_status.name=self.nickname
                    var userInfo={}
                    userInfo['user_name']=self.nickname
                    userInfo['tel']=self.contact//联系方式
                    userInfo['user_area']= self.user_area//校区
                    userInfo['dormitory']=self.dormitory//宿舍
                    userInfo['academy']= self.department
                    localStorage.setItem('nickname',userInfo.user_name);
                    localStorage.setItem('userInfo',JSON.stringify(userInfo));

                })
                .catch(function (error) {
                    console.log(error);
                });
                self.edit=false
        },
        //出售、请求物品的切换
        select_sell:function(){
            console.log('click')
            localStorage.setItem('sellItem','1');
            this.sellItem = true;
            this.showingList = this.sellList
        },
        select_ask:function(){
            localStorage.setItem('sellItem','0');
            this.sellItem = false;
            this.showingList = this.askList
        },

        //选中物品，用于删除
        select_item:function(index){

            if(this.sellItem){
                //为出售的物品
                this.sellList[index].select = !this.sellList[index].select;
                this.showingList[index].select = this.sellList[index].select

                this.$set(this.showingList, index,  this.showingList[index])
                
            }
            else{
                //为请求的物品
                this.askList[index].select = !this.askList[index].select;
                this.showingList[index].select = this.askList[index].select
                this.$set(this.showingList, index,  this.showingList[index])
            }

        },
        deal_modal_show:function(index){
            this.deal_item_index=index;
            this.deal_modal=true
        },
        deal_modal_cancel:function(){
            this.deal_item_index=null;
            this.deal_modal=false
        },
        //完成交易，发送物品id
        deal_finished:function(){
            var self=this;
            var itemID;
            var index=this.deal_item_index;
            if(this.sellItem){
                //出售的物品
                itemID=this.sellList[index].commodity_id;
                //发送用户id，物品id
                axios.get(localStorage.serverUrl+'commodity/transactionDone?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_id='+itemID)
                    .then(function (response) {
                        var tempItem=self.sellList[index];
                        tempItem.finished='Y';
                        self.sellList.splice(index,1);//删除下标index那个
                        self.sellList.push(tempItem);
                        self.showingList = self.sellList
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    
            }
            else{
                // //请求的物品，没有此功能

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

        //删除
        delete_item:function(){
            var indexArray = []
            var self=this;
            if(this.sellItem){
                //删除出售的物品，返回物品列表
                
                for(var i=0; i<this.sellList.length; i++){
                    if(this.sellList[i].select){
                        indexArray.push(i)
                        axios.get(localStorage.serverUrl+'commodity/deleteUsersCommodity?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_id='+this.sellList[i].commodity_id)
                        .then(function (response) {
                         
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                        
                        
                    }
                }
               for(i = indexArray.length-1;i>=0;i--) this.sellList.splice(indexArray[i],1)
               this.showingList = this.sellList
            }
            else{
                //删除请求的物品
                for(var i=0; i<this.askList.length; i++){
                    if(this.askList[i].select){
                        indexArray.push(i)
                        axios.get(localStorage.serverUrl+'commodity/deleteUsersRequiredCommodity?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_id='+this.askList[i].commodity_id)
                        .then(function (response) {
                            
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                      
                    }
                }
                for(i = indexArray.length-1;i>=0;i--) this.askList.splice(indexArray[i],1)
                this.showingList = this.askList
               
            }
        },

        //编辑功能还没写
        to_edit_item:function(id){
            alert('编辑功能尚未开发')
            if(this.sellItem){
                //编辑出售的物品
            }
            else{
                //编辑请求的物品
            }
        },
        delete_modal_show:function(){
            this.delete_modal=true
        },
        delete_modal_cancel:function(){
            this.delete_modal=false
        }



    },
    created:function(){
       

    },
    mounted:function(){ 
        if(localStorage.getItem('sellItem')=='0')
           this.sellItem=false

        if(login_status.id==''){
           
        }
        else{
            //获取用户信息
            var userInfoStr=localStorage.userInfo
            if(userInfoStr){
                var userInfo = JSON.parse(userInfoStr)
                this.nickname=userInfo.user_name
                this.contact=userInfo.tel//联系方式
                this.user_area=userInfo.user_area//校区
                this.dormitory=userInfo.dormitory//宿舍
                this.department=userInfo.academy
            }
            //用户创建的出售物品列表,select统一设为false
            var self=this;
            axios.get(localStorage.serverUrl+'User/getUsersCommodities?user_id='+login_status.id+'&user_login_code='+login_status.operation_code)
                .then(function (response) {
                    console.log(response);
                    self.sellList=response.data;
                    for(i=0;i<self.sellList.length;i++){
                        self.sellList[i]['select']=false;
                        self.sellList[i]['finished']='N';
                    }
                    self.showingList = self.sellList

                })
                .catch(function (error) {
                    console.log(error);
                });

            //用户创建的已完成的出售物品列表,select统一设为false，用push放到sellList列表后面去
            axios.get(localStorage.serverUrl+'?user_id='+login_status.id+'&user_login_code='+login_status.operation_code)
                .then(function (response) {
                    console.log(response);
                    var tempList=response.data;
                    for(i=0;i<tempList.length;i++){
                        tempList[i]['select']=false;
                        tempList[i]['finished']='Y';
                        self.sellList.push(tempList[i]);
                    }
                    self.showingList = self.sellList

                })
                .catch(function (error) {
                    console.log(error);
                });

           
            //用户创建的请求物品列表,select统一设为false
            axios.get(localStorage.serverUrl+'User/getUsersRequiredCommodities?user_id='+login_status.id+'&user_login_code='+login_status.operation_code)
                .then(function (response) {
                    console.log(response);
                    self.askList=response.data;
                    for(i=0;i<self.askList.length;i++){
                        self.askList[i]['select']=false;
                        self.askList[i]['finished']='N';
                    }
                    self.showingList = self.askList
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        
        setTimeout(' document.getElementById("sell-btn").click()',500)
       
    },
})
