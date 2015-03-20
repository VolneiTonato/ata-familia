var ModalVTT = (function() {

    var $body = $('body');

    var configurations = {
        templateHTML: ConfiguracoesVTT.pathWebFilesVTT() + 'vtt/classJS/ModalVTT/templates/modal.html',
        css : {
            height : 'auto',
            width : '900px'
        },
        modal : {},
        html : ''
    };

    var settings = undefined;


    var setup = function (param) {
        
        if (param !== undefined)
            settings = $.extend({}, configurations, param);
        else
            settings = configurations;


        settings.id = "#ID_MODAL_VTT";
        settings.idBotaoFechar = "#ID_MODAL_VTT_BTN_CLOSE";
        settings.bloco = 'bloco-modal-vtt';
    };
    
    var _init = function(options){
        setup(options);
    };
    
    var mergeOptions = function(options){
        
        if(options !== undefined && settings !== undefined)
            settings = $.extend({}, settings, options);
        else
            setup(options);
    };


    var _show = function (options ,fnc) {
        
        mergeOptions(options);
        
        destruct();

        $.get(settings.templateHTML).done(function (template) {
            
            var resultText;
            
            resultText = template.replace(/{{CONTEUDO_MODAL_VTT}}/, settings.html);
            resultText += template.replace(/{{WIDTH}}/g, settings.css.width);
            resultText += template.replace(/{{HEIGHT}}/g, settings.css.height);
            
            $body.append(resultText);

            $(settings.id).modal(settings.modal);
            
            if(fnc !== undefined)
                fnc();
            
        });
    };


    var _hide = function (fnc) {

        $body.on('click', settings.idBotaoFechar, function (event) {
            event.preventDefault();

            destruct();

            if (fnc !== undefined)
                fnc(event);
        });
    };
    
    var _forceHide = function(fnc){
        
        if(settings.idBotaoFechar === undefined)
            _init();
        
        _hide(fnc);
        $(settings.idBotaoFechar).trigger('click');
    };


    var destruct = function () {
        $body.find(settings.bloco).remove();
        $body.off('click', settings.idBotaoFechar);
    };

    return{
        /**
         * 
         * @param {object} options
         * @returns {ModalVTT_L1.ModalVTTAnonym$1}
         */
        init : function(options){
            _init(options);
            return this;
        },
        /**
         * 
         * @param {object} options
         * @param {function} fnc
         * @returns {ModalVTT_L1.ModalVTTAnonym$1}
         */
        show : function(options, fnc){
            _show(options, fnc);
            return this;
        },
        /**
         * 
         * @param {function} fnc
         * @returns {ModalVTT_L1.ModalVTTAnonym$1}
         */
        hide : function(fnc){
            _hide(fnc);
            return this;
        },
        /**
         * 
         * @param {fnc} fnc
         * @returns {void}
         */
        forceHide : function(fnc){
            _forceHide(fnc);
        }
    };
    
})();