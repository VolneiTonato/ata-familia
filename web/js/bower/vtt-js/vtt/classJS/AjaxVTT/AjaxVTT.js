function AjaxVTT() {

    var defaults = {
        vttType: 'POST',
        vttDataType: 'JSON',
        vttDebug: false,
        vttData: {},
        vttUrl: null,
        vttAsync: true,
        vttEvent: null,
        vttCache: false,
        vttLoader: true,
        vttContineErrorResponse: false,
        vttTimeOut: 10000 //10 second 
    };

    var barProgress = function () {

    };

    this.send = function (options, fnc) {

        var settings = $.extend({}, defaults, options);

        if (settings.vttEvent === undefined || settings.vttEvent === null) {
            settings.vttEvent = window.event || arguments.callee.caller.arguments[0];
        }

        if (settings.vttEvent !== undefined)
            settings.vttEvent.preventDefault();

        $.ajax({
            url: settings.vttUrl,
            data: settings.vttData,
            type: settings.vttType,
            dataType: settings.vttDataType,
            async: settings.vttAsync,
            cache: settings.vttCache,
            timeout: settings.vttTimeOut,
            beforeSend: function (xhr) {
                if (settings.vttLoader === true)
                    LoaderVTT.init().run();
            }
        }).done(function (data, textStatus, jqXHR) {

            if (settings.vttLoader === true)
                LoaderVTT.stop();

        }).fail(function (jqXHR, textStatus, errorThrown) {

            if (textStatus === 'timeout') {
                MensagemVTT.init().show({mensagem: 'Tempo excedido! Tente novamente.'}).hide();
            } else {

                MensagemVTT.init().show({mensagem: textStatus}).hide(function () {
                    if (jqXHR.responseText && settings.vttDebug === true) {
                        ModalVTT.init().show({html: jqXHR.responseText}).hide();
                    }
                });
            }

        }).always(function (data, textStatus, errorThrown) {

            if (textStatus !== 'success') {
                data.abort();
            } else {

                switch (settings.vttDataType.toString().toLowerCase()) {
                    case 'html':
                    case 'post':
                    case 'get':
                    case 'script':
                        fnc(data);
                        break;
                    case 'json':
                    default :
                        if (!data.statusResponseVTT) {
                            MensagemVTT.init().show({mensagem: data.mensagemVTT}).hide(function (e) {
                                if (settings.vttContineErrorResponse) {
                                    fnc(data);
                                }
                            });
                        } else {
                            fnc(data);
                        }
                        break;
                }
            }
        });

        if (settings.vttEvent !== undefined)
            return false;
    };
    return this;
}
;

$.xhrPool = [];
$.xhrPool.abortAll = function () {
    $(this).each(function (idx, jqXHR) {
        jqXHR.abort();
    });
    $.xhrPool = [];
};

$.ajaxSetup({
    cache: false,
    beforeSend: function (jqXHR) {
        $.xhrPool.push(jqXHR);
    },
    complete: function (jqXHR) {
        var index = $.xhrPool.indexOf(jqXHR);
        if (index > -1) {
            $.xhrPool.splice(index, 1);
        }
    }
});
