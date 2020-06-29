/**
 * Created by 14752 on 2020-06-28.
 */
var shoppingCart = new Vue({
    el:'#container',
    data:{
        itemList:[{id:0,title:'白夜行',area:'南校区',type:'非教辅类书籍',
            cover:'https://img1.doubanio.com/view/subject/l/public/s24514468.jpg',price:'12.9'}]
    },
    methods:{
        to_detail:function(id){
            window.location.href="itemDetail.html?open_type=sell&id="+id
        },
        outCart:function(){
            //移出购物车,返回最新的购物车物品列表，页面重新渲染
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code,
                    item_id:this.item_id
                }
            })
                .then(function (response) {
                    console.log(response);
                    //this.itemList=
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    created:function(){
        if(login_status.id==''){
            alert('当前未登录')
        }
        else{
            //发送用户id，获取购物车物品列表
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code,
                }
            })
                .then(function (response) {
                    console.log(response);
                    //this.itemList=
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

})