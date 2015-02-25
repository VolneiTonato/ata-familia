
var ModalVTT = function(){
    
    var $body = $('body');
    var id = "#MODAL_VTT_ID";
    
    
    this.showModal = function(conteudoHtml){
        $body.remove(id);
       
        $.get(ConfiguracoesVTT.pathRoot() + 'bundles/vttjs/classJS/ModalVTT/templates/modal.html').done(function (result) {
            $body.append(result);
            
            $(id).find('.modal-body').prop('content-modal', function () {
                $(this).text(conteudoHtml);
            });

            $(id).modal();
        });
        
        return this;
    };
    
    
    return this;
    
}();