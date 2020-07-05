/**
 * Created by 14752 on 2020-06-28.
 */

var itemDetail = new Vue({
    el:'#itemDetail',
    data:{
        open_type:'sell',
        item_id:null,


        //创建者信息
        nickname:'骆小胖',
        contact:213432,
        area:'南校区',
        dormitory:'C10',
        department:'软件学院',

        //物品信息
        title:'二手书《目送》',
        cover:'img/item-detail/1.jpg',
        item_type:'非教辅类书籍',
        now_price:13.00,
        old_price:39.00,
        description:'有点水印,但并不影响阅读',
        other_pic:['img/item-detail/1.jpg','img/item-detail/1.jpg','img/item-detail/1.jpg'],
        cart_status:'加入购物车'

    },
    methods:{
        //获取页面传值
        getParams:function(key){
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },

        addCart:function(){
            //加入购物车
            if(login_status.id==null||login_status.id==''){
                alert('请先登录')
            }
            else{
                //发送用户id和code，物品id，加入/移出购物车
                var self=this;
                if(this.cart_status=='加入购物车'){
                    console.log('login_status.id:'+login_status.id)
                    //加入购物车
                    axios.get(localStorage.serverUrl+'shop/addShopCartItem?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_id='+this.item_id)
                        .then(function (response) {
                            console.log(response);
                            self.cart_status='移出购物车'
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }
                else{
                    //移出购物车
                    axios.get(localStorage.serverUrl+'shop/deleteShopCartItem?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_id='+this.item_id)
                        .then(function (response) {
                            console.log(response);
                            self.cart_status='加入购物车'
                        })
                        .catch(function (error) {
                            console.log(error);
                        });



                }

            }
        }
    },

    created:function(){
        this.item_id = this.getParams("id");
        console.log(this.item_id);
        this.open_type = this.getParams("open_type");
        console.log(this.open_type);
        var self=this;
        //发送类型：请求物品ask/出售物品sell，和物品id，获取创建者信息和物品信息。请求物品没有价格信息
        if(this.open_type=='sell'){
            //出售物品

            axios.get(localStorage.serverUrl+'commodity/getCommodityById?commodity_id='+self.item_id)
                .then(function (response) {
                    console.log(response);
                    //创建者信息
                    self.nickname=response.data.user_name;
                    self.contact=response.data.tel;
                    self.area=response.data.user_area;
                    self.dormitory=response.data.dormitory;
                    self.department=response.data.academy;
                    //物品信息
                    self.title=response.data.commodity_name;
                    self.cover=response.data.commodity_cover_pic_url;
                    self.item_type=response.data.commodity_type;
                    self.now_price=response.data.commodity_price;
                    self.old_price=response.data.commodity_original_price;
                    self.description=response.data.commodity_description;
                    self.other_pic=response.data.image_url;
                    self.cart_status='加入购物车'


                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else{
            //求物品

            axios.get(localStorage.serverUrl+'commodity/getRequiredCommodityById?commodity_id='+self.item_id)
                .then(function (response) {
                    console.log(response);
                    //创建者信息
                    self.nickname=response.data.user_name;
                    self.contact=response.data.tel;
                    self.area=response.data.user_area;
                    self.dormitory=response.data.dormitory;
                    self.department=response.data.academy;
                    //物品信息
                    self.title=response.data.commodity_name;
                    self.cover=response.data.commodity_cover_pic_url;
                    self.item_type=response.data.commodity_type;
                    //self.now_price=response.data.commodity_price;
                    //self.old_price=response.data.commodity_original_price;
                    self.description=response.data.commodity_description;
                    self.other_pic=response.data.image_url;
                    //self.cart_status='加入购物车'


                })
                .catch(function (error) {
                    console.log(error);
                });
        }



    }


})