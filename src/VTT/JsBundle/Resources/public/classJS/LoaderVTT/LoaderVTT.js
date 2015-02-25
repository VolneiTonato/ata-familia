
var LoaderVTT = (function () {
    var $body = $('body');

    this.runLoader = function (options) {

        var defaults = {
            id: '#VTT_LOADER_ID',
            mensagem: 'Aguarde...'
        };

        var settings = $.extend({}, defaults, options);

        $.get(ConfiguracoesVTT.pathRoot() + 'bundles/vttjs/classJS/LoaderVTT/templates/loader.html').done(function (result) {
            $body.remove(settings.id)
                    .append(result)
                    .find('h1').prop('titulo-mensagem', function () {
                $(this).text(settings.mensagem);
            }).closest(settings.id);

            $.blockUI({message: $(settings.id)});

        });
        
        return this;
    };

    this.stopLoader  = function () {
        $.unblockUI();
    };


    return this;
})();


