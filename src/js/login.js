require(['./config'], () =>{
    require(['header'], () =>{
        class Login  {
            constructor(){
            this.login()
            }
            login(){
                //获取用户输入的账号和密码
                var username = $("#username").val()
                var password = $("#password").val()
                // console.log()
                let userInfo = {
                    username,
                    password
                }
                // 这里就是定义了一个str 然后将输入的存在userifo里面
                const str = JSON.stringify(userInfo)
                if (document.querySelector("#ps").checked){

                }
            }
        }
        new Login()
    })
})