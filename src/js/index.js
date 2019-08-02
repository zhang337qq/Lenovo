require(['./config'], () =>{
    require(['template',"url", 'footer'], (template, url) =>{
        class Index  {
            constructor(){
                this.getLimiBuy();
            }
            getLimiBuy(){
                $.get(`${url.rap}/index/tv`, resp =>{
                    if (resp.code === 200) {
                        const { list } = resp.body
                        $(".topUl").html(template("desktop", { list }))
                        $(".topUl").html(template("desktop2", { list }))
                        this.getSearch();
                    }
                })
            }
            getSearch(){
                console.log($("#hdCen"))
                var $ulCen = $("#hdCen")
                $("#hdCen").style.display = "none";
            }
        }
        new Index()
    })
})