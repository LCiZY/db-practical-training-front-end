/**
 * Created by 14752 on 2020-06-28.
 */
var itemDetail = new Vue({
    el:'#itemDetail',
    data:{
        open_type:'sell',
        item_id:null,


        //��������Ϣ
        nickname:'��С��',
        contact:213432,
        area:'��У��',
        dormitory:'C10',
        department:'���ѧԺ',

        //��Ʒ��Ϣ
        title:'�����顶Ŀ�͡�',
        cover:'img/item-detail/1.jpg',
        item_type:'�ǽ̸����鼮',
        now_price:13.00,
        old_price:39.00,
        description:'�е�ˮӡ,������Ӱ���Ķ�',
        other_pic:['img/item-detail/1.jpg','img/item-detail/1.jpg','img/item-detail/1.jpg']

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

        addCart:function(){
            //���빺�ﳵ
            if(login_status.id=''){
                alert('���ȵ�¼')
            }
            else{
                //�����û�id��code����Ʒid�����빺�ﳵ
                axios.get('server/test.php', {
                    params: {
                        user_id:login_status.id,
                        operation_code:login_status.operation_code,
                        item_id:this.item_id
                    }
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    },

    created:function(){
        this.item_id = this.getParams("id");
        console.log(this.item_id);
        this.open_type = this.getParams("open_type");
        console.log(this.open_type);

        //�������ͣ�������Ʒask/������Ʒsell������Ʒid����ȡ��������Ϣ����Ʒ��Ϣ��������Ʒû�м۸���Ϣ
        axios.get('server/test.php', {
            params: {
                type:this.open_type,
                item_id:this.item_id
            }
        })
            .then(function (response) {
                console.log(response);
                //this.=
            })
            .catch(function (error) {
                console.log(error);
            });


    }


})