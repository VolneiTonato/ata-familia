app.controller('EmpresaController', ['$scope', '$http', 'UsuariosService', function ($scope, $http, UsuariosService) {
        $scope.resetarSenha = function (id, tipo) {
            UsuariosService.resetarSenha({id: id, tipo: tipo});
        };
    }]);