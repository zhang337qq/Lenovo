require(['./config'], () =>{
    require(['template','url', 'header', 'footer','magnifier'], (template, url) =>{
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
                $("#addShop").on("click", ()=>{
                    // console.log(123)
                    console.log(this.detail)
                    let cart = localStorage.getItem("cart")
                    if (cart) {
                        //这里将cart 转化成jsonp 的方式  因为之前是一个js原生的方式 所以这里要转换
                        cart = JSON.parse(cart)
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
                        //这里定义一个数组 用来保存后面的数据
                        var arr = []
                        arr.push({...this.detail, num: 1})
                        localStorage.setItem("cart", JSON.stringify(arr))
                    }
                })
            }

        }
        new listPage()
    })
})