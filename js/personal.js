/**
 * Created by 14752 on 2020-06-27.
 */
var personal = new Vue({
    el:'#personal',
    data:{
        //�û���Ϣ
        edit:false,
        nickname:'��С��',
        contact:'123',//��ϵ��ʽ
        area:'��У��',//У��
        dormitory:'C10',//����
        department:'���ѧԺ',

        sellItem:true,  //���ۡ�����Ʒ, ѡ�������ƷΪtrue��ѡ������ƷΪfalse

        sellList:[{title:'��ҹ��',id:123,select:false,old_price:52.0,now_price:13.0,area:'��У��',type:'�ǽ̸����鼮',cover:'img/item-list/article/1.jpg'}],
        askList:[],
        showingList:[]

    },
    methods:{
        //���ۡ�������Ʒ���л�
        select_sell:function(){
            this.sellItem = true;
            this.showingList = this.sellList
        },
        select_ask:function(){
            this.sellItem = false;
            this.showingList = this.askList
        },

        //ѡ����Ʒ������ɾ��
        select_item:function(index){

            if(this.sellItem){
                //Ϊ���۵���Ʒ
                this.sellList[index].select = !this.sellList[index].select;
                this.showingList[index].select = this.sellList[index].select
            }
            else{
                //Ϊ�������Ʒ
                this.askList[index].select = !this.askList[index].select;
                this.showingList[index].select = this.askList[index].select
            }

        },

        //ɾ���������������¼ѡ�����Ʒid
        delete_item:function(){
            var type;
            if(this.sellItem){
                //Ϊ���۵���Ʒ
            }
            else{
                //Ϊ�������Ʒ
            }
        },

        to_edit:function(id){
            alert('�༭')
            if(this.sellItem){
                //Ϊ���۵���Ʒ
            }
            else{
                //Ϊ�������Ʒ
            }
        }



    },
    created:function(){
        this.showingList = this.sellList
    }
})
