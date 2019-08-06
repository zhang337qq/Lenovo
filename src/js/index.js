require(['./config'], () =>{
    require(['template',"url", 'footer'], (template, url) =>{
        class Index  {
            constructor(){
                this.getLimiBuy()
                this.cart();

            }
            getLimiBuy(){
                $.get(`${url.rap}/index/tv`, resp =>{
                    if (resp.code === 200) {
                        const { list } = resp.body
                        $(".topUl").html(template("desktop", { list }))
                        $(".topUl").html(template("desktop2", { list }))
                    }
                })
            }
            cart(){
                let cart = localStorage.getItem("cart")
                cart = JSON.parse(cart)
                $(".shopping a i").html(cart.length)
            }
        }
        new Index()
    })
})