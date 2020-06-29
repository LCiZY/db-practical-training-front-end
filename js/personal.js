/**
 * Created by 14752 on 2020-06-27.
 */
var personal = new Vue({
    el:'#personal',
    data:{
        //�û���Ϣ
        nickname:'��С��',
        contact:'123',//��ϵ��ʽ
        area:'��У��',//У��
        dormitory:'C10',//����
        department:'���ѧԺ',

        edit:false,//������Ϣ�Ƿ�Ϊ�༭״̬
        //������Ǳ༭�ģ������ύhttp
        e_nickname:'',
        e_contact:'',//��ϵ��ʽ
        e_area:'',//У��
        e_dormitory:'',//����
        e_department:'',

        sellItem:true,  //���ۡ�����Ʒ, ѡ�������ƷΪtrue��ѡ������ƷΪfalse

        sellList:[{title:'��ҹ��',id:123,finished:'N',select:false,old_price:52.0,now_price:13.0,type:'�ǽ̸����鼮',cover:'img/item-list/article/1.jpg'}],
        askList:[],
        showingList:[]


    },
    methods:{
        to_edit_info:function(){
            this.edit=true
        },
        //�ύ�޸ĵĸ�����Ϣ
        edit_submit:function(){
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code,

                    nickname:this.e_nickname,
                    contact:this.e_contact,
                    area:this.e_area,
                    dormitory:this.e_dormitory,
                    department:this.e_department
                }
            })
                .then(function (response) {
                    console.log(response);
                    this.nickname=this.e_nickname;
                    this.contact=this.e_contact;
                    this.area=this.e_area;
                    this.dormitory=this.e_dormitory;
                    this.department=this.e_department

                })
                .catch(function (error) {
                    console.log(error);
                });
            this.edit=false
        },
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
        //��ɽ��ף�������Ʒid
        deal_finished:function(index){
            var type;
            var itemID;
            if(this.sellItem){
                //���۵���Ʒ
                itemID=this.sellList[index].id;
                //�����û�id����Ʒid�ַ������ÿո����
                axios.get('server/test.php', {
                    params: {
                        user_id:login_status.id,
                        operation_code:login_status.operation_code,
                        itemID:itemID
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        this.sellList[index].finished='Y';
                        this.showingList = this.sellList
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else{
                //�������Ʒ
                itemID=this.askList[index].id;
            }
        },

        //ɾ���������������¼ѡ�����Ʒid
        delete_item:function(){
            var type;
            if(this.sellItem){
                //ɾ�����۵���Ʒ��������Ʒ�б�
                //�����û�id����Ʒid�ַ������ÿո����
                var idList='';
                for(var i=0; i<this.sellList.length; i++){
                    if(this.sellList[i].select=true){
                        idList += this.sellList[i].id
                    }
                }
                axios.get('server/test.php', {
                    params: {
                        user_id:login_status.id,
                        operation_code:login_status.operation_code,
                        idList:idList
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        //this.sellList=response.data.
                        //this.showingList = this.sellList
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else{
                //ɾ���������Ʒ
            }
        },

        //�༭���ܻ�ûд
        to_edit_item:function(id){
            alert('�༭')
            if(this.sellItem){
                //�༭���۵���Ʒ
            }
            else{
                //�༭�������Ʒ
            }
        }



    },
    created:function(){
        if(login_status.id==''){
            alert('��ǰδ��¼��')
        }
        else{
            //��ȡ�û���Ϣ
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code
                }
            })
                .then(function (response) {
                    console.log(response);
                    //this.nickname=response.data.
                    //this.contact=response.data.
                    //this.area=response.data.
                    //this.dormitory=response.data.
                    //this.department=response.data.

                })
                .catch(function (error) {
                    console.log(error);
                });
            //�û������ĳ�����Ʒ�б�,selectͳһ��Ϊfalse
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code
                }
            })
                .then(function (response) {
                    console.log(response);
                    //this.sellList=response.data.
                    this.showingList = this.sellList
                })
                .catch(function (error) {
                    console.log(error);
                });
            //�û�������������Ʒ�б�,selectͳһ��Ϊfalse
            axios.get('server/test.php', {
                params: {
                    user_id:login_status.id,
                    operation_code:login_status.operation_code
                }
            })
                .then(function (response) {
                    console.log(response);
                    //this.askList=response.data.
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
})
