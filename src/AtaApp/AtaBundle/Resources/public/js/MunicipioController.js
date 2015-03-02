function MunicipioController(){
    
    var $body = $('body');
    
    var autocompleteObj = {
      nome : "[vtt_model=ID_MUNICIPIO_NOME]",
      sigla : '#ID_MUNICIPIO_SIGLA'
    };
    
    
    this.autoCompletarMunicipio = function(){
        var obj = $(autocompleteObj.nome);
        if(obj.val().length >= 2){
            AjaxVTT().send({
                'vttUrl' : ConfiguracoesVTT().baseUrl() + 'pesquisar-municipio',
                'vttData' : {'nome' : obj.val()},
                'vttLoader' : false,
                'vttDebug' : true
            }, function(result){
                console.log(result);
            });
        }
    };
    
    var regEvents = function(){
        
        $(autocompleteObj.nome).on({
            /*
            click : function(){
                autoCompletarMunicipio();
            },
            blur : function(){
                autoCompletarMunicipio();
            },
            change : function(){
                autoCompletarMunicipio();
            },
            */
            keyup : function(){                
                autoCompletarMunicipio();
            }
        });
    };
    
    this.init = function(options){
      
        regEvents();
    };
    
    return this;
    
}