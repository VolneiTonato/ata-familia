app.directive('diretorioTemplate', function() {
    return {
        templateUrl: function(tElement, tAttrs) {
            return tAttrs.templateUrl;
        }
    };
});