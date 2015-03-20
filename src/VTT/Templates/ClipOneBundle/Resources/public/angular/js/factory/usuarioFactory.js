 
    app.factory('UsuariosService', ['$http', function($http){
        return{
            resetarSenha : function(options){
                if(!confirm('Deseja realmente resetar a senha principal desta conta?'))
                    return false;
                
                var request = $http.post(ConfiguracoesAPP.baseUrl() + 'admin/usuarios/reset-password', options);
                request.success(function (data) {
                    if(data.ok)
                        Mensagem(data.mensagem, data.tipo);
                });
            }
        };
    }]);
    