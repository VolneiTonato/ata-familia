function BootstrapInitVTT(){
    
    this.initScripts = function(){
    };
    
    return this;
};



function ConfiguracoesVTT(){
    
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
    
};