function DataTableVTT(elementConstrutor) {
    var oTable;
    var element;
    var elementDefault = '.data-table';



    if (elementConstrutor !== undefined) {
        run(elementDefault);
    }

    this.getInstace = function () {
        return oTable;
    };

    this.getRowSelected = function (id) {

        if (oTable.$('tr#')[0] !== undefined) {
            return oTable.$('tr.selected')[0];
        }
    };


    var setEventSelectRow = function () {
        $(element + ' tbody').on('click', 'tr', function () {
            var classElement = 'selected';

            if ($(this).hasClass(classElement)) {
                //$(this).removeClass(classElement);
            } else {
                oTable.$('tr.' + classElement).removeClass(classElement);
                $(this).addClass(classElement);
            }
        });

        return this;
    };

    var defaultsParam = function () {
        return {
            "layoutVTT": 'sdomFull.json',
            "destroy": true,
            "pagingType": "bootstrap",
            "oLanguage": {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Pesquisar",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                }
            },
            "sorting": [
                [0, 'asc']
            ],
            "aLengthMenu": [
                //[5, 10, 15, 20, -1],
                //[5, 10, 15, 20, "All"] // change per page values here
                [10, 20, 50],
                [10, 20, 50]
            ],
            // set the initial value
            "length": 10,
        };
    };



    this.run = function (elementParam, options) {

        if (elementParam === undefined && options === undefined) {
            console.log('Erro ao iniciar a DataTable! É necessário passar um elemento ou parametros da DataTable para excutar o metodo run()');
            return;
        }

        if (options !== undefined)
            var settings = $.extend({}, defaultsParam(), options);
        else
            var settings = defaultsParam();

        if (elementParam === undefined) {
            elementParam = elementDefault;
        }


        if (settings.sDom === undefined) {
            if (!settings.layoutVTT.match(/\//)) {
                settings.layoutVTT = ConfiguracoesVTT().pathRoot() + 'bundles/vttjs/classJS/DataTableVTT/templates/' + settings.layoutVTT;
            }

            $.get(settings.layoutVTT, function (js) {
                $.extend(true, $.fn.dataTable.defaults, js);

                element = elementParam;
                oTable = $(element).DataTable(settings);

                // initialzie select2 dropdown
                $('#sample_1_column_toggler input[type="checkbox"]').change(function () {
                    /* Get the DataTables object again - this is not a recreation, just a get of the object */
                    var iCol = parseInt($(this).attr("data-column"));
                    var bVis = oTable.columns[iCol].visible();
                    //var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
                    oTable.columns.visible(iCol, (bVis ? false : true));
                    //this.oTable.fnSetColumnVis(iCol, (bVis ? false : true));
                });
            });
        } else {

            element = elementParam;
            oTable = $(element).DataTable(settings);

            // initialzie select2 dropdown
            $('#sample_1_column_toggler input[type="checkbox"]').change(function () {
                /* Get the DataTables object again - this is not a recreation, just a get of the object */
                var iCol = parseInt($(this).attr("data-column"));
                var bVis = oTable.columns[iCol].visible();
                //var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
                oTable.columns.visible(iCol, (bVis ? false : true));
                //this.oTable.fnSetColumnVis(iCol, (bVis ? false : true));
            });

        }

        return this;
    };

    this.registrarEventos = function () {
        setEventSelectRow();

        return this;
    };

    return this;

}
;

