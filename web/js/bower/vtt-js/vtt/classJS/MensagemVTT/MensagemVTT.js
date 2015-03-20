var MensagemVTT = (function(){

    var $body = $('body');

    var configurations = {
        mensagem: 'houve um erro ao receber os dados! Tente novamente.',
        tipo: 'danger',
        botoes: {
            valuesCloseBtn : 'Fechar'
        },
        templateHTML : ConfiguracoesVTT.pathWebFilesVTT() + 'vtt/classJS/MensagemVTT/templates/show.html'
    };

    var settings = {};

    var setup = function (param) {
        if (param !== undefined)
            settings = $.extend({}, configurations, param);
        else
            settings = configurations;
        
        
        settings.id = "#ID_SHOW_MENSAGEM_VTT";
        settings.botoes.idCloseBtn = "#ID_SHOW_MENSAGEM_VTT_BTN_CLOSE";
        settings.bloco = 'bloco-mensagem-vtt';      
    };
    
    var _init = function(options){
        setup(options);
    };
    
    var mergeOptions = function(options){
        if(options !== undefined && settings.length > 0)
            settings = $.extend({}, settings, options);
        else
            setup(options);
    };

    var _show = function (options, fnc) {
        
        mergeOptions(options);
        
        destruct();

        //tipos == success, warning, danger, info
        var color = "#fff";
        var background = "#5bc0de";

        if (settings.mensagem === undefined) {
            if (settings.tipo !== 'danger' || settings.tipo !== 'warning') {
                settings.mensagem = 'Dados processados com sucesso!';
            }
        }

        //Default info
        switch (settings.tipo) {
            case 'danger':
                color = '#fff';
                background = '#9d261d';
                break;
            case 'warning':
                color = '#fff';
                background = '#FFB848';
                break;
            case 'success':
                color = '#fff';
                background = '#049cdb';
                break;
        }

        $.get(settings.templateHTML).done(function (html) {
            
            html = html.replace('{{SHOW_MENSAGEM_VTT_BTN_CLOSE_VALUE}}', settings.botoes.valuesCloseBtn);
            html = html.replace('{{MENSAGEM_VTT}}', settings.mensagem);
            
            
            $body.append(html);
            
            $.blockUI({
                message: $(settings.id),
                css: {backgroundColor: background, color: color, textAlign : 'left', padding:'10px'}
            });
            
            if(fnc !== undefined)
                fnc();
        });        
    };

    var _hide = function (fnc) {
        
        $body.delegate(settings.botoes.idCloseBtn, 'click', function (event) {
            event.preventDefault();
            
            destruct();

            if (fnc !== undefined)
                fnc(event);
        });

        return this;
    };

    var destruct = function () {
        $body.find(settings.bloco).remove();
        $body.off("click", settings.botoes.idCloseBtn);
        $.unblockUI();
    };
    
    
    return {
        /**
         * 
         * @param {object} options
         * @returns {MensagemVTT_L1.MensagemVTTAnonym$2}
         */
        init : function(options){
            _init(options);
            return this;
        },
        /**
         * 
         * @param {object} options
         * @param {function} fnc
         * @returns {MensagemVTT_L1.MensagemVTTAnonym$2}
         */
        show : function(options,fnc){
            _show(options, fnc);
            return this;
        },
        /**
         * 
         * @param {function} fnc
         * @returns {MensagemVTT_L1.MensagemVTTAnonym$2}
         */
        hide : function(fnc){
            _hide(fnc);
            return this;
        }
        
    };

    
})();








