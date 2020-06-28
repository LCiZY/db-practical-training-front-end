/**
 * Created by 14752 on 2020-06-28.
 */
var allItems = new Vue({
    el:'#allItems',
    data:{
        classify:['全部', '二手教辅', '非教辅类书籍','学习用具', '技能服务','手机数码',
            '服饰/美妆','零食/饮品/水果', '玩具/游戏交易','其他'],

        itemList:[{id:0,title:'白夜行',area:'南校区',type:'非教辅类书籍',
            cover:'https://img1.doubanio.com/view/subject/l/public/s24514468.jpg',price:'12.9'}]
    },
    methods:{
        change_classify:function(index){
            //index是classify的下标，发送请求，获取itemList信息
        },
        to_detail:function(id){
            window.location.href="itemDetail.html?id="+id
        }
    },
    created:function(){
      //下标为0发送请求
    }

})