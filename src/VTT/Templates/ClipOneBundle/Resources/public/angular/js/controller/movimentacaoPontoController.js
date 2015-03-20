app.controller('MovimentacaoProdutoController', ['$scope', '$http', 'ClientePesqService',
        function ($scope, $http, ClientePesqService) {
            $scope.autoCompletar = function (textoPesq) {
                ClientePesqService.pesquisar($scope, textoPesq);
            };

            $scope.selecionarClienteVenda = function (idCliente) {
                ClientePesqService.selecionarClienteProdutoTroca($scope, idCliente);
            };


        }]);