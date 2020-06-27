/**
 * Created by 14752 on 2020-06-27.
 */
var index = new Vue({
    el:'#index',
    data:{
        classify:[
            {title:'二手教辅',itemList:[{id:0,title:'白夜行',area:'南校区',cover:'https://img1.doubanio.com/view/subject/l/public/s24514468.jpg',price:'12.9'}]},
            {title:'非教辅类书籍',itemList:[]},{title:'学习用具',itemList:[]},
            {title:'技能服务',itemList:[]},{title:'手机数码',itemList:[]},
            {title:'服饰/美妆',itemList:[]},{title:'零食/饮品/水果',itemList:[]},
            {title:'玩具/游戏交易',itemList:[]},{title:'其他',itemList:[]}],
        showing:0
    },
    methods:{
        change_classify:function(index){
            this.showing=index
        },
        to_detail:function(id){
            window.location.href="bookDetail.html?id="+id
        }
    }

})
