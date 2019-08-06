define(["jquery"], () =>{
    class Header {
        constructor (){
            this.load().then(() =>{
                this.top()
                this.search()
            })
        }
        load(){
            return new Promise(resolve => {
                $("header").load("/html/modules/header.html", resolve)
            })
        }
        top(){
            var navHeight = $("#theme").offset().top;
            var navFix = $("#sm-theme");
            var boxFix = $(".box-theme")
            // var search = $("#search")
            var search = document.getElementById("search")
            var navRight = document.getElementById("nav-right")
            // console.log(navRight)
                $(window).scroll( function(){
                    if ($(this).scrollTop() > navHeight) {
                        navFix.addClass("navFix")
                        boxFix.addClass("box-theme")
                        search.style.display = "none"
                        navRight.style.position = "fixed"
                        navRight.style.zIndex = "999";
                        navRight.style.right = "200" + "px";
                        // $("#inputUl").style.display = "none"
                    }else {
                        navFix.removeClass("navFix")
                        search.style.display = "block"
                        navRight.style.position = ""
                    }
                })
        }
        search(){
            $("#search").on("keyup", function () {
                const vlu = $(this).val();
                $.ajax({
                    method: "get",
                    url: `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${vlu}&cb=?`,
                    dataType: "jsonp",
                    success: resp =>{
                        // document.getElementById("inputUl").innerHTML = resp;
                        var str =""
                        var arr = resp.s
                        arr.forEach(item =>{
                            // console.log((item))
                            str += `<li>${item}">${item}</li>`
                        $("#inputUl").html(str)
                        })
                    }
                })

            })
            $("#search").on("blur", function () {
                $("#inputUl").html("");
            })
        }

    }
    return new Header()
})