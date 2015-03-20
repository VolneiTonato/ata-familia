app.factory('EnderecoService', ['$http', function ($http) {
            return {
                endereco: {
                    logradouro: null,
                    bairro: null,
                    cep: null,
                    tipoLogradouro: null,
                    numero: null,
                    complemento: null,
                    municipio: null,
                    tipoEndereco: null,
                    latitude: null,
                    longitude: null,
                    pessoa : null,
                    idAcesso: null,
                    pais : null,
                    estado : null
                },
                saveEndereco: function (endereco) {
                    console.log(endereco.pessoa);
                    return false;
                    var postData = {
                        form_endereco: this.endereco,
                        isLoader : true
                    };
                    
                    var request = $http.post('',
                        postData
                    );
                    
                    request.success(function (data) {
                        console.log(data);
                        
                        //MensagemApp.message('dados ok','danger');
                        
                        
                        /*
                        var id = MensagemApp.question();
                        
                        
                        $("body").delegate('#yes_' + id, 'click', function(){
                            MensagemApp.hide();
                        });
                        */
                    });
                },
                editEndereco: function(id){
                    
                },
                clearEndereco: function(){
                    for(var key in this.endereco){
                        if (!this.endereco.hasOwnProperty(key)) continue;
                        if(key === 'pessoa') continue;
                        this.endereco[key] = null;
                    }
                }
        
            };
        }]);
