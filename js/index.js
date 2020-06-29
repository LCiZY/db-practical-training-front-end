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
            //发送分类类型，获取物品List，信息见上面数据：id,title,area,cover封面图,price是现价。
            // 获取少部分物品展示，点击“更多”跳转全部物品页才获取全部物品
            axios.get('server/test.php', {
                params: {
                    item_type:this.classify[index].title
                }
            })
                .then(function (response) {
                    console.log(response);
                    //this.classify[index].itemList=response.data.
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //点击更多，跳转全部物品页
        getMore:function(index){
            var newIndex=index+1
            window.location.href="allItems.html?index="+newIndex
        },
        to_detail:function(id){
            window.location.href="itemDetail.html?open_type=sell&id="+id
        }
    },
    created:function(){
        //初始化，获取二手教辅分类的itemList
        axios.get('server/test.php', {
            params: {
                item_type:'二手教辅'
            }
        })
            .then(function (response) {
                console.log(response);
                //this.classify[0].itemList=
            })
            .catch(function (error) {
                console.log(error);
            });
    }

})
