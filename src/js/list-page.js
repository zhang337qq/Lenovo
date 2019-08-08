require(['./config'], () =>{
    require(['template','url', 'header', 'footer','magnifier', 'fly'], (template, url, header) =>{
        class listPage  {
            constructor(){
                this.getData().then(() =>{
                    this.magnifier()
                    this.borColor()
                    this.addToCart()
                })
            }
            getData(){
                const id = location.search.slice(4)
                return new Promise( resolve => {
                    $.get(url.rap + '/list/page', { id }, resp =>{
                        if (resp.code === 200){
                            let detail = resp.body;
                            this.detail = {...detail, id}
                            $('#enlargement').html(template('detail-template', { detail }))
                            resolve();
                        }
                    })
                })
            }

            magnifier(){
                    var magnifierConfig = {
                        magnifier : "#magnifier1",//最外层的大容器
                        width : 500,//承载容器宽
                        height : 500,//承载容器高
                        moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
                        zoom : 2//缩放比例
                    };
                    var _magnifier = magnifier(magnifierConfig);
            }
            borColor(){
                $(".guige-item-detail>span").on("click", function () {
                    $(this).addClass("bor").siblings().removeClass("bor")
                })
            }
            addToCart(){
                $("#addShop").on("click", (e)=>{
                    // console.log(123)
                    console.log(this.detail)
                    let cart = localStorage.getItem("cart")
                    if (cart) {
                        //这里将cart 转化成jsonp 的方式  因为之前是一个js原生的方式 所以这里要转换
                        cart = JSON.parse(cart)
                        //判断当前火速局是否已经添加过购物车
                        const isExist = cart.some(item =>{
                            return item.id === this.detail.id
                        })
                        if (isExist) {
                            cart = cart.map(item =>{
                                if (item.id === this.detail.id) item.num++
                                return item
                            })
                        }else {
                            //商品不存在则进行返回的数据
                            cart.push({...this.detail, num: 1})
                        }
                        localStorage.setItem("cart", JSON.stringify(cart))
                    }else {
                        var numBer = $("#num").val();
                        //这里定义一个数组 用来保存后面的数据
                        var arr = []
                        arr.push({...this.detail, num: numBer})
                        localStorage.setItem("cart", JSON.stringify(arr))

                    }
                    $(`<img src="${this.detail.imgs[0]}" style="width: 30px;position: fixed; height: 30px;border-radius: 50%">`).fly({
                        start:{
                            left: e.pageX,
                            top: e.pageY
                        },
                        end:{
                            left: 0,
                            top: 0,
                            width: 0, //结束时高度
                            height: 0 //结束时高度
                        },
                        speed: 0.7, //越大越快，默认1.2
                        onEnd: function(){
                            //结束回调，移出DOM
                            this.destroy()
                            header.cartNum()
                        }
                    })

                })
            }

        }
        new listPage()
    })
})