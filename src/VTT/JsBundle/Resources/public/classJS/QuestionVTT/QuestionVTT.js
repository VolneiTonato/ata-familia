var QuestionVTT = function(){
    
    var $body = $('body');

    var configurations = {
        id: '#ID_QUESTION_VTT',
        mensagem: 'Deseja excluir o item selecionado?',
        botoes: {
            idYesBtn: '#ID_QUESTION_VTT_BTN_YES',
            idNoBtn : '#ID_QUESTION_VTT_BTN_NO'
        }
    };

    var settings = {};

    var init = function (param) {
        if (param !== undefined)
            settings = $.extend({}, configurations, param);
        else
            settings = configurations;
    };
    
    this.runQuestion = function(options){
        hide();
        
        init(options);
        
        $body.remove(settings.id);
        
        $.get(ConfiguracoesVTT.pathRoot() + 'bundles/vttjs/ClassJS/QuestionVtt/templates/question.html', function(html){
            $body.append(html);
            
            $(settings.id).find('h2').prop('question', function () {
                $(this).text(settings.mensagem);
            });

            $.blockUI({
                message: $(settings.id)
            });
        });
        
        return this;
        
    };
    
    this.yesQuestion = function(fnc){
        $body.delegate(settings.botoes.idYesBtn, 'click', function (event) {
            event.preventDefault();
            $(settings.id).remove();
            hide();

            if (fnc !== undefined)
                fnc(event);
            
            
            fnc = undefined;
     
            
        });
        
        return this;

        
    };
    
    this.noQuestion = function(fnc){
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
    
    
    
}();