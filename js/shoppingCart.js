/**
 * Created by 14752 on 2020-06-28.
 */

var shoppingCart = new Vue({
    el:'#container',
    data:{
        itemList:[]
    },
    methods:{
        to_detail:function(id){
            window.location.href="itemDetail.html?open_type=sell&id="+id
        },
        outCart:function(index){
            //移出购物车
            var self=this;
            axios.get(localStorage.serverUrl+'shop/deleteShopCartItem?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_id='+this.itemList[index].commodity_id)
                .then(function (response) {
                    console.log(response);
                    //删除该物品
                    self.itemList.splice(index,1)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    created:function(){
        if(login_status.id==''){
        }
        else{
            //发送用户id，获取购物车物品列表
            var self=this;
            axios.get(localStorage.serverUrl+'shop/getUsersShopCartItems?user_id='+login_status.id+'&user_login_code='+login_status.operation_code)
                .then(function (response) {
                    console.log(response);
                    self.itemList=response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

})