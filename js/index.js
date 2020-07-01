/**
 * Created by 14752 on 2020-06-27.
 */

var index = new Vue({
    el:'#index',
    data:{
        classify:[ '二手教辅', '非教辅类书籍','学习用具', '技能服务','手机数码',
        '服饰/美妆','未开封食品', '游戏交易','其他'],
        itemList:[
        ],
        showing:0
    },
    methods:{
        change_classify:function(index){

            this.showing=index
            var self=this
            //发送分类类型，获取物品List，信息见上面数据：id,title,area,cover封面图,price是现价。
            // 获取少部分物品展示，点击“更多”跳转全部物品页才获取全部物品
            axios.get(localStorage.serverUrl+'commodity/queryCommoditiesByType?commodity_type='+this.classify[this.showing].title)
                .then(function (response) {
                    console.log(response);
                    self.classify[self.showing].itemList=response.data
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
        var self=this
        //初始化，获取二手教辅分类的itemList
        axios.get(localStorage.serverUrl+'commodity/queryCommoditiesByType?commodity_type='+this.classify[0].title)
            .then(function (response) {
                self.itemList=response.data
            })
            .catch(function (error) {
                console.log(error);
            });
            console.log('index created')
    },
    // mounted:function(){
    //     console.log('index mounted')
    // },
    // beforeMount:function(){
    //     console.log('index beforeMount')
    // },
    // beforeUpdate:function(){
    //     console.log('index beforeUpdate')
    // },
    // updated:function(){
    //     console.log('index updated')
    // }

})
