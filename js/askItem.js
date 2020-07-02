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
        chooseIndex:-1
    },
    methods:{
        change_classify:function(index){
            //index是classify的下标，发送请求，获取itemList信息
            if(this.chooseIndex==index) return;
            this.chooseIndex=index;
            this.alreadyGot=0;
            this.count=0;
            var self=this;
            if(index==0) {
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
            else{
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


                //否则获取某一类型的全部物品信息
                //axios.get(localStorage.serverUrl+'queryRequiredCommoditiesByType?commodity_type='+self.classify[self.chooseIndex] )
                //    .then(function (response) {
                //        self.itemList=response.data ;
                //        if(response.data.length) self.alreadyGot+=response.data.length;
                //        console.log(response);
                //    })
                //    .catch(function (error) {
                //        // console.log(error);
                //    });
            }

        },
        to_detail:function(id){
            window.location.href="itemDetail.html?open_type=ask&id="+id
        }
    },
    created:function(){
        //下标为0发送请求
        this.change_classify(0)
    }

})