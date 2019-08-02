require(['./config'], () =>{
    require(['template','url', 'header', 'footer'], (template, url) =>{
        class Particulars  {
            constructor(){
            this.getLimiBuy();
            }
            getLimiBuy(){
               $.get(`${url.rap}/products`, resp =>{
                   if (resp.code === 200) {
                       const { list } = resp.body
                       $("#productDetailUl").html(template("template", { list }))
                   }
               })
            }
        }
        new Particulars()
    })
})