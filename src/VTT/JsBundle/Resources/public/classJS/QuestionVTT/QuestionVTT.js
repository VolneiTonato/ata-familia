function QuestionVTT(){
    
    var $body = null;

    var configurations = {
        mensagem: 'Deseja excluir o item selecionado?',
        botoes: {
            valueNoBtn : 'Não',
            valueYesBtn : 'Sim'
        }
    };

    var settings = {};

    var setup = function (param) {
        if (param !== undefined)
            settings = $.extend({}, configurations, param);
        else
            settings = configurations;
        
        settings.botoes.idNoBtn = "#ID_QUESTION_VTT_BTN_NO";
        settings.botoes.idYesBtn = "#ID_QUESTION_VTT_BTN_YES";
        settings.id = "#ID_QUESTION_VTT";
        
        $body = $('body');
    };
    
    

    
    this.run = function(options, fnc){
        
        setup(options);
        
        _destruct();

        $.get(ConfiguracoesVTT().pathRoot() + 'bundles/vttjs/ClassJS/QuestionVtt/templates/question.html', function(html){
            
            html = html.replace('{{QUESTION}}', settings.mensagem);
            html = html.replace('{{VALUE_QUESTION_VTT_BTN_NO}}', settings.botoes.valueNoBtn);
            html = html.replace('{{VALUE_QUESTION_VTT_BTN_YES}}', settings.botoes.valueYesBtn);

            $body.append(html);

            $.blockUI({
                message: $(settings.id)
            });
            
        });
        
        return this;
        
    };
    
    this.yes = function(fnc){
        
        $body.on('click', settings.botoes.idYesBtn, function (event) {            
            event.preventDefault();
            
            _destruct();

            if (fnc !== undefined)
                fnc(event);            
        });
      return this;        
    };
    
    this.no = function(fnc){
        
        $body.on('click', settings.botoes.idNoBtn, function (event) {
            event.preventDefault();
            _destruct();

            if (fnc !== undefined)
               fnc(event);
            
        });
        return this;
    };
    
    var _destruct = function () {
        $body.find(settings.id).css({'display' : 'block'}).remove();
        $body.off("click", settings.botoes.idNoBtn);
        $body.off("click", settings.botoes.idYesBtn);
        $.unblockUI();
    };
    
    
    return this;
    
    
    
};