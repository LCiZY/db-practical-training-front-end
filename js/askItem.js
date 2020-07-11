/**
 * Created by 14752 on 2020-06-28.
 */

var askItem = new Vue({
    el:'#askItem',
    data:{
        classify:['全部', '二手教辅', '非教辅类书籍','学习用具', '技能服务','手机数码',
            '服饰/美妆','未开封食品', '游戏交易','其他'],
        //itemList:[{id:0,title:'白夜行',area:'南校区',type:'非教辅类书籍',
        //    cover:'https://img1.doubanio.com/view/subject/l/public/s24514468.jpg',price:'12.9'}]
        itemList:[],
        count:0,
        alreadyGot:0,
        noMore:false,
        chooseIndex:-1
    },
    methods:{
        getMore:function(){
            var self=this
            axios.get(localStorage.serverUrl+'commodity/getMoreRequiredCommodities?count='+this.count+'&alreadyGot='+this.alreadyGot)  
            .then(function (response) {
                if(response.data.length>0){
                     self.itemList=self.itemList.concat(response.data); 
                     self.alreadyGot+=response.data.length;
                }else if(response.data.length==0) self.noMore=true
               console.log(response);
               //console.log( self.itemList);
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        to_detail:function(id){
            window.location.href="itemDetail.html?open_type=ask&id="+id
        }
    },
    created:function(){
        var self=this;
        //获取全部类型的全部物品信息，
        axios.get(localStorage.serverUrl+'commodity/getRequiredCommodities')
            .then(function (response) {
                self.itemList=response.data.list; self.count=response.data.count;
                if(response.data.list.length) self.alreadyGot+=response.data.list.length;
                //console.log(response);
                console.log( self.itemList);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

})