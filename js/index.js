/**
 * Created by 14752 on 2020-06-27.
 */

var index = new Vue({
    el:'#index',
    data:{
        classify:[ '二手教辅', '非教辅类书籍','学习用具', '技能服务','手机数码',
        '服饰/美妆','未开封食品', '游戏交易','其他'],
        itemList:[],
        showing:0,
        ifLoading:true,


        dataList:["https://i1.mifile.cn/a4/xmad_15535933141925_ulkYv.jpg","https://i1.mifile.cn/a4/xmad_15532384207972_iJXSx.jpg","https://i1.mifile.cn/a4/xmad_15517939170939_oiXCK.jpg"],
        currentIndex: 0,   //默认显示图片
        timer: null,
        right:true,
        left:false    //定时器
    },
    methods:{
        change_classify:function(index){
            this.ifLoading=true
            this.showing=index
            var self=this
            //发送分类类型，获取物品List，信息见上面数据：id,title,area,cover封面图,price是现价。
            // 获取少部分物品展示，点击“更多”跳转全部物品页才获取全部物品
            axios.get(localStorage.serverUrl+'commodity/queryCommoditiesByType?commodity_type='+self.classify[self.showing])
                .then(function (response) {
                    console.log(response);
                    self.ifLoading=false
                    self.itemList=response.data

                })
                .catch(function (error) {
                    self.ifLoading=false
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
        },

        gotoPage(index) {
            this.left = !(this.right=this.currentIndex<index)
            this.currentIndex = index;
            console.log('right:'+this.right)
            console.log('left:'+this.left)
          },
          runInv() {
            this.timer = setInterval(() => {
              this.gotoPage(this.nextIndex)
            }, 3000)
          }
    },
    computed:{
                //上一张
        prevIndex() {
            if(this.currentIndex == 0) {
            return this.dataList.length - 1;
            }else{
            return this.currentIndex - 1;
            }
        },
        //下一张
        nextIndex() {
            if(this.currentIndex == this.dataList.length - 1) {
            return 0;
            }else {
            return this.currentIndex + 1;
            }
        }
     },
    created:function(){
        var self=this
        //初始化，获取二手教辅分类的itemList
        axios.get(localStorage.serverUrl+'commodity/queryCommoditiesByType?commodity_type='+this.classify[0])
            .then(function (response) {
                self.itemList=response.data
                self.ifLoading=false
            })
            .catch(function (error) {
                self.ifLoading=false
                console.log(error);
            });
            console.log('index created')
    },
    mounted:function(){
        this.runInv()
    },
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
