function EmailController(){
    
    var configuracoes = {
        idBlocoPrincipal: '#ID_EMAIL_BLOCO_PRINCIPAL',
        idBlocoPrincipalClone : ".ID_EMAIL_BLOCO_LIST",
        idInputEmail : ".ID_EMAIL_INPUT_EMAIL",
        idInputId : ".ID_EMAIL_INPUT_ID",
        nameForm : 'form_ata',
        botoes : {
            idBtnAdd : "#ID_EMAIL_ADD",
            idBtnRemove : ".ID_EMAIL_REMOVE"
        }
    };
    
    var settings = {};
    
    var defaults = function(options){
        
        if(options !== undefined)
            settings = $.extend({}, configuracoes, options);
        else
            settings = configuracoes;
        
    };
    
    
    
    var regEvents = function(){
        
        $('body').on('click', settings.botoes.idBtnAdd, function(e) {
            
            e.preventDefault();
            
            var totalElement = $(settings.idInputEmail).size();

            var $o = $(settings.idBlocoPrincipal).clone();
            $o.attr('id', "").addClass(settings.idBlocoPrincipalClone.replace(/^\./, ''));
            $o.find(settings.botoes.idBtnRemove).css('display','block');
            var novoEmailInput = settings.nameForm + '[emails][' + parseInt(totalElement) + '][email]';
            var nomeId = settings.nameForm + '[emails][' + parseInt(totalElement) + '][id]';

            $o.find(settings.idTelefoneInputNumero).attr('name', novoEmailInput).val('');
            $o.find(settings.idTelefoneInputId).attr('name', nomeId).val('');

            $(this).closest('div').before($o);
        });

        $("body").on('click', settings.botoes.idBtnRemove, function(e) {
            e.preventDefault();
            $(this).closest(settings.idBlocoPrincipalClone).remove();
        });
        
        
    };
    
    this.init = function(options){
        
        defaults(options);
        
        regEvents();
        
        return this;
    };
    
    return this;
    
}