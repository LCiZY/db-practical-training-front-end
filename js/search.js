/**
 * Created by 14752 on 2020-06-29.
 */

var search = new Vue({
    el:'#search',
    data:{
        keyWord:''
    },
    methods:{
        search:function(){
            window.location.href="allItems.html?open_type=search&keyWord="+this.keyWord;
            //document.cookie = "keyWord="+this.keyWord;//设置缓存。因为页面传值那个函数无法识别中文
            localStorage.setItem('keyWord',this.keyWord)
        }
    }

});