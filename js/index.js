/**
 * Created by 14752 on 2020-06-27.
 */
var index = new Vue({
    el:'#index',
    data:{
        classify:[
            {title:'���̸ֽ�',itemList:[{id:0,title:'��ҹ��',area:'��У��',cover:'https://img1.doubanio.com/view/subject/l/public/s24514468.jpg',price:'12.9'}]},
            {title:'�ǽ̸����鼮',itemList:[]},{title:'ѧϰ�þ�',itemList:[]},
            {title:'���ܷ���',itemList:[]},{title:'�ֻ�����',itemList:[]},
            {title:'����/��ױ',itemList:[]},{title:'��ʳ/��Ʒ/ˮ��',itemList:[]},
            {title:'���/��Ϸ����',itemList:[]},{title:'����',itemList:[]}],
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
