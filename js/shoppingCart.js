/**
 * Created by 14752 on 2020-06-28.
 */
var shoppingCart = new Vue({
    el:'#container',
    data:{
        itemList:[{id:0,title:'��ҹ��',area:'��У��',type:'�ǽ̸����鼮',
            cover:'https://img1.doubanio.com/view/subject/l/public/s24514468.jpg',price:'12.9'}]
    },
    methods:{
        to_detail:function(id){
            window.location.href="itemDetail.html?open_type=sell&id="+id
        },
        outCart:function(){
            //�Ƴ����ﳵ,�������µĹ��ﳵ��Ʒ�б�ҳ��������Ⱦ
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code,
                    item_id:this.item_id
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
    },
    created:function(){
        if(login_status.id==''){
            alert('��ǰδ��¼')
        }
        else{
            //�����û�id����ȡ���ﳵ��Ʒ�б�
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code,
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
    }

})