/**
 * Created by 14752 on 2020-06-28.
 */
var itemDetail = new Vue({
    el:'#itemDetail',
    data:{
        open_type:'sell',
        item_id:0,


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
        }
    },
    created:function(){
        this.item_id = this.getParams("id");
        console.log(this.item_id);
        this.open_type = this.getParams("open_type");
        console.log(this.open_type);



    }


})