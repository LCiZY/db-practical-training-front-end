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
        //��ȡҳ�洫ֵ
        getParams:function(key){
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        //�ı����
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
            window.location.href="itemDetail.html?open_type=sell&id="+id
        }
    },
    created:function(){
        //����ҳ��ת��index
        var index= this.getParams("index")
        if(index==null){//����ǵ������������index==null����ȡȫ������
            index=0
        }
        this.change_classify(index)

    }

})