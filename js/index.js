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
            //���ͷ������ͣ���ȡ��ƷList����Ϣ���������ݣ�id,title,area,cover����ͼ,price���ּۡ�
            // ��ȡ�ٲ�����Ʒչʾ����������ࡱ��תȫ����Ʒҳ�Ż�ȡȫ����Ʒ
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
        //������࣬��תȫ����Ʒҳ
        getMore:function(index){
            var newIndex=index+1
            window.location.href="allItems.html?index="+newIndex
        },
        to_detail:function(id){
            window.location.href="itemDetail.html?open_type=sell&id="+id
        }
    },
    created:function(){
        //��ʼ������ȡ���̸ֽ������itemList
        axios.get('server/test.php', {
            params: {
                item_type:'���̸ֽ�'
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
