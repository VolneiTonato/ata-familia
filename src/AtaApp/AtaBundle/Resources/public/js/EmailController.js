var EmailController = (function(){
    
    var $body = $('body');
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
    
    var obterNameInputEmail = function (idx) {
        return settings.nameForm + '[emails][' + parseInt(idx) + '][email]';
    };

    var obterNameInputEmailId = function (idx) {
        return settings.nameForm + '[emails][' + parseInt(idx) + '][id]';
    };
    
    var emails = [];
    
    var settings = {};
    
    var defaults = function(options){
        
        if(options !== undefined)
            settings = $.extend({}, configuracoes, options);
        else
            settings = configuracoes;
        
    };
    
    var _reset = function(){
        $(configuracoes.idBlocoPrincipalClone).remove();
    };
    
    var _addEmail = function (id, email) {

        emails.push({
            'email': email,
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

    var _adicionarEmailsExistentes = function () {
        for (var i = 0; i < emails.length; i++) {
            var $o = $body.find('form[name="' + settings.nameForm + '"]');
            $o.find('input[name="' + obterNameInputEmail(i) + '"]').val(emails[i].email);
            $o.find('input[name="' + obterNameInputEmailId(i) + '"]').val(emails[i].id);
        }
    };

    var _loadEmails = function () {
        if (emails.length > 0) {
            _adicionarComponentes(emails.length);
            _adicionarEmailsExistentes();
        }
        emails = [];
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

            $o.find(settings.idInputEmail).attr('name', novoEmailInput).val('');
            $o.find(settings.idInputId).attr('name', nomeId).val('');

            $(this).closest('div').before($o);
        });

        $("body").on('click', settings.botoes.idBtnRemove, function(e) {
            e.preventDefault();
            $(this).closest(settings.idBlocoPrincipalClone).remove();
        });
        
        
    };
    
    var _init = function(options){
        
        defaults(options);
        regEvents();
    };
    
    return {
        init : function(options){
            _init(options);
            return this;
        },
        loadEmails: function () {
            _loadEmails();
            return this;
        },
        addEmail: function (id, email) {
            _addEmail(id, email);
            return this;
        },
        reset : function(){
            _reset();
        }
    }
    
})();