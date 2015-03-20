     app.factory('ClientePesqService', ['$http', function ($http) {
            return {
                pesquisar: function ($scope, textoPesq) {

                    if (textoPesq.length <= 0) {
                        $scope.lMostrarDados = false;
                        $scope.lNenhumCliente = false;
                        return false;
                    }

                    if (textoPesq.length < 3) {
                        $scope.lMostrarDados = false;
                        $scope.lNenhumCliente = true;
                        $scope.textoSemDados = "Informe pelo menos 3 dígitos para a pesquisa.";
                        return false;
                    }
                    
                    var dados = {
                        pesquisa : textoPesq,
                        isLoader : false
                    };

                    var request = $http.post(ConfiguracoesAPP.baseUrl() + 'admin/clientes/pesquisar-cliente-list-ajax', dados);

                    request.success(function (data) {
                        
                        if (data.hasOwnProperty('clientes')) {
                            $scope.lNenhumCliente = false;
                            $scope.listPesClientes = data.clientes;
                            $scope.lMostrarDados = true;
                        } else {
                            $scope.lMostrarDados = false;
                            $scope.lNenhumCliente = true;
                            $scope.textoSemDados = "Nenhum cliente encontrado com " + textoPesq;
                        }
                          
                    });
                },
                selecionarClienteVenda: function ($scope, idCliente) {
                    var request = $http.post(ConfiguracoesAPP.baseUrl() + 'admin/vendas/registrar-cliente-venda', {id: idCliente});

                    request.success(function (data) {
                        if (data.ok) {
                            window.location.reload();
                        }
                    });
                },
                selecionarClienteProdutoTroca: function ($scope, idCliente) {
                    var request = $http.post(ConfiguracoesAPP.baseUrl() + 'admin/movimentacao-produtos-troca/registrar-cliente-produto-troca', {id: idCliente});

                    request.success(function (data) {
                        if (data.ok) {
                            window.location.reload();
                        }
                    });
                },
                selecionarClienteCartaoStatus: function ($scope, idCliente) {
                    var request = $http.post(ConfiguracoesAPP.baseUrl() + 'admin/cartoes/status-cartao', {id: idCliente});

                    request.success(function (data) {
                        if (data.ok) {
                            window.location.reload();
                        }
                    });
                }

            };


        }]);
