require(['./config'], () =>{
    require(['template',"url", 'footer', "cookie"], (template, url) =>{
        class Index  {
            constructor(){
                this.getLimiBuy()
                this.cartNum();
                this.loginInfo()
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
            cartNum(){
                let cart = localStorage.getItem("cart")
                let num = 0
                if (cart) {
                    cart = JSON.parse(cart)
                    num = cart.reduce((res, shop) =>{
                        res += shop.num
                        return res
                    }, 0)
                }
                $(".shopping i").html(num)
            }
            loginInfo(){
                let userinfo = $.cookie("login");
                if (userinfo) {
                    userinfo = JSON.parse(userinfo);
                    $("#unlogin").css("display", "none")
                    $("#islogin").css("display", "block")
                    $("#islogin li span").html(userinfo.username)
                }
                    // $("#unlogin").css("display", "block")
                    // $("#islogin").css("display", "none")
                    $(".secede").on("click", function () {
                        console.log($(".secede"))
                        if(confirm("确定要退出嘛？")){
                            $.cookie(userinfo, { path: '/' });
                            $("#unlogin").css("display", "block")
                            $("#islogin").css("display", "none")
                        }
                    })

            }
        }
        new Index()
    })
})