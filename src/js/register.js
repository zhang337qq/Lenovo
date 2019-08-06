require(['./config'], () =>{
    require(['header'], () =>{
        class Register  {
            constructor(){
                this.tab()

            }
            tab(){
                // console.log(11)/
                $(".regist .regist_tap>h3").on("click", function () {
                    $(this).addClass("now").siblings().removeClass("now")
                    $(".regist .regist_main>div").eq($(this).index()).addClass("blo").siblings().removeClass("blo")
                })
            }
        }
        new Register()
    })
})