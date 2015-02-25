
var LoaderVTT = (function () {
    var $body = $('body');

    this.run = function (options) {

        var defaults = {
            id: '#VTT_LOADER_ID',
            mensagem: 'Aguarde...'
        };

        var settings = $.extend({}, defaults, options);

        var template = $.get(ConfiguracoesVTT.pathRoot() + 'bundles/vttjs/classJS/LoaderVTT/templates/loader.html', {cache : true}).done(function (result) {
            $body.remove(settings.id)
                    .append(template)
                    .find('h1').prop('titulo-mensagem', function () {
                $(this).text(settings.mensagem);
            }).closest(settings.id);

            $.blockUI({message: $(settings.id)});

        });
        
        return this;
    };

    this.stop = function () {
        $.unblockUI();
    };


    return this;
})();


