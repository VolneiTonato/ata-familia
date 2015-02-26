function MensagemVTT(){

    var $body = $('body');

    var configurations = {
        id: '#ID_SHOW_MENSAGEM_VTT',
        mensagem: 'houve um erro ao receber os dados! Tente novamente.',
        tipo: 'danger',
        botoes: {
            idCloseBtn: '#ID_SHOW_MENSAGEM_VTT_BTN_CLOSE'
        }
    };

    var settings = {};

    var init = function (param) {
        if (param !== undefined)
            settings = $.extend({}, configurations, param);
        else
            settings = configurations;
    };

    this.show = function (param) {
        hide();

        init(param);
        
        $body.remove(settings.id);

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

        $.get(ConfiguracoesVTT.pathRoot() + 'bundles/vttjs/classJS/MensagemVTT/templates/show.html').done(function (result) {
            $body.append(result);
            
            $(settings.id).find('h1').prop('titulo-mensagem', function () {
                $(this).text(settings.mensagem);
            });

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
            $(settings.id).remove();
            hide();

            if (fnc !== undefined)
                fnc(event);

            fnc = undefined;
        });

        return this;
    };

    var hide = function () {
        $.unblockUI();
    };

    return this;
};








