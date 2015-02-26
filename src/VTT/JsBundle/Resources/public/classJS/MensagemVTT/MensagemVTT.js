function MensagemVTT(){

    var $body = $('body');

    var configurations = {
        mensagem: 'houve um erro ao receber os dados! Tente novamente.',
        tipo: 'danger',
        botoes: {
            valuesCloseBtn : 'Fechar'
        }
    };

    var settings = {};

    var setup = function (param) {
        if (param !== undefined)
            settings = $.extend({}, configurations, param);
        else
            settings = configurations;
        
        
        settings.id = "#ID_SHOW_MENSAGEM_VTT";
        settings.botoes.idCloseBtn = "#ID_SHOW_MENSAGEM_VTT_BTN_CLOSE";
        
        $body = $('body');
        
    };

    this.show = function (param) {
        
        setup(param);
        
        _destruct();

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

        $.get(ConfiguracoesVTT().pathRoot() + 'bundles/vttjs/classJS/MensagemVTT/templates/show.html').done(function (html) {
            
            html = html.replace('{{SHOW_MENSAGEM_VTT_BTN_CLOSE_VALUE}}', settings.botoes.valuesCloseBtn);
            html = html.replace('{{MENSAGEM_VTT}}', settings.mensagem);
            
            
            $body.append(html);
            
            $.blockUI({
                message: $(settings.id),
                css: {backgroundColor: background, color: color}
            });
        });

        return this;
    };

    this.close = function (fnc) {
        $body.delegate(settings.botoes.idCloseBtn, 'click', function (event) {
            event.preventDefault();
            
            _destruct();

            if (fnc !== undefined)
                fnc(event);

            fnc = undefined;
        });

        return this;
    };

    var _destruct = function () {
        $body.find(settings.id).css({'display' : 'block'}).remove();
        $body.off("click", settings.botoes.idCloseBtn);
        $.unblockUI();
    };

    return this;
};








