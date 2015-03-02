function TelefoneController(){
    
    var $body = $('body');
    
    var configuracoes = {
        idBlocoTelefone: '#ID_TELEFONE_BLOCO_PRINCIPAL',
        idBlocoTelefoneList : ".ID_TELEFONE_BLOCO_LIST",
        idTelefoneInputNumero : ".ID_TELEFONE_INPUT_NUMERO",
        idTelefoneInputId : ".ID_TELEFONE_INPUT_ID",
        nameForm : 'form_ata',
        botoes : {
            idBtnAdd : "#ID_TELEFONE_ADD",
            idBtnRemove : ".ID_TELEFONE_REMOVE"
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
        
        $body.on('click', settings.botoes.idBtnAdd, function(e) {
            
            e.preventDefault();
            
            var totalElement = $(settings.idTelefoneInputNumero).size();

            var $o = $(settings.idBlocoTelefone).clone();
            $o.attr('id', "").addClass(settings.idBlocoTelefoneList.replace(/^\./, ''));
            $o.find(settings.botoes.idBtnRemove).css('display','block');
            var novoNomeInput = settings.nameForm + '[telefones][' + parseInt(totalElement) + '][numero]';
            var nomeId = settings.nameForm + '[telefones][' + parseInt(totalElement) + '][id]';

            $o.find(settings.idTelefoneInputNumero).attr('name', novoNomeInput).val('');
            $o.find(settings.idTelefoneInputId).attr('name', nomeId).val('');

            $(this).closest('div').before($o);
        });

        $body.on('click', settings.botoes.idBtnRemove, function(e) {
            e.preventDefault();
            $(this).closest(settings.idBlocoTelefoneList).remove();
        });
        
        $body.on({
            change : function(){
                UtilsVTT().maskFone($(this), true);
            }
        }, settings.idTelefoneInputNumero);
        
        
    };
    
    this.init = function(options){
        
        defaults(options);
        
        regEvents();
        
        return this;
    };
    
    return this;
    
}