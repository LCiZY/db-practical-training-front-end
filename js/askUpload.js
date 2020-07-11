/**
 * Created by 14752 on 2020-07-02.
 */

var modal = new Vue({
    el:'#modal',
    data:{
        ifmodal:false
    },
    methods:{
        closeModal:function(){

            this.ifmodal = false
        }


    }

})

var formContain = new Vue({
    el:'#formContain',
    data:{
        commodity_name:'' ,
        commodity_type:'二手教辅',
        commodity_description:'' ,
        cover_pic:'',
        area:'北校区' ,
        user_id:'',
        ifmodal:false
    },
    methods:{
        add_img:function(event){
            this.cover_pic = event.target.files[0];
            // var fr = new FileReader();
            // fr.onload = function () {
            //     document.getElementById('cover_pic').src = fr.result;
            // };
            // fr.readAsDataURL(this.cover_pic);
        },
        uploadToServer:function(){

            if(!this.checkIfLogin()||!this.checkContain()) return

            let form = new FormData();
            if(this.cover_pic!='') form.append('cover_pic', this.cover_pic,this.cover_pic.name);
            form.append('commodity_name',this.commodity_name)
            form.append('commodity_type',this.commodity_type)
            form.append('commodity_description',this.commodity_description)
            form.append('area',this.area)
            form.append('user_id',localStorage.user_id)
            form.append('user_login_code',localStorage.operation_code)

            const msg = this.$Message.loading({
                content: 'Loading...',
                duration: 0
            });
            setTimeout(msg, 10000);
            var self = this
            axios.post(localStorage.serverUrl+'commodity/addRequiredCommodity', form, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(function (response) {
                    if(response.data=='0'){
                        setTimeout(msg, 1);
                        self.$Modal.error({
                            title: '发布结果',
                            content: '发布失败，请检查内容后重试！'
                        });
                    }
                    else{
                        setTimeout(msg, 1);
                        self.$Modal.success({
                            title: '发布结果',
                            content: '发布成功！'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        checkContain:function(){
            console.log('commodity_name:'+this.commodity_name)
            console.log('commodity_description:'+this.commodity_description)
            if(this.commodity_name==''
            ||this.commodity_description==''
            ){
                this.$Modal.warning({
                    title: '提示',
                    content: '请将信息填写完整'
                });
                return false
           }
           return true
        },
        checkIfLogin:function(){
            if(localStorage.user_id==null||localStorage.user_id=='') {
                this.$Modal.warning({
                    title: '未登录',
                    content: '请先登陆'
                });
                return false
           }
           return true
        }
    },
    created:function(){

    },
    mounted:function(){

    }

})


