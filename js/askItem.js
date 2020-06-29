/**
 * Created by 14752 on 2020-06-28.
 */

var askItem = new Vue({
    el:'#askItem',
    data:{
        classify:['ȫ��', '���̸ֽ�', '�ǽ̸����鼮','ѧϰ�þ�', '���ܷ���','�ֻ�����',
            '����/��ױ','��ʳ/��Ʒ/ˮ��', '���/��Ϸ����','����'],
        itemList:[{id:0,title:'��ҹ��',area:'��У��',type:'�ǽ̸����鼮',
            cover:'https://img1.doubanio.com/view/subject/l/public/s24514468.jpg',price:'12.9'}]
    },
    methods:{
        change_classify:function(index){
            //index��classify���±꣬�������󣬻�ȡitemList��Ϣ
            var type;
            if(index==0) {
                //��ȡȫ�����͵�ȫ����Ʒ��Ϣ��
                type='all'
            }
            else{
                //�����ȡĳһ���͵�ȫ����Ʒ��Ϣ
                type=this.classify[index]
            }

            axios.get('server/test.php', {
                params: {
                    item_type:type
                }
            })
                .then(function (response) {
                    console.log(response);
                    //this.itemList=
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        to_detail:function(id){
            window.location.href="itemDetail.html?open_type=ask&id="+id
        }
    },
    created:function(){
        //�±�Ϊ0��������
        this.change_classify(0)
    }

})