define(["jquery"], () =>{
    class Footer {
        constructor (){
            this.load().then(() =>{

            })
        }
        load(){
            return new Promise(resolve => {
                $("footer").load("/html/modules/footer.html", resolve)
            })
        }
    }
    return new Footer()
})