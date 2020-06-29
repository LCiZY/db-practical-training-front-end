/**
 * Created by 14752 on 2020-06-28.
 */
var allItems = new Vue({
    el:'#allItems',
    data:{
        classify:['ȫ��', '���̸ֽ�', '�ǽ̸����鼮','ѧϰ�þ�', '���ܷ���','�ֻ�����',
            '����/��ױ','��ʳ/��Ʒ/ˮ��', '���/��Ϸ����','����'],

        itemList:[{ requestType:'sell',id:0,title:'��ҹ��',area:'��У��',type:'�ǽ̸����鼮',
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
        //��ȡcookie����
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
        //�ı����
        change_classify:function(index){
            //index��classify���±꣬�������󣬻�ȡitemList��Ϣ.requestTypeͳһ��Ϊsell
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
        to_detail:function(id,requestType){
            //requestTypeΪsell��ask
            window.location.href="itemDetail.html?open_type="+requestType+"&id="+id
        }
    },
    created:function(){
        if(this.getParams("open_type")=='search'){
            //ͨ��������ת��
            var keyWord=this.getCookie("keyWord");
            search.keyWord=keyWord;
            //���͹ؼ��֣�������Ʒ����ȡ��Ʒ�б�requestTypeΪsell��ask
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
        }
        else{
            //����ҳ��ת��index
            var index= this.getParams("index")
            if(index==null){//����ǵ������������index==null����ȡȫ������
                index=0
            }
            this.change_classify(index)
        }


    }

})