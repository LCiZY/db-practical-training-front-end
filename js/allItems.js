/**
 * Created by 14752 on 2020-06-28.
 */



var allItems = new Vue({
    el:'#allItems',
    data:{
        classify:['全部', '二手教辅', '非教辅类书籍','学习用具', '技能服务','手机数码',
            '服饰/美妆','未开封食品', '游戏交易','其他'],

        itemList:[],
        count:0,
        alreadyGot:0,
        chooseIndex:-1


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
        //获取cookie函数
        getCookie:function(cname){
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++)
            {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
            return "";
        },
        //改变分类
        change_classify:function(index){
            if(this.chooseIndex==index) return
            this.chooseIndex=index
            this.alreadyGot=0
            //index是classify的下标，发送请求，获取itemList信息.requestType统一设为sell
            if(index==0) {
                //获取全部类型的全部物品信息，
                axios.get(localStorage.serverUrl+'commodity/getCommodities', {})  
                    .then(function (response) {
                       this.itemList=response.data.list;this.count=res.data.count; if(response.data.list.length) this.alreadyGot+=response.data.list.length 
                       console.log(response);
                    })
                    .catch(function (error) {
                       // console.log(error);
                    });
            }
            else{
                //否则获取某一类型的全部物品信息
                axios.get(localStorage.serverUrl+'commodity/getCommodities', { params: {commodity_type:this.classify[index]} } )  
                    .then(function (response) {
                       this.itemList=response.data ; if(res.data.length) this.alreadyGot+=response.data.length
                       console.log(response);
                    })
                    .catch(function (error) {
                       // console.log(error);
                    });
            }

        },
        to_detail:function(id,requestType){
            //requestType为sell或ask
            window.location.href="itemDetail.html?open_type="+requestType+"&id="+id
        }
    },
    created:function(){
        if(this.getParams("open_type")=='search'){
            //通过搜索跳转的
            var keyWord=this.getCookie("keyWord");
            search.keyWord=keyWord;
            //发送关键字，搜索物品，获取物品列表，requestType为sell或ask
            axios.get(localStorage.serverUrl+'commodity/queryCommoditiesByKeyword', {
                params: {
                    keyword:keyWord
                }
            })
                .then(function (response) {
                   // console.log(response);
                    this.itemList=response.data
                })
                .catch(function (error) {
                  //  console.log(error);
                });
        }
        else{
            //从首页跳转传index
            var index= this.getParams("index")
            if(index==null){//如果是点击导航过来，index==null，获取全部分类
                index=0
            }
            this.change_classify(index)
        }


    }

})