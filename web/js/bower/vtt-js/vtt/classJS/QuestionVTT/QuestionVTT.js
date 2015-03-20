var QuestionVTT = (function () {

    var $body = $('body');

    var configurations = {
        mensagem: 'Deseja excluir o item selecionado?',
        botoes: {
            valueNoBtn: 'Não',
            valueYesBtn: 'Sim'
        },
        templateHTML: ConfiguracoesVTT.pathWebFilesVTT() + 'vtt/ClassJS/QuestionVTT/templates/question.html'
    };

    var settings = undefined;

    var setup = function (param) {
        if (param !== undefined)
            settings = $.extend({}, configurations, param);
        else
            settings = configurations;

        settings.botoes.idNoBtn = "#ID_QUESTION_VTT_BTN_NO";
        settings.botoes.idYesBtn = "#ID_QUESTION_VTT_BTN_YES";
        settings.id = "#ID_QUESTION_VTT";
        settings.bloco = "bloco-question-vtt";
    };

    var _init = function (options) {
        setup(options);
    };


    var mergeOptions = function (options) {

        if (options !== undefined && settings !== undefined)
            settings = $.extend({}, settings, options);
        else
            setup(options);
    };

    var _run = function (options, fnc) {

        mergeOptions(options);
        
        destruct();

        $.get(settings.templateHTML, function (html) {

            html = html.replace(/{{QUESTION}}/, settings.mensagem);
            html = html.replace(/{{VALUE_QUESTION_VTT_BTN_NO}}/, settings.botoes.valueNoBtn);
            html = html.replace(/{{VALUE_QUESTION_VTT_BTN_YES}}/, settings.botoes.valueYesBtn);

            $body.append(html);

            $.blockUI({
                message: $(settings.id)
            });

            if (fnc !== undefined)
                fnc();
        });
    };

    var _yes = function (fnc) {

        $body.on('click', settings.botoes.idYesBtn, function (event) {
            event.preventDefault();
            if (fnc !== undefined)
                fnc(event);
        });
    };

    var _no = function (fnc) {

        $body.on('click', settings.botoes.idNoBtn, function (event) {
            event.preventDefault();
            
            destruct();

            if (fnc !== undefined)
                fnc(event);

        });
    };

    var destruct = function () {
        $body.off("click", settings.botoes.idNoBtn);
        $body.off("click", settings.botoes.idYesBtn);
        $body.find(settings.bloco).remove();
        $.unblockUI();
    };


    return {
        init: function (options) {
            _init(options);
            return this;
        },
        run: function (fnc) {
            _run(fnc);
            return this;
        },
        yes: function (fnc) {
            _yes(fnc);
            return this;
        },
        no: function (fnc) {
            _no(fnc);
            return this;
        }
    };
})();