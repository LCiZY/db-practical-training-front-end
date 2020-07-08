/**
 * Created by 14752 on 2020-06-28.
 */
var chat;


function getNowTime(){
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth()+1; month = month<10?'0'+month:month;
    var day = date.getDate();        day = day<10?'0'+day:day;
    var hour = date.getHours();      hour = hour<10?'0'+hour:hour;
    var minute = date.getMinutes();   minute = minute<10?'0'+minute:minute;
    var second = date.getSeconds();  second = second<10?'0'+second:second;// String strDateFormat = "yyyy-MM-dd HH:mm:ss";
    return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
}


var itemDetail = new Vue({
    el:'#itemDetail',
    data:{
        open_type:'sell',
        item_id:null,


        //创建者信息
        owner_id:'',
        nickname:'',
        contact:0,
        area:'',
        dormitory:'',
        department:'',

        //物品信息
        title:'',
        cover:'',
        item_type:'',
        now_price:0,
        old_price:0,
        description:'',
        other_pic:[],
        cart_status:'加入购物车',

        socket:undefined

    },
    methods:{
        //获取页面传值
        getParams:function(key){
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },

        addCart:function(){
            //加入购物车
            if(login_status.id==null||login_status.id==''){
                alert('请先登录')
            }
            else{
                //发送用户id和code，物品id，加入/移出购物车
                var self=this;
                if(this.cart_status=='加入购物车'){
                    console.log('login_status.id:'+login_status.id)
                    //加入购物车
                    axios.get(localStorage.serverUrl+'shop/addShopCartItem?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_id='+this.item_id)
                        .then(function (response) {
                            console.log(response);
                            self.cart_status='移出购物车'
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }
                else{
                    //移出购物车
                    axios.get(localStorage.serverUrl+'shop/deleteShopCartItem?user_id='+login_status.id+'&user_login_code='+login_status.operation_code+'&commodity_id='+this.item_id)
                        .then(function (response) {
                            console.log(response);
                            self.cart_status='加入购物车'
                        })
                        .catch(function (error) {
                            console.log(error);
                        });



                }

            }
        },
        showChat:function(){
            chat.ifChat=true
            if(!this.ifExistId(this.owner_id))
            chat.userList.push({user_id:this.owner_id,user_name:this.nickname})
            if(localStorage.user_id==null||localStorage.user_id==''){}
            else{
                //设置未读消息数
                axios.get(localStorage.serverUrl+'chat/getUnreadMsgCount?user_id='+localStorage.user_id+'&user_login_code='+localStorage.operation_code)
                .then(function (response) {
                    console.log(response)
                   if(response.data.length)
                   for(i=0;i<response.data.length;i++){
                       for(j=0;j<chat.userList.length;j++){
                           if(response.data[i].other_user_id==chat.userList[j].user_id){
                                chat.userList[j]['msg_count']=response.data[i].msg_count
                                Vue.set(chat.userList, j, chat.userList[j])
                                break
                           }
                       }
                   }
                   
                })
                .catch(function (error) {
                    console.log(error);
                });

                //打开websocket
                  this.openSocket()
            }
           




        },
        ifExistId:function(id){
            for(i=0;i<chat.userList.length;i++){
                if(chat.userList[i].user_id==id) return true
            }
            return false
        },
        openSocket:function() {
        if(typeof(WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        }else{
            console.log("您的浏览器支持WebSocket");
            //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
            //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
            //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
            var socketUrl=localStorage.serverUrl+"chatServer/"+login_status.id+"/"+login_status.operation_code;
            socketUrl=socketUrl.replace("https","wss").replace("http","ws");
            console.log(socketUrl);
            if(this.socket!=null){
                this.socket.close();
                this.socket=null;
            }
            this.socket = new WebSocket(socketUrl);
            //打开事件
            this.socket.onopen = function() {
                console.log("websocket已打开");
                //this.socket.send("这是来自客户端的消息" + location.href + new Date());
            };
            //获得消息事件**************************************************************
            this.socket.onmessage = function(msg) {
                 //发现消息进入    开始处理前端触发逻辑
                console.log('接受消息：');
                console.log(msg.data);
                // msg.data是字符串，要parse
                var msgObj=JSON.parse(msg.data)
                if(chat.chatHistory[msgObj.from_user_id])
                 {  chat.chatHistory[msgObj.from_user_id].push(msgObj)
                    chat.$nextTick(() =>{
                        chat.$refs.chatBox.scrollTop = chat.$refs.chatBox.scrollHeight;
                      })
                }
                chat.setMsgAndTime(chat,msgObj.from_user_id)  
                
            };
            //关闭事件
            this.socket.onclose = function() {
                console.log("websocket已关闭");
            };
            //发生了错误事件
            this.socket.onerror = function() {
                console.log("websocket发生了错误");
            }
        }
    },
    sendMessage:function() {
        if(typeof(WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        }else {
            console.log("您的浏览器支持WebSocket");
            var msg={"to_user_id":chat.other_id,"message":chat.message,"from_user_id":localStorage.user_id,"time_stamp":getNowTime()}
            console.log('发送消息：');
            console.log(msg);
            this.socket.send(JSON.stringify(msg));
            //this.socket.send('{"toUserId":"'+this.owner_id+'","fromUserId":"'+localStorage.user_id+'","contentText":"'+chat.message+'"}');
        }
    }

    },

    created:function(){
        this.item_id = this.getParams("id");
        console.log(this.item_id);
        this.open_type = this.getParams("open_type");
        console.log(this.open_type);
        var self=this;
        //发送类型：请求物品ask/出售物品sell，和物品id，获取创建者信息和物品信息。请求物品没有价格信息
        if(this.open_type=='sell'){
            //出售物品

            axios.get(localStorage.serverUrl+'commodity/getCommodityById?commodity_id='+self.item_id)
                .then(function (response) {
                    console.log(response);
                    //创建者信息
                    self.owner_id=response.data.map.user_id
                    self.nickname=response.data.map.user_name;
                    self.contact=response.data.map.tel;
                    self.area=response.data.map.user_area;
                    self.dormitory=response.data.map.dormitory;
                    self.department=response.data.map.academy;
                    //物品信息
                    self.title=response.data.map.commodity_name;
                    self.cover=response.data.map.commodity_cover_pic_url;
                    self.item_type=response.data.map.commodity_type;
                    self.now_price=response.data.map.commodity_price;
                    self.old_price=response.data.map.commodity_original_price;
                    self.description=response.data.map.commodity_description;
                    self.other_pic=response.data.imgList;
                    self.cart_status='加入购物车'


                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else{
            //求物品

            axios.get(localStorage.serverUrl+'commodity/getRequiredCommodityById?commodity_id='+self.item_id)
                .then(function (response) {
                    console.log(response);
                    //创建者信息
                    self.nickname=response.data.user_name;
                    self.contact=response.data.tel;
                    self.area=response.data.user_area;
                    self.dormitory=response.data.dormitory;
                    self.department=response.data.academy;
                    //物品信息
                    self.title=response.data.commodity_name;
                    self.cover=response.data.commodity_cover_pic_url;
                    self.item_type=response.data.commodity_type;
                    self.description=response.data.commodity_description;
                    //self.cart_status='加入购物车'


                })
                .catch(function (error) {
                    console.log(error);
                });
        }



    }


})


 chat = new Vue({
    el:'#chat',
    data:{
        ifChat:false,
        self_user_id:'',
        self_name:'',
        other_id:'',
        other_name:'对方',
        userList:[],
        msgTimeList:[],
        chatHistory:[[]],
        showingChatHistory:[],

        message:''
    },
    methods:{
        hideChat:function(){
            this.ifChat=false
            itemDetail.socket.close()
        },
        chatWith:function(to_id,theOther){
            if(!this.checkIfLogin()) return
            this.other_name = theOther
            this.other_id=to_id
            var self=this;
            //还没有接收历史信息，发个请求
            if(!this.chatHistory[to_id])
            axios.get(localStorage.serverUrl+'chat/getChatHistories?user_id='+localStorage.user_id+'&user_id1='+to_id+'&user_login_code='+localStorage.operation_code)
                .then(function (response) {
                    console.log(response);
                    self.chatHistory[to_id]=response.data;
                    self.showingChatHistory = self.chatHistory[to_id]
                    self.$nextTick(() =>{//滚动到底部
                        self.$refs.chatBox.scrollTop = self.$refs.chatBox.scrollHeight;
                      })
                    if(self.chatHistory[to_id].length>0){
                        //设置最新消息和最新时间
                        self.setMsgAndTime(self,to_id)    
                       

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            else //接收过了，渲染就行了
            {
                this.showingChatHistory = this.chatHistory[to_id]
                this.$nextTick(() =>{//滚动到底部
                    this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
                  })
            }

            axios.get(localStorage.serverUrl+'chat/readMsg?user_id='+localStorage.user_id+'&other_user_id='+to_id+'&user_login_code='+localStorage.operation_code)
            .then(function (response) {
                //设为已读，或者在外面设为已读
            })
            .catch(function (error) {console.log(error);});
            

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
        },
        sendMessage:function(){
            if(this.other_id=='') return
            this.chatHistory[this.other_id].push({"to_user_id":this.other_id,"message":this.message,"from_user_id":localStorage.user_id,"time_stamp":getNowTime()})
            this.showingChatHistory = this.chatHistory[this.other_id]
            this.$nextTick(() =>{//滚动到底部
                this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
              })
            this.setMsgAndTime(this,this.other_id)
            itemDetail.sendMessage()
            this.message=''
        },
        send_img:function(event){
            var pic = event.target.files[0];
            let form = new FormData();
            form.append('image',pic,pic.name);
            form.append('user_id',localStorage.user_id)
            form.append('user_login_code',localStorage.operation_code)
            var self = this
            axios.post(localStorage.serverUrl+'chat/sendImage', form, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(function (response) {
                   if(response.data!=''){
                       self.message = response.data
                       self.sendMessage()
                   }
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        setMsgAndTime:function(self,id){
            if(self.chatHistory[id])
            self.msgTimeList[id]={"latestMsg":self.chatHistory[id][self.chatHistory[id].length-1].message,"latestTime":self.chatHistory[id][self.chatHistory[id].length-1].time_stamp}
        }

    },
    mounted:function(){
       if(!this.checkIfLogin()) return
       this.self_user_id = localStorage.user_id
       this.self_name = localStorage.nickname
       var self=this;
       axios.get(localStorage.serverUrl+'chat/getChatWithUsers?user_id='+login_status.id+'&user_login_code='+login_status.operation_code)
                .then(function (response) {
                    console.log(response);
                    self.userList=response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
       
    }

})


