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
            window.location.href="allItems.html?open_type=search";
            document.cookie = "keyWord="+this.keyWord;//���û��档��Ϊҳ�洫ֵ�Ǹ������޷�ʶ������
        }
    }

});