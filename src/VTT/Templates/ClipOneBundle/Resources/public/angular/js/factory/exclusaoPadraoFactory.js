app.factory('ExclusaoPadraoFactory', ['$http', function ($http) {
        return {
            
            excluir : function($scope){
                
                var lEscolha = false;
                
                var idElement = MensagemApp.question('Deseja excluir o item selecionado?');
                $("#yes_" + idElement).on('click', function(){
                    lEscolha = true;
                });
                
                
                
                
                var request = $http.post($scope.urlExclusao, $scope.paramExclusao);
                
                request.success(function(retorno){
                    
                });
            }
            
            
        };


    }]);