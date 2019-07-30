//
//         var asideTop = document.querySelector(".box-aside-top");
//        var navUl = document.querySelector("nav");
//        var back = document.querySelector(".back");
//        var pic = document.querySelector(".pic");
//        var radio = document.querySelector(".radio");
//        var p = radio.querySelectorAll("p") ;
//
//        // console.log(navUl);
//        onscroll = function () {
//            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//            if (scrollTop >= 2000) {
//                asideTop.className = "fxx";
//                asideTop.style.height = "326"+ "px";
//            }else {
//                asideTop.className = "box-aside-top";
//            }
//
//            if (scrollTop >= 1000){
//                navUl.className = "fx2";
//                navUl.style.height = "530" + "px";
//            }else {
//                navUl.className = "nav";
//            }
//        }
var smTheme = document.querySelector("#sm-theme")
var theme = document.querySelector("#theme");
    onscroll = function () {
        //兼容写法
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 50) {
            theme.className = "fxx";
            // theme.style.height = "50" + "px";
            // theme.style.width = "1200" + "px";
            smTheme.className = "mask-theme"
        }else {
            theme.className = "theme"
            smTheme.className = "mask-theme"
        }
    }
