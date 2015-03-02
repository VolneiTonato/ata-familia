function AtaController() {
    var oTable;
    var id = "#table-clientes";

    this.view = function (id) {
        console.log('view');

        return this;
    };

    this.edit = function (id) {
        console.log('edit');

        return this;
    };

    this.remove = function (id) {
        QuestionVTT().run().no().yes(function (e) {
            MensagemVTT().show({'mensagem': 'registro excluído com sucesso!', 'tipo': 'success'}).close();
        });

        return this;
    };


    this.list = function () {
        oTable = DataTableVTT().run(id, {
            "processing": true,
            "serverSide": true,
            'ajax': {
                'url': ConfiguracoesVTT().baseUrl() + 'list',
                'type': 'POST'
            },
            'columnDefs': [
                {
                    'targets': [0],
                    'data': 'descricao',
                    'name': 'descricao'
                },
                {
                    'targets' : [1],
                    'data' : 'telefones',
                    'name' : 'telefones'
                },
                {
                    'targets' : [2],
                    'data' : 'emails',
                    'name' : 'emails'
                },
                {
                    'targets' : [3],
                    'data' : 'municipio',
                    'name' : 'municipio'
                },
                {
                    'targets' : [4],
                    'data' : 'estado',
                    'name' : 'estado'
                },
                {
                    'targets': [5],
                    'data': 'template',
                    'name': 'template',
                    'defaultContent': '',
                    'width' : '20%'
                }
            ],
            "rowCallback": function (row, data) {
                $.get(ConfiguracoesVTT().baseUrl() + 'bundles/ataappata/js/templates-data-table/cadastro-ata/botoes-action.html', function (html) {
                    html = html.replace(/{{ID_ELEMENT}}/gi, data.DT_RowId);
                    $('td:eq(5)', row).html(html);
                });
            }
        });


        return this;
    };

    var regEvents = function () {
        return this;
    };


    this.save = function (e, form) {
        AjaxVTT().send({
            'vttUrl': ConfiguracoesVTT().pathRoot() + 'save',
            'vttData': form.serializeArray(),
            'vttDebug': true,
            'vttEvent': e
        }, function (r) {
            if(r.statusResponseVTT){
                MensagemVTT().show({mensagem : r.mensagemVTT, tipo : r.tipoVTT}).close();
                form[0].reset();
                MunicipioController().resetForm();
                list();
            }
        });

    };
    
    var dependecyInjection = function(){
        TelefoneController().init();
        EmailController().init();
        MunicipioController().init();
    };


    this.init = function () {
        dependecyInjection();
        list();
        regEvents();
    };

    return this;
}