require.config({
    baseUrl: '/',
    paths: {
        'jquery': 'libs/jquery/jquery-3.4.1.min',
        'header': 'js/modules/header',
        'footer': 'js/modules/footer',
        'template': 'libs/art-template/template-web',
        'url': 'js/modules/url',
        "magnifier": 'libs/jquery-plugins/magnifier',
    },
    // 对于不遵循amd规范得模块但是他又依赖别的模块，那么要写垫片
    shim:{
        'magnifier':{
            deps: ['jquery']
        }
    }
})