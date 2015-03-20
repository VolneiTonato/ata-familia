app.controller('VendaController', ['$scope', '$http', 'ClientePesqService',
        function ($scope, $http, ClientePesqService) {

            $scope.venda = '';
            $scope.venda.dinheiro = 0.00;
            $scope.venda.cartao = 0.00;
            $scope.venda.cheque = 0.00;
            $scope.venda.chequePre = 0.00;
            $scope.venda.aprazo = 0.00;
            $scope.venda.convenio = 0.00;
            $scope.lMostrarBotaoSalvarVenda = true;

            $scope.autoCompletar = function (textoPesq) {
                ClientePesqService.pesquisar($scope, textoPesq);
            };

            $scope.selecionarClienteVenda = function (idCliente) {
                ClientePesqService.selecionarClienteVenda($scope, idCliente);
            };

            $scope.autoCompletarProduto = function (textoPesquProd) {

                if (textoPesquProd === "") {
                    $scope.lNenhumProduto = false;
                    $scope.lMostraPesqProdutos = false;
                    return false;
                }

                var request = $http.post(ConfiguracoesAPP.baseUrl() + 'webservice/produtos-service/pesquisar.json', {pesquisa: textoPesquProd, isLoader: false});
                request.success(function (data) {
                    if (data.length > 0) {
                        $scope.lMostraPesqProdutos = true;
                        $scope.lNenhumProduto = false;
                        $scope.listPesqProdutos = data;
                    } else {
                        $scope.lNenhumProduto = true;
                        $scope.lMostraPesqProdutos = false;
                    }
                });
            };

            $scope.selecionarProduto = function (produto) {
                $scope.produtoVenda.descricao = produto.descricao;
                $scope.produtoVenda.id = produto.id;
                $scope.produtoVenda.codigoBarras = produto.codigoBarras;
                $scope.lMostraPesqProdutos = false;
                $scope.lNenhumProduto = false;

            };

            $scope.registrarProdutoVenda = function (produtoVenda) {

                var request = $http.post(ConfiguracoesAPP.baseUrl() + 'admin/vendas/adicionar-produto', produtoVenda);

                request.success(function (data) {
                    if (data.pedidoCar) {
                        $scope.produtoVenda = '';
                        $scope.lItensRegistrados = true;
                        $scope.itemVenda = data.pedidoCar;
                    } else {
                        Mensagem(data.mensagem, data.tipo);
                    }

                });
            };

            $scope.calcularTotalVenda = function () {


                var totalRestante = decimalConvert($scope.venda.dinheiro) +
                        decimalConvert($scope.venda.cartao) +
                        decimalConvert($scope.venda.cheque) +
                        decimalConvert($scope.venda.chequePre) +
                        decimalConvert($scope.venda.aprazo) +
                        decimalConvert($scope.venda.convenio);

                $scope.lMostrarTotalRestante = true;

                var totalVenda = decimalConvert($scope.itemVenda.total);

                totalRestante = (totalVenda - totalRestante);


                $scope.venda.totalRestante = number_format(totalRestante, 2, ',', '.');

                if (totalRestante < 0) {
                    Mensagem('Valor informado é maior que o valor total de venda!', 'informacao');
                    $scope.lMostrarBotaoSalvarVenda = false;
                    return false;
                }
                $scope.lMostrarBotaoSalvarVenda = true;
            };

            $scope.carregarItensRegistrados = function () {
                var request = $http.post(ConfiguracoesAPP.baseUrl() + 'admin/vendas/obter-itens-registrados');

                request.success(function (data) {
                    if (data.pedidoCar) {
                        $scope.lItensRegistrados = true;
                        $scope.itemVenda = data.pedidoCar;
                    }
                });
            };


            $scope.removerItemVenda = function (item) {
                
                if (!confirm('Confirma a exclusão do item de venda ' + item.produto.descricao + '?'))
                    return false;

                var request = $http.post(ConfiguracoesAPP.baseUrl() + 'admin/vendas/remover-produto-venda', {id: item.id});
                request.success(function (data) {
                    $scope.lItensRegistrados = false;
                    $scope.itemVenda.total -= item.valorTotal;
                    $scope.carregarItensRegistrados();
                });
            };


        }]);
