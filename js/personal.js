/**
 * Created by 14752 on 2020-06-27.
 */
var personal = new Vue({
    el:'#personal',
    data:{
        //用户信息
        edit:false,
        nickname:'骆小胖',
        contact:'123',//联系方式
        area:'南校区',//校区
        dormitory:'C10',//宿舍
        department:'软件学院',

        sellItem:true,  //出售、求物品, 选择出售物品为true，选择求物品为false

        sellList:[{title:'白夜行',id:123,select:false,old_price:52.0,now_price:13.0,area:'南校区',type:'非教辅类书籍',cover:'img/item-list/article/1.jpg'}],
        askList:[],
        showingList:[]

    },
    methods:{
        //出售、请求物品的切换
        select_sell:function(){
            this.sellItem = true;
            this.showingList = this.sellList
        },
        select_ask:function(){
            this.sellItem = false;
            this.showingList = this.askList
        },

        //选中物品，用于删除
        select_item:function(index){

            if(this.sellItem){
                //为出售的物品
                this.sellList[index].select = !this.sellList[index].select;
                this.showingList[index].select = this.sellList[index].select
            }
            else{
                //为请求的物品
                this.askList[index].select = !this.askList[index].select;
                this.showingList[index].select = this.askList[index].select
            }

        },

        //删除，创建个数组记录选择的物品id
        delete_item:function(){
            var type;
            if(this.sellItem){
                //为出售的物品
            }
            else{
                //为请求的物品
            }
        },

        to_edit:function(id){
            alert('编辑')
            if(this.sellItem){
                //为出售的物品
            }
            else{
                //为请求的物品
            }
        }



    },
    created:function(){
        this.showingList = this.sellList
    }
})
