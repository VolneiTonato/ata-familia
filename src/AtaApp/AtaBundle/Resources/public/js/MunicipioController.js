var MunicipioController = (function() {

    var $body = $('body');

    var autocompleteObj = {
        nome: "[vtt-model=ID_MUNICIPIO_NOME]",
        sigla: '[vtt-model="ID_MUNICIPIO_SIGLA"]',
        id: '[vtt-model="ID_MUNICIPIO_ID"]',
        blocoAutocompletar: 'autocomplete-municipio'
    };
    
    var idDataTable = "#auto-complete-municipio";


    var _resetForm = function () {
        $(autocompleteObj.nome).val('');
        $(autocompleteObj.sigla).val('');
        $(autocompleteObj.id).val('');
        $(autocompleteObj.blocoAutocompletar).html('');
    };



    var _autoCompletarMunicipio = function () {
        var obj = $(autocompleteObj.nome);
        if (obj.val().length >= 2) {
            AjaxVTT().send({
                'vttUrl': ConfiguracoesVTT.rootUrl() + 'pesquisar-municipio',
                'vttData': {'nome': obj.val()},
                'vttLoader': false,
                'vttDebug': true,
                'vttDataType': 'html'
            }, function (result) {
                $(autocompleteObj.blocoAutocompletar).empty().html(result);
                //DataTableVTT().run(idDataTable).registrarEventos();
            });
        } else {
            $(autocompleteObj.blocoAutocompletar).html('');
        }
    };

    var _selecionarMunicipioAutoComplete = function (e, tr) {

        e.preventDefault();
        $(autocompleteObj.id).val($(tr).find('td').eq(0).text());
        $(autocompleteObj.nome).val($(tr).find('td').eq(1).text());
        $(autocompleteObj.sigla).val($(tr).find('td').eq(2).text());

        $(autocompleteObj.blocoAutocompletar).html('');

    };


    var regEvents = function () {
        
        $body.on({

            keyup: function () {
                _autoCompletarMunicipio();
            }
        }, autocompleteObj.nome);
    };

    var _init = function (options) {

        regEvents();
    };

    return{
        init : function(options){
            _init(options);
            return this;
        },
        autoCompletarMunicipio : function(){
            _autoCompletarMunicipio();
            return this;
        },
        selecionarMunicipioAutoComplete : function(e, tr){
            _selecionarMunicipioAutoComplete(e, tr);
            return this;
        },
        reset : function(){
            _resetForm();
        }
        
        
    };

})();