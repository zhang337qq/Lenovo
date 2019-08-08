require(['./config'], () =>{
    require(['header', 'cookie'], () =>{
        class Login  {
            constructor(){
            this.login()
            }
            login(){
                $(".submit").on("click", function () {
                    var username = $("#username").val()
                    var password = $("#password").val()
                    console.log(username,password)
                    //获取用户输入的账号和密码


                    let userInfo = {
                        username,
                        password
                    }
                    // 这里就是定义了一个str 然后将输入的存在userifo里面
                    const str = JSON.stringify(userInfo)
                    console.log($.cookie)
                    if (document.querySelector("#ps").checked){
                        $.cookie("login", str ,{expires:10,path:'/'})
                    }else {
                        $.cookie("login", str ,{path:'/'})
                    }
                    window.location.href="/";
                })
            }
        }
        new Login()
    })
})