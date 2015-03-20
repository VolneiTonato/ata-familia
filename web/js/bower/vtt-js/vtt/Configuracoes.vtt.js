var ConfiguracoesVTT = (function(){
    
    var _webFiles = '/ata-familia/web/';
    var _rootURl = '/ata-familia/web/';
    var _webFilesVTT = _webFiles + 'js/bower/vtt-js/';
    var _host = 'http://localhost:4536';
    var _fullUrl = _host + _rootURl;
    
    return {
        pathWebFiles : function(){
            return _webFiles;
        },
        rootUrl : function(){
            return _rootURl;
        },
        pathWebFilesVTT : function(){
            return _webFilesVTT;
        },
        host : function(){
            return _host;
        },
        url : function(){
            return _fullUrl;
        }
    };
})();