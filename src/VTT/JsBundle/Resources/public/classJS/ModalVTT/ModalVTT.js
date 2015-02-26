
function ModalVTT(){
    
    var $body = $('body');
    var id = "#ID_MODAL_VTT";
    var idBotaoFechar = "#ID_MODAL_VTT_BTN_CLOSE";
    
    
    
    this.show = function(conteudoHtml){
        $body.remove(id);
       
        $.get(ConfiguracoesVTT().pathRoot() + 'bundles/vttjs/classJS/ModalVTT/templates/modal.html').done(function (html) {
            
            html = html.replace('{{CONTEUDO_MODAL_VTT}}', conteudoHtml);
            
            $body.append(html);

            $(id).modal();
        });
        
        return this;
    };
    
    
    this.close = function(fnc){
        
        $body.on('click', idBotaoFechar, function (event) {            
            event.preventDefault();

            _destruct();

            if (fnc !== undefined)
                fnc(event);            
        });
    };
    
    
    var _destruct = function(){
        console.log('destruct');
        $body.find(id).remove();
        $body.off('click', idBotaoFechar);
    };
            
            
            
    
    
    
    
    return this;
    
};