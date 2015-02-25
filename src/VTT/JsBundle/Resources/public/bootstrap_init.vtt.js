var BootstrapInitVTT = function () {
    
    this.initScripts = function(){
    };
    return this;
}();



var ConfiguracoesVTT = function() {
    
    this.pathRoot = function(){
        return '/ata-familia/web/';
    };
    
    this.baseUrl = function(){
        return '/ata-familia/web/app_dev.php/';
    };
    
    this.host = function(){
        return 'http://localhost:4536';
    };
    
    this.fullUrl = function(){
        return host() + baseUrl();
    };

    return this;
    
}();