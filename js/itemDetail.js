/**
 * Created by 14752 on 2020-06-28.
 */
var itemDetail = new Vue({
    el:'#itemDetail',
    data:{
        open_type:'sell',
        item_id:0,


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
        other_pic:['img/item-detail/1.jpg','img/item-detail/1.jpg','img/item-detail/1.jpg']

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
        }
    },
    created:function(){
        this.item_id = this.getParams("id");
        console.log(this.item_id);
        this.open_type = this.getParams("open_type");
        console.log(this.open_type);



    }


})