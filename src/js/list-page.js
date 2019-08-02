require(['./config'], () =>{
    require(['template','url', 'header', 'footer','magnifier'], (template, url) =>{
        class listPage  {
            constructor(){
                this.getData();
            }
            getData(){
                const id = location.search.slice(4)
                $.get(url.rap + '/list/page', { id }, resp =>{
                    if (resp.code === 200){
                        let detail = resp.body;
                        detail = {...detail, id}
                        $('#enlargement').html(template('detail-template', { detail }))
                        this.magnifier();

                    }
                })
            }
            magnifier(){
                    var magnifierConfig = {
                        magnifier : "#magnifier1",//最外层的大容器
                        width : 500,//承载容器宽
                        height : 500,//承载容器高
                        moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
                        zoom : 2//缩放比例
                    };
                    var _magnifier = magnifier(magnifierConfig);
            }
        }
        new listPage()
    })
})