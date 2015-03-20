var app = angular.module('fidelizaSimAdm', []).config(function($interpolateProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    });
    
    app.config(function ($httpProvider, $provide) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;';

        $provide.factory('httpInterceptor', function ($q, $rootScope) {
            return {
                'request': function (config) {
                    
                    if(config.data !== undefined) {
                        if(config.data.isLoader === true || config.data.isLoader === undefined){
                            //MensagemApp.show();
                        }
                    }
                    
                    if(config.data !== undefined)
                        config.data = $.param(config.data);
                    
                    $rootScope.$broadcast('httpRequest', config);
                    return config || $q.when(config);
                },
                'response': function (response) {
                    MensagemApp.hide();
                    if(response.data.ok === false && response.data.tipo === 'danger'){
                        Mensagem(response.data.mensagem, response.data.tipo);
                    }
                    
                    $rootScope.$broadcast('httpResponse', response);
                    return response || $q.when(response);
                },
                'requestError': function (rejection) {
                    MensagemApp.message('Erro ao enviar dados ao servidor! Tente novamente.','danger');
                    $rootScope.$broadcast('httpRequestError', rejection);
                    return $q.reject(rejection);
                },
                'responseError': function (rejection) {
                    $('body').append(rejection.data);
                    MensagemApp.message(rejection.statusText,'danger');
                    $rootScope.$broadcast('httpResponseError', rejection);
                    return $q.reject(rejection);
                }
            };
        });
        $httpProvider.interceptors.push('httpInterceptor');
    });