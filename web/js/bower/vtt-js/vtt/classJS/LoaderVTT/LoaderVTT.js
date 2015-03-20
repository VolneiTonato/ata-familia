var LoaderVTT = (function() {

    var $body = $('body');

    var configurations = {
        mensagem: 'Aguarde...',
        templateHTML: ConfiguracoesVTT.pathWebFilesVTT() + 'vtt/classJS/LoaderVTT/templates/loader.html'
    };

    var settings = undefined;
    
    var setup = function (param) {
        if (param !== undefined)
            settings = $.extend({}, configurations, param);
        else
            settings = configurations;
        
        settings.id = '#VTT_LOADER_ID';
        settings.bloco = 'bloco-loader-vtt';
                
    };
    
    var  _init = function(options){
        setup(options);
    };
    
    var mergeOptions = function(options){
        if(options !== undefined && settings !== undefined)
            settings = $.extend({}, settings, options);
        else
            setup(options);
    };


    var _run = function (options, fnc) {
        
        mergeOptions(options);
        
        destruct();
        
        $.get(settings.templateHTML).done(function (result) {
            $body.append(result.replace(/{{MENSAGEM_VTT_LOADER}}/, settings.mensagem));
            $.blockUI({message: $(settings.id)});
            
            if(fnc)
                fnc();
        });
    };

    var _stop = function () {
        destruct();
    };

    var destruct = function () {
        $body.find(settings.bloco).remove();
        $.unblockUI();
    };

    return{
        /**
         * 
         * @param {object} options
         * @returns {LoaderVTT_L1.LoaderVTTAnonym$2}
         */
        init : function(options){
            _init(options);
            return this;
        },
        /**
         * 
         * @param {object} options
         * @param {function} fnc
         * @returns {LoaderVTT_L1.LoaderVTTAnonym$2}
         */
        run : function(options, fnc){
            _run(options, fnc);
            return this;
        },
        /**
         * 
         * @param {function} fnc
         * @returns {LoaderVTT_L1.LoaderVTTAnonym$2}
         */
        stop : function(fnc){
            _stop(fnc);
            return this;
        }
    };
    
})();


