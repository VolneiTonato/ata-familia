function MunicipioController() {

    var $body = $('body');

    var autocompleteObj = {
        nome: "[vtt-model=ID_MUNICIPIO_NOME]",
        sigla: '[vtt-model="ID_MUNICIPIO_SIGLA"]',
        id: '[vtt-model="ID_MUNICIPIO_ID"]',
        blocoAutocompletar: 'autocomplete-municipio'
    };
    
    var idDataTable = "#auto-complete-municipio";


    this.resetForm = function () {
        $(autocompleteObj.nome).val('');
        $(autocompleteObj.sigla).val('');
        $(autocompleteObj.id).val('');
        $(autocompleteObj.blocoAutocompletar).html('');
    };



    this.autoCompletarMunicipio = function () {
        var obj = $(autocompleteObj.nome);
        if (obj.val().length >= 2) {
            AjaxVTT().send({
                'vttUrl': ConfiguracoesVTT().baseUrl() + 'pesquisar-municipio',
                'vttData': {'nome': obj.val()},
                'vttLoader': false,
                'vttDebug': true,
                'vttDataType': 'html'
            }, function (result) {
                $(autocompleteObj.blocoAutocompletar).html(result);
                
                var oTable = DataTableVTT().run(idDataTable, {
                   layoutVTT : 'sdomCustom.json' 
                });
                
            });
        } else {
            $(autocompleteObj.blocoAutocompletar).html('');
        }
    };

    this.selecionarMunicipioAutoComplete = function (e, tr) {

        e.preventDefault();
        $(autocompleteObj.id).val($(tr).find('td').eq(0).text());
        $(autocompleteObj.nome).val($(tr).find('td').eq(1).text());
        $(autocompleteObj.sigla).val($(tr).find('td').eq(2).text());

        $(autocompleteObj.blocoAutocompletar).html('');

    };


    var regEvents = function () {

        $(autocompleteObj.nome).on({
            /*
             click : function(){
             autoCompletarMunicipio();
             /*
             blur : function(){
             autoCompletarMunicipio();
             */
            /*
            change: function () {
                autoCompletarMunicipio();
            },*/
            keyup: function () {
                autoCompletarMunicipio();
            }
        });
    };

    this.init = function (options) {

        regEvents();
    };

    return this;

}