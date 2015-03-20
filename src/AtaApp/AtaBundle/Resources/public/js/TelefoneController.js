var TelefoneController = (function(){
    
    var $body = $('body');
    
    var telefones = [];

    var obterNameInputNumeroTelefone = function (idx) {
        return settings.nameForm + '[telefones][' + parseInt(idx) + '][numero]';
    };

    var obterNameInputIdTelefone = function (idx) {
        return settings.nameForm + '[telefones][' + parseInt(idx) + '][id]';
    };
    
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
    
    var _reset = function(){
        $(configuracoes.idBlocoTelefoneList).remove();
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
                UtilsVTT.maskTelefone($(this), true);
            }
        }, settings.idTelefoneInputNumero);
        
        
    };
    
    
    var _addTelefone = function (id, numero) {

        telefones.push({
            'numero': numero,
            'id': id
        });
    };

    var _adicionarComponentes = function (quantidadeElementos) {
        if (quantidadeElementos > 1) {
            for (var i = 1; i < quantidadeElementos; i++) {
                $body.find(settings.botoes.idBtnAdd).trigger('click');
            }
        }
    };

    var _adicionarTelefonesExistentes = function () {
        for (var i = 0; i < telefones.length; i++) {
            var $o = $body.find('form[name="' + settings.nameForm + '"]');
            $o.find('input[name="' + obterNameInputNumeroTelefone(i) + '"]').val(telefones[i].numero).change();
            $o.find('input[name="' + obterNameInputIdTelefone(i) + '"]').val(telefones[i].id);
        }
    };

    var _loadTelefones = function () {
        if (telefones.length > 0) {
            _adicionarComponentes(telefones.length);
            _adicionarTelefonesExistentes();
        }
        telefones = [];
    };
    
    var _init = function(options){
        
        defaults(options);
        
        regEvents();
        
    };
    
    return{
        init : function(options){
            _init(options);
            return this;
        },
        loadTelefones: function () {
            _loadTelefones();
            return this;
        },
        addTelefone: function (id, numero) {
            _addTelefone(id, numero);
            return this;
        },
        reset : function(){
            _reset();
        }
    };
    
})();