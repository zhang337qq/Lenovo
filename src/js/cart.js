require(['./config'], () =>{
    require(['template', 'url', 'footer'], (template,url) =>{
        class addShop  {
            constructor(){
                this.render()
            }
            render(){
                let cart = localStorage.getItem("cart");
                if (cart){
                    cart = JSON.parse(cart)
                    $(".mask").html(template("template-cart", { cart }))
                    // this.calculate();
                    this.listRcmd();
                    this.checksChange()
                    this.numChangge()
                    this.totalMoney()
                    this.cartDelete()
                    this.setClass();
                }else {
                    //购物车如果为空就显示其他的
                }
            }
            checksChange(){
                let $checks = $(".mask .son_check")
                $(".son_check").on("change", ()=>{
                    this.totalMoney();
                })
                $(".whole_check").on("change",() =>{
                    this.totalMoney()
                })
            }
            setClass(){
                $(".cartBox").on("click", e =>{
                    if ($(e.target).hasClass("Label")) {
                        if ($(e.target).find(".son_check").prop('checked') === false){
                            $(e.target).addClass("mark")
                        }else {
                            $(e.target).removeClass("mark")
                        }
                    }
                })
            }
            //商品选中
            cartChecked(){
                    var allInput = $(".whole_check");
                    allInput.click(function () {
                        if (this.checked == true) {
                            $(".son_check").prop('checked', true);
                            $("label").addClass("checked").addClass("mark")
                        } else {
                            $(".son_check").prop('checked', false);
                            $("label").removeClass("checked").removeClass("mark")
                        }
                    });
                    $(".son_check").click(function (e) {
                        $(this).parent().toggleClass("checked")
                        var s = $(".son_check").length;
                        var a = $(".son_check:checked").length;
                        if (s == a) {
                            allInput.prop('checked', true);
                            allInput.parent().addClass("checked")

                        } else {
                            allInput.prop('checked', false);
                            allInput.parent().removeClass("checked")
                        }

                    });

            }


            //数量的加减
            numChangge(){
                $(".mask").on("click", event =>{
                    if (event.target.className === "reSty") {
                        //数量减
                        var num = 0,
                            price = 0
                        //数量减
                        //就要先取到这条数据的id
                        const id = $(event.target).parents(".cartBox").attr("data-id");
                        // console.log(id)/
                        let cart = JSON.parse(localStorage.getItem('cart'))
                        cart = cart.map(item =>{
                            //进行判断   不能让商品小于1
                            if (item.id === id) {
                                item.num--;
                                if (item.num <= 1){
                                    item.num = 1;
                                }
                                num = item.num;
                                price = (item.price * item.num).toFixed(2)
                            }
                            return item
                        })
                        localStorage.setItem('cart', JSON.stringify(cart))
                        // 把页面显示做修改
                        $(event.target).parents('.cartBox').find('.sum').val(num)
                        $(event.target).parents('.cartBox').find('.sum_price').html(price)
                        this.totalMoney()
                    }else if (event.target.className === "plus") {
                        var num = 0,
                            price = 0
                        //数量加
                        //就要先取到这条数据的id
                        const id = $(event.target).parents(".cartBox").attr("data-id");
                        // console.log(id)/
                        let cart = JSON.parse(localStorage.getItem('cart'))
                        cart = cart.map(item =>{
                            if (item.id === id) {
                                item.num++;
                                num = item.num
                                price = (item.price * item.num).toFixed(2)
                            }
                            return item
                        })
                        localStorage.setItem('cart', JSON.stringify(cart))
                        // 把页面显示做修改
                        $(event.target).parents('.cartBox').find('.sum').val(num)
                        $(event.target).parents('.cartBox').find('.sum_price').html(price)
                        this.totalMoney()
                    }
                })
            }
            //计算价格
            totalMoney () {
                this.totalPrice = 0;
                this.totalNum = 0;
                let $checks = $('.son_check');
                // 遍历jquery对象
                $checks.each((index, check) => {
                    // console.log(check)
                    if ($(check).prop('checked')) {
                        this.totalPrice += Number($(check).parents('.cartBox').find('.sum_price').html())
                        this.totalNum += Number($(check).parents('.cartBox').find('.sum').val())
                    }
                    console.log(this.totalPrice)
                    console.log(this.totalNum)
                    let totalPrice = Math.round(this.totalPrice * 100)/100;
                    $('.total_text').html(totalPrice)
                    console.log(totalPrice)
                    $('.piece_num').html(this.totalNum)
                })
                this.cartChecked()
                var calBtn = $('.calBtn a');
                if($('.total_text').html()!=0 && $('.piece_num').html()!=0){
                    if(!calBtn.hasClass('btn_sty')){
                        calBtn.addClass('btn_sty');
                    }
                }else{
                    if(calBtn.hasClass('btn_sty')){
                        calBtn.removeClass('btn_sty');
                    }
                }
            }
            //删除商品
            cartDelete(){
                var $order_lists = null;
                var $order_content = '';
                $('.delBtn').click(function () {
                    // console.log(that);
                    let that = this;
                    // console.log(that)
                    $order_lists = $(this).parents('.order_lists');
                    $order_content = $order_lists.parents('.order_content');
                    $('.model_bg').fadeIn(300);
                    $('.my_model').fadeIn(300);

                    $('.dialog-sure').click(function () {
                        console.log($(that))
                        var id =$(that).parents(".cartBox").attr("data-id")
                        // console.log(id)
                        let cart = JSON.parse(localStorage.getItem("cart"))
                        cart = cart.filter(item =>{
                            if(item.id != id){
                                return item
                            }
                            localStorage.removeItem(item)
                        })
                        if (cart.length === 0) {

                        }
                        localStorage.setItem("cart", JSON.stringify(cart))
                        $order_lists.remove();
                        if($order_content.html().trim() == null || $order_content.html().trim().length == 0){
                            $order_content.parents('.cartBox').remove();
                        }
                        //确定按钮，移除商品
                        closeM();
                    })

                });
                //关闭模态框
                $('.closeModel').click(function () {
                    closeM();
                });
                $('.dialog-close').click(function () {
                    closeM();
                });
                function closeM() {
                    $('.model_bg').fadeOut(300);
                    $('.my_model').fadeOut(300);
                }
            }



            // 商品列表渲染
            listRcmd(){
                $.get(`${url.rap}/cart`, resp =>{
                    if (resp.code === 200) {
                        const { list } = resp.body;
                        $("._rcmd_hot_ul").html(template("template-rcmd",{ list }))
                        this.listMove()
                    }
                })
            }
            listMove(){
                //定义下标
                var index = 0;
                var timer;
                //或许所有li的长度
                var len=$("._rcmd_hot ul._rcmd_hot_ul li").length;
                //向右边移动
                $("._rcmd_area span.ri").click(function(){
                    clearInterval(timer);
                    index++;
                    if(index+len>len){
                        $("._rcmd_hot ul._rcmd_hot_ul").stop().append($("ul._rcmd_hot_ul").html());
                    }
                    $("._rcmd_hot ul._rcmd_hot_ul").stop().animate({left:-index*245},500);
                });
                //像左边移动
                $("._rcmd_area span.le").click(function(){
                    clearInterval(timer);
                    if(index==0){
                        $("ul._rcmd_hot_ul").prepend($("ul._rcmd_hot_ul").html());
                        $("ul._rcmd_hot_ul").css("left","-1380px");
                        index=len+1;
                    }
                    index--;
                    $("._rcmd_hot ul._rcmd_hot_ul").stop().animate({left:-index*245},500);
                });
                //定时器  动画进行轮播
                setInterval(function () {
                    index++;
                    $("._rcmd_hot ul._rcmd_hot_ul").stop().animate({left:-index*245},500);
                    // if(index+len>len){
                    //     $("._rcmd_hot ul._rcmd_hot_ul").stop().append($("ul._rcmd_hot_ul").html());
                    // }
                },3000)
                $("._rcmd_hot_ul").hover(function () {
                    clearInterval(timer)
                })
            }
        }
        new addShop()
    })
})