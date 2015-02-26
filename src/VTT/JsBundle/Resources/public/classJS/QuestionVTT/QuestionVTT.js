function QuestionVTT(){
    
    var $body = null;

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
        
        $body = $('body');
        
        
    };
    
    this.run = function(options){
        
        init(options);
        
        hide();

        $.get(ConfiguracoesVTT().pathRoot() + 'bundles/vttjs/ClassJS/QuestionVtt/templates/question.html', function(html){
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
    
    this.yes = function(fnc){
        
        $body.on('click', settings.botoes.idYesBtn, function (event) {            
            event.preventDefault();
            hide();

            if (fnc !== undefined)
                fnc(event);            
            
        });
       //return this;        
    };
    
    this.no = function(fnc){
        
        $body.on('click', settings.botoes.idNoBtn, function (event) {
            event.preventDefault();
            hide();

            if (fnc !== undefined)
               fnc(event);
            
        });
        //return this;
    };
    
    var hide = function () {
        $body.find(settings.id).css({'display' : 'block'}).remove();
        $.unblockUI();
    };
    
    
    return this;
    
    
    
};