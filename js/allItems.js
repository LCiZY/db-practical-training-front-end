/**
 * Created by 14752 on 2020-06-28.
 */
var allItems = new Vue({
    el:'#allItems',
    data:{
        classify:['ȫ��', '���̸ֽ�', '�ǽ̸����鼮','ѧϰ�þ�', '���ܷ���','�ֻ�����',
            '����/��ױ','��ʳ/��Ʒ/ˮ��', '���/��Ϸ����','����'],

        itemList:[{id:0,title:'��ҹ��',area:'��У��',type:'�ǽ̸����鼮',
            cover:'https://img1.doubanio.com/view/subject/l/public/s24514468.jpg',price:'12.9'}]
    },
    methods:{
        change_classify:function(index){
            //index��classify���±꣬�������󣬻�ȡitemList��Ϣ
        },
        to_detail:function(id){
            window.location.href="itemDetail.html?id="+id
        }
    },
    created:function(){
      //�±�Ϊ0��������
    }

})