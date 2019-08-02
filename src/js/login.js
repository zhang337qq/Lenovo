require(['./config'], () =>{
    require(['header'], () =>{
        class Login  {
            constructor(){
            this.login()
            }
            login(){
                console.log(111)
            }
        }
        new Login()
    })
})