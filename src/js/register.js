require(['./config'], () =>{
    require(['header'], () =>{
        class Register  {
            constructor(){
                this.tab()
                this.verification();

            }
            tab(){
                // console.log(11)/
                $(".regist .regist_tap>h3").on("click", function () {
                    $(this).addClass("now").siblings().removeClass("now")
                    $(".regist .regist_main>div").eq($(this).index()).addClass("blo").siblings().removeClass("blo")
                })
            }
            verification(){
                //获取企业相关input
               var $phone = $("#phone"),
                   $company = $("#company"),
                   $companyEmail = $("#companyEmail"),
                   $companyDuty = $("#companyDuty"),
                //两次输入密码框
                   $pas1 = $(".pwd1"),
                   $pas2 = $(".pwd2");
                // console.log($password);
               //获取相关企业相关的错误提示或成功提示
               var phone = $(".phone"),
                   company = $(".company"),
                   companyEmail = $(".companyEmail"),
                   companyDuty = $(".companyDuty"),
                   //两次密码框的提示
                   pass = $(".pass"),
                   password = $(".password");
               //正则判断存储
               var canonicalCompanyDuty = /^[A-Z0-9]{15}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/,
                   canonicalPhone = /^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/,
                   canonicalCompanyEmail = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/,
                   canonicalCompany = /^[\u2E80-\u9FFF]+$/,
                   canonicalPassword = /^[a-z0-9_-]{5,18}$/;
                //手机号码验证
                $phone.focus(function () {
                        phone.html("请输入账号")
                        phone.css("color", "blue")
                    })
                $phone.blur(function () {
                    if (canonicalPhone.test($phone.val())) {
                        phone.html("正确")
                        phone.css("color", "green")
                    }else {
                        phone.html("您输入的手机号有误，请重试")
                        phone.css("color", "red")
                    }
                    if ($phone.val() == ""){
                        phone.html("手机号码不能为空,请输入")
                        phone.css("color", "orange")
                    }
                })
                //企业名称验证
                $company.focus(function () {
                    company.html("请输入您的企业名称")
                    company.css("color", "blue")
                })
                $company.blur(function () {
                    if (canonicalCompany.test($company.val())) {
                        company.html("正确")
                        company.css("color", "green")
                    }else {
                        company.html("您输入的企业名称有误，请重试")
                        company.css("color", "red")
                    }
                    if ($company.val() == ""){
                        company.html("企业名称不能为空,请输入")
                        company.css("color", "orange")
                    }
                })
                //企业邮箱验证
                $companyEmail.focus(function () {
                    companyEmail.html("请输入您的企业邮箱")
                    companyEmail.css("color", "blue")
                })
                $companyEmail.blur(function () {
                    if (canonicalCompanyEmail.test($companyEmail.val())) {
                        companyEmail.html("正确")
                        companyEmail.css("color", "green")
                    }else {
                        companyEmail.html("您输入的企业邮箱有误，请重试")
                        companyEmail.css("color", "red")
                    }
                    if ($companyEmail.val() == ""){
                        companyEmail.html("企业邮箱不能为空,请输入")
                        companyEmail.css("color", "orange")
                    }
                })
                //企业税号验证
                $companyDuty.focus(function () {
                    companyDuty.html("请输入您的企业税号")
                    companyDuty.css("color", "blue")
                })
                $companyDuty.blur(function () {
                    if (canonicalCompanyDuty.test($companyDuty.val())) {
                        companyDuty.html("正确")
                        companyDuty.css("color", "green")
                    }else {
                        companyDuty.html("您输入的企业税号有误，请重试")
                        companyDuty.css("color", "red")
                    }
                    if ($companyDuty.val() == ""){
                        companyDuty.html("企业税号不能为空,请输入")
                        companyDuty.css("color", "orange")
                    }
                })
                //密码验证
                $pas1.focus(function () {
                    pass.html("请输入密码,长度6-18,'.','*'/无法使用")
                    pass.css("color", "blue")
                })
                $pas1.blur(function () {
                    if (canonicalPassword.test($pas1.val())) {
                        pass.html("OK")
                        pass.css("color", "green")
                    }else {
                        pass.html("x")
                        pass.css("color", "green")
                    }
                    if ($pas1.val() == ""){
                        pass.html("密码不能为空,请输入")
                        pass.css("color", "orange")
                    }
                })
                //二次密码注册验证
                $pas2.focus(function () {
                    password.html("请在重新输入密码")
                    password.css("color", "blue")
                })
                $pas2.blur(function () {
                    if ($pas2.val() == $pas1.val()) {
                        password.html("OK")
                        password.css("color", "green")
                    }else {
                        password.html("x")
                        password.css("color", "green")
                    }
                    if ($pas2.val() == ""){
                        password.html("密码不能为空,请输入")
                        password.css("color", "orange")
                    }
                })

            }
        }
        new Register()
    })
})