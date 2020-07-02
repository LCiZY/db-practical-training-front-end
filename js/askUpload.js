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
        commodity_type:'���̸ֽ�',
        commodity_original_price:'',
        commodity_description:'' ,
        cover_pic:'',
        area:'��У��' ,
        user_id:''
    },
    methods:{
        add_img:function(event){
            this.cover_pic = event.target.files[0];
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('cover_pic').src = fr.result;
            };
            fr.readAsDataURL(this.cover_pic);
        },
        upload1:function(){
            let form = new FormData();
            form.append('cover_pic', this.cover_pic,this.cover_pic.name);
            if(this.desc_img1!='') form.append('desc_img1', this.desc_img1, this.desc_img1.name);
            if(this.desc_img2!='') form.append('desc_img2', this.desc_img2, this.desc_img2.name);
            if(this.desc_img3!='')form.append('desc_img3', this.desc_img3,  this.desc_img3.name);
            form.append('commodity_name',this.commodity_name)
            form.append('commodity_type',this.commodity_type)
            form.append('commodity_original_price',this.commodity_original_price)
            form.append('commodity_description',this.commodity_description)
            form.append('area',this.area)
            form.append('user_id',localStorage.user_id)
            form.append('user_login_code',localStorage.operation_code)
            axios.post(localStorage.serverUrl+'addRequiredCommodity', form, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(function (response) {
                    if(response.data=='0'){}
                    else{
                        modal.ifmodal = true
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    },
    created:function(){

    },
    mounted:function(){

    }

})

