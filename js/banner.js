
var banner = new Vue({
    el:'#banner',
    data: {
        dataList:["https://i1.mifile.cn/a4/xmad_15535933141925_ulkYv.jpg","https://i1.mifile.cn/a4/xmad_15532384207972_iJXSx.jpg","https://i1.mifile.cn/a4/xmad_15517939170939_oiXCK.jpg"],
        currentIndex: 0,   //默认显示图片
        timer: null,
        right:true,
        left:false    //定时器
    },
    methods:{
        gotoPage(index) {
            this.left = !(this.right=this.currentIndex<index)
            this.currentIndex = index;
            console.log('right:'+this.right)
            console.log('left:'+this.left)
          },
          runInv() {
            this.timer = setInterval(() => {
              this.gotoPage(this.nextIndex)
            }, 3000)
          }
    },
    computed:{
                //上一张
        prevIndex() {
            if(this.currentIndex == 0) {
            return this.dataList.length - 1;
            }else{
            return this.currentIndex - 1;
            }
        },
        //下一张
        nextIndex() {
            if(this.currentIndex == this.dataList.length - 1) {
            return 0;
            }else {
            return this.currentIndex + 1;
            }
        }
    },
    mounted:function(){
        this.runInv()
    }

})