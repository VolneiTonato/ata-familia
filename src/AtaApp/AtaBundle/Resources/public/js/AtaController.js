var AtaController = (function () {
    var oTable;
    var id = "#table-clientes";

    var _view = function (event, id) {
        AjaxVTT().send({
            'vttUrl' : ConfiguracoesVTT.rootUrl() + 'view',
            'vttData' : {id : id},
            'vttEvent' : event,
            'vttDataType' : 'html',
            'vttDebug' : true
        }, function(html){
            ModalVTT.show({
                html : html
            }).hide();
        });
    };
    
    var ataModel = {
      blocoForm : 'bloco-form-ata'
    };

    var _edit = function (event, id) {
        _form(event, id);
    };

    var _remove = function (e, id) {
        QuestionVTT.run().no().yes(function (e) {
            AjaxVTT().send({
                'vttUrl' : ConfiguracoesVTT.rootUrl() + 'remove',
                'vttData' :{id : id},
                'vttEvent' : e
            }, function(r){
                if(r.statusResponseVTT){
                    MensagemVTT.show({mensagem : r.mensagemVTT, tipo: r.tipoVTT}).hide();
                    _list();
                }
            });
        });
        return this;
    };
    
    var _form = function(event, id){      
        $(ataModel.blocoForm).html('<h3 align="center">Carregando form</h3>');
        AjaxVTT().send({
           'vttUrl' : ConfiguracoesVTT.rootUrl() + 'form',
           'vttEvent' : event,
           'vttDataType' : 'html',
           'vttDebug' : true,
           'vttLoader' : false,
           'vttData' : {id : id}
        }, function(form){
            $(ataModel.blocoForm).html(form);
        });
    };


    var _list = function () {
        oTable = DataTableVTT().run(id, {
            "processing": true,
            "serverSide": true,
            'ajax': {
                'url': ConfiguracoesVTT.rootUrl() + 'list',
                'type': 'POST'
            },
            'columnDefs': [
                {
                    'targets': [0],
                    'data': 'descricao',
                    'name': 'descricao'
                },
                {
                    'targets': [1],
                    'data': 'telefones',
                    'name': 'telefones'
                },
                {
                    'targets': [2],
                    'data': 'emails',
                    'name': 'emails'
                },
                {
                    'targets': [3],
                    'data': 'municipio',
                    'name': 'municipio'
                },
                {
                    'targets': [4],
                    'data': 'estado',
                    'name': 'estado'
                },
                {
                    'targets': [5],
                    'data': 'template',
                    'name': 'template',
                    'defaultContent': '',
                    'width': '20%'
                }
            ],
            "rowCallback": function (row, data) {
                $.get(ConfiguracoesVTT.pathWebFiles() + 'bundles/ataappata/js/templates-data-table/cadastro-ata/botoes-action.html', function (html) {
                    html = html.replace(/{{ID_ELEMENT}}/gi, data.DT_RowId);
                    $('td:eq(5)', row).html(html);
                });
            }
        });
    };

    var regEvents = function () {
        return this;
    };


    var _save = function (e, form) {
        AjaxVTT().send({
            'vttUrl': ConfiguracoesVTT.rootUrl() + 'save',
            'vttData': form.serializeArray(),
            'vttDebug': true,
            'vttEvent': e
        }, function (r) {
            if (r.statusResponseVTT) {
                _list();
                _form(e);
                MensagemVTT.show({mensagem: r.mensagemVTT, tipo: r.tipoVTT}).hide();
                form[0].reset();
                MunicipioController.resetForm();
                
            }
        });

    };

    var dependecyInjection = function () {
        TelefoneController.init();
        EmailController.init();
        MunicipioController.init();
    };


    var _init = function () {
        dependecyInjection();
        _list();
        regEvents();
        _form();
    };

    return {
        init: function () {
            _init();
            return this;
        },
        save: function (e, form) {
            _save(e, form);
            return this;
        },
        list : function(){
            _list();
            return this;
        },
        edit : function(e, id){
            _edit(e, id);
            return this;
        },
        remove : function(event, id){
            _remove(event, id);
            return this;
        },
        resetForm : function(event){
            _form(event);
            return this;
        },
        view : function(event, id){
            _view(event, id);
            return this;
        }
    };
})();