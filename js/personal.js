/**
 * Created by 14752 on 2020-06-27.
 */
var personal = new Vue({
    el:'#personal',
    data:{
        //用户信息
        nickname:'骆小胖',
        contact:'123',//联系方式
        area:'南校区',//校区
        dormitory:'C10',//宿舍
        department:'软件学院',

        edit:false,//个人信息是否为编辑状态
        //下面的是编辑的，用于提交http
        e_nickname:'',
        e_contact:'',//联系方式
        e_area:'',//校区
        e_dormitory:'',//宿舍
        e_department:'',

        sellItem:true,  //出售、求物品, 选择出售物品为true，选择求物品为false

        sellList:[{title:'白夜行',id:123,finished:'N',select:false,old_price:52.0,now_price:13.0,type:'非教辅类书籍',cover:'img/item-list/article/1.jpg'}],
        askList:[],
        showingList:[]


    },
    methods:{
        to_edit_info:function(){
            this.edit=true
        },
        //提交修改的个人信息
        edit_submit:function(){
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code,

                    nickname:this.e_nickname,
                    contact:this.e_contact,
                    area:this.e_area,
                    dormitory:this.e_dormitory,
                    department:this.e_department
                }
            })
                .then(function (response) {
                    console.log(response);
                    this.nickname=this.e_nickname;
                    this.contact=this.e_contact;
                    this.area=this.e_area;
                    this.dormitory=this.e_dormitory;
                    this.department=this.e_department

                })
                .catch(function (error) {
                    console.log(error);
                });
            this.edit=false
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
            var type;
            var itemID;
            if(this.sellItem){
                //出售的物品
                itemID=this.sellList[index].id;
                //发送用户id，物品id字符串，用空格隔开
                axios.get('server/test.php', {
                    params: {
                        user_id:login_status.id,
                        operation_code:login_status.operation_code,
                        itemID:itemID
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        this.sellList[index].finished='Y';
                        this.showingList = this.sellList
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else{
                //请求的物品
                itemID=this.askList[index].id;
            }
        },

        //删除，创建个数组记录选择的物品id
        delete_item:function(){
            var type;
            if(this.sellItem){
                //删除出售的物品，返回物品列表
                //发送用户id，物品id字符串，用空格隔开
                var idList='';
                for(var i=0; i<this.sellList.length; i++){
                    if(this.sellList[i].select=true){
                        idList += this.sellList[i].id
                    }
                }
                axios.get('server/test.php', {
                    params: {
                        user_id:login_status.id,
                        operation_code:login_status.operation_code,
                        idList:idList
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        //this.sellList=response.data.
                        //this.showingList = this.sellList
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else{
                //删除请求的物品
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
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code
                }
            })
                .then(function (response) {
                    console.log(response);
                    //this.nickname=response.data.
                    //this.contact=response.data.
                    //this.area=response.data.
                    //this.dormitory=response.data.
                    //this.department=response.data.

                })
                .catch(function (error) {
                    console.log(error);
                });
            //用户创建的出售物品列表,select统一设为false
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code
                }
            })
                .then(function (response) {
                    console.log(response);
                    //this.sellList=response.data.
                    this.showingList = this.sellList
                })
                .catch(function (error) {
                    console.log(error);
                });
            //用户创建的请求物品列表,select统一设为false
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code
                }
            })
                .then(function (response) {
                    console.log(response);
                    //this.askList=response.data.
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
})
