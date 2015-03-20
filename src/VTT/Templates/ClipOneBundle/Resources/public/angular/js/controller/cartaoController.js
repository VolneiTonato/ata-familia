app.controller('CartaoController', ['$scope', '$http', 'ClientePesqService',
        function ($scope, $http, ClientePesqService) {

            $scope.autoCompletar = function (textoPesq) {
                ClientePesqService.pesquisar($scope, textoPesq);
            };

            $scope.selecionarClienteVenda = function (idCliente) {
                ClientePesqService.selecionarClienteCartaoStatus($scope, idCliente);
            };

        }]);