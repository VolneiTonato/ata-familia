app.controller('ProdutoController', ['$scope', '$http', '$compile', function ($scope, $http, $compile) {

        var idTable = "#tabela-produtos";
        var oTable;


        $scope.editar = function (id) {
            if (id !== undefined) {
                window.location.href = ConfiguracoesAPP.fullUrl() + 'admin/produtos/edit/' + id;
            }

        };
        
        $scope.listar = function () {
            oTable = TableData.run(idTable, {
                "processing": true,
                "serverSide": true,
                'ajax': {
                    'url': ConfiguracoesAPP.baseUrl() + 'admin/produtos/listar',
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
                        'data': 'codigo_barra',
                        'name': 'codigo_barra'
                    },
                    {
                        'targets': [2],
                        'data': 'botao',
                        'name': 'botao',
                        'defaultContent': ''
                    }

                ],
                "rowCallback": function (row, data) {
                    $(row).addClass('linha-bloco');
                    var html = '<button class="btn btn-primary" ng-click="editar(\'' + row.id + '\')"><i class="clip-pencil-3"></i></button>';
                    html += '&nbsp<button param-id="' + row.id + '" class="btn btn-bricky remover-item-cadastro-padrao"><i class="clip-close"></i></button>';

                    $('td:eq(2)', row).html($compile(html)($scope));
                    console.log(row);
                }
            }).registrarEventos();

        };
    }]);